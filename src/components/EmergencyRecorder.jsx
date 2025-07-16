// components/EmergencyRecorder.jsx
import React, { useEffect } from "react";

const EmergencyRecorder = ({ triggerRecording }) => {
  useEffect(() => {
    if (!triggerRecording) return;

    let stream;
    let mediaRecorder;
    let chunks = [];

    const startRecording = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: "video/webm" });

          // ✅ Optional upload to Cloudinary
          const formData = new FormData();
          formData.append("file", blob);
          formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
          );

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/video/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();
          console.log("✅ Video uploaded:", data.secure_url);
          // ✅ Save video URL to backend
          await fetch("http://localhost:5000/api/emergency/store-recording", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              videoUrl: data.secure_url,
            }),
          });
        };

        mediaRecorder.start();
        console.log("🎥 Recording started");

        setTimeout(() => {
          mediaRecorder.stop();
          stream.getTracks().forEach((track) => track.stop());
          console.log("🛑 Recording stopped after 30 seconds");
        }, 30000);
      } catch (err) {
        console.error("❌ Recording failed:", err);
      }
    };

    startRecording();
  }, [triggerRecording]);

  return null;
};

export default EmergencyRecorder;

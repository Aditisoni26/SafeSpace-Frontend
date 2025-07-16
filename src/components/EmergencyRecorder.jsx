import React, { useEffect } from "react";
import API from "../utils/axios"; // ✅ Axios instance with baseURL and withCredentials

const EmergencyRecorder = ({ triggerRecording }) => {
  useEffect(() => {
    if (!triggerRecording) return;

    let stream;
    let mediaRecorder;
    let chunks = [];

    const startRecording = async () => {
      try {
        // ✅ Ask for camera + mic permission
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: "video/webm" });

          // ✅ Upload to Cloudinary
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
          console.log("✅ Video uploaded to Cloudinary:", data.secure_url);

          // ✅ Save video URL to your backend using Axios instance
          try {
            await API.post(
              "/api/emergency/store-recording",
              { videoUrl: data.secure_url },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log("✅ Video URL saved to backend");
          } catch (error) {
            console.error("❌ Failed to save video to backend:", error);
          }
        };

        mediaRecorder.start();
        console.log("🎥 Recording started");

        // ✅ Stop after 30 seconds
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

  return null; // No UI needed
};

export default EmergencyRecorder;

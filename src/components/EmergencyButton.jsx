// import React, { useContext } from 'react';
// import API from '../utils/axios'; // adjust path if inside deep folders
// import { AlertContext } from '../context/AlertContext'; // ✅ Import context
// import { handleAlert } from '../utils/alertUtils';

// const EmergencyButton = () => {
//   const { showAlert } = useContext(AlertContext); // ✅ Use context

//   // const handleEmergency = async () => {
//   //   const token = localStorage.getItem('token');
//   //   try {
//   //     const res = await axios.post('http://localhost:5000/api/emergency', {}, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`
//   //       }
//   //     });
//   //     showAlert(res.data.message); // ✅ Use showAlert
//   //   } catch (error) {
//   //     console.error("Emergency alert error:", error);
//   //     showAlert('Failed to send emergency alert'); // ✅ Use showAlert for error
//   //   }
//   // };

//   return (
//     <div className="text-center my-5">
//       <button className="btn btn-danger btn-lg"  onClick={() => handleAlert(showAlert)} >
//         🚨 Send Emergency Alert
//       </button>
//     </div>
//   );
// };

// export default EmergencyButton;
import React, { useContext, useState } from 'react';
// import API from '../utils/axios'; // adjust path if inside deep folders
import { AlertContext } from '../context/AlertContext';
import { handleAlert } from '../utils/alertUtils';
import EmergencyRecorder from './EmergencyRecorder'; // ✅ Add recorder

const EmergencyButton = () => {
  const { showAlert } = useContext(AlertContext);
  const [startRecording, setStartRecording] = useState(false);

  const handleEmergency = () => {
    handleAlert(showAlert);       // ✅ Your existing alert
    setStartRecording(true);      // ✅ Trigger recording
  };

  return (
    <div className="text-center my-5">
      <button className="btn btn-danger btn-lg" onClick={handleEmergency}>
        🚨 Send Emergency Alert
      </button>

      {/* Hidden recorder component */}
      <EmergencyRecorder triggerRecording={startRecording} />
    </div>
  );
};

export default EmergencyButton;

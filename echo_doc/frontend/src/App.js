// import React from "react";
// import UploadForm from "./UploadForm";
// import AskQuestion from "./AskQuestion";
// import "./App.css";
// import { motion } from "framer-motion";
// import { FaFilePdf, FaRobot } from 'react-icons/fa';
// import EchoLogo from './Components/EchoLogo';

// function App() {
//   return (
//     <div className="App">
//       <EchoLogo />
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="main-title"
//       >
//         Chat with Your PDF 🤖
//       </motion.h1>

//       <motion.div
//         className="section"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
//       >
//         <h2><FaFilePdf style={{ marginRight: '8px', color: '#f87171' }} />Upload your PDF</h2>
//         <UploadForm />
//       </motion.div>

//       <motion.div
//         className="section"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
//       >
//         <h2><FaRobot style={{ marginRight: '8px', color: '#60a5fa' }} />Ask a Question</h2>
//         <AskQuestion />
//       </motion.div>
//     </div>
//   );
// }

// export default App;




import React from "react";
// import UploadForm from "./UploadForm";
import PDFUploadManager from "./PDFUploadManager";

import AskQuestion from "./AskQuestion";
import "./App.css";
import { motion } from "framer-motion";
import { FaFilePdf, FaRobot } from 'react-icons/fa';
import EchoLogo from './Components/EchoLogo';

function App() {
  return (
    <div className="App">
      <div className="crazy-logo-container">
        <EchoLogo />
      </div>
      <h1>Chat with Your PDF 🤖</h1>

      <motion.div
        className="section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
<h2><FaFilePdf style={{ marginRight: '8px', color: '#dc2626' }} />Upload your PDF</h2>
<PDFUploadManager />
        {/* <UploadForm /> */}
      </motion.div>

      <motion.div
        className="section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2><FaRobot style={{ marginRight: '8px', color: '#3b82f6' }} />Ask a Question</h2>
        <AskQuestion />
      </motion.div>
    </div>
  );
}

export default App;
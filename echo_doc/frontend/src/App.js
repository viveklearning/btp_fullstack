import React from 'react';
import UploadForm from './UploadForm';
import AskQuestion from './AskQuestion';
import './App.css'; // Make sure you're importing your CSS

function App() {
  return (
    <div className="App"> {/* Add this class to enable styling */}
      <h1>Chat with Your PDF 🤖📄</h1>

      <div className="section">
        <h2>Upload your PDF</h2>
        <UploadForm />
      </div>

      <div className="section">
        <h2>Ask a Question</h2>
        <AskQuestion />
      </div>
    </div>
  );
}

export default App;

// EchoLogo.js
import React from 'react';

const EchoLogo = () => (
  <div className="logo-container">
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="40" height="60" rx="6" fill="#ffffff" stroke="#3A5BA0" strokeWidth="2"/>
      <text x="28" y="55" fill="#3A5BA0" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold">PDF</text>
      <g stroke="#3A5BA0" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M65,40 q10,10 0,20">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <path d="M70,35 q15,15 0,30">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="0.2s" repeatCount="indefinite"/>
        </path>
        <path d="M75,30 q20,20 0,40">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
        </path>
      </g>
      <text x="20" y="95" fill="#3A5BA0" fontSize="10" fontFamily="Arial, sans-serif">Echo Doc</text>
    </svg>
  </div>
);

export default EchoLogo;
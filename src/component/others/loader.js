import React from 'react';
import Spinner from 'react-spinner-material';

export default function Loader() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center", // Changed for better alignment
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15%", 
        zIndex: 99, // Removed quotes from numeric value
      }}
    >
      <Spinner 
        radius={80} 
        color="blue" 
        stroke={2} 
        visible={true} 
      />
      <h4>Loading...</h4>
    </div>
  );
}

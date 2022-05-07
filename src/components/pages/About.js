import React from 'react';

function About() {
  return (
    <div style={
      {
        width: "75%",
        margin: "auto",
        minWidth: "350px",
        marginTop: "3em"
      }
    }>
      <p style={
        {
          fontWeight: "bold",
          fontSize: "1.5em",
          textAlign: "center"
        }
      }>About AutoLib:</p>
      <p>AutoLib is a local community library founded with the purpose of serving local community members in an automated way without relying on a storage space and a central library building. </p>
      <p>AutoLib aims at combining the concept of peer to peer sharing with a traditional functionality of a library.</p>

    </div>
  );
}

export default About;
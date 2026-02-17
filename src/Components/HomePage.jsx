import React from "react";

export default function HomePage() {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector('.comp');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section className="home_page">
        <div id="main-text">
          <h1>STRUCTSCAN</h1>
          <br></br>
          <h3>AI-Powered Infrastructure Analysis</h3>
          <button onClick={scrollToUpload}>Check now</button>
        </div>
      </section>
    </div>
  );
}

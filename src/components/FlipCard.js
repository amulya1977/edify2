import React, { useState } from "react";

const FlipCard = ({ frontImage, frontText, backImage, backText }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={styles.flipCard}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          ...styles.flipCardInner,
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div style={{ ...styles.flipCardFace, ...styles.front }}>
          <h3 style={styles.title}>{frontText}</h3>
          <img src={frontImage} alt="Front" style={styles.image} />
        </div>

        {/* Back Side */}
        <div style={{ ...styles.flipCardFace, ...styles.back }}>
          <img src={backImage} alt="Back" style={styles.img} />
          <p style={styles.description}>{backText}</p>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  flipCard: {
    width: "215px",
    height: "280px",
    perspective: "1000px",
  },
  flipCardInner: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
  },
  flipCardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
  },
  front: {
    //backgroundColor: "#f7bcd",
    background: "radial-gradient(circle, #FFFFFF 40% ,#D6EEFF 100% )",
    border: "3px solid lightblue",
    color: "white",
  },
  back: {
    //backgroundColor: "#66a80f",
    background: "radial-gradient(circle, #FFFFFF 40% ,#D6EEFF 100% )",
    border: "3px solid lightblue",
    color: "white",
    transform: "rotateY(180deg)",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "5%",
    marginBottom: "10px",
    marginTop: "20px",
  },
  img: {
    width: "100px",
    height: "100px",
  },
  title: {
    color: "black",
    fontSize: "20px",
    fontWeight: "bold",
  },
  description: {
    color: "black",
    fontSize: "13px",
    fontWeight: "400",
    maxWidth: "90%",
  },
};

export default FlipCard;

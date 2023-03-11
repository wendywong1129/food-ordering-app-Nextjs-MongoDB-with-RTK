import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/feature01.png",
    "/img/feature02.png",
    "/img/feature03.png",
  ];

  const handleArrow = (direction) => {
    if (direction === "left") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "right") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("left")}
      >
        <Image src="/img/arrowLeft.png" alt="" fill />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" fill style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("right")}
      >
        <Image src="/img/arrowRight.png" alt="" fill />
      </div>
    </div>
  );
};

export default Featured;

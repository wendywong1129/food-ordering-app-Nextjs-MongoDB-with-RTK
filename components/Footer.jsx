import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image
          src="/img/footerBg.png"
          alt=""
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.item}>
        <div>
          <h2 className={styles.motto}>WELL BAKED SLICE OF PIZZA.</h2>
          <h2 className={styles.motto}>YES ! WE DID.</h2>
        </div>
        <div>
          <h1 className={styles.title}>OUR RESTAURANTS</h1>
          <p className={styles.text}>
            66 King Street
            <br />
            Sydney, NSW 2040
            <br /> 0401-111-222
          </p>
          <p className={styles.text}>
            88 Queen Crescent,
            <br />
            Sydney, NSW 2050
            <br /> 0401-333-444
          </p>
          <p className={styles.text}>
            90 William Street,
            <br /> Melbourne, VIC 3000
            <br /> 0401-555-666
          </p>
          <p className={styles.text}>
            100 Elizabeth Crescent,
            <br /> Melbourne, VIC 3000
            <br /> 0401-777-888
          </p>
        </div>
        <div>
          <h1 className={styles.title}>OPENING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

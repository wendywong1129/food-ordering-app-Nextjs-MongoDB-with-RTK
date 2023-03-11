import { useState } from "react";
import styles from "../styles/OrderDetails.module.css";

const OrderDetails = ({ total, createOrder, setIsPayByCash }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You&apos;re going to pay $12</h1>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="name">
            Full Name
          </label>
          <input
            className={styles.input}
            id="name"
            type="text"
            placeholder="Your name..."
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="phone">
            Phone Number
          </label>
          <input
            className={styles.input}
            id="phone"
            type="text"
            placeholder="Your phone number..."
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="address">
            Address
          </label>
          <textarea
            className={styles.textarea}
            id="address"
            rows={5}
            type="text"
            placeholder="Your address..."
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
        <button className={styles.cancel} onClick={() => setIsPayByCash(false)}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

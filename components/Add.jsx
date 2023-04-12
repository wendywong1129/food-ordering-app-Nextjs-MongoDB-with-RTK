import { useState } from "react";
import axios from "axios";
import styles from "../styles/Add.module.css";

const Add = ({ setIsAdd, setPizzaList, pizzaList }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtraOptions = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-order");
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      const newPizza = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        newProduct
      );
      setIsAdd(false);
      setPizzaList([...pizzaList, newPizza]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setIsAdd(false)}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="img">
            Choose an image
          </label>
          <input
            id="img"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            className={styles.input}
            id="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="desc">
            Desc
          </label>
          <textarea
            rows={4}
            id="desc"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="price">
            Prices
          </label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              id="price"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="extra">
            Extra
          </label>
          <div className={styles.extraContainer}>
            <div className={styles.extra}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                id="extra"
                type="text"
                placeholder="Item"
                name="text"
                onChange={handleExtraInput}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleExtraInput}
              />
            </div>
            <div className={styles.extraButton}>
              <button onClick={handleExtraOptions}>Add</button>
            </div>
          </div>
        </div>
        <div className={styles.extraItems}>
          {extraOptions.map((option) => (
            <span className={styles.extraItem} key={option.text}>
              {option.text}
            </span>
          ))}
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;

import { useState } from "react";
import axios from "axios";
import styles from "../styles/Edit.module.css";

const Edit = ({ productItem, setIsEdit, setPizzaList, pizzaList }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(productItem.title);
  const [desc, setDesc] = useState(productItem.desc);
  const [priceSmall, setPriceSmall] = useState(productItem.prices[0]);
  const [priceMedium, setPriceMedium] = useState(productItem.prices[1]);
  const [priceLarge, setPriceLarge] = useState(productItem.prices[2]);
  const [extraOptions, setExtraOptions] = useState(productItem.extraOptions);
  const [extra, setExtra] = useState(null);

  const handleEdit = async () => {
    try {
      const updatedProduct = {
        title,
        desc,
        prices: [priceSmall, priceMedium, priceLarge],
        extraOptions,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productItem._id}`,
        updatedProduct
      );
      const updatedPizza = res.data;
      const updatedPizzaList = pizzaList.map((pizza) =>
        pizza._id === updatedPizza._id ? updatedPizza : pizza
      );
      setIsEdit(false);
      setPizzaList(updatedPizzaList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setIsEdit(false)}>
          X
        </span>
        <h1>Edit Product</h1>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            className={styles.input}
            id="title"
            type="text"
            value={title}
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="price">
            Prices
          </label>
          <div className={styles.pricesContainer}>
            <div className={styles.priceContainer}>
              <label htmlFor="small" className={styles.priceType}>
                Small
              </label>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                id="small"
                type="number"
                value={priceSmall}
                onChange={(e) => setPriceSmall(+e.target.value)}
              />
            </div>
            <div className={styles.priceContainer}>
              <label htmlFor="medium" className={styles.priceType}>
                Medium
              </label>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                id="medium"
                type="number"
                value={priceMedium}
                onChange={(e) => setPriceMedium(+e.target.value)}
              />
            </div>
            <div className={styles.priceContainer}>
              <label htmlFor="large" className={styles.priceType}>
                Large
              </label>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                id="large"
                type="number"
                value={priceLarge}
                onChange={(e) => setPriceLarge(+e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label} htmlFor="extra">
            Extra
          </label>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <div className={styles.extraItem} key={option.text}>
                <div className={styles.extraItemDetail}>
                  <span>{option.text}</span>
                  <span>{option.price}</span>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    setExtraOptions(
                      extraOptions.filter(
                        (extraOption) => extraOption._id !== option._id
                      )
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
            <div className={styles.extra}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Item"
                value={extra?.text}
                name="text"
                onChange={(e) =>
                  setExtra({ ...extra, [e.target.name]: e.target.value })
                }
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Price"
                value={extra?.price}
                name="price"
                onChange={(e) =>
                  setExtra({ ...extra, [e.target.name]: e.target.value })
                }
              />
              <button
                className={styles.addButton}
                onClick={(e) => {
                  setExtraOptions((prev) => [...prev, extra]);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <button className={styles.updateButton} onClick={handleEdit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;

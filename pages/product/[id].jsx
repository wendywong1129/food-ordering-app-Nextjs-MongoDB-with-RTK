import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      // setExtras([...extras, option]);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, price, quantity, extras }));
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <button className={styles.back}>Back to Home</button>
      </Link>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt=""
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <div className={styles.desc}>{pizza.desc}</div>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" fill sizes="40px 40px" alt="" />
            <span className={styles.inch}>Small</span>
            {size === 0 && (
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/img/checked.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" fill sizes="50px 50px" alt="" />
            <span className={styles.inch}>Medium</span>
            {size === 1 && (
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/img/checked.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" fill sizes="60px 60px" alt="" />
            <span className={styles.inch}>Large</span>
            {size === 2 && (
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/img/checked.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={option.text}
                name={option.text}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            className={styles.quantity}
            type="number"
            min="0"
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;

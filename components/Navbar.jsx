import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width={"28"} height={"28"} />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER</div>
          <div className={styles.text}>0123 456 789</div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.list}>
          <Image
            className={styles.logoLeft}
            src="/img/logo.png"
            alt=""
            width={"70"}
            height={"70"}
            priority
          />
          <Link href="/">
            <Image
              className={styles.logoRight}
              src="/img/title.png"
              alt=""
              width={"360"}
              height={"60"}
              priority
            />
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.list}>
          <Link href="/admin">
            <div className={styles.admin}>
              <Image src="/img/admin.png" alt="" width={"30"} height={"30"} />
            </div>
          </Link>
          <Link href="/cart">
            <div className={styles.cart}>
              <Image src="/img/cart.png" alt="" width={"30"} height={"30"} />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

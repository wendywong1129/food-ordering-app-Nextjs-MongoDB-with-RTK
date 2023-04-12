import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Edit from "../../components/Edit";
import styles from "../../styles/Admin.module.css";

const Index = ({ products, orders }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [isEdit, setIsEdit] = useState(false);
  const [productItem, setProductItem] = useState(null);

  console.log(pizzaList);

  const router = useRouter();

  const status = ["preparing", "on the way", "delivered"];

  const handleEdit = (product) => {
    setIsEdit(true);
    setProductItem(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/` + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/` + id,
        {
          status: currentStatus + 1,
        }
      );
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`);
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <h1>Products</h1>
          <table className={styles.table}>
            <thead className={styles.tHead}>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            {pizzaList.map((product) => (
              <tbody key={product._id}>
                <tr className={styles.trTitle}>
                  <td className={styles.id}>{product._id}</td>
                  <td>
                    <Image
                      src={product.img}
                      width={50}
                      height={50}
                      alt=""
                      style={{ objectFit: "contain" }}
                    />
                  </td>
                  <td className={styles.title}>{product.title}</td>
                  <td className={styles.price}>${product.prices[0]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className={styles.item}>
          <h1>Orders</h1>
          <table className={styles.table}>
            <thead className={styles.tHead}>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {orderList.map((order) => (
              <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td className={styles.id}>{order._id}</td>
                  <td className={styles.customer}>{order.customer}</td>
                  <td className={styles.total}>${order.total}</td>
                  <td className={styles.method}>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td className={styles.status}>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      {isEdit && (
        <Edit
          productItem={productItem}
          setIsEdit={setIsEdit}
          setPizzaList={setPizzaList}
          pizzaList={pizzaList}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookie = context.req?.cookies || "";

  if (cookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  const orderRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`
  );

  return {
    props: {
      cookie,
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default Index;

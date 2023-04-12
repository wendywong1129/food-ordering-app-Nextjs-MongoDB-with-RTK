import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { deleteProduct, reset } from "../redux/cartSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import OrderDetails from "../components/OrderDetails";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPayByCash, setIsPayByCash] = useState(false);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleDelete = (product) => {
    dispatch(deleteProduct(product));
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        data
      );
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const amount = cart.total;
  const currency = "AUD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner, isOpen]); // eslint-disable-line

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // console.log(details);
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {cart.products.length === 0 ? (
        <div className={styles.container}>
          Your cart is empty.{" "}
          <Link href="/" className={styles.link}>
            Back to Home
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr className={styles.tr} key={product._id}>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.img}
                          alt=""
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>{product.title}</span>
                    </td>
                    <td>
                      <div className={styles.extras}>
                        {product.extras.map((extra) => (
                          <div key={extra._id}>{extra.text} </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={styles.price}>${product.price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>
                        {product.quantity}
                      </span>
                    </td>
                    <td>
                      <span className={styles.total}>
                        ${product.price * product.quantity}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>CART</h2>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b>$0.00
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b>${cart.total}
              </div>
              {isOpen ? (
                <div className={styles.paymentMethods}>
                  <button
                    className={styles.payButton}
                    onClick={() => setIsPayByCash(true)}
                  >
                    CASH ON DELIVERY
                  </button>
                  <PayPalScriptProvider
                    options={{
                      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      components: "buttons",
                      currency: "AUD",
                      "disable-funding": "credit,card,p24",
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button
                  className={styles.button}
                  onClick={() => setIsOpen(true)}
                >
                  CHECKOUT
                </button>
              )}
            </div>
          </div>
          {isPayByCash && (
            <OrderDetails
              total={cart.total}
              createOrder={createOrder}
              setIsPayByCash={setIsPayByCash}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Cart;

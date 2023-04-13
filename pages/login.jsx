import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import arrConvertToObj from "../util/arrConvertToObj";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const cookieArr = document.cookie.split(";");
    const cookieObj = arrConvertToObj(cookieArr);
    if (cookieObj.token) {
      router.push("/admin");
    }
  }, []); // eslint-disable-line

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {error && (
          <span className={styles.error}>
            Invalid username or password. Please try again!
          </span>
        )}
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} onClick={handleLogin}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

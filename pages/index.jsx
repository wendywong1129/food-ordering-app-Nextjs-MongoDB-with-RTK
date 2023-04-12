import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

export default function Home({ pizzas, admin }) {
  const [isAdd, setIsAdd] = useState(false);
  const [pizzaList, setPizzaList] = useState(pizzas);

  return (
    <div>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setIsAdd={setIsAdd} />}
      <PizzaList pizzaList={pizzaList} />
      {isAdd && (
        <Add
          setIsAdd={setIsAdd}
          setPizzaList={setPizzaList}
          pizzaList={pizzaList}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const cookie = context.req?.cookies || "";
  let admin = false;

  if (cookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  );
  return {
    props: {
      pizzas: res.data,
      admin,
    },
  };
};

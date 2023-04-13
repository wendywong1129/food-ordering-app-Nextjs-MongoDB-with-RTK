import { useState } from "react";
import Head from "next/head";
import dbConnect from "../util/mongoDB";
import Product from "../models/Product";
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

  await dbConnect();
  const products = await Product.find({});

  return {
    props: {
      pizzas: JSON.parse(JSON.stringify(products)),
      admin,
    },
  };
};

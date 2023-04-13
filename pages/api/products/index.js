import dbConnect from "../../../util/mongoDB";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (!token || token !== process.env.TOKEN) {
    return res.status(401).json("Invalid Token!");
  }
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
}

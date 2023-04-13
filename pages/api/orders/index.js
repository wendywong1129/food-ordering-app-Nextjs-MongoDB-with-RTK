import dbConnect from "../../../util/mongoDB";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  await dbConnect();

  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default handler;

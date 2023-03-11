const handler = (req, res) => {
  if (req.method === "GET") {
    res.removeHeader("Set-Cookie");
    res.status(200).json("Logout successfully");
  } else {
    res.status(400).json(`${req.method} not supported`);
  }
};

export default handler;

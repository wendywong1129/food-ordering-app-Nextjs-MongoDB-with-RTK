import cookie from "cookie";

const handler = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN, {
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json("Login successfully");
  } else {
    res.status(400).json("Wrong Credentials");
  }
};

export default handler;

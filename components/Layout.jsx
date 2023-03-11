import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, admin }) => {
  return (
    <>
      <Navbar admin={admin} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

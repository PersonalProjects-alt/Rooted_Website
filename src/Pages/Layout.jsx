import Header from "../ui/header/header.jsx"
import { Outlet } from "react-router-dom";
import Footer from "../ui/footer/footer.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}
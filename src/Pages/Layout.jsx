import Header from "../ui/header.jsx"
import { Outlet } from "react-router-dom";
import Footer from "../ui/footer.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}
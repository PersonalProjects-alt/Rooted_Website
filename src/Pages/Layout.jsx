import Header from "../ui/header/header.jsx"
import { Outlet } from "react-router-dom";
import Footer from "../ui/footer/footer.jsx";
import Docker from "../ui/docker/docker.jsx"
import Docker2 from "../ui/docker/Dock2.jsx"

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Docker/>
      <Footer/>
    </>
  );
}
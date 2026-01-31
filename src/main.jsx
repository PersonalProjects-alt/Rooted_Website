import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout.jsx";
import Homepage from "../src/Pages/Homepage/Homepage.jsx"         // your homepage component
import AI_infoPage from "./Pages/AI_Page/AI_infoPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/Ai_info_Page" element={<AI_infoPage />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

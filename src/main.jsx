import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout.jsx";
import Homepage from "../src/Pages/Homepage/Homepage.jsx"         // your homepage component
import AI_infoPage from "./Pages/AI_Page/AI_infoPage.jsx";
import SignInPage from "./Pages/Auth_Pages/SignIn_Page.jsx"
import Dashboard from "./Pages/User_Page/user_dashboard.jsx"
import { AuthContextProvider } from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/Ai_info_Page" element={<AI_infoPage />} />
          <Route path="/SignIn_Page" element={<SignInPage />} />
          <Route path="/user_dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
      </AuthContextProvider>
    </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout.jsx";
import Homepage from "./Pages/Homepage/Homepage.jsx"     
import AI_infoPage from "./Pages/InformationPages/ai_information.jsx";
import SignInPage from "./Pages/signIn Page/signIn_page.jsx"
import Dashboard from "./Pages/User_Page/user_dashboard.jsx"
import AiSurvey from "./Pages/User_Page/AI_Survey/survey.jsx"
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
          <Route path="/survey_stepper" element={<AiSurvey />} />
        </Route>
      </Routes>
      </AuthContextProvider>
    </BrowserRouter>
);

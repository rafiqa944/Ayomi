import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./pages/user/Events.jsx";
import LandingPage from "./pages/user/LandingPage.jsx";
import JenisKertas from "./pages/user/JenisKertas.jsx";
import JenisPlastik from "./pages/user/JenisPlastik.jsx";
import JenisAluminium from "./pages/user/JenisAluminium.jsx";
import JenisBesiLogam from "./pages/user/JenisBesiLogam.jsx";
import JenisElektronik from "./pages/user/JenisElektronik.jsx";
import JenisBotolKaca from "./pages/user/JenisBotolKaca.jsx";
import JenisMerek from "./pages/user/JenisMerek.jsx";
import JenisKhusus from "./pages/user/JenisKhusus.jsx";
import Kerajinansampah from "./pages/user/Kerajinansampah.jsx";
import Tutorialkerajinansampah from "./pages/user/Tutorialkerajinansampah.jsx";
import FormDonasiSampah from "./pages/user/FormDonasiSampah.jsx";
import Aboutus from "./pages/user/Aboutus.jsx";
import Chatbot from "./Components/Chatbot.jsx";

const router = createBrowserRouter([
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/landingpage",
    element: <LandingPage/>,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/jeniskertas",
    element: <JenisKertas />,
  },
  {
    path: "/jenisplastik",
    element: <JenisPlastik />,
  },
  {
    path: "/jenisaluminium",
    element: <JenisAluminium />,
  },
  {
    path: "/jenisbesilogam",
    element: <JenisBesiLogam />,
  },
  {
    path: "/jeniselektronik",
    element: <JenisElektronik />,
  },
  {
    path: "/jenisbotolkaca",
    element: <JenisBotolKaca />,
  },
  {
    path: "/jenismerek",
    element: <JenisMerek />,
  },
  {
    path: "/jeniskhusus",
    element: <JenisKhusus />,
  },
  {
    path: "/kerajinansampah",
    element: <Kerajinansampah />,
  },
  {
    path: "/tutorialkerajinansampah",
    element: <Tutorialkerajinansampah />,
  },
  {
    path: "/formdonasisampah",
    element: <FormDonasiSampah />,
  },
  {
    path: "/aboutus",
    element: <Aboutus />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
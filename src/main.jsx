import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./pages/user/Events.jsx";
import Formpendaftaran from './pages/user/Formpendaftaran.jsx';
import LandingPage from "./pages/user/LandingPage.jsx";
import JenisKertas from "./pages/user/JenisKertas.jsx";
import JenisPlastik from "./pages/user/JenisPlastik.jsx";
import JenisAluminium from "./pages/user/JenisAluminium.jsx";


const router = createBrowserRouter([
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
    path: "/formpendaftaran",
    element: <Formpendaftaran />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
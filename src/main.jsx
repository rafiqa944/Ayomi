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
import FormPembuatanKegiatan from "./pages/user/FormPembuatanKegiatan.jsx";
import FormPendaftaranKegiatan from "./pages/user/FormPendaftaranKegiatan.jsx";
import SignIn from "./pages/user/SignIn.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import Chatbot from "./Components/Chatbot.jsx";
import AyomiPoint from "./pages/user/AyomiPoint.jsx";
import DataUser from "./pages/admin/DataUser.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import SignIn2 from "./pages/admin/SignIn2.jsx"
import Pengaturan from "./pages/user/Pengaturan.jsx";
import UbahProfile from "./pages/user/UbahProfile.jsx";
import RegistrationList from "./pages/admin/RegistrationList.jsx";
import DonationList from "./pages/admin/DonationList.jsx";
import AdminEvents from "./pages/admin/AdminEvents.jsx";
import EventsList from "./pages/admin/RegistrationList.jsx";
import AdminTutorial from "./pages/admin/AdminTutorial.jsx";
// import AdminTutorial from "./pages/admin/AdminTutorial.jsx";

import RingkasanSampah from "./pages/admin/RingkasanSampah.jsx";
import DonasiUser from "./pages/user/DonasiUser.jsx";


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
  {
    path: "/formpembuatankegiatan",
    element: <FormPembuatanKegiatan />,
  },
  {
    path: "/formpendaftarankegiatan/:eventId",
    element: <FormPendaftaranKegiatan />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/ayomipoint",
    element: <AyomiPoint />,
  },
  {
    path: "/datauser",
    element: <DataUser />,
  },
  {
    path: "/dashboard",
    element: < Dashboard/>, 
  },
  {
    path: "/signin2",
    element: < SignIn2 />,
  }, 
  {
    path: "/pengaturan",
    element: < Pengaturan />,
  },  
  {
    path: "/ubahprofile",
    element: < UbahProfile />,
  }, 
  {
    path: "/registrationlist",
    element: < RegistrationList />,
  }, 
  {
    path: "/donationlist",
    element: < DonationList />,
  },
  {
    path: "/adminevents",
    element: < AdminEvents />,
  },
  {
    path: "/eventslist",
    element: < EventsList />,
  },
  {
    path: "/admintutorial",
    element: < AdminTutorial />,
  },
  {
    path: "/donasiuser",
    element: < DonasiUser />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
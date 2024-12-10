import React from 'react';
import './StyleAllJenis.css';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const JenisMerek = () => {
  return (
    <div className="page-jenis-merk">
    <Navbar/>
    <div className="text-merk">
      <h1>Jenis - Jenis Merek</h1>
      <h4>Tidak ada data</h4>
    </div>
    <Footer/>
    </div>
  );
};


export default JenisMerek;



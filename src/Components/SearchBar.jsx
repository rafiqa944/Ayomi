import React from 'react';
import './SearchBar.css';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        className="search-input" 
        placeholder="cari disini" 
      />
      <button className="search-button">
        <IoIosSearch size={24} color="#000" /> 
      </button>
    </div>
  );
};

export default SearchBar;

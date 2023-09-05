import React, { useState } from 'react';
import './searchbar.css';
import 'remixicon/fonts/remixicon.css';
import { Col } from 'reactstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { getToursBySearch } from '../redux/features/tourSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(getToursBySearch(search));
      navigate(`/tours/search?searchQuery=${search}`);
    } else {
      navigate('/userHome');
    }
  };

  return (
    <Col lg='12'>
      <div className='search_bar'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type="text"
            className='search-input form-control'
            placeholder='Search Tour'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="search-button">
            <MDBIcon fas icon="search" className="icon-search" />
          </button>
        </form>
      </div>
    </Col>
  );
};

export default Searchbar;

import React from 'react';
import AgentCard from '../../components/agent/AgentCard';
import Spinner from '../../components/user/Spinner';
import { useSelector } from 'react-redux';
import UserHeader from '../../components/user/UserHeader';
import './Usersearch.css'; // Import your custom CSS file for styling
import UserCard from './UserCard';

const Usercategory = () => {
  const { tours, loading } = useSelector((state) => ({ ...state.tour }));

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="user-search-container">
      {/* <UserHeader/> */}
      <div className="content-wrapper">
        <div className="row mt-5">
          {tours.length === 0 && (
            <h2 className="text-center mb-0">No Tours Found</h2>
          )}
          <div className="col">
            <div className="container">
              <div className="row row-cols-1 row-cols-md-3 g-2">
                {tours.map((item, index) => (
                  <UserCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercategory;

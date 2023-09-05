import React, { useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
// import AgentCard from '../../components/agent/AgentCard';
import { ListTours, setCurrentPage } from '../../redux/features/tourSlice';
import Spinner from '../../components/user/Spinner';
import './UserHome.css';
import UserCard from './UserCard';
import Pagination from './Pagination';

const UserHome = () => {
  const { tours, loading , currentPage , numberOfPages} = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ListTours(currentPage));
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      


      <div className="content-wrapper">
        <MDBRow className='mt-5'>
          {tours.length === 0 && (
            <MDBTypography className='text-center mb-0' tag="h2">
              No Tours Found
            </MDBTypography>
          )}
          <MDBCol>
            <MDBContainer>
              <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
                {tours.map((item, index) => (
                  <UserCard key={index} {...item} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
        <Pagination
        
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
        
        />
      </div>
    </div>
  );
};

export default UserHome;

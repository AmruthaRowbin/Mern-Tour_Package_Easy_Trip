import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/features/userrSlice';
import decode from 'jwt-decode';



const UserHeader = () => {

  const [show, setShow] = useState(false);
  const [showFullUserName, setShowFullUserName] = useState(false); // New state variable
  const user = useSelector((state) => state.userr.user);
  const dispatch = useDispatch();



  const handleLogout = () => {
    dispatch(setLogout());
  };
  
  const userName = user?.UserDoc?.name || user?.result?.name;


console.log(userName,"3333333333333333333333333333333333333333333333333333333333333")

  console.log(user,"useruseruserkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")



//  const token=user?.usertoken;
//  if(usertoken){
//   const decodedToken = decode(token)
//   if(decodedToken.exp * 1000 < new Date().getTime()){
//     dispatch(setLogout())
//   }
//  }






  const toggleUserNameDisplay = () => {
    setShowFullUserName(!showFullUserName);
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: '#f0e6ea' }}>
      <MDBContainer>
        <MDBNavbarBrand href='/' style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}>
          EasyTRIP
        </MDBNavbarBrand>
        <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)} style={{ color: '#606080' }}>
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            
        
            <MDBNavbarItem>
              <MDBNavbarLink href='/userHome'>
                <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result?._id || user?.UserDoc?._id  ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/bookings'>
                    <p className='header-text'>Bookings</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href='/contact'>
                    <p className='header-text'>Contact</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href='/login'>
                    <p className='header-text' onClick={handleLogout}>Logout</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {user?.result?._id || user?.UserDoc?._id ? (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      cursor: 'pointer',
    }}
    onClick={toggleUserNameDisplay}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#606080',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      {userName?.charAt(0)}
    </div>
    {showFullUserName && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>Logged in as: {userName}</p>
        <p>
          <a href="/profile">Profile</a>
        </p>
        <p>
          <a href="/wallet">Wallet</a>
        </p>
      </div>
    )}
  </div>
) : user?.UserDoc?._id ? ( // Handle user?.UserDoc?._id here
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      cursor: 'pointer',
    }}
    onClick={toggleUserNameDisplay}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#606080',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      {userName?.charAt(0)}
    </div>
    {showFullUserName && (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>Logged in as: {userName}</p>
        <p>
          <a href="/profile">Profile</a>
        </p>
        <p>
          <a href="/wallet">Wallet</a>
        </p>
      </div>
    )}
  </div>
) : null}

              </>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p className='header-text'>Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default UserHeader;

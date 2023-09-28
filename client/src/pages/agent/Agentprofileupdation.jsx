import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateAgentPassword, updateAgents } from '../../redux/features/authSlice';

const Agentprofileupdation = () => {
  const agent = useSelector((state) => state.auth.agent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    name: agent?.result?.name || '',
    password: '',
    email: agent?.result?.email || '',
 
  };

  const initialPasswordFormData = {
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [passwordFormData, setPasswordFormData] = useState(initialPasswordFormData);

  useEffect(() => {
    setFormData({
      name: agent?.result?.name || '',
      password: '',
      email: agent?.result?.email || '',
    
      photo: null,
    });
  }, [agent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAgents({ formData, navigate, toast }))
     dispatch(updateAgentPassword({ formData: passwordFormData, navigate, toast }));
  };

  return (
    <div className='main' style={{ marginTop: '150px' }}>
      <MDBContainer style={{ width: '600px', display: 'flex', justifyContent: 'center' }}>
        <MDBRow style={{width: '600px', textAlign:"center"}}>
          <MDBCol>
            <h4>Update Profile</h4>
            <form onSubmit={handleUpdateSubmit}>
              <MDBInput
                label='Name'
                type='text'
                value={formData.name}
                name='name'
                onChange={handleChange}
                style={{ fontSize: '18px', padding: '10px' }}
              />
              <MDBInput
                label='Email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                style={{ fontSize: '18px', padding: '10px', marginTop: '10px' }}
              />
       
              <h4>Update Password</h4>
              <MDBInput
                label='Old Password'
                type='password'
                name='oldpassword'
                value={passwordFormData.oldpassword}
                onChange={handlePasswordChange}
                style={{ fontSize: '18px', padding: '10px' }}
              />
              <MDBInput
                label='New Password'
                type='password'
                name='newpassword'
                value={passwordFormData.newpassword}
                onChange={handlePasswordChange}
                style={{ fontSize: '18px', padding: '10px', marginTop: '10px' }}
              />
              <MDBInput
                label='Confirm Password'
                type='password'
                name='confirmpassword'
                value={passwordFormData.confirmpassword}
                onChange={handlePasswordChange}
                style={{ fontSize: '18px', padding: '10px', marginTop: '10px' }}
              />
              <MDBBtn type='submit' style={{ fontSize: '12px', padding: '10px',backgroundColor:"orangered" }}>
                Update Profile and Password
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Agentprofileupdation ;

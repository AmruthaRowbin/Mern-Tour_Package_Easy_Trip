import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, updateUser } from '../../redux/features/userrSlice';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const user = useSelector((state) => state.userr.user);
  const updateuser = useSelector((state) => state.userr.updateuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    name: user?.result?.name || '',
    password: '',
    email: user?.result?.email || '',
    number: user?.result?.number || '',
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
      name: user?.result?.name || '',
      password: '',
      email: user?.result?.email || '',
      number: user?.result?.number || '',
      photo: null,
    });
  }, [user]);

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
    dispatch(updateUser({ formData, navigate, toast }), [updateuser]);
    dispatch(updatePassword({ formData: passwordFormData, navigate, toast }));
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
              <MDBInput
                label='Phone Number'
                type='text'
                name='number'
                value={formData.number}
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

export default UpdateProfile;

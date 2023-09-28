import React, { useEffect, useState } from 'react';
import './agentchat.css';
import profile from '../../../public/images/icon.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { AgentUsers } from '../../redux/features/authSlice';
import Chatcontainerr from './Chatcontainerr';

const AgentChat = () => {
  const users = useSelector((state) => state.auth.users); 
  const dispatch = useDispatch();
  const[currentChatUser,setCurrentChatUser]=useState()

  useEffect(()=>{
    dispatch(AgentUsers())
  },[dispatch])

  const handleAgent=(e)=>{
    setCurrentChatUser(e)
  }
  return (
    <div className='mainChatContainer'>
      <div className='userDetailsContainer'>
        <div className='searchContainer'>
          <input type="search" placeholder='Search your Agents' className='searchbarforcontact' />
        </div>
        <div className='usersDetailecontainer' >
          {users.map((user) => (
            <div key={user.id} className='userContainer'onClick={(e)=>handleAgent(user)}>
              <img src={profile} className='Chatuserimage' alt="" />
              <div style={{ marginLeft: "10px" }}>
                <p style={{ color: "black", textAlign: "start", marginTop: "5px", fontSize: "15px" }}>{user.name}</p>
                <p style={{ color: "black", textAlign: "start", marginTop: "-16px", fontSize: "14px" }}>Open your message</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='chatContainer'>
      <Chatcontainerr currentChatUser={currentChatUser} />
      </div>
    </div>
  );
};

export default AgentChat;

import React, { useEffect, useState } from 'react';
import './userchat.css';
import profile from '../../../public/images/icon.jpg';
import Chatcontainer from './Chatcontainer';
import { useSelector, useDispatch } from 'react-redux';
import { userAgents } from '../../redux/features/userrSlice';

const Userchat = () => {
  const user = useSelector((state) => state.userr.user);
  const agents = useSelector((state) => state.userr.agents); // Assuming agents is an array of agent objects
  const dispatch = useDispatch();
  const[currentChatAgent,setCurrentChatAgent]=useState()

  useEffect(() => {
    dispatch(userAgents());
  }, [dispatch]);

  console.log(agents, "agents.............................");

  const handleAgent=(e)=>{
    setCurrentChatAgent(e)
  }

  return (
    <div className='mainChatContainer'>
      <div className='userDetailsContainer'>
        <div className='searchContainer'>
          <input type="search" placeholder='Search your Agents' className='searchbarforcontact' />
        </div>
        <div className='usersDetailecontainer' >
          {agents.map((agent) => (
            <div key={agent.id} className='userContainer'onClick={(e)=>handleAgent(agent)}>
              <img src={profile} className='Chatuserimage' alt="" />
              <div style={{ marginLeft: "10px" }}>
                <p style={{ color: "black", textAlign: "start", marginTop: "5px", fontSize: "15px" }}>{agent.name}</p>
                <p style={{ color: "black", textAlign: "start", marginTop: "-16px", fontSize: "14px" }}>Open your message</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='chatContainer'>
        <Chatcontainer currentChatAgent={currentChatAgent}  />
      </div>
    </div>
  );
};

export default Userchat;

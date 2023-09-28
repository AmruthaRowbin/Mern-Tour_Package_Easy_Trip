import React, { useEffect, useRef, useState } from 'react';
import './chatcontainer.css';
import profile from '../../../public/images/icon.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { userCretaemessage, userMessages } from '../../redux/features/userrSlice';
import { io } from "socket.io-client"

const Chatcontainer = ({ currentChatAgent }) => {
  const user = useSelector((state) => state.userr.user);
  const messages = useSelector((state) => state.userr.messages);
  const usermessage = useSelector((state) => state.userr.usermessage);
  const scrollref = useRef()
  const socket = useRef()



  const [inputmessage, setInputMessage] = useState('');

  const dispatch = useDispatch();
  const [arrivalmsg, setArrivalmsg] = useState([])
  const messageData = { from: user?.result?._id, to: currentChatAgent?._id, message: inputmessage };


  useEffect(() => {
    if (user && currentChatAgent !== "") {
      console.log('Socket connecting...');
      socket.current = io("http://localhost:4000");

      socket.current.on("connect", () => {
        console.log('Socket connection established');
        socket.current.emit("addUser", user.result?._id); // Emit addUser event after connection
      });

      socket.current.on("msg-receive", (msg) => {
        console.log(msg, "Message received on user side");
        setArrivalmsg(msg)


      });
    }
  }, [user, currentChatAgent]);




  

  console.log(socket, "socketagent")


  useEffect(() => {
    if (currentChatAgent && user?.result?._id) {
      dispatch(userMessages({ user1Id: currentChatAgent._id, user2Id: user.result._id }));
    }
  }, [dispatch, currentChatAgent, user, usermessage,arrivalmsg]);



  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" })
  })



  const sendmsg = () => {
    if (user?.result?._id) {

      setInputMessage(''); // Clear the input field


      socket.current.emit("send-msg", {
        to: currentChatAgent._id,
        from: user.result._id,
        message: inputmessage
      })

      dispatch(userCretaemessage(messageData))
        .then(() => {
          // Message sent successfully, you can update the message state if needed
          console.log('Message sent successfully');
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error sending message:', error);
          // Remove the message from localMessages if the send fails

        });
    }
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='MainchatContainer'>
      {currentChatAgent && (
        <div style={{ display: "flex", marginLeft: "30px", marginTop: "10px", backgroundColor: "rgb(241 243 241)", width: "60pc", padding: "5px", borderRadius: "10px" }}>
          <img src={profile} className="userProfile" alt="" />
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>{currentChatAgent.name}</p>
        </div>
      )}


      <div>
        <div className='msgContainer'>
          {messages.map((item, index) => (
            <div ref={scrollref} key={index}>
              {item.myself === true ? (
                <div className='msg'>
                  <img src={profile} className="chatuserProfile" alt="" />
                  <p className='msgtxt'>{item.message}</p>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", marginLeft: "10px", backgroundColor: "rgb(241 243 241)", marginTop: "10px", padding: "3px", borderRadius: "10px", width: "30pc", marginLeft: "500px" }}>
                  <p style={{ textAlign: "start", marginLeft: "10px", marginTop: "20px" }}>{item.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='msgcenterconainer'>
          <input type='text' placeholder='write your message to your agent' value={inputmessage} onChange={(e) => setInputMessage(e.target.value)} name='' id="" className='msginput' />
          <button className='msgbutton' onClick={sendmsg}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatcontainer;

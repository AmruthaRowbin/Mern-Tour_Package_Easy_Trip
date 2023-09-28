import React, { useEffect, useRef ,useState} from 'react'
import './chatcontainerr.css';
import profile from '../../../public/images/icon.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AgentCretaemessage, AgentMessages } from '../../redux/features/authSlice';
import {io} from "socket.io-client"

const Chatcontainerr = ({currentChatUser}) => {
    const agent = useSelector((state) => state.auth.agent);
    const messages = useSelector((state) => state.auth.messages);
    const  agentmsg = useSelector((state) => state.auth. agentmsg);
    const [arrivalmsg,setArrivalmsg]=useState([])
    const scrollref=useRef()
    const socket=useRef()
    const dispatch = useDispatch();
    const [inputmessage, setInputMessage] = useState('');
   
    const messageData = { from: agent?.result?._id, to: currentChatUser?._id, message: inputmessage };



    useEffect(() => {
      if (agent && currentChatUser !== "") {

        console.log('Socket connecting...');
        socket.current = io("http://localhost:4000");

        socket.current.on("connect", () => {
          console.log('Socket connection established');
          socket.current.emit("addUser", agent.result?._id);

        });
   
        socket.current.on("msg-receive", (msg) => {
          console.log(msg, "Message received on agent side");
          setArrivalmsg(msg);
          setNewMessageNotification(true);

        });
      }    
      
    }, [agent, currentChatUser]);





    console.log(socket,"socketocococococococ")

    

    useEffect(()=>{
        if (currentChatUser && agent?.result?._id){
          dispatch(AgentMessages({user1Id: currentChatUser._id, user2Id: agent.result._id}))
        }
    },[dispatch, currentChatUser, agent,agentmsg,arrivalmsg])


    
    useEffect(()=>{
      scrollref.current?.scrollIntoView({behavior:"smooth"})
    })

    const sendmsg = () => {
        if (agent?.result?._id) {
      
          setInputMessage(''); 
      
    

          socket.current.emit("send-msg",{
            to:currentChatUser._id,
            from:agent.result._id,
            message:inputmessage
          })
    

          dispatch(AgentCretaemessage(messageData))
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
 


      if (!agent) {
        return <div>Loading...</div>;
      }

  return (



    <div className='MainchatContainer'>
      {currentChatUser && (
        <div style={{ display: "flex", marginLeft: "30px", marginTop: "10px", backgroundColor: "rgb(241 243 241)", width: "60pc", padding: "5px", borderRadius: "10px" }}>
          <img src={profile} className="userProfile" alt="" />
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>{currentChatUser.name}</p>
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
          <input type='text' placeholder='write your message to your clients' value={inputmessage} onChange={(e) => setInputMessage(e.target.value)}  name='' id="" className='msginput' />
          <button className='msgbutton' onClick={sendmsg}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chatcontainerr
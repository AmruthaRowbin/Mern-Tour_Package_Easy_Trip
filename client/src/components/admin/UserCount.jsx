import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admingetAgentCount, admingetOrderCount, admingetTotalearnings, admingetUserCount } from "../../redux/features/adminSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserSecret,
  faShoppingCart,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import './usercount.css';

export default function UserCount() {

  const dispatch = useDispatch();

  const {  usercount,agentcount,ordercount,totalearnings,salesreport } = useSelector((state) => state.admin);
 
  useEffect(() => {
    dispatch(admingetUserCount());
    dispatch(admingetAgentCount())
    dispatch(admingetOrderCount())
    dispatch(admingetTotalearnings())
  
  }, [dispatch]);



  console.log(usercount,"usercountusercountusercountusercountusercountusercountusercountusercount")

  return (
    <div className="count-container">
      <div className="count-item">
        <div className="count-box">
          <FontAwesomeIcon icon={faUsers} size="2x" />
          <h5 className="">Total Users:  {usercount} </h5> 
         
        </div>
      </div>

      <div className="count-item">
        <div className="count-box">
          <FontAwesomeIcon icon={faUserSecret} size="2x" />
          <h5 className="">Total Agents:  {agentcount }</h5>
         
        </div>
      </div>

      <div className="count-item">
        <div className="count-box">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <h5 className="">Total Orders:  {ordercount}</h5>
      
        </div>
      </div>

      <div className="count-item">
        <div className="count-box">
          <FontAwesomeIcon icon={faMoneyBill} size="2x" />
          <h5 className="">Total Earnings: {totalearnings}</h5>
         
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWallet } from "../../redux/features/bookingSlice";
import './wallet.scss';

export default function Wallet() {
  const wallet = useSelector((state) => state.booking.wallets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, [dispatch]);

  return (
    <div className="wallet-container">
      <div className="wallet-info">
        <h2>Welcome, {wallet[0]?.name}</h2>
        <p>Your Wallet Balance is: {wallet[0]?.wallet}/-</p>
        <p>Enjoy Shopping!</p>
      </div>
      <div className="wallet-space"></div>
    </div>
  );
}

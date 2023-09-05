import { useState, useEffect } from "react";

import { format } from 'date-fns'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup, } from 'mdb-react-ui-kit'

import { useDispatch, useSelector } from 'react-redux';
import './bookinglist.css';

import { Navigate } from "react-router-dom";
import { getBookings } from "../../redux/features/bookingSlice";
import TourCancel from "../../components/user/TourCancel";
import Review from "../../components/user/Review";

export default function BookingList() {

    const dispatch=useDispatch()
    const [redirect, setRedirect] = useState(null);
    const [bookings, setBookings] = useState([]);

   
    const user = useSelector(state => state.userr.user);
 
    // const bookings = useSelector((state) => state.booking.bookings);
   
    const { tours, loading } = useSelector((state) => ({ ...state.tour }));

    if (loading) {
      return <Spinner />;
    }
  

    useEffect(() => {
      dispatch(getBookings())
        .then((response) => {
          // Set the bookings data when it's fetched
          setBookings(response.payload);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }, [dispatch, user]);
    console.log(user,"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")

    const handleTourCancellationSuccess = (cancelledBooking) => {
      // Update the local state with the new data received after cancellation
      const updatedBookings = bookings.map((booking) =>
        booking._id === cancelledBooking._id ? { ...booking, deliverystatus: 'Cancelled' } : booking
      );
  
      // Update the local state with the new data
      setBookings(updatedBookings);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
      
            <div className="booking-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="flex flex-col md:flex-row">
                    {booking.place?.imageFile?.length > 0 && (
                      <MDBCardImage
                        className="card-image"
                        src={booking.place.imageFile}
                        position="top"
                        fluid
                      />
                    )}
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:flex-1">
                      <div className="flex-2">
                        <h2 className="booking-card-title">{booking.place.title}</h2>
                        <h2 className="booking-card-text">
                          Booking Date: {format(new Date(booking.bookin), 'yyyy-MM-dd')}
                        </h2>
                        <h2 className="booking-card-text">No of Guests: {booking.guestno}</h2>
                        <h2 className="booking-card-text">Total Price: {booking.total}</h2>
                      </div>
                      <div className="mt-4 md:mt-0 md:mx-auto">
                        <h2
                          className={`text-2xl md:px-4 py-2 rounded-lg ${
                            booking.deliverystatus == 'Success' ? 'md:bg-green-300' : 'md:bg-gray-400'
                          }`}
                        >
                          Tour Status: {booking.deliverystatus}
                        </h2>
                      </div>
                      <div className="mt-4 md:mt-0 booking-card-actions">
                        {booking.deliverystatus !== 'Success' && (
                          <button className="delete-button">
                            <i className="fas fa-trash" style={{ color: '#dd439' }}></i>
                        

                            <TourCancel bookingid={booking._id} onCancellationSuccess={handleTourCancellationSuccess}  />
                          </button>
                        )}
                        {booking.deliverystatus == 'Success' && (
                          <button className="flex items-center gap-2 bg-green-300 rounded-lg px-4 py-2 text-xl">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                          </svg>
                          <Review packageid={booking.place._id} ownerid={booking.owner} />

                        
                      </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
}




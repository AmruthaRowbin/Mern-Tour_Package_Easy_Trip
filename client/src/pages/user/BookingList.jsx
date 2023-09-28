import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { MDBIcon } from "mdb-react-ui-kit";
import "./BookingList.css"; // Create a separate CSS file for styling

import { getBookings } from "../../redux/features/bookingSlice";
import TourCancel from "../../components/user/TourCancel";
import Review from "../../components/user/Review";
import { toast } from "react-toastify";

export default function BookingList() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.userr.user);
  const { loading, error } = useSelector((state) => ({ ...state.booking }))
  const { cancelbookings } = useSelector((state) => ({ ...state.booking.cancelbookings }))

  useEffect(() => {
    dispatch(getBookings())
      .then((response) => {
        const bookingsWithId = response.payload.map((booking) => ({
          ...booking,
          id: booking._id,
        }));
        setBookings(bookingsWithId);
      })
      .catch((error) => {
        
      });
  }, [dispatch, user,cancelbookings]);


  useEffect(()=>{
    if(error){
      toast.error(error,{autoClose:false})
    }
  })

  const handleTourCancellationSuccess = (cancelledBooking) => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === cancelledBooking._id
        ? { ...booking, deliverystatus: "Cancelled" }
        : booking
    );
    setBookings(updatedBookings);
  };

  const columns = [
    {
      field: "placeImage",
      headerName: "Photo",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.row.place.imageFile}
          
            width="100"
            height="100"
          />
         
        </div>
      ),
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      valueGetter: (params) =>params.row.place.city,
        
    },
    {
      field: "bookingDate",
      headerName: "Booking Date",
      width: 150,
      valueGetter: (params) =>
        format(new Date(params.row.bookin), "yyyy-MM-dd"),
    },
    {
      field: "title",
      headerName: "Category",
      width: 150,
      valueGetter: (params) =>params.row.place.title,
        
    },
  
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 150,
      valueGetter: (params) => params.row.total,
    },
    {
      field: "tourStatus",
      headerName: "Tour Status",
      width: 200,
      renderCell: (params) => (
        <span
          className={`text-2xl rounded-lg ${
            params.row.deliverystatus === "Success"
              ? "bg-green-300"
              : "bg-gray-400"
          }`}
        >
          {params.row.deliverystatus}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.deliverystatus !== "Success" && (
            <button className="delete-button"  style={{ backgroundColor: 'green', color: 'white', border: 'none' }}>
            
              <TourCancel
                bookingid={params.row._id}
                onCancellationSuccess={handleTourCancellationSuccess}
              />
            </button>
          )}
          {params.row.deliverystatus === "Success" && (
            <button style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
              <MDBIcon icon="star" />
              <Review
                packageid={params.row.place._id}
                ownerid={params.row.owner}
              />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="data-grid-containerr">
       <div className="addButtonContainerrr">
               Hai {user?.result?.name} its your booking detailes
            </div>
       <div className="datagrid ">
      <DataGrid
        rows={bookings}
        columns={columns}
        pageSize={10}
        checkboxSelection={false}
      />
       </div>
    </div>
     
  );
}

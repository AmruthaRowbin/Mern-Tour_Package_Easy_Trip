import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns'


import {  adminBookingstatus } from "../../redux/features/adminSlice";

import { getTourbybooking } from "../../redux/features/bookingSlice";

export default function Agentbooking() {
    const dispatch = useDispatch();

    const { agent } = useSelector((state) => ({ ...state.auth }))
  
    const { bookings , agentbookings } = useSelector((state) => ({ ...state.booking }));
    
    console.log( agentbookings ,"bokkingshhhhhhhhhhhhhhhhhhhhhhhhhhhhhwqeqweriuriqwrjoqwlkdmasdmlasmf,12344")

  console.log( bookings ,"bokkingshhhhhhhhhhhhhhhhhhhhhhhhhhhhhwqeqweriuriqwrjoqwlkdmasdmlasmf,12344")
    
    const agentId = agent?.result?._id

    useEffect(() => {
        dispatch(getTourbybooking(agentId))
    }, []);


    // function makeRequest(id, status) {
       
    //    dispatch(adminBookingstatus({id,status}))
    // }


   



    const columns = [
     
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'guestno', headerName: 'Guest No', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'orderstatus', headerName: 'Payment Status', width: 130 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'total', headerName: 'Total Price', width: 130 },
        { field: 'deliverystatus', headerName: 'Package Staus', width: 130 },
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
        { field: 'reason', headerName: 'Reason', width: 130 },
    ];

    const mappedRows =  agentbookings.map((booking, index) => ({
        id: index + 1,
        keyid: booking._id,
        date: format(new Date(booking.bookin), 'yyyy-MM-dd'),
        title: booking.place.title,
     
        guestno: booking.guestno,
        name: booking.name,
        orderstatus: booking.orderstatus,
        total: booking.total,
        deliverystatus: booking.deliverystatus,
        reason: booking.reason,
        
      }));

    return (
        <div>
            <div className="addButtonContainerr">
               Booking Management
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    className="dataGrid"
                    rows={ mappedRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 9,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                />
            </Box>
        </div>
    );
}

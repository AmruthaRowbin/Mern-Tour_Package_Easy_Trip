import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns'

import './bookingdatatable.css';
import { adminBooking, adminBookingstatus } from "../../redux/features/adminSlice";

export default function BookingDatatable() {
    const dispatch = useDispatch();

   
  
    const { bookings } = useSelector((state) => ({ ...state.admin }));
    
    console.log(bookings,"bokkingshhhhhhhhhhhhhhhhhhhhhhhhhhhhhwqeqweriuriqwrjoqwlkdmasdmlasmf,12344")



    useEffect(() => {
        dispatch(adminBooking())
    }, []);


    function makeRequest(id, status) {
       
       dispatch(adminBookingstatus({id,status}))
    }


   



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
            field: "status",
            headerName: "Update Status",
            width: 150,
            renderCell: (params) => {
                return (
                    <select
                    value=" "
                    onChange={(e) => {
                        params.api.setEditCellValue({
                            id: params.id,
                            field: 'status',
                            value: e.target.value,
                        });
                        makeRequest(params.row.keyid, e.target.value)
                    }}
                >
                    <option value=" " disabled>
                        Select
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Success">Success</option>
                </select>
                );
            },
            
        },
        { field: 'reason', headerName: 'Reason', width: 130 },
    ];

    const mappedRows = bookings.map((booking, index) => ({
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

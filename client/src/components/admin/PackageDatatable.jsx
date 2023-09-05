import "./packagedatatable.scss";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MDBIcon } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { adminDeletePackage, fetchAdminPackages } from "../../redux/features/adminSlice";

import { useEffect, useState } from "react";

import './bookingdatatable.css';

export default function PackageDatatable() {


    const dispatch = useDispatch()
    const loading = useSelector((state) => state.admin.loading)
    const tours = useSelector((state) => state.admin.tours);
    const [localTours, setLocalTours] = useState([]);
    useEffect(()=>{
        dispatch(fetchAdminPackages())
    },[])

       useEffect(() => {
        setLocalTours(tours); // Update local state when Redux state changes
    }, [tours]);

   
const handleDelete=(_id)=>{
    if(window.confirm("Are you sure want to delete the package"))
    dispatch(adminDeletePackage(_id))
    setLocalTours((prevTours) => prevTours.filter((tour) => tour._id !== _id._id));
   
}


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },

        {
            field: 'title',
            headerName: 'title',
            width: 150,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'name',
            width: 150,
            editable: false,
        },
        {
            field: 'city',
            headerName: 'city',
            width: 150,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'price',
            width: 150,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'category',
            width: 150,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: false,
            type: 'boolean',
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
               
                return <div className="action flex gap-1">

                    <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "red", marginLeft: "10px" ,cursor:"pointer"}}
                        size="lg"
                        onClick={() => handleDelete({ _id: params.row._id })}

                    />
                </div >
            },
        }

    ];

    return (
        <div>
             <div className="addButtonContainerr">
               Package Management
            </div>
        <Box sx={{ height: 400, width: '100%' }}>
           <DataGrid
        className="dataGrid"
        rows={localTours}
        columns={columns}
        pagination
        pageSize={9}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        components={{
          Toolbar: GridToolbar,
        }}
      />
        </Box>
        </div>
    );
}







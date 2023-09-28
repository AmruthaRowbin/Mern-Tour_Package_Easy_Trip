import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { adminCategoryList, adminDeletecategory } from "../../redux/features/adminSlice";
import { Link } from "react-router-dom";
import "./categorydatatable.css";
import './bookingdatatable.css';
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function CategoryDatatable() {
    const dispatch = useDispatch();
   
    const categories = useSelector((state) => state.admin.categories);
    
    const deletecategory = useSelector((state) => state.admin.deletecategory);
    const { loading, error } = useSelector((state) => ({ ...state.admin }))

    const [localCategories, setLocalCategories] = useState([]);

    useEffect(() => {
        dispatch(adminCategoryList());
    }, [deletecategory]);

    useEffect(() => {
        setLocalCategories(categories);
    }, [categories]);
    
    useEffect(()=>{
        if(error){
          toast.error(error,{autoClose:false})
        }
    }, [error]);

    const handleDelete = (_id) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete the category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(adminDeletecategory(_id));
                        setLocalCategories((prevCategories) =>
                            prevCategories.filter((category) => category._id !== _id._id)
                        );
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 150,
            editable: false,
        },
        {
            field: "description",
            headerName: "Description",
            width: 150,
            editable: false,
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            editable: false,
            type: "boolean",
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="action flex gap-1">
                        <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                            size="lg"
                            onClick={() => handleDelete({ _id: params.row._id })}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
          
            <div className="addButtonContainer">
                <Link className="addButton" to={"/adminpanel/category/new"}>
                    Add New Category
                </Link>
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    className="dataGrid"
                    rows={localCategories}
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

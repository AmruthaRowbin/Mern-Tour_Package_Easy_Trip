import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { adminCategoryList, adminDeletecategory } from "../../redux/features/adminSlice";
import { Link } from "react-router-dom";
import "./categorydatatable.css";
import './bookingdatatable.css';

export default function CategoryDatatable() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.admin.loading);
    const categories = useSelector((state) => state.admin.categories);

    const [localCategories, setLocalCategories] = useState([]);

    useEffect(() => {
        dispatch(adminCategoryList());
    }, []);

    useEffect(() => {
        setLocalCategories(categories);
    }, [categories]);

    const handleDelete = (_id) => {
        if (window.confirm("Are you sure you want to delete the category?")) {
            dispatch(adminDeletecategory(_id));
            setLocalCategories((prevCategories) =>
                prevCategories.filter((category) => category._id !== _id._id)
            );
        }
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

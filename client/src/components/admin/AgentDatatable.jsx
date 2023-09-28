import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import { MDBIcon } from "mdb-react-ui-kit";

import { useNavigate } from "react-router-dom"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './userdatatable.scss'; 
import { toast } from "react-toastify"
import { adminApprovalagent, adminBlockagent, adminNotApprovalagent, adminUnBlockagent, fetchAdminAgents } from '../../redux/features/adminSlice';

function AgentDatatable() {
  const [blockStatus, setBlockStatus] = useState(JSON.parse(localStorage.getItem('blockStatus')) || {});
  const [getagentapprovedprofile, setApproveStatus] = useState(JSON.parse(localStorage.getItem('getagentapprovedprofile')) || {});




  const { agents } = useSelector((state) => ({ ...state.admin }));
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAdminAgents())
    const storedBlockStatus = JSON.parse(localStorage.getItem('blockStatus')) || {};
    const storedApprovalStatus=JSON.parse(localStorage.getItem('getagentapprovedprofile')) || {};
    setBlockStatus(storedBlockStatus);
    setApproveStatus(storedApprovalStatus)
  }, [dispatch]);



  useEffect(() => {
    localStorage.setItem('blockStatus', JSON.stringify(blockStatus));
  }, [blockStatus]);


  useEffect(() => {
    localStorage.setItem('getagentapprovedprofile', JSON.stringify(getagentapprovedprofile));
  }, [getagentapprovedprofile]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Username',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'approved',
      headerName: 'Approved',
      width: 120,
      renderCell: (params) => {
        const agent = params.row;
        const isApproved=getagentapprovedprofile[agent.email]

       const toggleApprovalStatus=()=>{
        const newApprovalStatus={...getagentapprovedprofile}
        newApprovalStatus[agent.email]=!isApproved
        setApproveStatus(newApprovalStatus)
        if(isApproved){
          dispatch(adminApprovalagent({email:agent.email,toast}))
        }
        else{
          dispatch(adminNotApprovalagent({email:agent.email,toast}))
        }
        localStorage.setItem('getagentapprovedprofile', JSON.stringify( newApprovalStatus));
       }



       return (
        <button className='actionlink' onClick={toggleApprovalStatus}>
         {isApproved ? (
            <span className='approved-label'> Approved</span>
         ) :(
          <span className='not-approved-label'>Rejected</span>
         )

         }
        </button>
      );
    },
  },
    {
      field: 'block',
      headerName: 'Block',
      width: 150,
      renderCell: (params) => {
        const agent = params.row;
        console.log("userdetails", agent);
        const isBlocked = blockStatus[agent.email];

        const toggleBlockStatus = () => {
          const newBlockStatus = { ...blockStatus };
          newBlockStatus[agent.email] = !isBlocked;
          setBlockStatus(newBlockStatus);
          console.log("blockstatus", blockStatus);
          // dispatch(Userblock({ email: user.email, navigate, toast }));
          if (isBlocked) {
            dispatch(adminBlockagent({ email: agent.email, navigate, toast }));
          } else {
            dispatch(adminUnBlockagent({ email: agent.email, navigate, toast }));
          }
          console.log("Afterdispatchblockstatus", blockStatus);

          console.log("After blocking", agent);
          localStorage.setItem('blockStatus', JSON.stringify(newBlockStatus));
        };
        

        return (
          <div className='action'>
            <button className='actionlink' onClick={toggleBlockStatus}>
            {isBlocked ? (
                <MDBIcon icon='check' className='blocked-icon' />
              ) : (
                <MDBIcon icon='ban' className='unblocked-icon' />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  const mappedRows = agents.map((agent, index) => ({
    id: index + 1,
    name: agent.name,
    email: agent.email,
    blocked: blockStatus[agent.email] || false,
    approved:getagentapprovedprofile[agent.email] || false,
  }));

  return (
    <div className='users'>
    
    <div className="addButtonContainerr">
               Agent Management
            </div>
            <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            className='dataGrid'
            rows={mappedRows}
            columns={columns}
            keyGetter={(row) => row.email} 
            initialState={{
              pagination: {
                pageSize: 5,
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

export default AgentDatatable;
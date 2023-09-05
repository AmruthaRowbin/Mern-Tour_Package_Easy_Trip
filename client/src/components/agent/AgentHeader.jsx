import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/features/authSlice';

const AgentHeader = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setLogout())
    }
    const agent = useSelector(state => state.auth.agent);
    // const {agent}=useSelector((state)=>({...state.agent}))
    console.log('agent', agent)
    const agentName = agent?.result?.name;
    console.log("Agent Name:", agentName);


    return (
        <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href='/agent' style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>
                    EasyTRIP
                </MDBNavbarBrand>
                <MDBNavbarToggler type="button" aria-expanded="false" aria-label='Toggle navigation' onClick={() => setShow(!show)} style={{ color: "#606080" }}>
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        {agent?.result?._id && (
                            <h5 style={{ marginRight: "30px", marginTop: "17px" }}>Logged in as :{agentName}</h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/agent/Home'>
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        {agent?.result?._id ? (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/agent/addTour'>
                                        <p className='header-text'>Add Packages</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/agent/dashboard'>
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/agent/login'>
                                        <p className='header-text' onClick={handleLogout}>Logout</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/agent/login'>
                                    <p className='header-text'>Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default AgentHeader;

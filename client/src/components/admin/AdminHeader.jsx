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
import { setLogout } from '../../redux/features/adminSlice';


const AdminHeader = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setLogout())
    }
    const admin = useSelector(state => state.admin.admin);

    const adminName = admin?.name;

    return (
        <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href='/admin' style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>
                    EasyTRIP
                </MDBNavbarBrand>
                <MDBNavbarToggler type="button" aria-expanded="false" aria-label='Toggle navigation' onClick={() => setShow(!show)} style={{ color: "#606080" }}>
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        {admin?._id && (
                            <h5 style={{ marginRight: "30px", marginTop: "17px" }}>Logged in as :{adminName}</h5>
                        )}


                        {admin?._id ? (
                            <>

                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/admin'>
                                        <p style={{ marginRight: "30px", marginTop: "9px" }} className='header-text' onClick={handleLogout}>Logout</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/admin/login'>
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

export default AdminHeader;

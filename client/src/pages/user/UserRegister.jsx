import React, { useState, useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBValidationItem } from "mdb-react-ui-kit"
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userregister } from '../../redux/features/userrSlice'
import GoogleLogin from './google/GoogleLogin'




const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: ""
}

const UserRegister = () => {
    const [formValue, setFormValue] = useState(initialState)
    const { loading, error } = useSelector((state) => ({ ...state.userr }))
    const { email, password, firstname, lastname, confirmPassword, number } = formValue
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return toast.error("password should match")
        }
        if (email && password && firstname && lastname && confirmPassword && number) {
            dispatch(userregister({ formValue, navigate, toast }))
        }

    }



    const onInputChange = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })

    }
    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>

            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x'>
                    <h5>Sign Up</h5>
                </MDBIcon>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your first name" invalid>
                                <MDBInput
                                    label="First Name"
                                    type="text"
                                    value={firstname}
                                    name="firstname"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your First name"

                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your lastname" invalid>
                                <MDBInput
                                    label="Last Name"
                                    type="text"
                                    value={lastname}
                                    name="lastname"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your lastname"

                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your email" invalid>
                                <MDBInput
                                    label="Email"
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your email"

                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your password" invalid>
                                <MDBInput
                                    label="password"
                                    type="password"
                                    value={password}
                                    name="password"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your password"

                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your password" invalid>
                                <MDBInput
                                    label="password confirm"
                                    type="password"
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your password"

                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter your password" invalid>
                                <MDBInput
                                    label="contact number"
                                    type="number"
                                    value={number}
                                    name="number"
                                    onChange={onInputChange}
                                    required

                                    validation="please provide your password"

                                />
                            </MDBValidationItem>
                        </div>
<GoogleLogin/>
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%", backgroundColor: "orangered", color: "#fff" }} className='mt-2'>
                                Register


                            </MDBBtn>
                        </div>



                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/login">

                        <p>Already have an account ? Sign In</p>
                    </Link >
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}

export default UserRegister
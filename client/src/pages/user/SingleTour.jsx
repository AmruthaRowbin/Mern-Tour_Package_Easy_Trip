import React, { useEffect, useState } from 'react'
import { MDBCard, MDBValidationItem, MDBInput, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './SingleTour.css';

import { getTourssusers } from '../../redux/features/tourSlice';
import { bookPackage, getslots } from '../../redux/features/bookingSlice';
import { allReviewss } from '../../redux/features/reviewSlice';


const SingleTour = () => {
    const dispatch = useDispatch();
    const [slots, setSlots] = useState('')
    const { tour } = useSelector((state) => ({ ...state.tour }));
    const { user } = useSelector((state) => ({ ...state.userr }))
    console.log(tour)
    const { id } = useParams();
    const navigate = useNavigate()

    console.log(user, "userrrrrrrrrrrrrrrrrrr")

    const [bookin, setBookin] = useState('');
    const [guestno, setGuestno] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    useEffect(() => {
        if (id) {
            dispatch(getTourssusers(id));
            dispatch(getslots({ id }))
            dispatch(allReviewss(id))

        }
    }, [id]);







    const handleSubmit = (e) => {
        e.preventDefault();
        const packagedata = { bookin, name, email, guestno, phone, place: tour._id, price: tour.price, owner: user.result };
        dispatch(bookPackage({ packagedata, navigate }))
        // Redirect after booking is successful
        // Redirect to the desired route

        console.log(user.result, "555555555555555555555555555555555")

        console.log(packagedata, 'pppppppppppppppp')

        setBookin('');
        setGuestno(1); // Reset guestno to a number
        setName('');
        setEmail('');
        setPhone('');
    };

    // const bookedDates = slots.map(slot => {
    //     return {
    //         start: new Date(slot.bookin).toISOString().split('T')[0],
    //         end: new Date(slot.bookout).toISOString().split('T')[0]
    //     };
    // });


    return (
        <>
            <MDBContainer>
                <MDBCard className='mb-3 mt-2'>
                    <MDBCardImage
                        position='top'
                        style={{ width: '100%', maxHeight: '500px' }}
                        src={tour.imageFile}
                        alt={tour.title}
                    />
                    <MDBCardBody>
                        <h3>{tour.title}</h3>
                        <span>
                            <p className='text-start tourName'>Created By: {tour.name}</p>
                        </span>
                        <div style={{ float: 'left' }}>
                            <span className='text-start'>
                                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className='text-start mt-2'>
                            <MDBIcon
                                style={{ float: 'left', margin: '5px' }}
                                far
                                icon='calendar-alt'
                                size='lg'
                            />
                            <small className='text-muted'>{moment(tour.createdAt).fromNow()}</small>
                        </MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>{tour.description}</MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>{tour.city}</MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>price: {tour.price}/person</MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>{tour.dayone}</MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>{tour.daytwo}</MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>category:{tour.category}</MDBCardText>
                        <br />
                        <br />

                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='bookin'
                                    type='date'
                                    value={bookin}
                                    name='bookin'
                                    onChange={(ev) => { setBookin(ev.target.value) }}
                                    className='form-control'
                                    required
                                // invalid={validation.bookin}
                                // validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='guestno'
                                    type='Number'
                                    value={guestno}
                                    name='guestno'
                                    onChange={(ev) => { setGuestno(ev.target.value) }}
                                    className='form-control'
                                    required
                                // invalid={validation.bookin}
                                // validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>

                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='name'
                                    type='text'
                                    value={name}
                                    name='name'
                                    onChange={(ev) => setName(ev.target.value)}
                                    className='form-control'
                                    required
                                // invalid={validation.bookin}
                                // validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='email'
                                    type='text'
                                    value={email}
                                    name='email'
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    className='form-control'
                                    required
                                // invalid={validation.bookin}
                                // validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>

                        <div className='col-md-12'>
                            <MDBValidationItem feedback="please enter the title" invalid>
                                <MDBInput
                                    placeholder='phone'
                                    type='text'
                                    value={phone}
                                    name='phone'
                                    onChange={(ev) => setPhone(ev.target.value)}
                                    className='form-control'
                                    required
                                // invalid={validation.bookin}
                                // validation="please provide title"



                                />
                            </MDBValidationItem>

                        </div>






















                        <div className='book-button-container'>
                            <MDBBtn onClick={handleSubmit} className='book-button'>
                                Book This Package
                            </MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default SingleTour;

import React, { useEffect, useState } from 'react';
import { MDBCard, MDBValidationItem, MDBInput, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './SingleTour.css';

import { getTourssusers, getrelatedTours } from '../../redux/features/tourSlice';
import { bookPackage, getslots } from '../../redux/features/bookingSlice';
import { allReviewss } from '../../redux/features/reviewSlice';
import Relatedtour from '../../components/user/Relatedtour';

const SingleTour = () => {
    const dispatch = useDispatch();
    const [slots, setSlots] = useState('');
    const { tour ,relatedtours} = useSelector((state) => ({ ...state.tour }));
    const { user } = useSelector((state) => ({ ...state.userr }));
    const tags=tour?.tags
    console.log(tour);
    const { id } = useParams();
    const navigate = useNavigate();

    const [bookin, setBookin] = useState('');
    const [guestno, setGuestno] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    useEffect(()=>{
        tags && dispatch(getrelatedTours(tags))
    },[tags])
    console.log(tags,'tagsjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    

    useEffect(() => {
        if (id) {
            dispatch(getTourssusers(id));
            dispatch(getslots({ id }));
            dispatch(allReviewss(id));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const packagedata = { bookin, name, email, guestno, phone, place: tour._id, price: tour.price, owner: user.result ||user.UserDoc,
          
creator: tour.creator };
        dispatch(bookPackage({ packagedata, navigate }));

        setBookin('');
        setGuestno(1);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <MDBContainer>
            <div className="row">
                <div className="col-md-8">
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
                            <p className='text-start tourName'>Created By: {tour.name} </p>

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
                        </MDBCardBody>
                       
                    </MDBCard>
                    <MDBCard>
                    <Relatedtour relatedtours={relatedtours} tourId={id}/>
                    </MDBCard>
                </div>
                
                <div className="col-md-4">
                    
                <div className="booking-form-container" style={{ marginTop: '180px' }}>
                    <MDBCard className="mb-3">
                    <h1 color='orangered' ><a href="/contact">&#x1F4AC; Chat with us</a></h1>
                        <MDBCardBody>
                          
                            <h3 className="book-now-header">Book Now</h3>
                            <div className='form-group'>
                                <MDBValidationItem feedback="Please enter the date" invalid>
                                    <MDBInput
                                        label='Date'
                                        type='date'
                                        value={bookin}
                                        name='bookin'
                                        onChange={(ev) => { setBookin(ev.target.value) }}
                                        required
                                        min={moment().format('YYYY-MM-DD')}
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className='form-group'>
                                <MDBValidationItem feedback="Please enter the number of guests" invalid>
                                    <MDBInput
                                        label='Number of Guests'
                                        type='number'
                                        value={guestno}
                                        name='guestno'
                                        onChange={(ev) => { setGuestno(ev.target.value) }}
                                        required
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className='form-group'>
                                <MDBValidationItem feedback="Please enter your name" invalid>
                                    <MDBInput
                                        label='Your Name'
                                        type='text'
                                        value={name}
                                        name='name'
                                        onChange={(ev) => setName(ev.target.value)}
                                        required
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className='form-group'>
                                <MDBValidationItem feedback="Please enter your email" invalid>
                                    <MDBInput
                                        label='Your Email'
                                        type='text'
                                        value={email}
                                        name='email'
                                        onChange={(ev) => setEmail(ev.target.value)}
                                        required
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className='form-group'>
                                <MDBValidationItem feedback="Please enter your phone number" invalid>
                                    <MDBInput
                                        label='Your Phone Number'
                                        type='text'
                                        value={phone}
                                        name='phone'
                                        onChange={(ev) => setPhone(ev.target.value)}
                                        required
                                    />
                                </MDBValidationItem>
                            </div>
                            <div className='book-button-container'>
                                <MDBBtn onClick={handleSubmit} className='book-button'style={{
                                            backgroundColor: 'orangered',
                                            width: '100%', // Increase width
                                            transition: 'background-color 0.3s ease-in-out', // Add hover effect
                                        }}>
                                    Book This Package
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                     
                    </MDBCard>
                </div>
           
            </div>
            </div>
            <div></div>
        </MDBContainer>
    );
}

export default SingleTour;

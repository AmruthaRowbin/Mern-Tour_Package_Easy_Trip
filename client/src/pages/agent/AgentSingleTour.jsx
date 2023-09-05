import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getSingleTour } from '../../redux/features/tourSlice';
import './agentsingleTour.css';

const AgentSingleTour = () => {
    const dispatch = useDispatch();
    // const [tour]= useSelector(state => state.tour.agentTours);
    const { tour } = useSelector(state => state.tour);
    console.log(tour,"cxxvxvfdbf")
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getSingleTour(id))
        }
    }, [id]);

   

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
                        <div className='book-button-container'>
   
</div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default AgentSingleTour

import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


const AgentCard = ({ imageFile, description, title, tags, _id, name, city, price }) => {


     const excerpt=(str)=>{
        if(str.length>45){
            str=str.substring(0, 45) + "....";
        }
        return str;
     }

    return (
        <MDBCardGroup>
            <MDBCard className='h-100 mt-2 d-sm-flex agent-card'>
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position='top'
                    className='card-image'
                />
                <div className='top-left'>{name}</div>
                <div className='text-start tag-card'>
                    {tags.map((item, index) => (
                        <span key={index}>#{item} </span>
                    ))}
                </div>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                    <MDBCardTitle className='text-start'>{city}</MDBCardTitle>
                    <MDBCardTitle className='text-start'>{price}</MDBCardTitle>
                    <MDBCardText className='text-start'>
                        {excerpt(description)}{' '}
                        <Link to={`/agent/tour/${_id}`}>
                            Read More
                        </Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
}

export default AgentCard;

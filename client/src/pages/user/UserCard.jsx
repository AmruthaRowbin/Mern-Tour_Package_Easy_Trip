import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup,MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useParams,useNavigate } from 'react-router-dom'


const UserCard = ({ imageFile, description, title, tags, _id, name, city, price }) => {

    const navigate=useNavigate()
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
                    {tags.map((tag) => (
                       <Link to={`/tag/${tag}`}> #{tag}</Link>
                    ))}
                </div>
                <MDBCardBody>
                    <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
                    <MDBCardTitle className='text-start'>{city}</MDBCardTitle>
                    <MDBCardTitle className='text-start'>{price}/person</MDBCardTitle>
                    <MDBCardText className='text-start'>
                        {excerpt(description)}{' '}
                        
                        
                        <MDBBtn size='sm' rounded color='danger' onClick={()=>navigate(`/tour/${_id}`)}>
                             Read More
                            </MDBBtn>

                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
}

export default UserCard;

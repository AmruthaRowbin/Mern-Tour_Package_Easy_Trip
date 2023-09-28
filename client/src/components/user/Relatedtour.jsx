import React from 'react'
import { MDBRow,MDBCol,MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage } from 'mdb-react-ui-kit'
import {Link} from 'react-router-dom'
import { excerpt } from '../../utility'

const Relatedtour = ({relatedtours,tourid}) => {
  return (
    <>
{relatedtours && relatedtours.length > 0 && (
    <>
     {relatedtours.length > 1 && <h4> Related Tours</h4>}

     <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
     {relatedtours.filter((item)=>item._id !==tourid).splice(0, 3).map((item)=>(
        <MDBCol>
            <MDBCard>
               <Link to={`/tour/${item._id}`}>
                <MDBCardImage
                src={item.imageFile}
                alt={item.title}
                position='top'

                />
                <span className='text-start tag-card'>
                    {item.tags.map((tag)=>(
                        <Link to={`/tag${tag}`}> #{tag}</Link>
                    ))}
                </span>
                <MDBCardBody>
                    <MDBCardTitle className='text'>{item.title}</MDBCardTitle>
                    <MDBCardText className='text-start'>{excerpt(item.description,45)}</MDBCardText>
                </MDBCardBody>
               </Link>
            </MDBCard>
        </MDBCol>
         ))}
     </MDBRow>


    
    </>
   
)}

    </>
  )
}

export default Relatedtour
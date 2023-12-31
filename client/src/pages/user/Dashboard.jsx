import React, { useEffect } from 'react'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup, } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTours, getTourbyagent } from '../../redux/features/tourSlice'
import Spinner from '../../components/user/Spinner'
import { toast } from "react-toastify"



const Dashboard = () => {


    const excerpt=(str)=>{
        if(str.length>45){
            str=str.substring(0, 45) + "....";
        }
        return str;
     }

    const { agent } = useSelector((state) => ({ ...state.auth }))
    const { agentTours, loading,categories } = useSelector((state) => ({ ...state.tour }))
    const agentId = agent?.result?._id
    const dispatch = useDispatch()
    console.log('sadsaffsf')
    console.log(agentTours)

    useEffect(() => {
        if (agentId) {
            dispatch(getTourbyagent(agentId))
        }
    }, [agentId])



    if (loading) {

        return <Spinner />
    }



    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete"))
            dispatch(deleteTours({ id, toast }))
    }



    return (
        <div style={{ margin: "auto", padding: "120px", maxWidth: "900px", alignContent: 'center' }}>

            <h4 className='text-center'>Dashboard:{agent?.result?.name}</h4>
            <hr style={{ maxWidth: "570px" }} />

            {agentTours && agentTours.map((item) => (


                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: "600px" }} className='mt-2'>
                        <MDBRow className='g-0'>
                            <MDBCol md="4">
                                <MDBCardImage className='rounded' src={item.imageFile} alt={item.title} fluid />



                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody >
                                    <MDBCardTitle className='text-start'>
                                        {item.title}

                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>
                                        {excerpt(item.description, 150)}
                                        </small>

                                    </MDBCardText>
                                    <div style={{ marginLeft: "5px", float: "right", marginTop: "-60px" }}>
                                        <MDBBtn className='mt-1' tag="a" color='none'>
                                            <MDBIcon
                                                fas
                                                icon="trash"
                                                style={{ color: "#dd439" }}
                                                size="lg"
                                                onClick={() => handleDelete(item._id)}

                                            />



                                        </MDBBtn>
                                        <Link to={`/agent/editTour/${item._id}`}>
                                            <MDBIcon
                                                fas
                                                icon="edit"
                                                style={{ color: "#55acee", marginLeft: "10px" }}
                                                size="lg" />


                                        </Link>





                                    </div>
                                </MDBCardBody>

                            </MDBCol >

                        </MDBRow>

                    </MDBCard>
                </MDBCardGroup>

            ))}

        </div>
    )
}

export default Dashboard

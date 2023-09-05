import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import AgentCard from '../../components/agent/AgentCard'
import { getTours } from '../../redux/features/tourSlice'
import AgentHeader from '../../components/agent/AgentHeader'
import Pagination from '../user/Pagination'









const AgentHome = () => {

  const { tours, loading } = useSelector((state) => ({ ...state.tour }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTours())
  }, [])

  if (loading) {

    return <h2>Loading</h2>
  }
  return (

  <div>
<AgentHeader/>

  
    <div
    
    
    
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "1000px",
      alignContent: "center"

    }}>

      <MDBRow className='mt-5'>
        {tours.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours.map((item, index) => <AgentCard key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {/* <Pagination/> */}
    </div>
    </div>
  )
}

export default AgentHome
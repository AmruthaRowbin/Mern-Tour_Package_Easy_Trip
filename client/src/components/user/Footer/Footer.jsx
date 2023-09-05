import React from 'react'
import './footer.css';
import {Container,Row, Col,ListGroup,ListGroupItem} from "reactstrap"
import {Link} from "react-router-dom"
import logo from '../../../assets/logo.jpg'
import 'remixicon/fonts/remixicon.css';

const quick_links=[
    {
        path:'/home',
        display:"Home"
    },
    {
        path:"/about",
        display:"About",
    },
    {
        path:"/tours",
        display:"Tours",
    },
]
const quick_links2=[
    {
        path:'/home',
        display:"Home"
    },
    {
        path:"/about",
        display:"About",
    },
    {
        path:"/tours",
        display:"Tours",
    },
]
const Footer = () => {
  return (
   <footer className='footer'>
    <Container>
        <Row>
            <Col lg="3">
            <div className='logo'>
             <h4>Easytrip</h4>
               
                <div className='social_links d-flex align-items-center gap-4'>
                    <span>
                        <Link to='#' ><i class="ri-youtube-fill"></i> </Link>
                    </span>
                    
                    <span>
                        <Link to='#' ><i class="ri-facebook-circle-fill"></i></Link>
                    </span>
                    <span>
                        <Link to='#' ><i class="ri-instagram-line"></i> </Link>
                    </span>
                    <span>
                        <Link to='#' ><i class="ri-twitter-fill"></i> </Link>
                    </span>
                    
                </div>
            </div>
            </Col>
            <Col lg='3' >
               <h5 className='footer_link-title'>Discover</h5> 
               <ListGroup className='footer_quick-links'>
                {
                    quick_links.map((item,index)=>(
                        <ListGroupItem key={index} className='ps-0 border-0'>
                            <Link to={item.path}>{item.display}</Link>
                        </ListGroupItem>
                    ))
                }

               </ListGroup>
            </Col>
             <Col lg='3' >
             <h5 className='footer_link-title'>QuickLinks</h5> 
               <ListGroup className='footer_quick-links'>
                {
                    quick_links2.map((item,index)=>(
                        <ListGroupItem key={index} className='ps-0 border-0'>
                            <Link to={item.path}>{item.display}</Link>
                        </ListGroupItem>
                    ))
                }

               </ListGroup>
             </Col>
             <Col lg='3' >
             <h5 className='footer_link-title'>Address</h5> 
               <ListGroup className='footer_quick-links'>
                
                  
                        <ListGroupItem   className='ps-0 border-0 d-flex align-items-center gap-3'>
                            <h6 className='mb-0 d-flex align-items-center gap-2'>
                                <span>
                                    <i class='ri-map-pin-line'></i>
                                    Address
                                </span>
                            </h6>
                            <p className='mb-0'>Kochi,Kerala</p>
                           
                        </ListGroupItem>
                                          
                        <ListGroupItem   className='ps-0 border-0 d-flex align-items-center gap-3'>
                            <h6 className='mb-0 d-flex align-items-center gap-2'>
                                <span>
                                    <i class='ri-mail-line'></i>
                                    Email:
                                </span>
                            </h6>
                            <p className='mb-0'>amrtha1994@gmail.com</p>
                           
                        </ListGroupItem>
                                          
                        <ListGroupItem   className='ps-0 border-0 d-flex align-items-center gap-3'>
                            <h6 className='mb-0 d-flex align-items-center gap-2'>
                                <span>
                                    <i class='ri-phone-fill'></i>
                                    phone:
                                </span>
                            </h6>
                            <p className='mb-0'>99999999999</p>
                           
                        </ListGroupItem>
                    
                    
                    
                

               </ListGroup>
             </Col>
             
        </Row>
    </Container>
   </footer>
  )
}

export default Footer



import React from 'react'
import './home.css';
import {Container ,Row,Col} from 'reactstrap'
import heroImg from '../../../assets/hero-img01.jpg'
import heroImg02  from '../../../assets/hero-img02.jpg'
import heroVideo from '../../../assets/hero-video.mp4'
import Subtitle from '../../../shared/Subtitle';
import worldImg from '../../../assets/world.png';
import Searchbar from '../../../shared/Searchbar';
import UserHome from '../../../pages/user/UserHome';
import UserHeader from '../UserHeader';
import ServiseList from '../services/ServiseList';
import experienceImg from '../../../assets/experience.png'
import Footer from '../Footer/Footer';


const Home = () => {
  return (
  <>
   <UserHeader/>
  <section>
    <Container>
        <Row>
            <Col lg='6'>
              <div className='hero_content'>
                <div className='hero_subtitle d-flex align-items-center' >
                    <Subtitle subtitle ={'Know Before You Go'}/>
                    <img src={worldImg} alt=''/>
                </div>
                <h1>Travelling opens the doors to creating <span className='highlight'>memories</span> </h1>
                <p>
                    cbhsjdishosjvdskvlkdsnvjdvjdvjbCnsc jkdsvbhdsbvdsvbjxcnmxnvcjdsvbjdbvjdnvcjbbvjaf
                </p>
                </div>  
            </Col>

            <Col lg='2' >
                <div className='hero_img_box'>
                    <img src={heroImg} alt=''/>
                </div>
            </Col>
            <Col lg='2' >
                <div className='hero_img_box mt-4'>
                    <video src={heroVideo} alt='' controls/>
                </div>
            </Col>
            <Col lg='2' >
                <div className='hero_img_box mt-5'>
                    <img src={heroImg02} alt=''/>
                </div>
            </Col>
            <Searchbar/>
        </Row>
    </Container>
  </section>

  <section>
    <Container>
        <Row>
            <Col lg='3'  className='text-center services_col'>
                <h5 className='services_subtitle'>What we serve</h5>
                <h2 className='services_title'>We offer our best services</h2>
            </Col>
            <ServiseList/>


        </Row>
    </Container>
  </section>

  <section>
    <Container>
        <Row>
            <Col lg="12" className='mb-5'>
                <Subtitle subtitle={"Explore"}/>
                <h2 className='featured_tour-title'>Our featured tours</h2>


            <UserHome/>
            </Col>
        </Row>
    </Container>
  </section>

  <section>
    <Container>
        <Row>
            <Col lg='6'>
                <div className='experience_content'>
                  <Subtitle subtitle={"Experience"}/>
                  <h2>With our all experience <br/> we will serve you</h2>
                  <p>hbchdsbvfjerngkmdslmaksnandsnjmvc ksdnvkjnakadsmcjanv md <br/>
                   vnjaknjkfjrfnasdnfjk</p>

                </div>

                <div className='counter_wrapper d-flex align-items-center gap-5'>
                    <div className='conter_box'>
                        <span>12K+</span>
                        <h6>Successful Trip</h6>
                    </div>
                    <div className='conter_box'>
                        <span>12K+</span>
                        <h6>Regular clients</h6>
                    </div>
                        
                    <div className='conter_box'>
                        <span>15</span>
                        <h6>Years of experience</h6>
                    </div>
                        
                        
                </div>
            </Col>
            <Col lg='6'>

       <div className='experience_img'>
        <img src={experienceImg} alt=''/>
       </div>

            </Col>
        </Row>
    </Container>
   
  </section>
  </>
  )
}

export default Home


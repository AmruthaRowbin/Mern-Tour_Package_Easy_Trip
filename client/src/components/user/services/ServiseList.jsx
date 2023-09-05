import React from 'react';
import { Col } from 'reactstrap';
import ServiceCard from './ServiceCard';
import weatherIMG from '../../../assets/weather.png';
import { Link } from 'react-router-dom'; // Import Link
import { getToursBySearchcategory } from '../../../redux/features/tourSlice';
import { useDispatch } from 'react-redux';

const servicesData = [
  {
    imgUrl: weatherIMG,
    title: 'Honeymoon package',
    
  },
  {
    imgUrl: weatherIMG,
    title: 'Family Package',
   
  },
  {
    imgUrl: weatherIMG,
    title: 'Winter Package',
   
  },
];

const ServiseList = () => {
  const dispatch = useDispatch();

  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          {/* Use Link to make the title clickable */}
          <Link
            to={`/tours/searchcategory?searchQuery=${item.title}`}
            onClick={() => dispatch(getToursBySearchcategory(item.title))}
          >
            <ServiceCard item={item} />
          </Link>
        </Col>
      ))}
    </>
  );
};

export default ServiseList;

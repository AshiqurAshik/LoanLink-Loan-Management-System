import React from 'react';
import Banner from './Banner';
import AvailableLoan from './AvailableLoan';
import Tutorial from './Tutorial';
import Feedback from './Feedback';
import Feature from './Feature';
import Catagory from './Catagory';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AvailableLoan></AvailableLoan>
      <Catagory></Catagory>
      <Tutorial></Tutorial>
      <Feedback></Feedback>
      <Feature></Feature>
    </div>
  );
};

export default Home;

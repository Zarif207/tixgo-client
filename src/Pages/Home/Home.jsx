import React from 'react';
import HeroSection from './HeroSection';
import Advertisement from './Advertisement';
import LatestTickets from './LatestTickets';
import Extra_1 from './Extra_1';
import Extra_2 from './Extra_2';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <Advertisement/>
            <LatestTickets/>
            <Extra_1/>
            <Extra_2/>
        </div>
    );
};

export default Home;
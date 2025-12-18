import React from 'react';
import HeroSection from './HeroSection';
import Advertisement from './Advertisement';
import LatestTickets from './LatestTickets';
import Extra_1 from './Extra_1';
import Extra_2 from './Extra_2';
import Border from './Border';

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <Advertisement/>
            <Border/>
            <LatestTickets/>
            <Extra_1/>
            <Extra_2/>
        </div>
    );
};

export default Home;
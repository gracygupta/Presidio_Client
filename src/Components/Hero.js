import React from 'react';
import {Link} from "react-router-dom";

function Hero() {
    return (
        <section className="bg-blue-500 py-16">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Find Your Dream Rental
                </h1>
                <p className="text-2xl text-white mb-8">
                    Discover the perfect place to call home.
                </p>
                {/*<button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">*/}
                {/*    Start Exploring*/}
                {/*</button>*/}

                {/* Call-to-Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Link to="/login" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
                        Sign Up
                    </Link>
                </div>
            </div>
        </section>
    );
}




export default Hero;

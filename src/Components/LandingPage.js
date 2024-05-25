import React from 'react';
import Hero from './Hero'; // Import your Hero component
import PropertyList from './PropertyList'; // Import your PropertyList component

function LandingPage() {
    return (
        <main className="bg-gray-100 min-h-screen">
            <Hero /> {/* Render your Hero component */}
            <div className="container mx-auto py-12"> {/* Main content container */}
                <h2 className="text-3xl font-bold text-center mb-8">
                    Explore Rental Properties
                </h2>
                <PropertyList /> {/* Render your PropertyList component */}
            </div>
        </main>
    );
}

export default LandingPage;
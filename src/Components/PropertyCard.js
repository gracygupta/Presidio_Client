import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

function PropertyList() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch property data from backend API
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => setProperties(data));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}

export default PropertyList;
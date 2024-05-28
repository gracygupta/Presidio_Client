import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import axios from "axios";
import { api } from "../constants";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${api}/properties`);
        setProperties(response.data.properties || response.data); // Handle different API responses
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(err.message || "Failed to fetch properties"); // Set error message
      } finally {
        setIsLoading(false); // Data fetching is complete
      }
    };

    fetchProperties();
  }, []);

  // Loading State
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading properties...</p>;
  }

  // Error State
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500">No Properties to show</p>
      )}
    </>
  );
}

export default PropertyList;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../constants";

function PropertyCard({ property }) {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});

  // Ref for the details panel
  const detailsPanelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showDetails) {
      // Focus the details panel when it opens
      detailsPanelRef.current.focus();

      // Add event listener to close the panel when clicking outside
      const handleClickOutside = (event) => {
        if (
          detailsPanelRef.current &&
          !detailsPanelRef.current.contains(event.target)
        ) {
          setShowDetails(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDetails]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      setDetails(property);
    } else {
      setDetails({});
    }
  };

  // Function to decode base64 images
  const decodeImage = (base64String) => {
    try {
      // Convert base64 to data URI (URL for displaying in <img>)
      return `data:image/png;base64,${base64String}`;
    } catch (error) {
      // Handle decoding errors (e.g., use placeholder image)
      console.error("Error decoding image:", error);
      return "placeholder-image-url";
    }
  };

  const handleInterested = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id; // Get user ID from localStorage

      if (!userId) {
        // User not logged in, redirect to login
        navigate("/login");
        return;
      }

      const response = await axios.post(`${api}/inquire`, {
        propertyId: property._id,
        userId: userId,
      });

      console.log("response.data", response.data);
      console.log("response.status", response.status);
      if (response.status === 200) {
        alert("Interest registered successfully!");
      } else {
        throw new Error("Failed to register interest");
      }
    } catch (error) {
      console.error("Error registering interest:", error);
      alert(
        error.response?.data?.error ||
          "An error occurred while registering interest."
      ); // Show error message to the user
    }
  };

  const handleLike = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id; // Get user ID from localStorage

      if (!userId) {
        // User not logged in, redirect to login
        navigate("/login");
        return;
      }

      const response = await axios.post(`${api}/like`, {
        propertyId: property._id,
        userId: userId,
      });

      if (response.status === 201) {
        alert("Your response has been noted");
      } else {
        throw new Error("Failed to register your response");
      }
    } catch (error) {
      console.error("Error liking:", error);
      alert(error.response?.data?.error || "Failed to register your response"); // Show error message to the user
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            key={property.images[0]?.originalName}
            src={decodeImage(property.images[0]?.data)} // Access image.data for base64 string
            alt={`${details.title} - ${property.images[0]?.originalName}`}
            className="w-20 h-20 object-cover rounded-md"
          />
        ) : (
          <img
            src="placeholder-image-url"
            alt="Placeholder"
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold">{property.title}</h2>
          <p className="text-gray-600">
            {property.numberOfBedrooms} BHK | {property.numberOfBathrooms} Bath
          </p>
          <p className="text-gray-600">
            {property.location.city}, {property.location.state}
          </p>
          <p className="text-blue-500 font-bold">₹{property.rent}/month</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleInterested}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              I'm Interested
            </button>
            <button
              onClick={handleLike}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Like
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={toggleDetails}
            >
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Slide-in Details Panel */}
      <div
        ref={detailsPanelRef} // Add ref to the panel
        className={`fixed top-0 right-0  h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          showDetails ? "translate-x-0" : "translate-x-full"
        } z-10`} // Fixed positioning, full width and height, higher z-index
      >
        <div className="p-6 overflow-y-auto h-full">
          {/* Detailed Property Information */}
          <h3 className="text-xl font-semibold mb-2">{details.title}</h3>
          <p>Description: {details.description}</p>
          <p>Place: {details.place}</p>
          <p>Area: {details.area}</p>
          {/* <p>Owner: {details.owner}</p> */}
          {/* <p>City: {details.location.city}</p> */}
          <p>Number of Bedrooms: {details.numberOfBedrooms}</p>
          <p>Number of Bedrooms: {details.numberOfBathrooms}</p>
          {/* Add more fields as needed */}
          <p>Click I'm Interested to get owner details</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleInterested}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              I'm Interested
            </button>
            <button
              onClick={handleLike}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Like
            </button>
            <button
              onClick={toggleDetails}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { api } from "../constants";
import AddProperty from "./AddProperty";
import PropertyCard from "../Components/PropertyCard";
import NavBar from "../Components/Nav";

function OwnedProperties() {
  const [properties, setProperties] = useState([]);
  const [showAddPropertyPanel, setShowAddPropertyPanel] = useState(false);
  const addPropertyPanelRef = useRef(null); // Ref for the panel

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return; // Handle case where user is not logged in
        const response = await axios.get(`${api}/properties/owned/${user._id}`);
        setProperties(response.data.properties || []); // Handle empty response
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties(); // Fetch properties on initial load
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAddPropertyPanel && // Only handle clicks when panel is open
        addPropertyPanelRef.current &&
        !addPropertyPanelRef.current.contains(event.target)
      ) {
        closeAddPropertyPanel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddPropertyPanel]); // Re-attach listener when showAddPropertyPanel changes

  const handleAddPropertyClick = () => {
    setShowAddPropertyPanel(true);
  };

  const closeAddPropertyPanel = () => {
    setShowAddPropertyPanel(false);
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Properties</h1>
        <div className="flex justify-between">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900"></h2>
          <button
            onClick={handleAddPropertyClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add New Property
          </button>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't added any properties yet.</p>
        )}

        {/* Add Property Slide-in Panel (with ref) */}
        {/* {showAddPropertyPanel && (
        <div
          ref={addPropertyPanelRef}
          className={`fixed top-0 right-0 w-screen h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 z-10`}
        >
          <div className="overflow-y-auto h-full">
            <AddProperty closePanel={closeAddPropertyPanel} />
          </div>
        </div>
      )} */}

        {showAddPropertyPanel && (
          <div
            ref={addPropertyPanelRef}
            className={`fixed top-0 right-0 w-screen h-screen bg-white shadow-lg transform transition-transform duration-700 ease-in-out ${
              showAddPropertyPanel ? "translate-x-0" : "translate-x-full" // Conditional translation
            } z-10`} // Fixed positioning, full width and height, higher z-index
          >
            <div className="overflow-y-auto h-full relative">
              {/* Close Button */}
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
                onClick={closeAddPropertyPanel}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>

              <AddProperty closePanel={closeAddPropertyPanel} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default OwnedProperties;

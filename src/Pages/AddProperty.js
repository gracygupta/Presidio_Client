import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../constants";

function AddProperty() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    place: "",
    area: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    location: {
      city: "",
      state: "",
      zip: "",
    },
    amenities: [],
    images: [],
    rent: "",
  });
  const [newAmenity, setNewAmenity] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]: value,
        },
      }));
    } else if (name === "amenities" || name.startsWith("nearbyPlaces.")) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, newAmenity.trim()],
      }));
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      amenities: prevData.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!user) {
      alert("Please login before adding a property.");
      return;
    }

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "location") {
        form.append(key, JSON.stringify(formData[key]));
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => form.append(key, item));
      } else {
        form.append(key, formData[key]);
      }
    });

    for (const image of formData.images) {
      form.append("images", image);
    }

    const userData = await JSON.parse(localStorage.getItem("user"));
    form.append("ownerId", userData._id);

    try {
      const response = await axios.post(`${api}/properties`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Property added successfully:", response.data);
      navigate("/owned/properties");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding property:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Property
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type=""
              value={formData.description}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Description"
            ></textarea>
          </div>
          <div>
            <label htmlFor="place" className="sr-only">
              Place
            </label>
            <input
              id="place"
              name="place"
              type="text"
              value={formData.place}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Place"
            />
          </div>
          <div>
            <label htmlFor="area" className="sr-only">
              Area
            </label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Area"
            />
          </div>
          <div className="mt-2 flex space-x-2">
            <div>
              <label htmlFor="numberOfBedrooms" className="sr-only">
                Bedrooms
              </label>
              <input
                id="numberOfBedrooms"
                name="numberOfBedrooms"
                type="number"
                value={formData.numberOfBedrooms}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Number of Bedrooms"
              />
            </div>
            <div>
              <label htmlFor="numberOfBathrooms" className="sr-only">
                Bathrooms
              </label>
              <input
                id="numberOfBathrooms"
                name="numberOfBathrooms"
                type="number"
                value={formData.numberOfBathrooms}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Number of Bathrooms"
              />
            </div>
          </div>
          <div className="mt-2 flex space-x-2">
            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                id="city"
                name="location.city" // Adjusted name
                type="text"
                value={formData.location.city}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="City"
              />
            </div>
            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                name="location.state" // Adjusted name
                type="text"
                value={formData.location.state}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="State"
              />
            </div>
            <div>
              <label htmlFor="zip" className="sr-only">
                Zip
              </label>
              <input
                id="zip"
                name="location.zip" // Adjusted name
                type="number"
                value={formData.location.zip}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Postal Code"
              />
            </div>
          </div>

          <div>
            <label htmlFor="amenities" className="sr-only">
              Add Amenity
            </label>
            <div className="flex items-center">
              <input
                id="newAmenity"
                name="newAmenity"
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Add an amenity"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="ml-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {formData.amenities.map((amenity, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(index)}
                    className="ml-2 px-2 py-1 border border-transparent text-sm font-medium rounded-md text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="rent" className="sr-only">
              Rent
            </label>
            <input
              id="rent"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Rent"
            />
          </div>
          {/* Images (multiple files) */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Add Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              required
              multiple
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddProperty;

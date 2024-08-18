import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/app/layout";

export default function CreateProperty() {
  const BASE_URL = "http://localhost:8000";

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    available_start: "",
    available_end: "",
    photos: [{ url: "", alt_text: "Room Image" }],
    rooms: [{ name: "", capacity: 3 }],
    amenities: [{ name: "" }],
    property_type: { name: "" },
  });
  
  const router = useRouter();

  const handleInputChange = (e, parentField = null, index = null) => {
    if (parentField) {
      let newItem = null;
      if (index!==null) {
        newItem = [...formState[parentField]];
        newItem[index][e.target.name] = e.target.value;
      }
      else {
        newItem = formState[parentField] ;
        newItem[e.target.name] = e.target.value;
      }

      setFormState({
        ...formState,
        [parentField]: newItem,
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/properties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify(formState),
    });
    const data = await res.json();
    if (res.ok) {
      router.push(`/properties/${data.id}`);
    } else {
      console.error(data);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="my-5 text-3xl font-semibold">Create Property</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="available_start"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="available_end"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="url"
          placeholder="Photo URL"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={(e) => handleInputChange(e, 'photos', 0)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={(e) => handleInputChange(e, 'rooms', 0)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Amenity Name"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={(e) => handleInputChange(e, 'amenities', 0)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Property Type"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={(e) => handleInputChange(e, 'property_type')}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Property
        </button>
      </form>
    </div>
  );
}

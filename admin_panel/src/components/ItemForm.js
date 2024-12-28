import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ fetchItems, selectedItem, clearSelection }) => {
  const [form, setForm] = useState({
    name: selectedItem?.name || '',
    price: selectedItem?.price || '',
  });

  const [image, setImage] = useState(null); // New state for image

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file upload
    formData.append('name', form.name);
    formData.append('price', form.price);
    if (image) formData.append('image', image); // Add image to formData if selected

    try {
      if (selectedItem) {
        // Update the item if selected
        await axios.put(`http://localhost:5000/items/${selectedItem._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create a new item
        await axios.post('http://localhost:5000/items', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchItems(); // Refresh the list after the action
      clearSelection(); // Clear selected item after the action
      setForm({ name: '', price: '' }); // Reset form fields
      setImage(null); // Reset image field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="file"
        onChange={handleImageChange} // Handle image selection
        accept="image/*"
      />
      <button type="submit">{selectedItem ? 'Update' : 'Add'} Item</button>
      {selectedItem && <button onClick={clearSelection}>Cancel</button>}
    </form>
  );
};

export default ItemForm;

import React from 'react';
import axios from 'axios';

const ItemList = ({ items, fetchItems, selectItem }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  // Check if 'items' is an array before using .map()
  if (!Array.isArray(items)) {
    return <div>Loading...</div>; // Show loading if 'items' isn't an array
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <strong>{item.name}</strong> - ${item.price}
          <div>
            {/* Display the image */}
            {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />}
          </div>
          <button onClick={() => selectItem(item)}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;

// AInventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AInventory = () => {
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({
    id: '',
    quantity: '',
    supplierId: '',
    remainingStock: '',
    dateAdded: '',
    status: '',
  });

  // Fetch inventory items on component mount
  useEffect(() => {
    fetchSupplies();
  }, []);

  // Fetch all inventory items from the server
  const fetchSupplies = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setSupplies(response.data);
    } catch (error) {
      console.error('Error fetching supplies:', error);
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupply((prevSupply) => ({
      ...prevSupply,
      [name]: value,
    }));
  };

  // Add a new supply
  const handleAdd = async () => {
    try {
      await axios.post('/api/inventory', newSupply);
      fetchSupplies();
      setNewSupply({ id: '', quantity: '', supplierId: '', remainingStock: '', dateAdded: '', status: '' });
    } catch (error) {
      console.error('Error adding supply:', error);
    }
  };

  // Update an existing supply
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/inventory/${newSupply.id}`, newSupply);
      fetchSupplies();
      setNewSupply({ id: '', quantity: '', supplierId: '', remainingStock: '', dateAdded: '', status: '' });
    } catch (error) {
      console.error('Error updating supply:', error);
    }
  };

  // Delete a supply
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      fetchSupplies();
    } catch (error) {
      console.error('Error deleting supply:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="bg-gray-800 w-1/4 text-white p-4">
        <div className="flex flex-col items-center">
          <img src="/admin.png" alt="Admin" className="rounded-full w-16 h-16" />
          <h2 className="mt-2">Admin</h2>
        </div>
        <nav className="mt-4">
          <Link href="/AProduct"><button className="w-full text-left p-2">Products</button></Link>
          <Link href="/AStaff"><button className="w-full text-left p-2">Staff</button></Link>
          <Link href="/ACustomerInfo"><button className="w-full text-left p-2">Customer's Info</button></Link>
          <Link href="/AInventory"><button className="w-full text-left p-2 bg-red-700">Inventory</button></Link>
          <Link href="/AOrders"><button className="w-full text-left p-2">Orders</button></Link>
          <Link href="/ADelivery"><button className="w-full text-left p-2">Delivery</button></Link>
          <Link href="/APayment"><button className="w-full text-left p-2">Payment</button></Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full text-left p-2">Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">ProductID</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">SupplierID</th>
              <th className="p-2">RemainingStock</th>
              <th className="p-2">DateAdded</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map((supply) => (
              <tr key={supply._id}>
                <td className="p-2 border">{supply.id}</td>
                <td className="p-2 border">{supply.quantity}</td>
                <td className="p-2 border">{supply.supplierId}</td>
                <td className="p-2 border">{supply.remainingStock}</td>
                <td className="p-2 border">{supply.dateAdded}</td>
                <td className="p-2 border">{supply.status}</td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white p-1 mr-2" onClick={() => setNewSupply(supply)}>Update</button>
                  <button className="bg-red-500 text-white p-1" onClick={() => handleDelete(supply._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Manage Supplies</h2>
        <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="id"
            value={newSupply.id}
            onChange={handleInputChange}
            placeholder="ProductID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="quantity"
            value={newSupply.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="supplierId"
            value={newSupply.supplierId}
            onChange={handleInputChange}
            placeholder="SupplierID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="remainingStock"
            value={newSupply.remainingStock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="dateAdded"
            value={newSupply.dateAdded}
            onChange={handleInputChange}
            placeholder="Date"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="status"
            value={newSupply.status}
            onChange={handleInputChange}
            placeholder="Status"
            className="w-full p-2 border"
          />
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-lg">
              Update
            </button>
            <button type="button" onClick={handleAdd} className="bg-green-500 text-white p-2 rounded-lg">
              Add
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AInventory;


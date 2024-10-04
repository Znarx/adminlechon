import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function ACustomerInfo() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ customerid: "", name: "", address: "", contactNumber: "" });

  // Fetch customers from the server when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("api/acustomer");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post("api/acustomer", newCustomer);
      setCustomers([...customers, newCustomer]);
      setNewCustomer({ customerid: "", name: "", address: "", contactNumber: "" });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`api/acustomer/${newCustomer.customerid}`, newCustomer);
      const updatedCustomers = customers.map((customer) =>
        customer.customerid === newCustomer.customerid ? newCustomer : customer
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleDelete = async (customerid) => {
    try {
      await axios.delete(`api/acustomer/${customerid}`);
      const filteredCustomers = customers.filter((customer) => customer.customerid !== customerid);
      setCustomers(filteredCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error);
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
          <Link href="/ACustomerInfo"><button className="w-full text-left p-2 bg-red-700">Customer's Info</button></Link>
          <Link href="/AInventory"><button className="w-full text-left p-2">Inventory</button></Link>
          <Link href="/AOrders"><button className="w-full text-left p-2">Orders</button></Link>
          <Link href="/ADelivery"><button className="w-full text-left p-2">Delivery</button></Link>
          <Link href="/APayment"><button className="w-full text-left p-2">Payment</button></Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full text-left p-2">Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Customer's Info</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">CustomerID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Address</th>
              <th className="p-2">Contact Number</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerid}>
                <td className="p-2 border">{customer.customerid}</td>
                <td className="p-2 border">{customer.name}</td>
                <td className="p-2 border">{customer.address}</td>
                <td className="p-2 border">{customer.contactNumber}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white p-1 mr-2"
                    onClick={() => setNewCustomer(customer)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-1"
                    onClick={() => handleDelete(customer.customerid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Manage Customer</h2>
        <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="customerid"
            value={newCustomer.customerid}
            onChange={handleInputChange}
            placeholder="CustomerID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="contactNumber"
            value={newCustomer.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            className="w-full p-2 border"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-green-500 text-white p-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

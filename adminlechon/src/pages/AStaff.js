import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function AStaff() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ staffid: "", name: "", position: "", contact: "" });

  // Fetch staff members from the server when the component loads
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("api/astaff");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff members:", error);
      }
    };
    fetchStaff();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post("api/astaff", newStaff);
      setStaff([...staff, newStaff]);
      setNewStaff({ staffid: "", name: "", position: "", contact: "" });
    } catch (error) {
      console.error("Error adding staff member:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`api/astaff/${newStaff.staffid}`, newStaff);
      const updatedStaff = staff.map((member) =>
        member.staffid === newStaff.staffid ? newStaff : member
      );
      setStaff(updatedStaff);
    } catch (error) {
      console.error("Error updating staff member:", error);
    }
  };

  const handleDelete = async (staffid) => {
    try {
      await axios.delete(`api/astaff/${staffid}`);
      const filteredStaff = staff.filter((member) => member.staffid !== staffid);
      setStaff(filteredStaff);
    } catch (error) {
      console.error("Error deleting staff member:", error);
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
          <Link href="/AStaff"><button className="w-full text-left p-2 bg-red-700 mb-2">Staff</button></Link>
          <Link href="/ACustomerInfo"><button className="w-full text-left p-2">Customer's Info</button></Link>
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
        <h1 className="text-2xl font-bold mb-4">Staff</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">StaffID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Position</th>
              <th className="p-2">Contact Details</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.staffid}>
                <td className="p-2 border">{member.staffid}</td>
                <td className="p-2 border">{member.name}</td>
                <td className="p-2 border">{member.position}</td>
                <td className="p-2 border">{member.contact}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white p-1 mr-2"
                    onClick={() => setNewStaff(member)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-1"
                    onClick={() => handleDelete(member.staffid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-xl font-bold mb-4">Manage Staff</h2>
        <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="staffid"
            value={newStaff.staffid}
            onChange={handleInputChange}
            placeholder="StaffID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="name"
            value={newStaff.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="position"
            value={newStaff.position}
            onChange={handleInputChange}
            placeholder="Position"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="contact"
            value={newStaff.contact}
            onChange={handleInputChange}
            placeholder="Contact Details"
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

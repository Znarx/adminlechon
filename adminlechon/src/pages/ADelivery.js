import React, { useState } from "react";
import Link from "next/link";

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([
    {
      deliveryId: "1000023",
      customerId: "1",
      orderId: "1987",
      quantity: 3,
      payment: "Gcash",
      customerAddress: "Salindatu St. Jerome Ext.",
      date: "05/14/24",
    },
    {
      deliveryId: "1000032",
      customerId: "2",
      orderId: "1065",
      quantity: 1,
      payment: "Gcash",
      customerAddress: "Del Rosario St. Agdao",
      date: "05/14/24",
    },
  ]);

  const [newDelivery, setNewDelivery] = useState({
    deliveryId: "",
    customerId: "",
    orderId: "",
    quantity: "",
    payment: "",
    customerAddress: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery((prevDelivery) => ({
      ...prevDelivery,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setDeliveries([...deliveries, newDelivery]);
    setNewDelivery({
      deliveryId: "",
      customerId: "",
      orderId: "",
      quantity: "",
      payment: "",
      customerAddress: "",
      date: "",
    });
  };

  const handleUpdate = () => {
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.deliveryId === newDelivery.deliveryId ? newDelivery : delivery
    );
    setDeliveries(updatedDeliveries);
  };

  const handleDelete = (id) => {
    const filteredDeliveries = deliveries.filter(
      (delivery) => delivery.deliveryId !== id
    );
    setDeliveries(filteredDeliveries);
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
          <Link href="/AInventory"><button className="w-full text-left p-2">Inventory</button></Link>
          <Link href="/AOrders"><button className="w-full text-left p-2">Orders</button></Link>
          <Link href="/ADelivery"><button className="w-full text-left p-2 bg-red-700">Delivery</button></Link>
          <Link href="/APayment"><button className="w-full text-left p-2">Payment</button></Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full text-left p-2">Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Delivery</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">Delivery ID</th>
              <th className="p-2">Customer ID</th>
              <th className="p-2">Order ID</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Customer Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.deliveryId}>
                <td className="p-2 border">{delivery.deliveryId}</td>
                <td className="p-2 border">{delivery.customerId}</td>
                <td className="p-2 border">{delivery.orderId}</td>
                <td className="p-2 border">{delivery.quantity}</td>
                <td className="p-2 border">{delivery.payment}</td>
                <td className="p-2 border">{delivery.customerAddress}</td>
                <td className="p-2 border">{delivery.date}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white p-1 mr-2"
                    onClick={() => setNewDelivery(delivery)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-1"
                    onClick={() => handleDelete(delivery.deliveryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
        <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="deliveryId"
            value={newDelivery.deliveryId}
            onChange={handleInputChange}
            placeholder="DeliveryID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="customerId"
            value={newDelivery.customerId}
            onChange={handleInputChange}
            placeholder="CustomerID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="orderId"
            value={newDelivery.orderId}
            onChange={handleInputChange}
            placeholder="OrderID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="quantity"
            value={newDelivery.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="payment"
            value={newDelivery.payment}
            onChange={handleInputChange}
            placeholder="Payment"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="customerAddress"
            value={newDelivery.customerAddress}
            onChange={handleInputChange}
            placeholder="Customer Address"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="date"
            value={newDelivery.date}
            onChange={handleInputChange}
            placeholder="Date"
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

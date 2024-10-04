import React, { useState } from "react";
import Link from "next/link";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      orderId: "1987",
      customerId: "1",
      productId: "1001",
      quantity: 3,
      deliveryId: "1000023",
      date: "05/14/24",
    },
    {
      orderId: "1065",
      customerId: "2",
      productId: "1001",
      quantity: 1,
      deliveryId: "1000032",
      date: "05/14/24",
    },
  ]);

  const [newOrder, setNewOrder] = useState({
    orderId: "",
    customerId: "",
    productId: "",
    quantity: "",
    deliveryId: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setOrders([...orders, newOrder]);
    setNewOrder({
      orderId: "",
      customerId: "",
      productId: "",
      quantity: "",
      deliveryId: "",
      date: "",
    });
  };

  const handleUpdate = () => {
    const updatedOrders = orders.map((order) =>
      order.orderId === newOrder.orderId ? newOrder : order
    );
    setOrders(updatedOrders);
  };

  const handleDelete = (id) => {
    const filteredOrders = orders.filter((order) => order.orderId !== id);
    setOrders(filteredOrders);
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
          <Link href="/AOrders"><button className="w-full text-left p-2 bg-red-700">Orders</button></Link>
          <Link href="/ADelivery"><button className="w-full text-left p-2">Delivery</button></Link>
          <Link href="/APayment"><button className="w-full text-left p-2">Payment</button></Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full text-left p-2">Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">OrderID</th>
              <th className="p-2">Customer ID</th>
              <th className="p-2">ProductID</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">DeliveryID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="p-2 border">{order.orderId}</td>
                <td className="p-2 border">{order.customerId}</td>
                <td className="p-2 border">{order.productId}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.deliveryId}</td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white p-1 mr-2"
                    onClick={() => setNewOrder(order)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-1"
                    onClick={() => handleDelete(order.orderId)}
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
            name="orderId"
            value={newOrder.orderId}
            onChange={handleInputChange}
            placeholder="OrderID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="customerId"
            value={newOrder.customerId}
            onChange={handleInputChange}
            placeholder="CustomerID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="productId"
            value={newOrder.productId}
            onChange={handleInputChange}
            placeholder="ProductID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="deliveryId"
            value={newOrder.deliveryId}
            onChange={handleInputChange}
            placeholder="DeliveryID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="date"
            value={newOrder.date}
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

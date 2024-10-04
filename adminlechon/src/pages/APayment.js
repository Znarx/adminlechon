import React, { useState } from "react";
import Link from "next/link";

export default function Payment() {
  const [payments, setPayments] = useState([
    {
      paymentId: "123",
      orderId: "1987",
      amount: 3,
      paymentMethod: "Gcash",
      transactionStatus: "Awaiting payment",
      date: "05/14/24",
    },
    {
      paymentId: "456",
      orderId: "1065",
      amount: 1,
      paymentMethod: "Gcash",
      transactionStatus: "Awaiting payment",
      date: "05/14/24",
    },
  ]);

  const [newPayment, setNewPayment] = useState({
    paymentId: "",
    orderId: "",
    amount: "",
    paymentMethod: "",
    transactionStatus: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setPayments([...payments, newPayment]);
    setNewPayment({
      paymentId: "",
      orderId: "",
      amount: "",
      paymentMethod: "",
      transactionStatus: "",
      date: "",
    });
  };

  const handleUpdate = () => {
    const updatedPayments = payments.map((payment) =>
      payment.paymentId === newPayment.paymentId ? newPayment : payment
    );
    setPayments(updatedPayments);
  };

  const handleDelete = (id) => {
    const filteredPayments = payments.filter(
      (payment) => payment.paymentId !== id
    );
    setPayments(filteredPayments);
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
          <Link href="/ADelivery"><button className="w-full text-left p-2">Delivery</button></Link>
          <Link href="/APayment"><button className="w-full text-left p-2 bg-red-700">Payment</button></Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full text-left p-2">Logout</button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <table className="w-full bg-white mb-4">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-2">Payment ID</th>
              <th className="p-2">Order ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Transaction Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td className="p-2 border">{payment.paymentId}</td>
                <td className="p-2 border">{payment.orderId}</td>
                <td className="p-2 border">{payment.amount}</td>
                <td className="p-2 border">{payment.paymentMethod}</td>
                <td className="p-2 border">{payment.transactionStatus}</td>
                <td className="p-2 border">{payment.date}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white p-1 mr-2"
                    onClick={() => setNewPayment(payment)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-1"
                    onClick={() => handleDelete(payment.paymentId)}
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
            name="paymentId"
            value={newPayment.paymentId}
            onChange={handleInputChange}
            placeholder="PaymentID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="orderId"
            value={newPayment.orderId}
            onChange={handleInputChange}
            placeholder="OrderID"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="amount"
            value={newPayment.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="paymentMethod"
            value={newPayment.paymentMethod}
            onChange={handleInputChange}
            placeholder="Payment Method"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="transactionStatus"
            value={newPayment.transactionStatus}
            onChange={handleInputChange}
            placeholder="Transaction Status"
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="date"
            value={newPayment.date}
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

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router"; 

export default function AProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ productid: "", name: "", price: "", description: "" });
  const router = useRouter(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/aproduct'); // Note the leading slash
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('/api/aproduct', newProduct); // Note the leading slash
      setProducts([...products, { ...newProduct, id: response.data.id }]); // Ensure the new product includes the id
      setNewProduct({ productid: "", name: "", price: "", description: "" });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdate = async () => {
    if (!newProduct.productid) {
      console.error('Product ID is required for update');
      return;
    }
    try {
      await axios.put(`/api/aproduct/${newProduct.productid}`, newProduct); // Note the leading slash
      const updatedProducts = products.map((product) =>
        product.productid === newProduct.productid ? newProduct : product
      );
      setProducts(updatedProducts);
      setNewProduct({ productid: "", name: "", price: "", description: "" }); // Clear form after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productid) => {
    try {
      await axios.delete(`/api/aproduct/${productid}`); // Note the leading slash
      const filteredProducts = products.filter((product) => product.productid !== productid);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    sessionStorage.removeItem('authToken'); 
    router.push('/');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="bg-gray-800 w-full lg:w-1/4 text-white p-4">
        <div className="flex flex-col items-center mb-4">
          <img src="/admin.png" alt="Admin" className="rounded-full w-16 h-16" />
          <h2 className="mt-2">Admin</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/AProduct">
            <button className="w-full text-left p-2 bg-red-700 rounded">Products</button>
          </Link>
          <Link href="/AStaff">
            <button className="w-full text-left p-2">Staff</button>
          </Link>
          <Link href="/ACustomerInfo">
            <button className="w-full text-left p-2">Customer's Info</button>
          </Link>
          <Link href="/AInventory">
            <button className="w-full text-left p-2">Inventory</button>
          </Link>
          <Link href="/AOrders">
            <button className="w-full text-left p-2">Orders</button>
          </Link>
          <Link href="/ADelivery">
            <button className="w-full text-left p-2">Delivery</button>
          </Link>
          <Link href="/APayment">
            <button className="w-full text-left p-2">Payment</button>
          </Link>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full text-left p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white mb-4 text-left border-collapse">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="p-2 border">ProductID</th>
                <th className="p-2 border">ProductName</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productid}>
                  <td className="p-2 border">{product.productid}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-blue-500 text-white p-1 mr-2 rounded"
                      onClick={() => setNewProduct(product)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => handleDelete(product.productid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold mb-4">Manage Product</h2>
        <form className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="productid"
            value={newProduct.productid}
            onChange={handleInputChange}
            placeholder="ProductID"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="ProductName"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
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
}

import mysql from 'mysql2/promise';
import { parse } from 'url';
import { sign, verify } from 'jsonwebtoken';

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function handler(req, res) {
  const { method } = req;
  const { pathname, query } = parse(req.url, true);

  try {
    switch (method) {
      case 'GET':
        if (pathname === '/api/check-auth') {
          const cookies = parse(req.headers.cookie || '');
          const token = cookies.token;

          if (!token) {
            return res.status(200).json({ isAuthenticated: false, usernamePasswordVerified: false });
          }

          try {
            verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ isAuthenticated: true, usernamePasswordVerified: true });
          } catch (error) {
            return res.status(200).json({ isAuthenticated: false, usernamePasswordVerified: false });
          }
        } else if (pathname === '/api/aproduct') {
          await handleGetProducts(req, res);
        } else if (pathname === '/api/astaff') {
          await handleGetStaff(req, res);
        } else if (pathname === '/api/acustomer') {
          await handleGetCustomers(req, res);
        } else if (pathname === '/api/ainventory') {
          await handleGetInventory(req, res);
        }
        break;

      case 'POST':
        if (pathname === '/api/signin') {
          await handleSignIn(req, res);
        } else if (pathname === '/api/validate-pin') {
          await handleValidatePin(req, res);
        } else if (pathname === '/api/aproduct') {
          await handleAddProduct(req, res);
        } else if (pathname === '/api/astaff') {
          await handleAddStaff(req, res);
        } else if (pathname === '/api/acustomer') {
          await handleAddCustomer(req, res);
        } else if (pathname === '/api/ainventory') {
          await handleAddInventory(req, res);
        }
        break;

      case 'PUT':
        if (pathname.startsWith('/api/aproduct/')) {
          await handleUpdateProduct(req, res);
        } else if (pathname.startsWith('/api/astaff/')) {
          await handleUpdateStaff(req, res);
        } else if (pathname.startsWith('/api/acustomer/')) {
          await handleUpdateCustomer(req, res);
        } else if (pathname.startsWith('/api/ainventory/')) {
          await handleUpdateInventory(req, res);
        }
        break;

      case 'DELETE':
        if (pathname.startsWith('/api/aproduct/')) {
          await handleDeleteProduct(req, res);
        } else if (pathname.startsWith('/api/astaff/')) {
          await handleDeleteStaff(req, res);
        } else if (pathname.startsWith('/api/acustomer/')) {
          await handleDeleteCustomer(req, res);
        } else if (pathname.startsWith('/api/ainventory/')) {
          await handleDeleteInventory(req, res);
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}

// Signin
async function handleSignIn(req, res) {
  const { username, password } = req.body;
  const [result] = await db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);

  if (result.length === 0) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const user = result[0];
  const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);
  res.status(200).json({ success: true, message: 'Signin successful', username: user.username });
}

// Validate PIN
async function handleValidatePin(req, res) {
  const { pin } = req.body;
  const [result] = await db.query('SELECT * FROM admin WHERE pin = ?', [pin]);

  if (result.length === 0) {
    return res.status(401).json({ error: 'Invalid pin' });
  }

  res.status(200).json({ success: true, message: 'Pin validated successfully' });
}

// Products
async function handleGetProducts(req, res) {
  const [results] = await db.query('SELECT * FROM aproduct');
  res.status(200).json(results);
}

async function handleAddProduct(req, res) {
  const { productid, name, price, description } = req.body;
  const [result] = await db.query('INSERT INTO aproduct (productid, name, price, description) VALUES (?, ?, ?, ?)', [productid, name, price, description]);
  res.status(201).json({ message: 'Product added successfully', id: result.insertId });
}

async function handleUpdateProduct(req, res) {
  const { productid } = req.query;
  const { name, price, description } = req.body;
  const [result] = await db.query('UPDATE aproduct SET name = ?, price = ?, description = ? WHERE productid = ?', [name, price, description, productid]);
  res.status(200).json({ message: 'Product updated successfully' });
}

async function handleDeleteProduct(req, res) {
  const { productid } = req.query;
  const [result] = await db.query('DELETE FROM aproduct WHERE productid = ?', [productid]);
  res.status(200).json({ message: 'Product deleted successfully' });
}

// Staff
async function handleGetStaff(req, res) {
  const [results] = await db.query('SELECT * FROM astaff');
  res.status(200).json(results);
}

async function handleAddStaff(req, res) {
  const { staffid, name, position, contact } = req.body;
  const [result] = await db.query('INSERT INTO astaff (staffid, name, position, contact) VALUES (?, ?, ?, ?)', [staffid, name, position, contact]);
  res.status(201).json({ message: 'Staff member added' });
}

async function handleUpdateStaff(req, res) {
  const { staffid } = req.query;
  const { name, position, contact } = req.body;
  const [result] = await db.query('UPDATE astaff SET name = ?, position = ?, contact = ? WHERE staffid = ?', [name, position, contact, staffid]);
  res.status(200).json({ message: 'Staff member updated' });
}

async function handleDeleteStaff(req, res) {
  const { staffid } = req.query;
  const [result] = await db.query('DELETE FROM astaff WHERE staffid = ?', [staffid]);
  res.status(200).json({ message: 'Staff member deleted' });
}

// Customers
async function handleGetCustomers(req, res) {
  const [results] = await db.query('SELECT * FROM acustomer');
  res.status(200).json(results);
}

async function handleAddCustomer(req, res) {
  const { customerid, name, address, contactNumber } = req.body;
  const [result] = await db.query('INSERT INTO acustomer (customerid, name, address, contactNumber) VALUES (?, ?, ?, ?)', [customerid, name, address, contactNumber]);
  res.status(201).json({ message: 'Customer added' });
}

async function handleUpdateCustomer(req, res) {
  const { customerid } = req.query;
  const { name, address, contactNumber } = req.body;

  console.log('Request Body:', req.body);

  try {
    // Update the customer information
    const [updateResult] = await db.query(
      'UPDATE acustomer SET name = ?, address = ?, contactNumber = ? WHERE customerid = ?',
      [name, address, contactNumber, customerid]
    );

    console.log('Update Result:', updateResult);

    // Check if any rows were affected
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Fetch the updated customer information
    const [updatedCustomer] = await db.query(
      'SELECT * FROM acustomer WHERE customerid = ?',
      [customerid]
    );

    // Send the updated customer data back in the response
    res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer[0] });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'An error occurred while updating the customer' });
  }
}


async function handleDeleteCustomer(req, res) {
  const { customerid } = req.query;
  const [result] = await db.query('DELETE FROM acustomer WHERE customerid = ?', [customerid]);
  res.status(200).json({ message: 'Customer deleted' });
}

// Inventory
async function handleGetInventory(req, res) {
  const [results] = await db.query('SELECT * FROM ainventory');
  res.status(200).json(results);
}

async function handleAddInventory(req, res) {
  const { id, quantity, supplierId, remainingStock, dateAdded, status } = req.body;
  const [result] = await db.query('INSERT INTO ainventory (id, quantity, supplierId, remainingStock, dateAdded, status) VALUES (?, ?, ?, ?, ?, ?)', [id, quantity, supplierId, remainingStock, dateAdded, status]);
  res.status(201).json({ message: 'Inventory item added' });
}

async function handleUpdateInventory(req, res) {
  const { id } = req.query;
  const { quantity, supplierId, remainingStock, dateAdded, status } = req.body;
  const [result] = await db.query('UPDATE ainventory SET quantity = ?, supplierId = ?, remainingStock = ?, dateAdded = ?, status = ? WHERE id = ?', [quantity, supplierId, remainingStock, dateAdded, status, id]);
  res.status(200).json({ message: 'Inventory item updated' });
}

async function handleDeleteInventory(req, res) {
  const { id } = req.query;
  const [result] = await db.query('DELETE FROM ainventory WHERE id = ?', [id]);
  res.status(200).json({ message: 'Inventory item deleted' });
}

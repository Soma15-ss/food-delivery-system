// pages/AdminPanel.js
import React from 'react';

const AdminPanel = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>User Management</h3>
        <button>Create User</button>
        <button>Edit User</button>
        <button>Delete User</button>
      </section>

      <section>
        <h3>Menu Management</h3>
        <button>Add Item</button>
        <button>Edit Item</button>
        <button>Delete Item</button>
      </section>

      <section>
        <h3>Order Management</h3>
        <button>View All Orders</button>
        <button>Update Orders</button>
      </section>
    </div>
  );
};

export default AdminPanel;

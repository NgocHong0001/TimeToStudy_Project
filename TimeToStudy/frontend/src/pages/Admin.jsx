import React, { useEffect, useState } from 'react';
import '../styles/Admin.css'; 
import AdminUserTable from '../components/AdminUserTable';

const Admin = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };
  
    fetchData(); // fetch immediately on mount
  
    const intervalId = setInterval(fetchData, 5000); // refetch every 5 seconds
  
    return () => clearInterval(intervalId); // clear interval on unmount
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
        method: 'DELETE',
      });
      setData(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '' });

  const handleEditUser = (user) => {
    setEditingUser(user._id);
    setFormData({
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      username: user.username || '',
    });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/update/${editingUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
  
      setData(prev =>
        prev.map(u => (u._id === updated._id ? updated : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    }
  };

  // === Filtering and pagination ===
  const filteredUsers = data.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <section className="Admin-section">
      <h2>Admin Dashboard</h2>

      <div className="table-controls">
        <div className="total-users">Total Users: {data.length}</div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <AdminUserTable
        users={paginatedUsers}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />

      {/* Pagination buttons */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const isVisible =
            pageNum === 1 ||
            pageNum === totalPages ||
            Math.abs(currentPage - pageNum) <= 1;

          return isVisible ? (
            <button
              key={i}
              onClick={() => setCurrentPage(pageNum)}
              className={currentPage === pageNum ? "active" : ""}
            >
              {pageNum}
            </button>
          ) : null;
        })}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <input
              type="text"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              placeholder="First Name"
            />
            <input
              type="text"
              value={formData.lastname}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              placeholder="Last Name"
            />
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
            />
            <div className="modal-buttons">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Admin;

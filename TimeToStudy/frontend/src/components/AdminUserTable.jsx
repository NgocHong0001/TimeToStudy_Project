import React from 'react';

export default function AdminUserTable({ users, onDelete, onEdit }) {
  return (
    <table className='admin-user-table'>
      <thead>
        <tr>
          <th>Username</th>
          <th>First</th>
          <th>Last</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td data-label="Username">{u.username}</td>
            <td data-label="First">{u.firstname}</td>
            <td data-label="Last">{u.lastname}</td>
            <td data-label="Actions">
              <button onClick={() => onEdit(u)}>Edit</button>
              <button onClick={() => onDelete(u._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
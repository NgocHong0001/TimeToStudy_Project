import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/data')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Error fetching admin data:', err));
  }, []);

  return (
    <div>
      <h1>Admin Data</h1>
      {data.length === 0 ? (
        <p>No data found</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Admin;

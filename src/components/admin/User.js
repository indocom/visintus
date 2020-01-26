import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/users/list', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `${token}`
          },
          crossdomain: true
        });
        setUsers(res.data.message);
        console.log(users);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, [users.length]);

  const toggleUserRole = (e, email) => {
    let newUsers = [...users];
    let changedUser = newUsers.find(user => user.email === email);
    changedUser.role = changedUser.role === 'admin' ? 'user' : 'admin';
    setUsers(newUsers);
  };

  const userList =
    users.length > 0 &&
    users.map((user, index) => (
      <tr key={index} style={{ minHeight: 50 }}>
        <td style={{ fontSize: '1.2em' }}>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <label>
            <input
              type="checkbox"
              checked={user.role.includes('admin')}
              disabled={user.role === 'superadmin'}
              onChange={e => toggleUserRole(e, user.email)}
            />
            <span>{user.role}</span>
          </label>
        </td>
      </tr>
    ));

  return (
    <>
      <h4>User Admin Page</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role (checked if admin!)</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    </>
  );
}

export default User;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setIsAuthorized(true);
      } catch (e) {
        console.log(e);
        setIsAuthorized(false);
      }
    };
    fetchUsers();
  }, [users.length]);

  const toggleUserRole = async (email, role) => {
    try {
      const token = localStorage.getItem('token');
      const data = JSON.stringify({
        user: {
          email,
          role: role === 'admin' ? 'user' : 'admin'
        }
      });
      await axios.post('/users/update-role', data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        crossdomain: true
      });
      setUsers([]);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
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
              onChange={e => toggleUserRole(user.email, user.role)}
            />
            <span>{user.role}</span>
          </label>
        </td>
      </tr>
    ));

  return !isError ? (
    isAuthorized && (
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
    )
  ) : (
    <p>Error fetching data</p>
  );
}

export default User;

import React from 'react';
import useFetch from '../../hooks/useFetch';
import useMutation from '../../hooks/useMutation';

function User() {
  const [
    { response: users, loading: fetchLoading, error: fetchError },
    doFetch
  ] = useFetch({ endpoint: '/admin/users/list' });
  const [{ error: mutationError }, upsertData] = useMutation();

  const toggleUserRole = async (email, role) => {
    const data = JSON.stringify({
      user: {
        email,
        role: role === 'admin' ? 'user' : 'admin'
      }
    });
    await upsertData({
      method: 'post',
      endpoint: '/admin/users/update-role',
      data
    });
    await doFetch();
  };

  const userList =
    users &&
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
              onChange={() => toggleUserRole(user.email, user.role)}
            />
            <span>{user.role}</span>
          </label>
        </td>
      </tr>
    ));

  if (fetchLoading) return null;

  return !fetchError && !mutationError ? (
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
  ) : (
    // )
    <p>
      Error fetching data! Check your credentials or contact your administrator
    </p>
  );
}

export default User;

import React from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';

import { client } from '~/utils/client';
import { QUERY_KEY_ADMIN_USERS } from '~/constants/query-keys';
import { API_ADMIN_USERS, API_ADMIN_USERS_UPDATE } from '~/constants/api-url';

function User() {
  const {
    data: users,
    status: fetchStatus,
    error: fetchError
  } = useQuery(QUERY_KEY_ADMIN_USERS, () => client(API_ADMIN_USERS));
  const [mutate] = useMutation(postRoleUpdate, {
    onSuccess: () => queryCache.refetchQueries(QUERY_KEY_ADMIN_USERS)
  });

  function postRoleUpdate(data) {
    client(API_ADMIN_USERS_UPDATE, {
      body: data,
      showSuccess: true,
      showError: true
    });
  }

  const toggleUserRole = async (email, role) => {
    const data = {
      user: {
        email,
        role: role === 'admin' ? 'user' : 'admin'
      }
    };
    mutate(data);
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

  if (fetchStatus === 'loading') return null;

  return !fetchError ? (
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

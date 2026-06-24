import { useEffect, useState } from "react";
import { fetchApi } from "./ApiClient";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const result = await fetchApi<{ users?: User[]; data?: User[] }>("/users");
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.data?.users ?? (Array.isArray(result.data) ? result.data : []));
      }
      setLoading(false);
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="status-message">No users found.</p>
      )}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Users;

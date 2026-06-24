const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const usersEndpoint = `${apiHost}/api/users/`;

function Users() {
  return (
    <section>
      <h2>Users</h2>
      <p>Endpoint: {usersEndpoint}</p>
    </section>
  );
}

export default Users;

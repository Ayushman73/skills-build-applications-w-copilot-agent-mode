const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const teamsEndpoint = `${apiHost}/api/teams/`;

function Teams() {
  return (
    <section>
      <h2>Teams</h2>
      <p>Endpoint: {teamsEndpoint}</p>
    </section>
  );
}

export default Teams;

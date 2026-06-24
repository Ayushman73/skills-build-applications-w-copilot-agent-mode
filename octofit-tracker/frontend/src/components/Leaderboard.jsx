const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const leaderboardEndpoint = `${apiHost}/api/leaderboard/`;

function Leaderboard() {
  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Endpoint: {leaderboardEndpoint}</p>
    </section>
  );
}

export default Leaderboard;

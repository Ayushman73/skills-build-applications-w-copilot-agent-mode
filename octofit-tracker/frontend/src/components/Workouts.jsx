const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const workoutsEndpoint = `${apiHost}/api/workouts/`;

function Workouts() {
  return (
    <section>
      <h2>Workouts</h2>
      <p>Endpoint: {workoutsEndpoint}</p>
    </section>
  );
}

export default Workouts;

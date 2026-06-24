const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const activitiesEndpoint = `${apiHost}/api/activities/`;

function Activities() {
  return (
    <section>
      <h2>Activities</h2>
      <p>Endpoint: {activitiesEndpoint}</p>
    </section>
  );
}

export default Activities;

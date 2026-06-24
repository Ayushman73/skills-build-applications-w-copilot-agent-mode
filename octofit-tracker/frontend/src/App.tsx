import { NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : "http://localhost:8000";
const apiUrl = `${apiHost}/api`;
const envNote = codespaceName
  ? `Using GitHub Codespaces backend at ${apiUrl}`
  : "VITE_CODESPACE_NAME is unset; using localhost backend fallback. Define VITE_CODESPACE_NAME in .env.local to target the GitHub Codespaces API.";

function Home() {
  return (
    <section>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>
        This demo uses Vite environment variables to build API URLs at runtime.
        When running in GitHub Codespaces, set <code>VITE_CODESPACE_NAME</code> in
        <code>.env.local</code> to reach the backend at
        <code>https://&lt;codespace&gt;-8000.app.github.dev/api</code>.
      </p>
      <p>Choose a section above to view page data from the backend API.</p>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>Modern multi-tier fitness tracking with React, Node, and MongoDB.</p>
        <p className="env-note">{envNote}</p>
      </header>

      <nav className="main-nav" aria-label="Primary navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

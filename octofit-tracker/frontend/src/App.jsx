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

function App() {
  return (
    <div className="app">
      <header>
        <h1>OctoFit Tracker</h1>
      </header>
      <nav className="main-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<p>Use the navigation above to view data.</p>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>
        <p>
          {codespaceName
            ? `Using backend at https://${codespaceName}-8000.app.github.dev/api`
            : "VITE_CODESPACE_NAME is unset; fallback to local API."}
        </p>
      </footer>
    </div>
  );
}

export default App;

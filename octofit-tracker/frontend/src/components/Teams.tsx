import { useEffect, useState } from "react";
import { fetchApi } from "./ApiClient";

interface Team {
  _id?: string;
  name: string;
  captain: string;
  members: string[];
  createdAt: string;
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      const result = await fetchApi<{ teams?: Team[]; data?: Team[] }>("/api/teams/");
      if (result.error) {
        setError(result.error);
      } else {
        setTeams(result.data?.teams ?? (Array.isArray(result.data) ? result.data : []));
      }
      setLoading(false);
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p className="status-message">Loading teams...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      {!loading && !error && teams.length === 0 && (
        <p className="status-message">No teams found.</p>
      )}
      {teams.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Captain</th>
              <th>Members</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.name}>
                <td>{team.name}</td>
                <td>{team.captain}</td>
                <td>{team.members.length}</td>
                <td>{new Date(team.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Teams;

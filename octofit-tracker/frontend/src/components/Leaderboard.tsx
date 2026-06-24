import { useEffect, useState } from "react";
import { fetchApi } from "./ApiClient";

interface LeaderboardEntry {
  _id?: string;
  user: string;
  score: number;
  rank: number;
  updatedAt: string;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);
      const result = await fetchApi<{ leaderboard?: LeaderboardEntry[]; data?: LeaderboardEntry[] }>("/leaderboard");
      if (result.error) {
        setError(result.error);
      } else {
        setEntries(result.data?.leaderboard ?? (Array.isArray(result.data) ? result.data : []));
      }
      setLoading(false);
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p className="status-message">Loading leaderboard...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      {!loading && !error && entries.length === 0 && (
        <p className="status-message">No leaderboard entries found.</p>
      )}
      {entries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.user}-${entry.rank}`}>
                <td>{entry.rank}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
                <td>{new Date(entry.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Leaderboard;

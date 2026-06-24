import { useEffect, useState } from "react";
import { fetchApi } from "./ApiClient";

interface Workout {
  _id?: string;
  title: string;
  difficulty: string;
  durationMinutes: number;
  completedAt: string;
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      setLoading(true);
      const result = await fetchApi<{ workouts?: Workout[]; data?: Workout[] }>("/api/workouts/");
      if (result.error) {
        setError(result.error);
      } else {
        setWorkouts(result.data?.workouts ?? (Array.isArray(result.data) ? result.data : []));
      }
      setLoading(false);
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p className="status-message">Loading workouts...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      {!loading && !error && workouts.length === 0 && (
        <p className="status-message">No workouts found.</p>
      )}
      {workouts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Duration</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.title}>
                <td>{workout.title}</td>
                <td>{workout.difficulty}</td>
                <td>{workout.durationMinutes} min</td>
                <td>{new Date(workout.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Workouts;

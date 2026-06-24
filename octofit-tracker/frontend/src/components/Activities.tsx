import { useEffect, useState } from "react";
import { fetchApi } from "./ApiClient";

interface Activity {
  _id?: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: string;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      setLoading(true);
      const result = await fetchApi<{ activities?: Activity[]; data?: Activity[] }>("/api/activities/");
      if (result.error) {
        setError(result.error);
      } else {
        setActivities(result.data?.activities ?? (Array.isArray(result.data) ? result.data : []));
      }
      setLoading(false);
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p className="status-message">Loading activities...</p>}
      {error && <p className="status-message">Error: {error}</p>}
      {!loading && !error && activities.length === 0 && (
        <p className="status-message">No activities found.</p>
      )}
      {activities.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.type}-${activity.performedAt}`}>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.performedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Activities;

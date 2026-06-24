import { apiUrl, port } from "./config.ts";
import { connectDatabase } from "./config/database.ts";
import app from "./index.ts";

// Use CODESPACE_NAME to build a Codespaces-aware URL for the API service.
const codespaceName = process.env.CODESPACE_NAME;
const codespaceUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : undefined;

// If CODESPACE_NAME is not set, fall back to localhost with port 8000.

const serverUrl = codespaceUrl || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${serverUrl}`);
});

connectDatabase()
  .then(() => {
    console.log("Connected to MongoDB:", process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

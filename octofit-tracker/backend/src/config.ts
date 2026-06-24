export const port = Number(process.env.PORT || 8000);
export const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";
export const codespaceName = process.env.CODESPACE_NAME || "";

const sanitizedCodespace = codespaceName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/^-+|-+$/g, "");

export const apiUrl = sanitizedCodespace
  ? `https://${sanitizedCodespace}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

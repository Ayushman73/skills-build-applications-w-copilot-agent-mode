export const port = Number(process.env.PORT || 8000);
export const codespaceName = process.env.CODESPACE_NAME || "";

const sanitizedCodespace = codespaceName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/^-+|-+$/g, "");

export const apiUrl = sanitizedCodespace
  ? `https://${sanitizedCodespace}-8000.githubpreview.dev`
  : `http://localhost:${port}`;

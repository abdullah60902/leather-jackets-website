const fs = require('fs');
const path = require('path');

async function clearSubmissions() {
  const { Octokit } = await import("octokit");

  // Manually read .env
  const envPath = path.join(__dirname, '../.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim().replace(/^['"]|['"]$/g, '');
  });

  const GITHUB_TOKEN = env.GITHUB_TOKEN;
  const OWNER = env.GITHUB_OWNER || "abdullah60902";
  const REPO = env.GITHUB_REPO || "leather-jacket-data";
  const FILE_PATH = "data/submissions.json";

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  if (!GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is missing");
    return;
  }
  
  try {
    // 1. Get existing file to get SHA
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
    });
    
    const sha = fileData.sha;

    // 2. Write empty array back to GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: "Clear all submissions",
      content: Buffer.from(JSON.stringify([], null, 2)).toString("base64"),
      sha: sha,
    });

    console.log("SUCCESS: All submissions cleared.");
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

clearSubmissions();

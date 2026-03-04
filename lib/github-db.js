import { Octokit } from "octokit";

// CONFIGURATION (Using Environment Variables)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || "abdullah60902";
const REPO = process.env.GITHUB_REPO || "leather-jacket-data";
const FILE_PATH = "data/submissions.json";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export async function saveSubmission(data) {
  if (!GITHUB_TOKEN) return null;
  
  try {
    let content = [];
    let sha = null;

    try {
      // 1. Try to get existing file
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: FILE_PATH,
      });
      // hjhj
      sha = fileData.sha;
      content = JSON.parse(Buffer.from(fileData.content, "base64").toString());
    } catch (e) {
      // File doesn't exist yet, start with empty array
      console.log("File not found, creating new one.");
    }

    // 2. Add new submission with timestamp
    const newSubmission = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'unread',
      ...data
    };
    
    content.unshift(newSubmission); // Add to beginning

    // 3. Write back to GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `Add submission from ${data.email}`,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
      sha: sha,
    });

    return true;
  } catch (error) {
    console.error("GITHUB DB ERROR:", error);
    return false;
  }
}

export async function getSubmissions() {
  if (!GITHUB_TOKEN) return [];
  
  try {
    const { data: fileData } = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
    });
    
    return JSON.parse(Buffer.from(fileData.content, "base64").toString());
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return [];
  }
}

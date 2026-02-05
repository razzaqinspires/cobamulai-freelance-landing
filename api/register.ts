import { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';
import { nanoid } from 'nanoid';

// Konfigurasi GitHub (Diambil dari Environment Variables nanti)
const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER; // Username GitHub kamu
const REPO_NAME = process.env.REPO_NAME;   // Nama repository (cobamulai-landing)
const FILE_PATH = 'data/referrals.json';   // Lokasi file simpanan

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, position } = req.body;

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // 1. Generate Kode Referral Unik
    const referralCode = `REF-${nanoid(6).toUpperCase()}`;
    const newEntry = {
      id: nanoid(),
      date: new Date().toISOString(),
      referralCode,
      name,
      email,
      phone,
      position
    };

    // 2. Ambil file lama dari GitHub (jika ada)
    let sha;
    let currentData = [];
    
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      if (!Array.isArray(data) && data.content) {
        const content = Buffer.from(data.content, 'base64').toString();
        currentData = JSON.parse(content);
        sha = data.sha; // Penting untuk update file
      }
    } catch (err) {
      // Jika file belum ada, kita buat baru (abaikan error 404)
      console.log("File belum ada, membuat baru...");
    }

    // 3. Tambahkan data baru
    currentData.push(newEntry);

    // 4. Update/Push kembali ke GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: `New applicant: ${name} (${referralCode})`,
      content: Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64'),
      sha: sha, // Sertakan SHA jika update, kosongkan jika file baru
      committer: {
        name: "Cobamulai Bot",
        email: "bot@cobamulai.com"
      }
    });

    // 5. Kembalikan Kode Referral ke Frontend
    return res.status(200).json({ success: true, referralCode });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
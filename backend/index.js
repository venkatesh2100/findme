const express = require('express');
const multer = require('multer');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer config to keep original file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use the original file name as-is
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

// ✅ Route to upload the file without renaming
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  console.log("✅ CSV uploaded:", req.file.originalname);
  res.json({ success: true, filename: req.file.originalname });
});



// Route: Health check
app.get('/', (req, res) => {
  res.send('CSV Backend is running!');
});

app.get("/list-uploads", (req, res) => {
  const uploadDir = path.join(__dirname, "uploads");
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Failed to read uploads" });
    }

    const csvFiles = files.filter(f => f.endsWith(".csv"));
    res.json({ success: true, files: csvFiles });
  });
});


app.get('/read-latest-upload', (req, res) => {
  const uploadDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err || !files.length) {
      console.error('❌ No files in uploads folder');
      return res.status(404).json({ success: false, error: 'No files found' });
    }

    const csvFiles = files.filter((f) => f.endsWith('.csv'));

    if (!csvFiles.length) {
      console.error('❌ No CSV file found in /uploads');
      return res.status(404).json({ success: false, error: 'No CSV file found' });
    }

    const latestFile = csvFiles
      .map((file) => ({
        name: file,
        time: fs.statSync(path.join(uploadDir, file)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)[0].name;

    const filePath = path.join(uploadDir, latestFile);
    const results = [];

    console.log('📄 Reading file:', filePath);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => {
        console.log('✅ Parsed rows:', results.length);
        res.json({ success: true, data: results });
      })
      .on('error', (err) => {
        console.error('❌ Parsing failed:', err.message);
        res.status(500).json({ success: false, error: 'CSV parsing failed' });
      });
  });
});


app.get('/fetch-sharepoint-csv', async (req, res) => {
  try {
    const response = await axios({
      method: 'GET',
      url: SHAREPOINT_URL,
      responseType: 'stream',
    });

    const results = [];
    response.data
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => {
        res.json({ success: true, data: results });
      });
  } catch (err) {
    console.error('Error fetching SharePoint CSV:', err.message);
    res.status(500).json({ success: false, error: 'Could not fetch CSV from SharePoint' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});




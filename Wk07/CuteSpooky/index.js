import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Get the directory path using import.meta.url in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up LowDB for managing the JSON file
const defaultData = { costumes: [] };
const adapter = new JSONFile(path.join(__dirname, 'costumes.json'));
const db = new Low(adapter, defaultData);

let port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('listening at ', port);
});

// Start the server on port 3000 or the port defined in the environment
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
// console.log(`Server listening on port ${port}`);
// });

// Middleware to serve static files (e.g., HTML, CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse incoming JSON data
app.use(express.json()); 

// Initialize and read the database
async function initializeDB() {
  await db.read(); // Read data from the JSON file
  db.data = db.data || defaultData; // If no data is present, set default
}

// Initialize the DB
initializeDB();

// Route to serve the `costumes.json` file directly
app.get('/costumes.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'costumes.json'));
});

// POST route to add new costume data
app.post('/add-costume', async (req, res) => {
  try {
    const newCostume = req.body;  
    db.data.costumes.push(newCostume); 
    await db.write();  

    // Respond with a success message
    res.status(200).json({ message: 'Costume added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving costume', error: error.message });
  }
});


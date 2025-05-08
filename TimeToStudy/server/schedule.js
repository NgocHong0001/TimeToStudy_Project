import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import ICAL from 'ical.js';

// Routes
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js'; // <-- New import



// Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });


const DB_PORT = process.env.PORT || 5000;
const DB_MONGODB = process.env.MONGO_URI;

console.log("URI from env:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Time To Study");
});

// Routes
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute); 

// MongoDB Connection
console.log("Trying to connect to MongoDB...");
mongoose.connect(DB_MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

console.log("It was called.");

// ICS file parser endpoint
app.use('/schema', express.static(path.join(__dirname, '../schedules')));



app.get('/api/ics', (req, res) => {
  const fileName = req.query.file;
  if (!fileName) {
    return res.status(400).json({ error: 'No file specified' });
  }

  const icsFilePath = path.join(__dirname, fileName);


  fs.readFile(icsFilePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'Schedule file not found' });
      }
      console.error('Error reading ICS file:', err);
      return res.status(500).json({ error: 'Error reading ICS file' });
    }


    try {
      const jcalData = ICAL.parse(data);
      const comp = new ICAL.Component(jcalData);

      const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
        hour12: false,
      };
      const optionsDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Europe/Stockholm',
      };

      const events = comp.getAllSubcomponents('vevent').map((vevent) => {
        const dtstartRaw = vevent.getFirstPropertyValue('dtstart');
        const dtendRaw = vevent.getFirstPropertyValue('dtend');

        const dtstart = new Date(dtstartRaw.toString());
        const dtend = new Date(dtendRaw.toString());

        return {
          summary: vevent.getFirstPropertyValue('summary') || 'No summary',
          location: vevent.getFirstPropertyValue('location') || 'No location',
          startDate: new Intl.DateTimeFormat('sv-SE', optionsDate).format(dtstart),
          startTime: new Intl.DateTimeFormat('sv-SE', optionsTime).format(dtstart),
          endTime: new Intl.DateTimeFormat('sv-SE', optionsTime).format(dtend),
        };
      });

      res.json(events);
    } catch (parseError) {
      console.error('Error parsing ICS file:', parseError);
      res.status(500).json({ error: 'Error parsing ICS file' });
    }
  });
});

// Start server
app.listen(DB_PORT, () => {
  console.log(`Server running on http://localhost:${DB_PORT}..`);
});

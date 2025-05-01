import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ICAL from 'ical.js';
dotenv.config();


const DB_PORT = process.env.PORT || 5000;
const DB_MONGODB = process.env.MONGO_URI;

console.log("URI from env:", process.env.MONGO_URI); // Controll that the URI works.

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Time To Study");
});

app.use('/api/users', userRoute);

// Connect to MongoDB
console.log("Trying to connect to MongoDB...");
mongoose.connect(DB_MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  console.log("It was called.");

app.listen(DB_PORT, () => {
    console.log(`Server running on http://localhost:${DB_PORT}..`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/api/ics', (req, res) => {
  const fileName = req.query.file; 
  if (!fileName) {
    return res.status(400).json({ error: 'No file specified' });
  }

  const icsFilePath = path.join(__dirname, fileName);

  fs.readFile(icsFilePath, 'utf8', (err, data) => {
    if (err) {
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

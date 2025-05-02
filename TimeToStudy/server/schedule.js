import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ICAL from 'ical.js';

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/schema', express.static(path.join(__dirname, '../schedules')));


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

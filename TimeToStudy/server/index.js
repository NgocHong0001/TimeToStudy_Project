import express from 'express';
import cors from 'cors';

const PORT = 5000;
// Where we run everything
const cors = cors();
const app = express();
app.get('/', (req, res) => {
    res.send("Time To Study");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost/${PORT}..`);
});
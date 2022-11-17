import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import guitars from './routes/guitars.js';
import fs from 'node:fs/promises'
import mongoose from 'mongoose';
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let message;

async function initMessage() {
  if (message != null) return;
  try {
    message = await fs.readFile('message.txt', 'utf8');
  } catch (e) {
    message = 'Hello world!';
  }
}

app.get('/message', async (req, res) => {
  await initMessage();
    if (!message) {
        return res.status(404).send('No message!');

    }
  res.send(message);
});

app.put('/message', async (req, res) => {
    message = req.query.message;
    await fs.writeFile('message.txt', message);
  res.send(message);
});

app.delete('/message', async (req, res) => {
    message = '';
    await fs.rm ('message.txt');
  res.send(message);
});

app.use('/guitars', guitars);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('DB connected'))
  .catch((error) => console.error('DB connection error!', error));
});
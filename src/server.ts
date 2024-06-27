import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { addEmailToQueue } from './taskScheduler';

const app = express();
app.use(bodyParser.json());

app.post('/add-email', async (req: Request, res: Response) => {
  const { emailContent, emailProvider, authCode } = req.body;
  await addEmailToQueue(emailContent, emailProvider, authCode);
  res.send('Email added to queue');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

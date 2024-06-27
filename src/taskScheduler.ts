import { Queue, Worker } from 'bullmq';
import { getAuthenticatedClient as getGoogleClient } from './googleAuth';
import { getContext, getReply } from './openaiHelper';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const emailQueue = new Queue('emailQueue');

const worker = new Worker('emailQueue', async (job) => {
  const { emailContent, emailProvider, authCode } = job.data;

  if (emailProvider === 'google') {
    const client = await getGoogleClient();
    const gmail = google.gmail({ version: 'v1', auth: client });

    // Get the user's email address
    const profile = await gmail.users.getProfile({ userId: 'me' });
    const userEmail = profile.data.emailAddress;

    const context = await getContext(emailContent);
    const reply = await getReply(context);

    // Send reply using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: userEmail,
        clientId: client._clientId,
        clientSecret: client._clientSecret,
        refreshToken: client.credentials.refresh_token,
        accessToken: client.credentials.access_token,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: 'www.rishikarathore1208@gmail.com',
      subject: 'Re: Your email',
      text: reply,
    };

    await transporter.sendMail(mailOptions);
  }
});

export const addEmailToQueue = async (emailContent: string, emailProvider: string, authCode: string) => {
  await emailQueue.add('processEmail', {
    emailContent,
    emailProvider,
    authCode,
  });
};

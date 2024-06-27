"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmailToQueue = void 0;
const bullmq_1 = require("bullmq");
const googleAuth_1 = require("./googleAuth");
const openaiHelper_1 = require("./openaiHelper");
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const emailQueue = new bullmq_1.Queue('emailQueue');
const worker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailContent, emailProvider, authCode } = job.data;
    if (emailProvider === 'google') {
        const client = yield (0, googleAuth_1.getAuthenticatedClient)();
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth: client });
        // Get the user's email address
        const profile = yield gmail.users.getProfile({ userId: 'me' });
        const userEmail = profile.data.emailAddress;
        const context = yield (0, openaiHelper_1.getContext)(emailContent);
        const reply = yield (0, openaiHelper_1.getReply)(context);
        // Send reply using nodemailer
        const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail(mailOptions);
    }
}));
const addEmailToQueue = (emailContent, emailProvider, authCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield emailQueue.add('processEmail', {
        emailContent,
        emailProvider,
        authCode,
    });
});
exports.addEmailToQueue = addEmailToQueue;

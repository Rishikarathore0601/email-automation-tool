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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const taskScheduler_1 = require("./taskScheduler");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/add-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailContent, emailProvider, authCode } = req.body;
    yield (0, taskScheduler_1.addEmailToQueue)(emailContent, emailProvider, authCode);
    res.send('Email added to queue');
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

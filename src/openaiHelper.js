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
exports.getReply = exports.getContext = void 0;
const axios_1 = __importDefault(require("axios"));
const openaiApiKey = 'sk-proj-GkBP3v4pTg4mby6iiSubT3BlbkFJ2BhCL6AjYfoMXLiICy9J';
const getContext = (emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: `Classify the following email into one of the categories: Interested, Not Interested, More Information.\n\nEmail: ${emailContent}`,
            max_tokens: 10,
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.choices[0].text.trim();
    }
    catch (error) {
        console.error('Error getting context from OpenAI', error);
    }
});
exports.getContext = getContext;
const getReply = (context) => __awaiter(void 0, void 0, void 0, function* () {
    let prompt = '';
    if (context === 'Interested') {
        prompt = 'Write a reply to ask if they are willing to hop on a demo call by suggesting a time.';
    }
    else if (context === 'Not Interested') {
        prompt = 'Write a polite reply thanking them for their response.';
    }
    else if (context === 'More Information') {
        prompt = 'Write a reply asking what specific information they need.';
    }
    try {
        const response = yield axios_1.default.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 50,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.choices[0].text.trim();
    }
    catch (error) {
        console.error('Error getting reply from OpenAI', error);
    }
});
exports.getReply = getReply;


import axios from 'axios';

const openaiApiKey = 'sk-proj-GkBP3v4pTg4mby6iiSubT3BlbkFJ2BhCL6AjYfoMXLiICy9J';

export const getContext = async (emailContent: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Classify the following email into one of the categories: Interested, Not Interested, More Information.\n\nEmail: ${emailContent}`,
        max_tokens: 10,
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error getting context from OpenAI', error);
  }
};

export const getReply = async (context: string) => {
  let prompt = '';
  if (context === 'Interested') {
    prompt = 'Write a reply to ask if they are willing to hop on a demo call by suggesting a time.';
  } else if (context === 'Not Interested') {
    prompt = 'Write a polite reply thanking them for their response.';
  } else if (context === 'More Information') {
    prompt = 'Write a reply asking what specific information they need.';
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: prompt,
        max_tokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error getting reply from OpenAI', error);
  }
};

import axios from 'axios';

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
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer sk-proj-GkBP3v4pTg4mby6iiSubT3BlbkFJ2BhCL6AjYfoMXLiICy9J`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error getting reply from OpenAI', error);
  }
};

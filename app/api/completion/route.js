import OpenAI from 'openai';

export async function POST(req) {
  const { language, prompt, apiKey='' } = await req.json();

  const openai = new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com'
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          content: `
            ${process.env.PREFIX_PROMPT}:
            ${prompt}. 
            ${process.env.LANGUAGE_TIP} ${language}. 
            ${process.env.OUTPUT_TIP} ${language}. 
            ${process.env.USING_CONTENT_FORMATTING}. 
            ${process.env.THANK_YOU}
          `,
          role: 'user'
        }
      ]
    });

    return new Response(completion.choices[0].message.content, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
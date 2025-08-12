import OpenAI from 'openai';
import CryptoJs from 'crypto-js';
export async function POST(req) {
  const { language, prompt } = await req.json();

  // 从请求头中获取加密的 API Key
  const encryptedApiKey = req.headers.get('x-api-key');
  if (!encryptedApiKey) {
    return new Response(JSON.stringify({ error: 'Encrypted API Key is missing in headers.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let deepSeekApiKey;
  try {
    // 解密 API Key
    const bytes = CryptoJs.AES.decrypt(encryptedApiKey, process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY);
    deepSeekApiKey = bytes.toString(CryptoJs.enc.Utf8);
    if (!deepSeekApiKey) {
      throw new Error('Decrypted API Key is empty.');
    }
  } catch (error) {
    console.error('Error decrypting API Key:', error);
    return new Response(JSON.stringify({ error: 'Invalid API Key format or decryption failed.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const openai = new OpenAI({
    apiKey: deepSeekApiKey,
    baseURL: 'https://api.deepseek.com'
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `
            You are an expert in Microsoft Excel. Your task is to generate a single, precise, and executable Excel formula based on the user request:
            the prompt is ${language}. 
            the output should be ${language}. 
            using content format is markdown. 
            thanks!
          ` },
        { role: "user", content: prompt },
      ],
      temperature: 0.3
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

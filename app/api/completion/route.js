

export async function POST(req) {
  const { language, prompt, apiKey } = await req.json();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey,
        prompt,
        language,
      }),
    });

    // 检查下游服务的响应是否成功
    if (!response.ok) {
      // 将下游服务的错误信息透传给客户端
      const errorBody = await response.text();
      console.error(`Error from local service: ${response.status} ${response.statusText}`, errorBody);
      return new Response(errorBody, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 将下游服务的成功响应直接返回给客户端
    const data = await response.text();
    return new Response(data, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error forwarding request:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to the local formula service.' }), {
      status: 500, // 500 Internal Server Error or 502 Bad Gateway might be appropriate
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

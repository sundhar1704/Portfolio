export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, context } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a friendly voice assistant embedded on Sundharavel G's portfolio website. Answer visitor questions about him using ONLY the context below. Keep answers short (2-4 sentences), spoken-friendly (no markdown, no asterisks), and warm.\n\nCONTEXT:\n${context}\n\nQUESTION:\n${question}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't find an answer to that.";
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Something went wrong reaching the AI service." });
  }
}
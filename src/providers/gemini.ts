import { AIProvider } from "../types.js";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private apiKey = process.env.GEMINI_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("GEMINI_API_KEY not found");

    const apiModel = model || process.env.GEMINI_MODEL || "gemini-3-flash";
    const apiUrl =
      url ||
      process.env.GEMINI_URL ||
      `https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${this.apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.candidates[0].content.parts[0].text;
  }
}

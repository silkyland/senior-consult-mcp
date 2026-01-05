import { AIProvider } from "../types.js";

export class DeepSeekProvider implements AIProvider {
  name = "deepseek";
  private apiKey = process.env.DEEPSEEK_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("DEEPSEEK_API_KEY not found");

    const apiUrl =
      url ||
      process.env.DEEPSEEK_URL ||
      "https://api.deepseek.com/chat/completions";
    const apiModel = model || process.env.DEEPSEEK_MODEL || "deepseek-chat";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepSeek API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.choices[0].message.content;
  }
}

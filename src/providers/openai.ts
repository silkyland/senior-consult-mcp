import { AIProvider } from "../types.js";

export class OpenAIProvider implements AIProvider {
  name = "openai";
  private apiKey = process.env.OPENAI_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("OPENAI_API_KEY not found");

    const apiUrl =
      url ||
      process.env.OPENAI_URL ||
      "https://api.openai.com/v1/chat/completions";
    const apiModel = model || process.env.OPENAI_MODEL || "gpt-4o";

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
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.choices[0].message.content;
  }
}

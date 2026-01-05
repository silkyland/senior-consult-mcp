import { AIProvider } from "../types.js";

export class OpenAICompatibleProvider implements AIProvider {
  name = "openai-compatible";
  private apiKey = process.env.OPENAI_COMPATIBLE_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("OPENAI_COMPATIBLE_API_KEY not found");

    if (!url) {
      throw new Error(
        "URL is required for openai-compatible provider (e.g., https://openrouter.ai/api/v1/chat/completions)"
      );
    }

    if (!model) {
      throw new Error("Model is required for openai-compatible provider");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `OpenAI-Compatible API error: ${response.status} ${error}`
      );
    }

    const data = (await response.json()) as any;
    return data.choices[0].message.content;
  }
}

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

    const apiUrl = url || process.env.OPENAI_COMPATIBLE_URL;
    const apiModel = model || process.env.OPENAI_COMPATIBLE_MODEL;

    if (!apiUrl) {
      throw new Error(
        "URL is required for openai-compatible provider (pass via tool arg or OPENAI_COMPATIBLE_URL env var)"
      );
    }

    if (!apiModel) {
      throw new Error(
        "Model is required for openai-compatible provider (pass via tool arg or OPENAI_COMPATIBLE_MODEL env var)"
      );
    }

    const response = await fetch(apiUrl, {
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

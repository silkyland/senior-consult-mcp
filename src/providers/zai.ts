import { AIProvider } from "../types.js";

export class ZaiProvider implements AIProvider {
  name = "z.ai";
  private apiKey = process.env.ZAI_API_KEY || process.env.ZHIPU_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("ZHIPU_API_KEY not found");

    const apiUrl =
      url ||
      process.env.ZAI_URL ||
      "https://api.z.ai/api/paas/v4/chat/completions";
    const apiModel = model || process.env.ZAI_MODEL || "glm-4-plus";

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
      throw new Error(`Zhipu API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.choices[0].message.content;
  }
}

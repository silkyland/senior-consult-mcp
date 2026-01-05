import { AIProvider } from "../types.js";

export class ClaudeProvider implements AIProvider {
  name = "claude";
  private apiKey = process.env.ANTHROPIC_API_KEY;

  canHandle(): boolean {
    return !!this.apiKey;
  }

  async ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string> {
    if (!this.apiKey) throw new Error("ANTHROPIC_API_KEY not found");

    const apiUrl =
      url || process.env.CLAUDE_URL || "https://api.anthropic.com/v1/messages";
    const apiModel = model || process.env.CLAUDE_MODEL || "claude-sonnet-4-5";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: apiModel,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Claude API error: ${response.status} ${error}`);
    }

    const data = (await response.json()) as any;
    return data.content[0].text;
  }
}

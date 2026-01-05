import { AIProvider, ProviderType } from "../types.js";
import { ClaudeProvider } from "./claude.js";
import { GeminiProvider } from "./gemini.js";
import { OpenAIProvider } from "./openai.js";
import { ZaiProvider } from "./zai.js";
import { OpenAICompatibleProvider } from "./openai-compatible.js";

const providers: AIProvider[] = [
  new ClaudeProvider(),
  new GeminiProvider(),
  new OpenAIProvider(),
  new ZaiProvider(),
  new OpenAICompatibleProvider(),
];

export async function getProvider(
  type: ProviderType = "auto"
): Promise<AIProvider> {
  if (type === "auto") {
    const available = providers.find((p) => p.canHandle());
    if (!available) {
      throw new Error(
        "No AI providers available. Please set at least one API key."
      );
    }
    return available;
  }

  const provider = providers.find((p) => p.name === type);
  if (!provider) {
    throw new Error(`Provider ${type} not supported.`);
  }

  if (!provider.canHandle()) {
    throw new Error(`Provider ${type} selected but its API key is missing.`);
  }

  return provider;
}

export const SENIOR_SYSTEM_PROMPT = `You are a senior developer mentor. A junior AI developer is asking for guidance.

Your role:
- Provide clear, actionable advice
- Point out best practices and patterns
- Warn about potential pitfalls
- Be concise but thorough

Keep responses focused and practical. The junior will implement based on your guidance.`;

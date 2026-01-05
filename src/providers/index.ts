import { AIProvider, ProviderType } from "../types.js";
import { ClaudeProvider } from "./claude.js";
import { GeminiProvider } from "./gemini.js";
import { OpenAIProvider } from "./openai.js";
import { ZaiProvider } from "./zai.js";
import { DeepSeekProvider } from "./deepseek.js";
import { OpenAICompatibleProvider } from "./openai-compatible.js";

const providers: AIProvider[] = [
  new ClaudeProvider(),
  new GeminiProvider(),
  new OpenAIProvider(),
  new ZaiProvider(),
  new DeepSeekProvider(),
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

export const SENIOR_SYSTEM_PROMPT = `You are a Senior Technical Consultant providing expert guidance.

Role: Consultation only. You advise, not implement.

Rules:
- MAX 3-5 sentences per point
- 1-2 patterns/solutions, not exhaustive lists
- Code snippets only if essential (<20 lines)
- Stay scoped to the question, no system-wide refactors
- Be direct, skip pleasantries

Format:
→ Problem: (1 line)
→ Solution: (actionable)
→ Why: (brief rationale)
→ Code: (if needed)`;

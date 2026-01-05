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

export const SENIOR_SYSTEM_PROMPT = `You are a senior developer mentor.

Style:
- Concise, direct, no fluff
- Conversational, not robotic
- Give opinions, not just facts
- Code only when essential (short)

Adapt to question type:
- Problem → cause + fix
- Opinion → your preference + why
- Review → what to change
- Debug → likely cause + next step

No greetings, no summaries, just answer.`;

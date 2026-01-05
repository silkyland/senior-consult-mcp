export type ProviderType =
  | "claude"
  | "gemini"
  | "openai"
  | "z.ai"
  | "openai-compatible"
  | "auto";

export interface ProviderResponse {
  content: string;
  provider: string;
}

export interface ProviderConfig {
  apiKey?: string;
}

export interface AskSeniorArgs {
  question: string;
}

export interface CodeReviewArgs {
  code: string;
}

export interface ArchitectureAdviceArgs {
  problem: string;
}

export interface AIProvider {
  name: string;
  canHandle(): boolean;
  ask(
    prompt: string,
    systemPrompt: string,
    model?: string,
    url?: string
  ): Promise<string>;
}

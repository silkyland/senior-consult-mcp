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
  context?: string;
  provider?: ProviderType;
  model?: string;
  url?: string;
}

export interface CodeReviewArgs {
  code: string;
  language?: string;
  focus?: string;
  provider?: ProviderType;
  model?: string;
  url?: string;
}

export interface ArchitectureAdviceArgs {
  problem: string;
  constraints?: string;
  stack?: string;
  provider?: ProviderType;
  model?: string;
  url?: string;
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

import { AskSeniorArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";

export async function askSenior(args: AskSeniorArgs) {
  const { question, context, provider: providerType, model, url } = args;

  const provider = await getProvider(providerType);

  const prompt = context
    ? `Context:\n${context}\n\nQuestion: ${question}`
    : question;

  const response = await provider.ask(prompt, SENIOR_SYSTEM_PROMPT, model, url);

  return {
    content: [
      {
        type: "text",
        text: `**[${
          provider.name.charAt(0).toUpperCase() + provider.name.slice(1)
        } Senior Advice]**\n\n${response}`,
      },
    ],
  };
}

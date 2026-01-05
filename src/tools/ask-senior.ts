import { AskSeniorArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";

export async function askSenior(args: AskSeniorArgs) {
  const { question } = args;

  const provider = await getProvider("auto");

  const response = await provider.ask(question, SENIOR_SYSTEM_PROMPT);

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

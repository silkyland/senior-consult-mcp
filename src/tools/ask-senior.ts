import { AskSeniorArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";
import { memoryManager } from "../memory.js";

export async function askSenior(args: AskSeniorArgs) {
  const { question } = args;

  const provider = await getProvider("auto");
  const history = await memoryManager.getHistory();
  const historyContext = memoryManager.formatHistoryForPrompt(history);

  const fullPrompt = `${historyContext}Current Question: ${question}`;

  const response = await provider.ask(fullPrompt, SENIOR_SYSTEM_PROMPT);

  // Save to memory
  await memoryManager.addEntry("user", question);
  await memoryManager.addEntry("assistant", response);

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

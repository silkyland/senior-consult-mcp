import { ArchitectureAdviceArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";
import { memoryManager } from "../memory.js";

export async function architectureAdvice(args: ArchitectureAdviceArgs) {
  const { problem } = args;

  const provider = await getProvider("auto");
  const history = await memoryManager.getHistory();
  const historyContext = memoryManager.formatHistoryForPrompt(history);

  const prompt = `${historyContext}Architecture Challenge:
${problem}

Please provide:
1. Recommended approach
2. Key considerations
3. Pitfalls to avoid`;

  const response = await provider.ask(prompt, SENIOR_SYSTEM_PROMPT);

  // Save to memory
  await memoryManager.addEntry(
    "user",
    `[Architecture Advice Request]: ${problem}`
  );
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

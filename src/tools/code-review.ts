import { CodeReviewArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";
import { memoryManager } from "../memory.js";

export async function codeReview(args: CodeReviewArgs) {
  const { code } = args;

  const provider = await getProvider("auto");
  const history = await memoryManager.getHistory();
  const historyContext = memoryManager.formatHistoryForPrompt(history);

  const prompt = `${historyContext}Please review the following code:

\`\`\`
${code}
\`\`\`

Please provide:
1. Issues found
2. Improvement suggestions
3. What's done well

Keep the review concise and actionable.`;

  const response = await provider.ask(prompt, SENIOR_SYSTEM_PROMPT);

  // Save to memory
  await memoryManager.addEntry("user", "[Code Review Request]");
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

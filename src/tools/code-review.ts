import { CodeReviewArgs } from "../types.js";
import { getProvider, SENIOR_SYSTEM_PROMPT } from "../providers/index.js";

export async function codeReview(args: CodeReviewArgs) {
  const { code, language, focus, provider: providerType, model, url } = args;

  const provider = await getProvider(providerType);

  const prompt = `Please review the following ${language || ""} code:

\`\`\`${language || ""}
${code}
\`\`\`

${focus ? `Focus your review on: ${focus}` : ""}

Please provide:
1. Issues found
2. Improvement suggestions
3. What's done well

Keep the review concise and actionable.`;

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

#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { askSenior } from "./tools/ask-senior.js";
import { codeReview } from "./tools/code-review.js";
import { architectureAdvice } from "./tools/architecture-advice.js";
import {
  AskSeniorArgs,
  CodeReviewArgs,
  ArchitectureAdviceArgs,
} from "./types.js";

class SeniorConsultServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "senior-consult-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "ask_senior",
          description:
            "General purpose consultation with a senior AI developer mentor.",
          inputSchema: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "The question or problem to solve",
              },
              context: {
                type: "string",
                description: "Optional code or project context",
              },
              provider: {
                type: "string",
                enum: [
                  "claude",
                  "gemini",
                  "openai",
                  "z.ai",
                  "openai-compatible",
                  "auto",
                ],
                default: "auto",
                description: "AI provider to use",
              },
              model: {
                type: "string",
                description:
                  "Specific model to use (optional, overrides default)",
              },
              url: {
                type: "string",
                description:
                  "Custom API endpoint URL (optional, overrides default)",
              },
            },
            required: ["question"],
          },
        },
        {
          name: "code_review",
          description: "Request a code review from a senior AI developer.",
          inputSchema: {
            type: "object",
            properties: {
              code: { type: "string", description: "The code to review" },
              language: { type: "string", description: "Programming language" },
              focus: {
                type: "string",
                description:
                  "Specific focus (e.g., performance, security, readability)",
              },
              provider: {
                type: "string",
                enum: [
                  "claude",
                  "gemini",
                  "openai",
                  "z.ai",
                  "openai-compatible",
                  "auto",
                ],
                default: "auto",
              },
              model: {
                type: "string",
                description:
                  "Specific model to use (optional, overrides default)",
              },
              url: {
                type: "string",
                description:
                  "Custom API endpoint URL (optional, overrides default)",
              },
            },
            required: ["code"],
          },
        },
        {
          name: "architecture_advice",
          description:
            "Get architecture and design pattern recommendations from a senior AI.",
          inputSchema: {
            type: "object",
            properties: {
              problem: {
                type: "string",
                description: "Architecture challenge description",
              },
              constraints: {
                type: "string",
                description: "Technical constraints",
              },
              stack: { type: "string", description: "Tech stack being used" },
              provider: {
                type: "string",
                enum: [
                  "claude",
                  "gemini",
                  "openai",
                  "z.ai",
                  "openai-compatible",
                  "auto",
                ],
                default: "auto",
              },
              model: {
                type: "string",
                description:
                  "Specific model to use (optional, overrides default)",
              },
              url: {
                type: "string",
                description:
                  "Custom API endpoint URL (optional, overrides default)",
              },
            },
            required: ["problem"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        switch (request.params.name) {
          case "ask_senior":
            return await askSenior(
              request.params.arguments as unknown as AskSeniorArgs
            );
          case "code_review":
            return await codeReview(
              request.params.arguments as unknown as CodeReviewArgs
            );
          case "architecture_advice":
            return await architectureAdvice(
              request.params.arguments as unknown as ArchitectureAdviceArgs
            );
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${request.params.name}`
            );
        }
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Senior Consult MCP server running on stdio");
  }
}

const server = new SeniorConsultServer();
server.run().catch(console.error);

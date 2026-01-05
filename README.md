# Senior Consult MCP Server

An MCP (Model Context Protocol) server that allows a junior AI agent to consult senior AI providers (Claude, Gemini, OpenAI, Z.ai, and OpenAI-Compatible) for guidance.

## How to Use

Once you have installed the server and configured your API Keys, you can use it directly through your AI Agent (e.g., Windsurf, Cursor, Claude Desktop) using these tools:

1.  **When facing complex issues**: Call `ask_senior` to send your question along with code context to a more powerful AI model (Senior) for analysis.
2.  **When needing a code review**: Use `code_review` to check for code quality, performance, and security.
3.  **When designing systems**: Use `architecture_advice` to get recommendations on system structure or appropriate Design Patterns.

**Example Prompts**:

- "Ask senior (Claude) where there might be security vulnerabilities in this code: [attach code]"
- "Review this code snippet, focusing on performance."
- "Consult senior about implementing Microservices for this project."

## Tools

### 1. `ask_senior`

General purpose consultation.

- `question`: The question or problem.

### 2. `code_review`

Request code review.

- `code`: Code to review.

### 3. `architecture_advice`

Get architecture and design pattern recommendations.

- `problem`: Architecture challenge description.

## Configuration

Set the following environment variables to configure your providers. You can set these in your MCP client's configuration (e.g., Windsurf, Claude Desktop, or VSCode MCP settings).

### 1. API Keys (Required for each provider you use)

- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `ZAI_API_KEY` (or `ZHIPU_API_KEY`)
- `OPENAI_COMPATIBLE_API_KEY` (for OpenRouter, Groq, etc.)

### 2. Default Models & URLs (Optional)

Specify your preferred models or custom endpoints via environment variables to avoid passing them in every tool call:

| Provider   | Model Env Var             | URL Env Var             | Default Model       | Default URL                             |
| ---------- | ------------------------- | ----------------------- | ------------------- | --------------------------------------- |
| Claude     | `CLAUDE_MODEL`            | `CLAUDE_URL`            | `claude-sonnet-4-5` | `api.anthropic.com/v1/messages`         |
| Gemini     | `GEMINI_MODEL`            | `GEMINI_URL`            | `gemini-3-flash`    | (Google AI API)                         |
| OpenAI     | `OPENAI_MODEL`            | `OPENAI_URL`            | `gpt-5.2-codex`     | `api.openai.com/v1/chat/completions`    |
| Z.ai       | `ZAI_MODEL`               | `ZAI_URL`               | `glm-4.6`           | `api.z.ai/api/paas/v4/chat/completions` |
| Compatible | `OPENAI_COMPATIBLE_MODEL` | `OPENAI_COMPATIBLE_URL` | (Required if used)  | (Required if used)                      |

---

## Installation

### 1. Via npx (Recommended for most users)

You can run the server directly without local installation:

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "npx",
      "args": ["-y", "senior-consult-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key",
        "GEMINI_API_KEY": "your-key",
        "OPENAI_API_KEY": "your-key",
        "ZAI_API_KEY": "your-key",
        "OPENAI_COMPATIBLE_API_KEY": "your-key"
      }
    }
  }
}
```

### 2. Global Installation

```bash
npm install -g senior-consult-mcp
```

Then use `senior-consult` as the command:

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "senior-consult",
      "env": {
        "ANTHROPIC_API_KEY": "your-key",
        "GEMINI_API_KEY": "your-key",
        "OPENAI_API_KEY": "your-key",
        "ZAI_API_KEY": "your-key",
        "OPENAI_COMPATIBLE_API_KEY": "your-key"
      }
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start (for testing stdio)
npm start
```

The server runs on `stdio`.

## License

MIT

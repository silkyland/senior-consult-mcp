# Senior Consult MCP Server

An MCP (Model Context Protocol) server that allows a junior AI agent to consult senior AI providers (Claude, Gemini, OpenAI, Z.ai, and OpenAI-Compatible) for guidance.

## Tools

### 1. `ask_senior`

General purpose consultation.

- `question`: The question or problem.
- `context`: (Optional) Code or project context.
- `provider`: (Optional) "claude", "gemini", "openai", "z.ai", "openai-compatible", or "auto" (default).
- `model`: (Optional) Specific model to use.
- `url`: (Optional) Custom API endpoint URL.

### 2. `code_review`

Request code review.

- `code`: Code to review.
- `language`: (Optional) Programming language.
- `focus`: (Optional) Specific focus (performance, security, readability).
- `provider`: (Optional) Default: "auto".
- `model`: (Optional) Specific model to use.
- `url`: (Optional) Custom API endpoint URL.

### 3. `architecture_advice`

Get architecture and design pattern recommendations.

- `problem`: Architecture challenge description.
- `constraints`: (Optional) Technical constraints.
- `stack`: (Optional) Tech stack being used.
- `provider`: (Optional) Default: "auto".
- `model`: (Optional) Specific model to use.
- `url`: (Optional) Custom API endpoint URL.

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

| Provider   | Model Env Var             | URL Env Var             | Default Model              | Default URL                             |
| ---------- | ------------------------- | ----------------------- | -------------------------- | --------------------------------------- |
| Claude     | `CLAUDE_MODEL`            | `CLAUDE_URL`            | `claude-3-5-sonnet-latest` | `api.anthropic.com/v1/messages`         |
| Gemini     | `GEMINI_MODEL`            | `GEMINI_URL`            | `gemini-2.0-flash`         | (Google AI API)                         |
| OpenAI     | `OPENAI_MODEL`            | `OPENAI_URL`            | `gpt-4o`                   | `api.openai.com/v1/chat/completions`    |
| Z.ai       | `ZAI_MODEL`               | `ZAI_URL`               | `glm-4-plus`               | `api.z.ai/api/paas/v4/chat/completions` |
| Compatible | `OPENAI_COMPATIBLE_MODEL` | `OPENAI_COMPATIBLE_URL` | (Required if used)         | (Required if used)                      |

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

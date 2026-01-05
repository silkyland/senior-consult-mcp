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

Set the following environment variables:

- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `ZAI_API_KEY` (or `ZHIPU_API_KEY`)
- `OPENAI_COMPATIBLE_API_KEY` (for OpenRouter, Groq, etc.)

### Using in Windsurf / VSCode MCP

Add this to your `mcp_config.json`:

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "node",
      "args": ["/absolute/path/to/senior-consult-mcp/dist/index.js"],
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

# Senior Consult MCP Server

An MCP (Model Context Protocol) server that allows a junior AI agent to consult senior AI providers (Claude, Gemini, OpenAI, Zhipu) for guidance.

## Tools

### 1. `ask_senior`

General purpose consultation.

- `question`: The question or problem.
- `context`: (Optional) Code or project context.
- `provider`: (Optional) "claude", "gemini", "openai", "zhipu", or "auto" (default).

### 2. `code_review`

Request code review.

- `code`: Code to review.
- `language`: (Optional) Programming language.
- `focus`: (Optional) Specific focus (performance, security, readability).
- `provider`: (Optional) Default: "auto".

### 3. `architecture_advice`

Get architecture and design pattern recommendations.

- `problem`: Architecture challenge description.
- `constraints`: (Optional) Technical constraints.
- `stack`: (Optional) Tech stack being used.
- `provider`: (Optional) Default: "auto".

## Configuration

Set the following environment variables:

- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `ZHIPU_API_KEY`

### Using in Windsurf / VSCode MCP

Add this to your `mcp_config.json`:

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/senior-consult-mcp/src/index.ts"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key",
        "GEMINI_API_KEY": "your-key",
        "OPENAI_API_KEY": "your-key",
        "ZHIPU_API_KEY": "your-key"
      }
    }
  }
}
```

## Development

```bash
bun install
bun build
```

The server runs on `stdio`.

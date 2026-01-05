# Senior Consult MCP Server

An MCP (Model Context Protocol) server that empowers junior AI agents to consult with senior AI experts (Claude, Gemini, OpenAI, DeepSeek, Z.ai) for specialized architectural and coding guidance.

## Key Features

- **Expert Consultation**: Seamlessly bridge the gap between junior agents and top-tier models.
- **Smart History (Memory)**: Token-aware conversation tracking with auto-trimming to keep context precise and efficient.
- **Support for 5+ Providers**: Native support for Claude, Gemini, OpenAI, DeepSeek, Z.ai, and any OpenAI-compatible API.
- **Consolidated Advice**: System prompt optimized for short, high-impact technical consultation.

## How to Use

Once installed and configured, your AI Agent can call these tools:

1.  **`ask_senior`**: General consultation for complex problems.
2.  **`code_review`**: Detailed checks for code quality, security, and performance.
3.  **`architecture_advice`**: Strategic advice on system design and patterns.
4.  **`reset_history`**: Clear the conversation context/memory to start fresh.

**Example Prompts**:

- "Ask senior (DeepSeek) to check for potential race conditions in this logic: [attach code]"
- "Review this snippet for potential memory leaks."
- "Consult senior about the pros and cons of using WebSockets vs Server-Sent Events for this feature."

## Tools

### 1. `ask_senior`

General technical consultation.

- `question`: The specific problem or question.

### 2. `code_review`

Expert code review.

- `code`: The source code to be reviewed.

### 3. `architecture_advice`

Design and architecture guidance.

- `problem`: Description of the architectural challenge.

### 4. `reset_history`

Clear the current session's memory/history.

---

## Configuration

Set environment variables in your MCP client configuration (e.g., Claude Desktop, Cursor, or Windsurf).

### 1. API Keys (Required for used providers)

- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `DEEPSEEK_API_KEY`
- `ZAI_API_KEY` (or `ZHIPU_API_KEY`)
- `OPENAI_COMPATIBLE_API_KEY`

### 2. Default Models & URLs (Optional)

| Provider   | Model Env Var             | URL Env Var             | Default Model       | Default Endpoint                        |
| ---------- | ------------------------- | ----------------------- | ------------------- | --------------------------------------- |
| Claude     | `CLAUDE_MODEL`            | `CLAUDE_URL`            | `claude-sonnet-4-5` | `api.anthropic.com/v1/messages`         |
| Gemini     | `GEMINI_MODEL`            | `GEMINI_URL`            | `gemini-3-flash`    | (Google AI API)                         |
| OpenAI     | `OPENAI_MODEL`            | `OPENAI_URL`            | `gpt-4o`            | `api.openai.com/v1/chat/completions`    |
| DeepSeek   | `DEEPSEEK_MODEL`          | `DEEPSEEK_URL`          | `deepseek-chat`     | `api.deepseek.com/chat/completions`     |
| Z.ai       | `ZAI_MODEL`               | `ZAI_URL`               | `glm-4.6`           | `api.z.ai/api/paas/v4/chat/completions` |
| Compatible | `OPENAI_COMPATIBLE_MODEL` | `OPENAI_COMPATIBLE_URL` | (Required)          | (Required)                              |

---

## Installation

### 1. Via npx (Recommended)

Add this to your MCP settings:

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "npx",
      "args": ["-y", "senior-consult-mcp"],
      "env": {
        "DEEPSEEK_API_KEY": "your-key",
        "ANTHROPIC_API_KEY": "your-key",
        "GEMINI_API_KEY": "your-key"
      }
    }
  }
}
```

### 2. Global Installation

```bash
npm install -g senior-consult-mcp
```

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test locally (stdio)
npm start
```

## License

MIT

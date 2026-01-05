# Senior Consult MCP

> Let your AI agent consult top-tier models for expert technical guidance.

An MCP server that connects your AI agent to expert models (Claude, GPT, Gemini, DeepSeek, Z.ai) for architectural advice, code reviews, and complex problem-solving.

## Why?

Your AI agent is great, but sometimes it needs a second opinion. This MCP server lets it consult specialized models for high-stakes decisions without switching context.

## Tools

| Tool                | Description                            |
| ------------------- | -------------------------------------- |
| ask_senior          | General technical consultation         |
| code_review         | Security, performance & quality checks |
| architecture_advice | System design guidance                 |
| reset_history       | Clear conversation memory              |

## Quick Start

### 1. Configure MCP Client

Add to your MCP settings (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "npx",
      "args": ["-y", "senior-consult-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key"
      }
    }
  }
}
```

### 2. Use It

- "Ask senior to review this authentication flow for security issues"
- "Get architecture advice on microservices vs monolith for our scale"
- "Code review this function for potential memory leaks"

## Installation

**Option A: npx (Recommended)**

```bash
# No install needed - runs directly
npx -y senior-consult-mcp
```

**Option B: Global**

```bash
npm install -g senior-consult-mcp
```

**Option C: Local Development**

```bash
git clone https://github.com/silkyland/senior-consult-mcp.git
cd senior-consult-mcp
npm install
npm run build
npm start
```

## Environment Variables

### API Keys

Set at least one provider key:

```bash
ANTHROPIC_API_KEY=sk-ant-...      # Claude
OPENAI_API_KEY=sk-...             # GPT
GEMINI_API_KEY=...                # Gemini
DEEPSEEK_API_KEY=sk-...           # DeepSeek
ZAI_API_KEY=...                   # Z.ai (or ZHIPU_API_KEY)
OPENAI_COMPATIBLE_API_KEY=...     # Custom endpoint
```

### Model Configuration (Optional)

Override default models:

```bash
# Claude
CLAUDE_MODEL=claude-sonnet-4-5
CLAUDE_URL=https://api.anthropic.com/v1/messages

# OpenAI
OPENAI_MODEL=gpt-4o
OPENAI_URL=https://api.openai.com/v1/chat/completions

# Gemini
GEMINI_MODEL=gemini-2.5-flash

# DeepSeek
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_URL=https://api.deepseek.com/chat/completions

# Z.ai
ZAI_MODEL=glm-4-plus
ZAI_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions

# Custom OpenAI-compatible
OPENAI_COMPATIBLE_MODEL=your-model
OPENAI_COMPATIBLE_URL=https://your-endpoint/v1/chat/completions
```

### Full Example Config

```json
{
  "mcpServers": {
    "senior-consult": {
      "command": "npx",
      "args": ["-y", "senior-consult-mcp"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-xxx",
        "DEEPSEEK_API_KEY": "sk-xxx",
        "GEMINI_API_KEY": "xxx",
        "CLAUDE_MODEL": "claude-sonnet-4-5",
        "DEEPSEEK_MODEL": "deepseek-reasoner"
      }
    }
  }
}
```

## Features

- Multi-Provider - Claude, GPT, Gemini, DeepSeek, Z.ai, custom endpoints
- Smart Memory - Token-aware history with auto-trimming
- Optimized Prompts - Tuned for concise, actionable advice
- Zero Config - Works out of the box with sensible defaults

## Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- Report bugs - Open an issue with reproduction steps
- Suggest features - Share ideas in discussions
- Improve docs - Fix typos, add examples
- Submit PRs - Bug fixes, new providers, optimizations

### Development Setup

```bash
# Clone & install
git clone https://github.com/silkyland/senior-consult-mcp.git
cd senior-consult-mcp
npm install

# Build & test
npm run build

# Run locally
npm start
```

### Pull Request Process

1. Fork the repo
2. Create feature branch (git checkout -b feature/awesome)
3. Make changes & add tests
4. Commit (git commit -m 'Add awesome feature')
5. Push (git push origin feature/awesome)
6. Open PR with clear description

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Meaningful commit messages
- Tests for new features

## License

MIT

---

**Questions?** Open an issue or start a discussion.

**Like this project?** Give it a star to show support!

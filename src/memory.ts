import * as fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import * as path from "path";
import * as os from "os";

export interface MemoryEntry {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  tokens?: number; // track token usage
}

interface MemoryConfig {
  maxEntries?: number;
  maxTokens?: number;
  configDir?: string;
}

export class MemoryManager {
  private historyPath: string;
  private maxEntries: number;
  private maxTokens: number;
  private cache: MemoryEntry[] | null = null;

  constructor(config: MemoryConfig = {}) {
    const homeDir = os.homedir();
    const {
      maxEntries = 15, // Reduced default for tighter context
      maxTokens = 4000,
      configDir = path.join(homeDir, ".senior-consult-mcp"),
    } = config;

    this.maxEntries = maxEntries;
    this.maxTokens = maxTokens;
    this.historyPath = path.join(configDir, "history.json");

    // Init directory synchronously
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }
  }

  // Rough token estimate (~4 chars = 1 token)
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  async getHistory(): Promise<MemoryEntry[]> {
    if (this.cache) return this.cache;

    try {
      if (!existsSync(this.historyPath)) {
        this.cache = [];
        return [];
      }
      const data = await fs.readFile(this.historyPath, "utf-8");
      this.cache = JSON.parse(data);
      return this.cache || [];
    } catch (error) {
      console.error("[Memory] Error reading history:", error);
      return [];
    }
  }

  async addEntry(role: "user" | "assistant", content: string) {
    const history = await this.getHistory();

    history.push({
      role,
      content,
      timestamp: Date.now(),
      tokens: this.estimateTokens(content),
    });

    // Trim by entries
    let trimmed = history.slice(-this.maxEntries);

    // Trim by tokens
    let totalTokens = trimmed.reduce((sum, e) => sum + (e.tokens || 0), 0);
    while (totalTokens > this.maxTokens && trimmed.length > 2) {
      const removed = trimmed.shift();
      totalTokens -= removed?.tokens || 0;
    }

    this.cache = trimmed;
    try {
      await fs.writeFile(this.historyPath, JSON.stringify(trimmed, null, 2));
    } catch (error) {
      console.error("[Memory] Error saving history:", error);
    }
  }

  async clear() {
    this.cache = [];
    try {
      await fs.writeFile(this.historyPath, "[]");
    } catch (error) {
      console.error("[Memory] Error clearing history:", error);
    }
  }

  async getSummary(): Promise<{ entries: number; tokens: number }> {
    const history = await this.getHistory();
    return {
      entries: history.length,
      tokens: history.reduce((sum, e) => sum + (e.tokens || 0), 0),
    };
  }

  formatHistoryForPrompt(history: MemoryEntry[]): string {
    if (!history.length) return "";

    const formatted = history
      .map((e) => `[${e.role === "user" ? "Q" : "A"}]: ${e.content}`)
      .join("\n\n");

    return `### PREVIOUS CONSULTATION CONTEXT\n<context>\n${formatted}\n</context>\n\n`;
  }
}

export const memoryManager = new MemoryManager();

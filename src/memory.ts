import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export interface MemoryEntry {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export class MemoryManager {
  private historyPath: string;
  private maxEntries = 20;

  constructor() {
    const homeDir = os.homedir();
    const configDir = path.join(homeDir, ".senior-consult-mcp");

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    this.historyPath = path.join(configDir, "history.json");
  }

  async getHistory(): Promise<MemoryEntry[]> {
    try {
      if (!fs.existsSync(this.historyPath)) {
        return [];
      }
      const data = fs.readFileSync(this.historyPath, "utf-8");
      return JSON.parse(data) as MemoryEntry[];
    } catch (error) {
      console.error("[Memory] Error reading history:", error);
      return [];
    }
  }

  async addEntry(role: "user" | "assistant", content: string) {
    try {
      const history = await this.getHistory();
      history.push({
        role,
        content,
        timestamp: Date.now(),
      });

      // Keep only the last N entries
      const updatedHistory = history.slice(-this.maxEntries);

      fs.writeFileSync(
        this.historyPath,
        JSON.stringify(updatedHistory, null, 2)
      );
    } catch (error) {
      console.error("[Memory] Error saving history:", error);
    }
  }

  formatHistoryForPrompt(currentHistory: MemoryEntry[]): string {
    if (currentHistory.length === 0) return "";

    return (
      "Previous conversation history:\n" +
      currentHistory
        .map(
          (entry) =>
            `${entry.role === "user" ? "Junior" : "Senior"}: ${entry.content}`
        )
        .join("\n") +
      "\n\n--- End of history ---\n\n"
    );
  }
}

export const memoryManager = new MemoryManager();

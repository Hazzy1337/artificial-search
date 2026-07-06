import type { PowerIndexPoint, PowerIndexSeries } from "@/lib/types"

export const powerIndexData: PowerIndexPoint[] = [
  { day: "Mon", gpt55: 88, claude: 87, gemini: 82, deepseek: 76, qwen: 74 },
  { day: "Tue", gpt55: 89, claude: 88, gemini: 83, deepseek: 78, qwen: 75 },
  { day: "Wed", gpt55: 90, claude: 88, gemini: 84, deepseek: 79, qwen: 76 },
  { day: "Thu", gpt55: 91, claude: 89, gemini: 85, deepseek: 80, qwen: 77 },
  { day: "Fri", gpt55: 92, claude: 89, gemini: 86, deepseek: 82, qwen: 78 },
  { day: "Sat", gpt55: 93, claude: 90, gemini: 86, deepseek: 83, qwen: 79 },
  { day: "Sun", gpt55: 94, claude: 90, gemini: 87, deepseek: 84, qwen: 80 },
]

export const powerIndexSeries: PowerIndexSeries[] = [
  { key: "gpt55", name: "GPT-5.5", color: "#e7c873" },
  { key: "claude", name: "Claude", color: "#b7a1ff" },
  { key: "gemini", name: "Gemini", color: "#6ee7f2" },
  { key: "deepseek", name: "DeepSeek", color: "#5fe0a6" },
  { key: "qwen", name: "Qwen", color: "#ef9557" },
]

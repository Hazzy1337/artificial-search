import type { CatalogStatus, PriceLevel, RecommendationTask, RecommendedStack, RiskLevel } from "@/lib/types"

export type Locale = "en" | "ru"

export const localeCookieName = "artificial_search_locale"
export const locales: Locale[] = ["en", "ru"]

export function normalizeLocale(value: unknown): Locale {
  return value === "ru" ? "ru" : "en"
}

export function tr(locale: Locale, english: string, russian: string) {
  return locale === "ru" ? russian : english
}

const commonRussian: Record<string, string> = {
  Active: "Активен",
  Agent: "Агент",
  "Agent Power": "Сила агента",
  Agents: "Агенты",
  All: "Все",
  Alternatives: "Альтернативы",
  Available: "Доступен",
  "Best For": "Лучше всего для",
  Browser: "Браузер",
  Category: "Категория",
  Cheap: "Бюджетные",
  Coding: "Кодинг",
  "Codebase Understanding": "Понимание кодовой базы",
  community: "сообщество",
  Compatibility: "Совместимость",
  Compare: "Сравнение",
  "Contact sales later": "Связаться позже",
  Context: "Контекст",
  "Context Window": "Окно контекста",
  Cost: "Стоимость",
  "Cost Efficiency": "Эффективность цены",
  "Current plan": "Текущий тариф",
  deprecated: "устарел",
  Docs: "Документы",
  Easy: "Легкая",
  Fast: "Быстрые",
  Features: "Возможности",
  Free: "Free",
  Hard: "Сложная",
  High: "Высокий",
  Intelligence: "Интеллект",
  Locked: "Закрыт",
  Low: "Низкий",
  MCP: "MCP",
  Medium: "Средний",
  Metric: "Метрика",
  Model: "Модель",
  Models: "Модели",
  "Open Source": "Open Source",
  Overall: "Общий",
  "Overall Score": "Общая оценка",
  placeholder: "заглушка",
  Premium: "Premium",
  Pricing: "Тарифы",
  Pro: "Pro",
  Provider: "Провайдер",
  Reasoning: "Reasoning",
  Recommend: "Подбор",
  Recovery: "Восстановление",
  "Recovery after Error": "Восстановление после ошибки",
  "Recovery after error": "Восстановление после ошибки",
  Risk: "Риск",
  Speed: "Скорость",
  stable: "стабильно",
  Strengths: "Сильные стороны",
  "Task Success": "Успех задач",
  "Tool Use": "Работа с tools",
  "Updating...": "Обновление...",
  verified: "проверено",
  Vision: "Зрение",
  Weaknesses: "Слабые стороны",
  closed: "закрытая",
  local: "локальная",
  open: "open source",
  Yes: "Да",
  No: "Нет",
  Limited: "Ограниченно",
  "Agent dependent": "Зависит от агента",
  "Host dependent": "Зависит от хоста",
  "Model dependent": "Зависит от модели",
}

export function tv(locale: Locale, value: string): string {
  if (locale !== "ru") {
    return value
  }

  return commonRussian[value] ?? value
}

export function riskText(locale: Locale, value: RiskLevel): string {
  return tv(locale, value)
}

export function priceLevelText(locale: Locale, value: PriceLevel): string {
  return tv(locale, value)
}

export function statusText(locale: Locale, value: CatalogStatus): string {
  return tv(locale, value)
}

const recommendationRussian: Record<
  RecommendationTask,
  {
    alternatives: string[]
    keywords: string[]
    label: string
    reasoning: string[]
    warning: string
  }
> = {
  "write-code": {
    label: "Писать production-код",
    warning: "Демо-рекомендация. Проверь permissions tools и запусти lint/build перед merge.",
    reasoning: ["Высокая оценка по кодингу", "Хорошая связка с tools", "Browser-проверки помогают сдавать UI"],
    alternatives: ["Claude Opus / Sonnet для внимательного code review", "DeepSeek для недорогих черновых правок"],
    keywords: ["код", "приложение", "фича"],
  },
  "fix-bugs": {
    label: "Исправлять баги",
    warning: "Демо-рекомендация. Сначала воспроизведи ошибку; не патчи только по симптомам.",
    reasoning: ["Workflow с учетом diff", "Хорошее восстановление после ошибок", "CodeGraph помогает идти по call paths"],
    alternatives: ["GPT-5.5 для многофайловых фиксов", "DeepSeek для дешевого первого прохода"],
    keywords: ["баги", "debug", "ошибка"],
  },
  "large-codebase": {
    label: "Работа с большой кодовой базой",
    warning: "Демо-рекомендация. Делай маленькие migration slices и не переписывай широко без call-path evidence.",
    reasoning: ["Long-context чтение", "Подходит symbol graph", "Более безопасный workflow по blast radius"],
    alternatives: ["Kimi для длинных repository notes", "Gemini для очень большого multimodal context"],
    keywords: ["большая кодовая база", "рефакторинг", "монорепо"],
  },
  "analyze-documents": {
    label: "Анализ документов",
    warning: "Демо-рекомендация. Рассматривай найденные clauses как помощь для review, не как юридический совет.",
    reasoning: ["Работа с длинными документами", "Структурированное извлечение", "Хорошее summary"],
    alternatives: ["Kimi для длинных research packs", "GPT-5.5 для смешанных document + coding workflow"],
    keywords: ["документы", "контракты", "pdf"],
  },
  "business-automation": {
    label: "Бизнес-автоматизация",
    warning: "Демо-рекомендация. Не клади credentials в prototype configs и отделяй mock flows от production automations.",
    reasoning: ["Быстрая итерация", "API-friendly стек", "Хорошо подходит для SaaS workflow glue"],
    alternatives: ["Claude для process-heavy specs", "Qwen для cost-sensitive automation"],
    keywords: ["автоматизация", "saas dashboard", "crm"],
  },
  "generate-images": {
    label: "Генерация изображений",
    warning: "Демо-рекомендация. Отслеживай права использования и не называй generated assets официальными brand media.",
    reasoning: ["Vision capability", "Asset workflow", "Быстрый preview loop"],
    alternatives: ["Gemini для multimodal prompts", "GPT image-capable workflows для brand iteration"],
    keywords: ["изображения", "креатив", "assets"],
  },
  research: {
    label: "Технический research",
    warning: "Демо-рекомендация. Цитируй источники и отделяй проверенные факты от model inference.",
    reasoning: ["Long-context чтение", "Сбор источников", "Качественный синтез"],
    alternatives: ["Claude для осторожного синтеза", "Gemini для широкого multimodal research"],
    keywords: ["research", "источники", "документация"],
  },
  "cheap-api": {
    label: "Выбрать дешевую API модель",
    warning: "Демо-рекомендация. Используй evals перед routing high-risk production задач на дешевые модели.",
    reasoning: ["Высокая cost efficiency", "Хорошая coding value", "Удобно для batch-задач"],
    alternatives: ["Mistral для быстрых business assistants", "Llama local для приватных low-marginal-cost workflow"],
    keywords: ["дешевый api", "бюджет", "цена"],
  },
  "local-private-ai": {
    label: "Локальный или приватный AI",
    warning: "Демо-рекомендация. Local не значит safe; все равно аудитируй file permissions и command access.",
    reasoning: ["Контроль данных", "Низкая marginal cost", "Custom deployment"],
    alternatives: ["Qwen для multilingual local work", "Llama для internal assistants с private data"],
    keywords: ["локальный ai", "приватный ai", "offline"],
  },
}

export function recommendationLabel(locale: Locale, stack: RecommendedStack): string {
  return locale === "ru" ? recommendationRussian[stack.task]?.label ?? stack.label : stack.label
}

export function recommendationWarning(locale: Locale, stack: RecommendedStack): string {
  return locale === "ru" ? recommendationRussian[stack.task]?.warning ?? stack.warning : stack.warning
}

export function recommendationReasoning(locale: Locale, stack: RecommendedStack): string[] {
  return locale === "ru" ? recommendationRussian[stack.task]?.reasoning ?? stack.reasoning : stack.reasoning
}

export function recommendationAlternatives(locale: Locale, stack: RecommendedStack): string[] {
  return locale === "ru" ? recommendationRussian[stack.task]?.alternatives ?? stack.alternatives : stack.alternatives
}

export function recommendationKeywords(locale: Locale, stack: RecommendedStack): string[] {
  return locale === "ru" ? recommendationRussian[stack.task]?.keywords ?? stack.keywords : stack.keywords
}

import type { SkillPack, SkillPackInstallManifest, SkillPackInstallSkill } from "@/lib/types"

export function createSkillPackManifest(pack: SkillPack): SkillPackInstallManifest {
  const fileName = `${pack.id}.skillpack.json`

  return {
    schemaVersion: 1,
    kind: "artificial-search.skill-pack",
    id: pack.id,
    name: pack.name,
    summary: pack.summary,
    tier: pack.tier,
    compatibilityScore: pack.compatibilityScore,
    notice:
      "This installs Codex skill files from the pack manifest. MCP servers still require a separate verified mcp.json configuration.",
    install: {
      target: "$CODEX_HOME/skills",
      command: `node scripts/install-skill-pack.mjs ./${fileName}`,
      steps: [
        `Download this manifest as ${fileName}.`,
        "Run the installer from the Artificial Search project root.",
        "Restart Codex after installation so the new skills are loaded.",
      ],
    },
    skills: [
      createPackSkill(pack, "rules", "Rules", [
        "Use the pack scope before choosing a model, MCP server or prompt chain.",
        "Keep generated outputs tied to explicit user intent and validated project context.",
        "Do not expose secrets, private files or credentials through MCP tools.",
      ]),
      createPackSkill(pack, "workflow", "Workflow", pack.features),
      createPackSkill(pack, "validation", "Validation", [
        "Check the recommended model and agent against the task constraints.",
        "Verify every MCP server permission before using the generated config.",
        "Run the relevant lint, build, smoke or review gate before delivery.",
      ]),
    ],
  }
}

export function createSkillPackManifestJson(pack: SkillPack) {
  return JSON.stringify(createSkillPackManifest(pack), null, 2)
}

function createPackSkill(pack: SkillPack, suffix: string, title: string, rules: string[]): SkillPackInstallSkill {
  const id = `${pack.id}-${suffix}`
  const name = `${pack.name} ${title}`
  const description = `${title} skill for ${pack.name}. ${pack.summary}`

  return {
    id,
    name,
    description,
    files: [
      {
        path: "SKILL.md",
        content: createSkillMarkdown(pack, name, id, description, rules),
      },
    ],
  }
}

function createSkillMarkdown(pack: SkillPack, name: string, id: string, description: string, rules: string[]) {
  return `---
name: ${id}
description: ${yamlQuote(description)}
---

# ${name}

Use this skill when a task matches the ${pack.name} pack.

## Pack Summary

${pack.summary}

## Compatible Models

${pack.compatibleModels.map((model) => `- ${model}`).join("\n")}

## Pack Contents

${pack.inside.map((item) => `- ${item}`).join("\n")}

## Operating Rules

${rules.map((rule) => `- ${rule}`).join("\n")}
`
}

function yamlQuote(value: string) {
  return JSON.stringify(value)
}

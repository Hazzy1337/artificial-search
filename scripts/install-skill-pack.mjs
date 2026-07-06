import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

const manifestPath = process.argv[2]

if (!manifestPath) {
  console.error("Usage: node scripts/install-skill-pack.mjs <pack.skillpack.json>")
  process.exit(1)
}

const manifestRaw = await readFile(manifestPath, "utf8")
const manifest = JSON.parse(stripBom(manifestRaw))

if (manifest.kind !== "artificial-search.skill-pack" || !Array.isArray(manifest.skills)) {
  console.error("Invalid skill pack manifest.")
  process.exit(1)
}

const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex")
const skillsRoot = path.resolve(process.env.CODEX_SKILLS_DIR || path.join(codexHome, "skills"))

await mkdir(skillsRoot, { recursive: true })

for (const skill of manifest.skills) {
  assertSafeSkillId(skill.id)

  if (!Array.isArray(skill.files) || skill.files.length === 0) {
    throw new Error(`Skill ${skill.id} has no files.`)
  }

  const skillDir = path.resolve(skillsRoot, skill.id)

  if (!isInside(skillsRoot, skillDir)) {
    throw new Error(`Unsafe skill destination: ${skill.id}`)
  }

  if (await exists(skillDir)) {
    throw new Error(`Skill already exists: ${skillDir}`)
  }

  await mkdir(skillDir, { recursive: true })

  for (const file of skill.files) {
    assertSafeRelativePath(file.path)

    const targetPath = path.resolve(skillDir, file.path)

    if (!isInside(skillDir, targetPath)) {
      throw new Error(`Unsafe file path in ${skill.id}: ${file.path}`)
    }

    await mkdir(path.dirname(targetPath), { recursive: true })
    await writeFile(targetPath, String(file.content), "utf8")
  }

  console.log(`Installed ${skill.id} -> ${skillDir}`)
}

console.log("Restart Codex to pick up new skills.")

async function exists(targetPath) {
  try {
    await access(targetPath)
    return true
  } catch {
    return false
  }
}

function assertSafeSkillId(skillId) {
  if (typeof skillId !== "string" || !/^[a-z0-9][a-z0-9-]{1,80}$/.test(skillId)) {
    throw new Error(`Unsafe skill id: ${skillId}`)
  }
}

function assertSafeRelativePath(filePath) {
  if (typeof filePath !== "string" || !filePath || path.isAbsolute(filePath)) {
    throw new Error(`Unsafe file path: ${filePath}`)
  }

  const normalized = path.normalize(filePath)

  if (normalized === ".." || normalized.startsWith(`..${path.sep}`)) {
    throw new Error(`Unsafe file path: ${filePath}`)
  }
}

function isInside(parent, child) {
  const relative = path.relative(parent, child)
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative))
}

function stripBom(value) {
  return value.replace(/^\uFEFF/, "")
}

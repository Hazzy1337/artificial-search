"use client"

import { useMemo, useState } from "react"
import { FileText } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createDemoMcpConfig } from "@/lib/mcpConfig"
import type { AiAgent, McpServer, SkillPack } from "@/lib/types"

type McpConfigGeneratorProps = {
  agents: AiAgent[]
  mcpServers: McpServer[]
  skillPacks: SkillPack[]
}

export function McpConfigGenerator({ agents, mcpServers, skillPacks }: McpConfigGeneratorProps) {
  const [agentId, setAgentId] = useState(agents[0]?.id ?? "")
  const [skillPackId, setSkillPackId] = useState(skillPacks.find((pack) => pack.highlighted)?.id ?? skillPacks[0]?.id ?? "")
  const [selectedServerIds, setSelectedServerIds] = useState(["codegraphcontext", "filesystem", "git"])

  const config = useMemo(() => {
    const servers = mcpServers.filter((server) => selectedServerIds.includes(server.id))
    const demoConfig = JSON.parse(createDemoMcpConfig(servers))

    return JSON.stringify(
      {
        notice:
          "Demo config - verify package names before installing. Artificial Search does not claim these placeholder commands are installable.",
        agent: agents.find((agent) => agent.id === agentId)?.name,
        skillPack: skillPacks.find((pack) => pack.id === skillPackId)?.name,
        mcpServers: demoConfig.mcpServers,
      },
      null,
      2
    )
  }, [agentId, agents, mcpServers, selectedServerIds, skillPackId, skillPacks])

  function toggleServer(serverId: string, checked: boolean) {
    setSelectedServerIds((current) => {
      if (checked) {
        return Array.from(new Set([...current, serverId]))
      }

      return current.filter((item) => item !== serverId)
    })
  }

  return (
    <div className="luxury-panel rounded-lg p-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-50">
        <FileText aria-hidden="true" className="size-5 text-amber-200" />
        Generate MCP config
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone-400">
        Demo config - verify package names before installing. Placeholder commands are not claimed to be installable.
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="agent">Agent</Label>
            <Select onValueChange={setAgentId} value={agentId}>
              <SelectTrigger className="h-10 w-full border-amber-200/15 bg-black/30 text-stone-100" id="agent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-amber-200/15 bg-[#08070b]">
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="skill-pack">Skill pack</Label>
            <Select onValueChange={setSkillPackId} value={skillPackId}>
              <SelectTrigger className="h-10 w-full border-amber-200/15 bg-black/30 text-stone-100" id="skill-pack">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-amber-200/15 bg-[#08070b]">
                {skillPacks.map((pack) => (
                  <SelectItem key={pack.id} value={pack.id}>
                    {pack.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium text-stone-200">MCP servers</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {mcpServers.map((server) => (
                <label className="flex min-h-11 items-center gap-2 rounded-lg border border-amber-200/10 bg-white/[0.045] p-2 text-sm text-stone-300" key={server.id}>
                  <Checkbox
                    checked={selectedServerIds.includes(server.id)}
                    onCheckedChange={(checked) => toggleServer(server.id, checked === true)}
                  />
                  {server.name}
                </label>
              ))}
            </div>
          </div>
        </div>
        <Textarea className="min-h-96 border-amber-200/15 bg-black/35 font-mono text-xs text-stone-200" readOnly value={config} />
      </div>
    </div>
  )
}

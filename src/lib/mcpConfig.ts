import type { McpServer } from "@/lib/types"

const PLACEHOLDER_COMMAND = "TODO_REPLACE_WITH_VERIFIED_SERVER"
const PLACEHOLDER_ARGS = ["VERIFY_PACKAGE_NAME_BEFORE_INSTALLING"]

export function createDemoMcpConfig(servers: McpServer[]) {
  const mcpServers = Object.fromEntries(
    servers.map((server) => [
      server.id,
      server.verifiedCommand && !server.isPlaceholder
        ? {
            command: server.verifiedCommand.command,
            args: server.verifiedCommand.args,
          }
        : {
            command: PLACEHOLDER_COMMAND,
            args: PLACEHOLDER_ARGS,
            status: "demo-placeholder",
            name: server.name,
          },
    ])
  )

  return JSON.stringify(
    {
      notice:
        "Demo config - verify package names before installing. Artificial Search does not claim placeholder commands are installable.",
      mcpServers,
    },
    null,
    2
  )
}

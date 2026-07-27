import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tr } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

type ComparisonTableProps = {
  columns: string[]
  locale?: Locale
  rows: Array<{
    metric: string
    values: string[]
  }>
}

export function ComparisonTable({ columns, locale = "en", rows }: ComparisonTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-amber-200/10 hover:bg-transparent">
          <TableHead>{tr(locale, "Metric", "Метрика")}</TableHead>
          {columns.map((column) => (
            <TableHead className="min-w-40" key={column}>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow className="border-amber-200/10 hover:bg-white/[0.035]" key={row.metric}>
            <TableCell className="font-medium text-stone-100">{row.metric}</TableCell>
            {row.values.map((value, index) => (
              <TableCell className="text-stone-300" key={`${row.metric}-${columns[index]}`}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

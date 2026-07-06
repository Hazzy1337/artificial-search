import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type PowerScoreBarProps = {
  label: string
  value: number
  className?: string
}

export function PowerScoreBar({ label, value, className }: PowerScoreBarProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-3 text-xs text-stone-300">
        <span>{label}</span>
        <span className="font-mono text-stone-100">{value}</span>
      </div>
      <Progress aria-label={`${label} score ${value}`} className="h-1.5 bg-amber-200/10" value={value} />
    </div>
  )
}

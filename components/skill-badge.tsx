import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  category: string
}

export default function SkillBadge({ name, category }: SkillBadgeProps) {
  // Cool Graphite brand: neutrals dominate (~10:1) and indigo is reserved for
  // links / the mark / one primary action — so every category shares the same
  // neutral chip. The category prop is kept for the callers' data shape.
  void category
  return (
    <Badge
      variant="outline"
      className="bg-muted text-muted-foreground hover:bg-muted/70 font-normal border-0"
    >
      {name}
    </Badge>
  )
}

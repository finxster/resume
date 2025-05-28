import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  category: string
}

export default function SkillBadge({ name, category }: SkillBadgeProps) {
  // Define color schemes based on category
  const getColorClass = () => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "backend":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "devops":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "cloud":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
      case "database":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Badge variant="outline" className={`${getColorClass()} font-normal border-0`}>
      {name}
    </Badge>
  )
}

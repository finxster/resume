"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  period: string
  description: string
  parallel: boolean
}

interface TimelineProps {
  experiences: Experience[]
}

export default function Timeline({ experiences }: TimelineProps) {
  const [activeId, setActiveId] = useState<number | null>(null)

  // Sort experiences by start date (assuming the array is already in chronological order)
  const sortedExperiences = [...experiences]

  return (
    <div className="relative">
      {/* Main timeline */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

      <div className="space-y-12">
        {sortedExperiences.map((experience, index) => (
          <div key={experience.id} className="relative">
            {/* Timeline dot */}
            <div
              className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10 ${
                experience.parallel ? "bg-amber-500" : "bg-blue-500"
              }`}
            ></div>

            {/* Content card - alternating sides on desktop */}
            <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
              <Card
                className={`hover:shadow-lg transition-all ${activeId === experience.id ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setActiveId(experience.id === activeId ? null : experience.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{experience.title}</h3>
                      <p className="text-gray-500">{experience.company}</p>
                    </div>
                    <Badge
                      variant={experience.parallel ? "outline" : "default"}
                      className={experience.parallel ? "border-amber-500 text-amber-700" : ""}
                    >
                      {experience.period}
                    </Badge>
                  </div>
                  <p className="mt-2 text-gray-600">{experience.description}</p>
                  {experience.parallel && (
                    <div className="mt-2 flex items-center text-sm text-amber-600">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>Parallel role</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

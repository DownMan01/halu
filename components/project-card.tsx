import Image from "next/image"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-lg bg-card p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h3 className="font-medium text-card-foreground">{project.name}</h3>
      </div>
    </div>
  )
}


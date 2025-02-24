"use client"

import { CHAINS, COSTS, SAMPLE_PROJECTS } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Share2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { use } from "react"

export default function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  // Use React.use to unwrap the params promise
  const resolvedParams = use(params)
  const project = SAMPLE_PROJECTS.find((p) => p.id === resolvedParams.projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Project Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <ThemeToggle />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center py-4">
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {project.isNew && (
                  <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                    New
                  </span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{project.name}</h1>
              </div>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex-1 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, quibusdam, quos,
                voluptatum voluptas quia exercitationem quae doloribus quas voluptates natus. Quisquam voluptatibus,
                quibusdam, quos, voluptatum voluptas quia exercitationem quae doloribus quas voluptates natus.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Backers</h2>
              <p className="text-muted-foreground">{project.backers}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Project Details</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Chain</dt>
                  <dd>
                    <Badge variant="secondary" className={`bg-${CHAINS.find((c) => c.name === project.chain)?.color}`}>
                      {project.chain}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Cost</dt>
                  <dd>
                    <Badge variant="secondary" className={`bg-${COSTS.find((c) => c.name === project.cost)?.color}`}>
                      {project.cost}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground mb-1">Stage</dt>
                  <dd>
                    <Badge
                      variant="secondary"
                      className={project.stage === "Mainnet" ? "bg-emerald-600" : "bg-yellow-600"}
                    >
                      {project.stage}
                    </Badge>
                  </dd>
                </div>
                {project.addedAt && (
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Added</dt>
                    <dd className="text-sm">{new Date(project.addedAt).toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}


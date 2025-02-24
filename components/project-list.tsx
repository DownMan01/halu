
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowDown, ArrowUp, Search, SlidersHorizontal } from 'lucide-react'
import { CHAINS, COSTS } from "@/lib/data"
import type { Project } from "@/lib/types"

type SortConfig = {
  key: keyof Project | null
  direction: "asc" | "desc"
}

export default function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter()
  const [projects] = useState<Project[]>(initialProjects)
  const [search, setSearch] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [selectedCosts, setSelectedCosts] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.backers.toLowerCase().includes(searchLower),
      )
    }

    if (selectedChains.length > 0) {
      result = result.filter((project) => selectedChains.includes(project.chain))
    }

    if (selectedCosts.length > 0) {
      result = result.filter((project) => selectedCosts.includes(project.cost))
    }

    if (selectedStages.length > 0) {
      result = result.filter((project) => selectedStages.includes(project.stage))
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = String(a[sortConfig.key as keyof Project])
        const bValue = String(b[sortConfig.key as keyof Project])
        return sortConfig.direction === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      })
    }

    return result
  }, [projects, search, sortConfig, selectedChains, selectedCosts, selectedStages])

  // ... rest of your existing filtering and sorting code ...

  return (
    <div>
      {/* Filters Section */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        {/* ... existing filters code ... */}
      </div>

      {/* Table Section */}
      <div className="container py-6">
        {/* ... existing table code ... */}
      </div>
    </div>
  )
}
"use client"

import { Badge } from "@/components/ui/badge"
import { CHAINS, COSTS } from "@/lib/data"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Search, SlidersHorizontal } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import LoadingScreen from "@/components/loading-screen"
import { SiteFooter } from "@/components/site-footer"

// Add this import
import { useRouter } from "next/navigation"

type SortConfig = {
  key: keyof any | null;  // Update to allow dynamic keys for project data
  direction: "asc" | "desc";
};

export default function Home() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [selectedCosts, setSelectedCosts] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])

 // Define projects state to hold fetched data
 const [projects, setProjects] = useState<any[]>([]) // Store fetched projects
 const [loading, setLoading] = useState(false) // Loading state for fetching data

 // Fetch all airdrop projects on page load
 useEffect(() => {
   const fetchProjects = async () => {
     setLoading(true)
     try {
       const response = await axios.get("https://halu-db.vercel.app/api/") // Fetching from your API endpoint
       setProjects(response.data) // Set the fetched data into state
     } catch (error) {
       console.error("Error fetching projects:", error)
     } finally {
       setLoading(false)
     }
   }

   fetchProjects() // Fetch the projects
 }, [])

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects]

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((project) =>
        (project.name?.toLowerCase() || "").includes(searchLower) ||
        (project.about?.toLowerCase() || "").includes(searchLower) ||
        (project.backers?.toLowerCase() || "").includes(searchLower)
      );
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
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
    
        if (!aValue || !bValue) return 0;
    
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === "asc" 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
    
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result
  }, [search, sortConfig, selectedChains, selectedCosts, selectedStages, projects])

  const handleSort = (key: keyof any) => {  // Update to dynamically handle any key
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
  }

  const SortIndicator = ({ columnKey }: { columnKey: keyof any }) => {
    if (sortConfig.key !== columnKey) return null
    return sortConfig.direction === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const FilterControls = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Chain ({selectedChains.length})</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {CHAINS.map((chain) => (
            <DropdownMenuCheckboxItem
              key={chain.id}
              checked={selectedChains.includes(chain.name)}
              onCheckedChange={(checked) =>
                setSelectedChains(
                  checked ? [...selectedChains, chain.name] : selectedChains.filter((c) => c !== chain.name),
                )
              }
            >
              {chain.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Cost ({selectedCosts.length})</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {COSTS.map((cost) => (
            <DropdownMenuCheckboxItem
              key={cost.id}
              checked={selectedCosts.includes(cost.name)}
              onCheckedChange={(checked) =>
                setSelectedCosts(checked ? [...selectedCosts, cost.name] : selectedCosts.filter((c) => c !== cost.name))
              }
            >
              {cost.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Stage ({selectedStages.length})</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Mainnet", "Testnet"].map((stage) => (
            <DropdownMenuCheckboxItem
              key={stage}
              checked={selectedStages.includes(stage)}
              onCheckedChange={(checked) =>
                setSelectedStages(checked ? [...selectedStages, stage] : selectedStages.filter((s) => s !== stage))
              }
            >
              {stage}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )


  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />

      {/* Hero Section - remains the same */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background border-b">
        <div className="container py-8 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
            <a href="/" className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <img src="https://i.imgur.com/dHEVwPc.png" alt="Logo" className="h-100 w-100" /></a>
            <a href="/" className="text-2xl font-bold tracking-tight">NoteDrop</a>
            </div>
            <ThemeToggle />
          </div>
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Web3 Airdrop Database</h2>
            <p className="text-lg text-muted-foreground">
              Discover and track the latest blockchain projects, airdrops, and protocols. Stay updated with
              comprehensive information about Web3 innovations.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section - remains the same */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-2">
              <FilterControls />
            </div>

            {/* Mobile Filters */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-4">
                    <FilterControls />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

     {/* Table Section */}
     <div className="container py-6">
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">
                    <button onClick={() => handleSort("name")} className="flex items-center gap-1 hover:text-primary">
                      Project
                      <SortIndicator columnKey="name" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">
                    <button onClick={() => handleSort("about")} className="flex items-center gap-1 hover:text-primary">
                      About
                      <SortIndicator columnKey="about" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button onClick={() => handleSort("chain")} className="flex items-center gap-1 hover:text-primary">
                      Chain
                      <SortIndicator columnKey="chain" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button onClick={() => handleSort("cost")} className="flex items-center gap-1 hover:text-primary">
                      Cost
                      <SortIndicator columnKey="cost" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">
                    <button
                      onClick={() => handleSort("backers")}
                      className="flex items-center gap-1 hover:text-primary"
                    >
                      Backers
                      <SortIndicator columnKey="backers" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button onClick={() => handleSort("stage")} className="flex items-center gap-1 hover:text-primary">
                      Stage
                      <SortIndicator columnKey="stage" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`${
                      index % 2 === 0 ? "bg-muted/50" : ""
                    } hover:bg-accent/50 transition-colors cursor-pointer`}
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{project.description}</td>
                    <td className="p-4">
                      <Badge
                        variant="secondary">
                        {project.chain}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className={`bg-${COSTS.find((c) => c.name === project.cost)?.color}`}>
                        {project.cost}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{project.backers}</td>
                    <td className="p-4">
                      <Badge
                        variant="secondary"
                        className={project.stage === "Mainnet" ? "bg-emerald-600" : "bg-yellow-600"}
                      >
                        {project.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

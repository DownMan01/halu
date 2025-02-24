// lib/api.ts
import type { Project } from "./types"

const API_URL = "http://localhost:8080/api"

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects`)
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}

export async function fetchProjectById(id: string): Promise<Project> {
  const response = await fetch(`${API_URL}/projects/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch project')
  }
  return response.json()
}
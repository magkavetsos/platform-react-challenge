import { useQuery } from '@tanstack/react-query'
import { fetchBreeds } from './api'

export type Breed = {
  id: string
  name: string
  description?: string
  origin?: string
  temperament?: string
  life_span?: string
  weight?: {  metric?: string }
  adaptability?: number
  affection_level?: number
  child_friendly?: number
  dog_friendly?: number
  energy_level?: number
  intelligence?: number
  wikipedia_url?: string
}

export function useBreeds() {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 60 * 24,
  })
}
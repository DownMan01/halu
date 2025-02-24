export type Project = {
    id: string
    name: string
    image: string
    description: string
    chain: string
    cost: string
    backers: string
    stage: "Mainnet" | "Testnet"
    isNew?: boolean
    addedAt?: Date
  }
  
  export type Chain = {
    id: string
    name: string
    color: string
  }
  
  export type Cost = {
    id: string
    name: string
    color: string
  }
  
  export type Tag = {
    id: string
    name: string
    color: string
  }
  
  
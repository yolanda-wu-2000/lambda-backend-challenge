import fetch from 'node-fetch'
import { Response } from './types'

interface BreedsResponse extends Response {
  body: Breeds
}

interface Breeds {
  message: string[]
  status: string
}

function parseBreeds(message: object): string[] {
  const breeds: string[] = []

  Object.entries(message).forEach(element => {
    const key = element[0]
    const value = element[1]

    if (value.length === 0) {
      breeds.push(`${key}`)
    } else {
      value.forEach((sub: string) => {
        breeds.push(`${sub} ${key}`)
      })
    }
  })

  return breeds
}

export async function handler(): Promise<BreedsResponse | Error> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    if (!res.ok) {
      return Promise.reject(new Error(`HTTP Error Response: ${res.status} ${res.statusText}`))
    }

    const json = await res.json()
    const breedsMessage: string[] = await parseBreeds(json.message)
    const payload: Breeds = { message: breedsMessage, status: json.status as string }
    return {
      statusCode: res.status,
      body: payload,
    }
  } catch (error) {
    return error
  }
}

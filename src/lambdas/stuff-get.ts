import { Response } from './types'

interface StuffResponse extends Response {
  body: string
}

export async function handler(): Promise<StuffResponse> {
  return {
    statusCode: 200,
    body: `Hi!`,
  }
}

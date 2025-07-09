
import { Context } from 'hono'

type ErrorResponse = {
  error: string
  details?: string
  code?: string
}

export function handleError(c: Context, e: unknown): Response {
 
  const error = e instanceof Error ? e : new Error(String(e))
  
 
  const response: ErrorResponse = {
    error: 'Request failed',
    details: error.message
  }

  if ('code' in error) response.code = String(error.code)

  console.error(`[${c.req.method}] ${c.req.path}`, error)

  return c.json(response, 500)
}
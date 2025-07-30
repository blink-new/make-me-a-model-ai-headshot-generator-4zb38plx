// Error handling utilities for network resilience

export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'NetworkError'
  }
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (i === maxRetries) {
        throw new NetworkError(
          `Failed after ${maxRetries + 1} attempts: ${lastError.message}`,
          lastError
        )
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError!
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return 'Network connection issue. Please check your internet connection and try again.'
  }
  
  if (error instanceof Error) {
    if (error.message.includes('fetch')) {
      return 'Connection failed. Please try again in a moment.'
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.'
    }
    return error.message
  }
  
  return 'An unexpected error occurred. Please try again.'
}
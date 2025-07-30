import { createClient } from '@blinkdotnew/sdk'
import { withRetry, handleApiError } from '../utils/errorHandler'

export const blink = createClient({
  projectId: 'make-me-a-model-ai-headshot-generator-4zb38plx',
  authRequired: true,
  httpClient: {
    timeout: 30000, // 30 second timeout
    retries: 3
  }
})

// Wrapper functions with retry logic for critical operations
export const blinkWithRetry = {
  auth: {
    me: () => withRetry(() => blink.auth.me()),
    onAuthStateChanged: blink.auth.onAuthStateChanged.bind(blink.auth)
  },
  
  db: {
    generations: {
      list: (options?: any) => withRetry(() => blink.db.generations.list(options)),
      create: (data: any) => withRetry(() => blink.db.generations.create(data))
    },
    communityPosts: {
      list: (options?: any) => withRetry(() => blink.db.communityPosts.list(options)),
      create: (data: any) => withRetry(() => blink.db.communityPosts.create(data))
    }
  },
  
  ai: {
    generateImage: (options: any) => withRetry(() => blink.ai.generateImage(options), 2, 2000)
  },
  
  storage: {
    upload: (file: File, path: string, options?: any) => 
      withRetry(() => blink.storage.upload(file, path, options), 2, 1000)
  }
}

export { handleApiError }
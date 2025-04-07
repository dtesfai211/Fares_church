import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token, // Include the auth token from environment variables
  ignoreBrowserTokenWarning: true
})

import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'p86pglis',
    dataset: process.env.SANITY_STUDIO_API_DATASET,
  },
})

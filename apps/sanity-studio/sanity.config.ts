import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { AppStructure } from './desk-structure'
import { table } from '@sanity/table'

export default defineConfig({
  name: 'default',
  title: 'Bifrsot Studio',

  projectId: 'p86pglis',
  dataset: 'production',

  plugins: [
    table(),
    visionTool(),
    deskTool({
      structure: AppStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

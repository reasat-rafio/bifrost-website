import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { AppStructure } from './desk-structure'
// @ts-ignore
// import table from 'sanity-plugin-table'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'j860ecxk',
  dataset: 'production',

  plugins: [
    // table(),
    visionTool(),
    deskTool({
      structure: AppStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

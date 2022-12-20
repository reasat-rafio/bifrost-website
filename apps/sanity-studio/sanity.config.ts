import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { AppStructure } from './desk-structure'
import { table } from '@sanity/table'
import { Logo } from './components/logo'

const devOnlyPlugins = [visionTool()]
export default defineConfig({
  name: 'bifrostStudio',
  title: 'Bifrost Studio',
  icon: Logo,

  projectId: 'p86pglis',
  dataset: 'production',

  plugins: [
    ...(process.env.NODE_ENV !== 'production' ? devOnlyPlugins : []),
    table(),
    deskTool({
      structure: AppStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

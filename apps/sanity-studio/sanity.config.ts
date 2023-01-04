import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { AppStructure } from './desk-structure'
import { table } from '@sanity/table'
import { Logo } from './components/logo'

export default defineConfig([
  {
    projectId: 'p86pglis',
    dataset: 'staging',
    name: 'bifrost-staging-workspace',
    basePath: '/staging',
    title: 'Staging',
    icon: Logo,
    plugins: [table(), deskTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])

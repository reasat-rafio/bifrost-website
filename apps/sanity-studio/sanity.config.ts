import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/schema'
import { AppStructure } from './desk-structure'
import { table } from '@sanity/table'
import { Logo } from './components/logo'

const { theme } = (await import(
  'https://themer.sanity.build/api/hues?default=49469f;600&primary=2d3cb7;600&transparent=58568f;600&positive=43d675;300&caution=fbd024;200&lightest=fcfbfd&darkest=0d0d15'
)) as { theme: import('sanity').StudioTheme }

const devOnlyPlugins = [visionTool()]
export default defineConfig({
  name: 'bifrostStudio',
  title: 'Bifrost Studio',
  icon: Logo,
  theme: theme,

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

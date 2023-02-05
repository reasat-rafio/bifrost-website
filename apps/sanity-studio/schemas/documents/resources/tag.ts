import { GrTag } from 'react-icons/gr'
import { Rule } from 'sanity'

const resourcesTag = {
  name: 'resourcesTag',
  title: 'Tag',
  type: 'document',
  icon: GrTag,
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (_: any, context: any) => context.parent.name,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }: { [_key: string]: string }) => ({
      title,
      icon: GrTag,
    }),
  },
}

export default resourcesTag

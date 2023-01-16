import { GrTag } from 'react-icons/gr'
import { defineType, defineField } from 'sanity'

const Tags = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: GrTag,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
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
})

export default Tags

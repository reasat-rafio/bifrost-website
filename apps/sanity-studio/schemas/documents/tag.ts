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
})

export default Tags

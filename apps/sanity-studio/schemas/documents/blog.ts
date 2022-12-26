import { BsNewspaper, BsIntersect } from 'react-icons/bs'
import { TiWaves } from 'react-icons/ti'
import { defineField, defineType, SanityDocument, defineArrayMember } from 'sanity'

const Blog = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: BsNewspaper,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) => doc.heading as string,
      },
    }),
    defineField({ name: 'subHeading', type: 'string' }),
    defineField({ name: 'image', type: 'image', description: 'will use as preview image' }),
    defineField({
      name: 'tags',
      type: 'array',
      options: {
        layout: 'tags',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'tag' },
        },
      ],
    }),
    defineField({ name: 'datetime', type: 'datetime' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      initialValue: [
        {
          _type: 'introduction',
          heading: 'Introduction',
        },
      ],
      of: [
        {
          name: 'introduction',
          type: 'object',
          icon: TiWaves,
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'image', type: 'image' },
            {
              name: 'description',
              type: 'array',
              of: [defineArrayMember({ type: 'block' }), defineArrayMember({ type: 'image' })],
            },
          ],
        },
        {
          name: 'section',
          type: 'object',
          icon: BsIntersect,
          fields: [
            { name: 'heading', type: 'string' },
            { name: 'hideHeading', type: 'boolean' },

            {
              name: 'description',
              type: 'array',
              of: [
                defineArrayMember({ type: 'block' }),
                defineArrayMember({ type: 'image' }),
                defineArrayMember({
                  type: 'quote',
                }),
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'image',
    },
  },
})

export default Blog

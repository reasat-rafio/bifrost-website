import { BsNewspaper, BsIntersect } from 'react-icons/bs'
import { TiWaves } from 'react-icons/ti'

export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: BsNewspaper,

  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    { name: 'heading', type: 'string' },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => doc.heading,
      },
    },
    { name: 'subHeading', type: 'string' },
    { name: 'image', type: 'image', description: 'will use as preview image' },

    { name: 'datetime', type: 'datetime' },
    {
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
            { name: 'description', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
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
                { type: 'block' },
                { type: 'image' },
                {
                  type: 'quote',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'image',
    },
  },
}

import { BsIntersect } from 'react-icons/bs'
import { TiWaves } from 'react-icons/ti'
import { FiDatabase } from 'react-icons/fi'

export default {
  name: 'dataset',
  title: 'Dataset',
  type: 'document',
  icon: FiDatabase,
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
    { name: 'license', type: 'string' },
    { name: 'images', type: 'array', of: [{ type: 'image' }] },
    {
      name: 'tags',
      type: 'array',
      options: {
        layout: 'tags',
        isHighlighted: true,
      },
      of: [
        {
          type: 'reference',
          to: { type: 'tag' },
        },
      ],
    },

    { name: 'body', type: 'array', of: [{ type: 'block' }] },
    { name: 'attributes', type: 'array', of: [{ type: 'attribute' }] },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
      media: 'image',
    },
  },
}

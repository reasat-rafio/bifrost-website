import getYouTubeId from 'get-youtube-id'
import YT from 'react-youtube'
import { Rule } from 'sanity'

const Preview = ({ value }: any) => {
  const { url } = value
  const id = getYouTubeId(url)
  return <YT videoId={id as string} />
}

const youTube = {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      url: 'url',
      media: 'thumbnail',
    },
    prepare: ({ media }: any) => {
      return {
        title: 'YouTube Embed',
        media,
      }
    },
    component: Preview,
  },
}

export default youTube

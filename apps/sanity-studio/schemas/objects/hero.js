import { MdFeaturedVideo } from 'react-icons/md'
// import React from 'react'
// import getYouTubeID from 'get-youtube-id'

// const YouTubePreview = ({ value }) => {
//   const id = getYouTubeID(value.url)
//   const url = `https://www.youtube.com/embed/${id}`
//   if (!id) {
//     return <div>Missing YouTube URL</div>
//   }
//   return (
//     <iframe
//       title="YouTube Preview"
//       width="560"
//       height="315"
//       src={url}
//       frameBorder="0"
//       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//     />
//   )
// }

export default {
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: MdFeaturedVideo,
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['image', 'video', 'youtube'],
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Hero Image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
        },
      ],
    },
    {
      name: 'video',
      type: 'file',
      title: 'Hero Video',
    },
    {
      name: 'youtube',
      type: 'object',
      title: 'Hero YouTube Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
      ],
      preview: {
        select: {
          url: 'url',
        },
        // component: YouTubePreview,
      },
    },
  ],
  preview: {
    select: {
      media: 'image',
    },
  },
}

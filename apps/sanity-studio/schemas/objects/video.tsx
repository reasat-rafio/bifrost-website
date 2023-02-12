import { Rule } from 'sanity'

const video = {
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'video_webm',
      type: 'file',
      title: 'WebM',
      accept: 'video/webm',
    },
    {
      name: 'video_mp4',
      type: 'file',
      title: 'MP4 - MPEG4',
      accept: 'video/mp4',
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
      webm: 'video_webm.asset.url',
      hevc: 'video_hevc.asset.url',
    },
    prepare: ({ webm, hevc }: any) => ({
      title: 'Video',
      media: (
        <video
          muted
          playsInline
          autoPlay
          loop
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <source src={webm} type="video/webm" />
          <source src={hevc} type="video/quicktime" />
        </video>
      ),
    }),
  },
}

export default video

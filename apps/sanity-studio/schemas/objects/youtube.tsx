import getYouTubeId from 'get-youtube-id'
import YT from 'react-youtube'

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
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare: ({ url, title }: any) => {
      return {
        title: 'YouTube Embed',
        media: <Preview value={{ url }} />,
      }
    },
    component: Preview,
  },
}

export default youTube

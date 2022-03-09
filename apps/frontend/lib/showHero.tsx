// import getYouTubeID from 'get-youtube-id'
import clsx from 'clsx'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../utils/sanity'
import { HeroData } from './types'

export const showHero = (heroData: HeroData, className?: string) => {
  switch (heroData.type) {
    case 'image':
      return (
        <SanityImg
          className={clsx(className ?? '', 'w-full h-full  object-cover')}
          builder={imageUrlBuilder}
          image={heroData.image}
          height={500}
          alt={heroData.image?.alt || 'image'}
        />
      )

    // case 'youtube':
    //   const yturl = heroData.youtube?.url
    //   if (yturl) {
    //     const url = `https://www.youtube.com/embed/${getYouTubeID(yturl)}`
    //     // https://css-tricks.com/fluid-width-video/
    //     return (
    //       <div className="pb-[56.25%] w-full relative">
    //         <iframe
    //           className="absolute h-full w-full"
    //           // width="700"
    //           // height="400"
    //           src={url}
    //           title="YouTube video player"
    //           frameBorder="0"
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         />
    //       </div>
    //     )
    //   }
    //   return <div />

    case 'video':
      return (
        <video controls className={clsx(className ?? '', 'h-full w-full')}>
          <source src={heroData.video?.asset.url} type={heroData.video?.asset.mimeType} />
        </video>
      )
  }
}

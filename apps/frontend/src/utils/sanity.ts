import { SanityClientType, setupNextSanity } from 'next-sanity-extra'
import type { PicoSanity } from 'picosanity'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
// Standard sanity config
// Don't forget:
// Setup SANITY_API_TOKEN (created from sanity admin)
/// Set SANITY_PREVIEW_TOKEN (generate this yourself)

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PROJECT_ID!")
}
if (!process.env.NEXT_PUBLIC_SANITY_PRODUCTION_DATASET) {
  throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PRODUCTION_DATASET")
}

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_PRODUCTION_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const nextSanity = setupNextSanity(config)
export const { PortableText, sanityStaticProps, useSanityQuery } = nextSanity

export const sanityClient: (type: SanityClientType) => PicoSanity = nextSanity.sanityClient
export const imageUrlBuilder: ImageUrlBuilder = nextSanity.imageUrlBuilder

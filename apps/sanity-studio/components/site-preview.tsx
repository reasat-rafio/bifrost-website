import * as React from 'react'

export const SitePreview: React.FC<{ options: { slug: string } }> = ({ options }) => {
  if (!process.env.SANITY_STUDIO_PREVIEW_URL) {
    console.warn(
      'SANITY_STUDIO_PREVIEW_URL should be set for preview to work! Falling back to localhost:3000',
    )
  }

  return (
    <iframe
      title="Site Preview"
      src={`${
        process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000'
      }/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_TOKEN}&slug=${options.slug}`}
      style={{ width: '100%', height: '100%', border: 0 }}
    />
  )
}

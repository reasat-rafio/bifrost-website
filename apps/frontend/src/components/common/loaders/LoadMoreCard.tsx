import React from 'react'
import ContentLoader from 'react-content-loader'

export const LoadMoreCard: React.FC<any> = (props) => {
  return (
    <ContentLoader
      speed={4}
      width={400}
      height={200}
      viewBox="0 0 360 150"
      backgroundColor="#06101B"
      foregroundColor="#29394A"
      className="w-full h-auto"
      {...props}
    >
      <rect x="200" y="30" rx="3" ry="3" width="140" height="8" />
      <rect x="200" y="62" rx="3" ry="3" width="200" height="6" />
      <rect x="200" y="89" rx="3" ry="3" width="40" height="10" />
      <rect x="0" y="0" rx="6" ry="6" width="170" height="120" />
    </ContentLoader>
  )
}

import React from 'react'
import { GlobalErrorHandler, type DefaultDocumentProps } from 'sanity'

const globalStyles = `
  html {
    background-color: #f1f3f6;
  }
  html,
  body,
  #sanity {
    height: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
`

interface FaviconProps {
  basePath: string
}

function Favicons({ basePath }: FaviconProps) {
  const base = `${basePath.replace(/\/+$/, '')}/static`
  return (
    <>
      <link rel="icon" href={`${base}/favicon.ico`} sizes="any" />
      <link rel="icon" href={`${base}/favicon.svg`} type="image/svg+xml" />
      <link rel="apple-touch-icon" href={`${base}/apple-touch-icon.png`} />
      <link rel="manifest" href={`${base}/manifest.webmanifest`} />
    </>
  )
}

const EMPTY_ARRAY: never[] = []
export default function DefaultDocument(props: DefaultDocumentProps): React.ReactElement {
  const { entryPath, css = EMPTY_ARRAY, basePath = '/' } = props
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="noindex" />
        <meta name="referrer" content="same-origin" />

        <link
          rel="modulepreload"
          href={
            'https://themer.sanity.build/api/hues?default=49469f;600&primary=2d3cb7;600&transparent=58568f;600&positive=43d675;300&caution=fbd024;200&lightest=fcfbfd&darkest=0d0d15'
          }
        />

        <Favicons basePath={basePath} />

        <title>Sanity Studio</title>

        <GlobalErrorHandler />

        {css.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <style>{globalStyles}</style>
      </head>
      <body>
        <div id="sanity" />
        <script type="module" src={entryPath} />
      </body>
    </html>
  )
}

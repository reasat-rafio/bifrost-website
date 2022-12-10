// @ts-ignore
import BlockContent from '@sanity/block-content-to-react'

export const typesSerializer = {
  block: (p: any) => {
    const { style = 'normal' } = p.node

    if (style === 'caption') {
      return (
        <div className="mt-6 flex text-left  xl:text-base text-sm font-light">{p.children}</div>
      )
    }
    return BlockContent.defaultSerializers.types.block(p)
  },
}

export const marksSerializer = {
  fontSize: ({ children, mark }: { children: any[]; mark: any }) => (
    <span style={{ fontSize: `${mark.size}px` }}>{children}</span>
  ),
}

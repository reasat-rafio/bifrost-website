import { SanityImage } from 'sanity-react-extra'

export interface Idataset {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: Date
  attributes: Attribute[]
  body: Body[]
  classes: Classes
  heading: string
  images: SanityImage[]
  license: string
  slug: Slug
  subHeading: string
}

export interface Attribute {
  _key: string
  _type: string
  icon: SanityImage
  name: string
  text: string
}

export interface Classes {
  rows: Row[]
}

export interface Row {
  _key: string
  _type: RowType
  cells: string[]
}

export enum RowType {
  TableRow = 'tableRow',
}

export interface Slug {
  _type: string
  current: string
}

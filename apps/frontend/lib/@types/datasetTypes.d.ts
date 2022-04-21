import { Categories } from './../../components/dataset-list/list/Categories'
import { Classes } from './datasetTypes.d'
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

export type BarStackHorizontalProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  events?: boolean
  data?: { key: string; value: string }[]
  valuesTotalScale: ScaleLinear<number, number, never>
  keyScale: ScaleBand<string>
  valuesTotal?: number[]
}

export type TooltipData = {
  bar: SeriesPoint<CityTemperature>
  key: CityName
  index: number
  height: number
  width: number
  x: number
  y: number
  color: string
}

export interface ICategory {
  name: string
  _createdAt?: string
  _id?: string
  _rev?: string
  _type?: string
  _updatedAt?: string
}

export interface IDatasetCard {
  _id: string
  heading: string
  slug: Slug
  subHeading: string
  taskTypes: ICategory[]
  image: SanityImage
  categories: ICategory[]
  tasks: ICategory[]
}

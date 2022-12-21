import { StructureBuilder } from 'sanity/desk'
import { MdContactPhone, MdOutlineWorkOutline } from 'react-icons/md'
import { FcAbout, FcViewDetails } from 'react-icons/fc'
import { GrActions, GrArticle, GrEdit, GrView, GrWorkshop } from 'react-icons/gr'
import { RiPagesLine } from 'react-icons/ri'
import { BsNewspaper } from 'react-icons/bs'
import { FaSitemap, FaHome } from 'react-icons/fa'
import { GiArchiveResearch } from 'react-icons/gi'
import { SitePreview } from './components/site-preview'
import { PageItemProps } from './types'

const singleItem = (S: StructureBuilder, { schemaType, id, title, icon }: PageItemProps) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType),
  )

const pageItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon = GrEdit, slug }: PageItemProps,
) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([
        S.view.form().icon(icon),
        S.view.component(SitePreview).icon(GrView).options({ slug }).title('Preview'),
      ]),
  )

export const AppStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .id('__root__')
    .items([
      S.listItem()
        .title('Site')
        .icon(FaSitemap)
        .child(
          S.list()
            .title('Site')
            .items([
              singleItem(S, {
                schemaType: 'site.logos',
                id: 'siteLogos',
                title: 'Logos',
              }),
              singleItem(S, {
                schemaType: 'site.nav',
                id: 'siteNav',
                title: 'Navigation',
              }),

              S.documentTypeListItem('site.redirects').title('Redirects'),
            ]),
        ),
      S.documentTypeListItem('social').title('Social'),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(RiPagesLine)
        .child(
          S.list()
            .title('Pages')
            .items([
              pageItem(S, {
                schemaType: 'landingPage',
                id: 'landingPage',
                title: 'Landing',
                icon: FaHome,
                slug: '',
              }),
              pageItem(S, {
                schemaType: 'contactUsPage',
                id: 'contactUsPage',
                title: 'Contact Us',
                icon: MdContactPhone,
                slug: 'contact-us',
              }),
              pageItem(S, {
                schemaType: 'aboutUsPage',
                id: 'aboutUsPage',
                title: 'About Us',
                icon: FcAbout,
                slug: 'about-us',
              }),
              pageItem(S, {
                schemaType: 'useCasePage',
                id: 'useCasePage',
                title: 'Use Case',
                icon: GrActions,
                slug: 'use-case',
              }),
              pageItem(S, {
                schemaType: 'whySyntheticDataPage',
                id: 'whySyntheticDataPage',
                title: 'Why Synthetic Data Page',
                icon: GrActions,
                slug: 'why-synthetic-data',
              }),
              pageItem(S, {
                schemaType: 'careerPage',
                id: 'careerPage',
                title: 'Career',
                icon: MdOutlineWorkOutline,
                slug: 'career',
              }),
              pageItem(S, {
                schemaType: 'ourProjectsPage',
                id: 'ourProjectsPage',
                title: 'Our Projects',
                icon: GrWorkshop,
                slug: 'our-project',
              }),
              pageItem(S, {
                schemaType: 'blogPage',
                id: 'blogPage',
                title: 'Blog List Page',
                icon: GrArticle,
                slug: 'blog',
              }),
              pageItem(S, {
                schemaType: 'blogDetailsPage',
                id: 'blogDetailsPage',
                title: 'Blog Details Page',
                icon: FcViewDetails,
                slug: '',
              }),
              pageItem(S, {
                schemaType: 'datasetListPage',
                id: 'datasetListPage',
                title: 'Dataset List Page',
                icon: GiArchiveResearch,
                slug: 'datasets',
              }),

              pageItem(S, {
                schemaType: 'datasetDetailsPage',
                id: 'datasetDetailsPage',
                title: 'Dataset Details Page',
                icon: GiArchiveResearch,
                slug: '',
              }),

              pageItem(S, {
                schemaType: 'financeServicePage',
                id: 'financeServicePage',
                title: 'Finance Service Page',
                icon: GiArchiveResearch,
                slug: '',
              }),
            ]),
        ),
      S.divider(),

      S.documentListItem()
        .schemaType('client')
        .id('client')
        .title('Client')
        .child(S.editor().schemaType('client').title('Client')),

      S.listItem()
        .title('Blogs')
        .icon(BsNewspaper)
        .child(
          S.list()
            .title('Blogs')
            .items([
              S.documentTypeListItem('blog').title('Blogs'),
              S.documentTypeListItem('tag').title('Tags'),
            ]),
        ),

      S.listItem()
        .title('Dataset')
        .icon(GiArchiveResearch)
        .child(
          S.list()
            .title('Dataset')
            .items([
              S.documentTypeListItem('dataset').title('Datasets'),
              S.documentTypeListItem('taskType').title('Task Types'),
              S.documentTypeListItem('tasks').title('Tasks'),
              S.documentTypeListItem('category').title('Category'),
              S.documentTypeListItem('labelFormat').title('Label Formats'),
            ]),
        ),
    ])

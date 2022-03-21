import S from '@sanity/desk-tool/structure-builder'
import {
  GrEdit,
  GrView,
  // GrCircleQuestion,
  // GrContactInfo,
  // GrContact,
  // GrGroup,
  // GrUserWorker,
} from 'react-icons/gr'
import { MdContactPhone } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { GrActions, GrArticle } from 'react-icons/gr'
// import { IoPeople } from "react-icons/io5";
import { RiPagesLine } from 'react-icons/ri'
// import * as React from "react";
import { FaSitemap, FaHome } from 'react-icons/fa'

function SitePreview() {
  if (!process.env.SANITY_STUDIO_PREVIEW_URL) {
    console.warn(
      'SANITY_STUDIO_PREVIEW_URL should be set for preview to work! Falling back to localhost:3000',
    )
  }
  return (
    <iframe
      src={`${
        process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000'
      }/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_TOKEN}&slug=${options.slug}`}
      style={{ width: '100%', height: '100%', border: 0 }}
    />
  )
}

const singleItem = ({ schemaType, id, title, icon }) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType),
  )

const pageItem = ({ schemaType, id, title, icon, slug }) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([
        S.view.form().icon(GrEdit),
        S.view.component(SitePreview).icon(GrView).options({ slug }).title('Preview'),
      ]),
  )

export default () =>
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
              singleItem({
                schemaType: 'site.logos',
                id: 'siteLogos',
                title: 'Logos',
              }),
              singleItem({
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
              pageItem({
                schemaType: 'landingPage',
                id: 'landingPage',
                title: 'Landing',
                icon: FaHome,
                slug: '',
              }),
              pageItem({
                schemaType: 'contactUsPage',
                id: 'contactUsPage',
                title: 'Contact Us',
                icon: MdContactPhone,
                slug: '/contact-us',
              }),
              pageItem({
                schemaType: 'aboutUsPage',
                id: 'aboutUsPage',
                title: 'About Us',
                icon: FcAbout,
                slug: '/about-us',
              }),
              pageItem({
                schemaType: 'useCasePage',
                id: 'useCasePage',
                title: 'Use Case',
                icon: GrActions,
                slug: '/use-case',
              }),
              pageItem({
                schemaType: 'blogPage',
                id: 'blogPage',
                title: 'Blog Page',
                icon: GrArticle,
                slug: '/blog',
              }),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('blog').title('Blogs'),
    ])

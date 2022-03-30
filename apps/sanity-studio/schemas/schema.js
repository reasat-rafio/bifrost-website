import logos from './site/logos'
import nav from './site/nav'
import siteRedirects from './site/redirects'
import contactSection from './site/contact'
import dataSection from './site/data'

import ctaButton from './ctaButton'
import menuItem from './menuItem'
import footer from './footer'
import social from './social'
import seo from './seo'
import hero from './hero'
import initial from './initial'
import quote from './quote'
import tag from './tag.js'

import landing from './pages/landing'
import landingHomeSection from './pages/landing/home'
import landingProductsSection from './pages/landing/products'
import landingDemoSection from './pages/landing/demo'
import landingServicesSection from './pages/landing/services'
import landingProjectsSection from './pages/landing/projects'
import landingReviewsSection from './pages/landing/reviews'

import contactUs from './pages/contact-us'
import contactUsHomeSection from './pages/contact/home'

import aboutUs from './pages/about-us'
import aboutUsHomeSection from './pages/about/home'
import aboutUsclientsSection from './pages/about/clients'
import aboutUsAboutSection from './pages/about/about'
import aboutUsReasonSection from './pages/about/reason'
import aboutUsTeamSection from './pages/about/team'

import useCase from './pages/use-case'
import useCaseHome from './pages/useCase/home'
import useCaseAssurance from './pages/useCase/assurance'
import useCaseEnterprise from './pages/useCase/enterprise'
import useCaseExample from './pages/useCase/example'
import useCaseFeature from './pages/useCase/feature'

import blog from './pages/blog'

import blogPage from './pages/blog-page'
import blogHome from './pages/blog/home'
import blogArticles from './pages/blog/articles'

import dataset from './pages/dataset'
import attribute from './pages/dataset/attribute'
import ctaList from './pages/dataset/ctaList'

// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    logos,
    nav,
    siteRedirects,
    contactSection,
    dataSection,

    hero,
    seo,
    social,
    ctaButton,
    footer,
    menuItem,
    initial,
    quote,
    tag,

    contactUs,
    contactUsHomeSection,

    landing,
    landingHomeSection,
    landingProductsSection,
    landingDemoSection,
    landingServicesSection,
    landingProjectsSection,
    landingReviewsSection,

    aboutUs,
    aboutUsHomeSection,
    aboutUsclientsSection,
    aboutUsAboutSection,
    aboutUsReasonSection,
    aboutUsTeamSection,

    useCase,
    useCaseHome,
    useCaseAssurance,
    useCaseEnterprise,
    useCaseExample,
    useCaseFeature,

    blog,

    blogPage,
    blogHome,
    blogArticles,

    dataset,
    attribute,
    ctaList,
  ]),
})

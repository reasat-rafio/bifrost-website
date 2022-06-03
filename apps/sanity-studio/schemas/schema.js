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
import tag from './tag'

import landing from './pages/landing'
import landingHomeSection from './pages/landing/home'
import landingProductsSection from './pages/landing/products'
import landingDemoSection from './pages/landing/demo'
import landingServicesSection from './pages/landing/services'
import landingProjectsSection from './pages/landing/projects'
import landingReviewsSection from './pages/landing/reviews'

import contactUs from './pages/contact-us'
import contactUsHomeSection from './pages/contact-us/home'

import aboutUs from './pages/about-us'
import aboutUsHomeSection from './pages/about-us/home'
import aboutUsclientsSection from './pages/about-us/clients'
import aboutUsAboutSection from './pages/about-us/about'
import aboutUsReasonSection from './pages/about-us/reason'
import aboutUsTeamSection from './pages/about-us/team'

import useCase from './pages/use-case'
import useCaseHome from './pages/use-case/home'
import useCaseAssurance from './pages/use-case/assurance'
import useCaseEnterprise from './pages/use-case/enterprise'
import useCaseExample from './pages/use-case/example'
import useCaseFeature from './pages/use-case/feature'

import blog from './documents/blog'

import blogListPage from './pages/blog-list'
import blogListHome from './pages/blog-list/home'

import blogDetails from './pages/blog-details'

import dataset from './documents/dataset'
import attribute from './pages/dataset/attribute'
import ctaList from './pages/dataset/ctaList'
import taskType from './pages/dataset/document/task-type'
import labelFormat from './pages/dataset/document/label-format'
import tasks from './pages/dataset/document/tasks'
import category from './pages/dataset/document/category'

import datasetListPage from './pages/dataset-list'
import datasetNotFound from './dataset-not-found'

import datasetDetails from './pages/dataset-details'

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

    blogListPage,
    blogListHome,

    blogDetails,

    dataset,
    attribute,
    ctaList,
    taskType,
    labelFormat,
    tasks,
    category,

    datasetListPage,
    datasetNotFound,

    datasetDetails,
  ]),
})

import logos from './site/logos'
import nav from './site/nav'
import siteRedirects from './site/redirects'

import ctaButton from './ctaButton'
import menuItem from './menuItem'
import footer from './footer'
import social from './social'
import seo from './seo'
import hero from './hero'

import landing from './pages/landing'
import homeSection from './pages/landing/home'
import productsSection from './pages/landing/products'
import demoSection from './pages/landing/demo'

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

    hero,
    seo,
    social,
    ctaButton,
    footer,
    menuItem,

    landing,
    homeSection,
    productsSection,
    demoSection,
  ]),
})

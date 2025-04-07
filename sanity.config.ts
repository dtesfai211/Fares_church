'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  name: 'fares-church',
  title: 'Fares Church Website',

  projectId,
  dataset,
  apiVersion,

  plugins: [
    deskTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

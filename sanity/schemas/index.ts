import { SchemaTypeDefinition } from 'sanity'

import { authorSchema } from '../schemaTypes/authorSchema'
import { postSchema } from '../schemaTypes/postSchema'
import { sermonSchema } from '../schemaTypes/sermonSchema'
import { eventSchema } from '../schemaTypes/eventSchema'
import { ministrySchema } from '../schemaTypes/ministrySchema'
import { gallerySchema } from '../schemaTypes/gallerySchema'
import { blockContentType } from '../schemaTypes/blockContentType'

export const schemaTypes = [
  sermonSchema,
  postSchema,
  authorSchema,
  eventSchema,
  ministrySchema,
  gallerySchema,
  blockContentType,
]
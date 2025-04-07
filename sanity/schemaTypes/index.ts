import { type SchemaTypeDefinition } from 'sanity'

import { sermonSchema } from './sermonSchema'
import { postSchema } from './postSchema'
import { authorSchema } from './authorSchema'
import { eventSchema } from './eventSchema'
import { ministrySchema } from './ministrySchema'
import { gallerySchema } from './gallerySchema'

export const schema = {
  types: [
    sermonSchema,
    postSchema,
    authorSchema,
    eventSchema,
    ministrySchema,
    gallerySchema,
  ],
}

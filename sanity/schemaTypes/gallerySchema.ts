import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.custom(value => {
        if (!value || value.length === 0) {
          return 'At least one image is required';
        }
        return true;
      }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Worship Services', value: 'worship' },
          { title: 'Special Events', value: 'events' },
          { title: 'Youth Activities', value: 'youth' },
          { title: 'Community Service', value: 'community' },
          { title: 'Church Facilities', value: 'facilities' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Date of the event these photos were taken',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      date: 'date',
    },
    prepare({ title, media, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: dateStr ? `Date: ${dateStr}` : undefined,
        media,
      };
    },
  },
})
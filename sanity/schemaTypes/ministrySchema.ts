import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const ministrySchema = defineType({
  name: 'ministry',
  title: 'Ministries',
  type: 'document',
  icon: UsersIcon,
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
      name: 'leader',
      title: 'Ministry Leader',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'meeting_times',
      title: 'Meeting Times',
      type: 'string',
    }),
    defineField({
      name: 'meeting_location',
      title: 'Meeting Location',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      leader: 'leader',
      media: 'image',
    },
    prepare({ title, leader, media }) {
      return {
        title,
        subtitle: leader ? `Led by: ${leader}` : undefined,
        media,
      };
    },
  },
})
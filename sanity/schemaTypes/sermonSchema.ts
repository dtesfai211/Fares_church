import { defineField, defineType } from 'sanity'
import { MicrophoneIcon } from '@sanity/icons'

export const sermonSchema = defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  icon: MicrophoneIcon,
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
      name: 'preacher',
      title: 'Preacher',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sermon_date',
      title: 'Sermon Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture Reference',
      type: 'string',
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      preacher: 'preacher',
      media: 'image',
      date: 'sermon_date',
    },
    prepare({ title, preacher, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${formattedDate} | ${preacher || 'Unknown preacher'}`,
        media,
      };
    },
  },
})
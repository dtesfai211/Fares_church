import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eventSchema = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: CalendarIcon,
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
        slugify: (input) => 
          input.toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')
              .slice(0, 96)
      },
      validation: (Rule) => 
        Rule.required()
          .custom((slug) => {
            if (!slug || !slug.current) {
              return 'Slug is required';
            }
            if (slug.current === 'saturdat-event') {
              return 'Did you mean "saturday-event"?';
            }
            if (slug.current.indexOf('  ') !== -1) {
              return 'Slug should not contain consecutive spaces';
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
              return 'Slug should only contain lowercase letters, numbers, and hyphens';
            }
            return true;
          })
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'datetime',
      description: 'Only needed for multi-day events',
    }),
    defineField({
      name: 'time',
      title: 'Event Time',
      type: 'string',
      description: 'e.g., "10:00 AM" or "10:00 AM - 12:00 PM"',
    }),
    defineField({
      name: 'is_recurring',
      title: 'Is Recurring Event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'recurrence_info',
      title: 'Recurrence Information',
      type: 'string',
      description: 'e.g., "Every Sunday" or "First Monday of the month"',
      hidden: ({ parent }) => !parent?.is_recurring,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'image',
    },
    prepare({ title, date, location, media }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${dateStr} | ${location || ''}`,
        media,
      };
    },
  },
})
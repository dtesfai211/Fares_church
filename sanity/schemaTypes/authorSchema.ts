import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const authorSchema = defineType({
  name: 'author',
  title: 'Authors & Leadership Team',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Leadership role or position within the church',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Brief biography for leadership team display',
    }),
    defineField({
      name: 'bioContent',
      title: 'Extended Bio',
      type: 'array',
      description: 'Full biography content for detailed view',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'isLeadershipTeam',
      title: 'Leadership Team Member',
      type: 'boolean',
      description: 'Show this person on the leadership team section',
      initialValue: false,
    }),
    defineField({
      name: 'leadershipOrder',
      title: 'Leadership Team Display Order',
      type: 'number',
      description: 'Order in which to display on leadership team section (lower numbers first)',
      hidden: ({ document }) => !document?.isLeadershipTeam,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
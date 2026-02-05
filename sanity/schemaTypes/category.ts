import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categoryId',
      title: 'Category ID (Order)',
      description: 'Use numbers 1-10 to order these on the homepage.',
      type: 'number',
    }),
    defineField({
      name: 'isMain',
      title: 'Show on Homepage Slider?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
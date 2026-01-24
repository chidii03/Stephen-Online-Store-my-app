import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string', // e.g., "Office Supplies"
      validation: Rule => Rule.required(),
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
    // HIERARCHY STARTS HERE
    defineField({
      name: 'subcategories',
      title: 'Sub Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'subcategory',
          title: 'Sub Category',
          fields: [
            defineField({
              name: 'name',
              title: 'Sub Category Name',
              type: 'string', // e.g., "Office Desk Accessories"
            }),
            defineField({
              name: 'items',
              title: 'Specific Items',
              type: 'array',
              of: [{ type: 'string' }], // e.g., ["Staplers", "Punchers", "Scissors"]
              options: {
                layout: 'tags' // This lets you hit "Enter" to add them quickly
              }
            })
          ]
        }
      ]
    })
  ],
});
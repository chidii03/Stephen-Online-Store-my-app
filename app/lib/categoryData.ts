// src/lib/categoryData.ts
export interface CategoryItem {
  title: string;
  slug: string;
  img: string;   
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    title: 'Office Supplies',
    slug: 'office-supplies',
    img: '/category-office.jpg',   
  },
  {
    title: 'School Supplies',
    slug: 'school-supplies',
    img: '/category-school.jpg',
  },
  {
    title: 'Ink & Toner',
    slug: 'ink-toner',
    img: '/category-ink.jpg',
  },
  {
    title: 'Paper',
    slug: 'paper',
    img: '/category-paper.jpg',
  },
  {
    title: 'Furniture',
    slug: 'furniture',
    img: '/category-furniture.jpg',  
  },
  {
    title: 'Computer & Accessories',
    slug: 'computer-accessories',
    img: '/category-computer.jpg',
  },
  {
    title: 'Printers & Machines',
    slug: 'printers-machines',
    img: '/category-printers.jpg',
  },
];
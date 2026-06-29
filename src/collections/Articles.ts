import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Статья",
    plural: "Статьи",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "readTime"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL (slug)",
      admin: {
        description: "Латиница и дефисы, например: rabota-voditelem-bez-opyta",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Заголовок",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Краткое описание",
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Дата публикации",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "readTime",
      type: "text",
      required: true,
      label: "Время чтения",
      defaultValue: "5 мин",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      label: "Текст статьи",
    },
  ],
};

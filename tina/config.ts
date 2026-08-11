import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

 media: {
  tina: {
    publicFolder: "public",
    mediaRoot: "images",
  },
},

  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",

        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },

          {
            type: "string",
            name: "intro",
            label: "Introduction",
          },

          {
            type: "string",
            name: "paragraph1",
            label: "Paragraph 1",
            ui: {
              component: "textarea",
            },
          },

          {
            type: "string",
            name: "paragraph2",
            label: "Paragraph 2",
            ui: {
              component: "textarea",
            },
          },

          {
            type: "string",
            name: "paragraph3",
            label: "Paragraph 3",
            ui: {
              component: "textarea",
            },
          },

          {
            type: "string",
            name: "quote",
            label: "Quote",
            ui: {
              component: "textarea",
            },
          },

          {
            type: "string",
            name: "beliefs",
            label: "Beliefs",
            list: true,
          },

          {
            type: "image",
            name: "image",
            label: "Photo",
          },

          {
            type: "string",
            name: "buttonText",
            label: "Button Text",
          },

          {
            type: "string",
            name: "buttonLink",
            label: "Button Link",
          },

          // -------- Home --------

          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title",
          },

          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
          },

          {
            type: "string",
            name: "heroButtonText",
            label: "Hero Button Text",
          },

          {
            type: "string",
            name: "heroButtonLink",
            label: "Hero Button Link",
          },
          {
  type: "string",
  name: "introTitle",
  label: "Intro Title",
},

{
  type: "string",
  name: "introText",
  label: "Intro Text",
  ui: {
    component: "textarea",
  },
},
        ],
      },

      {
        name: "site",
        label: "Site Settings",
        path: "content/settings",
        format: "md",

        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
          },

          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            ui: {
              component: "textarea",
            },
          },

          {
            type: "image",
            name: "logo",
            label: "Logo",
          },

          {
            type: "string",
            name: "footer",
            label: "Footer",
          },

          {
            type: "string",
            name: "email",
            label: "Email",
          },

          {
            type: "string",
            name: "telegram",
            label: "Telegram",
          },

          {
            type: "string",
            name: "twitter",
            label: "Twitter / X",
          },

          {
            type: "string",
            name: "youtube",
            label: "YouTube",
          },
        ],
      },

      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        format: "md",

        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
{
  type: "string",
  name: "subtitle",
  label: "Subtitle",
},
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
          },

          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "سکولاریسم",
              "اسلامگرایی",
              "حجاب",
              "حقوق بشر",
              "دموکراسی",
              "مهاجرت",
              "جامعه",
              "اندیشه",
              "تاریخ",
              "فلسفه",
              "زنان",
            ],
          },

          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },

          {
            type: "datetime",
            name: "publishedAt",
            label: "Published Date",
          },

          {
            type: "datetime",
            name: "updatedAt",
            label: "Updated Date",
          },

          {
            type: "string",
            name: "readTime",
            label: "Read Time",
          },

{
  type: "object",
  name: "media",
  label: "Media",
  fields: [
    {
      type: "image",
      name: "gallery",
      label: "Gallery Images",
      list: true,
    },

    {
      type: "string",
      name: "youtube",
      label: "YouTube Embed URL",
    },

    {
      type: "string",
      name: "video",
      label: "MP4 Video Path",
    },

    {
      type: "string",
      name: "audio",
      label: "Audio File Path",
    },

    {
      type: "string",
      name: "pdf",
      label: "PDF File Path",
    },
  ],
},
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});



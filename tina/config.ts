import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
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
]
  
},
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
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
    list: true,
    name: "tags",
    label: "Tags",
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
    type: "image",
    name: "image",
    label: "Hero Image",
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
  
]    
        
      },
    ],
  },
});

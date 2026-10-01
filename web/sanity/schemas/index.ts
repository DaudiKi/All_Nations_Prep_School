/**
 * Sanity schemas. These mirror `content/types.ts`.
 *
 * Written as plain objects so this file does not require `sanity` to be
 * installed in the web app before the studio exists.
 */

/** The slice of Sanity's validation Rule these schemas use. */
type Rule = { required: () => unknown };

const requiredAlt = {
  name: "alt",
  title: "Alt text",
  type: "string",
  description:
    "Describe the picture for someone who cannot see it. Required — the site will not publish an image without it.",
  validation: (R: Rule) => R.required(),
};

export const section = {
  name: "section",
  title: "Section",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R: Rule) => R.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (R: Rule) => R.required() },
    { name: "order", type: "number" },
    { name: "summary", type: "text", rows: 2, validation: (R: Rule) => R.required() },
    { name: "intro", type: "array", of: [{ type: "text" }] },
    { name: "ageRange", type: "string" },
    { name: "dailyHours", type: "string" },
    { name: "fees", type: "string" },
    {
      name: "learningAreas",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", type: "string" },
          { name: "items", type: "array", of: [{ type: "string" }] },
        ],
      }],
    },
    { name: "yearGroups", type: "array", of: [{ type: "string" }] },
    { name: "icon", type: "string", description: "A brand icon name, e.g. primary/badge" },
    { name: "pattern", type: "string", options: { list: ["official", "innovation", "diversity"] } },
    { name: "tint", type: "string", options: { list: ["gold", "sky", "green"] } },
    { name: "heroImage", type: "image", fields: [requiredAlt] },
  ],
};

export const person = {
  name: "person",
  title: "Staff member",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (R: Rule) => R.required() },
    { name: "role", type: "string", validation: (R: Rule) => R.required() },
    { name: "section", type: "reference", to: [{ type: "section" }] },
    { name: "photo", type: "image", fields: [requiredAlt] },
    { name: "bio", type: "text" },
    { name: "qualifications", type: "array", of: [{ type: "string" }] },
    { name: "order", type: "number" },
    { name: "showOnHome", type: "boolean", initialValue: false },
  ],
};

export const post = {
  name: "post",
  title: "News post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R: Rule) => R.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (R: Rule) => R.required() },
    { name: "excerpt", type: "text", rows: 2, validation: (R: Rule) => R.required() },
    { name: "coverImage", type: "image", fields: [requiredAlt] },
    { name: "body", type: "array", of: [{ type: "block" }] },
    { name: "author", type: "reference", to: [{ type: "person" }] },
    { name: "publishedAt", type: "datetime", validation: (R: Rule) => R.required() },
    { name: "readingMinutes", type: "number" },
    { name: "tags", type: "array", of: [{ type: "string" }] },
  ],
};

export const testimonial = {
  name: "testimonial",
  title: "Parent testimonial",
  type: "document",
  fields: [
    { name: "quote", type: "text", validation: (R: Rule) => R.required() },
    { name: "parentName", type: "string", validation: (R: Rule) => R.required() },
    { name: "section", type: "reference", to: [{ type: "section" }] },
    {
      name: "consentOnFile",
      type: "boolean",
      title: "Written permission on file",
      description:
        "Tick only when the parent has given written permission to publish this. The site will not show it otherwise.",
      initialValue: false,
      validation: (R: Rule) => R.required(),
    },
  ],
};

export const galleryItem = {
  name: "galleryItem",
  title: "Gallery photograph",
  type: "document",
  fields: [
    { name: "image", type: "image", fields: [requiredAlt], validation: (R: Rule) => R.required() },
    { name: "caption", type: "string" },
    { name: "album", type: "string" },
    { name: "takenAt", type: "date" },
    { name: "order", type: "number" },
    {
      name: "consentOnFile",
      type: "boolean",
      title: "Parental photo consent on file",
      description:
        "Tick only when you hold written parental consent for every identifiable child in this photograph. The site will not publish it otherwise.",
      initialValue: false,
      validation: (R: Rule) => R.required(),
    },
  ],
};

export const siteSettings = {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  __experimental_singleton: true,
  fields: [
    { name: "schoolName", type: "string" },
    { name: "motto", type: "string" },
    { name: "vision", type: "text" },
    { name: "mission", type: "text" },
    { name: "phones", type: "array", of: [{ type: "string" }] },
    { name: "whatsapp", type: "string" },
    { name: "email", type: "string" },
    { name: "address", type: "text" },
    { name: "mapQuery", type: "string" },
    {
      name: "announcement",
      type: "object",
      fields: [
        { name: "enabled", type: "boolean" },
        { name: "text", type: "string" },
        { name: "href", type: "string" },
      ],
    },
    {
      name: "termDates",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string" },
          { name: "starts", type: "date" },
          { name: "ends", type: "date" },
        ],
      }],
    },
    { name: "ogImage", type: "image", fields: [requiredAlt] },
  ],
};

export const schemaTypes = [section, person, post, testimonial, galleryItem, siteSettings];

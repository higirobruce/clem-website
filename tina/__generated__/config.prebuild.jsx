// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // From your Tina Cloud project → Overview / Tokens:
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  // Output the admin SPA to ./admin so it is served at /admin
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  // Image uploads land in assets/images, matching the site's paths
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      {
        name: "content",
        label: "Website content",
        path: "content",
        format: "json",
        // Single config-style document — no creating/deleting extra files
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "site",
            label: "SEO / page title",
            fields: [
              { type: "string", name: "metaTitle", label: "Browser title" },
              { type: "string", name: "metaDescription", label: "Search description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero (top banner)",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label above heading" },
              { type: "string", name: "headingLead", label: "Heading \u2014 part 1" },
              { type: "string", name: "headingHighlight", label: "Heading \u2014 highlighted part (amber)" },
              { type: "string", name: "headingTail", label: "Heading \u2014 part 3" },
              { type: "string", name: "subtext", label: "Sub-text", ui: { component: "textarea" } },
              { type: "string", name: "primaryCta", label: "Main button text" },
              { type: "string", name: "secondaryCta", label: "Secondary button text" },
              {
                type: "object",
                name: "badges",
                label: "Key numbers",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.number ? i.number + " \u2014 " + (i.label || "") : "Badge" }) },
                fields: [
                  { type: "string", name: "number", label: "Number" },
                  { type: "string", name: "label", label: "Label" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "trust",
            label: "Trust strip (dark bar)",
            fields: [
              { type: "string", name: "item1", label: "Item 1 text" },
              { type: "string", name: "item1strong", label: "Item 1 bold" },
              { type: "string", name: "item2", label: "Item 2 text" },
              { type: "string", name: "item2strong", label: "Item 2 bold" },
              { type: "string", name: "item3", label: "Item 3 text" },
              { type: "string", name: "item3strong", label: "Item 3 bold" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraphs", label: "Paragraphs (you may use <strong> for bold)", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "stats",
                label: "Stat cards",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.number ? i.number + " \u2014 " + (i.label || "") : "Stat" }) },
                fields: [
                  { type: "string", name: "number", label: "Number" },
                  { type: "string", name: "label", label: "Label" },
                  { type: "boolean", name: "accent", label: "Highlight (blue card)?" }
                ]
              },
              { type: "string", name: "partnerTitle", label: "Partner box title" },
              { type: "string", name: "partnerText", label: "Partner box text (may use <strong>)", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "products",
            label: "Products",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "intro", label: "Intro text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Product list",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.name || "Product" }) },
                fields: [
                  { type: "string", name: "name", label: "Product name" },
                  { type: "string", name: "tag", label: "Short tag (corner label and chip)" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Photo" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "sourcing",
            label: "Sourcing section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "intro", label: "Intro text", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Source countries",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.name || "Country" }) },
                fields: [
                  { type: "string", name: "flag", label: "Flag emoji" },
                  { type: "string", name: "name", label: "Country" },
                  { type: "string", name: "note", label: "Note" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "proforma",
            label: "Request-proforma section",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "subtext", label: "Sub-text", ui: { component: "textarea" } },
              { type: "string", name: "assurance1", label: "Assurance line 1" },
              { type: "string", name: "assurance3", label: "Assurance line 3" }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact details",
            fields: [
              { type: "string", name: "eyebrow", label: "Small label" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "intro", label: "Intro text", ui: { component: "textarea" } },
              { type: "string", name: "address", label: "Address" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phoneDisplay", label: "Phone (as shown)" },
              { type: "string", name: "phoneTel", label: "Phone (dial format, e.g. +250782028888)" },
              { type: "string", name: "whatsapp", label: "WhatsApp number (digits only, e.g. 250782028888)" },
              { type: "string", name: "hours", label: "Working hours" },
              { type: "string", name: "mapQuery", label: "Map search (e.g. Kigali,Rwanda or a pin)" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "tagline", label: "Footer tagline", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

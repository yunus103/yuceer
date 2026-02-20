import { type SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { technicalSpecs } from "./objects/technicalSpecs";
import { settings } from "./documents/settings";

import { product } from "./documents/product";

import { post } from "./documents/post";

import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { certificatesPage } from "./documents/certificatesPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    technicalSpecs,
    settings,
    product,
    post,
    homePage,
    aboutPage,
    certificatesPage,
  ],
};

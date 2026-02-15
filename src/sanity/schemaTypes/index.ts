import { type SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { technicalSpecs } from "./objects/technicalSpecs";
import { settings } from "./documents/settings";
import { category } from "./documents/category";
import { woodType } from "./documents/woodType";
import { product } from "./documents/product";
import { service } from "./documents/service";
import { post } from "./documents/post";
import { companyReference } from "./documents/companyReference";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    technicalSpecs,
    settings,
    category,
    woodType,
    product,
    service,
    post,
    companyReference,
    homePage,
    aboutPage,
  ],
};

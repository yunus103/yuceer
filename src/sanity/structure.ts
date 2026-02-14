import type {StructureBuilder} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Yüceer Content')
    .items([
      S.listItem()
        .title('Anasayfa İçeriği')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .title('Site Ayarları')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'settings' && item.getId() !== 'homePage'
      ),
    ])


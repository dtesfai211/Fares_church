import { StructureBuilder } from 'sanity/desk'
import {
  CalendarIcon,
  DocumentTextIcon,
  ImagesIcon,
  MicrophoneIcon,
  UserIcon,
  UsersIcon,
} from '@sanity/icons'

// The structure defines how documents are listed in the Studio
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Sermons')
        .icon(MicrophoneIcon)
        .child(
          S.documentTypeList('sermon')
            .title('Sermons')
            .filter('_type == "sermon"')
        ),
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .filter('_type == "post"')
        ),
      S.listItem()
        .title('Events')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('event')
            .title('Events')
            .filter('_type == "event"')
        ),
      S.listItem()
        .title('Ministries')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('ministry')
            .title('Ministries')
            .filter('_type == "ministry"')
        ),
      S.listItem()
        .title('Gallery')
        .icon(ImagesIcon)
        .child(
          S.documentTypeList('gallery')
            .title('Photo Galleries')
            .filter('_type == "gallery"')
        ),
      S.divider(),
      S.listItem()
        .title('Authors')
        .icon(UserIcon)
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .filter('_type == "author"')
        ),
    ])

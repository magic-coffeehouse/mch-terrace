import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"


const tagsToRemove = ["graph-exclude", "admin/explore-exclude", "backlinks-exclude", "recents-exclude", "search-exclude"]

const tagListConfig = {
  excludeTags: tagsToRemove
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      House: "https://magiccoffee.house",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(tagListConfig),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
  filterFn: (node) => {
    // exclude files with the tag "explorerexclude"
    return node.data?.tags?.includes("admin/explore-exclude") !== true
  },
}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
  filterFn: (node) => {
    // exclude files with the tag "explorerexclude"
    return node.data?.tags?.includes("admin/explore-exclude") !== true
  },
})
  ],
  right: [],
}

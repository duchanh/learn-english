declare module 'Models' {

  export interface CategoryCss {
    backgroundColor: string
    borderColor: string
  }
  export interface Category extends BaseItem {
    slug?: string
    isActive?: boolean
    css: CategoryCss
  }
}
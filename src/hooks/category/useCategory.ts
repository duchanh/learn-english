
import { CategoryContext } from "@/context/categories.context"
import { useContext } from "react"

export const useCategoryBySlug = (slug: any) => {
  const categories = useCategoryContext()
  const category = categories?.find(item => item.slug === slug)
  return category
}

export const useCategoryContext = () => {
  const {categories} = useContext(CategoryContext)
  return categories
}
interface CategoryBoxProps {
  categoryStyle: any
  width?: number
  height?: number
}
const CategoryBox = (props: CategoryBoxProps) => {
  const { categoryStyle, width = 12, height = 12 } = props
  const styles = {
    backgroundColor: categoryStyle?.backgroundColor,
    border: `1px solid ${categoryStyle?.borderColor}`,
    width: width,
    height: height
  }
  return <div style={styles} className='rounded-[2px]'></div>
}

export default CategoryBox

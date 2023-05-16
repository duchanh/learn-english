export const deepClone = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return {}
  }
}

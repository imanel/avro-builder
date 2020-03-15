export const getFields = (store, parentId = null) => {
  return Object.values(store).filter(field => field.parentId === parentId)
}

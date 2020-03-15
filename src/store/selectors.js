export const getFields = (store, parentId = null) => {
  return store.filter(field => field.parentId === parentId)
}

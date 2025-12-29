export const normalizePermissions = (permissions = []) => {
  return permissions.reduce((acc, perm) => {
    if (!perm.includes("_")) return acc

    const [action, entity] = perm.split("_")

    if (!acc[entity]) {
      acc[entity] = []
    }

    acc[entity].push(action)
    return acc
  }, {})
}

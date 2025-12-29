export const hasPermission = (user, permission) => {
  if (!user) return false

  // 🔥 Super admin sees everything
  if (user.is_super_admin) return true

  return user.permissions?.includes(permission)
}

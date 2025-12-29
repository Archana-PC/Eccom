import { useSelector } from "react-redux"

const Permission = ({ allow, children }) => {
  const { permissions = [], isSuperAdmin } = useSelector((s) => s.auth)

  if (isSuperAdmin) return children
  if (!permissions.includes(allow)) return null

  return children
}

export default Permission

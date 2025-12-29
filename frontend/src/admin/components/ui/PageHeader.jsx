const PageHeader = ({ title, actions }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex gap-2">{actions}</div>
    </div>
  )
}

export default PageHeader

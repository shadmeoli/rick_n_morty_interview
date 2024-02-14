export function SkeletonLocation() {
  return (
    <div className="h-40 w-60 rounded-md bg-gray-100 p-4 hover:shadow-lg">
      <div className="flex h-full animate-pulse flex-col justify-between">
        <div>
          <div className="mb-2 h-6 w-24 rounded-full bg-blue-200"></div>
          <div className="mb-2 h-4 w-32 rounded-full bg-blue-200"></div>
          <div className="mb-2 h-4 w-20 rounded-full bg-blue-200"></div>
          <div className="mb-2 h-4 w-40 rounded-full bg-blue-200"></div>
        </div>
        <div>
          <div className="h-4 w-20 rounded-full bg-blue-200"></div>
        </div>
      </div>
    </div>
  )
}

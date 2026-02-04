export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-500 text-sm font-medium">Loading...</p>
    </div>
  );
}

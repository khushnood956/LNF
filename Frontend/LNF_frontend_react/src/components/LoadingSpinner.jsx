export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative w-20 h-20 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full animate-spin"></div>
        {/* Inner glow */}
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur"></div>
      </div>
      <p className="text-zinc-400 text-sm font-medium tracking-wider animate-pulse">LOADING...</p>
    </div>
  );
}

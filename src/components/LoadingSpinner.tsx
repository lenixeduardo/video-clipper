export default function LoadingSpinner({ size = 56 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ring */}
      <svg
        className="absolute inset-0 animate-spin-slow"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="28"
          cy="28"
          r="25"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="40 120"
          className="animate-pulse-ring"
        />
      </svg>
      {/* Inner glyph */}
      <div className="w-8 h-8 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6L8 2Z"
            fill="#22d3ee"
            fillOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}

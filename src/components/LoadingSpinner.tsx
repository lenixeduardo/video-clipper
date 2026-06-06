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
          stroke="#5a8a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="40 120"
          className="animate-pulse-ring"
        />
      </svg>
      {/* Inner glyph — sun with rays */}
      <div className="w-8 h-8 rounded-lg bg-sun/20 border border-sun/40 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="2.5" fill="#c9862a" fillOpacity="0.9" />
          <path
            d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.4 4.4M11.6 11.6L12.6 12.6M12.6 3.4L11.6 4.4M4.4 11.6L3.4 12.6"
            stroke="#c9862a"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
        </svg>
      </div>
    </div>
  )
}

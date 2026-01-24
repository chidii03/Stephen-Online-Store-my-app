"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-50">
      <div className="relative">
        {/* Outer ring */}
        <div
          className="w-15 h-15 rounded-full border-4
          border-[rgba(75,112,245,0.2)]
          animate-spin"
        />

        {/* Inner active spinner */}
        <div
          className="absolute top-0 left-0 w-15 h-15 rounded-full
          border-4 border-transparent
          border-t-(--prim-color)
          border-r-(--prim-color)
          animate-spin"
          style={{ animationDuration: "0.8s" }}
        />
      </div>
    </div>
  );
}

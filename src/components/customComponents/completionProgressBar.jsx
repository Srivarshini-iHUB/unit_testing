import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CompletionProgressBar = ({
  completionPercentage = 67,
  role = "coordinator",
  isVisible = true,
  onAnimationComplete,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const prevPercentageRef = useRef(0); // holds previous value across renders


  const radius = 80;
  const circumference = Math.PI * radius;
  const cappedForStroke = Math.min(animatedPercentage, 100);
  const strokeDashoffset = circumference - (cappedForStroke / 100) * circumference;

  const headerText = role === "contributor" ? "Completion" : "Overall Report Readiness";
  const descriptionText = role === "coordinator" ? "Report completion" : "Task completion";

  // Animation for percentage counter
useEffect(() => {
  if (isVisible) {
    setIsComponentVisible(true);

    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const start = prevPercentageRef.current;
      const end = completionPercentage;
      const diff = end - start;
      const increment = diff / steps;
      let current = start;

      const counter = setInterval(() => {
        current += increment;

        const done = (increment >= 0 && current >= end) || (increment < 0 && current <= end);

        if (done) {
          setAnimatedPercentage(end);
          clearInterval(counter);
          prevPercentageRef.current = end; // update the ref to latest
          onAnimationComplete?.();
        } else {
          setAnimatedPercentage(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, 300); // allow fade-in animation

    return () => clearTimeout(timer);
  } else {
    setIsComponentVisible(false);
    setAnimatedPercentage(0);
    prevPercentageRef.current = 0; // reset if not visible
  }
}, [isVisible, completionPercentage, onAnimationComplete]);


  if (!isVisible && !isComponentVisible) return null;

  return (
    <div
      className={cn(
        "bg-color11 p-4 sm:p-6 rounded-lg shadow-custom-subtle font-inter border border-inputColor",
        "transition-all duration-500 ease-out transform",
        "w-full max-w-sm mx-auto",
        // Responsive sizing
        "min-h-[250px] sm:min-h-[290px]",
        // Animation classes
        isVisible && isComponentVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      )}
      style={{
        width: "100%",
        maxWidth: "auto",
        height: "auto",
        minHeight: "auto",
      }}
    >
      {/* Header */}
      <div
        className={cn(
          "flex justify-between items-center mb-4 sm:mb-6",
          "transition-all duration-700 delay-200 ease-out",
          isVisible && isComponentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}
      >
        <h5 className="text-base sm:text-lg font-semibold text-color1">{headerText}</h5>
      </div>

      {/* Progress Circle Container */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative w-full transition-all duration-700 delay-400 ease-out",
            isVisible && isComponentVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
          style={{ height: "180px" }}
        >
          {/* SVG Progress Circle */}
          <svg viewBox="0 0 200 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Background Arc */}
            <path
              d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
              fill="none"
              stroke="currentColor"
              strokeWidth="21"
              className={cn("text-inputColor")}
              strokeLinecap="round"
            />

            {/* Progress Arc */}
            <path
              d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
              fill="none"
              stroke="currentColor"
              strokeWidth="21"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn("text-primary ", "transition-all duration-1000 delay-500 ease-out")}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute top-13 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
            {/* Percentage Display */}
            <div
              className={cn(
                "text-3xl sm:text-4xl font-bold text-color1 pb-3",
                "transition-all duration-700 delay-600 ease-out transform",
                isVisible && isComponentVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}
            >
              {animatedPercentage}%
            </div>

            {/* Description Badge */}
            <div
              className={cn(
                "text-sm font-bold text-primary px-3 py-1 rounded-lg bg-color9",
                "transition-all duration-700 delay-700 ease-out transform",
                isVisible && isComponentVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              )}
            >
              {descriptionText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionProgressBar;

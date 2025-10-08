import { cn } from "@/lib/utils";
import React from "react";

const contributors = [
  { id: 1, src: "https://randomuser.me/api/portraits/men/1.jpg", name: "John" },
  { id: 2, src: "", name: "Ramamoorthy" },
  { id: 3, src: "https://randomuser.me/api/portraits/women/3.jpg", name: "Diana" },
  { id: 4, src: "", name: "Sophie" },
  { id: 5, src: "https://randomuser.me/api/portraits/men/5.jpg", name: "Mike" },
];

function ContributorCard() {
  const visibleContributors = contributors.slice(0, 3);
  const extraCount = contributors.length - visibleContributors.length;

  return (
    <div
      className={cn(
        "bg-color11 rounded-xl p-4 w-full max-w-sm shadow-sm border border-inputColor"
      )}
    >
      <div className={cn("flex justify-between items-center mb-3")}>
        <span className={cn("text-sm font-semibold text-color1")}>Contributors</span>
        <button className={cn("text-sm text-primary hover:underline")}>+ Add new</button>
      </div>
      <div className={cn("flex items-center")}>
        {visibleContributors.map((contributor, index) =>
          contributor.src ? (
            <img
              key={contributor.id}
              src={contributor.src}
              alt={contributor.name}
              className={cn(
                "w-9 h-9 rounded-full border-2 border-white object-cover",
                index !== 0 && "-ml-2"
              )}
            />
          ) : (
            <div
              key={contributor.id}
              className={cn(
                "w-9 h-9 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-sm font-semibold text-color1",
                index !== 0 && "-ml-2"
              )}
            >
              {contributor.name.charAt(0).toUpperCase()}
            </div>
          )
        )}
        {extraCount > 0 && (
          <div
            className={cn(
              "-ml-2 w-9 h-9 rounded-full bg-white border-2 border-white flex items-center justify-center text-sm font-semibold text-color1"
            )}
          >
            +{extraCount}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContributorCard;
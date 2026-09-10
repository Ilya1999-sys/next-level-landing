"use client";

import React from "react";

interface DiscussionsTickerProps {
  items: string[];
  discussionsCount?: string;
}

export function DiscussionsTicker({
  items,
  discussionsCount = "324 fans discussions",
}: DiscussionsTickerProps) {
  // Duplicate items for infinite marquee track
  const trackItems = [...items, ...items, ...items, ...items];

  return (
    <div className="chip-row chip-row--ticker">
      <div className="ticker-viewport">
        <div className="ticker-track">
          {trackItems.map((item, index) => (
            <p key={`${item}-${index}`} className="moments-chip">
              {item}
            </p>
          ))}
        </div>
      </div>
      <p className="story-discussions">
        <i className="status-dot" />
        <span>{discussionsCount}</span>
      </p>
    </div>
  );
}

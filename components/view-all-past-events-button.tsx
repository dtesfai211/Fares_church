'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ViewAllButtonProps {
  count: number;
}

export const ViewAllPastEventsButton = ({ count }: ViewAllButtonProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const handleViewAll = () => {
    setShowAll(true);
    // Could implement logic to fetch more past events or expand the view
    // For now, let's just toggle the state
    
    // You could emit a custom event that the parent component listens to
    document.dispatchEvent(new CustomEvent('viewAllPastEvents', { detail: { showAll: true } }));
  };
  
  return (
    <div className="text-center mt-8">
      <Button 
        variant="outline" 
        onClick={handleViewAll}
      >
        View All Past Events ({count})
      </Button>
    </div>
  );
};
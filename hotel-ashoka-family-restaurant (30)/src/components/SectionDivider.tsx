import React from 'react';
import { Leaf } from 'lucide-react';

export default function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-center gap-6">
        <div className="h-[2px] flex-1 bg-[#bd9b5f]"></div>
        <div className="flex items-center gap-3 text-[#bd9b5f]">
          <Leaf size={16} className="-rotate-45" />
          <Leaf size={24} className="rotate-12" />
          <Leaf size={16} className="rotate-45" />
        </div>
        <div className="h-[2px] flex-1 bg-[#bd9b5f]"></div>
      </div>
    </div>
  );
}

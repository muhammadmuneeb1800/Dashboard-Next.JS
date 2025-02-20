import React from 'react'
import GraphCard from '../graphCard/GrapCard';
import { GRAPH_DATA } from '@/constant/constant';

export default function MainCards() {
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
        {GRAPH_DATA.map((card, index) => (
          <div key={index} className="w-full">
            <GraphCard {...card} />
          </div>
        ))}
      </div>
    </>
  );
}

"use client";
import React from "react";
import GraphCard from "../graphCard/GrapCard";
import { useGraphData } from "@/hooks/useGraphData/useGraphData";

export default function MainCards() { 
  const Data = useGraphData();
  return (
    <>
      <div className="flex flex-col xl:flex-row justify-center items-center gap-3">
        {Data?.map((card, index) => (
          <div key={index} className="w-full">
            <GraphCard {...card} />
          </div>
        ))}
      </div>
    </>
  );
}

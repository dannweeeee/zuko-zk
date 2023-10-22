import React from 'react'

function SkeletonLoading() {
  return (
    <div>
      <div className="bg-[#E3D5CA] shadow rounded-md p-2 w-full mt-5">
        <div className="animate-pulse flex gap-3">
          <div className="rounded-lg bg-[#EDEDE9] h-[100px] w-[100px]"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/4"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-1/2"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div> 
      <div className="bg-[#E3D5CA] shadow rounded-md p-2 w-full mt-5">
        <div className="animate-pulse flex gap-3">
          <div className="rounded-lg bg-[#EDEDE9] h-[100px] w-[100px]"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#EDEDE9] rounded w-1/4"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-1/2"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
            <div className="h-2 bg-[#EDEDE9] rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoading
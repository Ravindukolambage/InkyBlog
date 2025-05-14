import React from "react";
import Image1 from "../../assets/sport.jpg";
import Image2 from "../../assets/education.jpg";
import Image3 from "../../assets/fashion.jpg";
import Image4 from "../../assets/tech.png";

const Banner = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6 max-w-8x1 mx-auto">
      <div className="relative h-[600px] md:col-span-2 overflow-hidden rounded-xl">
        <img 
            src={Image1} 
            alt="Sport" 
            className="w-full h-full object-cover brightness-70" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <span className="bg-red-600 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2 uppercase">
            Sport
          </span>
          <h2 className="text-2xl font-bold">
            More than a million fans gather for the World Cup final showdown.
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative h-[190px] rounded-xl overflow-hidden">
          <img
            src={Image2}
            alt="Education"
            className="w-full h-full object-cover brightness-70"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <span className="bg-green-600 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2 uppercase">
              Education
            </span>
            <h3 className="text-md font-semibold leading-tight">
              AI-powered classrooms are transforming how students learn
              worldwide.
            </h3>
          </div>
        </div>

        <div className="relative h-[190px] rounded-xl overflow-hidden">
          <img
            src={Image3}
            alt="Fashion"
            className="w-full h-full object-cover brightness-70"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <span className="bg-purple-700 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2 uppercase">
              Fashion
            </span>
            <h3 className="text-md font-semibold leading-tight">
              Vintage meets future: high-tech fabrics dominate this year’s
              runway.
            </h3>
          </div>
        </div>

        <div className="relative h-[190px] rounded-xl overflow-hidden">
          <img
            src={Image4}
            alt="Technology"
            className="w-full h-full object-cover brightness-70"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2 uppercase">
              Technology
            </span>
            <h3 className="text-md font-semibold leading-tight">
              Quantum computing takes a leap forward with new superconducting
              chip.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

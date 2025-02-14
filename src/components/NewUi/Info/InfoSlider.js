// import React, { useEffect, useRef } from "react";

// const AutoScrollSlider = () => {
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const slider = sliderRef.current;

//     const interval = setInterval(() => {
//       slider.scrollLeft += slider.offsetWidth / 3;
//       if (slider.scrollLeft >= slider.scrollWidth - slider.offsetWidth) {
//         slider.scrollLeft = 0;
//       }
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="overflow-hidden">
//       <div
//         ref={sliderRef}
//         className="flex transition-all duration-700"
//       >
//         {slides.map((slide, index) => (
//           <div key={index} className="flex-shrink-0 flex w-1/3 text-center p-4">
//             <div className="rounded-full w-10 h-10 mx-auto">
//               <img
//                 src={slide.imgSrc}
//                 alt={`Slide ${index + 1}`}
//                 className="rounded-full w-full h-full"
//               /> 
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
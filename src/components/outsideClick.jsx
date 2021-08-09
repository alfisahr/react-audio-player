import { useEffect, useState, useRef } from "react";

export default function useComponentVisible(initialIsVisible) {
   const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
   const ref = useRef(null);

   //    const handleHideDropdown = (event: KeyboardEvent) => {
   //       if (event.key === "Escape") {
   //          setIsComponentVisible(false);
   //       }
   //    };

   const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
         if (event.target.tagName !== "svg") {
            setIsComponentVisible(false);
         }
      }
   };

   useEffect(() => {
      //   document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      return () => {
         //  document.removeEventListener("keydown", handleHideDropdown, true);
         document.removeEventListener("click", handleClickOutside, true);
      };
   });

   return { ref, isComponentVisible, setIsComponentVisible };
}

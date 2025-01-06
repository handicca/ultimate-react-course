import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
}

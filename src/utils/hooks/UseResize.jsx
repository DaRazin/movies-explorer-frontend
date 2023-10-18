import { useState, useEffect } from "react";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [screen, setScreen] = useState("desktop");
  const [countMovies, setCountMovies] = useState("desktop");

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 649) {
      setScreen("mobile");
      setCountMovies({ total: 5, more: 2 });
    } else if (width <= 1136) {
      setScreen("tablet");
      setCountMovies({ total: 8, more: 2 });
    } else {
      setScreen("desktop");
      setCountMovies({ total: 12, more: 3 });
    }
  }, [width]);

  return { width, screen, countMovies, setCountMovies };
};

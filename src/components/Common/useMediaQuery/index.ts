import { useEffect, useMemo, useState } from "react";

const screens = {
  mobile: "768px",
  tablet: "1200px",
  sm: "768px",
  md: "1200px",
  lg: "1440px",
  xl: "1640px",
};

const getMedia = (query: string) => {
  if (typeof window === "undefined") return null;

  const media = window.matchMedia(query);

  return media;
};

const useMediaQuery = (breakpoints: keyof typeof screens) => {
  const query = useMemo(
    () => `not all and (min-width: ${typeof breakpoints === "number" ? `${breakpoints}px` : screens[breakpoints]})`,
    [breakpoints],
  );

  const [matches, setMatches] = useState<boolean | null>(getMedia(query)?.matches ?? false);

  useEffect(() => {
    const matchMedia = getMedia(query);

    if (!matchMedia) return;

    const handleChange = () => setMatches(matchMedia.matches);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia?.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { stringify } from "qs";

export function useRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps);
      },
      push(path: RoutePath, search?: string) {
        navigate({ pathname: path, search: search ? stringify(search, { indices: false }) : undefined });
      },
    };
  }, [navigate]);
}

export type RoutePath = "/" | "/login" | "/signup" | "/editor" | "/myPage" | "/board";

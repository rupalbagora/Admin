// hooks/useActivePage.ts
import { useSelector } from "react-redux";
import { type RootState } from "../../../store";

export const useActivePage = () => {
  const { currentPage, previousPage, history, searchInput } = useSelector(
    (state: RootState) => state.activeStatus
  );

  return { currentPage, previousPage, history, searchInput };
};

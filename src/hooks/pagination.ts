import { useEffect, useState } from "react";

const usePagination = <T>(
  items: T[],
  itemsPerPage: number,
  initialPage = 0,
): [
  pageItems: T[],
  page: number,
  pageCount: number,
  previousPage: () => void,
  nextPage: () => void,
  isFirstPage: boolean,
  isLastPage: boolean,
] => {
  const [page, setPage] = useState(initialPage);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const lastPage = pageCount - 1;
  const isFirstPage = page <= 0;
  const isLastPage = page >= lastPage;

  useEffect(() => {
    if (items.length && page >= lastPage) {
      setPage(lastPage);
    }
  }, [items, itemsPerPage]);

  const previousPage = () => {
    if (!isFirstPage) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  const pageItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return [
    pageItems,
    page,
    pageCount,
    previousPage,
    nextPage,
    isFirstPage,
    isLastPage,
  ];
};

export default usePagination;

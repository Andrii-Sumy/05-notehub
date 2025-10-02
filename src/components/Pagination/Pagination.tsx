import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      previousClassName={css.prev}
      nextClassName={css.next}
      breakLabel="…"
      breakClassName={css.break}
      disabledClassName={css.disabled}
    />
  );
}

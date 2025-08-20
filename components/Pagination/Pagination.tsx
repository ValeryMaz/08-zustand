import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  total: number;
  onChange: (nextPage: number) => void;
  current: number;
}

export default function Pagination({
  total,
  onChange,
  current,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={current - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  total: number;
}
const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  limit,
  total,
}) => {
  return (
    <div className="mt-2.5 flex items-center">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      <span className="mx-2.5">Page {page}</span>

      <button
        disabled={page * limit >= total}
        onClick={() => setPage(p => p + 1)}
        className="rounded border px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

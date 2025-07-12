import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ page, limit, total, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 disabled:opacity-50"
      >
        <FiChevronLeft />
        Prev
      </button>

      <span className="text-gray-700 dark:text-white">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 disabled:opacity-50"
      >
        Next
        <FiChevronRight />
      </button>
    </div>
  );
}

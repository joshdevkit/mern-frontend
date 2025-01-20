import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href={currentPage > 1 ? "#" : undefined}
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          className={`${
            currentPage === 1
              ? "cursor-not-allowed bg-neutral-300 text-neutral-500"
              : "bg-neutral-900 text-white hover:bg-neutral-700"
          }`}
        >
          Previous
        </PaginationPrevious>
      </PaginationItem>

      {[...Array(totalPages)].map((_, pageIndex) => (
        <PaginationItem key={pageIndex}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(pageIndex + 1)}
            className={`${
              currentPage === pageIndex + 1
                ? "font-bold bg-neutral-900 text-white"
                : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
            }`}
          >
            {pageIndex + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem>
        <PaginationNext
          href={currentPage < totalPages ? "#" : undefined}
          onClick={() => {
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          className={`${
            currentPage === totalPages
              ? "cursor-not-allowed bg-neutral-300 text-neutral-500"
              : "bg-neutral-900 text-white hover:bg-neutral-700"
          }`}
        >
          Next
        </PaginationNext>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export default PaginationControls;

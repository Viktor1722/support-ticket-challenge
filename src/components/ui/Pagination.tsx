"use client";

import { Flex, Button, Text } from "@radix-ui/themes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Flex align="center" justify="center" gap="3" mt="4">
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Text size="2" color="gray">
        Page {currentPage} of {totalPages}
      </Text>

      <Button
        variant="soft"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Flex>
  );
}

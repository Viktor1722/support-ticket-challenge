"use client";

import { useState, useMemo } from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { Ticket } from "../types/ticket";
import { useTickets } from "../hooks/useTickets";
import {
  TicketFilters,
  StatusFilter,
  PriorityFilter,
} from "../components/tickets/TicketFilters";
import { TicketTable } from "../components/tickets/TicketTable";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { Pagination } from "../components/ui/Pagination";
import { TicketModal } from "../components/tickets/TicketModal";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const { tickets, loading, error, refetch, updateTicketInList } = useTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTickets = useMemo(() => {
    let result = tickets;

    if (statusFilter !== "all") {
      result = result.filter((ticket) => ticket.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      result = result.filter((ticket) => ticket.priority === priorityFilter);
    }

    // Filter by search query (title)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((ticket) =>
        ticket.title.toLowerCase().includes(query)
      );
    }

    // Sort by updatedAt (newest first)
    result = [...result].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return result;
  }, [tickets, statusFilter, priorityFilter, searchQuery]);

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTickets, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePriorityFilterChange = (priority: PriorityFilter) => {
    setPriorityFilter(priority);
    setCurrentPage(1);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleModalClose = () => {
    setSelectedTicket(null);
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    updateTicketInList(updatedTicket);
    setSelectedTicket(updatedTicket);
  };

  if (loading) {
    return <LoadingState message="Loading tickets..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <main className="p-14">
      <Flex direction="column" gap="4">
        <Heading size="6">Support Tickets</Heading>

        <TicketFilters
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={handlePriorityFilterChange}
        />

        {filteredTickets.length === 0 ? (
          <EmptyState
            title="No tickets found"
            description={
              searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No tickets available"
            }
          />
        ) : (
          <>
            <TicketTable
              tickets={paginatedTickets}
              onClick={handleTicketClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        <TicketModal
          ticket={selectedTicket}
          open={selectedTicket !== null}
          onClose={handleModalClose}
          onTicketUpdate={handleTicketUpdate}
        />
      </Flex>
    </main>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { Ticket } from "../types/ticket";
import { useTickets } from "../hooks/useTickets";
import {
  TicketFilters,
  StatusFilter,
} from "../components/tickets/TicketFilters";
import { TicketTable } from "../components/tickets/TicketTable";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import { TicketModal } from "../components/tickets/TicketModal";

export default function Home() {
  const { tickets, loading, error, refetch, updateTicketInList } = useTickets();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filteredTickets = useMemo(() => {
    let result = tickets;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((ticket) => ticket.status === statusFilter);
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
  }, [tickets, statusFilter, searchQuery]);

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
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {filteredTickets.length === 0 ? (
          <EmptyState
            title="No tickets found"
            description={
              searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No tickets available"
            }
          />
        ) : (
          <TicketTable tickets={filteredTickets} onClick={handleTicketClick} />
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

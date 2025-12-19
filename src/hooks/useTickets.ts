"use client";

import { useState, useEffect, useCallback } from "react";
import { Ticket } from "../types/ticket";
import { fetchTickets } from "../api/tickets";

interface UseTicketsReturn {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateTicketInList: (updatedTicket: Ticket) => void;
}

export function useTickets(): UseTicketsReturn {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load tickets";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const updateTicketInList = useCallback((updatedTicket: Ticket) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  }, []);

  return {
    tickets,
    loading,
    error,
    refetch: loadTickets,
    updateTicketInList,
  };
}


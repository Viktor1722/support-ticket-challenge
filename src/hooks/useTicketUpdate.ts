"use client";

import { useState, useCallback } from "react";
import { Ticket, TicketStatus } from "../types/ticket";
import { updateTicketStatus } from "../api/tickets";

interface UseTicketUpdateReturn {
  updating: boolean;
  error: string | null;
  updateStatus: (id: string, status: TicketStatus) => Promise<Ticket | null>;
  clearError: () => void;
}

export function useTicketUpdate(): UseTicketUpdateReturn {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (id: string, status: TicketStatus): Promise<Ticket | null> => {
      setUpdating(true);
      setError(null);

      try {
        const updatedTicket = await updateTicketStatus(id, status);
        return updatedTicket;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to update ticket";
        setError(message);
        return null;
      } finally {
        setUpdating(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updating,
    error,
    updateStatus,
    clearError,
  };
}

import { apiClient } from "./client";
import { Ticket, TicketStatus } from "../types/ticket";

export async function fetchTickets(): Promise<Ticket[]> {
  return apiClient<Ticket[]>("/tickets");
}

export async function fetchTicketById(id: string): Promise<Ticket> {
  return apiClient<Ticket>(`/tickets/${id}`);
}

export async function updateTicketStatus(
  id: string,
  status: TicketStatus
): Promise<Ticket> {
  return apiClient<Ticket>(`/tickets/${id}`, {
    method: "PATCH",
    body: {
      status,
      updatedAt: new Date().toISOString(),
    },
  });
}

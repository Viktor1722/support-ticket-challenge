"use client";

import { Table, Text } from "@radix-ui/themes";
import { Ticket } from "../../types/ticket";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";

interface TicketTableProps {
  tickets: Ticket[];
  onClick: (ticket: Ticket) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TicketTable({ tickets, onClick }: TicketTableProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Priority</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Updated</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tickets.map((ticket) => (
          <Table.Row
            key={ticket.id}
            onClick={() => onClick(ticket)}
            style={{ cursor: "pointer" }}
          >
            <Table.Cell>
              <Text weight="medium">{ticket.title}</Text>
            </Table.Cell>
            <Table.Cell>
              <StatusBadge status={ticket.status} />
            </Table.Cell>
            <Table.Cell>
              <PriorityBadge priority={ticket.priority} />
            </Table.Cell>
            <Table.Cell>
              <Text size="2">{ticket.customer.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size="2" color="gray">
                {formatDate(ticket.updatedAt)}
              </Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

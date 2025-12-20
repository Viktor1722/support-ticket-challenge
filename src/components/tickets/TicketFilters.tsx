"use client";

import { Flex, TextField, Select } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TicketStatus, TicketPriority } from "../../types/ticket";

export type StatusFilter = TicketStatus | "all";
export type PriorityFilter = TicketPriority | "all";

interface TicketFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (priority: PriorityFilter) => void;
}

export function TicketFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: TicketFiltersProps) {
  return (
    <Flex gap="3" wrap="wrap">
      <TextField.Root
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ minWidth: 250 }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Select.Root
        value={statusFilter}
        onValueChange={(value) => onStatusFilterChange(value as StatusFilter)}
      >
        <Select.Trigger placeholder="Filter by status" />
        <Select.Content>
          <Select.Item value="all">All Statuses</Select.Item>
          <Select.Item value="open">Open</Select.Item>
          <Select.Item value="pending">Pending</Select.Item>
          <Select.Item value="closed">Closed</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root
        value={priorityFilter}
        onValueChange={(value) =>
          onPriorityFilterChange(value as PriorityFilter)
        }
      >
        <Select.Trigger placeholder="Filter by priority" />
        <Select.Content>
          <Select.Item value="all">All Priorities</Select.Item>
          <Select.Item value="urgent">Urgent</Select.Item>
          <Select.Item value="high">High</Select.Item>
          <Select.Item value="medium">Medium</Select.Item>
          <Select.Item value="low">Low</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}

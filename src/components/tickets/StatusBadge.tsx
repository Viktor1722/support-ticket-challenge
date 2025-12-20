"use client";

import { Badge } from "@radix-ui/themes";
import { TicketStatus } from "../../types/ticket";

interface StatusBadgeProps {
  status: TicketStatus;
}

const statusConfig: Record<
  TicketStatus,
  { label: string; color: "green" | "yellow" | "gray" }
> = {
  open: { label: "Open", color: "green" },
  pending: { label: "Pending", color: "yellow" },
  closed: { label: "Closed", color: "gray" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge color={config.color} variant="soft">
      {config.label}
    </Badge>
  );
}

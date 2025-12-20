"use client";

import { Badge } from "@radix-ui/themes";
import { TicketPriority } from "../../types/ticket";

interface PriorityBadgeProps {
  priority: TicketPriority;
}

const priorityConfig: Record<
  TicketPriority,
  { label: string; color: "gray" | "blue" | "orange" | "red" }
> = {
  low: { label: "Low", color: "gray" },
  medium: { label: "Medium", color: "blue" },
  high: { label: "High", color: "orange" },
  urgent: { label: "Urgent", color: "red" },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <Badge color={config.color} variant="outline">
      {config.label}
    </Badge>
  );
}

"use client";

import { Dialog, Flex, Text, Heading, Separator, Box } from "@radix-ui/themes";
import { Ticket } from "../../types/ticket";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";

interface TicketModalProps {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TicketModal({ ticket, open, onClose }: TicketModalProps) {
  if (!ticket) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title>
          <Flex align="center" gap="2">
            <Text color="gray" size="2">
              {ticket.id}
            </Text>
            <Text>{ticket.title}</Text>
          </Flex>
        </Dialog.Title>

        <Flex direction="column" gap="4" mt="4">
          <Flex gap="4">
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                Status
              </Text>
              <StatusBadge status={ticket.status} />
            </Flex>
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                Priority
              </Text>
              <PriorityBadge priority={ticket.priority} />
            </Flex>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="1" color="gray">
              Customer
            </Text>
            <Text size="2" weight="medium">
              {ticket.customer.name}
            </Text>
            <Text size="2" color="gray">
              {ticket.customer.email}
            </Text>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="1" color="gray">
              Description
            </Text>
            <Text size="2">{ticket.description}</Text>
          </Flex>

          <Text size="1" color="gray">
            Last updated: {formatDate(ticket.updatedAt)}
          </Text>

          <Separator size="4" />

          <Flex direction="column" gap="3">
            <Heading size="3">Activity</Heading>

            {ticket.activity.length === 0 ? (
              <Text size="2" color="gray">
                No activity yet
              </Text>
            ) : (
              <Flex direction="column" gap="4">
                {ticket.activity.map((activity) => (
                  <Box key={activity.id}>
                    <Flex justify="between" align="center" mb="1">
                      <Text size="2" weight="medium">
                        {activity.author}
                      </Text>
                      <Text size="1" color="gray">
                        {formatDate(activity.createdAt)}
                      </Text>
                    </Flex>

                    {activity.type === "comment" ? (
                      <Text size="2" color="gray">
                        {activity.content}
                      </Text>
                    ) : (
                      <Flex align="center" gap="2">
                        <Text size="2" color="gray">
                          Status changed from
                        </Text>
                        <StatusBadge status={activity.from} />
                        <Text size="2" color="gray">
                          to
                        </Text>
                        <StatusBadge status={activity.to} />
                      </Flex>
                    )}
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <button className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200">
              Close
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

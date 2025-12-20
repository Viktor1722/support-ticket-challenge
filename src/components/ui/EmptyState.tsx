"use client";

import { Flex, Text } from "@radix-ui/themes";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Flex direction="column" align="center" justify="center" gap="2" py="9">
      <Text size="4" weight="medium" color="gray">
        {title}
      </Text>
      {description && (
        <Text size="2" color="gray">
          {description}
        </Text>
      )}
    </Flex>
  );
}

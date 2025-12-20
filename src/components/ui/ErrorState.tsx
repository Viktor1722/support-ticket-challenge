"use client";

import { Flex, Button, Callout } from "@radix-ui/themes";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Flex direction="column" align="center" gap="4" py="9">
      <Callout.Root color="red" size="2">
        <Callout.Text>{message}</Callout.Text>
      </Callout.Root>
      {onRetry && (
        <Button variant="soft" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Flex>
  );
}

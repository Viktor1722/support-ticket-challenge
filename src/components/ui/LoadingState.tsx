"use client";

import { Flex, Spinner, Text } from "@radix-ui/themes";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <Flex direction="column" align="center" justify="center" gap="3" py="9">
      <Spinner size="3" />
      <Text size="2" color="gray">
        {message}
      </Text>
    </Flex>
  );
}

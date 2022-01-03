import React from "react";

import {
  Badge,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
} from "@chakra-ui/react";
export const Selling = () => {
  return (
    <PopoverContent>
      <PopoverArrow></PopoverArrow>
      <PopoverCloseButton />
      <PopoverHeader fontWeight="bold">Selling...</PopoverHeader>
      <PopoverBody>{/* List asset that can sell */}</PopoverBody>
    </PopoverContent>
  );
};

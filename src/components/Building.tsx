import React from "react";
import {
  faHome,
  faBuilding,
  faCampground,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BuildingProps {
  blockId: number;
  blocksData: any[];
  buildingLevel: number[];
  blockOwners: (number | null)[];
}

export const Building = ({
  blockId,
  blocksData,
  buildingLevel,
  blockOwners,
}: BuildingProps) => {
  const buildingColor = {
    c0: "#718096",
    c1: "#C53030",
    c2: "#ED8936",
    c3: "#4299e1",
  };
  const isResort = blocksData[blockId].type === "RESORT";
  const buildingOwnerIndex = blockOwners[blockId];
  const currentBuildingLevel = buildingLevel[blockId];
  const iconSelector = () => {
    if (currentBuildingLevel === 1) {
      return faCampground;
    } else if (currentBuildingLevel === 2) {
      return faHome;
    } else if (currentBuildingLevel === 3) {
      return faBuilding;
    } else {
      return faHotel;
    }
  };
  const colorSelector = () => {
    //     console.log(buildingOwnerIndex);
    if (buildingOwnerIndex == 0) {
      return buildingColor.c0;
    } else if (buildingOwnerIndex == 1) {
      return buildingColor.c1;
    } else if (buildingOwnerIndex == 2) {
      return buildingColor.c2;
    } else {
      return buildingColor.c3;
    }
  };

  return (
    <Flex justifyContent="flexStart" w="100%" ml={3} h="30%" flexGrow={1}>
      {!isResort && currentBuildingLevel >= 1 ? (
        <FontAwesomeIcon
          icon={iconSelector()}
          color={colorSelector()}
          size="1x"
        ></FontAwesomeIcon>
      ) : null}
    </Flex>
  );
};

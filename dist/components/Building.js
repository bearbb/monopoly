"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const react_1 = require("@chakra-ui/react");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const Building = ({ blockId, blocksData, buildingLevel, blockOwners, }) => {
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
            return free_solid_svg_icons_1.faCampground;
        }
        else if (currentBuildingLevel === 2) {
            return free_solid_svg_icons_1.faHome;
        }
        else if (currentBuildingLevel === 3) {
            return free_solid_svg_icons_1.faBuilding;
        }
        else {
            return free_solid_svg_icons_1.faHotel;
        }
    };
    const colorSelector = () => {
        //     console.log(buildingOwnerIndex);
        if (buildingOwnerIndex == 0) {
            return buildingColor.c0;
        }
        else if (buildingOwnerIndex == 1) {
            return buildingColor.c1;
        }
        else if (buildingOwnerIndex == 2) {
            return buildingColor.c2;
        }
        else {
            return buildingColor.c3;
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_1.Flex, { justifyContent: "flexStart", w: "100%", ml: 3, h: "30%", flexGrow: 1, children: !isResort && currentBuildingLevel >= 1 ? ((0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: iconSelector(), color: colorSelector(), size: "1x" }, void 0)) : null }, void 0));
};
exports.Building = Building;

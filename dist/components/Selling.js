"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Selling = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utilities_1 = require("src/utils/utilities");
const priceMultiplier_1 = require("src/data/priceMultiplier");
const react_2 = require("@chakra-ui/react");
const sellAsset_1 = require("src/moves/sellAsset");
const Selling = ({ G, ctx, moves, buildingLevel, sellAssets, setStage, }) => {
    const [assetToSell, setAssetToSell] = (0, react_1.useState)([]);
    const [isSellAble, setIsSellAble] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        console.log(assetToSell);
        if (assetToSell.length >= 1) {
            setIsSellAble(true);
        }
        else {
            setIsSellAble(false);
        }
        return () => { };
    }, [assetToSell]);
    (0, react_1.useEffect)(() => {
        const getAvailAsset = () => {
            const assetAvail = (0, sellAsset_1.listAsset)(G, ctx);
            if (assetAvail.length > 0) {
                setAssetList(assetAvail);
            }
        };
        getAvailAsset();
        return () => { };
    }, [G, ctx.currentPlayer, ctx]);
    const [assetList, setAssetList] = (0, react_1.useState)([]);
    const addAssetHandler = (blockId) => {
        let temp = assetToSell;
        //check if block id is exist
        if (!temp.includes(blockId)) {
            setAssetToSell([...temp, blockId]);
        }
    };
    const removeAssetHandler = (blockId) => {
        let temp = assetToSell;
        const index = temp.findIndex((id) => id === blockId);
        if (index !== -1) {
            temp.splice(index, 1);
        }
        setAssetToSell([...temp]);
    };
    const [sellPriceList, setSellPriceList] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (assetList.length >= 1) {
            let temp = assetList.map((blockId) => {
                return {
                    sellPrice: G.blocksData[blockId].basePrice *
                        priceMultiplier_1.priceMultiplier.sell *
                        G.blocksData[blockId].buildingLevel,
                    blockId: blockId,
                };
            });
            setSellPriceList(temp);
        }
        return () => { };
    }, [assetList, G.blocksData]);
    const [totalSellMoney, setTotalSellMoney] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (assetToSell.length >= 1) {
            let total = 0;
            assetToSell.forEach((blockId) => {
                //find the sell price for each block id
                const i = sellPriceList.findIndex((sellData) => sellData.blockId === blockId);
                if (i !== -1) {
                    total += sellPriceList[i].sellPrice;
                }
            });
            setTotalSellMoney(total);
        }
        return () => { };
    }, [assetToSell]);
    const renderAllAssetDetail = () => {
        return assetList.map((assetId) => {
            return ((0, jsx_runtime_1.jsx)(react_2.Flex, { gap: 3, children: (0, jsx_runtime_1.jsx)(AssetDetail, { blockId: assetId, blocksData: G.blocksData, buildingLevel: buildingLevel, addAssetHandler: addAssetHandler, removeAssetHandler: removeAssetHandler }, assetId) }, void 0));
        });
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.PopoverContent, { children: [(0, jsx_runtime_1.jsx)(react_2.PopoverArrow, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverHeader, { fontWeight: "bold", children: "Selling..." }, void 0), (0, jsx_runtime_1.jsxs)(react_2.PopoverBody, { userSelect: "none", children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { children: renderAllAssetDetail() }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", gap: 3, mt: 3, alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_2.Text, { children: "total is: " }, void 0), (0, jsx_runtime_1.jsx)(react_2.Text, { color: "purple.600", fontWeight: "extrabold", children: totalSellMoney }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { size: "sm", colorScheme: "red", disabled: !isSellAble, onClick: () => {
                                    //sell all asset in assetToSell
                                    sellAssets(assetToSell);
                                    setAssetToSell([]);
                                    setStage(2);
                                }, children: "sell" }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
exports.Selling = Selling;
const AssetDetail = ({ blockId, blocksData, buildingLevel, addAssetHandler, removeAssetHandler, }) => {
    const [isClicked, setIsClicked] = (0, react_1.useState)(false);
    const buildingPriceInKFormat = (0, utilities_1.kFormatter)(blocksData[blockId].basePrice *
        priceMultiplier_1.priceMultiplier.sell *
        blocksData[blockId].buildingLevel);
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { w: 70, h: 70, ml: 3, borderWidth: 2, borderColor: "gray.400", rounded: 5, flexDir: "column", onClick: () => {
            if (isClicked) {
                removeAssetHandler(blockId);
            }
            else {
                addAssetHandler(blockId);
            }
            setIsClicked(!isClicked);
        }, cursor: "pointer", bg: isClicked ? "gray.300" : "gray.50", children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { w: "100%", h: "60%", justifyContent: "center", children: (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "sm", color: "gray.800", fontWeight: "bold", children: blocksData[blockId].cityName }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.Flex, { w: "100%", h: "40%", justifyContent: "center", borderTop: "2px solid #A0AEC0", children: (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "sm", fontWeight: "extrabold", color: "gray.800", children: buildingPriceInKFormat }, void 0) }, void 0)] }, blockId));
};

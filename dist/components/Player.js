"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
//token
const _0_png_1 = __importDefault(require("src/assets/PlayerToken/0.png"));
const _1_png_1 = __importDefault(require("src/assets/PlayerToken/1.png"));
const _2_png_1 = __importDefault(require("src/assets/PlayerToken/2.png"));
const _3_png_1 = __importDefault(require("src/assets/PlayerToken/3.png"));
//chakra components
const react_1 = require("@chakra-ui/react");
const Board_1 = require("src/Board");
const Player = ({ tokenId }) => {
    const tokenSelector = (tokenId) => {
        if (tokenId === 0) {
            return _0_png_1.default;
        }
        else if (tokenId === 1) {
            return _1_png_1.default;
        }
        else if (tokenId === 2) {
            return _2_png_1.default;
        }
        else {
            return _3_png_1.default;
        }
    };
    return ((0, jsx_runtime_1.jsx)(Board_1.CenteredFlex, { children: tokenId.map((tid) => {
            return ((0, jsx_runtime_1.jsx)(react_1.Image, { src: tokenSelector(tid), w: 25, opacity: 0.95 }, tid));
        }) }, void 0));
};
exports.Player = Player;

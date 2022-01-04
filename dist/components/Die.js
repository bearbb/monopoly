"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Die = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("src/components/Die.css");
const Die = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "Die", children: (0, jsx_runtime_1.jsx)("i", { className: `fas fa-dice-${props.face} ${props.isRolling && "shaking"}` }, void 0) }, void 0));
};
exports.Die = Die;

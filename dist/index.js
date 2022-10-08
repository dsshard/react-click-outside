"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactClickOutside = exports.useToggle = void 0;
const react_1 = __importStar(require("react"));
var use_toggle_1 = require("@coxy/utils/dist/use/use-toggle");
Object.defineProperty(exports, "useToggle", { enumerable: true, get: function () { return use_toggle_1.useToggle; } });
exports.ReactClickOutside = (0, react_1.memo)(function ReactClickOutside(props) {
    const ref = (0, react_1.useRef)();
    const isTouch = (0, react_1.useRef)(false);
    const handleClickOutside = (0, react_1.useCallback)((event) => {
        const { visible, onClose } = props;
        const node = ref.current;
        if (!node || !node.contains(event.target)) {
            if (event.type === 'touchend')
                isTouch.current = true;
            if (event.type === 'click' && isTouch.current)
                return;
            if (visible) {
                setTimeout(() => {
                    if (visible) {
                        onClose();
                    }
                });
            }
        }
    }, [props, ref]);
    const handleEsc = (0, react_1.useCallback)(({ keyCode }) => {
        if (keyCode === 27 && props.visible) {
            props.onClose();
        }
    }, [props]);
    (0, react_1.useEffect)(() => {
        if (props.visible) {
            document.addEventListener('click', handleClickOutside, true);
            document.addEventListener('keydown', handleEsc, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleEsc, true);
        };
    }, [handleClickOutside, handleEsc, props]);
    if (!props.visible)
        return null;
    const elements = react_1.default.Children.map(props.children, (child) => react_1.default.cloneElement(child, {
        ref
    }));
    return react_1.default.createElement(react_1.default.Fragment, null, elements);
});

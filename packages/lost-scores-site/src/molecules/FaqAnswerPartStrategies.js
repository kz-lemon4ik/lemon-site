import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
export function createAnswerPartStrategies({ accentLinkStyles, codeStyles, }) {
    return {
        strong: ({ content, partKey }) => (_jsx("strong", { className: clsx("font-semibold", "text-white", "theme-is-light:text-themeLight-headingText"), children: content }, partKey)),
        code: ({ content, partKey }) => (_jsxs("code", { className: codeStyles, children: [" ", content, " "] }, partKey)),
        link: ({ href, text, partKey }) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: accentLinkStyles, children: text }, partKey)),
        list: ({ items, partKey, renderContent }) => (_jsx("ul", { className: "list-disc list-outside pl-5 my-3 space-y-2", children: items.map((listItemPartsArray, listItemIndex) => (_jsx("li", { children: listItemPartsArray.map((actualPart, actualPartIndex) => renderContent(actualPart, `${partKey}-li-${listItemIndex}-${actualPartIndex}`)) }, listItemIndex))) }, partKey)),
    };
}

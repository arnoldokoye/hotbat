(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardBody",
    ()=>CardBody,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Card({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 text-slate-900 dark:border-slate-800 dark:text-slate-50 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardBody({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-5 py-4 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
_c2 = CardBody;
function CardFooter({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border-t border-slate-100 px-5 py-4 dark:border-slate-800 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c3 = CardFooter;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardBody");
__turbopack_context__.k.register(_c3, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerFiltersStrip",
    ()=>PlayerFiltersStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-client] (ecmascript)");
;
;
;
;
const dateRangeOptions = [
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Season to date"
];
const pitchTypeOptions = [
    "All",
    "4-Seam",
    "Sinker",
    "Cutter",
    "Slider",
    "Curveball",
    "Changeup"
];
const pitcherHandOptions = [
    "All",
    "vs LHP",
    "vs RHP"
];
function PlayerFiltersStrip({ dateRange, onDateRangeChange, pitchType, onPitchTypeChange, pitcherHand, onPitcherHandChange, onResetFilters }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
            className: "px-6 py-5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        label: "Date Range",
                        value: dateRange,
                        onChange: (event)=>onDateRangeChange(event.target.value),
                        children: dateRangeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        label: "Pitch Type",
                        value: pitchType,
                        onChange: (event)=>onPitchTypeChange(event.target.value),
                        children: pitchTypeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        label: "Pitcher Hand",
                        value: pitcherHand,
                        onChange: (event)=>onPitcherHandChange(event.target.value),
                        children: pitcherHandOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            onClick: onResetFilters,
                            variant: "primary",
                            className: "w-full",
                            children: "Reset filters"
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = PlayerFiltersStrip;
var _c;
__turbopack_context__.k.register(_c, "PlayerFiltersStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "Tbody",
    ()=>Tbody,
    "Td",
    ()=>Td,
    "Th",
    ()=>Th,
    "Thead",
    ()=>Thead,
    "Tr",
    ()=>Tr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Table({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `overflow-x-auto ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "min-w-full text-sm text-slate-800 dark:text-slate-100",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Table.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Table;
function Thead({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        className: `bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-300 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c1 = Thead;
function Tbody({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, this);
}
_c2 = Tbody;
function Tr({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: `border-b border-slate-100 last:border-0 dark:border-slate-800 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = Tr;
function Th({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: `px-3 py-2 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
_c4 = Th;
function Td({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: `px-3 py-2 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Table.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_c5 = Td;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "Thead");
__turbopack_context__.k.register(_c2, "Tbody");
__turbopack_context__.k.register(_c3, "Tr");
__turbopack_context__.k.register(_c4, "Th");
__turbopack_context__.k.register(_c5, "Td");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerGameLogTable",
    ()=>PlayerGameLogTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Table.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PlayerGameLogTable({ rows }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("date");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const filteredRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerGameLogTable.useMemo[filteredRows]": ()=>{
            const query = searchQuery.trim().toLowerCase();
            if (!query) return rows;
            return rows.filter({
                "PlayerGameLogTable.useMemo[filteredRows]": (row)=>row.opponent.toLowerCase().includes(query) || row.park.toLowerCase().includes(query)
            }["PlayerGameLogTable.useMemo[filteredRows]"]);
        }
    }["PlayerGameLogTable.useMemo[filteredRows]"], [
        rows,
        searchQuery
    ]);
    const sortedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerGameLogTable.useMemo[sortedRows]": ()=>{
            const sorted = [
                ...filteredRows
            ].sort({
                "PlayerGameLogTable.useMemo[sortedRows].sorted": (a, b)=>{
                    const aValue = a[sortBy];
                    const bValue = b[sortBy];
                    if (aValue === bValue) return 0;
                    const base = aValue < bValue ? -1 : 1;
                    return sortDirection === "asc" ? base : -base;
                }
            }["PlayerGameLogTable.useMemo[sortedRows].sorted"]);
            return sorted;
        }
    }["PlayerGameLogTable.useMemo[sortedRows]"], [
        filteredRows,
        sortBy,
        sortDirection
    ]);
    const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageRows = sortedRows.slice(start, start + pageSize);
    const handleSort = (key)=>{
        if (key === sortBy) {
            setSortDirection((prev)=>prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDirection("asc");
        }
    };
    const handlePageChange = (direction)=>{
        setPage((prev)=>{
            if (direction === "prev") return Math.max(1, prev - 1);
            return Math.min(totalPages, prev + 1);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                children: "Game Log"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: "Search, sort, and page through recent games"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: searchQuery,
                                onChange: (event)=>{
                                    setSearchQuery(event.target.value);
                                    setPage(1);
                                },
                                placeholder: "Search opponent or park",
                                className: "h-10 w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                size: "sm",
                                variant: "secondary",
                                children: "Columns"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thead"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                children: [
                                    {
                                        key: "date",
                                        label: "Date"
                                    },
                                    {
                                        key: "opponent",
                                        label: "Opp"
                                    },
                                    {
                                        key: "park",
                                        label: "Park"
                                    },
                                    {
                                        key: "result",
                                        label: "Result"
                                    },
                                    {
                                        key: "ab",
                                        label: "AB"
                                    },
                                    {
                                        key: "pa",
                                        label: "PA"
                                    },
                                    {
                                        key: "hr",
                                        label: "HR"
                                    },
                                    {
                                        key: "rbi",
                                        label: "RBI"
                                    },
                                    {
                                        key: "bb",
                                        label: "BB"
                                    },
                                    {
                                        key: "k",
                                        label: "K"
                                    }
                                ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleSort(key),
                                            className: "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300",
                                            children: [
                                                label,
                                                sortBy === key ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "text-[10px]",
                                                    children: sortDirection === "asc" ? "▲" : "▼"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "text-[10px] text-slate-300",
                                                    children: "▲"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    }, key, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                        lineNumber: 114,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tbody"], {
                            children: pageRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.date
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "font-semibold text-slate-900 dark:text-slate-50",
                                            children: row.opponent
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: row.park
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: row.result
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-900 dark:text-slate-50",
                                            children: row.ab
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.pa
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.hr
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.rbi
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.bb
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.k
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.id, true, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: "Rows per page"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: pageSize,
                                onChange: (event)=>{
                                    setPageSize(Number(event.target.value));
                                    setPage(1);
                                },
                                className: "h-9 w-20",
                                children: [
                                    10,
                                    15,
                                    20
                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: size,
                                        children: size
                                    }, size, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: ()=>handlePageChange("prev"),
                                disabled: currentPage === 1,
                                variant: "secondary",
                                size: "sm",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-slate-600 dark:text-slate-300",
                                children: [
                                    "Page ",
                                    currentPage,
                                    " of ",
                                    totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: ()=>handlePageChange("next"),
                                disabled: currentPage === totalPages,
                                variant: "secondary",
                                size: "sm",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(PlayerGameLogTable, "wvU9FKzqvXHD3vHyobOwoN87MwY=");
_c = PlayerGameLogTable;
var _c;
__turbopack_context__.k.register(_c, "PlayerGameLogTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Badge({ children, variant = "default", className = "" }) {
    const styles = {
        default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-100",
        danger: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-100"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerHeader",
    ()=>PlayerHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const seasonOptions = [
    "2025",
    "2024",
    "2023",
    "Career"
];
const splitOptions = [
    "Full Season",
    "Last 30 Days",
    "Last 14 Days",
    "Post-ASB"
];
function PlayerHeader({ playerInfo, season, onSeasonChange, split, onSplitChange, isFavorite, onToggleFavorite }) {
    const initials = playerInfo.name.split(" ").map((part)=>part[0]).join("").slice(0, 2).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "border-none px-6 pb-1 pt-6 md:pb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900",
                                    children: playerInfo.teamLogoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: playerInfo.teamLogoUrl,
                                        alt: playerInfo.teamName,
                                        width: 48,
                                        height: 48,
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-xl font-semibold text-slate-900 dark:text-slate-50",
                                                    children: playerInfo.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "success",
                                                    children: playerInfo.position
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "default",
                                                    children: [
                                                        "B/T: ",
                                                        playerInfo.bats,
                                                        "/",
                                                        playerInfo.throws
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 17
                                                }, this),
                                                isFavorite ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "default",
                                                    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-100",
                                                    children: "Favorited"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-600 dark:text-slate-400",
                                            children: playerInfo.teamName
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                size: "sm",
                                onClick: onToggleFavorite,
                                children: isFavorite ? "Unfavorite" : "Favorite"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "px-6 pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            label: "Season",
                            value: season,
                            onChange: (event)=>onSeasonChange(event.target.value),
                            children: seasonOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: option,
                                    children: option
                                }, option, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            label: "Split",
                            value: split,
                            onChange: (event)=>onSplitChange(event.target.value),
                            children: splitOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: option,
                                    children: option
                                }, option, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerHeader.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = PlayerHeader;
var _c;
__turbopack_context__.k.register(_c, "PlayerHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerHrEventsTable",
    ()=>PlayerHrEventsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Table.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PlayerHrEventsTable({ rows }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("distance");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(8);
    const filteredRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerHrEventsTable.useMemo[filteredRows]": ()=>{
            const query = searchQuery.trim().toLowerCase();
            if (!query) return rows;
            return rows.filter({
                "PlayerHrEventsTable.useMemo[filteredRows]": (row)=>row.opponent.toLowerCase().includes(query) || row.park.toLowerCase().includes(query) || row.pitchType.toLowerCase().includes(query)
            }["PlayerHrEventsTable.useMemo[filteredRows]"]);
        }
    }["PlayerHrEventsTable.useMemo[filteredRows]"], [
        rows,
        searchQuery
    ]);
    const sortedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerHrEventsTable.useMemo[sortedRows]": ()=>{
            const sorted = [
                ...filteredRows
            ].sort({
                "PlayerHrEventsTable.useMemo[sortedRows].sorted": (a, b)=>{
                    const aValue = a[sortBy];
                    const bValue = b[sortBy];
                    if (aValue === bValue) return 0;
                    const base = aValue < bValue ? -1 : 1;
                    return sortDirection === "asc" ? base : -base;
                }
            }["PlayerHrEventsTable.useMemo[sortedRows].sorted"]);
            return sorted;
        }
    }["PlayerHrEventsTable.useMemo[sortedRows]"], [
        filteredRows,
        sortBy,
        sortDirection
    ]);
    const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageRows = sortedRows.slice(start, start + pageSize);
    const handleSort = (key)=>{
        if (key === sortBy) {
            setSortDirection((prev)=>prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDirection("desc");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                children: "Home Run Events"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: "Distance, EV, and pitch details for each HR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: searchQuery,
                                onChange: (event)=>{
                                    setSearchQuery(event.target.value);
                                    setPage(1);
                                },
                                placeholder: "Search opponent, park, or pitch",
                                className: "h-10 w-64 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: sortBy,
                                onChange: (event)=>handleSort(event.target.value),
                                className: "w-40",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "distance",
                                        children: "Distance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ev",
                                        children: "Exit Velocity"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "date",
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thead"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Opponent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Park"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Inning"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Pitch"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Velo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Distance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "EV"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "LA"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tbody"], {
                            children: pageRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.date
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "font-semibold text-slate-900 dark:text-slate-50",
                                            children: row.opponent
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: row.park
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: row.inning
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: row.pitchType
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: [
                                                row.pitchVelocity.toFixed(1),
                                                " mph"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-900 dark:text-slate-50",
                                            children: [
                                                row.distance.toFixed(0),
                                                " ft"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-900 dark:text-slate-50",
                                            children: [
                                                row.ev.toFixed(1),
                                                " mph"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-700 dark:text-slate-200",
                                            children: [
                                                row.launchAngle,
                                                "°"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.id, true, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700 dark:text-slate-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: "Rows per page"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: pageSize,
                                onChange: (event)=>{
                                    setPageSize(Number(event.target.value));
                                    setPage(1);
                                },
                                className: "h-9 w-20",
                                children: [
                                    8,
                                    12,
                                    16
                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: size,
                                        children: size
                                    }, size, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: ()=>setPage((prev)=>Math.max(1, prev - 1)),
                                disabled: currentPage === 1,
                                variant: "secondary",
                                size: "sm",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-slate-600 dark:text-slate-300",
                                children: [
                                    "Page ",
                                    currentPage,
                                    " of ",
                                    totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: ()=>setPage((prev)=>Math.min(totalPages, prev + 1)),
                                disabled: currentPage === totalPages,
                                variant: "secondary",
                                size: "sm",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(PlayerHrEventsTable, "7JTnpRMlMHTbWuSl+iLEzcVtLoo=");
_c = PlayerHrEventsTable;
var _c;
__turbopack_context__.k.register(_c, "PlayerHrEventsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerHrTrendCard",
    ()=>PlayerHrTrendCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function PlayerHrTrendCard({ data }) {
    _s();
    const [activeMetric, setActiveMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("hr");
    const metricLabel = {
        hr: "HR",
        xHr: "xHR",
        avgEv: "Avg EV",
        barrels: "Barrels"
    };
    const maxValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerHrTrendCard.useMemo[maxValue]": ()=>{
            if (data.length === 0) return 1;
            return Math.max(...data.map({
                "PlayerHrTrendCard.useMemo[maxValue]": (point)=>point[activeMetric]
            }["PlayerHrTrendCard.useMemo[maxValue]"]));
        }
    }["PlayerHrTrendCard.useMemo[maxValue]"], [
        activeMetric,
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                children: "Player HR Trend"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: "Game-by-game HR + quality of contact (mock data)"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            "hr",
                            "xHr",
                            "avgEv",
                            "barrels"
                        ].map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                size: "sm",
                                variant: activeMetric === metric ? "primary" : "ghost",
                                onClick: ()=>setActiveMetric(metric),
                                children: metricLabel[metric]
                            }, metric, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-5 text-xs font-semibold text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "HR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "xHR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "Avg EV"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: metricLabel[activeMetric]
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: data.map((point)=>{
                            const value = point[activeMetric];
                            const barWidth = Math.max(8, value / maxValue * 100);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-5 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-700 dark:text-slate-200",
                                        children: point.date
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                        lineNumber: 74,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right font-semibold text-slate-900 dark:text-slate-50",
                                        children: point.hr.toFixed(0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right text-slate-700 dark:text-slate-200",
                                        children: point.xHr.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right text-slate-700 dark:text-slate-200",
                                        children: point.avgEv.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-end gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900 dark:text-slate-50",
                                                children: activeMetric === "avgEv" ? value.toFixed(1) : value.toFixed(0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                                lineNumber: 85,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 rounded-full bg-slate-300 dark:bg-slate-700",
                                                style: {
                                                    width: `${barWidth}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, point.date, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(PlayerHrTrendCard, "06sI9CJu7HjQv0LZM5cDAJQu6Ck=");
_c = PlayerHrTrendCard;
var _c;
__turbopack_context__.k.register(_c, "PlayerHrTrendCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerKeyMetricsRow",
    ()=>PlayerKeyMetricsRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
;
;
;
function PlayerKeyMetricsRow({ metrics }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        children: metrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                metric: metric
            }, metric.id, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = PlayerKeyMetricsRow;
function MetricCard({ metric }) {
    const { label, value, comparisonText, trendDirection } = metric;
    const trendSymbol = trendDirection === "up" ? "▲" : trendDirection === "down" ? "▼" : undefined;
    const trendColor = trendDirection === "up" ? "text-emerald-600" : trendDirection === "down" ? "text-rose-600" : "text-slate-500";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
            className: "px-4 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 flex items-baseline gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-2xl font-semibold text-slate-900 dark:text-slate-50",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        trendSymbol && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            className: `${trendColor} bg-transparent px-2 py-1`,
                            children: trendSymbol
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                comparisonText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-slate-600 dark:text-slate-300",
                    children: comparisonText
                }, void 0, false, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = MetricCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "PlayerKeyMetricsRow");
__turbopack_context__.k.register(_c1, "MetricCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerParkProfileCard",
    ()=>PlayerParkProfileCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function PlayerParkProfileCard({ rows }) {
    const sorted = [
        ...rows
    ].sort((a, b)=>b.hrAtPark - a.hrAtPark);
    const topFactor = Math.max(...rows.map((row)=>row.parkHrFactor));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                            children: "Park HR Profile"
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-600 dark:text-slate-300",
                            children: "Park factors and home run distribution"
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thead"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Park"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "HR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "HR/PA"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "HR Factor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tbody"], {
                            children: sorted.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "font-semibold text-slate-900 dark:text-slate-50",
                                            children: row.parkName
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.hrAtPark
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                            lineNumber: 45,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.hrPerPaAtPark.toFixed(3)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                            lineNumber: 46,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    row.parkHrFactor.toFixed(2),
                                                    row.parkHrFactor === topFactor ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "success",
                                                        children: "Hot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                                lineNumber: 48,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                            lineNumber: 47,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.parkName, true, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = PlayerParkProfileCard;
var _c;
__turbopack_context__.k.register(_c, "PlayerParkProfileCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerPitchDamageCard",
    ()=>PlayerPitchDamageCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Table.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PlayerPitchDamageCard({ rows }) {
    _s();
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("hr");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const sortedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerPitchDamageCard.useMemo[sortedRows]": ()=>{
            return [
                ...rows
            ].sort({
                "PlayerPitchDamageCard.useMemo[sortedRows]": (a, b)=>{
                    const valueA = a[sortBy];
                    const valueB = b[sortBy];
                    if (valueA === valueB) return 0;
                    const base = valueA < valueB ? -1 : 1;
                    return sortDirection === "asc" ? base : -base;
                }
            }["PlayerPitchDamageCard.useMemo[sortedRows]"]);
        }
    }["PlayerPitchDamageCard.useMemo[sortedRows]"], [
        rows,
        sortBy,
        sortDirection
    ]);
    const handleSortChange = (key)=>{
        if (key === sortBy) {
            setSortDirection((prev)=>prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDirection("desc");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                children: "Damage by Pitch Type"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: "HR impact and quality of contact by pitch category"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: sortBy,
                        onChange: (event)=>handleSortChange(event.target.value),
                        className: "w-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "hr",
                                children: "HR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "hrPer100Pitches",
                                children: "HR / 100 Pitches"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "avgEv",
                                children: "Avg EV"
                            }, void 0, false, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thead"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Pitch"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "HR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "HR / 100 P"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Avg EV"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                        children: "Max Dist"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tbody"], {
                            children: sortedRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "font-semibold text-slate-900 dark:text-slate-50",
                                            children: row.pitchType
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.hr.toFixed(0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: row.hrPer100Pitches.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: [
                                                row.avgEv.toFixed(1),
                                                " mph"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                            className: "text-slate-800 dark:text-slate-200",
                                            children: [
                                                row.maxDistance.toFixed(0),
                                                " ft"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.pitchType, true, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(PlayerPitchDamageCard, "Fe7N7ry+GdzRG6TOjRB8kb3+JeY=");
_c = PlayerPitchDamageCard;
var _c;
__turbopack_context__.k.register(_c, "PlayerPitchDamageCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tab",
    ()=>Tab,
    "TabList",
    ()=>TabList,
    "TabPanel",
    ()=>TabPanel,
    "Tabs",
    ()=>Tabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
const TabsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function Tabs({ children, defaultValue, className = "" }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Tabs.useMemo[value]": ()=>({
                activeTab,
                setActiveTab
            })
    }["Tabs.useMemo[value]"], [
        activeTab
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabsContext.Provider, {
        value: value,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full ${className}`,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Tabs.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(Tabs, "1Q/Za+r35Xn8Nzy/tZwdK4s1X0Y=");
_c = Tabs;
function TabList({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap gap-2 ${className}`,
        role: "tablist",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c1 = TabList;
function Tab({ value, children }) {
    _s1();
    const ctx = useTabsContext();
    const isActive = ctx.activeTab === value;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        role: "tab",
        "aria-selected": isActive,
        onClick: ()=>ctx.setActiveTab(value),
        className: `rounded-full px-3 py-2 text-xs font-semibold transition ${isActive ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s1(Tab, "OJJqOcYgCNNB/RyPo0SOZHCVg8A=", false, function() {
    return [
        useTabsContext
    ];
});
_c2 = Tab;
function TabPanel({ value, children }) {
    _s2();
    const ctx = useTabsContext();
    if (ctx.activeTab !== value) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Tabs.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, this);
}
_s2(TabPanel, "OJJqOcYgCNNB/RyPo0SOZHCVg8A=", false, function() {
    return [
        useTabsContext
    ];
});
_c3 = TabPanel;
function useTabsContext() {
    _s3();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TabsContext);
    if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
    return ctx;
}
_s3(useTabsContext, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabList");
__turbopack_context__.k.register(_c2, "Tab");
__turbopack_context__.k.register(_c3, "TabPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerSplitsCard",
    ()=>PlayerSplitsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Tabs.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function PlayerSplitsCard({ overview, homeAway, lhpRhp, monthly }) {
    const tabData = {
        overview: {
            label: "Overview",
            rows: overview
        },
        homeAway: {
            label: "Home vs Away",
            rows: homeAway
        },
        lhpRhp: {
            label: "LHP vs RHP",
            rows: lhpRhp
        },
        monthly: {
            label: "Monthly",
            rows: monthly
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
            defaultValue: "overview",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                    children: "Player Splits"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 dark:text-slate-300",
                                    children: "HR/PA by split"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabList"], {
                            className: "justify-end",
                            children: Object.keys(tabData).map((tabKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tab"], {
                                    value: tabKey,
                                    children: tabData[tabKey].label
                                }, tabKey, false, {
                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardBody"], {
                    className: "overflow-hidden rounded-lg border border-slate-100 p-0 dark:border-slate-800",
                    children: Object.keys(tabData).map((tabKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabPanel"], {
                            value: tabKey,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thead"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                                    children: "Split"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                                    children: "HR"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                                    children: "PA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Th"], {
                                                    children: "HR/PA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                            lineNumber: 56,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tbody"], {
                                        children: tabData[tabKey].rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tr"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                                        className: "font-semibold text-slate-900 dark:text-slate-50",
                                                        children: row.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                                        className: "text-slate-800 dark:text-slate-200",
                                                        children: row.hr
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                                        className: "text-slate-800 dark:text-slate-200",
                                                        children: row.pa
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Td"], {
                                                        className: "text-slate-800 dark:text-slate-200",
                                                        children: row.hrPerPa.toFixed(3)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, row.label, true, {
                                                fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this)
                        }, tabKey, false, {
                            fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c = PlayerSplitsCard;
var _c;
__turbopack_context__.k.register(_c, "PlayerSplitsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/mock/playerDashboardData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultDateRange",
    ()=>defaultDateRange,
    "defaultPitchType",
    ()=>defaultPitchType,
    "defaultPitcherHand",
    ()=>defaultPitcherHand,
    "defaultSeason",
    ()=>defaultSeason,
    "defaultSplit",
    ()=>defaultSplit,
    "parkProfileRows",
    ()=>parkProfileRows,
    "pitchDamageRows",
    ()=>pitchDamageRows,
    "playerGameLogRows",
    ()=>playerGameLogRows,
    "playerHrEventRows",
    ()=>playerHrEventRows,
    "playerHrTimeSeries",
    ()=>playerHrTimeSeries,
    "playerInfo",
    ()=>playerInfo,
    "playerKeyMetrics",
    ()=>playerKeyMetrics,
    "playerSplitsHomeAway",
    ()=>playerSplitsHomeAway,
    "playerSplitsLhpRhp",
    ()=>playerSplitsLhpRhp,
    "playerSplitsMonthly",
    ()=>playerSplitsMonthly,
    "playerSplitsOverview",
    ()=>playerSplitsOverview
]);
const playerInfo = {
    playerId: "aaron-judge",
    name: "Aaron Judge",
    teamName: "New York Yankees",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
    position: "RF",
    bats: "R",
    throws: "R"
};
const playerKeyMetrics = [
    {
        id: "hr-total",
        label: "HR",
        value: "17",
        comparisonText: "Leads AL",
        trendDirection: "up"
    },
    {
        id: "hr-per-game",
        label: "HR/G",
        value: "0.42",
        comparisonText: "Last 30 games",
        trendDirection: "up"
    },
    {
        id: "hr-per-pa",
        label: "HR/PA",
        value: "7.8%",
        comparisonText: "Career avg 6.6%",
        trendDirection: "up"
    },
    {
        id: "max-ev",
        label: "Max EV",
        value: "117.3 mph",
        comparisonText: "Top 1%",
        trendDirection: "flat"
    }
];
const playerHrTimeSeries = [
    {
        date: "2025-04-02",
        hr: 1,
        xHr: 0.8,
        avgEv: 109.2,
        barrels: 2
    },
    {
        date: "2025-04-04",
        hr: 0,
        xHr: 0.3,
        avgEv: 98.1,
        barrels: 0
    },
    {
        date: "2025-04-06",
        hr: 2,
        xHr: 1.5,
        avgEv: 110.5,
        barrels: 3
    },
    {
        date: "2025-04-09",
        hr: 1,
        xHr: 0.9,
        avgEv: 106.8,
        barrels: 2
    },
    {
        date: "2025-04-12",
        hr: 0,
        xHr: 0.4,
        avgEv: 97.5,
        barrels: 1
    },
    {
        date: "2025-04-15",
        hr: 1,
        xHr: 1.1,
        avgEv: 108.3,
        barrels: 2
    },
    {
        date: "2025-04-18",
        hr: 0,
        xHr: 0.6,
        avgEv: 99.7,
        barrels: 1
    },
    {
        date: "2025-04-21",
        hr: 1,
        xHr: 0.9,
        avgEv: 107.1,
        barrels: 2
    },
    {
        date: "2025-04-24",
        hr: 2,
        xHr: 1.6,
        avgEv: 111.0,
        barrels: 3
    },
    {
        date: "2025-04-27",
        hr: 0,
        xHr: 0.5,
        avgEv: 96.9,
        barrels: 1
    },
    {
        date: "2025-04-30",
        hr: 1,
        xHr: 1.0,
        avgEv: 108.8,
        barrels: 2
    },
    {
        date: "2025-05-03",
        hr: 2,
        xHr: 1.7,
        avgEv: 112.2,
        barrels: 4
    },
    {
        date: "2025-05-06",
        hr: 1,
        xHr: 1.2,
        avgEv: 109.6,
        barrels: 2
    },
    {
        date: "2025-05-09",
        hr: 0,
        xHr: 0.4,
        avgEv: 97.8,
        barrels: 1
    },
    {
        date: "2025-05-12",
        hr: 1,
        xHr: 1.0,
        avgEv: 107.9,
        barrels: 2
    },
    {
        date: "2025-05-15",
        hr: 2,
        xHr: 1.5,
        avgEv: 111.4,
        barrels: 3
    },
    {
        date: "2025-05-18",
        hr: 1,
        xHr: 0.9,
        avgEv: 106.2,
        barrels: 2
    },
    {
        date: "2025-05-21",
        hr: 0,
        xHr: 0.5,
        avgEv: 98.4,
        barrels: 1
    }
];
const pitchDamageRows = [
    {
        pitchType: "4-Seam",
        hr: 9,
        avgEv: 109.5,
        maxDistance: 440,
        hrPer100Pitches: 3.2
    },
    {
        pitchType: "Slider",
        hr: 4,
        avgEv: 107.1,
        maxDistance: 428,
        hrPer100Pitches: 2.6
    },
    {
        pitchType: "Sinker",
        hr: 2,
        avgEv: 110.3,
        maxDistance: 435,
        hrPer100Pitches: 2.1
    },
    {
        pitchType: "Curveball",
        hr: 1,
        avgEv: 104.8,
        maxDistance: 410,
        hrPer100Pitches: 1.4
    },
    {
        pitchType: "Changeup",
        hr: 1,
        avgEv: 103.2,
        maxDistance: 399,
        hrPer100Pitches: 1.0
    },
    {
        pitchType: "Cutter",
        hr: 0,
        avgEv: 101.0,
        maxDistance: 385,
        hrPer100Pitches: 0.0
    }
];
const parkProfileRows = [
    {
        parkName: "Yankee Stadium",
        hrAtPark: 9,
        hrPerPaAtPark: 0.082,
        parkHrFactor: 1.21
    },
    {
        parkName: "Fenway Park",
        hrAtPark: 3,
        hrPerPaAtPark: 0.065,
        parkHrFactor: 1.08
    },
    {
        parkName: "Camden Yards",
        hrAtPark: 2,
        hrPerPaAtPark: 0.060,
        parkHrFactor: 0.96
    },
    {
        parkName: "Rogers Centre",
        hrAtPark: 2,
        hrPerPaAtPark: 0.061,
        parkHrFactor: 1.05
    },
    {
        parkName: "Dodger Stadium",
        hrAtPark: 1,
        hrPerPaAtPark: 0.054,
        parkHrFactor: 0.98
    }
];
const playerSplitsOverview = [
    {
        label: "Overall",
        hr: 17,
        pa: 218,
        hrPerPa: 0.078
    },
    {
        label: "Last 30 games",
        hr: 13,
        pa: 154,
        hrPerPa: 0.084
    },
    {
        label: "Last 14 games",
        hr: 6,
        pa: 75,
        hrPerPa: 0.080
    }
];
const playerSplitsHomeAway = [
    {
        label: "Home",
        hr: 9,
        pa: 110,
        hrPerPa: 0.082
    },
    {
        label: "Away",
        hr: 8,
        pa: 108,
        hrPerPa: 0.074
    }
];
const playerSplitsLhpRhp = [
    {
        label: "vs LHP",
        hr: 6,
        pa: 68,
        hrPerPa: 0.088
    },
    {
        label: "vs RHP",
        hr: 11,
        pa: 150,
        hrPerPa: 0.073
    }
];
const playerSplitsMonthly = [
    {
        label: "March/April",
        hr: 11,
        pa: 140,
        hrPerPa: 0.079
    },
    {
        label: "May",
        hr: 6,
        pa: 78,
        hrPerPa: 0.077
    }
];
const playerGameLogRows = [
    {
        id: "nyy-2025-04-02-bos-judge",
        date: "2025-04-02",
        opponent: "BOS",
        park: "Yankee Stadium",
        result: "W 6-3",
        ab: 4,
        pa: 5,
        hr: 1,
        rbi: 2,
        bb: 1,
        k: 1
    },
    {
        id: "nyy-2025-04-04-bos-judge",
        date: "2025-04-04",
        opponent: "BOS",
        park: "Yankee Stadium",
        result: "L 2-4",
        ab: 4,
        pa: 4,
        hr: 0,
        rbi: 0,
        bb: 0,
        k: 2
    },
    {
        id: "nyy-2025-04-06-kc-judge",
        date: "2025-04-06",
        opponent: "KC",
        park: "Kauffman Stadium",
        result: "W 7-2",
        ab: 5,
        pa: 5,
        hr: 2,
        rbi: 4,
        bb: 0,
        k: 1
    },
    {
        id: "nyy-2025-04-09-tor-judge",
        date: "2025-04-09",
        opponent: "TOR",
        park: "Rogers Centre",
        result: "W 5-3",
        ab: 4,
        pa: 4,
        hr: 1,
        rbi: 2,
        bb: 0,
        k: 1
    },
    {
        id: "nyy-2025-04-12-min-judge",
        date: "2025-04-12",
        opponent: "MIN",
        park: "Target Field",
        result: "L 3-5",
        ab: 4,
        pa: 5,
        hr: 0,
        rbi: 1,
        bb: 1,
        k: 2
    },
    {
        id: "nyy-2025-04-15-tex-judge",
        date: "2025-04-15",
        opponent: "TEX",
        park: "Globe Life Field",
        result: "W 4-2",
        ab: 4,
        pa: 5,
        hr: 1,
        rbi: 2,
        bb: 1,
        k: 0
    },
    {
        id: "nyy-2025-04-18-bal-judge",
        date: "2025-04-18",
        opponent: "BAL",
        park: "Yankee Stadium",
        result: "W 6-2",
        ab: 5,
        pa: 5,
        hr: 0,
        rbi: 0,
        bb: 0,
        k: 2
    },
    {
        id: "nyy-2025-04-21-bal-judge",
        date: "2025-04-21",
        opponent: "BAL",
        park: "Yankee Stadium",
        result: "L 3-5",
        ab: 4,
        pa: 4,
        hr: 1,
        rbi: 1,
        bb: 0,
        k: 1
    },
    {
        id: "nyy-2025-04-24-laa-judge",
        date: "2025-04-24",
        opponent: "LAA",
        park: "Angel Stadium",
        result: "W 8-4",
        ab: 5,
        pa: 5,
        hr: 2,
        rbi: 5,
        bb: 0,
        k: 0
    },
    {
        id: "nyy-2025-04-27-lad-judge",
        date: "2025-04-27",
        opponent: "LAD",
        park: "Dodger Stadium",
        result: "W 5-3",
        ab: 4,
        pa: 4,
        hr: 0,
        rbi: 0,
        bb: 0,
        k: 2
    },
    {
        id: "nyy-2025-04-30-sea-judge",
        date: "2025-04-30",
        opponent: "SEA",
        park: "T-Mobile Park",
        result: "L 2-3",
        ab: 4,
        pa: 4,
        hr: 1,
        rbi: 2,
        bb: 0,
        k: 1
    },
    {
        id: "nyy-2025-05-03-oak-judge",
        date: "2025-05-03",
        opponent: "OAK",
        park: "Oakland Coliseum",
        result: "W 6-1",
        ab: 4,
        pa: 5,
        hr: 2,
        rbi: 3,
        bb: 1,
        k: 0
    },
    {
        id: "nyy-2025-05-06-ari-judge",
        date: "2025-05-06",
        opponent: "ARI",
        park: "Chase Field",
        result: "W 5-4",
        ab: 4,
        pa: 5,
        hr: 1,
        rbi: 2,
        bb: 1,
        k: 1
    },
    {
        id: "nyy-2025-05-09-col-judge",
        date: "2025-05-09",
        opponent: "COL",
        park: "Coors Field",
        result: "W 7-5",
        ab: 5,
        pa: 5,
        hr: 0,
        rbi: 0,
        bb: 0,
        k: 2
    },
    {
        id: "nyy-2025-05-12-phi-judge",
        date: "2025-05-12",
        opponent: "PHI",
        park: "Citizens Bank Park",
        result: "L 3-6",
        ab: 4,
        pa: 5,
        hr: 1,
        rbi: 1,
        bb: 1,
        k: 1
    },
    {
        id: "nyy-2025-05-15-phi-judge",
        date: "2025-05-15",
        opponent: "PHI",
        park: "Citizens Bank Park",
        result: "W 6-4",
        ab: 4,
        pa: 4,
        hr: 2,
        rbi: 3,
        bb: 0,
        k: 0
    },
    {
        id: "nyy-2025-05-18-det-judge",
        date: "2025-05-18",
        opponent: "DET",
        park: "Comerica Park",
        result: "L 2-3",
        ab: 4,
        pa: 4,
        hr: 1,
        rbi: 1,
        bb: 0,
        k: 1
    },
    {
        id: "nyy-2025-05-21-det-judge",
        date: "2025-05-21",
        opponent: "DET",
        park: "Comerica Park",
        result: "W 5-2",
        ab: 4,
        pa: 5,
        hr: 0,
        rbi: 1,
        bb: 1,
        k: 1
    }
];
const playerHrEventRows = [
    {
        id: "hr-2025-04-02-bos",
        date: "2025-04-02",
        opponent: "BOS",
        park: "Yankee Stadium",
        inning: "3rd",
        pitchType: "4-Seam",
        pitchVelocity: 96.8,
        distance: 421,
        ev: 110.3,
        launchAngle: 28,
        pitcherHand: "R"
    },
    {
        id: "hr-2025-04-06-kc-1",
        date: "2025-04-06",
        opponent: "KC",
        park: "Kauffman Stadium",
        inning: "1st",
        pitchType: "Slider",
        pitchVelocity: 85.1,
        distance: 429,
        ev: 112.1,
        launchAngle: 30,
        pitcherHand: "L"
    },
    {
        id: "hr-2025-04-06-kc-2",
        date: "2025-04-06",
        opponent: "KC",
        park: "Kauffman Stadium",
        inning: "6th",
        pitchType: "4-Seam",
        pitchVelocity: 97.3,
        distance: 437,
        ev: 114.5,
        launchAngle: 27,
        pitcherHand: "R"
    },
    {
        id: "hr-2025-04-09-tor",
        date: "2025-04-09",
        opponent: "TOR",
        park: "Rogers Centre",
        inning: "8th",
        pitchType: "Sinker",
        pitchVelocity: 94.2,
        distance: 409,
        ev: 109.8,
        launchAngle: 31,
        pitcherHand: "R"
    },
    {
        id: "hr-2025-04-15-tex",
        date: "2025-04-15",
        opponent: "TEX",
        park: "Globe Life Field",
        inning: "4th",
        pitchType: "Changeup",
        pitchVelocity: 86.5,
        distance: 402,
        ev: 107.0,
        launchAngle: 26,
        pitcherHand: "R"
    },
    {
        id: "hr-2025-04-21-bal",
        date: "2025-04-21",
        opponent: "BAL",
        park: "Yankee Stadium",
        inning: "5th",
        pitchType: "Curveball",
        pitchVelocity: 78.4,
        distance: 390,
        ev: 103.5,
        launchAngle: 35,
        pitcherHand: "R"
    },
    {
        id: "hr-2025-04-24-laa",
        date: "2025-04-24",
        opponent: "LAA",
        park: "Angel Stadium",
        inning: "2nd",
        pitchType: "4-Seam",
        pitchVelocity: 95.5,
        distance: 431,
        ev: 111.7,
        launchAngle: 29,
        pitcherHand: "L"
    },
    {
        id: "hr-2025-05-03-oak",
        date: "2025-05-03",
        opponent: "OAK",
        park: "Oakland Coliseum",
        inning: "7th",
        pitchType: "Slider",
        pitchVelocity: 84.6,
        distance: 415,
        ev: 109.2,
        launchAngle: 32,
        pitcherHand: "L"
    }
];
const defaultSeason = "2025";
const defaultSplit = "Full Season";
const defaultDateRange = "Last 30 days";
const defaultPitchType = "All";
const defaultPitcherHand = "All";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerHrDashboardPage",
    ()=>PlayerHrDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$FavoritesContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/FavoritesContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerFiltersStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerFiltersStrip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerGameLogTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerGameLogTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHrEventsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerHrEventsTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHrTrendCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerHrTrendCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerKeyMetricsRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerKeyMetricsRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerParkProfileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerParkProfileCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerPitchDamageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerPitchDamageCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerSplitsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/components/PlayerSplitsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/player-dashboard/mock/playerDashboardData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function PlayerHrDashboardPage() {
    _s();
    const { favoritePlayers, togglePlayerFavorite, defaults, setDefaults } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$FavoritesContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavorites"])();
    const [season, setSeason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaults.playerDashboardFilters?.season ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSeason"]);
    const [split, setSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaults.playerDashboardFilters?.split ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultSplit"]);
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaults.playerDashboardFilters?.dateRange ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultDateRange"]);
    const [pitchType, setPitchType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaults.playerDashboardFilters?.pitchType ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPitchType"]);
    const [pitcherHand, setPitcherHand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPitcherHand"]);
    const isFavorite = favoritePlayers.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerInfo"].playerId);
    const filteredPitchDamage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerHrDashboardPage.useMemo[filteredPitchDamage]": ()=>{
            if (pitchType === "All") return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pitchDamageRows"];
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pitchDamageRows"].filter({
                "PlayerHrDashboardPage.useMemo[filteredPitchDamage]": (row)=>row.pitchType === pitchType
            }["PlayerHrDashboardPage.useMemo[filteredPitchDamage]"]);
        }
    }["PlayerHrDashboardPage.useMemo[filteredPitchDamage]"], [
        pitchType
    ]);
    const filteredHrEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlayerHrDashboardPage.useMemo[filteredHrEvents]": ()=>{
            let rows = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerHrEventRows"];
            if (pitcherHand !== "All") {
                rows = rows.filter({
                    "PlayerHrDashboardPage.useMemo[filteredHrEvents]": (row)=>row.pitcherHand === (pitcherHand === "vs LHP" ? "L" : "R")
                }["PlayerHrDashboardPage.useMemo[filteredHrEvents]"]);
            }
            if (pitchType !== "All") {
                rows = rows.filter({
                    "PlayerHrDashboardPage.useMemo[filteredHrEvents]": (row)=>row.pitchType === pitchType
                }["PlayerHrDashboardPage.useMemo[filteredHrEvents]"]);
            }
            return rows;
        }
    }["PlayerHrDashboardPage.useMemo[filteredHrEvents]"], [
        pitchType,
        pitcherHand
    ]);
    const handleResetFilters = ()=>{
        setDateRange(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultDateRange"]);
        setPitchType(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPitchType"]);
        setPitcherHand(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPitcherHand"]);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayerHrDashboardPage.useEffect": ()=>{
            setDefaults({
                "PlayerHrDashboardPage.useEffect": (prev)=>({
                        ...prev,
                        playerId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerInfo"].playerId,
                        playerDashboardFilters: {
                            ...prev.playerDashboardFilters,
                            season,
                            split,
                            dateRange,
                            pitchType
                        }
                    })
            }["PlayerHrDashboardPage.useEffect"]);
        }
    }["PlayerHrDashboardPage.useEffect"], [
        dateRange,
        pitchType,
        season,
        setDefaults,
        split
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerHeader"], {
                playerInfo: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerInfo"],
                season: season,
                onSeasonChange: setSeason,
                split: split,
                onSplitChange: setSplit,
                isFavorite: isFavorite,
                onToggleFavorite: ()=>togglePlayerFavorite(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerInfo"].playerId)
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerFiltersStrip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerFiltersStrip"], {
                dateRange: dateRange,
                onDateRangeChange: setDateRange,
                pitchType: pitchType,
                onPitchTypeChange: setPitchType,
                pitcherHand: pitcherHand,
                onPitcherHandChange: setPitcherHand,
                onResetFilters: handleResetFilters
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerKeyMetricsRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerKeyMetricsRow"], {
                metrics: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerKeyMetrics"]
            }, void 0, false, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHrTrendCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerHrTrendCard"], {
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerHrTimeSeries"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerPitchDamageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerPitchDamageCard"], {
                        rows: filteredPitchDamage
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerParkProfileCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerParkProfileCard"], {
                        rows: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parkProfileRows"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerSplitsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerSplitsCard"], {
                        overview: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerSplitsOverview"],
                        homeAway: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerSplitsHomeAway"],
                        lhpRhp: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerSplitsLhpRhp"],
                        monthly: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerSplitsMonthly"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerGameLogTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerGameLogTable"], {
                        rows: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$mock$2f$playerDashboardData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["playerGameLogRows"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$player$2d$dashboard$2f$components$2f$PlayerHrEventsTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerHrEventsTable"], {
                        rows: filteredHrEvents
                    }, void 0, false, {
                        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/player-dashboard/PlayerHrDashboardPage.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(PlayerHrDashboardPage, "dk2dDzCiNqAg+aJavlZwR3WaxFs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$FavoritesContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavorites"]
    ];
});
_c = PlayerHrDashboardPage;
var _c;
__turbopack_context__.k.register(_c, "PlayerHrDashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a80510b9._.js.map
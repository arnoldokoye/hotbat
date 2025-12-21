module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamFiltersStrip",
    ()=>TeamFiltersStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const dateRangeOptions = [
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Season to date"
];
const pitcherHandOptions = [
    "All",
    "vs LHP",
    "vs RHP"
];
function TeamFiltersStrip({ dateRange, onDateRangeChange, pitcherHand, onPitcherHandChange, minPA, onMinPAChange, onResetFilters }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterField, {
                    label: "Date Range",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: dateRange,
                        onChange: (event)=>onDateRangeChange(event.target.value),
                        className: "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                        children: dateRangeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterField, {
                    label: "Vs Pitcher Hand",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: pitcherHand,
                        onChange: (event)=>onPitcherHandChange(event.target.value),
                        className: "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                        children: pitcherHandOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterField, {
                    label: "Min PA",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        min: 0,
                        value: minPA,
                        onChange: (event)=>onMinPAChange(Number(event.target.value)),
                        className: "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-end gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50",
                            children: "Advanced Filters"
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onResetFilters,
                            className: "inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800",
                            children: "Reset"
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function FilterField({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "flex flex-col gap-1 text-sm font-medium text-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/TeamHeader.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamHeader",
    ()=>TeamHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
const seasonOptions = [
    "2025",
    "2024",
    "2023",
    "All Seasons"
];
const splitOptions = [
    "Full Season",
    "Last 30 Days",
    "Last 14 Days",
    "Post-ASB"
];
const parkOptions = [
    "All Parks",
    "Yankee Stadium",
    "Fenway Park",
    "Camden Yards"
];
const homeAwayOptions = [
    "All Games",
    "Home",
    "Away"
];
function TeamHeader({ teamInfo, season, onSeasonChange, split, onSplitChange, park, onParkChange, homeAway, onHomeAwayChange, isFavorite, onToggleFavorite }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                src: teamInfo.teamLogoUrl,
                                alt: teamInfo.teamName,
                                width: 48,
                                height: 48,
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-semibold text-slate-900",
                                            children: teamInfo.teamName
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onToggleFavorite,
                                            className: "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-amber-500 shadow-sm transition hover:border-amber-300 hover:bg-amber-50",
                                            "aria-label": isFavorite ? "Remove from favorites" : "Save as favorite",
                                            children: isFavorite ? "★" : "☆"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600",
                                    children: [
                                        teamInfo.league,
                                        " · ",
                                        teamInfo.division
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid w-full gap-3 sm:grid-cols-2 md:w-auto md:grid-cols-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                            label: "Season",
                            value: season,
                            onChange: (value)=>onSeasonChange(value),
                            options: seasonOptions
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                            label: "Split",
                            value: split,
                            onChange: (value)=>onSplitChange(value),
                            options: splitOptions
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                            label: "Park",
                            value: park,
                            onChange: (value)=>onParkChange(value),
                            options: parkOptions
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                            label: "Home/Away",
                            value: homeAway,
                            onChange: (value)=>onHomeAwayChange(value),
                            options: homeAwayOptions
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function Select({ label, value, options, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "flex flex-col gap-1 text-sm font-medium text-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (event)=>onChange(event.target.value),
                className: "h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: option,
                        children: option
                    }, option, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/TeamHeader.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamKeyMetricsRow",
    ()=>TeamKeyMetricsRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function TeamKeyMetricsRow({ metrics }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
        children: metrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                metric: metric
            }, metric.id, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
function MetricCard({ metric }) {
    const { label, value, comparisonText, trendDirection, trendValue } = metric;
    const trendSymbol = trendDirection === "up" ? "▲" : trendDirection === "down" ? "▼" : "•";
    const trendColor = trendDirection === "up" ? "text-emerald-600" : trendDirection === "down" ? "text-rose-600" : "text-slate-500";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex items-baseline gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-semibold text-slate-900",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    trendValue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-semibold ${trendColor}`,
                        children: [
                            trendSymbol,
                            " ",
                            trendValue
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-slate-600",
                children: comparisonText
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/GameHrTable.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameHrTable",
    ()=>GameHrTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
function GameHrTable({ rows }) {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("date");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(10);
    const filteredRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const query = searchQuery.trim().toLowerCase();
        if (!query) return rows;
        return rows.filter((row)=>row.opponent.toLowerCase().includes(query) || row.park.toLowerCase().includes(query));
    }, [
        rows,
        searchQuery
    ]);
    const sortedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const sorted = [
            ...filteredRows
        ].sort((a, b)=>{
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (aValue === bValue) return 0;
            const base = aValue < bValue ? -1 : 1;
            return sortDirection === "asc" ? base : -base;
        });
        return sorted;
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Game-Level HR View"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: "Search, sort, and page through recent games"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: searchQuery,
                                onChange: (event)=>{
                                    setSearchQuery(event.target.value);
                                    setPage(1);
                                },
                                placeholder: "Search opponent or park",
                                className: "h-10 w-56 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300",
                                children: "Columns"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: [
                                    {
                                        key: "date",
                                        label: "Date"
                                    },
                                    {
                                        key: "opponent",
                                        label: "Opponent"
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
                                        key: "hr",
                                        label: "HR"
                                    },
                                    {
                                        key: "xHr",
                                        label: "xHR"
                                    },
                                    {
                                        key: "hrDiff",
                                        label: "HR diff"
                                    },
                                    {
                                        key: "opposingSp",
                                        label: "Opposing SP"
                                    },
                                    {
                                        key: "opposingSpHr9",
                                        label: "SP HR/9"
                                    }
                                ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleSort(key),
                                            className: "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500",
                                            children: [
                                                label,
                                                sortBy === key ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "text-[10px]",
                                                    children: sortDirection === "asc" ? "▲" : "▼"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "text-[10px] text-slate-300",
                                                    children: "▲"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this)
                                    }, key, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: pageRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-slate-100 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-800",
                                            children: row.date
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 font-semibold text-slate-900",
                                            children: row.opponent
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.park
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.result
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-900",
                                            children: row.hr.toFixed(0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.xHr.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.hrDiff.toFixed(1)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.opposingSp
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.opposingSpHr9.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.id, true, {
                                    fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: "Rows per page"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: pageSize,
                                onChange: (event)=>{
                                    setPageSize(Number(event.target.value));
                                    setPage(1);
                                },
                                className: "h-9 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                                children: [
                                    10,
                                    15,
                                    20
                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: size,
                                        children: size
                                    }, size, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handlePageChange("prev"),
                                disabled: currentPage === 1,
                                className: "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-slate-600",
                                children: [
                                    "Page ",
                                    currentPage,
                                    " of ",
                                    totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handlePageChange("next"),
                                disabled: currentPage === totalPages,
                                className: "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/GameHrTable.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PitcherHrVulnerabilityCard",
    ()=>PitcherHrVulnerabilityCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
function PitcherHrVulnerabilityCard({ rows, teamName = "Yankees" }) {
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("hrAllowed");
    const [sortDirection, setSortDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [minHrAllowed, setMinHrAllowed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(0);
    const sortedRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const filtered = rows.filter((row)=>row.hrAllowed >= minHrAllowed);
        return [
            ...filtered
        ].sort((a, b)=>{
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            if (valueA === valueB) return 0;
            const base = valueA < valueB ? -1 : 1;
            return sortDirection === "asc" ? base : -base;
        });
    }, [
        minHrAllowed,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: [
                                    "Pitcher HR Vulnerability vs ",
                                    teamName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: [
                                    "Sorted by ",
                                    labelForSort(sortBy)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm font-medium text-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: "Sort by"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortBy,
                                        onChange: (event)=>handleSortChange(event.target.value),
                                        className: "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "hrAllowed",
                                                children: "HR allowed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                                lineNumber: 56,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "hrPer9",
                                                children: "HR/9"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                                lineNumber: 57,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "avgEvAllowed",
                                                children: "Avg EV allowed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                                lineNumber: 58,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm font-medium text-slate-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: "Min HR allowed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 0,
                                        value: minHrAllowed,
                                        onChange: (event)=>setMinHrAllowed(Number(event.target.value)),
                                        className: "h-10 w-20 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "Pitcher"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "Team"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "HR allowed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "HR/9"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "Avg EV allowed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "Max distance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: sortedRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-slate-100 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 font-semibold text-slate-900",
                                            children: row.pitcherName
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.pitcherTeam
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-900",
                                            children: row.hrAllowed.toFixed(0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: row.hrPer9.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: [
                                                row.avgEvAllowed.toFixed(1),
                                                " mph"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-700",
                                            children: [
                                                row.maxDistance.toFixed(0),
                                                " ft"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                            lineNumber: 97,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `${row.pitcherTeam}-${row.pitcherName}`, true, {
                                    fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function labelForSort(sortKey) {
    if (sortKey === "hrAllowed") return "HR allowed";
    if (sortKey === "hrPer9") return "HR/9";
    return "Avg EV allowed";
}
}),
"[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamHrTrendCard",
    ()=>TeamHrTrendCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
function TeamHrTrendCard({ data }) {
    const [activeMetric, setActiveMetric] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("hr");
    const metricLabel = {
        hr: "HR/G",
        avgEv: "Avg EV",
        barrels: "Barrels"
    };
    const maxValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (data.length === 0) return 1;
        return Math.max(...data.map((point)=>point[activeMetric]));
    }, [
        activeMetric,
        data
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Team HR Trend"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: "Rolling values per game • Mock data"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            "hr",
                            "avgEv",
                            "barrels"
                        ].map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveMetric(metric),
                                className: `rounded-full px-3 py-2 text-xs font-semibold transition ${activeMetric === metric ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`,
                                children: metricLabel[metric]
                            }, metric, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 text-xs font-semibold text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "HR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "xHR"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: metricLabel[activeMetric]
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: data.map((point)=>{
                            const value = point[activeMetric];
                            const barWidth = Math.max(8, value / maxValue * 100);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-4 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-700",
                                        children: point.date
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right font-semibold text-slate-900",
                                        children: point.hr.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-right text-slate-700",
                                        children: point.xHr.toFixed(1)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-end gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: activeMetric === "avgEv" ? value.toFixed(1) : value.toFixed(0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                                lineNumber: 71,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 rounded-full bg-slate-300",
                                                style: {
                                                    width: `${barWidth}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                                lineNumber: 74,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, point.date, true, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamSplitsCard",
    ()=>TeamSplitsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
function TeamSplitsCard({ overview, homeAway, lhpRhp, monthly }) {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("overview");
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
    const current = tabData[activeTab];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Team Splits"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: "HR per game by context"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: Object.keys(tabData).map((tabKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveTab(tabKey),
                                className: `rounded-full px-3 py-2 text-xs font-semibold transition ${activeTab === tabKey ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`,
                                children: tabData[tabKey].label
                            }, tabKey, false, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 overflow-hidden rounded-lg border border-slate-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "Split"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "HR/G"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-2",
                                        children: "League Avg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: current.rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t border-slate-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 font-semibold text-slate-900",
                                            children: row.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-800",
                                            children: row.hrPerGame.toFixed(2)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-slate-600",
                                            children: row.leagueAvgHrPerGame ? `${row.leagueAvgHrPerGame.toFixed(2)} HR/G` : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, row.label, true, {
                                    fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UpcomingGamesCard",
    ()=>UpcomingGamesCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
function UpcomingGamesCard({ games }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500",
                                children: "Upcoming Games / Series"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: "Projected HR ranges for the next set"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: "Next 7 days"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: "Next 14 days"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: "Next 30 days"
                            }, void 0, false, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-3",
                children: games.map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(OpponentBadge, {
                                        name: game.opponentName,
                                        logoUrl: game.opponentLogoUrl
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                        lineNumber: 32,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-slate-900",
                                                children: game.opponentName
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                                lineNumber: 34,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-600",
                                                children: [
                                                    formatDate(game.date),
                                                    " • ",
                                                    game.parkName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                                lineNumber: 35,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                        lineNumber: 33,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm",
                                        children: [
                                            "Park HR factor: ",
                                            game.parkHrFactor.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm",
                                        children: [
                                            "Projected HR range: ",
                                            game.projectedHrMin,
                                            "–",
                                            game.projectedHrMax
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this)
                        ]
                    }, `${game.date}-${game.opponentName}`, true, {
                        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
function OpponentBadge({ name, logoUrl }) {
    const initials = name.split(" ").map((part)=>part[0]).join("").slice(0, 2).toUpperCase();
    if (logoUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                src: logoUrl,
                alt: name,
                width: 40,
                height: 40,
                className: "h-full w-full object-cover"
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm",
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
function formatDate(date) {
    const parsed = new Date(date);
    return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}
}),
"[project]/src/features/team-dashboard/mock/teamDashboardData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultDateRange",
    ()=>defaultDateRange,
    "defaultHomeAway",
    ()=>defaultHomeAway,
    "defaultMinPa",
    ()=>defaultMinPa,
    "defaultPark",
    ()=>defaultPark,
    "defaultPitcherHand",
    ()=>defaultPitcherHand,
    "defaultSeason",
    ()=>defaultSeason,
    "defaultSplit",
    ()=>defaultSplit,
    "gameRows",
    ()=>gameRows,
    "pitcherRows",
    ()=>pitcherRows,
    "teamHrTimeSeries",
    ()=>teamHrTimeSeries,
    "teamInfo",
    ()=>teamInfo,
    "teamKeyMetrics",
    ()=>teamKeyMetrics,
    "teamSplitsHomeAway",
    ()=>teamSplitsHomeAway,
    "teamSplitsLhpRhp",
    ()=>teamSplitsLhpRhp,
    "teamSplitsMonthly",
    ()=>teamSplitsMonthly,
    "teamSplitsOverview",
    ()=>teamSplitsOverview,
    "upcomingGames",
    ()=>upcomingGames
]);
const teamInfo = {
    teamId: "nyy",
    teamName: "New York Yankees",
    teamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
    league: "American League",
    division: "AL East"
};
const teamKeyMetrics = [
    {
        id: "hr-per-game",
        label: "Team HR/G",
        value: "1.34",
        comparisonText: "3rd in MLB (last 30 games)",
        trendDirection: "up",
        trendValue: "+0.12 vs season"
    },
    {
        id: "hr-vs-league",
        label: "HR% vs League",
        value: "+18%",
        comparisonText: "Above league average",
        trendDirection: "up",
        trendValue: "+3% vs last 14 days"
    },
    {
        id: "xhr-diff",
        label: "xHR Difference",
        value: "+6.2",
        comparisonText: "Overperforming expected by 6 HR",
        trendDirection: "flat"
    },
    {
        id: "top-park",
        label: "Top HR Park",
        value: "Yankee Stadium",
        comparisonText: "42% of team HRs hit here",
        trendDirection: "flat"
    }
];
const defaultSeason = "2025";
const defaultSplit = "Full Season";
const defaultPark = "All Parks";
const defaultHomeAway = "All Games";
const defaultDateRange = "Last 30 days";
const defaultPitcherHand = "All";
const defaultMinPa = 25;
const teamHrTimeSeries = [
    {
        date: "2025-03-30",
        hr: 2,
        xHr: 1.6,
        avgEv: 90.8,
        barrels: 3
    },
    {
        date: "2025-04-02",
        hr: 1,
        xHr: 1.2,
        avgEv: 89.1,
        barrels: 2
    },
    {
        date: "2025-04-05",
        hr: 0,
        xHr: 0.7,
        avgEv: 87.4,
        barrels: 1
    },
    {
        date: "2025-04-08",
        hr: 3,
        xHr: 2.1,
        avgEv: 92.3,
        barrels: 4
    },
    {
        date: "2025-04-11",
        hr: 2,
        xHr: 1.5,
        avgEv: 91.5,
        barrels: 3
    },
    {
        date: "2025-04-14",
        hr: 1,
        xHr: 1.0,
        avgEv: 88.9,
        barrels: 2
    },
    {
        date: "2025-04-17",
        hr: 2,
        xHr: 1.8,
        avgEv: 90.7,
        barrels: 3
    },
    {
        date: "2025-04-20",
        hr: 1,
        xHr: 1.3,
        avgEv: 89.8,
        barrels: 2
    },
    {
        date: "2025-04-23",
        hr: 4,
        xHr: 2.9,
        avgEv: 93.1,
        barrels: 5
    },
    {
        date: "2025-04-26",
        hr: 2,
        xHr: 1.9,
        avgEv: 91.0,
        barrels: 3
    },
    {
        date: "2025-04-29",
        hr: 1,
        xHr: 1.4,
        avgEv: 90.2,
        barrels: 2
    },
    {
        date: "2025-05-02",
        hr: 3,
        xHr: 2.2,
        avgEv: 92.0,
        barrels: 4
    },
    {
        date: "2025-05-05",
        hr: 2,
        xHr: 1.7,
        avgEv: 91.3,
        barrels: 3
    },
    {
        date: "2025-05-08",
        hr: 1,
        xHr: 1.1,
        avgEv: 89.0,
        barrels: 2
    },
    {
        date: "2025-05-11",
        hr: 2,
        xHr: 1.8,
        avgEv: 90.9,
        barrels: 3
    },
    {
        date: "2025-05-14",
        hr: 3,
        xHr: 2.4,
        avgEv: 92.5,
        barrels: 4
    },
    {
        date: "2025-05-17",
        hr: 1,
        xHr: 1.2,
        avgEv: 88.7,
        barrels: 2
    },
    {
        date: "2025-05-20",
        hr: 2,
        xHr: 1.6,
        avgEv: 90.5,
        barrels: 3
    }
];
const pitcherRows = [
    {
        pitcherName: "Chris Bassett",
        pitcherTeam: "TOR",
        hrAllowed: 6,
        hrPer9: 1.45,
        avgEvAllowed: 90.8,
        maxDistance: 422
    },
    {
        pitcherName: "Nick Pivetta",
        pitcherTeam: "BOS",
        hrAllowed: 5,
        hrPer9: 1.38,
        avgEvAllowed: 91.4,
        maxDistance: 438
    },
    {
        pitcherName: "Logan Gilbert",
        pitcherTeam: "SEA",
        hrAllowed: 4,
        hrPer9: 1.12,
        avgEvAllowed: 89.7,
        maxDistance: 410
    },
    {
        pitcherName: "Carlos Rodón",
        pitcherTeam: "NYY",
        hrAllowed: 3,
        hrPer9: 0.98,
        avgEvAllowed: 88.5,
        maxDistance: 401
    },
    {
        pitcherName: "Kyle Gibson",
        pitcherTeam: "STL",
        hrAllowed: 5,
        hrPer9: 1.32,
        avgEvAllowed: 90.1,
        maxDistance: 427
    },
    {
        pitcherName: "Clarke Schmidt",
        pitcherTeam: "NYY",
        hrAllowed: 3,
        hrPer9: 1.05,
        avgEvAllowed: 89.0,
        maxDistance: 403
    },
    {
        pitcherName: "Michael Wacha",
        pitcherTeam: "KC",
        hrAllowed: 4,
        hrPer9: 1.21,
        avgEvAllowed: 89.9,
        maxDistance: 415
    },
    {
        pitcherName: "Yusei Kikuchi",
        pitcherTeam: "TOR",
        hrAllowed: 4,
        hrPer9: 1.18,
        avgEvAllowed: 90.3,
        maxDistance: 419
    }
];
const upcomingGames = [
    {
        date: "2025-05-22",
        opponentName: "Boston Red Sox",
        opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
        parkName: "Fenway Park",
        parkHrFactor: 1.12,
        projectedHrMin: 1,
        projectedHrMax: 3
    },
    {
        date: "2025-05-24",
        opponentName: "Toronto Blue Jays",
        opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png",
        parkName: "Rogers Centre",
        parkHrFactor: 1.08,
        projectedHrMin: 1,
        projectedHrMax: 2
    },
    {
        date: "2025-05-27",
        opponentName: "Baltimore Orioles",
        opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png",
        parkName: "Camden Yards",
        parkHrFactor: 0.95,
        projectedHrMin: 0,
        projectedHrMax: 2
    },
    {
        date: "2025-05-30",
        opponentName: "Los Angeles Dodgers",
        opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
        parkName: "Dodger Stadium",
        parkHrFactor: 0.98,
        projectedHrMin: 1,
        projectedHrMax: 2
    }
];
const teamSplitsOverview = [
    {
        label: "HR/G (Season)",
        hrPerGame: 1.34,
        leagueAvgHrPerGame: 1.08
    },
    {
        label: "Last 30 Days HR/G",
        hrPerGame: 1.42,
        leagueAvgHrPerGame: 1.11
    },
    {
        label: "Home HR/G",
        hrPerGame: 1.48,
        leagueAvgHrPerGame: 1.12
    },
    {
        label: "Away HR/G",
        hrPerGame: 1.19,
        leagueAvgHrPerGame: 1.05
    },
    {
        label: "vs LHP HR/G",
        hrPerGame: 1.27,
        leagueAvgHrPerGame: 1.02
    },
    {
        label: "vs RHP HR/G",
        hrPerGame: 1.36,
        leagueAvgHrPerGame: 1.09
    }
];
const teamSplitsHomeAway = [
    {
        label: "Home HR/G",
        hrPerGame: 1.48,
        leagueAvgHrPerGame: 1.12
    },
    {
        label: "Away HR/G",
        hrPerGame: 1.19,
        leagueAvgHrPerGame: 1.05
    },
    {
        label: "Home xHR/G",
        hrPerGame: 1.30,
        leagueAvgHrPerGame: 1.06
    },
    {
        label: "Away xHR/G",
        hrPerGame: 1.11,
        leagueAvgHrPerGame: 1.00
    }
];
const teamSplitsLhpRhp = [
    {
        label: "vs LHP HR/G",
        hrPerGame: 1.27,
        leagueAvgHrPerGame: 1.02
    },
    {
        label: "vs RHP HR/G",
        hrPerGame: 1.36,
        leagueAvgHrPerGame: 1.09
    },
    {
        label: "vs LHP xHR/G",
        hrPerGame: 1.15,
        leagueAvgHrPerGame: 1.01
    },
    {
        label: "vs RHP xHR/G",
        hrPerGame: 1.18,
        leagueAvgHrPerGame: 1.04
    }
];
const teamSplitsMonthly = [
    {
        label: "March/April HR/G",
        hrPerGame: 1.25,
        leagueAvgHrPerGame: 1.05
    },
    {
        label: "May HR/G",
        hrPerGame: 1.41,
        leagueAvgHrPerGame: 1.10
    },
    {
        label: "June HR/G (proj)",
        hrPerGame: 1.36,
        leagueAvgHrPerGame: 1.09
    }
];
const gameRows = [
    {
        id: "nyy-2025-03-30-bos",
        date: "2025-03-30",
        opponent: "BOS",
        park: "Yankee Stadium",
        result: "W 6-3",
        hr: 2,
        xHr: 1.6,
        hrDiff: 0.4,
        opposingSp: "Brayan Bello",
        opposingSpHr9: 1.12
    },
    {
        id: "nyy-2025-04-02-bos",
        date: "2025-04-02",
        opponent: "BOS",
        park: "Yankee Stadium",
        result: "L 2-4",
        hr: 1,
        xHr: 1.2,
        hrDiff: -0.2,
        opposingSp: "Nick Pivetta",
        opposingSpHr9: 1.38
    },
    {
        id: "nyy-2025-04-05-kc",
        date: "2025-04-05",
        opponent: "KC",
        park: "Kauffman Stadium",
        result: "W 5-1",
        hr: 0,
        xHr: 0.7,
        hrDiff: -0.7,
        opposingSp: "Cole Ragans",
        opposingSpHr9: 0.95
    },
    {
        id: "nyy-2025-04-08-tor",
        date: "2025-04-08",
        opponent: "TOR",
        park: "Rogers Centre",
        result: "W 7-4",
        hr: 3,
        xHr: 2.1,
        hrDiff: 0.9,
        opposingSp: "Kevin Gausman",
        opposingSpHr9: 1.15
    },
    {
        id: "nyy-2025-04-11-min",
        date: "2025-04-11",
        opponent: "MIN",
        park: "Target Field",
        result: "L 3-5",
        hr: 2,
        xHr: 1.5,
        hrDiff: 0.5,
        opposingSp: "Joe Ryan",
        opposingSpHr9: 1.22
    },
    {
        id: "nyy-2025-04-14-tex",
        date: "2025-04-14",
        opponent: "TEX",
        park: "Globe Life Field",
        result: "W 4-2",
        hr: 1,
        xHr: 1.0,
        hrDiff: 0.0,
        opposingSp: "Nathan Eovaldi",
        opposingSpHr9: 1.10
    },
    {
        id: "nyy-2025-04-17-bal",
        date: "2025-04-17",
        opponent: "BAL",
        park: "Yankee Stadium",
        result: "W 6-2",
        hr: 2,
        xHr: 1.8,
        hrDiff: 0.2,
        opposingSp: "Kyle Bradish",
        opposingSpHr9: 1.05
    },
    {
        id: "nyy-2025-04-20-bal",
        date: "2025-04-20",
        opponent: "BAL",
        park: "Yankee Stadium",
        result: "L 3-5",
        hr: 1,
        xHr: 1.3,
        hrDiff: -0.3,
        opposingSp: "Grayson Rodriguez",
        opposingSpHr9: 1.28
    },
    {
        id: "nyy-2025-04-23-ana",
        date: "2025-04-23",
        opponent: "LAA",
        park: "Angel Stadium",
        result: "W 8-4",
        hr: 4,
        xHr: 2.9,
        hrDiff: 1.1,
        opposingSp: "Patrick Sandoval",
        opposingSpHr9: 1.20
    },
    {
        id: "nyy-2025-04-26-lad",
        date: "2025-04-26",
        opponent: "LAD",
        park: "Dodger Stadium",
        result: "W 5-3",
        hr: 2,
        xHr: 1.9,
        hrDiff: 0.1,
        opposingSp: "Walker Buehler",
        opposingSpHr9: 1.05
    },
    {
        id: "nyy-2025-04-29-sea",
        date: "2025-04-29",
        opponent: "SEA",
        park: "T-Mobile Park",
        result: "L 2-3",
        hr: 1,
        xHr: 1.4,
        hrDiff: -0.4,
        opposingSp: "Logan Gilbert",
        opposingSpHr9: 1.12
    },
    {
        id: "nyy-2025-05-02-oak",
        date: "2025-05-02",
        opponent: "OAK",
        park: "Oakland Coliseum",
        result: "W 6-1",
        hr: 3,
        xHr: 2.2,
        hrDiff: 0.8,
        opposingSp: "JP Sears",
        opposingSpHr9: 1.30
    },
    {
        id: "nyy-2025-05-05-ari",
        date: "2025-05-05",
        opponent: "ARI",
        park: "Chase Field",
        result: "W 5-4",
        hr: 2,
        xHr: 1.7,
        hrDiff: 0.3,
        opposingSp: "Zac Gallen",
        opposingSpHr9: 1.00
    },
    {
        id: "nyy-2025-05-08-col",
        date: "2025-05-08",
        opponent: "COL",
        park: "Coors Field",
        result: "W 7-5",
        hr: 1,
        xHr: 1.1,
        hrDiff: -0.1,
        opposingSp: "Kyle Freeland",
        opposingSpHr9: 1.35
    },
    {
        id: "nyy-2025-05-11-phi",
        date: "2025-05-11",
        opponent: "PHI",
        park: "Citizens Bank Park",
        result: "L 3-6",
        hr: 2,
        xHr: 1.8,
        hrDiff: 0.2,
        opposingSp: "Aaron Nola",
        opposingSpHr9: 1.18
    },
    {
        id: "nyy-2025-05-14-phi",
        date: "2025-05-14",
        opponent: "PHI",
        park: "Citizens Bank Park",
        result: "W 6-4",
        hr: 3,
        xHr: 2.4,
        hrDiff: 0.6,
        opposingSp: "Ranger Suarez",
        opposingSpHr9: 1.14
    },
    {
        id: "nyy-2025-05-17-det",
        date: "2025-05-17",
        opponent: "DET",
        park: "Comerica Park",
        result: "L 2-3",
        hr: 1,
        xHr: 1.2,
        hrDiff: -0.2,
        opposingSp: "Tarik Skubal",
        opposingSpHr9: 1.04
    },
    {
        id: "nyy-2025-05-20-det",
        date: "2025-05-20",
        opponent: "DET",
        park: "Comerica Park",
        result: "W 5-2",
        hr: 2,
        xHr: 1.6,
        hrDiff: 0.4,
        opposingSp: "Jack Flaherty",
        opposingSpHr9: 1.26
    },
    {
        id: "nyy-2025-05-22-bos",
        date: "2025-05-22",
        opponent: "BOS",
        park: "Fenway Park",
        result: "L 4-5",
        hr: 1,
        xHr: 1.3,
        hrDiff: -0.3,
        opposingSp: "Kutter Crawford",
        opposingSpHr9: 1.09
    },
    {
        id: "nyy-2025-05-24-tor",
        date: "2025-05-24",
        opponent: "TOR",
        park: "Rogers Centre",
        result: "W 7-4",
        hr: 2,
        xHr: 1.9,
        hrDiff: 0.1,
        opposingSp: "José Berríos",
        opposingSpHr9: 1.17
    },
    {
        id: "nyy-2025-05-27-bal",
        date: "2025-05-27",
        opponent: "BAL",
        park: "Camden Yards",
        result: "W 5-3",
        hr: 2,
        xHr: 1.8,
        hrDiff: 0.2,
        opposingSp: "Dean Kremer",
        opposingSpHr9: 1.20
    },
    {
        id: "nyy-2025-05-30-lad",
        date: "2025-05-30",
        opponent: "LAD",
        park: "Dodger Stadium",
        result: "L 2-4",
        hr: 1,
        xHr: 1.2,
        hrDiff: -0.2,
        opposingSp: "Bobby Miller",
        opposingSpHr9: 1.16
    },
    {
        id: "nyy-2025-06-02-chc",
        date: "2025-06-02",
        opponent: "CHC",
        park: "Wrigley Field",
        result: "W 6-2",
        hr: 3,
        xHr: 2.3,
        hrDiff: 0.7,
        opposingSp: "Justin Steele",
        opposingSpHr9: 1.10
    },
    {
        id: "nyy-2025-06-04-chc",
        date: "2025-06-04",
        opponent: "CHC",
        park: "Wrigley Field",
        result: "W 4-3",
        hr: 2,
        xHr: 1.7,
        hrDiff: 0.3,
        opposingSp: "Kyle Hendricks",
        opposingSpHr9: 1.25
    }
];
}),
"[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamHrDashboardPage",
    ()=>TeamHrDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamFiltersStrip$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/TeamFiltersStrip.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/TeamHeader.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamKeyMetricsRow$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/TeamKeyMetricsRow.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$GameHrTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/GameHrTable.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$PitcherHrVulnerabilityCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/PitcherHrVulnerabilityCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamHrTrendCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/TeamHrTrendCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamSplitsCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/TeamSplitsCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$UpcomingGamesCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/components/UpcomingGamesCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/mock/teamDashboardData.ts [app-rsc] (ecmascript)");
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
function TeamHrDashboardPage() {
    const [season, setSeason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSeason"]);
    const [split, setSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSplit"]);
    const [park, setPark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultPark"]);
    const [homeAway, setHomeAway] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultHomeAway"]);
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultDateRange"]);
    const [pitcherHand, setPitcherHand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultPitcherHand"]);
    const [minPA, setMinPA] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultMinPa"]);
    const handleResetFilters = ()=>{
        setDateRange(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultDateRange"]);
        setPitcherHand(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultPitcherHand"]);
        setMinPA(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultMinPa"]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamHeader"], {
                teamInfo: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamInfo"],
                season: season,
                onSeasonChange: setSeason,
                split: split,
                onSplitChange: setSplit,
                park: park,
                onParkChange: setPark,
                homeAway: homeAway,
                onHomeAwayChange: setHomeAway,
                isFavorite: isFavorite,
                onToggleFavorite: ()=>setIsFavorite((prev)=>!prev)
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamFiltersStrip$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamFiltersStrip"], {
                dateRange: dateRange,
                onDateRangeChange: setDateRange,
                pitcherHand: pitcherHand,
                onPitcherHandChange: setPitcherHand,
                minPA: minPA,
                onMinPAChange: setMinPA,
                onResetFilters: handleResetFilters
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamKeyMetricsRow$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamKeyMetricsRow"], {
                metrics: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamKeyMetrics"]
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamHrTrendCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamHrTrendCard"], {
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamHrTimeSeries"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$PitcherHrVulnerabilityCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PitcherHrVulnerabilityCard"], {
                        rows: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pitcherRows"],
                        teamName: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamInfo"].teamName
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$UpcomingGamesCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UpcomingGamesCard"], {
                        games: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upcomingGames"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$TeamSplitsCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamSplitsCard"], {
                        overview: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamSplitsOverview"],
                        homeAway: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamSplitsHomeAway"],
                        lhpRhp: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamSplitsLhpRhp"],
                        monthly: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamSplitsMonthly"]
                    }, void 0, false, {
                        fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$components$2f$GameHrTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GameHrTable"], {
                rows: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$mock$2f$teamDashboardData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gameRows"]
            }, void 0, false, {
                fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/team/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$TeamHrDashboardPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/team-dashboard/TeamHrDashboardPage.tsx [app-rsc] (ecmascript)");
;
;
function TeamPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$team$2d$dashboard$2f$TeamHrDashboardPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TeamHrDashboardPage"], {}, void 0, false, {
        fileName: "[project]/src/app/team/page.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/team/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/team/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4559a46f._.js.map
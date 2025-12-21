module.exports = [
"[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Card({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
function CardHeader({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 text-slate-900 dark:border-slate-800 dark:text-slate-50 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function CardBody({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `px-5 py-4 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
function CardFooter({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border-t border-slate-100 px-5 py-4 dark:border-slate-800 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/today-games/components/TodayGamesHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodayGamesHeader",
    ()=>TodayGamesHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Select.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const mockDateOptions = [
    "2024-06-15",
    "2024-06-16",
    "2024-06-17"
];
function TodayGamesHeader({ selectedDate, onDateChange, teamQuery, onTeamQueryChange, minHotBatScore, onMinHotBatScoreChange, minParkHrFactor, onMinParkHrFactorChange, gamesCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                            children: "Today's Games"
                        }, void 0, false, {
                            fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-600 dark:text-slate-300",
                            children: [
                                "Showing ",
                                gamesCount,
                                " games on ",
                                selectedDate
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                        label: "Date",
                        value: selectedDate,
                        onChange: (event)=>onDateChange(event.target.value),
                        children: mockDateOptions.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: date,
                                children: date
                            }, date, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: "Team search"
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "search",
                                value: teamQuery,
                                onChange: (event)=>onTeamQueryChange(event.target.value),
                                placeholder: "Search team",
                                className: "h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NumericField, {
                        label: "Min HotBat score",
                        value: minHotBatScore,
                        onChange: (val)=>onMinHotBatScoreChange(val),
                        min: 0,
                        max: 100
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NumericField, {
                        label: "Min park HR factor",
                        value: minParkHrFactor,
                        onChange: (val)=>onMinParkHrFactorChange(val),
                        min: 0,
                        max: 2,
                        step: 0.01
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function NumericField({ label, value, onChange, min, max, step }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-slate-500 dark:text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                value: value,
                min: min,
                max: max,
                step: step,
                onChange: (event)=>onChange(Number(event.target.value)),
                className: "h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/components/TodayGamesHeader.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/Badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Badge({ children, variant = "default", className = "" }) {
    const styles = {
        default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-100",
        danger: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-100"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/today-games/components/TodayGameCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodayGameCard",
    ()=>TodayGameCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
;
;
;
;
function TodayGameCard({ game }) {
    const hrFriendly = game.parkHrFactor > 1.1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamBadge, {
                                name: game.awayTeam,
                                logoUrl: game.awayTeamLogoUrl
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-semibold text-slate-900 dark:text-slate-50",
                                children: [
                                    game.awayTeam,
                                    " @ ",
                                    game.homeTeam
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamBadge, {
                                name: game.homeTeam,
                                logoUrl: game.homeTeamLogoUrl
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: hrFriendly ? "success" : "default",
                                children: [
                                    "Park HR factor ",
                                    game.parkHrFactor.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: game.hotBatScore >= 75 ? "success" : game.hotBatScore >= 60 ? "warning" : "default",
                                children: [
                                    "HotBat ",
                                    game.hotBatScore
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardBody"], {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: game.startTimeLocal
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-400",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: game.parkName
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 text-sm text-slate-800 dark:text-slate-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-600 dark:text-slate-300",
                                        children: "Projected HR (Away)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            game.awayProjectedHrMin,
                                            " – ",
                                            game.awayProjectedHrMax
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-600 dark:text-slate-300",
                                        children: "Projected HR (Home)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            game.homeProjectedHrMin,
                                            " – ",
                                            game.homeProjectedHrMax
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                                children: "Probable Pitchers"
                            }, void 0, false, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 grid gap-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PitcherRow, {
                                        label: "Away SP",
                                        name: game.awayStartingPitcher.name,
                                        throws: game.awayStartingPitcher.throws,
                                        hrPer9: game.awayStartingPitcher.hrPer9,
                                        era: game.awayStartingPitcher.era
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PitcherRow, {
                                        label: "Home SP",
                                        name: game.homeStartingPitcher.name,
                                        throws: game.homeStartingPitcher.throws,
                                        hrPer9: game.homeStartingPitcher.hrPer9,
                                        era: game.homeStartingPitcher.era
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
function PitcherRow({ label, name, throws, hrPer9, era }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center justify-between gap-2 text-slate-800 dark:text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "default",
                        className: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-slate-500 dark:text-slate-400",
                        children: [
                            "Throws ",
                            throws
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "HR/9 ",
                            hrPer9.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400",
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "ERA ",
                            era.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
function TeamBadge({ name, logoUrl }) {
    const initials = name.split(" ").map((part)=>part[0]).join("").slice(0, 2).toUpperCase();
    if (logoUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: logoUrl,
                alt: name,
                width: 36,
                height: 36,
                className: "h-full w-full object-cover"
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-sm dark:bg-slate-100 dark:text-slate-900",
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/today-games/components/TodayGameCard.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/today-games/components/TodayGamesList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodayGamesList",
    ()=>TodayGamesList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGameCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/today-games/components/TodayGameCard.tsx [app-ssr] (ecmascript)");
;
;
function TodayGamesList({ games }) {
    if (games.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-sm font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200",
            children: "No games matching filters."
        }, void 0, false, {
            fileName: "[project]/src/features/today-games/components/TodayGamesList.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
        children: games.map((game)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGameCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodayGameCard"], {
                game: game
            }, game.id, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesList.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/features/today-games/components/TodayGamesList.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodayGamesSummaryBar",
    ()=>TodayGamesSummaryBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Card.tsx [app-ssr] (ecmascript)");
;
;
function TodayGamesSummaryBar({ games }) {
    const gameCount = games.length;
    const avgParkHrFactor = games.length > 0 ? games.reduce((sum, game)=>sum + game.parkHrFactor, 0) / games.length : 0;
    const highScoreCount = games.filter((game)=>game.hotBatScore >= 70).length;
    const topGame = games.reduce((best, game)=>best === null || game.hotBatScore > best.hotBatScore ? game : best, null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardBody"], {
            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                    label: "Games",
                    value: gameCount.toString()
                }, void 0, false, {
                    fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                    label: "Avg Park HR Factor",
                    value: avgParkHrFactor.toFixed(2)
                }, void 0, false, {
                    fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                    label: "High HotBat (≥70)",
                    value: highScoreCount.toString()
                }, void 0, false, {
                    fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Metric, {
                    label: "Top HR matchup",
                    value: topGame ? `${topGame.awayTeam} @ ${topGame.homeTeam}` : "—",
                    subValue: topGame ? `Score: ${topGame.hotBatScore}` : undefined
                }, void 0, false, {
                    fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function Metric({ label, value, subValue }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg font-semibold",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            subValue ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-slate-500 dark:text-slate-400",
                children: subValue
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
                lineNumber: 52,
                columnNumber: 19
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/today-games/mock/todayGamesData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultDate",
    ()=>defaultDate,
    "todayGames",
    ()=>todayGames
]);
const defaultDate = "2024-06-15";
const todayGames = [
    {
        id: "bos-nyy-2024-06-15",
        date: defaultDate,
        startTimeLocal: "7:05 PM",
        homeTeam: "New York Yankees",
        awayTeam: "Boston Red Sox",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
        parkName: "Yankee Stadium",
        parkHrFactor: 1.22,
        homeProjectedHrMin: 1,
        homeProjectedHrMax: 3,
        awayProjectedHrMin: 0,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Carlos Rodón",
            teamName: "NYY",
            throws: "L",
            hrPer9: 1.05,
            era: 3.41
        },
        awayStartingPitcher: {
            name: "Nick Pivetta",
            teamName: "BOS",
            throws: "R",
            hrPer9: 1.38,
            era: 4.12
        },
        hotBatScore: 84
    },
    {
        id: "tor-bal-2024-06-15",
        date: defaultDate,
        startTimeLocal: "4:10 PM",
        homeTeam: "Baltimore Orioles",
        awayTeam: "Toronto Blue Jays",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png",
        parkName: "Camden Yards",
        parkHrFactor: 1.05,
        homeProjectedHrMin: 1,
        homeProjectedHrMax: 2,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Kyle Bradish",
            teamName: "BAL",
            throws: "R",
            hrPer9: 1.10,
            era: 3.21
        },
        awayStartingPitcher: {
            name: "José Berríos",
            teamName: "TOR",
            throws: "R",
            hrPer9: 1.17,
            era: 3.89
        },
        hotBatScore: 72
    },
    {
        id: "lad-sf-2024-06-15",
        date: defaultDate,
        startTimeLocal: "9:10 PM",
        homeTeam: "San Francisco Giants",
        awayTeam: "Los Angeles Dodgers",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/sf.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
        parkName: "Oracle Park",
        parkHrFactor: 0.88,
        homeProjectedHrMin: 0,
        homeProjectedHrMax: 1,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Logan Webb",
            teamName: "SF",
            throws: "R",
            hrPer9: 0.92,
            era: 3.05
        },
        awayStartingPitcher: {
            name: "Bobby Miller",
            teamName: "LAD",
            throws: "R",
            hrPer9: 1.08,
            era: 3.45
        },
        hotBatScore: 58
    },
    {
        id: "hou-tex-2024-06-15",
        date: defaultDate,
        startTimeLocal: "8:05 PM",
        homeTeam: "Texas Rangers",
        awayTeam: "Houston Astros",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tex.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/hou.png",
        parkName: "Globe Life Field",
        parkHrFactor: 1.09,
        homeProjectedHrMin: 1,
        homeProjectedHrMax: 2,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Nathan Eovaldi",
            teamName: "TEX",
            throws: "R",
            hrPer9: 1.10,
            era: 3.70
        },
        awayStartingPitcher: {
            name: "Cristian Javier",
            teamName: "HOU",
            throws: "R",
            hrPer9: 1.24,
            era: 3.95
        },
        hotBatScore: 69
    },
    {
        id: "cws-min-2024-06-15",
        date: defaultDate,
        startTimeLocal: "2:10 PM",
        homeTeam: "Minnesota Twins",
        awayTeam: "Chicago White Sox",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/min.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/chw.png",
        parkName: "Target Field",
        parkHrFactor: 0.96,
        homeProjectedHrMin: 1,
        homeProjectedHrMax: 2,
        awayProjectedHrMin: 0,
        awayProjectedHrMax: 1,
        homeStartingPitcher: {
            name: "Joe Ryan",
            teamName: "MIN",
            throws: "R",
            hrPer9: 1.22,
            era: 3.82
        },
        awayStartingPitcher: {
            name: "Dylan Cease",
            teamName: "CWS",
            throws: "R",
            hrPer9: 1.35,
            era: 4.05
        },
        hotBatScore: 63
    },
    {
        id: "phi-atl-2024-06-15",
        date: defaultDate,
        startTimeLocal: "7:20 PM",
        homeTeam: "Atlanta Braves",
        awayTeam: "Philadelphia Phillies",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/atl.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png",
        parkName: "Truist Park",
        parkHrFactor: 1.14,
        homeProjectedHrMin: 1,
        homeProjectedHrMax: 3,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Max Fried",
            teamName: "ATL",
            throws: "L",
            hrPer9: 0.95,
            era: 3.20
        },
        awayStartingPitcher: {
            name: "Aaron Nola",
            teamName: "PHI",
            throws: "R",
            hrPer9: 1.18,
            era: 3.65
        },
        hotBatScore: 77
    },
    {
        id: "ari-col-2024-06-15",
        date: defaultDate,
        startTimeLocal: "8:10 PM",
        homeTeam: "Colorado Rockies",
        awayTeam: "Arizona Diamondbacks",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/col.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/ari.png",
        parkName: "Coors Field",
        parkHrFactor: 1.28,
        homeProjectedHrMin: 2,
        homeProjectedHrMax: 3,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 3,
        homeStartingPitcher: {
            name: "Kyle Freeland",
            teamName: "COL",
            throws: "L",
            hrPer9: 1.35,
            era: 4.90
        },
        awayStartingPitcher: {
            name: "Zac Gallen",
            teamName: "ARI",
            throws: "R",
            hrPer9: 1.05,
            era: 3.12
        },
        hotBatScore: 86
    },
    {
        id: "nyy-mia-2024-06-16",
        date: "2024-06-16",
        startTimeLocal: "1:10 PM",
        homeTeam: "Miami Marlins",
        awayTeam: "New York Yankees",
        homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/mia.png",
        awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
        parkName: "loanDepot park",
        parkHrFactor: 0.92,
        homeProjectedHrMin: 0,
        homeProjectedHrMax: 1,
        awayProjectedHrMin: 1,
        awayProjectedHrMax: 2,
        homeStartingPitcher: {
            name: "Jesús Luzardo",
            teamName: "MIA",
            throws: "L",
            hrPer9: 1.05,
            era: 3.88
        },
        awayStartingPitcher: {
            name: "Gerrit Cole",
            teamName: "NYY",
            throws: "R",
            hrPer9: 0.95,
            era: 2.98
        },
        hotBatScore: 61
    }
];
}),
"[project]/src/features/today-games/TodayGamesPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TodayGamesPage",
    ()=>TodayGamesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PageContainer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/today-games/components/TodayGamesHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/today-games/components/TodayGamesList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesSummaryBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/today-games/components/TodayGamesSummaryBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$mock$2f$todayGamesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/today-games/mock/todayGamesData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function TodayGamesPage() {
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$mock$2f$todayGamesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultDate"]);
    const [teamQuery, setTeamQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [minHotBatScore, setMinHotBatScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [minParkHrFactor, setMinParkHrFactor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const filteredGames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$mock$2f$todayGamesData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todayGames"].filter((game)=>game.date === selectedDate).filter((game)=>teamQuery ? `${game.homeTeam} ${game.awayTeam}`.toLowerCase().includes(teamQuery.toLowerCase()) : true).filter((game)=>game.hotBatScore >= minHotBatScore).filter((game)=>game.parkHrFactor >= minParkHrFactor);
    }, [
        selectedDate,
        teamQuery,
        minHotBatScore,
        minParkHrFactor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PageContainer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageContainer"], {
        className: "flex flex-col gap-5 py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodayGamesHeader"], {
                selectedDate: selectedDate,
                onDateChange: setSelectedDate,
                teamQuery: teamQuery,
                onTeamQueryChange: setTeamQuery,
                minHotBatScore: minHotBatScore,
                onMinHotBatScoreChange: setMinHotBatScore,
                minParkHrFactor: minParkHrFactor,
                onMinParkHrFactorChange: setMinParkHrFactor,
                gamesCount: filteredGames.length
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/TodayGamesPage.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesSummaryBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodayGamesSummaryBar"], {
                games: filteredGames
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/TodayGamesPage.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$today$2d$games$2f$components$2f$TodayGamesList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodayGamesList"], {
                games: filteredGames
            }, void 0, false, {
                fileName: "[project]/src/features/today-games/TodayGamesPage.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/today-games/TodayGamesPage.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0f8ba19b._.js.map
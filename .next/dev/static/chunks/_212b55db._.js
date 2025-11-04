(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/data/roadmap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "roadmapSteps",
    ()=>roadmapSteps
]);
const roadmapSteps = [
    {
        id: 1,
        title: "1. MVP (0–2 oy)",
        details: [
            "Mobil ilova va admin panelni ishlab chiqish",
            "Geo-lokatsiya va navbat logikasi",
            "To‘lov tizimi sinov integratsiyasi (Click / Payme)",
            "Telegram mini app test versiyasi",
            "UI/UX dizayn va brend tayyorlash"
        ],
        result: "Natija: Ishlaydigan minimal versiya (MVP)",
        isCompleted: true
    },
    {
        id: 2,
        title: "2. Test va Feedback (3–5 oy)",
        details: [
            "10–15 joyda pilot test (barber, klinika, kafe)",
            "Foydalanuvchi tajribasi tahlili va optimizatsiya",
            "Barqarorlik, tezlik va xavfsizlikni yaxshilash"
        ],
        result: "Natija: Barqaror MVP va dastlabki foydalanuvchi bazasi (1 000+)",
        isCompleted: false
    },
    {
        id: 3,
        title: "3. Bozorga chiqish (6–9 oy)",
        details: [
            "Promo web-sayt ishga tushirish",
            "Brending va reklama (Instagram, Telegram, TikTok)",
            "1–2 shaharda soft launch"
        ],
        result: "Natija: 5 000+ foydalanuvchi, 100+ joy tizimda",
        isCompleted: false
    },
    {
        id: 4,
        title: "4. Monetizatsiya (10–15 oy)",
        details: [
            "Joylar uchun obuna tizimi (10–200$/oy)",
            "1% komissiya modeli",
            "Statistik panel va reklama joylari"
        ],
        result: "Natija: Oylik 3 000$+ daromad, 300+ joy faol",
        isCompleted: false
    },
    {
        id: 5,
        title: "5. Investitsiya va Hamkorlik (16–20 oy)",
        details: [
            "Pitch deck va moliyaviy prognozlar tayyorlash",
            "IT Park va investorlar bilan uchrashuvlar",
            "Yirik tarmoqlar bilan hamkorlik"
        ],
        result: "Natija: 50 000$+ investitsiya, 2 strategik hamkor",
        isCompleted: false
    },
    {
        id: 6,
        title: "6. Kengayish (21–24 oy)",
        details: [
            "Tavsiya tizimi (AI asosida)",
            "Qo‘shni davlatlarga chiqish (Qozog‘iston, Qirg‘iziston)",
            "Bandu Business panel (analitika uchun)"
        ],
        result: "Natija: 100 000+ foydalanuvchi, 500+ joy faol, oylik 10 000$+ daromad",
        isCompleted: false
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Roadmap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Roadmap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$roadmap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/roadmap.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Roadmap() {
    _s();
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Roadmap.useMemo[activeIndex]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$roadmap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roadmapSteps"].findIndex({
                "Roadmap.useMemo[activeIndex]": (s)=>!s.isCompleted
            }["Roadmap.useMemo[activeIndex]"]);
        }
    }["Roadmap.useMemo[activeIndex]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-10 map-gradient overflow-x-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto px-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900",
                    children: "Loyihaning Roadmapi"
                }, void 0, false, {
                    fileName: "[project]/app/components/Roadmap.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$roadmap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["roadmapSteps"].map((step, idx)=>{
                        const isCompleted = step.isCompleted;
                        const isActive = idx === activeIndex;
                        const isFuture = idx > activeIndex && activeIndex !== -1;
                        let containerClass = "rounded-2xl p-6 border transition-all duration-300 transform hover:-translate-y-1";
                        if (isCompleted) {
                            containerClass += " bg-gray-100 border-gray-200 text-gray-600 shadow-sm";
                        } else if (isActive) {
                            containerClass += " bg-white border-blue-300 shadow-[0_10px_30px_rgba(59,130,246,0.08)] ring-1 ring-blue-100";
                        } else if (isFuture) {
                            containerClass += " bg-gray-50 border-gray-100 text-gray-500";
                        } else {
                            containerClass += " bg-white border-gray-200 text-gray-700";
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: containerClass,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex items-center justify-center w-11 h-11 rounded-lg font-semibold text-sm shadow-sm
                        ${isCompleted ? "bg-gray-200 text-gray-500" : isActive ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white animate-[pulse_2.5s_infinite]" : "bg-white text-gray-800 border border-gray-100"}`,
                                                    children: step.id
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Roadmap.tsx",
                                                    lineNumber: 41,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: `text-lg sm:text-xl font-semibold ${isCompleted ? "text-gray-600" : "text-gray-900"}`,
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Roadmap.tsx",
                                                            lineNumber: 55,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-sm mt-1 ${isCompleted ? "text-gray-500" : isActive ? "text-blue-600" : "text-gray-500"}`,
                                                            children: isActive ? "Hozirgi bosqich" : isCompleted ? "Yakunlangan" : "Kutilmoqda"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/Roadmap.tsx",
                                                            lineNumber: 62,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/Roadmap.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Roadmap.tsx",
                                            lineNumber: 40,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700",
                                                    children: "✅ Tugallandi"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Roadmap.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 23
                                                }, this),
                                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-100",
                                                    children: "Faol"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/Roadmap.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/Roadmap.tsx",
                                            lineNumber: 80,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Roadmap.tsx",
                                    lineNumber: 39,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-disc pl-5 mt-4 space-y-1 text-sm sm:text-base",
                                    children: step.details.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: `leading-relaxed ${isCompleted ? "text-gray-500" : "text-gray-700"}`,
                                            children: item
                                        }, i, false, {
                                            fileName: "[project]/app/components/Roadmap.tsx",
                                            lineNumber: 96,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Roadmap.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-4 font-medium ${isCompleted ? "text-gray-600" : isActive ? "text-indigo-700" : "text-gray-700"}`,
                                    children: step.result
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Roadmap.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `h-1 rounded-full ${isCompleted ? "bg-gray-200" : isActive ? "bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse" : "bg-gray-100"}`,
                                        style: {
                                            width: isActive ? "72%" : "100%"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/Roadmap.tsx",
                                        lineNumber: 120,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Roadmap.tsx",
                                    lineNumber: 119,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, step.id, true, {
                            fileName: "[project]/app/components/Roadmap.tsx",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/components/Roadmap.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/Roadmap.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/Roadmap.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(Roadmap, "gcPMUgG188MDKvxm/JF9+DmURyo=");
_c = Roadmap;
var _c;
__turbopack_context__.k.register(_c, "Roadmap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/welcome.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/welcome.38137a46.png");}),
"[project]/public/welcome.png.mjs { IMAGE => \"[project]/public/welcome.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$welcome$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/welcome.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$welcome$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 471,
    height: 529,
    blurWidth: 7,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAYAAAA1BOUGAAAA60lEQVR42jXOsWrCYBSG4TQkww/NktJmLJRAIWQpaWlCS5HSlhRRdFNEcJOIiiGTQ3ARQVEJioOQScRBQXCTIIKCmEnBTfAG3B0EwaMGc9aHw/di2PVwHCf83u9SLpvYJpXwIhYN1l3DHu7vnqqFzHo0qMFy1oZKMTt37Sbg/0tOrNZh2G9At1Xe//54FEcIgqA/P8RpWglDKh4CSZJWNE0/OkhRlI/n+Z3nS4L3t5cjx3H5cwN+CUGCIHRM0wTDMECW5S3DMK/OF0LoWVXVjW3bYFnWBXskSSJ371YUxYimaU1d18csy/67lSc48UWYOT7gJAAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/WelcomeSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WelcomeSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$welcome$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$welcome$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/welcome.png.mjs { IMAGE => "[project]/public/welcome.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WelcomeSection() {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WelcomeSection.useEffect": ()=>{
            const timer = setTimeout({
                "WelcomeSection.useEffect.timer": ()=>{
                    setIsVisible(true);
                }
            }["WelcomeSection.useEffect.timer"], 100); // Delay for fade-in effect
            return ({
                "WelcomeSection.useEffect": ()=>clearTimeout(timer)
            })["WelcomeSection.useEffect"];
        }
    }["WelcomeSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bandu-gradient flex bg-white items-center justify-center min-h-[100vh] w-full overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 ${isVisible ? "opacity-100" : "opacity-0"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full md:w-2xl text-center md:text-left mt-8 md:mt-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontFamily: "var(--font-inter)"
                            },
                            className: "jsx-efcd66e13b722523" + " " + "text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium mb-4 md:mb-0 md:mr-6 leading-[1.3]",
                            children: [
                                "Banduga",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-efcd66e13b722523" + " " + "interactive-gradient",
                                    children: "Hush"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WelcomeSection.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: "efcd66e13b722523",
                                    children: ".interactive-gradient.jsx-efcd66e13b722523{color:#0000;background-image:linear-gradient(90deg,#ffd54a,#ff6b6b,#050505);background-size:200% 200%;-webkit-background-clip:text;background-clip:text;animation:8s linear infinite hueShift;display:inline-block}@keyframes hueShift{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}"
                                }, void 0, false, void 0, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                    className: "jsx-efcd66e13b722523"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WelcomeSection.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                " Kelibsiz"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/WelcomeSection.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-[#000000]/80 font-medium leading-relaxed mx-auto md:mx-0",
                            style: {
                                fontFamily: "var(--font-open-sans)",
                                maxWidth: "400px",
                                width: "100%"
                            },
                            children: "Bandu startap rivojlanish yo'l xaritasi — foydalanuvchi uchun qulay, tezkor va samarali xizmatlarni birlashtiruvchi tizim."
                        }, void 0, false, {
                            fileName: "[project]/app/components/WelcomeSection.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/WelcomeSection.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$welcome$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$welcome$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                    alt: "Bandu Logo",
                    width: 420,
                    height: 420,
                    className: "w-[280px] md:w-[340px] lg:w-[420px] h-auto mb-6 md:mb-0",
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/app/components/WelcomeSection.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/WelcomeSection.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/WelcomeSection.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(WelcomeSection, "J3yJOyGdBT4L7hs1p1XQYVGMdrY=");
_c = WelcomeSection;
var _c;
__turbopack_context__.k.register(_c, "WelcomeSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_212b55db._.js.map
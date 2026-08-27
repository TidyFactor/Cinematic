<div dir="rtl" align="right">

# 🎬 حزمة الصفحات السينمائية — TidyFactor Cinematic `v3.4.0`
### محرك التجارب الفاخرة التفاعلية بالتمرير — جماليات Apple × Cartier لوكلاء الذكاء الاصطناعي

**المسار الرسمي للتجارب البصرية الفاخرة ضمن منظومة TidyFactor المعمارية.**

```text
                TidyFactor
                    │
          ┌─────────┼─────────┐
          │         │         │
      Cinematic   Design    Styler
          │         │         │
       Experience Prototype Production
          │         │         │
       "Wow"      "Build"   "Ship"
```

[![npm version](https://img.shields.io/npm/v/@alwkala/tidyfactor-cinematic.svg?color=gold&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/tidyfactor-cinematic)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-TidyFactor%2FCinematic-181717.svg?style=for-the-badge&logo=github)](https://github.com/TidyFactor/Cinematic)
[![Universal AI Agents](https://img.shields.io/badge/AI%20Agents-Universal%20Compatibility-4285F4.svg?style=for-the-badge)](README.ar.md)
[![English Docs](https://img.shields.io/badge/Docs-English-blue.svg?style=for-the-badge)](README.md)
[![Zero Build](https://img.shields.io/badge/Build-Zero%20Step-purple.svg?style=for-the-badge)](#-المكدس-التقني)

[✨ المعاينة الحية (Live Demo)](https://alwkala.com/design-system-kit/) • [🚀 طريقة الاستخدام](#-طريقة-الاستخدام-والبداية-السريعة) • [⚡ قائمة الأوامر المتاحة](#-قائمة-الأوامر-الـ-١٧-كاملة) • [🏛️ معمارية المنظومة](#-معمارية-منظومة-tidyfactor) • [📖 التوثيق باللغة الإنجليزية](README.md)

<br/><br/>

<p align="center">
  <img src="assets/hero-banner.png" alt="TidyFactor Cinematic Hero Banner" width="100%" />
</p>

</div>

---

## 🌟 نبذة عن النظام

**Cinematic Landing Kit** هي حزمة ذاكرة وسياق توجّه **أي وكيل ذكاء اصطناعي للبرمجة** (Google Antigravity, Claude Code, Cursor, Windsurf وغيرها) لإنتاج صفحات هبوط سينمائية فاخرة تعمل بالتمرير مع عرض فيلم منتج تفاعلي.

بدلاً من إنتاج مواقع ويب تقليدية وثابتة، يتبع وكيل الذكاء الاصطناعي أنماطاً إنتاجية مجربة لبناء صفحة HTML واحدة تعتمد على تسلسل إطارات `<canvas>`، وحركات GSAP، والتمرير السلس بـ Lenis — **بدون أي أدوات بناء، بدون أدوات تجميع، وبسرعة CDN كاملة.**

```
الوكيل يقرأ AGENTS.md  ←  يتبع ذاكرة memory/ و SKILL.md  ←  ينتج index.html  ←  جاهز للإطلاق 🚀
```

---

## 📺 العرض البصري والمعاينة الحية

> 🌐 **استكشف التجربة التفاعلية الحية:** [alwkala.com/design-system-kit](https://alwkala.com/design-system-kit/)

<div align="center">
  <img src="./CinematicLandingKit.jpg" width="100%" alt="العرض البصري لحزمة الصفحات السينمائية" style="border-radius: 8px; margin-bottom: 12px;"/>
</div>

<table align="center">
  <tr>
    <td width="50%">
      <img src="./screenshot-1.jpg" alt="فيلم التمرير التفاعلي" style="border-radius: 6px;"/>
      <p align="center"><b>فيلم تمرير تفاعلي عبر Canvas</b></p>
    </td>
    <td width="50%">
      <img src="./screenshot-2.jpg" alt="البطل ذو الهالة والقص الشفاف" style="border-radius: 6px;"/>
      <p align="center"><b>عنصر بطل مقطوع بشفافية PNG مع الهالة</b></p>
    </td>
  </tr>
</table>

---

## 🚀 طريقة الاستخدام والبداية السريعة

متاحة رسمياً على منصة NPM باسم [**`@alwkala/create-cinematic-kit`**](https://www.npmjs.com/package/@alwkala/create-cinematic-kit).

### 1. إنشاء مشروع جديد جاهز (Scaffold)
يولّد مجلد مشروع كامل يحتوي على قوالب HTML جاهزة (7 تصاميم فاخرة: `film`, `story`, `space`, `app`, `creator`, `product`, `store`):

```bash
# التشغيل التفاعلي (قائمة لاختيار التصاميم والألوان)
npx @alwkala/create-cinematic-kit

# إنشاء صفحة هبوط لمنتج واحد عالية التحويل مع تحويل واتساب مباشرة
npx @alwkala/create-cinematic-kit my-watch-shop --layout=product

# إنشاء متجر كالوج المنتجات المتعددة مع تحويل الواتساب
npx @alwkala/create-cinematic-kit my-boutique-store --layout=store

# قالب مجلة السيارات والأداء العالي والتجمعات
npx @alwkala/create-cinematic-kit my-car-hub --layout=auto

# العرض السينمائي الكامل (عطور، ساعات، سيارات)
npx @alwkala/create-cinematic-kit my-perfume-brand --layout=film

# إنشاء صفحة تطبيق أو منصة SaaS مع محاكاة جهاز متجاوب
npx @alwkala/create-cinematic-kit my-saas-app --layout=app

# التشغيل التلقائي/لأدوات الذكاء الاصطناعي (بدون أسئلة أو توقف)
npx @alwkala/create-cinematic-kit my-luxury-landing --yes

# أو التثبيت العام على جهازك وتشغيله في أي وقت
npm install -g @alwkala/create-cinematic-kit
create-cinematic-kit my-luxury-landing --layout=store
```

### 2. حقن "مهارة" (Agent Skill) داخل مشروع قائم
قم بحقن ذاكرة وقواعد المهارة في بيئة عملك الحالية ليتمكن وكيل الذكاء الاصطناعي من بنائها وتطويرها:

```bash
npx @alwkala/create-cinematic-kit add-skill

# تحديث وتحديث الملفات القائمة إلى أحدث إصدار
npx @alwkala/create-cinematic-kit add-skill --force
```

يضيف ملف `AGENTS.md` والمهارات والملفات المرجعية (`memory/`) والتوكنز المعتمدة في `brand.json` كمصدر وحيد للهوية.

الناتج النهائي هو **ملف `index.html` واحد بدون خطوة بناء (Zero-Build)** يعمل مباشرة عبر روابط CDN.

---

## ⚡ قائمة الأوامر الـ ١٧ كاملة

عند العمل مع أي بيئة ذكاء اصطناعي (Google Antigravity, Claude Code, Cursor, Windsurf, Roo Code, Cline)، تتوفر الأوامر التالية لاستدعائها فوراً:

| الأمر (Command) | الغرض والوظيفة (Purpose & Function) | ملف المرجع (Reference Spec) |
| :--- | :--- | :--- |
| `init` | **الإنشاء الشامل** — بناء وتدشين صفحة هبوط سينمائية فاخرة كاملة في خطوة واحدة | `references/commands/init.md` |
| `brand` | **قراءة وإنشاء الهوية** — إعداد وشحن ملف `brand.json` (الألوان، الخطوط، النبرة) | `references/commands/brand.md` |
| `clone-brand` | **استخراج الهوية** — سحب واستخراج توكنز الهوية البصرية من موقع قائم أو PDF | `references/commands/clone-brand.md` |
| `media` | **مسار الوسائط والصور** — توليد ومعالجة الصور بالذكاء الاصطناعي وإزالة الخلفيات | `references/commands/media.md` |
| `film` | **محرك السكرول والإطارات** — بناء وتزامن تسلسل فريمات الكانفاس برقم `FRAME_COUNT` | `references/commands/film.md` |
| `hero` | **قسم الهيرو الرئيسي** — ضبط التفاعلات ثلاثية الأبعاد (3D tilt, float, aura, cutouts) | `references/commands/hero.md` |
| `theme` | **منظومة الألوان والنمط** — ضبط ألوان الإضاءة الخلفية (Light/Dark) والتأثيرات المحيطية | `references/commands/theme.md` |
| `typeface` | **الخطوط والطباعة** — ضبط تناسق الخطوط العربية (El Messiri + Tajawal) والأجنبية | `references/commands/typeface.md` |
| `transitions` | **الانتقالات السينمائية** — ربط مقاطع الفيديو والفريمات بانتقالات سلسة ومتطابقة | `references/commands/transitions.md` |
| `i18n` | **اللغات والتوجيه** — دعم العربية/الإنجليزية (RTL/LTR) وقواعد الحشمة والتماثل | `references/commands/i18n.md` |
| `perf` | **مراجعة الأداء** — ميكانيكية مراجعة ومراقبة الفريمات وسرعة التحميل (60FPS Budget) | `references/commands/perf.md` |
| `a11y` | **إتاحة وسهولة الاستخدام** — فحص التباين الشديد (Contrast) ونصوص ARIA والتصفح | `references/commands/a11y.md` |
| `convert` | **تحويل موقع قائم** — إعادة بناء موقع استاتيكي تقليدي إلى المحرك السينمائي | `references/commands/convert.md` |
| `audit` | **تقرير فحص الجودة** — إنشاء تقرير تدقيق شامل لمطابقة أعلى معايير الفخامة الهندسية | `references/commands/audit.md` |
| `variant` | **اختبارات A/B** — إنشاء نسخ وتصاميم بديلة من صفحة هبوط مكتملة | `references/commands/variant.md` |
| `deploy` | **التصدير والمعاينة** — تحسين حجم وسرعة الصور والمعاينة وتصدير الملفات الاستاتيكية | `references/commands/deploy.md` |
| `polish` | **اللمسات النهائية وواجهة الجوال** — قائمة الجوال الزجاجية، زر الواتساب، وزر العودة للأعلى | `references/commands/polish.md` |

---

## 🤖 الوكلاء المدعومون والتوافق

تتفعل الحزمة تلقائياً مع أي وكيل ذكاء اصطناعي يقرأ ملفات تعليمات المشروع (`AGENTS.md`، `.agents/skills/`، `.claude-skill/`، `.cursorrules`، إلخ):

| وكيل الذكاء الاصطناعي | طريقة التكامل | حالة الدعم |
| :--- | :--- | :---: |
| **Google Antigravity** | تلقائي (`AGENTS.md` / `.agents/`) | ✅ |
| **Claude Code** | تلقائي (`AGENTS.md` / `.claude-skill/`) | ✅ |
| **Cursor** | تلقائي (`AGENTS.md` / `.cursorrules`) | ✅ |
| **Windsurf** | تلقائي (`AGENTS.md` / `.windsurfrules`) | ✅ |
| **Roo Code / Cline** | تلقائي (`AGENTS.md` / `.clinerules`) | ✅ |
| **Codex / OpenCode** | تلقائي (`AGENTS.md`) | ✅ |
| **Kilo / Gemini CLI** | تلقائي (`AGENTS.md`) | ✅ |

---

## 🎨 التصاميم وحالات الاستخدام المدعومة

خمسة تصميمات جاهزة تغطي ١٥ حالة استخدام فاخرة يتم توجيهها تلقائياً عبر `memory/10-use-cases.md`:

| تصميم القالب | اسم CLI | نمط الهيرو | تجربة الفيلم | حالات الاستخدام الرئيسية |
| :--- | :--- | :--- | :--- | :--- |
| **`fullbleed.html`** | `film` | عنصر بطل مقطوع + هالة | فيلم تحول طويل (640vh) | المنتجات الفاخرة، الإطلاقات الكبرى، إعادة إطلاق العلامات، السيارات، الساعات |
| **`editorial.html`** | `story` | شاشة مقسمة (صورة + نص) | فيلم قصة مركز (420vh) | قصص العلامات، الفعاليات، المؤتمرات، قصص المؤسسين |
| **`spatial.html`** | `space` | لقطة تأسيسية كاملة | فيلم جولة مكاني (500vh) | العقارات، الهندسة المعمارية، السفر الفاخر، الضيافة |
| **`interface.html`** | `app` | إطار واجهة جهاز | فيلم تدفق الواجهات (420vh) | إطلاق منصات SaaS، التطبيقات، المنصات الرقمية |
| **`minimal.html`** | `creator` | عنصر بطل خلفية نظيفة | مبني على الأقسام (بدون فيلم) | العلامات الشخصية، صناع المحتوى، الكتب الرقمية |
| **`product.html`** | `product` | صورة منتج + السعر + زر واتساب اعلى الصفحة | فيلم اختياري (480vh) | صفحات المبيعات عالية التحويل لمنتج واحد عبر واتساب |
| **`store.html`** | `store` | بانر المتجر + تصفية الفئات | شبكة المنتجات + أزرار واتساب | متجر منتجات متعددة مع تحويل مباشر عبر واتساب |

---

## 🛠️ البنية التقنية وبنية "صفر بناء"

المنتج النهائي هو **ملف `index.html` واحد صافي** لا يتطلب أي أدوات تجميع أو مترجمات:

| المكون | التقنية المستعملة | طريقة التسليم |
| :--- | :--- | :--- |
| **تحريك السكرول** | GSAP 3.12 + ScrollTrigger | CDN (`cdnjs.cloudflare.com`) |
| **التمرير السلس** | Lenis 1.0 | CDN (`cdn.jsdelivr.net`) |
| **التنسيقات** | Tailwind CSS | CDN (`cdn.tailwindcss.com`) |
| **محرك الفيلم** | HTML5 `<canvas>` + تسلسل إطارات JPEG | محلي `assets/seq/f000.jpg` |
| **الطباعة** | خطوط Google Fonts (El Messiri, Tajawal, Cormorant Garamond) | CDN (`fonts.googleapis.com`) |

---

---


---

## 🏛️ معمارية منظومة TidyFactor

**منظومة TidyFactor** هي بيئة معمارية برمجية مفتوحة وحزم مهارات لوكلاء الذكاء الاصطناعي قائمة على الفصل التام للمسؤوليات عبر دورة حياة المنتجات:

```text
منظمة TidyFactor الرسمية (github.com/TidyFactor)
│
├── مهارات التصميم (Design Skills)
│   ├── Cinematic    ← تجربة الإبهار البصري / Experience ("Wow")     (صفحات سينمائية تفاعلية)
│   ├── Design       ← بناء النماذج الأولية / Prototype ("Build")   (محرك تصميم كودي وبديل Figma)
│   └── Styler       ← الجاهزية للإنتاج والتنسيق / Production ("Ship")  (محرك التنسيق ودعم RTL)
│
├── مهارات التطوير البرمجي (Development Skills)
│   ├── HTML         ← المواقع الثابتة وسيو المحتوى / Static & SEO   (هياكل خفيفة وسريعة)
│   ├── HTMX         ← الواجهات التفاعلية الخفيفة / Hypermedia        (تفاعلات بدون جافاسكريبت معقدة)
│   ├── JS           ← تطبيقات الصفحة الواحدة بدون أطر / Vanilla SPA  (نماذج تفاعلية بـ ES Modules)
│   ├── PHP          ← المنظومات المخدمية الحديثة / Server-Rendered  (مكونات حديثة وتطبيقات PHP 8)
│   └── Next         ← منصات الساس متعددة المستأجرين / Multi-Tenant (Next.js 16 + Postgres RLS)
│
└── مهارات النمو والتسويق (Growth Skills)
    └── Marketing    ← استراتيجيات النمو والمبيعات / Growth & SEO    (تسويق الاستجابة المباشرة)
```

### 💎 ثلاثي الواجهات الأمامية والتجربة (Frontend Triad)

```text
                TidyFactor
                    │
          ┌─────────┼─────────┐
          │         │         │
      Cinematic   Design    Styler
          │         │         │
       Experience Prototype Production
          │         │         │
       "Wow"      "Build"   "Ship"
```

### 📦 مصفوفة التكامل الشامل للمجتمع (GitHub • Skill • NPM)

| المسار البرمجي | الفئة | مستودع GitHub | مهارة الوكيل | حزمة NPM |
| :--- | :--- | :--- | :--- | :--- |
| **Cinematic** | التصميم | [`TidyFactor/Cinematic`](https://github.com/TidyFactor/Cinematic) | `tidyfactor-cinematic` | [`@alwkala/create-cinematic-kit`](https://www.npmjs.com/package/@alwkala/create-cinematic-kit) |
| **Design** | التصميم | [`TidyFactor/Design`](https://github.com/TidyFactor/Design) | `tidyfactor-design` | [`@alwkala/tidyfactor-design`](https://www.npmjs.com/package/@alwkala/tidyfactor-design) |
| **Styler** | التصميم | [`TidyFactor/Styler`](https://github.com/TidyFactor/Styler) | `tidyfactor-styler` | [`@alwkala/tidyfactor-styler`](https://www.npmjs.com/package/@alwkala/tidyfactor-styler) |
| **Next** | التطوير | [`TidyFactor/Next`](https://github.com/TidyFactor/Next) | `tidyfactor-next` | [`@alwkala/tidyfactor-next`](https://www.npmjs.com/package/@alwkala/tidyfactor-next) |
| **HTML** | التطوير | [`TidyFactor/HTML`](https://github.com/TidyFactor/HTML) | `tidyfactor-html` | [`@alwkala/tidyfactor-html`](https://www.npmjs.com/package/@alwkala/tidyfactor-html) |
| **HTMX** | التطوير | [`TidyFactor/HTMX`](https://github.com/TidyFactor/HTMX) | `tidyfactor-htmx` | [`@alwkala/tidyfactor-htmx`](https://www.npmjs.com/package/@alwkala/tidyfactor-htmx) |
| **JS** | التطوير | [`TidyFactor/JS`](https://github.com/TidyFactor/JS) | `tidyfactor-js` | [`@alwkala/tidyfactor-js`](https://www.npmjs.com/package/@alwkala/tidyfactor-js) |
| **PHP** | التطوير | [`TidyFactor/PHP`](https://github.com/TidyFactor/PHP) | `tidyfactor-php` | [`@alwkala/tidyfactor-php`](https://www.npmjs.com/package/@alwkala/tidyfactor-php) |
| **Marketing** | النمو | [`TidyFactor/Marketing`](https://github.com/TidyFactor/Marketing) | `tidyfactor-marketing` | [`@alwkala/tidyfactor-marketing`](https://www.npmjs.com/package/@alwkala/tidyfactor-marketing) |

---

## 👨‍💻 المنظمة والتواصل والدعم

- 🌐 **الموقع الرسمي للمنظومة:** [https://tidyfactor.com/](https://tidyfactor.com/)
- 📚 **التوثيق الرسمي المعتمد:** [https://tidyfactor.com/documentation](https://tidyfactor.com/documentation)
- 🤝 **الشريك التقني الرسمي:** [الوكالة الرقمية Alwkala](https://alwkala.com/)
- 🐙 **منظمة GitHub الرسمية:** [github.com/TidyFactor](https://github.com/TidyFactor)
- 📧 **استفسارات الأعمال والشركات:** [hello@tidyfactor.com](mailto:hello@tidyfactor.com)
- 📱 **واتساب:** [+20 101 665 6899](https://wa.me/201016656899)
- 📞 **الهاتف:** +20 101 665 6899
- 📍 **المقر:** القاهرة، جمهورية مصر العربية

---

## 📜 الترخيص والمجتمع

مرخصة تحت رخصة **Apache License 2.0**. حقوق النشر محفوظة (c) 2026 لصالح [منظومة TidyFactor](https://tidyfactor.com) و[الوكالة الرقمية Alwkala](https://alwkala.com).

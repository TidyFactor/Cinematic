<div dir="rtl" align="right">

# 🎬 حزمة الصفحات السينمائية — Cinematic Landing Kit `v2.0.0`

**تجربة سينمائية بأسلوب Apple × Cartier — صفحات هبوط تفاعلية فاخرة تُعرض بالتمرير لأي وكيل ذكاء اصطناعي**

[![npm version](https://img.shields.io/npm/v/@alwkala/create-cinematic-kit.svg?color=gold&style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![npm downloads](https://img.shields.io/npm/dm/@alwkala/create-cinematic-kit.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@alwkala/create-cinematic-kit)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![English Docs](https://img.shields.io/badge/Docs-English-blue.svg?style=for-the-badge)](README.md)
[![Zero Build](https://img.shields.io/badge/Build-Zero%20Step-purple.svg?style=for-the-badge)](#-المكدس-التقني)

[✨ المعاينة الحية (Live Demo)](https://alwkala.com/design-system-kit/) • [🚀 البداية السريعة](#-البداية-السريعة-عبر-npx) • [🤖 مهارة Claude](#-لمستخدمي-claudeai--claude-code) • [📖 التوثيق باللغة الإنجليزية](README.md)

---

## 🌟 نبذة عن النظام

**Cinematic Landing Kit** هي حزمة ذاكرة وسياق توجّه **أي وكيل ذكاء اصطناعي للبرمجة** (Claude Code, Cursor, Antigravity, Windsurf وغيرها) لإنتاج صفحات هبوط سينمائية فاخرة تعمل بالتمرير مع عرض فيلم منتج تفاعلي.

بدلاً من إنتاج مواقع ويب تقليدية وثابتة، يتبع وكيل الذكاء الاصطناعي أنماط إنتاجية مجربة لبناء صفحة HTML واحدة تعتمد على تسلسل إطارات `<canvas>`، وحركات GSAP، والتمرير السلس بـ Lenis — **بدون أي أدوات بناء، بدون أدوات تجميع، وبسرعة CDN كاملة.**

```
الوكيل يقرأ AGENTS.md  ←  يتبع ذاكرة memory/  ←  ينتج index.html  ←  جاهز للإطلاق 🚀
```

---

## 📺 العرض البصري والمعاينة الحية

> 🌐 **استكشف التجربة التفاعلية الحية:** [alwkala.com/design-system-kit](https://alwkala.com/design-system-kit/)

<div align="center">
  <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/CinematicLandingKit.jpg" width="100%" alt="العرض البصري لحزمة الصفحات السينمائية" style="border-radius: 8px; margin-bottom: 12px;"/>
</div>

<table align="center">
  <tr>
    <td width="50%">
      <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-1.jpg" alt="فيلم التمرير التفاعلي" style="border-radius: 6px;"/>
      <p align="center"><b>فيلم تمرير تفاعلي عبر Canvas</b></p>
    </td>
    <td width="50%">
      <img src="https://github.com/alwkala/Cinematic-Landing-Kit/blob/main/screenshot-2.jpg" alt="البطل ذو الهالة والقص الشفاف" style="border-radius: 6px;"/>
      <p align="center"><b>عنصر بطل مقطوع بشفافية PNG مع الهالة</b></p>
    </td>
  </tr>
</table>

---

## 🚀 البداية السريعة عبر NPX

متاحة رسمياً على NPM: [**`@alwkala/create-cinematic-kit`**](https://www.npmjs.com/package/@alwkala/create-cinematic-kit).

### الخيار الأول: إنشاء مشروع سينمائي جديد
قم بتشكيل مشروع جديد مجهز بالكامل خلال ثوانٍ:
```bash
npx @alwkala/create-cinematic-kit my-luxury-landing
```

### الخيار الثاني: تثبيت مهارة الذكاء الاصطناعي في مشروع قائم
قم بحقن ذاكرة وقواعد الحزمة في بيئة عملك الحالية:
```bash
npx add-cinematic-skill
```

---

## 🤖 الوكلاء المدعومون والتوافق

تتفعل الحزمة تلقائياً مع أي وكيل ذكاء اصطناعي يقرأ ملفات تعليمات المشروع (`AGENTS.md`، `.cursorrules`، system prompts، إلخ):

| وكيل الذكاء الاصطناعي | طريقة التكامل | حالة الدعم |
| :--- | :--- | :---: |
| **Claude Code** | تلقائي (`AGENTS.md` / `.claude-skill/`) | ✅ |
| **Google Antigravity** | تلقائي (`AGENTS.md` / `.agents/`) | ✅ |
| **Cursor** | تلقائي (`AGENTS.md` / `.cursorrules`) | ✅ |
| **Windsurf** | تلقائي (`AGENTS.md` / `.windsurfrules`) | ✅ |
| **Roo Code / Cline** | تلقائي (`AGENTS.md` / `.clinerules`) | ✅ |
| **Codex / OpenCode** | تلقائي (`AGENTS.md`) | ✅ |
| **Kilo / Gemini CLI** | تلقائي (`AGENTS.md`) | ✅ |

---

## ⚡ لماذا تفشل وكلاء الذكاء الاصطناعي بدون هذه الحزمة

| المشكلة بدون هذه الحزمة | الحل مع حزمة الصفحات السينمائية |
| :--- | :--- |
| ❌ استخدام `video.currentTime` (تقطيع وتلعثم في الحركة) | ✅ **فيلم إطارات متعاقبة على Canvas** (عرض سلس 60 إطار/ثانية) |
| ❌ خلل `mix-blend-mode` عند التحريك بـ GSAP | ✅ **صور مقطوعة بشفافية PNG** عبر `rembg` |
| ❌ انتقالات مكسورة وتلاشي أشباح بين الصور | ✅ **مقاطع فيديو متطابقة الحدود والمشاهد** |
| ❌ خطوط عشوائية أو خطوط نسخية غير مناسبة | ✅ **الطباعة العربية الفاخرة (El Messiri + Tajawal + Cormorant)** |
| ❌ أصول غير متسقة أو صور وهمية | ✅ **خط أنابيب متعدد المزودين** (Nano Banana, Qwen/Wan, Higgsfield) |
| ❌ توقف حركات `requestAnimationFrame` في التبويب المخفي | ✅ **سير تحقق واختبار برمجي عبر `eval`** |

### المقارنة: صفحة تقلييدية مقابل تجربة سينمائية

| الميزة | صفحة هبوط تقليدية | حزمة الصفحات السينمائية `v2.0.0` |
| :--- | :--- | :--- |
| **معالجة البطل** | بنر ثابت + تلاشي بسيط | هالة بصرية، ميل ثلاثي الأبعاد وسرد تفاعلي |
| **حركة المنتج** | انتقالات CSS عادية | فيلم Canvas مربوط بسلاسة بتقدم التمرير |
| **تجربة المستخدم** | صفحة ثابتة مثل معظم المواقع | إحساس إعلان تلفزيوني فاخر (Apple × Cartier) |
| **تطبيق الهوية** | تعديل يدوي في أسطر CSS | مصدر حقيقة وحيد عبر ملف **`brand.json`** |
| **التوطين واللغات** | ترجمة نصوص فقط | دعم أصيل لـ RTL/LTR والخطوط والثقافة |
| **إعداد البناء** | أدوات بناء معقدة (Vite, React, Node) | **ملف `index.html` واحد عبر CDN — صفر بناء** |

---

## 📦 محتويات الحزمة

```
├── AGENTS.md                         ← نقطة الدخول التي يقرأها أي وكيل تلقائياً
├── brand.json                        ← المصدر الوحيد لهوية العلامة التجارية والرموز
├── memory/                           ← ١٦ ملف مرجعي (الحمض النووي للتصميم والحركة)
│   ├── 01-build-playbook.md             هيكل الصفحة، محرك Lenis + GSAP
│   ├── 02-scroll-film-canvas.md         ★ تقنية إطارات Canvas للفيلم
│   ├── 03-seamless-transitions.md       مقاطع فيديو متطابقة الحدود
│   ├── 04-cinematic-hero.md             دخول البطل، الهالة، الميل البصري، والقص
│   ├── 05-theming.md                    السمات الفاتحة/الداكنة وفخ blend-mode
│   ├── 06-media-pipeline.md             ★ اختيار المزود وخط الأنابيب المشترك
│   ├── 06-media-pipeline-nanobanana.md  Nano Banana (أداة generate_image)
│   ├── 06-media-pipeline-qwen.md        Qwen Image + Wan (DashScope API)
│   ├── 06-media-pipeline-higgsfield.md  Higgsfield CLI
│   ├── 07-modesty-and-identity.md       ضوابط الحشمة وهوية المنتج غير القابلة للتفاوض
│   ├── 08-preview-and-env-gotchas.md    مشاكل التبويب المخفي وسير التحقق عبر eval
│   ├── 09-quality-bar.md                قائمة الجودة ومعايير الرفض التلقائي
│   ├── 10-use-cases.md                  ★ توجيه حالات الاستخدام: ١٥ حالة → القوالب
│   ├── 11-brand-json.md                 ★ مخطط brand.json وربط المتغيرات والنبرة
│   ├── 12-arabic-typography.md          الطباعة العربية الفاخرة ومصفوفة الانطباعات
│   ├── 13-performance-budget.md         ميزانية الأداء وضوابط 60 إطار/ثانية
│   ├── 14-accessibility.md              إتاحة الوصول (A11y)، دعم RTL والتركيز
│   ├── 15-brand-extraction.md           استخراج هوية brand.json من مواقع قائمة
│   └── 16-variants.md                   إنشاء النسخ والمتغيرات والتجربة (A/B)
├── .claude-skill/                    ← غلاف مهارات Claude (يشمل SKILL.md و17 أمراً)
├── tools/                            ← أداة التغليف build-skill.js
├── templates/
│   ├── layouts/                       ← ٥ قوالب تصميم جاهزة
│   │   ├── fullbleed.html                فيلم تمرير طويل + بطل هالة (قصص التحول والمنتجات الفاخرة)
│   │   ├── editorial.html                بطل مقسم + فيلم مواصفات (المنتجات كثيفة المواصفات)
│   │   ├── spatial.html                  لقطة تأسيسية + فيلم جولة مكاني (العقارات والضيافة)
│   │   ├── interface.html                إطار واجهة جهاز + فيلم تدفق UI (المنصات والتطبيقات)
│   │   └── minimal.html                  بطل مركزي بدون فيلم Canvas (المنتجات الرقمية والكتب)
│   ├── MEDIA-PROMPTS-higgsfield.template.md   قائمة أوامر Higgsfield
│   ├── MEDIA-PROMPTS-nanobanana.template.md   قائمة أوامر Nano Banana
│   ├── MEDIA-PROMPTS-qwen.template.md         قائمة أوامر Qwen/Wan
│   └── launch.json                    إعدادات خادم المعاينة
└── scripts/                          ← أدوات Python مساعدة (بدون الحاجة لـ ffmpeg أو jq)
    ├── remove_backgrounds.py            rembg ← صور شفافة
    ├── prepare_images.py                تحويل PNG ← JPEG
    ├── optimize_assets.py               تقليص حجم البطل والشعار للويب
    ├── generate_transitions.py          توليد إطارات الانتقالات
    ├── check_alpha.py                   التحقق من شفافية PNG
    ├── create_mock_videos.py            توليد مقاطع وهمية للاختبار
    └── inspect_images.py                فحص خصائص الصور
```

---

## 🤖 لمستخدمي Claude.ai / Claude Code

ملف `AGENTS.md` هو المصدر الأساسي العابر للوكلاء. بالنسبة لـ **Claude Code** و **Claude.ai**، يغلف المجلد `.claude-skill/` هذه الحزمة كمهارة Claude قابلة للتثبيت وتدعم **١٧ أمراً تفاعلياً** (`init`, `brand`, `media`, `film`, `hero`, `theme`, `transitions`, `i18n`, `convert`, `audit`, `deploy`, `typeface`, `perf`, `a11y`, `clone-brand`, `variant`).

يمكنك بناء وتجميع حزمة `.skill` القابلة للتوزيع في أي وقت عبر:
```bash
node tools/build-skill.js
# ← ينتج الملف dist/tidyfactor-cinematic.skill
```

---

## 🎨 القوالب وحالات الاستخدام المدعومة

تغطي القوالب الخمسة ١٥ حالة استخدام فاخرة يتم توجيهها تلقائياً عبر `memory/10-use-cases.md`:

| القالب | معالجة البطل | تجربة الفيلم | أبرز حالات الاستخدام |
| :--- | :--- | :--- | :--- |
| **`fullbleed.html`** | منتج مقطوع + هالة + جسيمات | فيلم تحول طويل (640vh) | المنتجات الفاخرة، الإطاقات الكبرى، السيارات، الأزياء، الساعات |
| **`editorial.html`** | شاشة مقسمة (صورة + نص) | فيلم أقصر للمواصفات (420vh) | قصص العلامات التجارية، الفعاليات، المؤتمرات، صفحات المؤسسين |
| **`spatial.html`** | لقطة تأسيسية كاملة | فيلم جولة مكانية (500vh) | العقارات، الهندسة المعمارية، السفر الفاخر، الضيافة |
| **`interface.html`** | واجهة جهاز (إطار CSS) | فيلم تدفق واجهة المستخدم (420vh) | منصات SaaS، التطبيقات الذكية، المنصات الرقمية |
| **`minimal.html`** | بطل مركزي خلفية نظيفة | مقاطع مستقلة (بدون فيلم) | العلامات الشخصية، صناع المحتوى، الكتب والمنتجات الرقمية |

---

## 🛠️ المكدس التقني وصفر بناء

الصفحة الناتجة هي **ملف `index.html` واحد صافي** لا يتطلب أي أدوات بناء أو محولات برمجية:

| الطبقة التقنية | التقنية المستعملة | طريقة التزويد |
| :--- | :--- | :--- |
| **محرك التمرير** | Lenis 1.0 | CDN |
| **مكدس الحركة** | GSAP 3.12 + ScrollTrigger | CDN |
| **التنسيقات** | Tailwind CSS | CDN |
| **الطباعة والخطوط** | Google Fonts (El Messiri, Tajawal, Cormorant) | CDN |
| **فيلم المنتج** | `<canvas>` + تسلسل إطارات JPG مرقمة | أصول محلية `assets/seq/` |
| **قص البطل** | PNG شفاف (`rembg`) | أصول محلية `assets/` |

---

## 🔧 أدوات Python المساعدة الاختيارية

صفحة الهبوط نفسها **لا تملك أي تبعيات**. سكربتات Python هي مساعدات اختيارية لتوليد وتحسين الأصول:

```bash
# تثبيت التبعيات الاختيارية لسكربتات معالجة الصور
pip install rembg Pillow opencv-python dashscope
```

---

## 🤝 المساهمة ومعايير المجتمع

نرحب بمساهماتكم! إذا اكتشفت أي ملحوظة أو مشكلة جديدة، أضفها إلى `memory/` — كل درس نكتسبه يمنع وكلاء الذكاء الاصطناعي المستقبليين من تكرار نفس الخطأ.

يرجى الاطلاع على:
* 📜 [ميثاق مدونة السلوك](CODE_OF_CONDUCT.md)
* 🛠️ [دليل المساهمة](CONTRIBUTING.md)

---

## 📄 الرخصة

هذا المشروع مرخص بموجب [رخصة MIT](LICENSE). أنشأه [alwkala](https://github.com/alwkala). مجاني للاستخدام الشخصي والتجاري.

</div>

🎨 BeingOG Design System
The single source of truth for BeingOG's visual identity.
Every UI decision must reference this document.

🌟 Brand North Star
BeingOG is the operating system for ambitious students.
Every screen should make the user think: "This looks insanely premium. Who built this?"

Emotional target: Apple quality × Linear polish × modern AI startup.
Craft target: Social-media worthy. Every screen shareable on Instagram, LinkedIn, X.

🧬 Brand Personality
Premium
Elegant
Powerful
Confident
Motivating
Modern
Intelligent
Minimal but rich
Future-ready
Luxury technology
🎨 Color Tokens
Primary Palette
Token	Light Mode	Dark Mode	Usage
primary	#4F46E5 Deep Indigo	#818CF8 Electric Indigo	Buttons, links, CTAs
primary-glow	—	#6366F1 @ 30% blur	Dark-mode glowing borders
secondary	#8B5CF6 Royal Purple	#A78BFA	Gradients, badges
success	#10B981 Emerald	#34D399	Achievements, streak wins, XP
streak	#F59E0B Amber	#FBBF24	Streaks, fire icons
danger	#EF4444	#F87171	Errors, destructive actions
Surfaces
Token	Light Mode	Dark Mode
background	#FAFAFA warm off-white	#0A0A0F deep charcoal
surface	#FFFFFF pure white	#111118 navy-charcoal
surface-elevated	#FFFFFF + shadow	#1A1A24 graphite
border	#E5E5E7	#27272F
border-subtle	#F5F5F5	#1F1F27
Text
Token	Light Mode	Dark Mode
text-primary	#0A0A0F	#FAFAFA
text-secondary	#525252	#A1A1AA
text-muted	#A1A1AA	#71717A
Rule: never use pure black #000 on light mode or pure white #FFF on dark mode — harsh, unprofessional.

🔤 Typography
Font Families
Font	Usage	Weights
Space Grotesk	Display headings, hero text, section titles	500 / 600 / 700
Inter	Body text, UI labels, buttons, inputs	400 / 500 / 600
JetBrains Mono	Code snippets, terminal-like UI, technical badges	400 / 500
All three from Google Fonts. Load via next/font for zero CLS.

Type Scale
Token	Size	Line Height	Usage
text-xs	12px	16px	Metadata, timestamps
text-sm	14px	20px	Secondary text
text-base	16px	24px	Body
text-lg	18px	28px	Emphasized body
text-xl	20px	28px	Small headings
text-2xl	24px	32px	Card titles
text-3xl	30px	36px	Section headings
text-4xl	36px	40px	Page titles
text-5xl	48px	52px	Hero secondary
text-6xl	60px	64px	Hero primary (mobile)
text-7xl	72px	76px	Hero primary (desktop)
📐 Layout Tokens
Border Radius
Element	Radius
Cards	16px
Buttons	10px
Inputs	10px
Pills / Badges	999px (fully round)
Modals	20px
Avatars	999px
Spacing Scale
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px

Container
Max width: 1280px
Horizontal padding: 24px (mobile) → 48px (desktop)
🌫️ Shadows & Effects
Shadow Tokens
Token	Light Mode	Dark Mode
shadow-soft	0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)	0 1px 2px rgba(0,0,0,0.4)
shadow-elevated	0 4px 6px rgba(0,0,0,0.04), 0 10px 24px rgba(0,0,0,0.08)	0 4px 6px rgba(0,0,0,0.4), 0 10px 24px rgba(0,0,0,0.6)
shadow-glow	— (only dark mode)	0 0 40px rgba(99,102,241,0.35)
Glass Effect (dark mode only)
text

background: rgba(17, 17, 24, 0.6)
backdrop-filter: blur(24px)
border: 1px solid rgba(255,255,255,0.08)
Use sparingly — only for floating navs, command palettes, and premium modals.

✨ Motion Principles
Interaction	Behavior	Duration	Easing
Entrance	Fade + slide up 8px	400ms	ease-out
Micro press	Scale 0.98	150ms	ease-out
Page transition	Cross-fade	200ms	ease-in-out
Hover lift	Scale 1.02 + shadow up	200ms	ease-out
Modal open	Fade + scale from 0.95	250ms	ease-out
Rules:

No bouncy spring animations except celebratory moments (achievements, streak milestones)
No animation longer than 500ms
Respect prefers-reduced-motion
🚫 Anti-Patterns (Never Do These)
❌ Pure black backgrounds
❌ Pure white on dark mode
❌ Bootstrap-looking cards
❌ Default browser fonts
❌ Harsh 3D drop shadows
❌ Neon colors
❌ Rainbow gradients
❌ Random emoji everywhere
❌ Skeuomorphic elements
❌ Modal chains (multiple stacked modals)
❌ Auto-play videos with sound
🎯 Component Design Principles
Whitespace is a feature — never cram, always breathe.
Hierarchy first — user should know where to look in 1 second.
Consistency over cleverness — reuse patterns, don't reinvent.
Motion has meaning — every animation clarifies, never decorates.
Every component works in both themes — test both, always.
Mobile-first, desktop-perfect — small screens force clarity.
Accessibility is not optional — WCAG AA minimum on every color pair.
This document is a living spec. Update it when we make major design decisions — never let it drift.
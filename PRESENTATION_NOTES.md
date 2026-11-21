# notGoogle — Presentation notes (Hebrew)

## Core idea
הניסוי בודק עד כמה אפשר ליצור דף שמרגיש מוכר, ומדוע המראה החיצוני של ממשק אינו מוכיח את זהותו או את אמינותו. זהו אתר דמו עצמאי שאינו קשור ל-Google ואינו אוסף אישורים אמיתיים.

## Short speaker script (~60–90 seconds)

> התחלנו מצילום מסך של Google ומצד שני צילום מסך של האתר שלנו. חילקנו את הממשק לרכיבים: כותרת עליונה, לוגו, חיפוש, כפתורים, תפריט אפליקציות ו-Footer.
>
> לאחר מכן השתמשנו בכלי המפתחים של הדפדפן כדי להבין איך בונים ממשקים כאלה: HTML ו-DOM לתוכן, CSS לפריסה ולצבעים, ו-JavaScript להתנהגות של כפתורים ותפריטים. לא העתקנו את הקוד הפנימי של Google אלא ניסינו לשחזר את החוויה מתוך תצפית, בדיקות והשוואה.
>
> במקום לצייר כל אייקון מחדש, חיפשנו מאגרי SVG קיימים. כך השתמשנו בסמלים צבעוניים, שמרנו אותם אצלנו בפרויקט ותיעדנו את המקורות. אחר כך השווינו צילומים כדי למצוא פערים, כמו גובה שורת החיפוש, המיקום של הלוגו והאייקונים.
>
> בהדגמה אפשר לחפש באתר שלנו ולעבור לתוצאות החיפוש האמיתיות של Google. ב-Inspector נראה שהשאילתה הוקלדה באתר המתווך לפני ההפניה, ומה קוד הדף היה יכול לדעת על הפעולה.
>
> כדי להמחיש את הסיכון שבהזנת סיסמה באתר שגוי, בנינו מסך התחברות ניסיוני עם חשבון וסיסמה פיקטיביים בלבד. JavaScript יכול לקרוא את סיסמת הדמה, אך במקרה שלנו אין שליחה ברשת או שמירה. כך אפשר להדגים את הרעיון בלי לאסוף פרטים אמיתיים.
>
> המסקנה: HTTPS עשוי להצפין את התקשורת, אבל אינו מוכיח שהדומיין הוא האתר שהתכוונתי להגיע אליו. בודקים את כתובת האתר, ונזהרים במיוחד בהתחברויות. בהתחברות רשמית דרך Google OAuth, האתר החיצוני לא מקבל את סיסמת חשבון Google.

## Demonstration sequence
1. **Look** — open the search page and compare it with the supplied Google reference screenshot.
2. **Interact** — press Apps Launcher; show colorful icons and real destination links.
3. **Redirect** — search a harmless test query; explain which page read the query before navigation.
4. **Demo sign-in** — click the demo profile; use `demo@example.test` and `LabOnly-123!`. Both are fictional.
5. **Reveal** — show the lab, demonstration password, local event timeline, and the distinction between actual observed actions and hypothetical risk.
6. **Defend** — check the address bar; contrast an imitating form with an official OAuth/Google sign-in flow.

## What was actually implemented
- HTML/CSS/JavaScript interface and responsive layout
- Search form that navigates to Google's official search service
- Self-hosted SVG reference assets with attribution: `assets/icons/ATTRIBUTION.md`
- Local search/event history in browser localStorage (not private account data)
- Two-step fictional login; rejects any password except the known synthetic password, clears input, no credential storage, no POST
- Reveal and local event export; security and architecture explanations
- Source comparisons and open QA gaps in `QA.md`

## Claims to avoid
- Do not claim that the project actually exfiltrated a password.
- Do not claim that Google supplied its internal source code.
- Do not claim that HTTPS by itself authenticates the brand.
- Do not claim that a screenshot proves full functional equivalence.

## Source references
- Google Account Help, Sign in with Google and password sharing: https://support.google.com/accounts/answer/12921417
- Google Safety Center, passkeys and secure sign-in: https://safety.google/safety/authentication/

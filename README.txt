# SEE Batch of 2082 — Website Guide
================================================

## 📁 FOLDER STRUCTURE
Keep all files like this (don't rename the folders):

```
see-batch-2082/
│
├── index.html        ← Homepage
├── teachers.html     ← Messages from Teachers
├── style.css         ← All styles (don't need to touch this)
├── script.js         ← All interactivity (don't need to touch this)
│
└── images/           ← PUT ALL PHOTOS IN HERE
    ├── group-photo.jpg    ← Your class group photo (landscape, any size)
    ├── teacher-1.jpg      ← Grade Teacher / C.Math (Moksha section)
    ├── teacher-2.jpg      ← Grade Teacher / Nepali (Nirvana section)
    ├── teacher-3.jpg      ← Computer teacher
    ├── teacher-4.jpg      ← Science teacher
    ├── teacher-5.jpg      ← O.Math teacher
    └── teacher-6.jpg      ← Accounts & Economics teacher
```

> ✅ Photos can be .jpg or .png. Recommended size: at least 400×400px for teacher
>    photos, and at least 1200×675px (16:9) for the group photo.

---

## ✏️ HOW TO EDIT THINGS

### Change the homepage message:
Open `index.html`, find `<p class="message-text">`, and replace the text inside.

### Add your WhatsApp link:
Open `index.html`, find `YOUR_WHATSAPP_LINK_HERE`, replace with your actual link.
Example: https://chat.whatsapp.com/AbCdEfGhIjK

### Add your Drive link:
Open `index.html`, find `YOUR_DRIVE_LINK_HERE`, replace with your actual link.
Example: https://drive.google.com/drive/folders/XXXXXXXX

### Add teacher names:
Open `teachers.html`. Find `Teacher Name 1` through `Teacher Name 6` and replace each.

### Add teacher messages:
Open `teachers.html`. Find the `<p class="teacher-message placeholder">` for each teacher
and replace the placeholder text with their actual message.
Also change `class="teacher-message placeholder"` to just `class="teacher-message"` 
so it shows in the normal color instead of the faded placeholder color.

### Add teacher photos:
1. Put the photo in the `images/` folder with the right name (teacher-1.jpg, etc.)
2. In `teachers.html`, for that teacher's card, find the `<span>` emoji line and delete it
3. Uncomment (remove the `<!--` and `-->`) around the `<img>` tag below it

### Add the group photo:
1. Put your photo in `images/group-photo.jpg`
2. In `index.html`, find `<div class="photo-placeholder">` and delete that whole block
3. Uncomment the `<img src="images/group-photo.jpg" ...>` line below it

---

## 🎉 SURPRISES — Here's what's hidden!

1. 🎊 **Confetti Burst** — Click the big "SEE Batch of 2082" title on the homepage
   and it explodes in golden confetti!

2. 🌟 **Floating Gold Particles** — Tiny golden dust particles are always floating
   in the background on every page.

3. 🖱️ **Custom Gold Cursor** — Your cursor is replaced with a small gold dot and
   a ring that lazily follows it around.

4. ✦ **Easter Egg Modal** — Click the tiny "✦ click me ✦" text at the very bottom
   of any page's footer to reveal a secret message.

5. 🎮 **Konami Code** — On your keyboard, type:
   ↑ ↑ ↓ ↓ ← → ← → B A
   (arrow keys, then B, then A)
   This triggers a MEGA confetti celebration across the whole screen!

6. 📅 **Days Together Counter** — The homepage shows a live counter of how many
   days the batch has been together (counting from April 2023 / start of Grade 9).
   To update the start date: open `script.js`, find `startDate`, and change it.

7. 🌊 **Scroll Animations** — Every section fades in gracefully as you scroll down.
   It makes the site feel alive!

---

## 🌐 HOW TO OPEN THE WEBSITE
Just double-click `index.html` — it opens in your browser. No internet or server needed
(except for loading fonts, which requires an internet connection).

To share it with your batch, you can:
- Upload the whole folder to GitHub Pages (free hosting)
- Use Netlify Drop (drag the folder to netlify.com/drop)
- Share the folder via Google Drive and let people open it locally

---

Made with ✦ for SEE Batch of 2082

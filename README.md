# vibecode.dev — landing page

Neobrutalist, fast, dependency-free landing page.

## Files
- `index.html`: content + structure
- `styles.css`: neobrutalist theme (bold borders, offset shadows, high contrast)
- `script.js`: mobile nav, smooth scroll, toast UI, clipboard copy, simple “signup” placeholder

## Run locally
Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Hook up the signup
The form is currently a front-end placeholder. Connect `script.js` form submit to your email tool / backend endpoint.

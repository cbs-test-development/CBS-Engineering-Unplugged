# CBS Engineering Unplugged — Website

This is the public website for the CBS Engineering Unplugged forum, replacing the
Microsoft Loop page (which required an org login).

## How to update the content (no coding required)

All of the text and tables on the site live in one file: **`data.js`**.

1. Open `data.js` in any text editor (Notepad, VS Code, GitHub's built-in editor, etc.).
2. Find the section you want to change — it's labeled with comments like
   `// ---- Upcoming Session ----`.
3. Edit the text between the quotes `"..."`.
4. To add a new row to a table (like Session Archive or Proposed Topics),
   copy an existing `{ ... }` block, paste it, and edit the values.
5. To delete a row, delete its whole `{ ... }` block (including the trailing comma).
6. Save the file and commit/push the change (or edit directly on GitHub.com —
   see below). GitHub Pages rebuilds the site automatically within a minute or two.

### Editing directly on GitHub.com (easiest, no software needed)

1. Go to the repository on GitHub.
2. Click on `data.js`.
3. Click the pencil (✏️) icon to edit.
4. Make your changes.
5. Scroll down, add a short commit message, and click "Commit changes".
6. The live site updates automatically shortly after.

### Adding recordings/slides links

For each session in `sessionArchive`, set `recordingUrl` and `slidesUrl` to the
SharePoint (or OneDrive/YouTube) link:

1. Open the recording or slide deck in SharePoint.
2. Click **Share → Copy link**.
3. Paste that link as the value of `recordingUrl` or `slidesUrl`, in quotes.

Leave a URL as `""` (empty) if there's nothing to link to yet — the label
will show as plain text instead of a clickable link.

## Publishing on GitHub Pages (For reference, changes published automatically) 

1. In the repository, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Choose the `main` branch and `/ (root)` folder, then Save.
4. GitHub will give you a URL like `https://<org-or-user>.github.io/<repo-name>/`.

## File overview

- `index.html` — page structure (rarely needs edits)
- `style.css` — visual styling (rarely needs edits)
- `data.js` — **all editable content lives here**
- `app.js` — renders `data.js` onto the page (rarely needs edits)
- `images/hero.png` — banner image at the top of the page
- `reference/` — original Loop PDF/image kept for reference, not used by the live site

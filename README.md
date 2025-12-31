# Eleventy ESM Minimal Site (Eleventy 3.1.2)

Tiny Eleventy starter using **ESM** (`"type": "module"` + `eleventy.config.js`).

## Requirements
- Node.js 18+ recommended

## Install
```bash
npm install
```

## Run locally
```bash
npm run start
```

## Build
```bash
npm run build
```

## Files included
- Home (`/`)
- About (`/about/`)
- Blog index (`/blog/`) + sample post(s)
- `sitemap.xml`
- `humans.txt`
- `robots.txt`
- `LICENSE` (MIT)
- `.gitignore` (macOS-friendly)

## package.json explained

The `package.json` file is the configuration file for your Node.js project. Here's what each part does:

### Project Information
- **`name`**: Your project's identifier (lowercase, no spaces)
- **`version`**: Current version of your site using semantic versioning (major.minor.patch)
- **`private`**: Set to `true` to prevent accidentally publishing this to the npm registry
- **`type`**: Set to `"module"` to enable modern ES6 modules (use `import`/`export` instead of `require`)

### Scripts
Commands you can run with `npm run <script-name>`:

- **`npm start`** → Runs `npx @11ty/eleventy --serve`
  - Development mode: builds your site and starts a local server with auto-reload
  - Your site will be available at http://localhost:8080
  - Any changes you make will automatically refresh the browser

- **`npm run build`** → Runs `npx @11ty/eleventy`
  - Production mode: builds your site once to the `_site` folder
  - Use this command before deploying to a web host

### Dependencies
- **`devDependencies`**: Packages your project needs during development
  - **`@11ty/eleventy`**: The static site generator that powers this site
  - Version `3.1.2` is specified to ensure consistency
  - These dependencies are only needed during development, not in production

## Content Explained

This section breaks down the project structure so you understand what each folder and file type does.

### Root Level Files

#### `eleventy.config.js`
The main configuration file for Eleventy. This is where you:
- Define custom filters (like date formatting)
- Configure which files get copied to output
- Create collections (groups of content like blog posts)
- Set directory paths for input/output
- Choose your templating engine (Nunjucks in this case)

#### `.gitignore`
Tells Git which files to ignore (like `node_modules/` and `_site/`)

### Folders

#### `content/` (Input Folder)
This is where all your source content lives. Everything here gets processed by Eleventy:

- **`index.md`** - Your homepage (becomes `/index.html`)
- **`about.md`** - About page (becomes `/about/index.html`)
- **`contact.md`** - Contact page (becomes `/contact/index.html`)

#### `content/_data/`
Global data files that are accessible in all templates:

- **`metadata.json`** - Site-wide settings like title, description, author, navigation menu
  - Access in templates with: `{{ metadata.title }}`
  - Used for consistent branding across your site

#### `content/_includes/`
Reusable template pieces (partials and layouts):

- **`layouts/base.njk`** - Main HTML wrapper (header, footer, navigation)
- **`layouts/post.njk`** - Blog post template (includes extra features like date display)
- These are `.njk` (Nunjucks) template files that wrap your content

#### `content/blog/`
Your blog posts folder:

- **`blog.json`** - Directory data file that applies `layout: post.njk` to all posts in this folder
- **`index.njk`** - The blog listing page (loops through all posts)
- **`*.md`** files - Individual blog posts written in Markdown

#### `content/feed/`
RSS/Atom feed generation:

- **`feed.xml.njk`** - Template that generates your RSS feed
- **`pretty-atom-feed.xsl`** - Stylesheet that makes the feed look nice in browsers

#### `public/`
Static assets copied directly to output without processing:

- **`assets/`** - Images, CSS, JavaScript, fonts, etc.
- These files are copied as-is to `_site/` root

#### `_site/` (Output Folder)
**Auto-generated** - the built website goes here. Don't edit files here manually!
- This folder is created when you run `npm start` or `npm run build`
- Upload this folder to your web host
- Listed in `.gitignore` so it doesn't get committed to Git

#### `node_modules/`
**Auto-generated** - npm packages are installed here. Don't edit this!
- Created when you run `npm install`
- Listed in `.gitignore` (too large to commit)

### File Types Explained

#### `.md` (Markdown)
Plain text files with simple formatting syntax:
- `# Heading` → `<h1>Heading</h1>`
- `**bold**` → `<strong>bold</strong>`
- Easy to write, converted to HTML by Eleventy
- Can include front matter (YAML between `---` lines) for metadata

#### `.njk` (Nunjucks)
Templating files with logic and variables:
- `{{ variable }}` - Output a variable
- `{% for post in collections.posts %}` - Loop through data
- `{% include "partial.njk" %}` - Include another file
- More powerful than plain HTML - lets you create dynamic pages

#### `.json` (JSON)
Structured data files:
- `metadata.json` - Global site data
- `blog.json` - Directory-specific settings (like default layout)
- Must be valid JSON (no comments, strict syntax)
- Accessible in templates as objects

#### `.js` (JavaScript)
Configuration and logic:
- `eleventy.config.js` - Eleventy configuration
- Uses modern ES6 modules (`import`/`export`)
- Can add custom filters, shortcodes, and plugins



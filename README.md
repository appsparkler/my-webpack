# Basic Webpack Setup with dev Server

## CSS
- Loads CSS files as JS modules
- Compiles PUG

### To start the development server:
`npm run dev`

### SETUP
- SETUP the template less in the `webpack/dev.js` file inside the `compile_templateLess()` method.
- ENSURE the `template.css` file is referenced in the `src/index.pug` file.
- REFERENCE the `template.js` on the `template` variable in `index.pug`
- SELECT the `HTML` from the rendered template-page from any `SERVER`
- SETUP any `temp` adjustments under `temp` folder - for ex. `tmpl-myaccount.js` was automatically re-directing to `/login.html`.  This was overridden in the temp folder.  Also, `/xx/en/home.kpmgnav.json` call needs to be made from `localhost` so this is settup by copying the response and `adding folders` under `temp folder`.  This will be copied to `dist folder`.

#SPA INTERACTAR BOILERPLATE

## Requirements

  * **NodeJS 6.9.2**

## Developing
```
git clone https://github.com/cgastrell/awe-some-boilerplate
npm install
npm run start
```

## Going production

Compile the app and run the server:

```
npm run compile
npm run production
```

## Known issues

### Can't load urls directly
When developing you won't be able to access urls that are not the root (`/`)

This happens because the express server is trying to serve `public/index.html`
which is compiled only in production.

Dunno how to fix this

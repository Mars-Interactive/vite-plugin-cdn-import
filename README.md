# Import modules from CDN with vite plugin + allow specifying script mode like "async" | "defer"

Origin:
[![GitHub tag](https://img.shields.io/github/tag/MMF-FE/vite-plugin-cdn-import.svg)](https://github.com/MMF-FE/vite-plugin-cdn-import/releases)
[![License](https://img.shields.io/github/license/SafdarJamal/vite-template-react)](https://github.com/MMF-FE/vite-plugin-cdn-import/blob/master/LICENSE)

Allows you to specify modules to be introduced in a production environment using a CDN.

This can reduce build time and improve page load speed in production environments.

## Installation

Install the plugin with npm:

```
npm install @marsgames/vite-plugin-cdn-import --save-dev
```

or yarn

```
yarn add @marsgames/vite-plugin-cdn-import -D
```

or pnpm

```
pnpm install @marsgames/vite-plugin-cdn-import --save-dev
```

## Basic Usage

Add it to vite.config.js

```js
// vite.config.js
import react from "@vitejs/plugin-react";
import importToCDN from '@marsgames/vite-plugin-cdn-import';

export default {
    plugins: [
        importToCDN({
            modules: [
                {
                    name: 'react',
                    var: 'React',
                    path: `umd/react.production.min.js`,
                    mode: "defer",
                },
                {
                    name: 'react-dom',
                    var: 'ReactDOM',
                    path: `umd/react-dom.production.min.js`,
                    mode: "defer",
                },
            ],
        }),
        react(),
    ],
}
```

### Use autoComplete

```js
// vite.config.js
import react from "@vitejs/plugin-react";
import importToCDN, { autoComplete } from '@marsgames/vite-plugin-cdn-import';

export default {
    plugins: [
        importToCDN({
            modules: [
                autoComplete('react'),
                autoComplete('react-dom')
            ],
        }),
        react(),
    ],
}
```

### Autocomplete supported modules

```
"react" | "react-dom" | "react-router-dom" | 
"antd" | "ahooks" | "@ant-design/charts" | 
"vue" | "vue2" | "@vueuse/shared" | 
"@vueuse/core" | "moment" | 
"eventemitter3" | "file-saver" | 
"browser-md5-file" | "xlsx | "crypto-js" |
"axios" | "lodash" | "localforage" |
"mobx" | "mobx-react-lite" | "lottie-web"
```

### VueUse demo

```js
import vue from '@vitejs/plugin-vue';
import importToCDN, { autoComplete } from '@marsgames/vite-plugin-cdn-import';

export default {
    plugins: [
        vue(),
        importToCDN({
            modules: [
                autoComplete('vue'), // vue2 use autoComplete('vue2')
                autoComplete('@vueuse/shared'),
                autoComplete('@vueuse/core')
            ],
        }),
    ],
}
```

## Options

| Name    | Description                                                                                  | Type            | Default                                                |
| ------- | -------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| prodUrl | Overrides the global prodUrl, allowing you to specify the CDN location for a specific module | string          | <https://cdn.jsdelivr.net/npm/{name}@{version}/{path}> |
| modules | Modules config                                                                               | Array`<Module>` / Array`<(prodUrl:string) => Module>` | -                                                      |

### Module

| Name | Description                                                                           | Type              |
| ---- | ------------------------------------------------------------------------------------- | ----------------- |
| name | The name of the module you want to externalize                                        | string            |
| var  | A variable that will be assigned to the module in global scope, Rollup requires this  | string            |
| path | Specify the load path on the CDN                                                      | string / string[] |
| css  | You can alternatively specify multiple style sheets which will be loaded from the CDN | string / string[] |
| mode | Specify the script attribute ("async" or "defer")                             | string            |

## Other CDN pordUrl

| Name  | pordUrl                                                  |
| ----- | -------------------------------------------------------- |
| unpkg | //unpkg.com/{name}@{version}/{path}                      |
| cdnjs | //cdnjs.cloudflare.com/ajax/libs/{name}/{version}/{path} |

## Ressources

- [webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)
- [rollup-plugin-external-globals](https://github.com/eight04/rollup-plugin-external-globals)

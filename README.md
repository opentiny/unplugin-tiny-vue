# unplugin-tiny-vue

A auto import plugin. Same function as [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components).
No import and component registration required.

## Installation

```bash
npm i @opentiny/unplugin-tiny-vue -D

yarn i @opentiny/unplugin-tiny-vue -D
```

## Usage

### 单组件按需引入(推荐用法，可以加快编译和构建速度)

例如：TinyVueSingleResolver('TinyModal') => import TinyModal from '@opentiny/vue-modal'

Vite

```js
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TinyVueSingleResolver } from '@opentiny/unplugin-tiny-vue'

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [TinyVueSingleResolver]
      }),
      AutoImport({
        resolvers: [TinyVueSingleResolver]
      })
    ]
  }
})
```

Webpack

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack').default
const AutoImport = require('unplugin-auto-import/webpack').default
const TinyVueSingleResolver = require('@opentiny/unplugin-tiny-vue').TinyVueSingleResolver

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [TinyVueSingleResolver]
      }),
      AutoImport({
        resolvers: [TinyVueSingleResolver]
      })
    ]
  }
})
```

#### 温馨提示

因为 `pnpm` 工程的特点之一是：项目中显示引入的依赖需要提前在 `package.json` 中声明（防止幽灵依赖），所以在 `pnpm` 工程使用该插件时需要在 `package.json` 中声明项目用到的每一个 `TinyVue` 组件依赖（`TinyVue` 每个组件都是一个 `npm` 包）。依赖声明可以参考以下配置：

```json
{
  "dependencies": {
    "@opentiny/vue-button": "~3.x.x",
    "@opentiny/vue-alert": "~3.x.x",
    "@opentiny/vue-input": "~3.x.x",
    ...
  }
}
```

### 多组件按需引入(不推荐用法，从主入口引入无法treeShaking非js文件，比如：css、image文件等)

例如：TinyVueResolver('TinyModal') => import { TinyModal } from '@opentiny/vue-modal'

Vite

```js
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TinyVueResolver } from '@opentiny/unplugin-tiny-vue'

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [TinyVueResolver]
      }),
      AutoImport({
        resolvers: [TinyVueResolver]
      })
    ]
  }
})
```

Webpack

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack').default
const AutoImport = require('unplugin-auto-import/webpack').default
const TinyVueResolver = require('@opentiny/unplugin-tiny-vue').TinyVueResolver

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [TinyVueResolver]
      }),
      AutoImport({
        resolvers: [TinyVueResolver]
      })
    ]
  }
})


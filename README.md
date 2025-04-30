# unplugin-tiny-vue

一个自动导入插件。与 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 功能相同。
无需手动导入和注册组件。

## 安装

```bash
npm i @opentiny/unplugin-tiny-vue unplugin-vue-components unplugin-auto-import -D
```

## 使用方法

### 单组件按需引入(推荐用法，可以加快编译和构建速度)

例如：TinyVueSingleResolver('TinyModal') => import TinyModal from '@opentiny/vue-modal'

Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TinyVueSingleResolver } from '@opentiny/unplugin-tiny-vue'

export default defineConfig({
 plugins: [
    Components({
      resolvers: [TinyVueSingleResolver]
    }),
    AutoImport({
      resolvers: [TinyVueSingleResolver]
    })
  ]
})
```

Webpack

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { TinyVueSingleResolver } = require('@opentiny/unplugin-tiny-vue')

module.exports = {
  plugins: [
    Components({
      resolvers: [TinyVueSingleResolver]
    }),
    AutoImport({
      resolvers: [TinyVueSingleResolver]
    })
  ]
}
```

#### 温馨提示

由于 `pnpm` 工程的特点之一是：项目中显示引入的依赖需要提前在 `package.json` 中声明（防止幽灵依赖），所以在 `pnpm` 工程使用该插件时需要在 `package.json` 中声明项目用到的每一个 `TinyVue` 组件依赖（`TinyVue` 每个组件都是一个 `npm` 包）。依赖声明可以参考以下配置：

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

或者，你也可以在项目根目录的 `.npmrc` 文件中添加以下配置来提升所有 TinyVue 相关的依赖：

```ini
# 提升所有@opentiny开头的包
public-hoist-pattern[]=@opentiny/*
```

### 多组件按需引入(不推荐用法，从主入口引入无法treeShaking非js文件，比如：css、image文件等)

例如：TinyVueResolver('TinyModal') => import { TinyModal } from '@opentiny/vue'

Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TinyVueResolver } from '@opentiny/unplugin-tiny-vue'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [TinyVueResolver]
    }),
    AutoImport({
      resolvers: [TinyVueResolver]
    })
  ]
})
```

Webpack

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { TinyVueResolver } = require('@opentiny/unplugin-tiny-vue')

module.exports = {
  plugins:[
    Components ({
      resolvers: [TinyVueResolver]
    }),
    AutoImport({
      resolvers: [TinyVueResolver]
    })
  ]
}
```

import AutoVite from 'unplugin-vue-components/vite'
import AutoWebpack from 'unplugin-vue-components/webpack'
import AutoRollup from 'unplugin-vue-components/rollup'
import AutoEsbuild from 'unplugin-vue-components/esbuild'
import AutoRspack from 'unplugin-vue-components/rspack'
import { kebabCase } from 'unplugin-vue-components'

const supportMap = {
  'vite': AutoVite,
  'webpack': AutoWebpack,
  'rollup': AutoRollup,
  'esbuild': AutoEsbuild,
  'rspack': AutoRspack
}

const TinyVueFunc = ['TinyModal', 'TinyNotify', 'TinyLoading']

export const TinyVueResolver = (componentName: string) => {
  if (TinyVueFunc.includes(componentName)) {
    return {
      name: componentName,
      from: '@opentiny/vue'
    }
  }

  if (componentName.startsWith('Tiny') && !componentName.startsWith('TinyIcon')) {
    return {
      name: componentName.slice(4),
      from: '@opentiny/vue'
    }
  }
}

/**
 * @param componentName 匹配的组件名称
 * @example TinyVueSingleResolver('TinyModal') => '@opentiny/vue-modal'
 */
export const TinyVueSingleResolver = (componentName: string) => {
  const importName = `@opentiny/vue-${kebabCase(componentName.slice(4))}`
  if (TinyVueFunc.includes(componentName)) {
    return importName
  }

  if (componentName.startsWith('Tiny') && !componentName.startsWith('TinyIcon')) {
    return importName
  }
}

/** TinyVue 自动导入组件的插件，支持Vite,Webpack,Rollup 等常见的构建工具。
 * 目前不支持Tiny Icon的自动导入
 * @example
 * @param name - 构建工具名称，支持vite,webpack
 * @param mode - 模式，single表示单独导入，不传默认从主入口导入
 * import autoImportPlugin from '@opentiny/unplugin-tiny-vue'
 * plugins: [autoImportPlugin('vite')]
 */
export default (name, mode) => {
  // 兼容webpack/vite的差异
  const autoPlugin = supportMap[name].default || supportMap[name]
  const Resolver = mode === 'single' ? TinyVueSingleResolver : TinyVueResolver

  return autoPlugin({
    resolvers: [Resolver]
  })
}

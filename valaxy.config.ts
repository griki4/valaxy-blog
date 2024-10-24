import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-hairy'
import { addonWaline } from 'valaxy-addon-waline'
import { addonMeting } from 'valaxy-addon-meting'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'hairy',

  addons: [
    addonMeting({
      global: true,
      props: {
        // 设置你的网易云/qq或其他歌单 ID
        id: '434256234',
        type: 'playlist',
        autoplay: false,
        theme: 'var(--hy-c-primary)',
      },
    }),
    // 请参考 https://waline.js.org/ 设置 serverURL 地址
    addonWaline({
      comment: true,
      serverURL: 'https://blog-comments-waline-aqma-84hu7b1rp-griki4s-projects.vercel.app',
      emoji: ['//unpkg.com/@waline/emojis@1.2.0/tieba'],
      pageview: true,
    }),
  ]
})
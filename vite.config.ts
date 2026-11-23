import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * src/inn.config.ts の theme（色の組み合わせ）と logoChar（アイコンの1文字）を index.html に書き込む
 * - <html data-theme="…">：src/index.css の色の組み合わせを選ぶ
 * - ブラウザのアイコン：差し色の角丸の四角に1文字
 */
function innHtml(): Plugin {
  const configFile = new URL('./src/inn.config.ts', import.meta.url)
  const read = () => {
    const text = readFileSync(configFile, 'utf8')
    const pick = (key: string) => new RegExp(`\\b${key}:\\s*'([^']*)'`).exec(text)?.[1] ?? ''
    return { theme: pick('theme') || 'mori', logoChar: pick('logoChar') || '宿' }
  }
  return {
    name: 'inn-html',
    configureServer(server) {
      server.watcher.add(configFile.pathname)
    },
    transformIndexHtml(html) {
      const { theme, logoChar } = read()
      const css = readFileSync(new URL('./src/index.css', import.meta.url), 'utf8')
      const block = new RegExp(`data-theme='${theme}'\\]\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? ''
      const color = /--color-kaki:\s*(#[0-9a-f]{6})/i.exec(block)?.[1] ?? '#a3461c'
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="${color}"/><text x="64" y="66" text-anchor="middle" dominant-baseline="central" font-family="'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif" font-weight="700" font-size="84" fill="#fffdf7">${logoChar}</text></svg>`
      return html
        .replace('<html lang="ja">', `<html lang="ja" data-theme="${theme}">`)
        .replace('href="/favicon.svg"', `href="data:image/svg+xml,${encodeURIComponent(svg)}"`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  // `--mode static`（npm run dev:static / vite build --mode static）は Cloudflare プラグイン（workerd）を読み込まず、
  // 画面のファイルだけを扱う。静的ホスティング（さくらのレンタルサーバ等）向け。/api/* は動かない
  const cloudflare = mode === 'static' ? [] : [(await import('@cloudflare/vite-plugin')).cloudflare()]
  return {
    plugins: [innHtml(), react(), tailwindcss(), ...cloudflare],
  }
})

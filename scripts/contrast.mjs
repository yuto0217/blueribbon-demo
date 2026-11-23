// src/index.css の @theme の色トークンを読み、文字と背景の組み合わせのコントラスト比を計算する
// 使い方: node scripts/contrast.mjs
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
const readTokens = (text) => Object.fromEntries([...text.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]))
const base = readTokens(css.slice(css.indexOf('@theme'), css.indexOf('}', css.indexOf('@theme'))))
// 色の組み合わせ（:root[data-theme='…']）ごとに、初期値に上書きして確かめる
const themes = [['（初期値）', base], ...[...css.matchAll(/:root\[data-theme='(\w+)'\]\s*\{([^}]*)\}/g)].map((m) => [m[1], { ...base, ...readTokens(m[2]) }])]

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

// [文字, 背景] サイトで使う組み合わせ
const pairs = [
  ['ink', 'cream'], ['ink', 'paper'], ['ink-soft', 'cream'], ['ink-soft', 'paper'],
  ['ink-soft', 'wood-light'], ['ink', 'wood-light'], ['ink', 'kaki-light'], ['ink', 'mori-light'],
  ['wood', 'cream'], ['wood', 'paper'], ['wood-dark', 'wood-light'],
  ['kaki', 'cream'], ['kaki', 'paper'], ['kaki-dark', 'kaki-light'], ['kaki-dark', 'paper'],
  ['mori', 'cream'], ['mori', 'paper'], ['mori-dark', 'mori-light'],
  ['paper', 'kaki'], ['paper', 'kaki-dark'], ['cream', 'kaki'],
  ['paper', 'mori'], ['paper', 'mori-dark'], ['cream', 'mori-dark'], ['kaki-light', 'mori-dark'],
  ['paper', 'wood'], ['paper', 'wood-dark'], ['cream', 'ink'], ['wood-light', 'mori-dark'],
]

let ng = 0
for (const [name, tokens] of themes) {
  let min = Infinity
  for (const [fg, bg] of pairs) {
    const r = ratio(tokens[fg], tokens[bg])
    min = Math.min(min, r)
    if (r < 4.5) {
      ng++
      console.log(`NG  ${name}  ${r.toFixed(2).padStart(5)}:1  ${fg} (${tokens[fg]}) on ${bg} (${tokens[bg]})`)
    }
  }
  console.log(`${name.padEnd(8)} いちばん低い組み合わせ ${min.toFixed(2)}:1`)
}
process.exit(ng ? 1 : 0)

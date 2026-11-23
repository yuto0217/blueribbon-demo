// 営業用の見本の仕上がりの確認：色のコントラスト → 型チェックとビルド → 書き忘れ
// 使い方: npm run check
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const run = (cmd) => execSync(cmd, { stdio: 'inherit' })
run('node scripts/contrast.mjs')
run('npm run build --silent')

const config = readFileSync(new URL('../src/inn.config.ts', import.meta.url), 'utf8')
const claude = readFileSync(new URL('../CLAUDE.md', import.meta.url), 'utf8')
const warn = []
if (/slug: 'inn'/.test(config)) warn.push('まだ npm run setup をしていません（slug が inn のままです）')
if (/phone: null/.test(config)) warn.push('電話番号が未設定です（「電話で予約」のボタンは出ません）')
if (/points: \[\]/.test(config)) warn.push('宿の魅力（points）が未設定です')
if (/access: null/.test(config)) warn.push('アクセス（access）が未設定です')
if (/address: null/.test(config)) warn.push('住所（address）が未設定です（アクセスに地図が出ません）')
if (/\{\{/.test(claude)) warn.push('CLAUDE.md に {{ }} が残っています')
console.log(warn.length ? `\n⚠ ${warn.join('\n⚠ ')}` : '\nOK：このまま npm run deploy できます')

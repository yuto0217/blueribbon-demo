// テンプレートから作った新しい見本サイトに、宿名・リポジトリ名などを書き込む（最初に1回だけ実行する）
//
// 使い方:
//   npm run setup -- --slug banjoya --name "雲見温泉 民宿 番上屋" --kind 民宿 --area "西伊豆・雲見温泉" \
//     --pref "静岡県賀茂郡松崎町" --theme nagisa --char 番 --phone 0558-45-0244 --new \
//     --point "伊勢海老漁を営む宿の海鮮舟盛り" --point "24時間入れる貸切の岩風呂" \
//     --access "伊豆急下田駅からバス約90分「雲見温泉」下車、歩いて2分"
//
//   --slug   宿名のローマ字（リポジトリ名・Worker 名は <slug>-demo になる）  必須
//   --name   宿名  必須
//   --kind   民宿・ペンション・旅館など（省略すると民宿）
//   --area   ロゴの上に添える地名（例：西伊豆・雲見温泉）
//   --pref   都道府県・市町村（CLAUDE.md の冒頭に書く）
//   --theme  色の組み合わせ umi / nagisa / mori / yama / sora（省略すると mori）
//   --char   ブラウザのアイコンの1文字（省略すると宿名の先頭）
//   --phone  電話番号（公開情報で確かめたものだけ。省略すると電話ボタンを出さない）
//   --point  宿の魅力（2〜3回くり返して書く。口コミで多く褒められている点を、宿の立場の短い言葉で）
//   --access アクセス（地名と最寄り駅・IC からの時間）
//   --address 住所（アクセスの Google マップに使う。公開情報で確かめたものだけ）
//   --booking 「空室を見る」の行き先 URL（省略すると見本の注記のページ）
//   --new    新規ホームページの提案（省略するとリニューアルの提案）
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { parseArgs } from 'node:util'

const { values: a } = parseArgs({
  options: {
    slug: { type: 'string' },
    name: { type: 'string' },
    phone: { type: 'string' },
    point: { type: 'string', multiple: true, default: [] },
    access: { type: 'string' },
    address: { type: 'string' },
    booking: { type: 'string' },
    kind: { type: 'string', default: '民宿' },
    area: { type: 'string', default: '' },
    pref: { type: 'string', default: '' },
    theme: { type: 'string', default: 'mori' },
    char: { type: 'string' },
    new: { type: 'boolean', default: false },
  },
})

const themes = ['umi', 'nagisa', 'mori', 'yama', 'sora']
if (!a.slug || !/^[a-z][a-z0-9-]*$/.test(a.slug) || !a.name) {
  console.error('--slug（小文字の英数字）と --name は必須です。使い方は scripts/setup-inn.mjs の先頭を見てください')
  process.exit(1)
}
if (!themes.includes(a.theme)) {
  console.error(`--theme は ${themes.join(' / ')} のどれかにしてください`)
  process.exit(1)
}

const repo = `${a.slug}-demo`
const char = a.char ?? [...a.name.replace(/^.*?(民宿|旅館|ペンション)\s*/, '')][0]
const area = a.area || a.pref
const root = new URL('../', import.meta.url)
const file = (p) => new URL(p, root)
const edit = (p, fn) => writeFileSync(file(p), fn(readFileSync(file(p), 'utf8')))
const q = (s) => s.replaceAll('\\', '\\\\').replaceAll("'", "\\'")

// package.json / package-lock.json / wrangler.jsonc の名前
const oldName = JSON.parse(readFileSync(file('package.json'), 'utf8')).name
edit('package.json', (s) => s.replace(`"name": "${oldName}"`, `"name": "${repo}"`))
edit('package-lock.json', (s) => s.replaceAll(`"name": "${oldName}"`, `"name": "${repo}"`))
edit('wrangler.jsonc', (s) => s.replace(/"name": "[^"]*"/, `"name": "${repo}"`))

// 宿の設定ファイル（基本の項目だけ。残りは宿の情報を調べて書く）
edit('src/inn.config.ts', (s) =>
  s
    .replace(/slug: '[^']*'/, `slug: '${q(a.slug)}'`)
    .replace(/kind: '[^']*'/, `kind: '${q(a.kind)}'`)
    .replace(/name: '[^']*'/, `name: '${q(a.name)}'`)
    .replace(/area: '[^']*'/, `area: '${q(area)}'`)
    .replace(/description: '[^']*'/, `description: '${q(`${area}の${a.kind}「${a.name}」。`)}'`)
    .replace(/theme: '[^']*'/, `theme: '${a.theme}'`)
    .replace(/logoChar: '[^']*'/, `logoChar: '${q(char)}'`)
    .replace(/phone: null/, a.phone ? `phone: '${q(a.phone)}'` : 'phone: null')
    .replace(
      /points: \[\]/,
      `points: [${a.point
        .map((p, i) => `\n    { text: '${q(p)}', description: null, photos: [{ label: '${q(p)}の写真', alt: '${q(p)}', tone: '${['kaki', 'moss', 'wood'][i % 3]}' }] },`)
        .join('')}${a.point.length ? '\n  ' : ''}]`,
    )
    .replace(/access: null/, a.access ? `access: '${q(a.access)}'` : 'access: null')
    .replace(/address: null/, a.address ? `address: '${q(a.address)}'` : 'address: null')
    .replace(/bookingUrl: null/, a.booking ? `bookingUrl: '${q(a.booking)}'` : 'bookingUrl: null'),
)

// CLAUDE.md（docs/CLAUDE.inn.md から宿ごとの CLAUDE.md を作る。テンプレート自身の説明の README.md は消す）
const vars = {
  種別: a.kind,
  宿名: a.name,
  地域: a.pref ? `${a.pref}（${a.area || a.pref}）` : area,
  提案: a.new ? '新規ホームページ提案用' : 'リニューアル提案用',
  リポジトリ: repo,
  作成日: new Date().toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }),
}
const claude = readFileSync(file('docs/CLAUDE.inn.md'), 'utf8').replace(/\{\{(\S+?)\}\}/g, (m, k) => vars[k] ?? m)
writeFileSync(file('CLAUDE.md'), claude)
// テンプレート自身の説明は、宿ごとの見本には要らないので消す
for (const p of ['README.md', 'docs']) if (existsSync(file(p))) rmSync(file(p), { recursive: true })

console.log(`できました：${repo}（${a.name}、色 ${a.theme}、アイコン「${char}」）
次にすること:
  1. src/inn.config.ts の hero と points の写真の枠のラベル・access・address を確かめる
  2. CLAUDE.md の「宿の基本情報」に出典を書く
  3. npm run check（色・型チェック・ビルド）
  4. npm run dev で画面を見る → npm run deploy`)

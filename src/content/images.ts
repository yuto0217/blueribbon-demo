/**
 * サイトで使う画像（ラベル・代替テキストは src/inn.config.ts の hero に書く）
 *
 * 営業用の見本では写真を使わず、ラベル付きの仮の画像枠で表示する。
 * 予約サイト・口コミサイト・Google マップ・SNS など他サイトの写真は使わない。
 */
import { inn } from '../inn.config'

export type { PlaceholderTone, SiteImage } from './schema'

export const heroImages = inn.hero.slice(0, 3)

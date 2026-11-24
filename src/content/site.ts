/** 宿の基本情報（src/inn.config.ts から作る。ここは書き換えない） */
import { inn } from '../inn.config'
import { useLang, type Lang } from './i18n'
import type { InnDetail, InnDetailEnglish, InnPoint, NavItem, SiteImage } from './schema'

/** 英語の表示があるか（あるときだけ言語の切り替えボタンを出す） */
export const hasEnglish = Boolean(inn.en)

/** お部屋・料理・温泉の紹介を、英語の訳があれば重ねる */
function translateDetail(detail: InnDetail | null, t: InnDetailEnglish | null | undefined): InnDetail | null {
  if (!detail || !t) return detail
  return {
    title: t.title,
    lead: t.lead,
    features: detail.features.map((f, i) => t.features[i] ?? f),
    photos: detail.photos.map((photo, j) => ({ ...photo, ...t.photos[j] })),
  }
}

function buildSite(lang: Lang) {
  const en = lang === 'en' ? inn.en : null
  const name = en?.name ?? inn.name
  const points: InnPoint[] = inn.points.slice(0, 3).map((point, i) => {
    const t = en?.points[i]
    if (!t) return point
    return {
      text: t.text,
      description: t.description,
      photos: point.photos.map((photo, j) => ({ ...photo, ...t.photos[j] })),
    }
  })
  return {
    lang,
    name,
    area: en?.area ?? inn.area,
    description: en?.description ?? inn.description,
    intro: en ? en.intro : inn.intro,
    catchcopy: en ? en.catchcopy : inn.catchcopy,
    phone: inn.phone,
    phoneHref: inn.phone ? `tel:${inn.phone.replace(/[^\d+]/g, '')}` : '',
    /** 「電話で予約」のボタンを出すか（電話番号があり、phoneButton が true のとき） */
    showPhoneButton: Boolean(inn.phone) && inn.phoneButton,
    showHeroBooking: inn.heroBooking ?? true,
    points,
    pointsTitle: en ? en.pointsTitle : inn.pointsTitle,
    /** 宿の魅力の後に続く紹介（お部屋 → 料理 → 温泉・お風呂の順。null のものは出さない） */
    details: [
      { key: 'rooms', eyebrow: 'Rooms', detail: translateDetail(inn.rooms, en?.rooms) },
      { key: 'cuisine', eyebrow: 'Cuisine', detail: translateDetail(inn.cuisine, en?.cuisine) },
      { key: 'bath', eyebrow: 'Bath', detail: translateDetail(inn.bath, en?.bath) },
    ].flatMap(({ detail, ...rest }) => (detail ? [{ ...rest, detail: { ...detail, photos: detail.photos.slice(0, 3) } }] : [])) as {
      key: 'rooms' | 'cuisine' | 'bath'
      eyebrow: string
      detail: InnDetail
    }[],
    access: en ? en.access : inn.access,
    /** 住所は地図の検索に使うので日本語のまま */
    address: inn.address,
    /** 「空室を見る」の行き先。未設定の間は見本の注記のページ */
    bookingHref: inn.bookingUrl ?? '/booking',
    bookingLabel: en?.bookingLabel ?? inn.bookingLabel,
    /** 「空室を見る」が外のサイト（予約サイトなど）か */
    bookingIsExternal: Boolean(inn.bookingUrl && /^https?:/.test(inn.bookingUrl)),
    copyright: `© ${name}`,
    /** タブ（メニュー）。営業用の見本では中身を作らず、開くと「見本サイトのため表示されません。」を出す */
    navItems: inn.tabs.map((tab): NavItem => ({
      to: tab.to,
      label: en?.tabs[tab.to] ?? tab.label,
      /** フルスクリーンのメニューに添える英語（inn.en があるときだけ。言語が ja でも常に en.tabs の訳を使う） */
      labelEn: inn.en?.tabs[tab.to],
    })),
    heroImages: inn.hero.slice(0, 3).map((image, i): SiteImage => ({ ...image, ...en?.hero[i] })),
  }
}

const sites = { ja: buildSite('ja'), en: buildSite('en') }

/** 今の言語の宿の情報 */
export function useSite() {
  return sites[useLang().lang]
}

/** 日本語の宿の情報（ルートの組み立てなど、言語によらないところで使う） */
export const site = sites.ja
export const navItems: readonly NavItem[] = inn.tabs

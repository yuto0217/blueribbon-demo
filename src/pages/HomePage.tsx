import { HeroInfo } from '../components/home/HeroInfo'
import { HeroSlider } from '../components/home/HeroSlider'
import { PageMeta } from '../components/ui/PageMeta'

/** トップページ（営業用の見本はヒーローだけ：写真と宿名 → 宿の魅力・アクセス・予約ボタン） */
export function HomePage() {
  return (
    <>
      <PageMeta />
      <HeroSlider />
      <HeroInfo />
    </>
  )
}

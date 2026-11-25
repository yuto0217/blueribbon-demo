import { useSite } from '../../content/site'
import { Icon } from '../ui/Icon'
import { Container, SectionHeading } from '../ui/Section'
import { PointsSlider } from './PointsSlider'

/**
 * 宿の魅力の後に続く、お部屋・料理・温泉・お風呂の紹介（inn.config.ts の rooms・cuisine・bath）
 * 区切りごとに中央の見出し → 写真（横幅いっぱいに流れるスライド）と、紹介文・特徴の一覧を左右交互に並べる
 * タブの先のページは作らないので、ここに短くまとめて出す
 */
export function DetailSections() {
  const site = useSite()
  return (
    <>
      {site.details.map(({ key, eyebrow, detail }, i) => {
        // 上に白い区切り（宿の魅力など）があるときは上の余白を重ねない
        const hasAbove = i > 0 || site.points.length > 0
        // 宿の魅力からの続きで、写真の左右を交互にする（パソコンの幅のとき）
        const photoFirst = (site.points.length + i) % 2 === 1
        const id = `home-${key}`
        return (
          <section key={key} aria-labelledby={id} className={`bg-paper pb-14 sm:pb-20 ${hasAbove ? 'pt-4 sm:pt-6' : 'pt-14 sm:pt-20'}`}>
            <Container>
              <SectionHeading id={id} title={detail.title} eyebrow={eyebrow} align="center" />
            </Container>
            <div
              className={`mt-2 sm:mt-6 lg:mx-auto lg:grid lg:max-w-7xl lg:items-center lg:gap-14 lg:px-8 ${
                photoFirst ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'
              }`}
            >
              <div className={photoFirst ? '' : 'lg:order-last'}>
                <PointsSlider photos={detail.photos} label={detail.title} />
              </div>
              <Container className="mt-8 lg:mt-0 lg:px-0">
                {detail.lead && <p className="text-lg leading-loose">{detail.lead}</p>}
                {detail.features.length > 0 && (
                  <ul className={`grid gap-5 ${detail.lead ? 'mt-6 border-t border-line pt-6' : ''}`}>
                    {detail.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Icon name="check" className="mt-0.5 size-6 shrink-0 text-kaki" />
                        <div className="min-w-0">
                          <p className="text-lg leading-snug font-medium text-mori-dark">{feature.title}</p>
                          {feature.text && <p className="mt-1 leading-relaxed text-ink-soft">{feature.text}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Container>
            </div>
          </section>
        )
      })}
    </>
  )
}

import type { SiteImage } from '../../content/images'
import { useUi } from '../../content/i18n'
import { Photo } from '../ui/Photo'
import { useAutoSlide } from '../ui/useAutoSlide'

/** 魅力1つ分の写真を、画面の横幅いっぱいでヒーローのように流す */
export function PointsSlider({ photos, label }: { photos: SiteImage[]; label: string }) {
  const current = useAutoSlide(photos.length)
  const ui = useUi()
  if (photos.length === 0) return null

  return (
    <div
      role="region"
      aria-roledescription={ui.carousel}
      aria-label={ui.photosOf(label)}
      aria-live="off"
      className="relative aspect-[4/3] w-full overflow-hidden bg-mori-dark sm:aspect-[16/9] lg:aspect-[4/3] lg:rounded-xl"
    >
      {photos.map((photo, i) => (
        <div
          key={i}
          role="group"
          aria-roledescription={ui.slide}
          aria-label={ui.slideOf(i + 1, photos.length)}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Photo image={photo} loading="lazy" />
        </div>
      ))}
    </div>
  )
}

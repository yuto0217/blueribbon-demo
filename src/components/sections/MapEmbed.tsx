import { useUi } from '../../content/i18n'
import { useSite } from '../../content/site'
import { Icon } from '../ui/Icon'

/** 住所と Google マップ（API キー不要の埋め込み）。住所が未設定なら何も出さない */
export function MapEmbed() {
  const site = useSite()
  const ui = useUi()
  if (!site.address) return null
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&hl=${site.lang}&z=15&output=embed`
  return (
    <div className="grid gap-4">
      <address className="flex items-start gap-3 text-lg not-italic leading-relaxed">
        <Icon name="pin" className="mt-1 size-6 shrink-0 text-kaki" />
        <span className="min-w-0 [overflow-wrap:anywhere]">{site.address}</span>
      </address>
      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-wood-light sm:aspect-[16/9] lg:aspect-[21/9]">
        <iframe
          title={ui.mapTitle(site.name)}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  )
}

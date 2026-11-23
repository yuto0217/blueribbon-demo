import { useUi } from '../../content/i18n'

/** 見本サイトであることを示す帯（本番公開時に外す） */
export function DemoBanner() {
  const ui = useUi()
  return <div className="bg-ink px-4 py-1.5 text-center text-sm leading-relaxed text-cream">{ui.demoBanner}</div>
}

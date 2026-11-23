import { useSite } from '../../content/site'

/** React 19 の機能で <title> と <meta> を <head> に出力する */
export function PageMeta({ title, description }: { title?: string; description?: string }) {
  const site = useSite()
  description ??= site.description
  const fullTitle = title ? site.lang === 'en' ? `${title} | ${site.name}` : `${title}｜${site.area} ${site.name}` : site.lang === 'en' ? `${site.name}, ${site.area}` : `${site.area} ${site.name}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
    </>
  )
}

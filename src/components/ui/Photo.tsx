import type { PlaceholderTone, SiteImage } from '../../content/images'

// 仮の画像枠の色（ラベルは黒の半透明の上に生成り色の文字なので、どの色でもコントラストは足りる）
const toneClass: Record<PlaceholderTone, string> = {
  mori: 'bg-mori',
  wood: 'bg-wood',
  kaki: 'bg-kaki',
  sky: 'bg-sky',
  moss: 'bg-moss',
}

interface PhotoProps {
  image: SiteImage
  /** 枠の大きさ・縦横比などを指定する（例: "aspect-[4/3]"） */
  className?: string
  /** ラベルの位置。文字を重ねる場所では "top" にする */
  labelPosition?: 'center' | 'top'
  /** 装飾目的で、読み上げ不要な場合 */
  decorative?: boolean
  loading?: 'lazy' | 'eager'
}

/**
 * 写真を表示する。`image.src` が未設定の間はラベル付きの仮の画像枠を表示する。
 */
export function Photo({
  image,
  className = '',
  labelPosition = 'center',
  decorative = false,
  loading = 'lazy',
}: PhotoProps) {
  if (image.src) {
    return (
      <img
        src={image.src}
        alt={decorative ? '' : image.alt}
        loading={loading}
        decoding="async"
        style={image.position ? { objectPosition: image.position } : undefined}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : image.alt}
      aria-hidden={decorative || undefined}
      className={`@container relative flex h-full w-full overflow-hidden ${toneClass[image.tone]} ${
        labelPosition === 'top' ? 'items-start' : 'items-center'
      } justify-center p-3 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 22px)',
        }}
      />
      <div
        aria-hidden="true"
        className="relative flex max-w-full items-center gap-2 rounded-xl bg-black/55 px-3 py-1.5 text-center text-xs leading-snug text-cream @[18rem]:max-w-[90%] @[18rem]:px-4 @[18rem]:py-2 @[18rem]:text-sm"
      >
        <svg
          viewBox="0 0 24 24"
          className="hidden size-5 shrink-0 @[14rem]:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        <span>{image.label}</span>
      </div>
    </div>
  )
}

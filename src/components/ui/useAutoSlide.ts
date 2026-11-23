import { useEffect, useState } from 'react'

const INTERVAL_MS = 7000

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * スライドを一定の間隔で切り替える。今表示している番号を返す
 * 停止ボタンと「何枚目か」の印は Yuto の指示で置いていない（2026年11月21日）。動きを減らす設定のときは自動で切り替えない
 */
export function useAutoSlide(count: number) {
  const [current, setCurrent] = useState(0)
  const [playing] = useState(() => !prefersReducedMotion())

  useEffect(() => {
    if (!playing || count < 2) return
    const timer = window.setInterval(() => setCurrent((i) => (i + 1) % count), INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [playing, count])

  return current
}

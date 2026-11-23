import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { useUi } from '../../content/i18n'
import { DemoBanner } from './DemoBanner'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileCtaBar } from './MobileCtaBar'

export function Layout() {
  const { pathname } = useLocation()
  const ui = useUi()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  // ページ移動時、読み上げソフトが新しいページの先頭から読めるよう本文にフォーカスを移す
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col pb-[calc(76px+env(safe-area-inset-bottom))] xl:pb-0">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-mori-dark px-4 py-3 font-bold text-cream focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {ui.skip}
      </a>
      <DemoBanner />
      {/* ヘッダーは画面上部に固定してずっと表示する */}
      <div className="sticky top-0 z-40">
        <Header />
      </div>
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
      <ScrollRestoration />
    </div>
  )
}

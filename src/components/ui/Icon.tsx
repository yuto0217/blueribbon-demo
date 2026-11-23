const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5z" />
    </>
  ),
  phone: (
    <path d="M5.5 3.5h3l2 5-2.4 1.6a11 11 0 0 0 5.8 5.8l1.6-2.4 5 2v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  car: (
    <>
      <path d="M3.5 16.5v-4l2.2-5h12.6l2.2 5v4z" />
      <path d="M3.5 12.5h17" />
      <circle cx="7.5" cy="17.5" r="1.7" />
      <circle cx="16.5" cy="17.5" r="1.7" />
    </>
  ),
  train: (
    <>
      <rect x="5.5" y="3.5" width="13" height="13" rx="2.5" />
      <path d="M5.5 10.5h13" />
      <path d="M8.5 13.5h.01M15.5 13.5h.01" />
      <path d="M8.5 16.5 6.5 20.5M15.5 16.5l2 4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z" />
      <path d="M9 4.5c-.8 1 .8 2 0 3.2M13 4.5c-.8 1 .8 2 0 3.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  pause: <path d="M8 5v14M16 5v14" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.6v.4" />
    </>
  ),
  onsen: (
    <>
      <path d="M4.5 15a7.5 3.5 0 0 0 15 0" />
      <path d="M8 11.5c-1.2-1.6 1.2-2.6 0-4.5M12 11.5c-1.2-1.6 1.2-2.6 0-4.5M16 11.5c-1.2-1.6 1.2-2.6 0-4.5" />
    </>
  ),
  bed: (
    <>
      <path d="M3 18.5v-11M3 14h18v4.5M21 14v-1.5a3 3 0 0 0-3-3h-7V14" />
      <circle cx="7" cy="11.5" r="1.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  star: <path d="m12 3.8 2.5 5.2 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8z" />,
  child: (
    <>
      <circle cx="12" cy="5" r="2.3" />
      <path d="M12 8.8v6.2" />
      <path d="M7.5 11.5 12 10l4.5 1.5" />
      <path d="M9.3 21 12 15l2.7 6" />
    </>
  ),
  paw: (
    <>
      <circle cx="5.8" cy="10.2" r="1.8" />
      <circle cx="9.4" cy="6" r="1.8" />
      <circle cx="14.6" cy="6" r="1.8" />
      <circle cx="18.2" cy="10.2" r="1.8" />
      <path d="M12 11.5c-2.8 0-5.5 3.6-5.5 6 0 1.6 1.2 2.5 2.7 2.5 1.1 0 1.8-.6 2.8-.6s1.7.6 2.8.6c1.5 0 2.7-.9 2.7-2.5 0-2.4-2.7-6-5.5-6z" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  )
}

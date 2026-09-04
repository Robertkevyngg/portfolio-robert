const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconGithub = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
)

export const IconLinkedin = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
  </svg>
)

export const IconMail = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6 9 6.5L21 6" />
  </svg>
)

export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconExternal = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
)

export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" {...p}>
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9z" />
  </svg>
)

export const IconFork = (p) => (
  <svg viewBox="0 0 24 24" width="13" height="13" {...base} {...p}>
    <circle cx="6" cy="5" r="2.2" />
    <circle cx="18" cy="5" r="2.2" />
    <circle cx="12" cy="19" r="2.2" />
    <path d="M6 7.2v2.3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.2M12 12.5v4.3" />
  </svg>
)

export const IconLock = (p) => (
  <svg viewBox="0 0 24 24" width="13" height="13" {...base} {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
)

export const IconShield = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 3l7 3v5.5c0 4.4-3 8.1-7 9.5-4-1.4-7-5.1-7-9.5V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

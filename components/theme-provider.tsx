"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

export function ThemeProvider({
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
  children,
}: {
  attribute: string
  defaultTheme: Theme
  enableSystem: boolean
  disableTransitionOnChange: boolean
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    if (enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }

    const root = window.document.documentElement
    root.setAttribute(attribute, theme)
  }, [theme, attribute, enableSystem])

  const value = { theme, setTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

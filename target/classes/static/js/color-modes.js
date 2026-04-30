/*!
 * Script para cambiar el modo de color (light/dark) en Bootstrap
 * Guarda la preferencia en el navegador (localStorage)
 */

(() => {
    'use strict'

    // Obtiene el tema guardado en localStorage
    const getStoredTheme = () => localStorage.getItem('theme')

    // Guarda el tema en localStorage
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    // Determina el tema preferido:
    // 1. Si hay uno guardado → usa ese
    // 2. Si no → usa el del sistema (dark/light)
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    // Aplica el tema al HTML usando atributo data-bs-theme
    const setTheme = theme => {
      if (theme === 'auto') {
        // Si es automático, detecta el sistema
        document.documentElement.setAttribute(
          'data-bs-theme',
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        )
      } else {
        // Si es manual, aplica directamente
        document.documentElement.setAttribute('data-bs-theme', theme)
      }
    }

    // Aplica el tema al cargar
    setTheme(getPreferredTheme())

    // Actualiza el botón visual del tema activo
    const showActiveTheme = (theme, focus = false) => {
      const themeSwitcher = document.querySelector('#bd-theme')

      // Si no existe el botón, termina
      if (!themeSwitcher) {
        return
      }

      const themeSwitcherText = document.querySelector('#bd-theme-text')
      const activeThemeIcon = document.querySelector('.theme-icon-active use')
      const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

      // Quita estado activo de todos los botones
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
      })

      // Activa el botón seleccionado
      btnToActive.classList.add('active')
      btnToActive.setAttribute('aria-pressed', 'true')

      // Cambia el icono visible
      activeThemeIcon.setAttribute('href', svgOfActiveBtn)

      // Actualiza el label accesible
      const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
      themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

      // Enfoca el botón si se indica
      if (focus) {
        themeSwitcher.focus()
      }
    }

    // Escucha cambios en el sistema (modo oscuro/claro)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()

      // Si no hay preferencia fija, actualiza automáticamente
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })

    // Cuando el DOM carga completamente
    window.addEventListener('DOMContentLoaded', () => {
      // Muestra el tema activo
      showActiveTheme(getPreferredTheme())

      // Asigna eventos a los botones de cambio de tema
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')

            // Guarda y aplica el nuevo tema
            setStoredTheme(theme)
            setTheme(theme)

            // Actualiza el botón activo
            showActiveTheme(theme, true)
          })
        })
    })

})()
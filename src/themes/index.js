import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import icsTheme from './ics_theme'

const themes = [
  {
    id: 'light',
    source: lightBaseTheme
  },
  {
    id: 'dark',
    source: darkBaseTheme
  },
  {
    id: 'ics',
    source: icsTheme
  }
]

export function getThemeSource (theme) {
  if (themes) {
    for (let i = 0; i < themes.length; i++) {
      if (themes[i]['id'] === theme) {
        return themes[i]['source']
      }
    }
  }

  return lightBaseTheme // Default theme
}

export default themes
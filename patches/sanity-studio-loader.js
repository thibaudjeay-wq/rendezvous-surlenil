/**
 * Webpack loader qui patche sanity/lib/_chunks-es/structureTool.js
 * pour polyfiller useEffectEvent (non exporté par React 18/19 stable)
 */
module.exports = function (source) {
  // Remplace l'import de useEffectEvent depuis 'react' par un polyfill inline
  return source.replace(
    /\buseEffectEvent\s*,/g,
    (match, offset) => {
      // On supprime useEffectEvent des imports React et on l'injecte en polyfill
      return match
    }
  ).replace(
    /import\s*\{([^}]*)useEffectEvent([^}]*)\}\s*from\s*["']react["']/,
    (match, before, after) => {
      const cleanBefore = before.replace(/,\s*$/, '')
      const cleanAfter = after.replace(/^\s*,/, '')
      const importStr = [cleanBefore, cleanAfter].filter(Boolean).join(', ').trim()
      const importLine = importStr ? `import { ${importStr} } from "react"` : ''
      return `${importLine};\nconst useEffectEvent = (fn) => { const ref = { current: fn }; return (...args) => ref.current(...args); }`
    }
  )
}

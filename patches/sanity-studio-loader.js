/**
 * Webpack loader qui patche les fichiers Sanity pour polyfiller useEffectEvent
 * (non exporté par React 18/19 stable, mais utilisé dans sanity/lib)
 */
module.exports = function (source) {
  if (!source.includes('useEffectEvent')) return source

  let result = source
    // Cas 1 : ", useEffectEvent" (pas en premier dans la liste)
    .replace(/,\s*useEffectEvent\b/g, '')
    // Cas 2 : "useEffectEvent, " (en premier dans la liste)
    .replace(/\buseEffectEvent\s*,\s*/g, '')
    // Cas 3 : "useEffectEvent" seul dans { }
    .replace(/\buseEffectEvent\b/g, '__useEffectEventRemoved__')

  // Injecter le polyfill juste après le premier import depuis "react"
  result = result.replace(
    /(from\s*["']react["'];?\n)/,
    (match) =>
      match +
      'const useEffectEvent = (typeof React !== "undefined" && React.useEffectEvent) ? React.useEffectEvent : function useEffectEvent(fn) { return fn; };\n'
  )

  // Nettoyer le placeholder si Cas 3 a été utilisé
  result = result.replace(/__useEffectEventRemoved__/g, 'useEffectEvent')

  return result
}

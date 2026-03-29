'use strict'
// Polyfill: réexporte React en ajoutant useEffectEvent manquant
// Nécessaire pour Sanity Studio (sanity/structure) avec React 18/19 stable
const React = require('react')

function useEffectEvent(fn) {
  const ref = React.useRef(fn)
  React.useLayoutEffect(() => { ref.current = fn })
  return React.useCallback((...args) => ref.current(...args), [])
}

module.exports = {
  ...React,
  useEffectEvent: React.useEffectEvent || useEffectEvent,
}

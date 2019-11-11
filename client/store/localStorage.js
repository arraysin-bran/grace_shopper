//const localStorage = window.localStorage
// may need to define window (docs list both upper and lowercase on window, but was able to make work with lowercase before)
// cart is currently listed as undefined when localStorage called in browser and adding attempted

export const loadCart = () => {
  try {
    const serializedState = localStorage.getItem('cart')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error(err)
  }
}

export const saveCart = cart => {
  try {
    const serializedState = JSON.stringify(cart)
    localStorage.setItem('cart', serializedState)
  } catch (err) {
    console.error(err)
  }
}

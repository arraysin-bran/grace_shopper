// const localStorage = Window.localStorage
// may need to define wondow

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

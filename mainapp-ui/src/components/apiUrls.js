const scheme = 'http://'
const host = 'localhost:8000/api/'

const baseUrl = scheme + host

export const currentCustomerCartUrl = baseUrl + 'cart/current_customer_cart/'
export const categoryUrl = baseUrl + `category/`
export const productUrl = baseUrl + `product/`
export const removeFromCartUrl = currentCustomerCartUrl + 'remove_from_cart/'
export const addToCartUrl = currentCustomerCartUrl + 'add_to_cart/'
export const changeQtyUrl = currentCustomerCartUrl + 'change_qty/'
export const checkUserIsAuthenticatedUrl = baseUrl + 'check-user-is-authenticated/'
export const obtainJwtTokenUrl = baseUrl + 'token/'

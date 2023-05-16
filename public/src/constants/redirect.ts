import { Redirect } from 'next'

export const REDIRECT_PAGE_NOT_FOUND: Redirect = {
  statusCode: 302,
  destination: '/404',
}

export const REDIRECT_PAGE_HOME: Redirect = {
  statusCode: 302,
  destination: '/',
}

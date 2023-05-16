var MeeyId = window.MeeyId || null
window.onfocus = function () {
  // eslint-disable-next-line no-undef
  MeeyId && MeeyId.syncUser()
}

window.meeyIdAsyncInit = () => {
  // eslint-disable-next-line no-undef
  MeeyId &&
    // eslint-disable-next-line no-undef
    MeeyId.initSDK('#meeyid-sso-button', {
      clientId: 'meeyshare',
      onReady: () => {
      },
      onUser: (auth) => {
        const cookieAuth = getCookie('auth')
        const storedAuth = cookieAuth ? JSON.parse(cookieAuth) : null
        if (auth) {
          if (storedAuth && auth.access_token === storedAuth.access_token) {
            return
          }
          setCookies('auth', JSON.stringify(auth))
          if (getCookie('draft')) {
            window.location.href = '/'
          } else {
            window.location.reload()
          }

          return
        }
        if (storedAuth) {
          removeCookies('auth')
          window.location.reload()
          return
        }
        removeCookies('auth')
      },
      onSignInCompleted: () => {
      },
      onSignOutCompleted: () => {
      }
    })
}

const isClientSide = () => typeof window !== 'undefined'

const pairSplitRegExp = /; */

// eslint-disable-next-line no-control-regex
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/

const getCookies = (options) => {
  let req
  if (options) req = options.req
  if (!isClientSide()) {
    // if cookie-parser is used in project get cookies from ctx.req.cookies
    // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
    if (req && req.cookies) return req.cookies
    if (req && req.headers && req.headers.cookie) return parse(req.headers.cookie)
    return {}
  }

  const _cookies = {}
  const documentCookies = document.cookie ? document.cookie.split('; ') : []

  for (let i = 0; i < documentCookies.length; i++) {
    const cookieParts = documentCookies[i].split('=')

    const _cookie = cookieParts.slice(1).join('=')
    const name = cookieParts[0]

    _cookies[name] = _cookie
  }

  return _cookies
}

const getCookie = (key, options) => {
  const _cookies = getCookies(options)
  return processValue(decode(_cookies[key]))
}

const setCookies = (key, data, options) => {
  let _cookieOptions
  let _req
  let _res
  if (options) {
    const { req, res, ..._options } = options
    _req = req
    _res = res
    _cookieOptions = _options
  }

  const cookieStr = serialize(key, stringify(data), {
    path: '/',
    ..._cookieOptions
  })
  if (!isClientSide()) {
    if (_res && _req) {
      const currentCookies = _res.getHeader('Set-Cookie')

      _res.setHeader(
        'Set-Cookie',
        // @ts-ignore
        !currentCookies ? [cookieStr] : currentCookies.concat(cookieStr)
      )

      if (_req && _req.cookies) {
        const _cookies = _req.cookies
        data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data))
      }

      if (_req && _req.headers && _req.headers.cookie) {
        const _cookies = parse(_req.headers.cookie)

        data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data))

        _req.headers.cookie = Object.entries(_cookies).reduce((accum, item) => {
          return accum.concat(`${item[0]}=${item[1]};`)
        }, '')
      }
    }
  } else {
    document.cookie = cookieStr
  }
}

const removeCookies = (key, options) => {
  return setCookies(key, '', { ...options, maxAge: -1 })
}

const parse = (str, options) => {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string')
  }

  var obj = {}
  var opt = options || {}
  var pairs = str.split(pairSplitRegExp)
  var dec = opt.decode || decode

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i]
    var eq_idx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue
    }

    var key = pair.substring(0, eq_idx).trim()
    var val = pair.substring(++eq_idx, pair.length).trim()

    // quoted values
    // eslint-disable-next-line eqeqeq
    if ('"' == val[0]) {
      val = val.slice(1, -1)
    }

    // only assign once
    // eslint-disable-next-line eqeqeq
    if (undefined == obj[key]) {
      obj[key] = decodeURIComponent(val, dec)
    }
  }

  return obj
}

const decode = (str) => {
  if (!str) return str

  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
}

const processValue = (value) => {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'undefined') return undefined
  if (value === 'null') return null
  return value
}

const stringify = (value = '') => {
  try {
    const result = JSON.stringify(value)
    // eslint-disable-next-line no-useless-escape
    return /^[\{\[]/.test(result) ? result : value
  } catch (e) {
    return value
  }
}

const serialize = (name, val, options) => {
  var opt = options || {}
  var enc = opt.encode || encodeURIComponent

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid')
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid')
  }

  var value = enc(val)

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid')
  }

  var str = name + '=' + value

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge)
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid')
    }

    str += '; Domain=' + opt.domain
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid')
    }

    str += '; Path=' + opt.path
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid')
    }

    str += '; Expires=' + opt.expires.toUTCString()
  }

  if (opt.httpOnly) {
    str += '; HttpOnly'
  }

  if (opt.secure) {
    str += '; Secure'
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict'
        break
      case 'lax':
        str += '; SameSite=Lax'
        break
      case 'strict':
        str += '; SameSite=Strict'
        break
      case 'none':
        str += '; SameSite=None'
        break
      default:
        throw new TypeError('option sameSite is invalid')
    }
  }

  return str
}

const Fingerprint = function (options) {
  let nativeForEach, nativeMap
  nativeForEach = Array.prototype.forEach
  nativeMap = Array.prototype.map
  this.each = function (obj, iterator, context) {
    if (obj === null) {
      return
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context)
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        //@ts-ignore

        if (iterator.call(context, obj[i], i, obj) === {}) return
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          //@ts-ignore

          if (iterator.call(context, obj[key], key, obj) === {}) return
        }
      }
    }
  }
  this.map = function (obj, iterator, context) {
    let results = []
    if (obj == null) return results
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context)
    this.each(obj, function (value, index, list) {
      results[results.length] = iterator.call(context, value, index, list)
    })
    return results
  }
  if (typeof options == 'object') {
    this.hasher = options.hasher
    this.screen_resolution = options.screen_resolution
    this.screen_orientation = options.screen_orientation
    this.canvas = options.canvas
    this.ie_activex = options.ie_activex
  } else if (typeof options == 'function') {
    this.hasher = options
  }
}

Fingerprint.prototype = {
  get: function () {
    let keys = []
    keys.push(navigator.userAgent)
    keys.push(navigator.language)
    keys.push(screen.colorDepth)

    if (this.screen_resolution) {
      const resolution = this.getScreenResolution()
      if (typeof resolution !== 'undefined') {
        keys.push(this.getScreenResolution().join('x'))
      }
    }
    keys.push(new Date().getTimezoneOffset())
    keys.push(this.hasSessionStorage())
    keys.push(this.hasLocalStorage())
    keys.push(!!window.indexedDB)
    if (document.body) {
      //@ts-ignore

      keys.push(typeof document.body.addBehavior)
    } else {
      keys.push(typeof undefined)
    }
    //@ts-ignore

    keys.push(typeof window.openDatabase)
    //@ts-ignore

    keys.push(navigator.cpuClass)
    keys.push(navigator.platform)
    keys.push(navigator.doNotTrack)
    keys.push(this.getPluginsString())
    if (this.canvas && this.isCanvasSupported()) {
      keys.push(this.getCanvasFingerprint())
    }
    if (this.hasher) {
      return this.hasher(keys.join('###'), 31)
    } else {
      return this.murmurhash3_32_gc(keys.join('###'), 31)
    }
  },
  murmurhash3_32_gc: function (key, seed) {
    let remainder, bytes, h1, h1b, c1, c2, k1, i
    remainder = key.length & 3
    bytes = key.length - remainder
    h1 = seed
    c1 = 0xcc9e2d51
    c2 = 0x1b873593
    i = 0
    while (i < bytes) {
      k1 =
        (key.charCodeAt(i) & 0xff) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24)
      ++i
      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
      h1 ^= k1
      h1 = (h1 << 13) | (h1 >>> 19)
      h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff
      h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16)
    }
    k1 = 0
    switch (remainder) {
      case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
      case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
      case 1:
        k1 ^= key.charCodeAt(i) & 0xff
        k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
        k1 = (k1 << 15) | (k1 >>> 17)
        k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
        h1 ^= k1
    }
    h1 ^= key.length
    h1 ^= h1 >>> 16
    h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
    h1 ^= h1 >>> 13
    h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff
    h1 ^= h1 >>> 16
    return h1 >>> 0
  },
  hasLocalStorage: function () {
    try {
      return !!window.localStorage
    } catch (e) {
      return true
    }
  },
  hasSessionStorage: function () {
    try {
      return !!window.sessionStorage
    } catch (e) {
      return true
    }
  },
  isCanvasSupported: function () {
    let elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
  },
  isIE: function () {
    if (navigator.appName === 'Microsoft Internet Explorer') {
      return true
    } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {
      return true
    }
    return false
  },
  getPluginsString: function () {
    if (this.isIE() && this.ie_activex) {
      return this.getIEPluginsString()
    } else {
      return this.getRegularPluginsString()
    }
  },
  getRegularPluginsString: function () {
    return this.map(
      navigator.plugins,
      function (p) {
        var mimeTypes = this.map(p, function (mt) {
          return [mt.type, mt.suffixes].join('~')
        }).join(',')
        return [p.name, p.description, mimeTypes].join('::')
      },
      this
    ).join(';')
  },
  getIEPluginsString: function () {
    //@ts-ignore

    if (window.ActiveXObject) {
      const names = [
        'ShockwaveFlash.ShockwaveFlash',
        'AcroPDF.PDF',
        'PDF.PdfCtrl',
        'QuickTime.QuickTime',
        'rmocx.RealPlayer G2 Control',
        'rmocx.RealPlayer G2 Control.1',
        'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
        'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
        'RealPlayer',
        'SWCtl.SWCtl',
        'WMPlayer.OCX',
        'AgControl.AgControl',
        'Skype.Detection'
      ]
      return this.map(names, function (name) {
        try {
          //@ts-ignore

          new ActiveXObject(name)
          return name
        } catch (e) {
          return null
        }
      }).join(';')
    } else {
      return ''
    }
  },
  getScreenResolution: function () {
    let resolution
    if (this.screen_orientation) {
      resolution =
        screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height]
    } else {
      resolution = [screen.height, screen.width]
    }
    return resolution
  },
  getCanvasFingerprint: function () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]:"<>?;,.'
    ctx.textBaseline = 'top'
    ctx.font = "14px 'Arial'"
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText(txt, 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText(txt, 4, 17)
    return canvas.toDataURL()
  }
}

export default function FingerprintId() {
  const fp = new Fingerprint({
    canvas: true,
    ie_activex: true,
    screen_resolution: true
  })
  return fp.get()
}

export function fingerprint_browser_with_client() {
  try {
    return fingerprint_browser(navigator.userAgent)
  } catch (err) {
    //@ts-ignore

    return strOnError
  }
}

export function fingerprint_browser_with_server(req) {
  try {
    return fingerprint_browser(req.headers['user-agent'])
  } catch (err) {
    //@ts-ignore

    return strOnError
  }
}

export function fingerprint_browser(userAgent) {
  let strOnError, strUserAgent, numVersion, strBrowser, strOut

  strOnError = 'Error'
  strUserAgent = null
  numVersion = null
  strBrowser = null
  strOut = null

  try {
    strUserAgent = userAgent.toLowerCase()
    if (/msie (\d+\.\d+);/.test(strUserAgent)) {
      //test for MSIE x.x;
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      if (strUserAgent.indexOf('trident/6') > -1) {
        numVersion = 10
      }
      if (strUserAgent.indexOf('trident/5') > -1) {
        numVersion = 9
      }
      if (strUserAgent.indexOf('trident/4') > -1) {
        numVersion = 8
      }
      strBrowser = 'Internet Explorer ' + numVersion
    } else if (strUserAgent.indexOf('trident/7') > -1) {
      //IE 11+ gets rid of the legacy 'MSIE' in the user-agent string;
      numVersion = 11
      strBrowser = 'Internet Explorer ' + numVersion
    } else if (/firefox[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Firefox ' + numVersion
    } else if (/opera[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Opera ' + numVersion
    } else if (/chrome[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Chrome/x.x or Chrome x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Chrome ' + numVersion
    } else if (/version[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Version/x.x or Version x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Safari ' + numVersion
    } else if (/rv[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for rv/x.x or rv x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Mozilla ' + numVersion
    } else if (/mozilla[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Mozilla/x.x or Mozilla x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Mozilla ' + numVersion
    } else if (/binget[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for BinGet/x.x or BinGet x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (BinGet) ' + numVersion
    } else if (/curl[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Curl/x.x or Curl x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (cURL) ' + numVersion
    } else if (/java[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Java/x.x or Java x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (Java) ' + numVersion
    } else if (/libwww-perl[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for libwww-perl/x.x or libwww-perl x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (libwww-perl) ' + numVersion
    } else if (/microsoft url control -[\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Microsoft URL Control - x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (Microsoft URL Control) ' + numVersion
    } else if (/peach[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for Peach/x.x or Peach x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (Peach) ' + numVersion
    } else if (/php[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for PHP/x.x or PHP x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (PHP) ' + numVersion
    } else if (/pxyscand[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for pxyscand/x.x or pxyscand x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (pxyscand) ' + numVersion
    } else if (/pycurl[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for pycurl/x.x or pycurl x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (PycURL) ' + numVersion
    } else if (/python-urllib[\/\s](\d+\.\d+)/.test(strUserAgent)) {
      //test for python-urllib/x.x or python-urllib x.x (ignoring remaining digits);
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Library (Python URLlib) ' + numVersion
    } else if (/appengine-google/.test(strUserAgent)) {
      //test for AppEngine-Google;
      numVersion = Number(RegExp.$1) // capture x.x portion and store as a number
      strBrowser = 'Cloud (Google AppEngine) ' + numVersion
    } else {
      strBrowser = 'Unknown'
    }
    strOut = strBrowser
    return strOut
  } catch (err) {
    return strOnError
  }
}

export function fingerprintOSV2_with_client() {
  try {
    return fingerprintOSV2(navigator.userAgent)
  } catch (error) {
    return ''
  }
}

export function fingerprintOSV2_with_server(req) {
  try {
    return fingerprintOSV2(req.headers['user-agent'])
  } catch (error) {
    return ''
  }
}

export function fingerprintOSV2(userAgent) {
  try {
    return userAgent.toLowerCase()
  } catch (error) {
    return ''
  }
}

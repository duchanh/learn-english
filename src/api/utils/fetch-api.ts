import { AppAPIConfig } from '../index'
import { CustomNodeJsGlobal } from '../type'
import { FetcherError } from './error'
import omit from 'lodash.omit'
import { CLIENT_ID } from '@/constants/environment'
// Get an instance to vercel fetch

// Get token util

export async function fetchData<T>(opts: {
  token: string
  path: string
  method: string
  config: AppAPIConfig
  fetchOptions?: Record<string, any>
  body?: BodyInit
}): Promise<T | null> {
  // Destructure opts
  const { body, fetchOptions, config, token, method = 'GET', path } = opts
  // Do the request with the correct headers

  const headerFetch = {
    ...fetchOptions,
    ...fetchOptions?.headers,
    accept: 'application/json, text/plain, */*',
    'client-id': CLIENT_ID,
    'Accept-Language': 'vi'
  }

  if (token) {
    headerFetch.authorization = `Bearer ${token}`
  }

  if (!fetchOptions?.formData) {
    headerFetch['Content-Type'] = fetchOptions?.contentType ?? 'application/json'
  }

  const url = `${config.apiUrl}/${path}`

  try {
    const dataResponse = await fetch(url, {
      ...fetchOptions,
      method,
      headers: omit(headerFetch, 'token'),
      body: body
        ? fetchOptions?.contentType || fetchOptions?.formData
          ? body
          : JSON.stringify(body)
        : undefined
    })

    // If something failed getting the data response
    if (!dataResponse.ok) {
      // Get the body of it
      // const error = null

      // And return an error
      throw new FetcherError({
        errors: [{ message: dataResponse.statusText }],
        status: dataResponse.status
      })
    }

    try {
      // Return data response as json
      return (await dataResponse.json()) as Promise<T>
    } catch (error) {
      console.error('Fail to cast response to json.......', url, error)
      // If response is empty return it as text
      // return null as unknown as Promise<T>
      throw error
    }
  } catch (error) {
    // console.group(' ------ FAIL TO CALL API ------')
    // console.log('PATH: ', url)
    // console.log('PARAMS: ', body)
    // console.log('ERROR: ', error)
    console.groupEnd()
    return null
    //throw error
  }
}

export const createFetcher: <DataType>(
  getConfig: () => AppAPIConfig
) => (
  method: string,
  path: string,
  body?: any,
  fetchOptions?: Record<string, any>
) => Promise<DataType | null> =
  (getConfig) =>
  async <T>(method: string, path: string, body?: any, fetchOptions?: Record<string, any>) => {
    const customGlobal = global as unknown as CustomNodeJsGlobal
    // Get provider config
    const config = getConfig()
    // If a token was passed, set it on global
    customGlobal.token = fetchOptions.token ?? null
    // Return the data and specify the expected type
    const data = await fetchData<T>({
      token: customGlobal.token as string,
      fetchOptions,
      config,
      method,
      path,
      body
    })
    return data
  }

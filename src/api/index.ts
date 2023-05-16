export interface LocalConfig {
	apiUrl: string
	apiToken: string
	cookie: string
	customerCookie: string
	cookieMaxAge: number
}

export interface RestFetcherResult<Data = any> {
	data: Data
	res: any
}

export interface CommerceAPIFetchOptions<Variables> {
	variables?: Variables
	preview?: boolean
}

export interface AppAPIConfig {
	locale?: string
	locales?: string[]
	apiUrl: string
	apiToken?: string
	cartCookie?: string
	cartCookieMaxAge?: number
	customerCookie?: string
	fetch?<Data = any, Variables = any>(
		query: string,
		queryData?: CommerceAPIFetchOptions<Variables>,
		fetchOptions?: any
	): Promise<RestFetcherResult<Data>>
	tokenCookie?: string
}

export interface APIConfig extends AppAPIConfig {
	resetFetch: <T>(
		method: string,
		resource: string,
		body?: Record<string, unknown>,
		fetchOptions?: Record<string, any>
	) => Promise<T>
	tokenCookie: string
}

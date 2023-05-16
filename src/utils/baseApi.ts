import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import urlJoin from "url-join";

export interface BaseApiParams {
  path?: string;
  baseUrl: string;
  data?: any;
  contentType?: string;
  config?: AxiosRequestConfig;
  noUseToken?: boolean
  onUploadProgress?: (progressEvent: ProgressEvent) => void
  headerArgs?: Object
  keyApi?: string

}

export interface ResponseSuccess {
  error?: {
    status: boolean;
    message: string;
  };
  data: any;
}

const getGetConfig = (data?: any) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Accept-Language": "vi,vi-VN",
    },
  };
  data ? (config.params = data) : null;

  return config;
};

const getPostConfig = (
  contentType?: string,
  noUseToken?: boolean,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
  headerArgs?: any
): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': contentType ?? 'application/json',
      'Client-ID': 'meeyland',
      'Accept-Language': "vi,vi-VN",
      'X-Client-Source': 'meey3d'
    },
    // onUploadProgress: onUploadProgress,
  }
}

export const getApi = async <T extends ResponseSuccess>({
  path = '/',
  baseUrl,
}: BaseApiParams) => {
  try {
    const response: AxiosResponse<T> = await axios.get(
      urlJoin(baseUrl, path),
      getGetConfig()
    )
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error: any) {
  }
}

export const postApi = async <T>({
     path = '/',
     baseUrl,
     data,
     contentType,
     noUseToken,
     onUploadProgress,
     headerArgs,
     keyApi,
   }: BaseApiParams): Promise<T | any> => {

  try {
    const pathPost = urlJoin(baseUrl, path)
    const response: AxiosResponse<T, any> = await axios.post(
      pathPost,
      data,
      getPostConfig(contentType, noUseToken, onUploadProgress, headerArgs)
    )
    if (response.status === 200 || response.status === 201) {
      return response.data ?? null
    }
    return null
  } catch (error: any) {
    if (axios.isCancel(error)) return error.message
    else {
      throw error
    }
  }
}

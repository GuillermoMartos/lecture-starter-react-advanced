import { Accept, ContentType, HttpHeader, HttpMethod, ValueOf } from '../constants';


type HttpOptions = {
    method: HttpMethod,
    contentType?: ValueOf<typeof ContentType>;
    authorization?: string;
    accept?: ValueOf<typeof Accept>;
    payload: BodyInit | null;
}

export class Http {
  public async load<T = unknown>(url: string, options: Partial<HttpOptions> = {})
    : Promise<T> {
    const { method = 'GET', payload = null } = options;
    const headers = this.getHeaders(options);
    
    try {
      const response = await fetch(url, { method, headers, body: payload });
      this.checkStatus(response);
      return await this.parseJSON<T>(response);
    } catch (error) {
      this.throwError(error);
    }
  }
    
  private getHeaders(options: Partial<HttpOptions>): HeadersInit {
    const headers= new Headers();
    if (options.contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, options.contentType);
    }
    if (options.authorization) {
      headers.append(HttpHeader.AUTHORIZATION, options.authorization);
    }
    if (options.accept) {
      headers.append(HttpHeader.ACCEPT, options.accept);
    }
      
    return headers;
  }
    
  private checkStatus(response: Response): Response {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}: ${response.statusText}`);
    }
    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(error: unknown): never {
    if (error instanceof Error) {
      console.error('HTTP request failed', error.message);
    } else {
      console.error('HTTP request failed', error);
    }
    throw error;
  }
}
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  method?: Method;
  timeout?: number;
}

interface HTTPTransportOptions {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  timeout?: number;
}

function queryStringify(data: Record<string, unknown>): string {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, String(item));
      });
    } else if (value !== null && typeof value === "object") {
      params.append(key, JSON.stringify(value));
    } else {
      params.append(key, String(value));
    }
  });

  return `?${params.toString()}`;
}

class HTTPTransport {
  private _createMethod(method: Method) {
    return (url: string, options: HTTPTransportOptions = {}): Promise<XMLHttpRequest> => {
      return this._request(url, { ...options, method });
    };
  }

  private _request = (url: string, options: RequestOptions): Promise<XMLHttpRequest> => {
    const { headers = {}, data, method, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();

      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value as string);
      }

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };

  get = this._createMethod(METHODS.GET);
  put = this._createMethod(METHODS.PUT);
  post = this._createMethod(METHODS.POST);
  delete = this._createMethod(METHODS.DELETE);
}

export default HTTPTransport;

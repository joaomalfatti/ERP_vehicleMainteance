import type { Request, Response } from 'express'

export type HttpMethod = 'get' | 'post'

//melhor enums
export const HttpMethod = {
  GET: 'get' as HttpMethod,
  POST: 'post' as HttpMethod,
} as const

export type RouteContract = {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
}

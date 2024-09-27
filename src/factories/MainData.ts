import { Request } from 'express';
export abstract class MainData {
    public limit = 20;

    public abstract all(params:Array<any>): any;

    public abstract get(fileId: number): any;

    public abstract store(request: Request): any;

    public abstract update(id: number, request: Request): any;

    public abstract delete(id: number, request: Request): any;
}
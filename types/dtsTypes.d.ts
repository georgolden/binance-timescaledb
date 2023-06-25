/// <reference types="node" />
export interface DtsExampleInterfaceWriter {
    write(buf: Buffer): Promise<void>;
}
export type DtsExampleType = 'example' | 'type';
export type dtsExampleFunction = (...args: number[]) => number;

// src/types/qrcode.d.ts
declare module 'qrcode' {
    export function toDataURL(text: string, callback: (error: any, url: string) => void): void;
    export function toDataURL(text: string): Promise<string>;
}

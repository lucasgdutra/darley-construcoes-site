

export interface Size {
    size: 320 | 480 | 768 | 1024 | 1280 | 1600 | 1920;
    path: string;
}



export interface ImageVariant {
    format: 'webp' | 'jpg' | 'avif';
    sizes: Size[];
}

export interface ImageData {
    id: string;
    group?: string;
    description: string;
    variants: ImageVariant[];
}

export interface ImageJsonInterface {
    [key: string]: ImageData;
}

declare module 'image-pixels'{
    export default function(src: string) : Promise<{width: number, data: number[], height: number, [k: string]: any}>
}

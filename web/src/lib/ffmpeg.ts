import { FFmpeg } from '@ffmpeg/ffmpeg';
import coreURL from '@/ffmpeg/ffmpeg-core.js?url';
import wasmURL from '@/ffmpeg/ffmpeg-core.wasm?url';
import workerURL from '@/ffmpeg/ffmpeg-worker.js?url';

let ffmpeg: FFmpeg | null = null;

const useFFmpeg = async () => {
    if (!ffmpeg) {
        ffmpeg = new FFmpeg();
        await ffmpeg.load({
            coreURL,
            wasmURL,
            workerURL
        });
    }

    return ffmpeg;
}

export default useFFmpeg;
import { FileVideo, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import useFFmpeg from '@/lib/ffmpeg.ts';
import { fetchFile } from '@ffmpeg/util';
import Api from '@/lib/api.ts';

function FormVideo() {
    const [video, setVideo] = useState<File|null>(null);
    const [upload] = useState<boolean>(false);

    const preview = useMemo(() => {
        return video ? URL.createObjectURL(video) : null;
    }, [video]);

    async function extractAudio(video: File): Promise<File> {
        console.log('Starting audio extraction...');

        const ffmpeg = await useFFmpeg();
        await ffmpeg.writeFile('video.mp4', await fetchFile(video));
        // ffmpeg.on('log', console.warn);
        ffmpeg.on('progress', ({ progress }) => console.log(Math.round(progress*100)));
        await ffmpeg.exec(['-i', 'video.mp4', '-map', '0:a', '-b:a', '24k', '-acodec', 'libmp3lame', 'audio.mp3']);
        const data = await ffmpeg.readFile('audio.mp3');
        const blob = new Blob([data], { type: 'audio/mpeg' });
        const audio = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });

        console.log('Audio extraction finished.');
        return audio;
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(!video) return;

        const file = new FormData();
        file.append('file', await extractAudio(video));
        const response = await Api.post('/video', file);
        console.log(response.data);
    }

    function onSelectVideo(event: ChangeEvent<HTMLInputElement>) {
        event.currentTarget.files ? setVideo(event.currentTarget.files[0]) : setVideo(null);
    }

    function renderPreview() {
        if(preview)
            return <video controls={false} src={preview} className="pointer-events-none absolute inset-0"/>;
        return <>
            <FileVideo className="w-4 h-4"/>
            Selecionar vídeo
        </>;
    }

    return <form onSubmit={onSubmit} className="space-y-6">
        <label htmlFor="video" className="relative flex aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
            {renderPreview()}
        </label>
        <input type="file" name="file" id="video" accept="videoRoute/mp4" className="sr-only" onChange={onSelectVideo}/>
        <div className="space-y-2">
            <Label htmlFor="transcription-prompt">Prompt de Transcrição</Label>
            <Textarea name="prompt" id="transcription-prompt" className="h-20 leading-relaxed resize-none" placeholder="Inclua palavras-chaves separadas por vígulas (,)"/>
        </div>
        <Button type="submit" className="w-full">{ upload
            ? 'Sucesso'
            : <>Carregar Video<Upload className="w-4 h-4 ml-2"/></>
        }</Button>
    </form>;
}

export default FormVideo;
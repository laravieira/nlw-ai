import { Check, FileVideo, Loader, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import useFFmpeg from '@/lib/ffmpeg.ts';
import { fetchFile } from '@ffmpeg/util';
import Api from '@/lib/api.ts';

enum Status {
    IDLE,
    EXTRACTING,
    UPLOADING,
    TRANSCRIBING,
    SUCCESS
}

function FormVideo() {
    const [video, setVideo] = useState<File|null>(null);
    const [status, setStatus] = useState<Status>(Status.IDLE);

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

        const prompt = new FormData(event.currentTarget).get('prompt') as string;

        // Extract audio from video
        setStatus(Status.EXTRACTING);
        const file = new FormData();
        file.append('file', await extractAudio(video));

        // Upload audio to server
        setStatus(Status.UPLOADING);
        const response = await Api.post('/video', file);

        // Transcribe audio
        setStatus(Status.TRANSCRIBING);
        const transcription = await Api.post(`/transcription/${response.data.id}`, {
            prompt
        });

        // Update status
        setStatus(Status.SUCCESS);
        console.log(transcription.data);
    }

    function onSelectVideo(event: ChangeEvent<HTMLInputElement>) {
        event.currentTarget.files ? setVideo(event.currentTarget.files[0]) : setVideo(null);
        setStatus(Status.IDLE);
    }

    function renderPreview() {
        if(preview)
            return <video controls={false} src={preview} className="pointer-events-none absolute inset-0 w-full"/>;
        return <>
            <FileVideo className="w-4 h-4"/>
            Selecionar vídeo
        </>;
    }

    return <form onSubmit={onSubmit} className="space-y-6">
        <label htmlFor="video" className="relative flex aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 overflow-hidden">
            {renderPreview()}
        </label>
        <input
            type="file"
            name="file"
            disabled={status != Status.IDLE && status != Status.SUCCESS}
            id="video"
            accept="video/mp4"
            className="sr-only"
            onChange={onSelectVideo}/>
        <div className="space-y-2">
            <Label htmlFor="transcription-prompt">Prompt de Transcrição</Label>
            <Textarea
                name="prompt"
                disabled={status != Status.IDLE && status != Status.SUCCESS}
                id="transcription-prompt"
                className="h-20 leading-relaxed resize-none"
                placeholder="Inclua palavras-chaves separadas por vígulas (,)"
                onChange={() => setStatus(Status.IDLE)}/>
        </div>
        <Button
            type="submit"
            data-success={status === Status.SUCCESS ? 'success' : undefined}
            disabled={status != Status.IDLE && status != Status.SUCCESS}
            className={`w-full data-[success]:bg-emerald-600`}>
            { status === Status.IDLE         && <>Carregar Video<Upload className="w-4 h-4 ml-2"/></> }
            { status === Status.EXTRACTING   && <>Extraindo<Loader className="w-4 h-4 ml-2 animate-spin"/></> }
            { status === Status.UPLOADING    && <>Enviando<Loader className="w-4 h-4 ml-2 animate-spin"/></> }
            { status === Status.TRANSCRIBING && <>Transcrevendo<Loader className="w-4 h-4 ml-2 animate-spin"/></> }
            { status === Status.SUCCESS      && <>Sucesso<Check className="w-4 h-4 ml-2"/></> }
        </Button>
    </form>;
}

export default FormVideo;
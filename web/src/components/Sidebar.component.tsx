import { Separator } from '@/components/ui/separator.tsx';
import { FileVideo, Upload, Wand2 } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { useState } from 'react';

function Sidebar() {
    const [upload] = useState<boolean>(false);

    return <aside className="w-80 space-y-6">
        <Separator/>
        <form action="" className="space-y-6">
            <label htmlFor="video" className="flex aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
                <FileVideo className="w-4 h-4"/>
                Selecionar vídeo
            </label>
            <input type="file" name="file" id="video" accept="videoRoute/mp4" className="sr-only"/>
            <div className="space-y-2">
                <Label htmlFor="transcription-prompt">Prompt de Transcrição</Label>
                <Textarea id="transcription-prompt" className="h-20 leading-relaxed resize-none" placeholder="Inclua palavras-chaves separadas por vígulas (,)"/>
            </div>
            <Button type="submit" className="w-full">{ upload
                ? 'Sucesso'
                : <>Carregar Video<Upload className="w-4 h-4 ml-2"/></>
            }</Button>
        </form>
        <Separator/>
        <form action="" className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Select name="prompt">
                    <SelectTrigger id="prompt">
                        <SelectValue placeholder="Slecione um prompt..."/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="yt-title">Título do Youtube</SelectItem>
                        <SelectItem value="yt-description">Descrição do Youtube</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Select name="model" defaultValue="gpt-3.5-turbo" disabled>
                    <SelectTrigger id="model">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">GPT 3.5-turbo 16k</SelectItem>
                    </SelectContent>
                </Select>
                <span className="block text-xs text-muted-foreground italic">Você podera customizar essa opção em breve.</span>
            </div>
            <div className="space-y-4">
                <Label htmlFor="temperature">Temperatura</Label>
                <Slider id="temperature" name="temperature" min={0} max={1} step={.01} defaultValue={[.5]}/>
                <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</span>
            </div>
            <Separator/>
            <Button type="submit" className="w-full">
                Executar <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
        </form>
        <Separator/>
    </aside>;
}

export default Sidebar;
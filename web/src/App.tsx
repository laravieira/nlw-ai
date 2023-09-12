import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {FileVideo, Upload, Wand2} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Slider} from "@/components/ui/slider.tsx";

function App() {
    const [upload] = useState<boolean>(false);

    return <div className="min-h-screen max-w-7xl flex flex-col pb-16">
        <div className="px-16 h-32 flex items-center justify-between">
            <h1 className="text-xl font-light">NLW AI - Upload AI</h1>
            <div className="flex items-center">
                <span className="text-sm font-light">with 💜 by</span>
                <Button variant="link">L4R4V131R4</Button>
            </div>
        </div>
        <div className="flex-1 px-16 py-6 flex gap-6">
            <div className="flex flex-col flex-1 gap-4">
                <div className="grid grid-rows-2 gap-4 flex-1">
                    <Textarea className="resize-none p-5 leading-relaxed" placeholder="Inclua o prompt para a IA..."></Textarea>
                    <Textarea className="resize-none p-5 leading-relaxed" placeholder="...Resultado gerado pela IA." readOnly></Textarea>
                </div>
                <p className="text-sm text-muted-foreground">Lembre-se: Voce pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
            </div>
            <aside className="w-80 space-y-6">
                <Separator/>
                <form action="" className="space-y-6">
                    <label htmlFor="video" className="flex aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
                        <FileVideo className="w-4 h-4"/>
                        Selecionar vídeo
                    </label>
                    <input type="file" name="video" id="video" accept="video/mp4" className="sr-only"/>
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
                        <Select id="prompt">
                            <SelectTrigger>
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
                        <Select id="model" defaultValue="gpt-3.5-turbo" disabled>
                            <SelectTrigger>
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt-3.5-turbo">GPT 3.5-turbo 16k</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="block text-xs text-muted-foreground italic">Você podera customizar essa opção em breve.</span>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="temperature">Temperatura</Label>
                        <Slider id="temperature" min={0} max={1} step={.01} defaultValue={[.5]}/>
                        <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</span>
                    </div>
                    <Separator/>
                    <Button type="button" className="w-full">
                        Executar <Wand2 className="w-4 h-4 ml-2"/>
                    </Button>
                </form>
                <Separator/>
            </aside>
        </div>
    </div>;
}

export default App;
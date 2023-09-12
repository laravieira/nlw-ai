import { Textarea } from '@/components/ui/textarea.tsx';

function Content() {
    return <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea className="resize-none p-5 leading-relaxed" placeholder="Inclua o prompt para a IA..."></Textarea>
            <Textarea className="resize-none p-5 leading-relaxed" placeholder="...Resultado gerado pela IA." readOnly></Textarea>
        </div>
        <p className="text-sm text-muted-foreground">Lembre-se: Voce pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
    </div>;
}

export default Content;
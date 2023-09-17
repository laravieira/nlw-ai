import { Textarea } from '@/components/ui/textarea.tsx';
import { useContext } from 'react';
import Generation from '@/contexts/Generation.context.tsx';

function Content() {
    const { template, completion } = useContext(Generation);

    return <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-3 gap-4 flex-1">
            <Textarea
                className="resize-none p-5 leading-relaxed row-start-1 row-end-3 purple-scrollbar"
                placeholder="Inclua o prompt para a IA..."
                value={template.value}
                onChange={event => template.set(event.currentTarget.value)}/>
            <Textarea
                className="resize-none p-5 leading-relaxed purple-scrollbar"
                placeholder="...Resultado gerado pela IA."
                value={completion}
                readOnly/>
        </div>
        <p className="text-sm text-muted-foreground">Lembre-se: Voce pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
    </div>;
}

export default Content;
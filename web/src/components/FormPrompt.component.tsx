import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader, Wand2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Api from '@/lib/api.ts';
import Generation from '@/contexts/Generation.context.tsx';

type Prompt = {
    id: string;
    title: string;
    template: string;
}

type Model = {
    id: string;
    name: string;
    model: string;
}

function FormPrompt() {
    const {
        template,
        temperature,
        onGenerate,
        loading
    } = useContext(Generation);
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [models] = useState<Model[]>([{ id: "1", name: 'GPT 3.5-turbo 16k', model: 'gpt-3.5-turbo' }]);

    useEffect(() => {
        Api.get('/prompts').then((response) => {
            setPrompts(response.data);
        });
    }, []);

    function onPromptChange(id: string) {
        const prompt = prompts.find((prompt) => prompt.id === id);
        if (prompt)
            template.set(prompt.template);
    }

    function renderItem(name:string, id: string) {
        return <SelectItem key={id} value={id}>
            {name}
        </SelectItem>;
    }

    function renderPrompts() {
        return <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Select name="prompt" onValueChange={onPromptChange}>
                <SelectTrigger id="prompt">
                    <SelectValue placeholder="Slecione um prompt..."/>
                </SelectTrigger>
                <SelectContent>
                    { prompts.map((prompt) => renderItem(prompt.title, prompt.id)) }
                </SelectContent>
            </Select>
        </div>;
    }

    function renderModels() {
        return <div className="space-y-2">
            <Label htmlFor="model">Modelo</Label>
            <Select name="model" defaultValue={ models.length ? models[0].id : undefined } disabled>
                <SelectTrigger id="model">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    { models.map(model => renderItem(model.name, model.id)) }
                </SelectContent>
            </Select>
            <span className="block text-xs text-muted-foreground italic">Você podera customizar essa opção em breve.</span>
        </div>;
    }

    function renderTemperature() {
        return <div className="space-y-4">
            <Label htmlFor="temperature">Temperatura</Label>
            <Slider
                id="temperature"
                name="temperature"
                min={0} max={1} step={.01}
                defaultValue={[.5]}
                onValueChange={values => temperature.set(values[0])}/>
            <span className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</span>
        </div>;
    }

    return <form onSubmit={onGenerate} className="space-y-6">
        { renderPrompts() }
        { renderModels() }
        { renderTemperature() }
        <Separator/>
        <Button type="submit" disabled={loading} className="w-full">
            { !loading && <>Executar<Wand2 className="w-4 h-4 ml-2"/></> }
            { loading && <>Gerando<Loader className="w-4 h-4 ml-2 animate-spin"/></> }
        </Button>
    </form>;
}

export default FormPrompt;
import { createContext, Dispatch, FormEvent, PropsWithChildren, SetStateAction, useState } from 'react';
import { useCompletion } from 'ai/react';

type State<T> = {
    set: Dispatch<SetStateAction<T>>;
    value: T;
}

const Generation = createContext<{
    video: State<string|null>;
    temperature: State<number>;
    template: State<string>;
    completion: string;
    onGenerate: (event: FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}>({
    video: {
        set: () => {},
        value: null
    },
    temperature: {
        set: () => {},
        value: .5
    },
    template: {
        set: () => {},
        value: ''
    },
    completion: '',
    onGenerate: () => {},
    loading: false
});

export function GenerationContext(props: PropsWithChildren) {
    const [video, setVideo] = useState<string|null>(null);
    const [temperature, setTemperature] = useState<number>(.5);
    const {
        input,
        setInput,
        completion,
        handleSubmit,
        isLoading
    } = useCompletion({
        api: 'http://localhost:3333/subject',
        body: {
            video,
            temperature
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const value = {
        video: {
            set: setVideo,
            value: video
        },
        temperature: {
            set: setTemperature,
            value: temperature
        },
        template: {
            set: setInput,
            value: input
        },
        completion,
        onGenerate: handleSubmit,
        loading: isLoading
    };

    return <Generation.Provider value={value}>
        {props.children}
    </Generation.Provider>;
}

export default Generation;
import Header from '@/components/Header.component.tsx';
import Content from '@/components/Content.component.tsx';
import Sidebar from '@/components/Sidebar.component.tsx';
import { GenerationContext } from '@/contexts/Generation.context.tsx';

function App() {
    return <div className="min-h-screen max-w-7xl flex flex-col pb-16">
        <Header/>
        <div className="flex-1 px-16 py-6 flex gap-6">
            <GenerationContext>
                <Content/>
                <Sidebar/>
            </GenerationContext>
        </div>
    </div>;
}

export default App;
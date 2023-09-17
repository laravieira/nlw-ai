import { Separator } from '@/components/ui/separator.tsx';
import FormVideo from '@/components/FormVideo.component.tsx';
import FormPrompt from '@/components/FormPrompt.component.tsx';

function Sidebar() {
    return <aside className="w-80 space-y-6">
        <Separator/>
        <FormVideo/>
        <Separator/>
        <FormPrompt/>
        <Separator/>
    </aside>;
}

export default Sidebar;
import { Button } from '@/components/ui/button.tsx';

function Header() {
    return <header className="px-16 h-32 flex items-center justify-between">
        <h1 className="text-xl font-light">NLW AI - Upload AI</h1>
        <div className="flex items-center">
            <span className="text-sm font-light">with 💜 by</span>
            <Button variant="link">L4R4V131R4</Button>
        </div>
    </header>;
}

export default Header;
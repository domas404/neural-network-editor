import "@/app/globalicons.css";
import Main from '@/app/ui/cnn/main';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Model | Multilayer Perceptron',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <Main />
        </main>
    );
}

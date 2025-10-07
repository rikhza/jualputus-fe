import { Plus } from 'lucide-react';
import { Button } from './ui/Button';

interface FloatingCTAProps {
  onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Button
        onClick={onClick}
        size="lg"
        className="shadow-2xl rounded-full w-14 h-14 p-0 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

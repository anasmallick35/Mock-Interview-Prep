import { LoaderCircle } from 'lucide-react';

export const Spinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoaderCircle className="w-16 h-16 animate-spin" />
    </div>
  );
};
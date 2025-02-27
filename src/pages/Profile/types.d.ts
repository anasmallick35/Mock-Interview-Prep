export interface ProfileProps {
    user: any;
    name: string;
    setName: (value: string) => void;
    picture: string;
    setImageFile: (file: File | null) => void;
    uploading: boolean;
    updateLoading: boolean;
    updateError: any;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    error: any;
  }
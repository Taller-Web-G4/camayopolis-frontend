export interface Combo {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface ComboCardProps {
    combo: Combo;
    onDelete: (id: number) => void;
}

export interface AddComboModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCombo: (combo: Omit<Combo, 'id'>) => void;
}

export interface ComboCardPropsWithDelete extends ComboCardProps {
    onDelete: (id: number) => void;
}
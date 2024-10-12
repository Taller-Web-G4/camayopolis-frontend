export interface Session {
    format: string;
    type: string;
    language: string;
    schedules: string[];
    date: string;
}

export interface Cinema {
    cinema: string;
    city: string;
    session: Session[];
}

export interface Movie {
    id: number;
    title: string;
    synopsis: string;
    openingDate: string;
    runtime: number;
    posterUrl: string;
    trailer: string;
    isComingSoon: boolean;
    isNewRelease: boolean;
    isPreSale: boolean;
    cines: Cinema[];
}


export const MovieInit: Movie = {
    id: 0,
    title: "",
    synopsis: "",
    openingDate: "",
    runtime: 0,
    posterUrl: "",
    trailer: "",
    isComingSoon: false,
    isNewRelease: false,
    isPreSale: false,
    cines: []
}

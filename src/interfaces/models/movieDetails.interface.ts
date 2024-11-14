export interface MovieDetails {
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
    isInTheater: boolean;
    category: string | null;
}

export const MovieDetailsInit: MovieDetails = {
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
    isInTheater: false,
    category: null,
};

export interface Gender {
    id: number,
    name: string
}

export interface MovieGender {
    id: number,
    title: string,
    synopsis: string,
    openingDate: string,
    runtime: number,
    posterUrl: string,
    trailer: string,
    isComingSoon: boolean,
    isNewRelease: boolean,
    isPreSale: boolean,
    isInTheater: boolean,
    category: any,
    gender: Gender
}

/* "id": 11,
        "title": "Toy Story",
        "synopsis": "Un muñeco vaquero se siente amenazado y celoso cuando una figura de acción espacial lo sustituye como el juguete preferido de un niño.",
        "openingDate": "1995-11-22",
        "runtime": 82,
        "posterUrl": "http://posterurl.com/toystory",
        "trailer": "http://trailerurl.com/toystory",
        "isComingSoon": false,
        "isNewRelease": true,
        "isPreSale": false,
        "isInTheater": true,
        "category": null,
        "gender": {
            "id": 1,
            "name": "Acción"
        } */
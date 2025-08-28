export interface users{
    id:number,
    email:string,
    ruolo:string,
    stato:boolean,
}

export interface Product{
    id:number,
    nome:string,
    urlImage:string,
    descrizione:string,
    attivo:boolean,
}

export interface ProductWithoutId{
    nome:string,
    urlImage:string,
    descrizione:string,
    attivo:boolean,
}


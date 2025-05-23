export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: number;
    country?: string | undefined
    city?: string | undefined
    }

    export interface Product {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: boolean;
        imgUrl: string;
    }
    
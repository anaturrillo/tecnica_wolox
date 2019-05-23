export interface User {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly email:string;
    readonly address?: {
        readonly street?:string,
        readonly city?:string,
        readonly suite: string,
        readonly zipcode?: string,
        readonly geo?: {
            readonly lat: string,
            readonly lng: string
        }
    };
    readonly phone?: string;
    readonly website?: string;
    readonly company?: {
        readonly name: string,
        readonly catchPhrase: string,
        readonly bs: string
    }
}

export interface Photo {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
    readonly body: string;
}

export interface Album {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
}

export interface Posts {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
    readonly body: string;
}

export interface Comments {
    readonly postId: number;
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly body: string;
}
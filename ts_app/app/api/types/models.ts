export interface IUser {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly address?: {
        readonly street?: string,
        readonly city?: string,
        readonly suite: string,
        readonly zipcode?: string,
        readonly geo?: {
            readonly lat: string,
            readonly lng: string,
        };
    };
    readonly phone?: string;
    readonly website?: string;
    readonly company?: {
        readonly name: string,
        readonly catchPhrase: string,
        readonly bs: string,
    };
}

export interface IPhoto {
    readonly id: number;
    readonly albumId: number;
    readonly title: string;
    readonly url: string;
    readonly thumbnailUrl: string;
}

export interface IAlbum {
    readonly userId: number;
    readonly id: number;
    readonly title: string;
}

export interface IComment {
    readonly postId: number;
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly body: string;
}

export interface IAlbumUsers {
    USER_ID: number;
    ALBUM_ID: number;
    WRITE_PERMISSION: boolean;
    READ_PERMISSION: boolean;
}

export enum ErrorCode {
    NOT_FOUND = "NOT_FOUND",
    BAD_FORMAT = "BAD_FORMAT",
}

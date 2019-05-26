import {Router} from "express";
import usersRouter from "./users/users.router";
import albumsRouter from "./albums/albums.router";
import photosRouter from "./photos/photos.router";
import commentsRouter from "./comments/comments.router";
import sharedRouter from "./shared/shared.router";


/*
import albumsRouter from './albums/albums.router'
import photosRouter from './photos/photos.router'
import commentsRouter from './comments/comments.router'
import postsRouter from './posts.router'
*/

export function routes(): Router {
    const router = Router();

    router.use("/users", usersRouter);
    router.use("/albums", albumsRouter);
    router.use("/photos", photosRouter);
    router.use("/comments", commentsRouter);
    router.use("/shared", sharedRouter);

    return router;
}

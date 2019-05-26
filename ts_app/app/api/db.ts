import * as sqlite from "sqlite";

let db;

export const getDb = async (): Promise<sqlite.Database> => {
    if (!db) {
        const tmpDb = await sqlite.open("./db.sqlite");
        await tmpDb.exec(`
            CREATE TABLE IF NOT EXISTS ALBUM_USERS (
                 ALBUM_ID INT,
                 USER_ID INT,
                 WRITE_PERMISSION BOOL,
                 READ_PERMISSION BOOL,
                 PRIMARY KEY (ALBUM_ID, USER_ID)
            )`);
        db = tmpDb;
        return db;
    }

    return db;
};

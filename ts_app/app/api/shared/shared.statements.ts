const columnList = "(ALBUM_ID,USER_ID,WRITE_PERMISSION,READ_PERMISSION)";

export const shareAlbumStmt = `INSERT OR REPLACE INTO ALBUM_USERS ${columnList} VALUES (?,?,?,?)`;

export const permissionQuerys = {
    read: "SELECT USER_ID FROM ALBUM_USERS WHERE WRITE_PERMISSION = TRUE AND ALBUM_ID = ?",
    write: "SELECT USER_ID FROM ALBUM_USERS WHERE READ_PERMISSION = TRUE AND ALBUM_ID = ?",
};

export const updatePermissionStmts = {
    read: "UPDATE ALBUM_USERS SET READ_PERMISSION = ? WHERE ALBUM_ID = ? AND USER_ID = ?",
    write: "UPDATE ALBUM_USERS SET READ_PERMISSION = ? WHERE ALBUM_ID = ? AND USER_ID = ?",
};

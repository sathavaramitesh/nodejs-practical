import * as My from "jm-ez-mysql";
import { Tables, UserTable } from "../../config/tables";

export class AuthUtils {
    /** should be use for signup users
     * 
     * @param userDetail Json
     */
    public async createUser(userDetail: Json) {
        const newUser = await My.insert(`${Tables.USER}`, userDetail);
        return newUser.insertId;
    }


    /** should be used for get user detail
     * 
     * @param email string
     */
    public async getUserDetailByEmail(email: string) {
        const result = await My.first(Tables.USER,['id, name, email, password, createdAt, updatedAt'],
            `email = ?`, [email],
        );
        return result;
    }


    public async getUserDataById(id: number) {
        const selectedFields =['id, name, email'];
        const result = await My.first(
            Tables.USER, selectedFields, `id = ?`, [id],
        );
        return result;
    }
}

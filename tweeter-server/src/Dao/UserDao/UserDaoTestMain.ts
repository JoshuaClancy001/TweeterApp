import {UserDynamoDao} from "./UserDynamoDao";
import {UserDto} from "tweeter-shared";
import {AuthDao} from "../AuthDao/AuthDao";
import {AuthTokenDto} from "tweeter-shared/dist/model/dto/AuthTokenDto";
import {AuthDynamoDao} from "../AuthDao/AuthDynamoDao";

const UserDao = new UserDynamoDao();
const AuthDao = new AuthDynamoDao();

let user: UserDto = {firstName: "Josh", lastName: "Clancy", alias: "@jjc", imageUrl: "https://www.google.com"};
let auth: AuthTokenDto = {token: "1234", timestamp: Date.now()};

async function createUser() {
    await UserDao.createUser(user, "password");
}

async function readUser(alias: string, password: string) {
    return await UserDao.read(alias, password);
}

async function createAuth() {
    await AuthDao.createAuth(auth, user.alias);
}

async function readAuth(alias: string, password: string) {
    return await AuthDao.readAuth(auth);
}

async function main() {
    await createUser();
    console.log(await readUser("@jjc", "wrong_password"));
    console.log(await readUser("@jjc", "password"));
    await createAuth();
    console.log(await readAuth("@jjc", "password"));
}

main().then(r => console.log("done"));
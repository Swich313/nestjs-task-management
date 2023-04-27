import {DataSource, Repository} from "typeorm";
import {User} from "./user.entity";
import {ConflictException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        console.log({salt});
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log({hashedPassword});

        const user = this.create({
            username,
            password: hashedPassword
        });

    try {
        await this.save(user);
        return `${username} was signed up successfully`;
    } catch (err) {
        if (err.code === '23505') {   //duplicate username (23505 - Postgres code)
            throw new ConflictException('Username already exists!')
        } else {
            throw new InternalServerErrorException();
        }
    }
    }
}
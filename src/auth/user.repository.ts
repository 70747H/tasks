import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthCeredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp({ username, password }: AuthCeredentialsDto): Promise<void>{
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        await user.save();
    }

    async validateUserPassword({ username, password }: AuthCeredentialsDto): Promise<string>{
        const user = await this.findOne({ username });
        if(user && await user.validatePassword(password)){
            return user.username;
        }else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}
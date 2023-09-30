import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
 
  findOne(id: number) {
    
    if (!id) {
      return null;
    }

    const query = this.repo.findOne({ where: {id: id} });
    return query;
  }

  find(email: string) {
    return this.repo.find({where: {email: email}});
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const usr = await this.repo.findOne({where: {id: id}});
    if (!usr) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(usr);
    return true;
  }
}

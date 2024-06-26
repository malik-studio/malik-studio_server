import { Injectable } from "@nestjs/common";
import { CreateEmailDto } from "./dto/create-email.dto";
import { UpdateEmailDto } from "./dto/update-email.dto";
import { ConfigService } from "@nestjs/config";
import { Email } from "./entities/email.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EmailsService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async create(createEmailDto: CreateEmailDto) {
    const email = new Email();
    email.title = createEmailDto.title;
    await this.emailRepository.save(email);
    return "This action adds a new email";
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    console.log(JSON.stringify(updateEmailDto));
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}

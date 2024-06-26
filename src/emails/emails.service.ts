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
    return await this.emailRepository.save(email);
  }

  async findAll() {
    return await this.emailRepository.find();
  }

  async findOne(id: number) {
    return await this.emailRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateEmailDto: UpdateEmailDto) {
    return await this.emailRepository.update({ id }, updateEmailDto);
  }

  async remove(id: number) {
    const email = this.emailRepository.findOneByOrFail({ id });
    const emails = [];
    emails.push(email);
    return await this.emailRepository.remove(emails);
  }
}

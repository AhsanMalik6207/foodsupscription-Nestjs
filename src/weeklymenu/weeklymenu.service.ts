import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeeklymenuRepository } from './weeklymenu.repository';
import { UploadWeeklymenuDto } from './dto/UploadWeeklymenu.dto';
import { UpdateWeeklymenuDto } from './dto/UpdateWeeklymenu.dto';

@Injectable()
export class WeeklymenuService {
  constructor(@InjectRepository(WeeklymenuRepository) private weeklymenuRepository: WeeklymenuRepository) { }

  getWeeklymenu(id: number) {
    if (!id) {
      return null
    }
    return this.weeklymenuRepository.findOne(id);
  }
  async getAllWeeklymenus() {
    return await this.weeklymenuRepository.find();
  }
  async createNewWeeklymenu(weeklymenu: UploadWeeklymenuDto) {
    return await this.weeklymenuRepository.save(weeklymenu)
  }

  async updateWeeklymenu(id: number, weeklymenu: UpdateWeeklymenuDto){
      const update = await this.getWeeklymenu(id);
      if (weeklymenu.day) {
          update.day = weeklymenu.day;
      }
      if (weeklymenu.date) {
          update.date = weeklymenu.date;
      }
      if (weeklymenu.items) {
        update.items = weeklymenu.items;
      }
      return await this.weeklymenuRepository.save(update);
  }
  async deleteWeeklymenu(id: number){
      const weeklymenu = await this.getWeeklymenu(id);
      if(!weeklymenu){
          throw new NotFoundException('Weeklymenu not found')
      }
      return this.weeklymenuRepository.remove(weeklymenu)
  }
}
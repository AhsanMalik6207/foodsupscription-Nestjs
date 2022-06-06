import { EntityRepository, Repository } from "typeorm";
import { Weeklymenu } from "./weeklymenu.entity";

@EntityRepository(Weeklymenu)
export class WeeklymenuRepository extends Repository<Weeklymenu>{
}
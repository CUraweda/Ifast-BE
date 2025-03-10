import BaseService from "../../base/service.base.js";
import prisma from '../config/prisma.db.js';

class DivisionService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    const data = await this.db.division.findMany({ ...q });

    if (query.paginate) {
      const countData = await this.db.division.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };

  findById = async (id) => {
    const data = await this.db.division.findUnique({ where: { id } });
    return data;
  };

  create = async (payload) => {
    const data = await this.db.division.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.division.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.division.delete({ where: { id } });
    return data;
  };
}

export default DivisionService;  

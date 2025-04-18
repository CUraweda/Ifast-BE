import BaseService from "../../base/service.base.js";
import prisma from '../../config/prisma.db.js';

class typeSubmissionService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    const data = await this.db.typeSubmission.findMany({ ...q });

    if (query.paginate) {
      const countData = await this.db.typeSubmission.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };

  findById = async (id) => {
    const data = await this.db.typeSubmission.findUnique({ where: { id } });
    return data;
  };

  create = async (payload) => {
    const data = await this.db.typeSubmission.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.typeSubmission.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.typeSubmission.delete({ where: { id } });
    return data;
  };
}

export default typeSubmissionService;  

import BaseService from "../../base/service.base.js";
import prisma from '../../config/prisma.db.js';

class categorySubmissionService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    const data = await this.db.categorySubmission.findMany({ ...q });

    if (query.paginate) {
      const countData = await this.db.categorySubmission.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };

  findById = async (id) => {
    const data = await this.db.categorySubmission.findUnique({ where: { id } });
    return data;
  };

  create = async (payload) => {
    const data = await this.db.categorySubmission.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.categorySubmission.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.categorySubmission.delete({ where: { id } });
    return data;
  };
}

export default categorySubmissionService;  

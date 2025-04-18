import BaseService from "../../base/service.base.js";
import prisma from "../../config/prisma.db.js";

class SubmissionDetailService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    const data = await this.db.submissionDetail.findMany({ ...q });

    if (query.paginate) {
      const countData = await this.db.submissionDetail.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };

  findById = async (id) => {
    const data = await this.db.submissionDetail.findUnique({ where: { id } });
    return data;
  };


  create = async (payload, files) => {
    if (files && files.evidence && files.evidence.length > 0) {
      payload.evidence = files.evidence[0].path;
    }
    const data = await this.db.submissionDetail.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.submissionDetail.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.submissionDetail.delete({ where: { id } });
    return data;
  };
}

export default SubmissionDetailService;  

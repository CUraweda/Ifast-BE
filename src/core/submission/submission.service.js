import BaseService from "../../base/service.base.js";
import prisma from "../../config/prisma.db.js";

class SubmissionService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    // Sertakan relasi approval sehingga status approval ikut diambil
    q.include = { approval: true };
    const data = await this.db.submission.findMany({ ...q });
    
    if (query.paginate) {
      const countData = await this.db.submission.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };
  
  findById = async (id) => {
    return await this.db.submission.findUnique({
      where: { id },
      include: { approval: true },
    });
  };
  

  create = async (payload) => {
    // Pastikan payload sudah mengandung userId dari controller
    return await this.db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: payload.userId },
        include: { hirarky: { include: { levels: true } } },
      });
    
      const submission = await tx.submission.create({
        data: payload,
      });

      const type = await tx.typeSubmission.findFirst({
        where: {id: payload.typeId}
      })
      if (!type) throw new NotFound('type tidak ditemukan');

      // Jika user memiliki konfigurasi hirarky, buat approval otomatis untuk tiap level
      if (user && user.hirarky && user.hirarky.levels.length) {
     
        for (const level of user.hirarky.levels) {
          await tx.approval.create({
            data: {
              submissionId: submission.id,
              sequence: level.sequence,
              requiredRole: level.requiredRole,
              status: "PENDING",
              approverId: level.approverId,
            },
          });
        }
      }
      return submission;
    });
  };

  update = async (id, payload) => {
    return await this.db.submission.update({ where: { id }, data: payload });
  };

  delete = async (id) => {
    return await this.db.submission.delete({ where: { id } });
  };
}

export default SubmissionService;

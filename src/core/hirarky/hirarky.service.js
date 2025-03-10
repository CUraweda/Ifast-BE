import BaseService from "../../base/service.base.js";
import prisma from "../../config/prisma.db.js";

class hirarkyService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    q.include = { levels: true };
    const data = await this.db.hirarky.findMany({ ...q });
    if (query.paginate) {
      const countData = await this.db.hirarky.count({ where: q.where });
      return this.paginate(data, countData, q);
    }
    return data;
  };

  findById = async (id) =>
    await this.db.hirarky.findUnique({
      where: { id },
      include: { levels: true },
    });

  create = async (payload) => {
    const { levels, ...rest } = payload;
    const data = await this.db.hirarky.create({
      data: {
        ...rest,
        levels: { create: levels }
      },
      include: { levels: true },
    });
    return data;
  };

  update = async (id, payload) => {
    const { levels, ...rest } = payload;
    const data = await this.db.hirarky.update({
      where: { id },
      data: {
        ...rest,
        ...(levels && {
          levels: {
            deleteMany: {},
            create: levels,
          },
        }),
      },
      include: { levels: true },
    });
    return data;
  };

  delete = async (id) =>
    await this.db.hirarky.delete({ where: { id } });
}

export default hirarkyService;

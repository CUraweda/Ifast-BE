import BaseService from '../../base/service.base.js';
import prisma from '../../config/prisma.db.js';

class UserService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    q.include = {
      roles: true,
      hirarky: { include: { levels: true } },
      division: true
    };
    const data = await this.db.user.findMany({ ...q });

    if (query.paginate) {
      const countData = await this.db.user.count({ where: q.where });
      const paginated = this.paginate(data, countData, q);
      paginated.items = paginated.items.map((item) =>
        this.exclude(item, ['password', 'apiToken', 'isVerified'])
      );
      return paginated;
    }
    return data;
  };

  findById = async (id) => {
    const data = await this.db.user.findUnique({
      where: { id },
      include: {
        roles: { include: { permission: true } },
        hirarky: { include: { levels: true } },
       
      },  
    });
    if (!data) throw new NotFound('User tidak ditemukan');
    return this.exclude(data, ['password', 'apiToken', 'isVerified']);
  };

  create = async (payload) => {
    const data = await this.db.user.create({ data: payload });
    return data;
  };

  update = async (id, payload) => {
    const data = await this.db.user.update({ where: { id }, data: payload });
    return data;
  };

  delete = async (id) => {
    const data = await this.db.user.delete({ where: { id } });
    return data;
  };

  findByPhone = async (phone) => {
    return await this.db.user.findFirst({ where: { phoneWA: phone } });
  };
  addRoles = async (id, roleIds) =>
    await this.db.user.update({
      where: { id },
      data: { roles: { connect: roleIds.map((r) => ({ id: r })) } },
    });

  removeRoles = async (id, roleIds) =>
    await this.db.user.update({
      where: { id },
      data: { roles: { disconnect: roleIds.map((r) => ({ id: r })) } },
    });

  assignHirarky = async (id, hirarkyId) =>
    await this.db.user.update({
      where: { id },
      data: { hirarky: { connect: { id: hirarkyId } } },
    });

  removeHirarky = async (id) =>
    await this.db.user.update({
      where: { id },
      data: { hirarky: { disconnect: true } },
    });
}

export default UserService;

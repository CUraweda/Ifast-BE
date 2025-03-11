import BaseService from '../../base/service.base.js';
import { Forbidden, NotFound } from '../../exceptions/catch.execption.js';
import { compare, hash } from '../../helpers/bcrypt.helper.js';
import { generateAccessToken } from '../../helpers/jwt.helper.js';
import prisma from '../../config/prisma.db.js';
import crypto from 'crypto';

class AuthenticationService extends BaseService {
  constructor() {
    super(prisma);
  }

  login = async (payload) => {
    const user = await this.db.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) throw new NotFound('Akun tidak ditemukan');

    const pwValid = await compare(payload.password, user.password);
    if (!pwValid) throw new BadRequest('Password tidak cocok');

    const access_token = await generateAccessToken(user);

    return { user: this.exclude(user, ['password', 'apiToken', 'isVerified']), token: access_token };
  };

  register = async (payload) => {
    const { email, password, divisionId, roles, hirarkyId, ...others } =
      payload;

    const existing = await this.db.user.findUnique({ where: { email } });
    if (existing) throw new Forbidden('Akun dengan email telah digunakan');

    const division = await this.db.division.findUnique({
      where: { id: divisionId },
    });
    if (!division) throw new NotFound('Division tidak ditemukan');

   const data = await this.db.user.create({
    data: {
      email,
      password: await hash(password, 10),
      division: { connect: { id: divisionId } },
      roles: roles ? { connect: roles.map(id => ({ id })) } : undefined,
      hirarky: hirarkyId ? { connect: { id: hirarkyId } } : undefined,
      ...others,
    },
  });

    return {
      data,
      message: 'Akun berhasil terdaftar! Silahkan verifikasi akun anda',
    };
  };

  generateToken = async (id) => {
    const userData = await prisma.user.findFirst({
      where: { id },
    });
    if (!userData.apiToken) {
      const apiToken = crypto.randomBytes(32).toString('hex');
      const user = await prisma.user.update({
        where: { id },
        data: { apiToken },
      });
      return { apiToken: user.apiToken };
    } else return { apiToken: userData.apiToken };
  };
}

export default AuthenticationService;

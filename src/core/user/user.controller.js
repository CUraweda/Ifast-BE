import BaseController from "../../base/controller.base.js";
import { NotFound } from "../../exceptions/catch.execption.js";
import UserService from "./user.service.js";

class UserController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new UserService();
  }

  findAll = this.wrapper(async (req, res) => {
    const data = await this.#service.findAll(req.query);
    return this.ok(res, data, "Banyak User berhasil didapatkan");
  });

  findById = this.wrapper(async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    if (!data) throw new NotFound("User tidak ditemukan");

    return this.ok(res, data, "User berhasil didapatkan");
  });

  create = this.wrapper(async (req, res) => {
    const data = await this.#service.create(req.body);
    return this.created(res, data, "User berhasil dibuat");
  });

  update = this.wrapper(async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    return this.ok(res, data, "User berhasil diperbarui");
  });

  delete = this.wrapper(async (req, res) => {
    const data = await this.#service.delete(req.params.id);
    return this.noContent(res, "User berhasil dihapus");
  });
  addRoles = this.wrapper(async (req, res) => {
    const data = await this.#service.addRoles(req.params.id, req.body.roles);
    return this.ok(res, data, "Roles berhasil ditambahkan ke user");
  });

  removeRoles = this.wrapper(async (req, res) => {
    const data = await this.#service.removeRoles(req.params.id, req.body.roles);
    return this.ok(res, data, "Roles berhasil dihapus dari user");
  });

  updateHirarky = this.wrapper(async (req, res) => {
    const data = await this.#service.assignHirarky(req.params.id, req.body.hirarkyId);
    return this.ok(res, data, "Hirarky berhasil diassign ke user");
  });

  removeHirarky = this.wrapper(async (req, res) => {
    const data = await this.#service.removeHirarky(req.params.id);
    return this.ok(res, data, "Hirarky berhasil dihapus dari user");
  });
}

export default UserController;

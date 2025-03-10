import BaseController from "../../base/controller.base.js";
import { NotFound } from "../../exceptions/catch.execption.js";
import hirarkyLevelService from "./hirarkylevel.service.js";

class hirarkyLevelController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new hirarkyLevelService();
  }

  findAll = this.wrapper(async (req, res) => {
    const data = await this.#service.findAll(req.query);
    return this.ok(res, data, "Banyak hirarkyLevel berhasil didapatkan");
  });

  findById = this.wrapper(async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    if (!data) throw new NotFound("hirarkyLevel tidak ditemukan");

    return this.ok(res, data, "hirarkyLevel berhasil didapatkan");
  });

  create = this.wrapper(async (req, res) => {
    const data = await this.#service.create(req.body);
    return this.created(res, data, "hirarkyLevel berhasil dibuat");
  });

  update = this.wrapper(async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    return this.ok(res, data, "hirarkyLevel berhasil diperbarui");
  });

  delete = this.wrapper(async (req, res) => {
    const data = await this.#service.delete(req.params.id);
    return this.noContent(res, "hirarkyLevel berhasil dihapus");
  });
}

export default hirarkyLevelController;

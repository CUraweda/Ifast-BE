import BaseController from "../../base/controller.base.js";
import { NotFound } from "../../exceptions/catch.execption.js";
import hirarkyService from "./hirarky.service.js";

class hirarkyController extends BaseController {
  #service = new hirarkyService();

  findAll = this.wrapper(async (req, res) => {
    const data = await this.#service.findAll(req.query);
    return this.ok(res, data, "Daftar konfigurasi hirarky berhasil didapatkan");
  });

  findById = this.wrapper(async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    if (!data) throw new NotFound("Hirarky tidak ditemukan");
    return this.ok(res, data, "Konfigurasi hirarky berhasil didapatkan");
  });

  create = this.wrapper(async (req, res) => {
    const data = await this.#service.create(req.body);
    return this.created(res, data, "Konfigurasi hirarky berhasil dibuat");
  });

  update = this.wrapper(async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    return this.ok(res, data, "Konfigurasi hirarky berhasil diperbarui");
  });

  delete = this.wrapper(async (req, res) => {
    await this.#service.delete(req.params.id);
    return this.noContent(res, "Konfigurasi hirarky berhasil dihapus");
  });
}

export default hirarkyController;

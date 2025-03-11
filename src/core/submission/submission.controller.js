import BaseController from "../../base/controller.base.js";
import { NotFound } from "../../exceptions/catch.execption.js";
import SubmissionService from "./submission.service.js";

class SubmissionController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new SubmissionService();
  }

  findAll = this.wrapper(async (req, res) => {
    const data = await this.#service.findAll(req.query);
    return this.ok(res, data, "Banyak Submission berhasil didapatkan");
  });

  findById = this.wrapper(async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    if (!data) throw new NotFound("Submission tidak ditemukan");

    return this.ok(res, data, "Submission berhasil didapatkan");
  });

  create = this.wrapper(async (req, res) => {
    const payload = { ...req.body, userId: req.user.id };
    const data = await this.#service.create(payload);
    return this.created(res, data, "Submission berhasil dibuat");
  });

  update = this.wrapper(async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    return this.ok(res, data, "Submission berhasil diperbarui");
  });

  delete = this.wrapper(async (req, res) => {
    const data = await this.#service.delete(req.params.id);
    return this.noContent(res, "Submission berhasil dihapus");
  });
}

export default SubmissionController;

import BaseController from "../../base/controller.base.js";
import { NotFound } from "../../exceptions/catch.execption.js";
import SubmissionDetailService from "./submissiondetail.service.js";

class SubmissionDetailController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new SubmissionDetailService();
  }

  findAll = this.wrapper(async (req, res) => {
    const data = await this.#service.findAll(req.query);
    return this.ok(res, data, "Banyak SubmissionDetail berhasil didapatkan");
  });

  findById = this.wrapper(async (req, res) => {
    const data = await this.#service.findById(req.params.id);
    if (!data) throw new NotFound("SubmissionDetail tidak ditemukan");

    return this.ok(res, data, "SubmissionDetail berhasil didapatkan");
  });

  create = this.wrapper(async (req, res) => {
    const data = await this.#service.create(req.body, req.files);
    return this.created(res, data, "SubmissionDetail berhasil dibuat");
  });

  update = this.wrapper(async (req, res) => {
    const data = await this.#service.update(req.params.id, req.body);
    return this.ok(res, data, "SubmissionDetail berhasil diperbarui");
  });

  delete = this.wrapper(async (req, res) => {
    const data = await this.#service.delete(req.params.id);
    return this.noContent(res, "SubmissionDetail berhasil dihapus");
  });
}

export default SubmissionDetailController;

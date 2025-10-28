"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAppointments = exports.createAppointment = void 0;
const appointment_services_1 = __importDefault(require("../services/appointment.services"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield appointment_services_1.default.create(req.body);
        res.status(201).json({ success: true, message: "Appointment created successfully", data });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.createAppointment = createAppointment;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield appointment_services_1.default.getAll();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield appointment_services_1.default.getById(req.params.id);
        if (!data)
            return res.status(404).json({ success: false, message: "Appointment not found" });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getAppointmentById = getAppointmentById;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield appointment_services_1.default.updateById(req.params.id, req.body);
        if (!data)
            return res.status(404).json({ success: false, message: "Appointment not found" });
        res.status(200).json({ success: true, message: "Appointment updated successfully", data });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield appointment_services_1.default.deleteById(req.params.id);
        if (!data)
            return res.status(404).json({ success: false, message: "Appointment not found" });
        res.status(200).json({ success: true, message: "Appointment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.deleteAppointment = deleteAppointment;

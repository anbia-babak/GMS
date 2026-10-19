import {
    getIncomeReport as getIncomeReportService,
    getPaymentReport as getPaymentReportService,
    getMembershipReport as getMembershipReportService,
    getMemberReport as getMemberReportService
} from "../services/reportService.js";

function sendError(res, error) {
    return res.status(error.status || 500).json({
        message: error.status ? error.message : "Unable to generate report."
    });
}

export async function getIncomeReport(req, res) {
    try {
        res.status(200).json(await getIncomeReportService(req.query));
    } catch (error) {
        sendError(res, error);
    }
}

export async function getPaymentReport(req, res) {
    try {
        res.status(200).json(await getPaymentReportService(req.query));
    } catch (error) {
        sendError(res, error);
    }
}

export async function getMembershipReport(req, res) {
    try {
        res.status(200).json(await getMembershipReportService());
    } catch (error) {
        sendError(res, error);
    }
}

export async function getMemberReport(req, res) {
    try {
        res.status(200).json(await getMemberReportService());
    } catch (error) {
        sendError(res, error);
    }
}

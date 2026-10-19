import {
    getSettings as getSettingsService,
    updateSettings as updateSettingsService
} from "../services/settingsService.js";

function sendError(res, error) {
    return res.status(error.status || 500).json({
        message: error.status ? error.message : "Unable to process gym settings."
    });
}

export async function getSettings(req, res) {
    try {
        res.status(200).json(await getSettingsService());
    } catch (error) {
        sendError(res, error);
    }
}

export async function updateSettings(req, res) {
    try {
        res.status(200).json(await updateSettingsService(req.body));
    } catch (error) {
        sendError(res, error);
    }
}

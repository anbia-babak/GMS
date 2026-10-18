import { addPayment as addPaymentService } from "../services/paymentService.js";
import { getAllPayments as getAllPaymentsService } from "../services/paymentService.js";
import { getSpecificPaymentDetails as getSpecificPaymentDetailsService  } from "../services/paymentService.js";
import { editSpecificPayment as editSpecificPaymentService } from "../services/paymentService.js";
import { getPaymentSummary as getPaymentSummaryService } from "../services/paymentService.js";
import { deleteSpecificPayment as deleteSpecificPaymentService } from "../services/paymentService.js";

export async function addPayment(req,res) {
    
    const paymentData = req.body;
    try {
        const addedPayment = await addPaymentService(paymentData);
        res.status(201).json(addedPayment);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export async function getAllPayments(req,res) {
    
    const { search, status, plan_id } = req.query;

    if(search !== undefined && typeof search !== "string"){
        return res.status(400).json({
            message: "Search must be a string."
        });
    }

    const allowedStatuses = ["Active", "Expired", "Expiring Soon"];
    if(status !== undefined && !allowedStatuses.includes(status)){
        return res.status(400).json({
            message: "Invalid status. Use Active, Expired, or Expiring Soon."
        });
    }

    if(plan_id !== undefined){
        const parsedPlan = Number(plan_id);
        if(!Number.isInteger(parsedPlan) || parsedPlan <= 0){
            return res.status(400).json({
                message: "Plan ID must be a positive integer."
            });
        }
    }


    try{
        const allPayments = await getAllPaymentsService(
            search?.trim() || undefined,
            status, plan_id);

        res.status(200).json(allPayments);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};


export async function getSpecificPaymentDetail(req,res) {
    
    const paymentId = Number(req.params.paymentId);
    if(!Number.isInteger(paymentId) || paymentId <= 0){
        return res.status(400).json({
            message: "Payment ID must be a positive integer."
        });
    }

    try {
        const specificPayment = await getSpecificPaymentDetailsService(paymentId);
        res.status(200).json(specificPayment);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};


export async function editSpecificPayment(req,res) {
    
    const paymentId = req.params.paymentId;
    const newData = req.body;
    
    if(!Number.isInteger(paymentId) || paymentId <= 0){
    return res.status(400).json({
        message: "Payment ID must be a positive integer."
    })}
    try {
        const editedPayment = await editSpecificPaymentService(paymentId, newData);
        res.status(201).json(editedPayment);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


export async function getPaymentSummary(req,res) {
    
    try{
    const result = await getPaymentSummaryService();
    res.status(200).json(result);
    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }
};


export async function deleteSpecificPayment(req,res) {
    
    const paymentId = Number(req.params.paymentId);
    try {
        
        if(!Number.isInteger(paymentId) || paymentId <= 0){
            return res.status(400).json({
                message: "Invalid payment ID."
            });
        }

        const deletedPayment = await deleteSpecificPaymentService(paymentId);
        res.status(201).json({
            message: "Payment deleted successfully.",
            payment: deletedPayment,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
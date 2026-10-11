import { parse } from "dotenv";
import { addMembership as addMembershipService} from "../services/membershipService.js";
import { getSpecificMemberCMemberships as getSpecificMemberCMembershipsService} from "../services/membershipService.js";
import { editSpecificMembership as editSpecificMembershipService } from "../services/membershipService.js";
import { getAllMemberships as getAllMembershipsService} from "../services/membershipService.js";
import { getSpecificMembership as getSpecificMembershipService} from "../services/membershipService.js";
import { renewSpecificMembership as renewSpecificMembershipService } from "../services/membershipService.js";


export async function addMembership(req,res) {
    
    const membershipData = req.body;

    try{
        const newMembership = await addMembershipService(membershipData);
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
};


export async function getSpecificMemberCMemberships(req,res) {
    
    const memberId = req.params.memberId;

    try{
        const memberCurrentMembership = await getSpecificMemberCMembershipsService(memberId);
        res.status(200).json(memberCurrentMembership);
    } catch (error){
        res.status(500).json({
            message: error.message
        });
    };
};


export async function editSpecificMembership (req,res){

    const membershipId = req.params.membershipId;
    const newData = req.body;

    try{
        const membershipEdited = await editSpecificMembershipService(membershipId, newData);
        res.status(200).json(membershipEdited);
    } catch (error){
        res.status(error.status || 500).json({
            message: error.message
        });
    };
};


export async function getAllMemberships(req,res) {
    
    const { search, status, plan_id } = req.query; 

    try {
        const allMemberships = await getAllMembershipsService(
            search, status, plan_id
        );
        res.status(200).json(allMemberships);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    };
};


export async function getSpecificMembership(req,res){

    const membershipId = req.params.membershipId;
    try {
        const specificMembership = await getSpecificMembershipService(membershipId);
        res.status(200).json(specificMembership);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    };
}



export async function renewSpecificMembership(req,res) {

    // Turning Membership ID into a Number Because it comes from req.params => SO it's a STRING!
    const membershipId = Number(req.params.membershipId);
    const {newDate} = req.body;
    // Turning Plan ID into a Number Because it comes from req.body => SO it's a STRING!
    const planId = Number(req.body.planId);

    try {
        if (!Number.isInteger(membershipId) || membershipId <= 0){
            return res.status(400).json({
            message: "Invalid Membership ID"
            })
        }


        if (!Number.isInteger(planId) || planId <= 0){
            return res.status(400).json({
            message: "Invalid Plan ID"
            })
        }

        if(!newDate){
           return res.status(400).json({
            message: "New date is required"
            }) 
        }
        console.log(newDate);

        // We use this Regular Expressions to validate the date's format (/^\d{2}-\d{2}-\d{4}$/) => DD-MM-YYYY:
        const regex = /^\d{4}-\d{2}-\d{2}$/
        if(!(regex.test(newDate))){
            return res.status(400).json({
            message: "Invalid date format. Use YYYY-MM-DD"
            }) 
        }

        // Checking and validating the calender date itself:
        // split("-") separates "15-10-2026" into three pieces
        // map(Number) converts those pieces into numbers
        // Date.UTC() creates a date using UTC, avoiding local-time-zone differencess
        const [year, month, day] = newDate.split("-").map(Number);
        const parsedDate = new Date(Date.UTC(year, month - 1, day));

        if(
            parsedDate.getUTCFullYear() !== year ||
            parsedDate.getUTCMonth() !== month - 1 ||
            parsedDate.getUTCDate() !== day
        ){
            return  res.status(400).json({
            message: "Invalid calender date"
            }) 
        }

        // Rejecting past dates; Renewal date must be today or a future date!
        const today = new Date().toISOString().split("T")[0];
        if(newDate < today){
            return  res.status(400).json({
            message: "The renewal date cannot be in the past"
            }) 
        }
        
        const renewedMembership = await renewSpecificMembershipService(membershipId, newDate, planId);
        res.status(200).json(renewedMembership);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    };
};
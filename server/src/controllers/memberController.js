import { getMembers as getMembersService } from "../services/memberService.js";
import { addMember as addMemberService } from "../services/memberService.js";
import { getSpecificMember as getSpecificMemberService } from "../services/memberService.js";
import { editSpecificMember as editSpecificMemberService } from "../services/memberService.js";
import { deactivateSpecificMember as deactivateSpecificMemberService } from "../services/memberService.js";

export async function getMembers(req,res) {
    try{
        const members = await getMembersService();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };    
};

export async function addMember(req,res) {
    console.log(req.body);
    
    try{
        const newMember = await addMemberService(req.body);
        res.status(200).json(newMember);
    }catch (error){
        res.status(500).json({
            message: error.message
        });
    };
};

export async function getSpecificMember(req,res) {

    console.log(req.params);
    const memberId = req.params.id;
    try{
        const foundMember = await getSpecificMemberService(memberId);
        res.status(200).json(foundMember);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    };
};


export async function editSpecificMember(req,res) {
        
    const memberId = req.params.id;
    const newData = req.body;
    try{
        const updatedMember = await editSpecificMemberService(memberId, newData);
        res.status(200).json(updatedMember);
    } catch (error){
        res.status(500).json({
            message: error.message
        });
    };
};

export async function deactivateSpecificMember(req,res) {
    const memberId = req.params.id;
    try{
        const updatedMember = await deactivateSpecificMemberService(memberId);
        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
};
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (
    req: Request,
    res: Response
): Promise<void> =>{
    const {projectId} = req.query;
    try{
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include:{
                author: true,
                assignee: true,
                comments:true,
                attachments:true,
                parent:{
                    select: {
                        title:true,
                        priority:true,
                        status:true
                    }
                }
                
            }
        })
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving tasks: ${error.message}`})
    }
    
};

export const createTask = async (
    req: Request,
    res: Response
): Promise<void> =>{
    const {
        parentTicketId,
        projectId,  
        title,                         
        description,      
        category,         
        type ,            
        subtype,          
        authorUserId,         
        department,       
        assignedUserId,      
        status,           
        priority,         
        startDate,       
        dueDate,       
        customer,        
        etr_id,          
        alias_etr_id,    
        eng_family,      
        eng_family_model, 
        label  
    } = req.body;
    try{
        const newTask = await prisma.task.create({
            data: {
                parentTicketId,
                projectId,  
                title,                         
                description,      
                category,         
                type ,            
                subtype,          
                authorUserId,         
                department,       
                assignedUserId,      
                status,           
                priority,         
                startDate,       
                dueDate,       
                customer,        
                etr_id,          
                alias_etr_id,    
                eng_family,      
                eng_family_model, 
                label
            }
        })
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({message: `Error creating task: ${error.message}`})
    }
    
};

export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> =>{
    const {taskId} = req.params;
    const {status} = req.body;
    try{
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data:{
                status: status
            }
        })
        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({message: `Error updating task: ${error.message}`})
    }
    
};
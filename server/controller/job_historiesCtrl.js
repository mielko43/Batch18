import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const jhistory = await req.context.models.job_history.findAll()
        return res.send(jhistory)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req,res)=>{
    try {
        const jhistory = await req.context.models.job_history.findOne({
            where:{start_date : req.params.id}
        })
        return res.send(jhistory)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    try {
        const jhistory = await req.context.models.job_history.create({
            employee_id : req.body.employee_id,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            job_id : req.body.job_id,
            department_id : req.body.department_id
        })
        return res.send(jhistory)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req,res)=>{
    console.log();
    try {
        const jhistory = await req.context.models.job_history.update({
            end_date : req.body.end_date,
            job_id : req.body.job_id,
            department_id : req.body.department_id
        },{ returning : true , where:{start_date : req.params.id}})
        return res.send(jhistory)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const jhistory = await req.context.models.job_history.destroy({
            where:{start_date : req.params.id}
        })
        return res.send('delete '+ jhistory +' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT * from job_history where start_date = :sdateId',
        {replacements : {sdateId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleted,
    querySQL
}
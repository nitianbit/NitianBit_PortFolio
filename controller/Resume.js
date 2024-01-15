const express = require('express')
const Resume = require('../models/Resume')

const Router = express.Router()

Router.get('/', async (req, res) => {
    const data = await Resume.find({})
    res.send(data)
})

    .put('/addBasicInfo', async (req, res) => {
        req = req.body
        const sectionName = req.sectionName
        const experience = req.experience
        const projects = req.projects
        const about = req.about
        const description_header = req.description_header
        const image = req.image
        const description = req.description
        const skills = req.skills

        if (!sectionName || !experience || !projects || !about || !description_header || !image || !description) {
            res.json(0)
        }

        const resumeBasicInfo = {
            sectionName,
            description,
            description_header,
            image,
            section_name: {
                experience,
                projects,
                about,
                skills
            }
        }
        try {
            await Resume.updateOne({}, { $set: { resumeBasicInfo: resumeBasicInfo } })
            res.json(1)
        }
        catch (err) {
            console.log("Error: ", err)
            res.json(0)
        }
    })

    .put('/addExperience', async (req, res) => {
        req = req.body
        const technologies = req.technologies
        const mainTech = req.mainTech
        const company = req.company
        const title = req.title
        const years = req.years
        
        if (!technologies || !mainTech || !company || !title) {
           res.json(0)
            
        }

        const resumeExperience = {
            company,
            title,
            years,
            technologies,
            mainTech
        }
        console.log(resumeExperience)
        const data = await Resume.find()

        if(data.length ==0 )
        {
            const resume = new Resume({})
            resume.save() 
        }
      
        try {
            const users = await Resume.updateOne({}, { $push: { resumeExperience: resumeExperience } })
            res.json(1)
        }
        catch (err) {
            console.log("Error on Updating Details: ", err)
        }
    
    })

    .put('/addProject', async (req, res) => {
        req = req.body
        const images = req.images
        const startDate = req.startDate
        const endDate = req.endDate
        const title = req.title
        const link = req.link
        const githubLink = req.githubLink
        const technologies= {
            skillClass: req.skillClass,
            name: req.name
        }
        const description = req.description

        const resumeProjects = {
            images,
            startDate,
            endDate,
            title,
            link,
            githubLink,
            technologies,
            description
        }
        if(startDate > endDate) res.json(0)
        const data = Resume.find()
        if(data.length ==0 )
        {
            const resume = new Resume({})
            resume.save() 
        }
        try {
        await Resume.updateOne({}, { $push: { resumeProjects: resumeProjects }})
        res.json(1) 
        }
        catch(err) {
            console.log("Error on Updating Details: ", err)
            res.json(0)
        }
    })

    .put('/addSharedSkills', async (req, res) => {
        req = req.body
        const skillClass = req.skillClass
        const name = req.name

        const sharedSkills = {
            icons: {
                skillClass,
                name
            }
        }
        console.log(sharedSkills)
        const data = Resume.find()
        if(data.length ==0 )
        {
            const resume = new Resume({})
            resume.save() 
        }
        try {
            await Resume.updateOne({}, { $push: { sharedSkills: sharedSkills } })
            res.json(1)

        }
        catch (err) { 
            res.json(0)
        }
    })

module.exports = Router
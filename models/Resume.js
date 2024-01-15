const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Section Name Schema
const sectionNameSchema = new Schema({
    about:{type:String},
    experience: {type: String},
    projects: {type: String},
    skills: {type:String}
})

const skillsSchema = new Schema({
    skillClass: {type:String},
    name: {type: String}
})

const skillPSchema = new Schema({
    skillClass: [{type:String}],
    name:[{type:String}]
})

const resumeExperienceSchmea = new Schema({
    company: {type: String},
    title: {type: String},
    years: {type: String},
    technologies: [{ type: String}],
    mainTech: [{type: String}]   
})

const resumeProjectsSchema = new Schema({
    images:[{type: String}],
    startDate: {type:Date},
    endDate: {type: Date},
    title: {type: String},
    link: {type: String},
    githubLink: {type: String},
    description: {type: String},
    technologies: skillPSchema
})



const iconsSchema = new Schema({
    icons: skillsSchema
})

const resumeBasicInfoSchema = new Schema({
    sectionName: {type: String},
    description_header: {type: String},
    image: {type: String},
    description: {type: String},
    section_name: sectionNameSchema
})

const resumeSchema = new Schema({
    resumeBasicInfo: resumeBasicInfoSchema,
    resumeExperience: [resumeExperienceSchmea],
    resumeProjects: [resumeProjectsSchema],
    sharedSkills: [iconsSchema]
})

const resume = mongoose.model('Resume',resumeSchema)
module.exports = resume
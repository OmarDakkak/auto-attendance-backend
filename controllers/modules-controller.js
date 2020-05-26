const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_MODULES = [
    {
        id:'m1',
        title:'Méthodes numériques pour l’ingénieur et Analyse des Données',
        description:'Un module nécessaire pour la formation d\'un ingénieur' ,
        imageUrl: 'https://previews.123rf.com/images/9george/9george1608/9george160800366/61775862-math-lin%C3%A9aire-math%C3%A9matiques-%C3%A9ducation-cercle-fond-avec-des-parcelles-g%C3%A9om%C3%A9triques-des-formules-et-calcul-desig.jpg',
        creator: 'u1'
    },
    {
        id:'m2',
        title:'POO JAVA',
        description:'JAVA' ,
        imageUrl: 'https://img-0.journaldunet.com/7lsuQPfCvUbz8TO1sF6Tfdh6ZnI=/1280x/smart/218d741508034c0aaf1e4c246f54756d/ccmcms-jdn/12420397.jpg',
        creator: 'u2'
    }
    
];
const getModuleById = (req, res, next) => {
    const moduleId = req.params.mid;  // {mid : 'm1'}
    const module = DUMMY_MODULES.find(m =>{
        return m.id == moduleId; 
    });
    if(!module) {
        return next(new HttpError('could not find a Module for the provided id!', 404));
    }
    res.json({module}); // {module} ==> {module: module}
};

const getModulesByUserId = (req, res, next) => {
    const userId =  req.params.uid;
    const modules = DUMMY_MODULES.filter(m=>{
        return m.creator == userId;
    });
    if(!modules || modules.length === 0) {
        return next(new HttpError('Could not find a Modules for the provided user id!', 404));
    }
    res.json({modules});
};

const createModule = (req, res, next) => {
    const {title, description, imageUrl, creator} = req.body;
    const createdModule= {
        id: uuidv4(),
        title,
        description,
        imageUrl,
        creator
    };

    DUMMY_MODULES.push(createdModule); // unshift(createdModule)

    res.status(201).json({module: createdModule});
};

const updateModule = (req, res, next) =>{
    const { title, description } = req.body;
    const moduleId = req.params.mid;

    const updatedModule = { ...DUMMY_MODULES.find(m=>m.id === moduleId)};
    const moduleIndex = DUMMY_MODULES.findIndex(m=>m.id === moduleId);
    updatedModule.title = title;
    updatedModule.description = description;

    DUMMY_MODULES[moduleIndex] = updatedModule;
    res.status(200).json({module: updatedModule});
};

const deleteModule = (req, res, next) => {
    const moduleId = req.params.mid;
    DUMMY_MODULES = DUMMY_MODULES.filter(m => m.id !== moduleId);
    res.status(200).json({message: 'Module deleted successfully!'});
};

exports.getModuleById = getModuleById;
exports.getModulesByUserId = getModulesByUserId;
exports.createModule = createModule;
exports.updateModule = updateModule;
exports.deleteModule = deleteModule;
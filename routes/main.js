const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const ProjectController = require('../controllers/ProjectController')

router.get('/', (req, res) => {
  const data = req.context

  //We instantiate an object because ProjectController is a class and not a JSON. 
  const projectCtr = new ProjectController()
  // Every method in the Project Controller class returns a promise, that is why we use .then and .catch.
  // .then is the success block, we render the list of project got from the GET.
  // .catch is the failure block, we send an error message.
  projectCtr.get()
  .then(projects => {
    data['projects'] = projects
    res.render('landing', data)
  })
  .catch(err => {
    res.send('Oops! ' + err.message)
  })
})

router.get('/project/:slug', (req, res) => {
  const data = req.context
  const projectSlug = req.params.slug
  const projectCtr = new ProjectController()
  projectCtr.get({slugs:projectSlug})
  .then(projects => {
    if(projects.length == 0 ){
      throw new Error('Project not found')
      return
    }
    
    const project = projects[0]
    data['projects'] = project
    res.render('project', data)
  })
  .catch(err => {
    res.send('Oops! ' + err.message)
  })
})

module.exports = router
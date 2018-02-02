var db = require('../models');

// GET /api/projects
function index(req, res) {
  // access database and pull out all projects
  db.Project.find({}, function(err, allProjects) {
    res.json(allProjects);
  });
}

// POST /api/projects
function create(req, res) {
  // create an project based on request body and send it back as JSON

  // break data in the genre field into an array
  var genres = req.body.genres.split(', ');
  req.body.genres = genres;

  db.Project.create(req.body, function(err, project) {
    if (err) { console.log('error', err); }
    res.json(project);
  });
}

// GET /api/projects/:projectId
function show(req, res) {
  // find one project by id and send it back as JSON
  db.Project.findById(req.params.project_id, function(err, foundProject) {
    res.json(foundProject);
  });
}

// DELETE /api/projects/:projectId
function destroy(req, res) {
  // find one project by id, delete it, and send it back as JSON
  db.Project.findByIdAndRemove(req.params.project_id, function(err, deletedProject) {
    if (err) { console.log('error', err); }
    res.send(200);
  });
}

// PUT or PATCH /api/projects/:projectId
function update(req, res) {
  // find one project by id, update it based on request body,
  // and send it back as JSON

  db.Project.findById(req.params.id, function(err, foundProject) {
    if (err) { console.log('projectsController.update error', err); }
    foundProject.artistName = req.body.artistName;
    foundProject.name = req.body.name;
    foundProject.releaseDate = req.body.releaseDate;
    foundProject.save(function(err, savedProject) {
      if (err) { console.log('saving altered project failed'); }
      res.json(savedProject);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};

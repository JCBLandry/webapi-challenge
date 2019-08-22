const express = require('express');


const project = require('./data/helpers/projectModel.js');
const action = require('./data/helpers/actionModel.js');

const server = express();

server.use(express.json());

server.get('/api/projects', (req, res) => {
  project.get()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the Projects' });
  });
});

server.post('/api/projects', (req, res) => {
  project.insert(req.body)
  .then(shoutout => {
    res.status(201).json(shoutout);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the Project' });
  });
});

server.put('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    project.update(id, changes)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Error updating Project"
        });
      });
});

server.delete('/api/projects/:id', (req, res) => {
    project.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'Project Deleted' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing this project',
      });
    });
});

server.get('/api/projects/:id', (req, res) => {
    project.getProjectActions(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch (error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error getting actions',
      });
    });
});

server.get('/api/actions/', (req, res) => {
    action.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch (error => {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the Actions' });
    });
  });
  
  server.post('/api/actions/:id', validateAction, (req, res) => {
    const id = req.params.id;
    action.insert(req.body)
    .then(actions => {
      res.status(201).json({id, actions});
    })
    .catch (error => {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot add the Action' });
    });
  });
  
  server.put('/api/actions/:id', (req, res) => {
      const id = req.params.id;
      const changes = req.body;
      action.update(id, changes)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: "Error updating Action"
          });
        });
  });
  
  server.delete('/api/actions/:id', (req, res) => {
      action.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'Action Deleted' });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error removing this action',
        });
      });
  });
  
  function validateAction(req, res, next) {
    
    project
      .get(req.body.project_id)
      .then(projectID => {
        if (projectID != null) {
          next();
        } else {
          res.status(404).json({
            message: "That project could notbe found!"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Request Error"
        });
      });
  }

module.exports = server;

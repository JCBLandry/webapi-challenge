const express = require('express');


const project = require('./data/helpers/projectModel.js');
const action = require('./data/helpers/actionModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  project.get()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the Projects' });
  });
});

server.post('/', (req, res) => {
  project.insert(req.body)
  .then(shoutout => {
    res.status(201).json(shoutout);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the Project' });
  });
});

server.put('/:id', (req, res) => {
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

server.delete('/:id', (req, res) => {
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

server.get('/:id', (req, res) => {
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

server.get('/', (req, res) => {
    action.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch (error => {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the Projects' });
    });
  });
  
  server.post('/', (req, res) => {
    action.insert(req.body)
    .then(shoutout => {
      res.status(201).json(shoutout);
    })
    .catch (error => {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot add the Project' });
    });
  });
  
  server.put('/:id', (req, res) => {
      const id = req.params.id;
      const changes = req.body;
      action.update(id, changes)
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
  
  server.delete('/:id', (req, res) => {
      action.remove(req.params.id)
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

module.exports = server;

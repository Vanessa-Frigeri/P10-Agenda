const moment = require('moment');
const Schedule = require('../model/schedules.js');

module.exports = app => {
    //adding new schedule    
    app.post('/schedules', (req, res) => {
        const schedule = req.body;
        Schedule.addSchedule(schedule)
            .then(scheduleCreated => res.status(201).json(scheduleCreated))
            .catch(err => res.status(400).json(err));
    });
    //listing schedules
    app.get('/schedules', (req, res) => {
        Schedule.listSchedule()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err));
    });


    app.get('/schedules/id/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Schedule.findById(id, res);
    });

    app.get('/schedules/dateInitial/:dateInitial', (req, res) => {
        const dateInitial = req.params.dateInitial;
        Schedule.findByDateInitial(dateInitial, res);
    });

    app.patch('/schedules/id/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;
        Schedule.updateScheduleById(id, values, res);
    });

    app.delete('/schedules/id/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Schedule.deleteScheduleById(id, res);
    });
}
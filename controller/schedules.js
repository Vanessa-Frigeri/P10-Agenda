const moment = require('moment');
const Schedule = require('../model/schedules.js');

module.exports = app => {
    app.get('/schedules', (req, res) => {
        Schedule.listSchedule(res);
    });

    app.get('/schedules/id/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Schedule.findById(id, res);
    });

    app.get('/schedules/dateInitial/:dateInitial', (req, res) => {
        const dateInitial = req.params.dateInitial;
        Schedule.findByDateInitial(dateInitial, res);
    });

    app.post('/schedules', (req, res) => {
        const schedule = req.body;
        Schedule.addSchedule(schedule, res);
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
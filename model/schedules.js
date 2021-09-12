const moment = require('moment');
const con = require('../infrastructure/connection.js');

class Schedule {
    addSchedule(schedule, res) {
        const dateCreate = moment().format('YYYY-MM-DD HH:mm:ss');
        const dateInitial = moment(schedule.dateInitial, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dateFinish = moment(schedule.dateFinish, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const dateInitialIsValid = moment(dateInitial).isSameOrAfter(dateCreate);
        const dateFinishIsValid = moment(dateFinish).isSameOrAfter(dateInitial);
        const nameIsValid = schedule.parent.length >= 3;

        const validations = [{
                name: 'dateInitial',
                valid: dateInitialIsValid,
                message: 'Data de Início deve ser maior ou igual a data atual'
            },
            {
                name: 'dateFinish',
                valid: dateFinishIsValid,
                message: 'Data de Fim deve ser maior ou igual a data Início'
            },
            {
                name: 'parent',
                valid: nameIsValid,
                message: 'Nome do responsável precisa ter pelo menos 3 caracteres'
            }
        ];

        const errors = validations.filter(field => !field.valid);
        const existError = errors.length;

        if (existError) {
            res.status(400).json(errors);
        } else {

            const scheduleDate = {
                ...schedule,
                dateInitial,
                dateFinish,
                dateCreate
            };

            const sql = 'INSERT INTO tbSchedules SET ?';

            con.query(sql, scheduleDate, (err) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(schedule);
                }
            });
        }
    }

    listSchedule(res) {
        const sql = 'SELECT * FROM agenda.tbschedules';
        con.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    }

    findById(id, res) {
        const sql = `SELECT * FROM agenda.tbschedules WHERE id=${id}`;
        con.query(sql, (err, results) => {
            const schedule = results[0];
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(schedule);
            }
        });
    }

    findByDateInitial(dateInitial, res) {
        const dateIniFormat = moment(dateInitial, 'DDMMYYYY').format('YYYY-MM-DD');
        const sql = `SELECT * FROM agenda.tbschedules WHERE '${dateIniFormat}' = date(dateInitial)`;

        con.query(sql, (err, results) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(202).json(results);
            }
        });
    }

    updateScheduleById(id, values, res) {
        if (values.dateInitial || values.dateFinish) {
            values.dateInitial = moment(values.dateInitial, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            values.dateFinish = moment(values.dateFinish, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = 'UPDATE agenda.tbschedules SET ? WHERE id=?';
        con.query(sql, [values, id], (err) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(202).json({...values, id });
            }
        });
    }

    deleteScheduleById(id, res) {
        const sql = 'DELETE FROM agenda.tbschedules WHERE id=?';
        con.query(sql, id, (err) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(202).json({ id });
            }
        });
    }
}


module.exports = new Schedule;
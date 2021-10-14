const moment = require('moment');
const axios = require('axios');
const con = require('../infrastructure/database/connection.js');
const repositorie = require('../repositories/schedule.js');

class Schedule {
    constructor() {
        this.dateInitialIsValid = ({ dateInitial, dateCreate }) => moment(dateInitial).isSameOrAfter(dateCreate);
        //this.dateFinishIsValid = ({dateFinish, dateInitial}) => moment(dateFinish).isSameOrAfter(dateInitial);
        this.nameIsValid = (size) => size >= 3;

        this.validations = [{
                name: 'dateInitial',
                valid: this.dateInitialIsValid,
                message: 'Data de Início deve ser maior ou igual a data atual'
            },
            // {
            //     name: 'dateFinish',
            //     valid: this.dateFinishIsValid,
            //     message: 'Data de Fim deve ser maior ou igual a data Início'
            // },
            {
                name: 'parent',
                valid: this.nameIsValid,
                message: 'Nome do responsável precisa ter pelo menos 3 caracteres'
            }
        ];

        this.valid = (params) => {
            this.validations.filter(field => {
                const { name } = field;
                const param = params[name];
                return !field.valid(param);
            });
        };
    }


    addSchedule(schedule) {
        const dateCreate = moment().format('YYYY-MM-DD HH:mm:ss');
        const dateInitial = moment(schedule.dateInitial, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dateFinish = moment(schedule.dateFinish, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const params = {
            dates: { dateInitial, dateCreate },
            parent: { size: schedule.parent.length }
        };

        const errors = this.valid(params);
        const existsError = errors.length;

        if (existsError) {
            return new Promise((resolve, reject) => reject(errors));
        } else {

            const scheduleDate = {
                ...schedule,
                dateInitial,
                dateFinish,
                dateCreate
            };

            return repositorie.addSchedule(scheduleDate)
                .then((results) => {
                    const id = results.insertId;
                    return ({...schedule, id });
                });
        }
    }

    listSchedule() {
        return repositorie.listSchedule();
    }

    findById(id, res) {
        const sql = `SELECT * FROM agenda.tbschedules WHERE id=${id}`;
        con.query(sql, async(err, results) => {
            const schedule = results[0];
            const cpf = schedule.parent;
            if (err) {
                res.status(400).json(err);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                schedule.parent = data;
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


module.exports = new Schedule();
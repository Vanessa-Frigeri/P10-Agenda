const query = require('../infrastructure/database/querys');

class Schedule {
    addSchedule(schedule) {
        const sql = 'INSERT INTO tbSchedules SET ?';
        return query(sql, schedule);
    }

    listSchedule() {
        const sql = 'SELECT * FROM agenda.tbschedules';
        return query(sql);
    }
}

module.exports = new Schedule();
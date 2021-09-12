class Tables {
    init(con) {
        this.con = con;
        this.createTableSchedule();
    }

    createTableSchedule() {
        const sql = 'CREATE TABLE IF NOT EXISTS tbSchedules (' +
            'id int NOT NULL AUTO_INCREMENT' +
            ', parent varchar(50) NOT NULL' +
            ', child varchar(50) NOT NULL' +
            ', description varchar(100)' +
            ', dateInitial date NOT NULL' +
            ', dateFinish date NOT NULL' +
            ', place varchar(50)' +
            ', observation text' +
            ', status varchar(20)' +
            ', PRIMARY KEY (id)' +
            ')';
        this.con.query(sql, err => {
            if (err) throw err;
            console.log('Table create');
        });
    }
}

module.exports = new Tables;
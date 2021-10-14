class Tables {
    init(con) {
        this.con = con;
        this.createTableSchedule();
        this.createTableChild();
    }

    createTableSchedule() {
        const sql = 'CREATE TABLE IF NOT EXISTS tbSchedules (' +
            'id int NOT NULL AUTO_INCREMENT' +
            ', parent varchar(11) NOT NULL' +
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

    createTableChild() {
        const sql = 'CREATE TABLE IF NOT EXISTS tbChild (' +
            'id int NOT NULL AUTO_INCREMENT' +
            ', name varchar(50) NOT NULL' +
            ', image varchar(200)' +
            ', dateBorn datetime' +
            ', PRIMARY KEY (id)' +
            ')';
        this.con.query(sql, err => {
            if (err) throw err;
            console.log('Table create');
        });
    }
}

module.exports = new Tables;
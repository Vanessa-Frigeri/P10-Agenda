const customExpress = require('./config/customExpress.js');
const con = require('./infrastructure/database/connection.js');
const Tables = require('./infrastructure/database/tables');

con.connect((err) => {
    if (err) throw err;
    console.log('Conectado!');
    Tables.init(con);
    const app = customExpress();
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
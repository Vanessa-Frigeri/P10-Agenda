const con = require('../infrastructure/connection.js');
const uploads = require('../archives/uploads.js');
class Child {
    addChild(child, res) {
        const sql = 'INSERT INTO agenda.tbchild SET ?';

        uploads(child.image, child.name, (err, newlocalization) => {
            if (err) {
                res.status(400).json({ err });
            } else {
                const newChild = { name: child.name, image: newlocalization };
                con.query(sql, newChild, (err) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(201).json(newChild);
                    }
                });
            };

        });

    }
}

module.exports = new Child();
const fs = require('fs');
const path = require('path');

module.exports = (localization, nameArchive, callbackImageCreated) => {
    const typeValids = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'tif', 'svg'];
    const typeExtension = path.extname(localization);
    const typeIsValid = typeValids.indexOf(typeExtension.substring(1)) !== -1;

    if (typeIsValid) {
        const newlocalization = `./assets/images/${nameArchive}${typeExtension}`;

        fs.createReadStream(localization)
            .pipe(fs.createWriteStream(newlocalization))
            .on('finish', () => callbackImageCreated(false, newlocalization));
    } else {
        const err = "Extensão da imagem é inválido";
        console.log('ERRO - Extensão da imagem não é válida.')
        callbackImageCreated(err);
    };

}
let fs = require('fs');

/**
 * Изменение данных в базе
 * @param url - Адрес файла
 * @param data - данные для перезаписи
 * @return {Promise<boolean>}
 */
module.exports = async function(url, data) {
  try {
    await fs.writeFile(url, JSON.stringify(data, null, '  '), err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
};
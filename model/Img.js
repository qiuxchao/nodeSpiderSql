const Sequelize = require('sequelize');
const db = require('../db');
const sequelize = db.sequelize;

class Imgs extends Sequelize.Model {}

// 对表建模
Imgs.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'imgs'
});

// 将模型与表同步，只在第一次使用
// Imgs.sync({force: true});

module.exports = Imgs;












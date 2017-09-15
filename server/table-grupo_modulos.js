"use strict";

module.exports = function (context) {
    var admin = context.user.rol === 'admin';
    return context.be.tableDefAdapt({
        name: 'grupo_modulos',
        elementName: 'grupo',
        editable: admin,
        fields: [
            { name: 'propio', typeName: 'boolean'},
            { name: 'group', typeName: 'text'},
        ],
        primaryKey: ['propio', 'group'],
        detailTables: [
            { table: 'modules', fields: ['propio', 'group'], abr: 'M', label: 'módulos' },
        ],
        sql: {
            from: `(select distinct propio, "group" from modules m order by propio, "group")`
        }
    }, context);
}
"use strict";

module.exports = function (context) {
    var admin = context.user.rol === 'admin';
    return context.be.tableDefAdapt({
        name: 'propiedad_modulos',
        elementName: 'propiedad',
        editable: admin,
        fields: [
            { name: 'propio', typeName: 'boolean', title: 'propio' },
        ],
        primaryKey: ['propio'],
        detailTables: [
            { table: 'grupo_modulos', fields: ['propio'], abr: 'G', label: 'módulos' },
            { table: 'modules', fields: ['propio'], abr: 'M', label: 'grupos' },
        ],
        sql: {
            from: `(select distinct propio from modules m order by propio)`
        }
    }, context);
}
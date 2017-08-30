"use strict";

module.exports = function (context) {
    var admin = context.user.rol === 'admin';
    return context.be.tableDefAdapt({
        name: 'modules',
        elementName: 'module',
        editable: admin,
        fields: [
            { name: 'module', typeName: 'text', title: 'Módulo', nullable: false, sequence: { name: 'module' } },
            { name: 'repo', typeName: 'text', title: 'repositorio' },
            { name: 'importance', typeName: 'integer', title: 'importancia' },
            { name: 'codenautas_owned', typeName: 'boolean', title: 'es de codenautas?' },
            { name: 'group', typeName: 'text', title: 'grupo' },
            { name: 'class', typeName: 'text', title: 'clase' }
        ],
        primaryKey: ['module'],
        detailTables: [
            {table: 'versions'      , fields:['module'], abr:'V', label:'versiones'},
        ]
    }, context);
}
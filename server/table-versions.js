"use strict";

module.exports = function (context) {
    var admin = context.user.rol === 'admin';
    return context.be.tableDefAdapt({
        name: 'versions',
        elementName: 'version',
        editable: admin,
        fields: [
            { name: 'module', typeName: 'text', title: 'Módulo', nullable: false },
            { name: 'version', typeName: 'text', title: 'versión', nullable: false},
            { name: 'cobertura', typeName: 'text', title: 'covertura' },
            { name: 'test_pass', typeName: 'boolean', title: 'pasan los test?' },
            { name: 'insecurity_level', typeName: 'text', title: 'nivel de inseguridad' },
        ],
        primaryKey: ['module', 'version'],
        foreignKeys: [
            { references: 'modules', fields: ['module'] }
        ],
        detailTables: [
            { table: 'dependences', fields: [{ source: 'module', target: 'source_module' }, { source: 'version', target: 'source_version' }], abr: 'D', label: 'dependencias', alias:'ver' },
        ]
    }, context);
}
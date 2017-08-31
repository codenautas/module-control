"use strict";

module.exports = function (context) {
    var admin = context.user.rol === 'admin';
    return context.be.tableDefAdapt({
        name: 'dependences',
        elementName: 'dependence',
        editable: admin,
        fields: [
            { name: 'source_module', typeName: 'text', title: 'Módulo', nullable: false },
            { name: 'source_version', typeName: 'text', title: 'versión', nullable: false },
            { name: 'dependence_module', typeName: 'text', title: 'Módulo dependencia', nullable: false },
            { name: 'dependence_version', typeName: 'text', title: 'versión dependencia', nullable: false },
            { name: 'prefix', typeName: 'text', title: 'prefijo' },
            { name: 'category', typeName: 'text', title: 'categoria' },
        ],
        primaryKey: ['source_module', 'source_version', 'dependence_module'],
        foreignKeys: [
            { references: 'versions', fields: [{ source: 'source_module', target: 'module' }, { source: 'source_version', target: 'version' }], alias: 'source' },
            { references: 'versions', fields: [{ source: 'dependence_module', target: 'module' }, { source: 'dependence_version', target: 'version' }], alias: 'dependence' },
        ],
        softForeignKeys: [
            { references: 'versions', fields: [{ source: 'dependence_module', target: 'module' }, { source: 'dependence_version', target: 'version' }]},
        ]
    }, context);
}
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
            { name: 'class', typeName: 'text', title: 'clase' },
            { name: 'version', typeName: 'text', title: 'última versión', inTable: false, editable: false },
            { name: 'cobertura', typeName: 'text', title: 'cobertura últ. versión', inTable: false, editable: false },
            { name: 'test_pass', typeName: 'boolean', title: 'pasan test en últ. versión?', inTable: false, editable: false },
            { name: 'insecurity_level', typeName: 'text', title: 'nivel de inseg. de últ. versión', inTable: false, editable: false },
        ],
        primaryKey: ['module'],
        detailTables: [
            { table: 'versions', fields: ['module'], abr: 'V', label: 'versiones' },
        ],
        sql: {
            isTable: true,
            // from: `(select m.*, vv.version, vv.cobertura, vv.test_pass, vv.insecurity_level from modules m, lateral (select v.* from versions v where m.module = v.module order by v.version desc limit 1) vv)`
            // from: `(select m.* from modules m, lateral (select v.* from versions v where m.module = v.module order by v.version desc limit 1) vv)`
            from: `(select * from modules m left join (select distinct on (v.module) v.version, v.module version_module, v.cobertura, v.test_pass, v.insecurity_level from versions v order by v.module, string_to_array(v.version,'.')::int[] desc) v on (m.module = v.version_module))`
        }
    }, context);
}
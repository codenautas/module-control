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
            // { name: 'last_version', typeName: 'text', title: 'última versión', inTable: false, clientSide: 'lastVersion', editable: false },
        ],
        primaryKey: ['module'],
        detailTables: [
            { table: 'versions', fields: ['module'], abr: 'V', label: 'versiones' },
        ],
        sql: {
            isTable: true,
            from: `(select * from modules m left join (select distinct on (v.module) v.version, v.module version_module, v.cobertura, v.test_pass, v.insecurity_level from versions v order by v.module, string_to_array(v.version,'.') desc) v on (m.module = v.version_module))`
            //  string_to_array(regexp_replace(v.version, '[a-zA-Z]', '', 'gi'), '.','')::int[]
            // 1. removing letters from version string
            // 2. split version str in an array of version parts
            // 3. cast this array to integer

            // Mejor aproximación: string_to_array(v.version,'.')
            // se descarta: string_to_array(regexp_replace(v.version, '[a-zA-Z-]', '', 'gi'), '.','')::int[]
        }
    }, context);
}
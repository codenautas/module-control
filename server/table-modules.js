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
            { name: 'propio', typeName: 'boolean', title: 'propio', nullable:false },
            { name: 'group', typeName: 'text', title: 'grupo' },
            { name: 'class', typeName: 'text', title: 'clase' },
            { name: 'version', typeName: 'text', title: 'versión', inTable: false, editable: false },
            { name: 'cobertura', typeName: 'text', title: 'cobertura', inTable: false, editable: false },
            { name: 'test_pass', typeName: 'boolean', title: 'tests', inTable: false, editable: false },
            { name: 'insecurity_level', typeName: 'text', title: 'dependencias', inTable: false, editable: false },
        ],
        primaryKey: ['module'],
        detailTables: [
            { table: 'versions', fields: ['module'], abr: 'V', label: 'versiones' },
            { table: 'dependences', fields: [{ source: 'module', target: 'source_module' }, { source: 'version', target: 'source_version' }], abr: 'D', label: 'dependencias', alias:'dep' },
        ],
        sql: {
            isTable: true,
            from: `
                (select * 
                   from modules m, 
                        lateral (select v.version, v.cobertura, v.test_pass, v.insecurity_level
                                   from versions v 
                                   where m.module = v.module 
                                   order by para_ordenar_ten(v.version) desc
                                   limit 1
                                ) v
                    order by m.module)`
            //  string_to_array(regexp_replace(v.version, '[a-zA-Z]', '', 'gi'), '.','')::int[]
            // 1. removing letters from version string
            // 2. split version str in an array of version parts
            // 3. cast this array to integer

            // Mejor aproximación: string_to_array(v.version,'.')
            // se descarta: string_to_array(regexp_replace(v.version, '[a-zA-Z-]', '', 'gi'), '.','')::int[]
        }
    }, context);
}
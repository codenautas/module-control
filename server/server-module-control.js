"use strict";

var Path = require('path');
var backendPlus = require("backend-plus");
var MiniTools = require('mini-tools');

var changing = require('best-globals').changing;

class AppModuleControl extends backendPlus.AppBackend{
    constructor(){
        super();
    }    
    addLoggedServices(){
        var be = this;
        super.addLoggedServices();
        this.app.get('/echo', function(req,res){
            res.end('echo');
        });
    }
    getProcedures(){
        var be = this;
        return super.getProcedures().then(function(procedures){
            return procedures.concat(
                require('./procedures-module-control.js').map(be.procedureDefCompleter, be)
            );
        });
    }
    getMenu(context){
        return {menu:[
            {menuType:'menu', name:'modules', menuContent:[
                {menuType:'table', name:'modules', label:'modulos'},
                {menuType:'table', name:'versions', label:'versiones'},
            ]},
            {menuType:'menu', name:'configuración', menuContent:[
                {menuType:'table', name:'usuarios'},
            ]},
        ]}
    }
    getTables(){
        return super.getTables().concat([
            'usuarios',   
            'modules',
            'versions',
            'dependences'
        ]);
    }
}

new AppModuleControl().start();
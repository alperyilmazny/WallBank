app.service('dataTableService', function(){
    this.destroyDataTable = function(tableName){
        $(tableName).dataTable().fnDestroy();
    }

    this.setDataTable = function(tableName){
        window.setTimeout(function(){
            $(tableName).dataTable({
                "responsive": true,
                "iDisplayLength": 50
            });
        }, 300);
    }
});
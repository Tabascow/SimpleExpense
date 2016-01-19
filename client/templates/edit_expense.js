
Template.EditExpense.helpers({
    beforeRemove: function () {
        return function (collection, id) {
            var doc = collection.findOne(id);
            if (confirm('Souhaitez vous vraiment supprimer la dépense: "' + doc.title + '"?')) {
                this.remove();
                sAlert.info('La dépense vient d\'être supprimée',{effect: 'flip', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false, offset: '0px'});
                Router.go('expensesList');
            }
        };
    }
});

AutoForm.addHooks(['editExpenseForm'],{
    onSuccess: function(formType, result) {
        sAlert.success('La dépense vient d\'être mise à jour',{effect: 'flip', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false, offset: '0px'});
        Router.go("expensesList");
    }
});
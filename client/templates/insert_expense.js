AutoForm.addHooks(['insertExpenseForm'],{
    onSuccess: function(formType, result) {
        sAlert.success('La dépense vient d\'être ajoutée',{effect: 'flip', position: 'bottom', timeout: '2000', onRouteClose: false, stack: false, offset: '0px'});
        Router.go("expensesList");
    }
});
Router.configure({
    layoutTemplate:'MasterLayout'
});

Router.route('/',function(){
    this.redirect('/expenses_list');

})

Router.route('/insert_expense', {
    name: 'insertExpense',
    controller: 'ExpensesController',
    action: 'insert',
    where: 'client'
});
Router.route('/expenses_list', {
    name: 'expensesList',
    controller: 'ExpensesController',
    action: 'list',
    where: 'client'
});
Router.route('/expense/:_id', {
    name: 'editExpense',
    controller: 'ExpensesController',
    action: 'edit',
    where: 'client'
});
Router.route('/expenses_stats', {
    name: 'expensesStats',
    controller: 'ExpensesController',
    action:'stats'
});
Router.route('/example', {
    name: 'ChartWithDifferentSeries',
});

Router.onBeforeAction(function() {
    if (!Meteor.user()) {
        this.render('AccessDenied');
    } else
    {
        this.next();
    }
}, {only: ['expensesList', 'insertExpense']});


//Routes

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
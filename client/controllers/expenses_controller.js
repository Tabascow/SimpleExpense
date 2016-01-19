ExpensesController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('expenses', Meteor.userId()).wait();
    },
    data: function () {
        return Expenses.findOne({_id: this.params._id});
    },
    insert: function () {
        this.render('InsertExpense', {});
    },
    list: function() {
        this.render('ExpensesList', {});
    },
    edit: function() {
        this.render('EditExpense', {});
    },
    stats: function() {
        if (this.ready()) {
            this.render('ExpensesStats', {});
        } else {
            this.render('Loading');
        }
    }
});
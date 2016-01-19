Template.ExpensesList.events({
    "click .newExpense": function(){
        Router.go('/insert_expense');
    }
});

Template.ExpensesList.helpers({
    expenses:function(){
        return Expenses.find();
    },
    dateFormatted: function(){
        return moment(this.date).format("DD/MM/YYYY");
    },
    isCategoryFee:function(){
        return this.category===CATEGORY_LOCATION || this.category===CATEGORY_STAND || this.category===CATEGORY_DEPLACEMENT;
    },
    isCategoryProvider:function(){
        return this.category===CATEGORY_EMBALLAGE || this.category===CATEGORY_MATIEREPREMIERE;
    }
})
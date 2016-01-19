Meteor.publish('expenses', function(userId){
    return Expenses.find({createdBy:userId});
})
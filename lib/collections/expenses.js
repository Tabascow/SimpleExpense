Expenses = new Mongo.Collection('expenses');

CATEGORY_EMBALLAGE = 'Emballage';
CATEGORY_MATIEREPREMIERE = 'Matière première';
CATEGORY_DEPLACEMENT = 'Déplacements';
CATEGORY_LOCATION = 'Location';
CATEGORY_STAND = 'Stand';

PAYMENTTYPE_CB='CB';
PAYMENTTYPE_PAYPAL='Paypal';
PAYMENTTYPE_CHEQUE='Chèque';
PAYMENTTYPE_CASH='Cash';

Expenses.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Libellé",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        max: 1024,
        optional: true
    },
    date: {
        type: Date,
        label: "Date"
    },
    amount: {
        type: Number,
        label: "Montant"
    },
    category: {
        type: String,
        label: "Catégorie",
        optional: false,
        allowedValues: [CATEGORY_EMBALLAGE, CATEGORY_MATIEREPREMIERE, CATEGORY_DEPLACEMENT, CATEGORY_LOCATION, CATEGORY_STAND]
    },
    paymentType: {
        type: String,
        label: "Méthode",
        optional: false,
        allowedValues: [PAYMENTTYPE_CB, PAYMENTTYPE_PAYPAL, PAYMENTTYPE_CHEQUE, PAYMENTTYPE_CASH]
    },
    createdBy: {
        type: String,
        autoValue: function () {
            return this.userId;
        }

    }
}));


Expenses.allow({
    insert: function (userId, doc) {
        return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },

    remove: function (userId, doc) {
        return true;
    }
});
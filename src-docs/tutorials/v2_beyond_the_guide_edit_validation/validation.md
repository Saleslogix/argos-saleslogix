An important part of forms is the client-side validation, not as a means to prevent bad data from going into your database but a way to encourage the user to enter the data she is intending to.

First we will examine the base Edit view and how it checks each field, prevents submitting and shows the error container. Then we will add a simple "max length" validator to prevent overly long AccountNames in the Account Edit View from the Create a Simple Edit View topic.

## Edit Validation Cycle
If you wish to follow along you may open `argos-sdk/src/Edit.js`, but most functions are self-explanitory.

1\. When a user enters data and presses the Save toolbar item the `save()` function is called and all existing errors are cleared out and hidden then it calls the Edit Views `validate()`.

2\. Inside `validate()` we see that it loops over `this.fields` which is a collection of each "field object" and then calls `field.validate()`.

3\. If the `field.validate()` returns a string (eg, not `false`) then it means there is an error, and the string is the error message. It adds the `row-error` class to the field object container and adds an object containing the error message and field name to the `this.errors` collection.

4\. After all fields are validated, the Edit Views `validate()` function returns true if there are any errors in `this.errors`.

5\. Back in `save()` if `validate()` returned true then it calls `showValidationSummary()` and stops the save process.

6\. `showValidationSummary()` adds each error by using the `validationSummaryItemTemplate` with the error item (with message text) and then just the field name. Which is then joined and added to the `validationContentNode` and the class `panel-form-error` is added to the Edit Views' container div.


## Field Validation
Every field widget derives from the base {@link _Field _Field} which has the {@link _Field#validate validate()} logic. Without going into the nitty gritty details, it returns false if everything is okay or if no validators are defined.

## Validators
Validators are quick and simple methods for adding validation logic, they can be defined as: RegExp, functions, or objects that have either `test` for RegExp or `fn` for function. Objects may also have a `message` defined for custom error messages. If the message is define it is treated as a `string.substitute` format string and is passed: value, field name, field label as `${0}`, `${1}` and `${2}` respectively.

This part assumes you've completed [Argos-Template Guide](#!/guide/v2_template-guide).

1\. Open `argos-template/src/Views/Account/Edit` down to `createLayout()` and the AccountName field.

2\. Add a new property: `validator` and set it to an empty object:

                children: [{
                    name: 'AccountName',
                    property: 'AccountName',
                    label: this.accountNameText,
                    validator: {}
                },{

3\. First we will use the "object with function and custom message" approach. Add the key `fn` set to `this.exceedsLength` and `message` to `this.exceedsLengthErrorText`:

                    validator: {
                        fn: this.exceedsLength,
                        message: this.exceedsLengthErrorText
                    }

4\. Add the function `exceedsLength()`, all validator functions get passed the current value and the field. Have the function return true if the length of the value is over 255. Remember that true means "this is an error".

    exceedsLength: function(value, field) {
        return value && value.length > 255;
    },

5\. Add the invalid message text:

    exceedsLengthErrorText: "The field '${2}' value exceeds the allowed limit in length.",

6\. Save and run your app and try creating a new Account where the name has more than 255 characters. You should see a red box with your error message.

7\. Now go back to the same file, same function, same field object and let's add another validator. The `validator` property also accepts arrays of validators and the field will fail to validate if any of the validators fail.

8\. For this new validator lets use the "object with RegExp and message" approach. Add a new validator with the `test` and message` keys with `this.notEmptyRE` and `this.notEmptyErrorText`:

        validator: [{
               fn: this.exceedsLength,
               message: this.exceedsLengthErrorText
            },{
               test: this.notEmptyRE,
               message: this.notEmptyErrorText
            }
        ]

9\. Define `noteEmptyRE` to test for any char, in the case of RegExp tests it is the reverse - if it matches then its a good value, if it doesn't match the RE it's a bad value:

    notEmpty: /.+/,

10\. And the not empty error message:

    notEmptyErrorText: 'The field '${2}' cannot be empty.',

11\. Save and run your app and try to insert an Account with no name. You should see the error message come up.

Setting the validtor key on a field object enables validation to take place - the common approach to to pass an object with either `fn` or `test` for the matching logic and `message` for the custom message to show. Just remember that in your `fn` you also get passed the field object itself -- giving you access to possible custom parameters (min/max values, start/end dates, all set per field).

# Formatters Localization
2011-08-01 Tony Skidmore

Guide to providing custom formatters for use in localization.

## What is a Formatter?
A Formatter is a function that takes a value and returns a prettified version. Some examples are:

*   1000 -> $1,000
*   John Smith -> Smith, John
*   4803835244 -> (480) 383-5244

Argos-SalesLogix provides several default formatters:

*   address
*   phone
*   currency
*   nameLF

These are all coded to return "American" formats and may need to be overidden to provide the correct
locale format.

## Formatters:
### address
Address has three parameters:

<table>
<tr><th>Parameter</th><th>Description</th></tr>
<tr><td>val</td><td>the entry object containing the result of the sdata query</td></tr>
<tr><td>textOnly</td><td>true/false<br />true returns the address as just text<br />false returns inside a anchor
element pointing to google maps</td></tr>
<tr><td>nl</td><td>new line character, defaults to \n for textOnly or <br> for not textOnly</td></tr>
</table>

What this means is that when you override the address function you need to be aware of your
SData query and what properties are available to you (signified in your querySelect array).

An american address looks like this:

    [Address1]
    [Address2]
    [Address3]
    [Address4]
    [City], [State] [Postal Code]
    [Country]

Those are the actual names listed in the SData feed under `Address/*`

For an example, an Italian address may look like this:

    [Address1]
    [Address2]
    [Address3]
    [Address4]
    [Postal Code] [City] [State]
    [Country]

_(State being the sit-in for provincia)_


Here is the Italian override (to be placed in _ApplicationModule.js_ under _loadCustomizations_):

    Mobile.SalesLogix.Format.address = function(val, textOnly, nl) {
        var F = Sage.Platform.Mobile.Format;
        if (val === null || typeof val == "undefined") return "";

        var lines = [];
        if (!F.isEmpty(val['Address1'])) lines.push(F.encode(val['Address1']));
        if (!F.isEmpty(val['Address2'])) lines.push(F.encode(val['Address2']));
        if (!F.isEmpty(val['Address3'])) lines.push(F.encode(val['Address3']));
        if (!F.isEmpty(val['Address4'])) lines.push(F.encode(val['Address4']));

        var location = [];
        if (!F.isEmpty(val['PostalCode'])) location.push(F.encode(val['PostalCode']));

        if (!F.isEmpty(val['City']) && !F.isEmpty(F.encode(val['State'])))
        {
            location.push(F.encode(val['City']));
            location.push(F.encode(val['State']));
        }
        else
        {
            if (!F.isEmpty(val['City'])) location.push(F.encode(val['City']));
            if (!F.isEmpty(val['State'])) location.push(F.encode(val['State']));
        }


        if (location.length > 0)
        {
            lines.push(location.join(' '));
        }

        if (!F.isEmpty(val['Country'])) lines.push(F.encode(val['Country']));

        if (textOnly) return nl
            ? lines.join(typeof nl === 'string'
                ? nl
                : '\n')
            : lines.join('<br />');

        return String.format('<a target="_blank" href="http://maps.google.com/maps?q={1}">{0}</a>',
            lines.join('<br />'),
            encodeURIComponent(lines.join(' '))
        );
    };

To explain a bit:

*   the lines array is a list of all the lines;
*   the location array will join its members with a space, then append itself to the lines array; and
*   at the end, the lines array is joined with your newline variable.

If you compare the above to the original there is only minor differences - the Postal Code is the first element in the
location array and there is no comma between City and State.

Many of the various address formats are just as easy as the above, moving what is being called out to another
spot and punctuation.

- - -

###phone:
The phone formatter is a bit different - it uses the pattern matchers from the PhoneField control located in argos-sdk.

So look in the `Sage.Platform.Mobile.Controls.PhoneField` namespace for _formatters_ that is an array of format
objects that will be tested against.

A phone format object looks like this:

    {
        test: /^(\d{3})(\d{3})(\d{2,4})([^0-9]{1,}.*)$/, // 555 555 5555x
        format: '({3})-{4}-{5}{6}'
    }

**test**    = regex pattern that will be used to get the number groups; and

**format**  = string format expression where each `{n}` will be the matched group from the regex result. `{3}` will be
 your first capture group.

Please remember to take into consideration all the possibilites - without an area code, with an extension,
with a +nn in front, etc.

Example: Say I lived in Edinburgh with this phone number: (0131) 555 5555
and in my SData the phone numbers are stored like so: 01315555555.

My phone format would look like:

    {
        test: /^(\d{4})(\d{3})(\d{2,4})$/, // (5555) 555 5555
        format: '({3}) {4} {5}'
    }

Meaning 01315555555 will be displayed as (0131) 555 5555

To add your custom formatters, place the following code inside your ApplicationModule.js under loadCustomizations:

    var myCustomPhoneFormat = {
        test: /^(\d{4})(\d{3})(\d{2,4})$/, // (5555) 555 5555
        format: '({3}) {4} {5}'
    };
    Sage.Platform.Mobile.Controls.PhoneField.formatters.push(myCustomPhoneFormat);

**Note** - since we are `push`-ing our custom format into the existing list it will try to do all the american ones
first. If you do not want this to happen you need to completely replace the formatters array with your own set:

    Sage.Platform.Mobile.Controls.PhoneField.formatters = [
        {formatter},
        {formatter},
        {formatter}
    ];

- - -

###currency:
####TO COME
This will be updated once a solution for the server writing out the correct locale information (decimal, thousands,
number grouping, etc) is done and available.

- - -

###nameLF:
This is a simple formatter that takes puts the last name before the first name with a comma.

The code in the Format.js calls the Tempate.js nameLF which is a Simplate using the SData properties:

    nameLF: new Simplate([
        '{%= $.LastName %}, {%= $.FirstName %}'
    ]),

If you wish to change this you need to a function similar to the address overide
(in _ApplicationModule.js_ under _loadCustomizations_):

    Mobile.SalesLogix.Template.nameLF = new Simplate([
        '{%= $.LastName %} {%= $.FirstName %}'
    ]);

However, if a Simplate fails it will place empty strings in your variable placement, meaning it will return `' '` in the
 above example.

In _Format.js_ there is a catch for this and returns an actual empty string instead `''`. If you wish to also change
this catch then add this code:

    Mobile.SalesLogix.Format.nameLF = function(val) {
        if (!val) return '';

        var name = Mobile.SalesLogix.Template.nameLF.apply(val);
        if (name == ' ') // here is the catch for failed formatting
            name = '';

        return name;
    };

With the commented line above being where you would place the actual failed Simplate value.



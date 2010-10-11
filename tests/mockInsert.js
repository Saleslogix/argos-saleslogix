//demonstrates use of expected exceptions
describe("Account Insert entry", function() {
    var AccountTemplate, accountEntry;
    beforeEach(function(){

        var templateService;
        if (typeof AccountTemplate == 'undefined')
        {
            templateService = InsertTest.getService();
            
            InsertTest.getTemplateForResourceKind('accounts', templateService, function(entry){
                AccountTemplate = entry;
            });
        }
        //Temporary: This will come from Edit View
        accountEntry = {
            "Address": {
                 "$name":"Address",
                 "$key":"aGHEA0002738",
                 "$url":"http://slxbrowser.sagesaleslogixcloud.com/sdata/slx/dynamic/-/addresses('aGHEA0002738')",
                 "Address1":"4206 W. Grand Avenue",
                 "Address2":"Suite 900",
                 "Address3":null,
                 "Address4":null,
                 "City":"Chicago",
                 "Country":"USA",
                 "County":null,
                 "CreateDate":"2002-06-01T07:00:00-07:00",
                 "CreateUser":"ADMIN       ",
                 "Description":"Mailing",
                 "EntityId":"CDEMOA00007M",
                 "IsMailing":"true",
                 "IsPrimary":"true",
                 "ModifyDate":"2010-10-01T19:29:07-07:00",
                 "ModifyUser":"UDEMOA00000I",
                 "PostalCode":"60651",
                 "Routing":null,
                 "Salutation":"Abbott Manufacturing",
                 "State":"IL",
                 "TimeZone":"Central Standard Time",
                 "Type":null,
                 "CityStateZip":"Chicago, IL 60651",
                 "GlobalSyncId":null,
                 "ERPName":null,
                 "CityStatePostal":"Chicago, IL 60651",
                 "StreetAddress":"4206 W. Grand Avenue Suite 900",
                 "FullAddress":"4206 W. Grand Avenue\nSuite 900\nChicago, IL 60651\nUSA"
            },
            "$name":"Account",
            "AccountName":"Abbott Ltd.",
            "WebAddress":"www.abbott.com",
            "MainPhone":"3125557854",
            "Fax":"3125557545",
            "Type":"Customer",
            "SubType":"Hardware",
            "Status":"Duplicate",
            "Industry":"Communications",
            "BusinessDescription":"Bus Desc"
        };
    });
    
    it("should have only parameters listed in template", function() {
        var pass = false,
            objHasTemplateProps = function objHasTemplateProps(template, obj) {
                for (var prop in obj) {
                    if (!prop in template)
                        return false;
                    if (typeof obj[prop] == "object" && !objHasTemplateProps(template[prop], obj[prop]))
                        return false;
                }
                return true;
            };

        waitsFor(function(){
            return typeof AccountTemplate != 'undefined';
        });

        runs(function(){
            pass = objHasTemplateProps(AccountTemplate, accountEntry);

            expect(pass).toBeTruthy();
        });
    });
    
    it("should have non empty AccountName", function() {
        expect(accountEntry.AccountName).toBeDefined();
        expect(accountEntry.AccountName).not.toBeNull();
        expect(accountEntry.AccountName).toMatch(/\w+/);
    });
});
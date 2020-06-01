/* eslint-disable */
define('spec/Views/Account/List.spec', [
  'dojo/store/Memory',
  'Mobile/SalesLogix/Views/Account/List'
], function(
  MemoryStore,
  AccountList
) {
  var data = [{
    "$descriptor": "Abbott Ltd.",
    '$key': '2',
    'AccountName': 'Abbott Ltd.',
    'AccountManager': {
      'UserInfo': {
        'UserName': 'lee',
        'LastName': 'Hogan',
        'FirstName': 'Lee'
      }
    },
    'Owner': {
      'OwnerDescription': 'Midwest'
    },
    'WebAddress': 'http://www.abbott.demo',
    'Industry': 'Communications',
    'LeadSource': {
      'Description': ''
    },
    'MainPhone': '5553331234',
    'Fax': '7772221234',
    'Status': 'Duplicate',
    'SubType': 'Type A',
    'Type': 'Customer',
    'ModifyDate': new Date(Date.now())
  }, {
    "$descriptor": "BigCo",
    '$key': '2',
    'AccountName': 'BigCo',
    'AccountManager': {
      'UserInfo': {
        'UserName': 'lee',
        'LastName': 'Hogan',
        'FirstName': 'Lee'
      }
    },
    'Owner': {
      'OwnerDescription': 'Midwest'
    },
    'WebAddress': 'http://www.bigco.demo',
    'Industry': 'Auto',
    'LeadSource': {
      'Description': ''
    },
    'MainPhone': '5553331234',
    'Fax': '7772221234',
    'Status': 'Duplicate',
    'SubType': 'Type A',
    'Type': 'Customer',
    'ModifyDate': new Date(Date.now())
  }];

  xdescribe('Mobile/SalesLogix/Views/Account/List', function() {
    var _app = window.App;
    beforeEach(function() {
      window.App = {
        history: [],
        getCurrentPage: function() {},
        setCurrentPage: function(page) {},
        getMetricsByResourceKind: function() {
          return [];
        },
        getCustomizationsFor: function() {},
        enableGroups: true,
        supportsTouch: function() {},
        preferences: {
          quickActions: []
        },
        persistPreferences: function() {}
      };
      this.store = new MemoryStore({
        data: data
      });
      this.list = new AccountList();
      this.list.groupsMode = false;
      this.list.set('store', this.store);
    });

    afterEach(function() {
      this.list.destroy();

      this.list = null;
      this.store = null;
      window.App = _app;
    });


    it('should call apply on rowTemplate', function() {
      var view = this.list;

      spyOn(view.rowTemplate, 'apply')
        .and.callThrough();

      view.placeAt(document.body, 'first');
      view._started = true;
      view._placeAt = null;

      view.show();
      view.refresh();
      expect(this.list.rowTemplate.apply.calls.count())
        .toEqual(2);
    });
  });
});

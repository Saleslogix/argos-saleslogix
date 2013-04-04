define('spec/Application.spec', [
       'Mobile/SalesLogix/Application',
       'configuration/development' // TODO: Should we add a test configuration?
], function(application, configuration) {
    describe('Mobile/SalesLogix/Application', function() {
        describe('bootstrap', function() {
            it('should activate', function() {
                var instance = new application(configuration);

                spyOn(instance, 'activate').andCallThrough();
                spyOn(instance, 'init').andCallThrough();
                spyOn(instance, 'initConnects').andCallThrough();
                spyOn(instance, 'initCaching').andCallThrough();
                spyOn(instance, 'initServices').andCallThrough();
                spyOn(instance, 'initModules');
                spyOn(instance, 'initToolbars');
                spyOn(instance, 'initViews');
                spyOn(instance, 'initReUI');
                spyOn(instance, 'run').andCallThrough();

                instance.activate();
                expect(instance.activate).toHaveBeenCalled();

                instance.init();
                expect(instance.initConnects).toHaveBeenCalled();
                expect(instance.initCaching).toHaveBeenCalled();
                expect(instance.initServices).toHaveBeenCalled();
                expect(instance.initModules).toHaveBeenCalled();
                expect(instance.initToolbars).toHaveBeenCalled();
                expect(instance.initViews).toHaveBeenCalled();
                expect(instance.initReUI).toHaveBeenCalled();

                instance.run();

                instance.destroy();
                window.App = null;
            });
        });

        describe('configurations', function() {
            it('should have default configs', function() {
                var instance = new application(configuration);

                expect(instance.connections).toBeDefined();
                expect(instance.connections.crm).toBeDefined();
                expect(instance.connections.crm.isDefault).toBe(true);
                expect(instance.connections.crm.offline).toBe(true);
                expect(instance.connections.crm.url).toBe('http://localhost/sdata/slx/dynamic/-/');
                expect(instance.connections.crm.json).toBe(true);
                expect(instance.enableUpdateNotification).toBe(true);
                expect(instance.multiCurrency).toBe(false);
            });
        });
    });
});


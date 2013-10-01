/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
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

        describe('multicurrency', function() {
            it('should check if multicurrency is on or off', function() {
                var instance = new application(configuration);
                expect(instance.hasMultiCurrency()).toBe(false);
            });

            it('should check if user can lock opportunity rate', function() {
                var instance = new application(configuration);
                expect(instance.canLockOpportunityRate()).toBe(false);

                // Fake what we store in the context when we hit the system options endpoint
                instance.context = {
                    systemOptions: {
                        LockOpportunityRate: 'True'
                    }
                };

                expect(instance.canLockOpportunityRate()).toBe(true);
            });

            it('should check if user can change opportunity rate', function() {
                var instance = new application(configuration);
                expect(instance.canChangeOpportunityRate()).toBe(false);

                instance.context = {
                    systemOptions: {
                        ChangeOpportunityRate: 'True'
                    }
                };

                expect(instance.canChangeOpportunityRate()).toBe(true);
            });

            it('should get my exchange rate', function() {
                var instance = new application(configuration);

                // Test with multicurrency off
                expect(instance.getMyExchangeRate()).toEqual({code: '', rate: 1});

                // with multicurrency on
                spyOn(instance, 'hasMultiCurrency').andReturn(true);
                expect(instance.getMyExchangeRate()).toEqual({code: '', rate: 1});

                instance.context = {
                    exchangeRates: {
                        'USD': 2,
                        'AUD': 4
                    },
                    userOptions: {
                        'General:Currency': 'USD'
                    }
                };

                expect(instance.getMyExchangeRate()).toEqual({code: 'USD', rate: 2});
            });

            it('should get base exchange rate', function() {
                var instance = new application(configuration);

                // Test with multicurrency off
                expect(instance.getBaseExchangeRate()).toEqual({code: '', rate: 1});

                // Test with it on
                spyOn(instance, 'hasMultiCurrency').andReturn(true);
                expect(instance.getBaseExchangeRate()).toEqual({code: '', rate: 1});

                instance.context = {
                    exchangeRates: {
                        'USD': 3,
                        'EUR': 4
                    },
                    systemOptions: {
                        'BaseCurrency': 'EUR'
                    }
                };

                expect(instance.getBaseExchangeRate()).toEqual({code: 'EUR', rate: 4});
            });

            it('should get current opportunity exchange rate', function() {
                var instance = new application(configuration);

                expect(instance.getCurrentOpportunityExchangeRate()).toEqual({code: '', rate: 1});

                spyOn(instance, 'queryNavigationContext').andReturn({
                    options: {
                        ExchangeRateCode: 'EUR',
                        ExchangeRate: 5
                    }
                });

                expect(instance.getCurrentOpportunityExchangeRate()).toEqual({code: 'EUR', rate: 5});
            });
        });
    });
});


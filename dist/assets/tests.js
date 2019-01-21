'use strict';

define('pilots/tests/components/test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/test.js should pass jshint.');
  });
});
define('pilots/tests/data/iso_country.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | data/iso_country.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data/iso_country.js should pass jshint.');
  });
});
define('pilots/tests/data/map_style.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | data/map_style.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data/map_style.js should pass jshint.');
  });
});
define('pilots/tests/data/mission_type.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | data/mission_type.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data/mission_type.js should pass jshint.');
  });
});
define('pilots/tests/data/travel_distance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | data/travel_distance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'data/travel_distance.js should pass jshint.');
  });
});
define('pilots/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('pilots/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('pilots/tests/helpers/disable-bubbling.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/disable-bubbling.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/disable-bubbling.js should pass jshint.');
  });
});
define('pilots/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
/* global wait */
define('pilots/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'pilots/tests/helpers/start-app', 'pilots/tests/helpers/destroy-app'], function (exports, _qunit, _pilotsTestsHelpersStartApp, _pilotsTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _pilotsTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _pilotsTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('pilots/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('pilots/tests/helpers/pluralize.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/pluralize.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/pluralize.js should pass jshint.');
  });
});
define('pilots/tests/helpers/resolver', ['exports', 'pilots/resolver', 'pilots/config/environment'], function (exports, _pilotsResolver, _pilotsConfigEnvironment) {

  var resolver = _pilotsResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _pilotsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pilotsConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('pilots/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('pilots/tests/helpers/start-app', ['exports', 'ember', 'pilots/app', 'pilots/config/environment'], function (exports, _ember, _pilotsApp, _pilotsConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _pilotsConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _pilotsApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('pilots/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('pilots/tests/integration/components/accept-mission-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('accept-mission', 'Integration | Component | accept mission', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'hX44XpGU',
      'block': '{"statements":[[1,[26,["accept-mission"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'HgPJ9hkk',
      'block': '{"statements":[[6,["accept-mission"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/address-lookup-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('address-lookup', 'Integration | Component | address lookup', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'xI4LuKUn',
      'block': '{"statements":[[1,[26,["address-lookup"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '1h1H/eIR',
      'block': '{"statements":[[6,["address-lookup"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/bulk-upload-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('bulk-upload', 'Integration | Component | bulk upload', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'h4LvvxmL',
      'block': '{"statements":[[1,[26,["bulk-upload"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'Y9L1EmHo',
      'block': '{"statements":[[6,["bulk-upload"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/mission-detail-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('mission-detail', 'Integration | Component | mission detail', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'hXZJuQ8h',
      'block': '{"statements":[[1,[26,["mission-detail"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'xmLEYjJ0',
      'block': '{"statements":[[6,["mission-detail"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/mission-weather-forecast-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('weather-forecast', 'Integration | Component | weather forecast', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': '7KuBjX43',
      'block': '{"statements":[[1,[26,["weather-forecast"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '06AJAgde',
      'block': '{"statements":[[6,["weather-forecast"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/moment-format-localtime-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('moment-format-local-date', 'Integration | Component | moment format localtime', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': '1M3WfX8e',
      'block': '{"statements":[[1,[26,["moment-format-local-date"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'eZCN1gkE',
      'block': '{"statements":[[6,["moment-format-local-date"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-certifications-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-certifications', 'Integration | Component | pilot profile certifications', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'INKr4mOl',
      'block': '{"statements":[[1,[26,["pilot-profile-certifications"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'jsvOn4RH',
      'block': '{"statements":[[6,["pilot-profile-certifications"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-drone-camera-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-drone-camera', 'Integration | Component | pilot profile drone camera', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': '7CtRd/4L',
      'block': '{"statements":[[1,[26,["pilot-profile-drone-camera"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '4RX2aO2x',
      'block': '{"statements":[[6,["pilot-profile-drone-camera"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-drone-cameras-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-drone-cameras', 'Integration | Component | pilot profile drone cameras', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'zZratThA',
      'block': '{"statements":[[1,[26,["pilot-profile-drone-cameras"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'jSc4mcqL',
      'block': '{"statements":[[6,["pilot-profile-drone-cameras"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-drone-system-new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-drone-system-new', 'Integration | Component | pilot profile drone system new', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'ZsNyHfbR',
      'block': '{"statements":[[1,[26,["pilot-profile-drone-system-new"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'kQvLF6KS',
      'block': '{"statements":[[6,["pilot-profile-drone-system-new"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-drone-system-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-drone-system', 'Integration | Component | pilot profile drone system', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'aS40p/kK',
      'block': '{"statements":[[1,[26,["pilot-profile-drone-system"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '65Cdsz3k',
      'block': '{"statements":[[6,["pilot-profile-drone-system"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-drone-systems-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-drone-systems', 'Integration | Component | pilot profile drone systems', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'H6A1j52z',
      'block': '{"statements":[[1,[26,["pilot-profile-drone-systems"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'pvGo4OMK',
      'block': '{"statements":[[6,["pilot-profile-drone-systems"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-mission-preferences-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-mission-preferences', 'Integration | Component | pilot profile mission preferences', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': '3ZWb3RKA',
      'block': '{"statements":[[1,[26,["pilot-profile-mission-preferences"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'qGWvSdEY',
      'block': '{"statements":[[6,["pilot-profile-mission-preferences"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-payment-information-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-payment-information', 'Integration | Component | pilot profile payment information', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'W4jvhj4a',
      'block': '{"statements":[[1,[26,["pilot-profile-payment-information"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'OlhZ2wwX',
      'block': '{"statements":[[6,["pilot-profile-payment-information"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-personal-information-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile-personal-information', 'Integration | Component | pilot profile personal information', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'sOrflkBz',
      'block': '{"statements":[[1,[26,["pilot-profile-personal-information"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'Sv/VuQHp',
      'block': '{"statements":[[6,["pilot-profile-personal-information"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('pilot-profile', 'Integration | Component | pilot profile', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'kHpx3a/r',
      'block': '{"statements":[[1,[26,["pilot-profile"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'Kf5xbwFM',
      'block': '{"statements":[[6,["pilot-profile"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/pilot-stats-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('sub-navigation', 'Integration | Component | sub navigation', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'J1qaksrW',
      'block': '{"statements":[[1,[26,["sub-navigation"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '4l0swtr9',
      'block': '{"statements":[[6,["sub-navigation"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/profile-tooltip-prompt-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('profile-tooltip-prompt', 'Integration | Component | profile tooltip prompt', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'lqalpvql',
      'block': '{"statements":[[1,[26,["profile-tooltip-prompt"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'mrbDGU0X',
      'block': '{"statements":[[6,["profile-tooltip-prompt"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/v2-notification-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('notification', 'Integration | Component | v2 notification', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'GN1UBcAD',
      'block': '{"statements":[[1,[26,["notification"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': '7HXhoXwZ',
      'block': '{"statements":[[6,["notification"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/integration/components/weather-icon-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('weather-icon', 'Integration | Component | weather icon', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      'id': 'ykbUEDPR',
      'block': '{"statements":[[1,[26,["weather-icon"]],false]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      'id': 'hqU8l1fB',
      'block': '{"statements":[[6,["weather-icon"],null,null,{"statements":[[0,"  template block text\\n"]],"locals":[]},null]],"locals":[],"named":[],"yields":[],"hasPartials":false}',
      'meta': {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('pilots/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('pilots/tests/routes/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('pilots/tests/serializers/license.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/license.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/license.js should pass jshint.');
  });
});
define('pilots/tests/serializers/pilot-drone-camera.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/pilot-drone-camera.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/pilot-drone-camera.js should pass jshint.');
  });
});
define('pilots/tests/test-helper', ['exports', 'pilots/tests/helpers/resolver', 'ember-qunit'], function (exports, _pilotsTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_pilotsTestsHelpersResolver['default']);
});
define('pilots/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('pilots/tests/unit/components/file-uploader-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForComponent)('file-uploader', {});

  (0, _emberQunit.test)('it renders', function (assert) {
    var component;
    assert.expect(2);
    component = this.subject();
    assert.equal(component._state, 'preRender');
    this.render();
    return assert.equal(component._state, 'inDOM');
  });
});
define('pilots/tests/unit/controllers/airmapcallback-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:airmapcallback', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });
});
define('pilots/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('controller:application', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var controller;
    controller = this.subject();
    return assert.ok(controller);
  });
});
define('pilots/tests/unit/helpers/titleize-test', ['exports', 'pilots/helpers/titleize', 'qunit'], function (exports, _pilotsHelpersTitleize, _qunit) {
  (0, _qunit.module)('TitleizeHelper');

  (0, _qunit.test)('it works', function (assert) {
    var result;
    result = (0, _pilotsHelpersTitleize.titleize)(42);
    return assert.ok(result);
  });
});
define('pilots/tests/unit/mixins/s3-asset-uploads-test', ['exports', 'ember', 'pilots/mixins/s3-asset-uploads', 'qunit'], function (exports, _ember, _pilotsMixinsS3AssetUploads, _qunit) {
  (0, _qunit.module)('S3AssetUploadsMixin');

  (0, _qunit.test)('it works', function (assert) {
    var S3AssetUploadsObject, subject;
    S3AssetUploadsObject = _ember['default'].Object.extend(_pilotsMixinsS3AssetUploads['default']);
    subject = S3AssetUploadsObject.create();
    return assert.ok(subject);
  });
});
define('pilots/tests/unit/models/notification-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('notification', 'Unit | Model | notification', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('pilots/tests/unit/models/notification-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/notification-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/notification-test.js should pass jshint.');
  });
});
define('pilots/tests/unit/models/pilot-drone-camera-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForModel)('pilot-drone-camera', 'Unit | Model | pilot drone camera', {
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });
});
define('pilots/tests/unit/models/video-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForModel)('video', {
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });
});
define('pilots/tests/unit/routes/four-oh-four-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:four-oh-four', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });
});
define('pilots/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });
});
define('pilots/tests/unit/routes/missions-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:missions', 'Unit | Route | missions', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });
});
define('pilots/tests/unit/routes/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('route:profile', 'Unit | Route | profile', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });
});
define('pilots/tests/unit/serializers/pilot-drone-camera-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleForModel)('pilot-drone-camera', 'Unit | Serializer | pilot drone camera', {
    needs: ['serializer:pilot-drone-camera']
  });

  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record, serializedRecord;
    record = this.subject();
    serializedRecord = record.serialize();
    return assert.ok(serializedRecord);
  });
});
define('pilots/tests/unit/services/config-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('service:config', 'Unit | Service | config', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var service;
    service = this.subject();
    return assert.ok(service);
  });
});
define('pilots/tests/unit/services/notifications-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('service:notifications', 'Unit | Service | notifications', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var service;
    service = this.subject();
    return assert.ok(service);
  });
});
define('pilots/tests/unit/services/uploader-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {
  (0, _emberQunit.moduleFor)('service:uploader', {});

  (0, _emberQunit.test)('it exists', function (assert) {
    var service;
    service = this.subject();
    return assert.ok(service);
  });
});
define('pilots/tests/validations/auth.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/auth.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/auth.js should pass jshint.');
  });
});
define('pilots/tests/validations/custom_validators/boolean.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/custom_validators/boolean.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/custom_validators/boolean.js should pass jshint.');
  });
});
define('pilots/tests/validations/custom_validators/validateNumCommaSeparated.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/custom_validators/validateNumCommaSeparated.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/custom_validators/validateNumCommaSeparated.js should pass jshint.');
  });
});
define('pilots/tests/validations/getty.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/getty.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/getty.js should pass jshint.');
  });
});
define('pilots/tests/validations/pilot-license.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/pilot-license.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/pilot-license.js should pass jshint.');
  });
});
define('pilots/tests/validations/pilot.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | validations/pilot.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validations/pilot.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('pilots/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */

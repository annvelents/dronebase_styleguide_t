'use strict';

define('admin/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _test) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;


  const TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    const authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    const { __container__: container } = app;
    const session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    const session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return app.testHelpers.wait();
  }
});
define('admin/tests/integration/components/available-timeslot-selector-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | available-timeslot-selector', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jem/jwCx",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"available-timeslot-selector\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ed7sUK7M",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"available-timeslot-selector\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('admin/tests/integration/components/busy-modal-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | busy-modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/eY7anxx",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"busy-modal\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5rb6a/+B",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"busy-modal\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('admin/tests/integration/components/checkbox-aria-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | checkbox-aria', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      this.set('drone', new Ember.Object({ id: '1', name: 'test', drone_type: 'good_one' }));
      this.set('label', 'test');
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "DuP2iGxG",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"checkbox-aria\",null,[[\"label\",\"model\",\"selections\",\"includeManufacturer\"],[[21,0,[\"label\"]],[21,0,[\"drone\"]],[22,[\"\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      this.render(Ember.HTMLBars.template({
        "id": "dTEQ1REY",
        "block": "{\"symbols\":[],\"statements\":[[4,\"checkbox-aria\",null,[[\"label\",\"model\",\"selections\",\"includeManufacturer\"],[[21,0,[\"label\"]],[21,0,[\"drone\"]],[22,[\"\"]],true]],{\"statements\":[[0,\"template block text\"]],\"parameters\":[]},null]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('admin/tests/integration/components/collapsible-panel-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('collapsible-panel', 'Integration | Component | collapsible-panel', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      "id": "78qAjIPt",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"collapsible-panel\"],false]],\"hasEval\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      "id": "anmIMo5u",
      "block": "{\"symbols\":[],\"statements\":[[4,\"collapsible-panel\",null,null,{\"statements\":[[0,\"  template block text\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
      "meta": {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('admin/tests/integration/components/db-checkbox-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('db-checkbox', 'Integration | Component | db-checkbox', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      "id": "slqAoQCD",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"db-checkbox\"],false]],\"hasEval\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      "id": "HMSFlI/N",
      "block": "{\"symbols\":[],\"statements\":[[4,\"db-checkbox\",null,null,{\"statements\":[[0,\"  template block text\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
      "meta": {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('admin/tests/integration/components/dispatch-zone-autocomplete-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('dispatch-zone-autocomplete', 'Integration | Component | dispatch-zone-autocomplete', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    assert.expect(2);
    this.render(Ember.HTMLBars.template({
      "id": "j2T+jEuC",
      "block": "{\"symbols\":[],\"statements\":[[1,[20,\"dispatch-zone-autocomplete\"],false]],\"hasEval\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), '');
    this.render(Ember.HTMLBars.template({
      "id": "pPyT6Are",
      "block": "{\"symbols\":[],\"statements\":[[4,\"dispatch-zone-autocomplete\",null,null,{\"statements\":[[0,\"  template block text\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
      "meta": {}
    }));
    return assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('admin/tests/integration/components/scheduler-mission-details-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | scheduler-mission-details', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RGaERQye",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"scheduler-mission-details\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jKHJcmyE",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"scheduler-mission-details\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('admin/tests/test-helper', ['admin/app', 'admin/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('admin/config/environment', [], function() {
  var prefix = 'admin';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('admin/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map

"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('pilots/adapters/application', ['exports', 'ember-data', 'pilots/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _pilotsConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
  var ApplicationAdapter;

  ApplicationAdapter = _emberData['default'].JSONAPIAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
    shouldReloadRecord: function shouldReloadRecord() {
      return true;
    },
    shouldReloadAll: function shouldReloadAll() {
      return true;
    },
    authorizer: 'authorizer:devise',
    namespace: _pilotsConfigEnvironment['default'].api.namespace,
    host: _pilotsConfigEnvironment['default'].api.host,
    pathForType: function pathForType(type) {
      var underscored;
      underscored = Ember.String.underscore(type);
      return Ember.String.pluralize(underscored);
    }
  });

  exports['default'] = ApplicationAdapter;
});
define('pilots/adapters/category', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var CategoryAdapter;

  CategoryAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: _pilotsConfigEnvironment['default'].api.namespace + "/public"
  });

  exports['default'] = CategoryAdapter;
});
define('pilots/adapters/device', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var DeviceAdapter;

  DeviceAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/public",
    urlTemplate: '{+namespace}/devices'
  });

  exports['default'] = DeviceAdapter;
});
define('pilots/adapters/drone-camera', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates', 'ember-data'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates, _emberData) {
  var DroneCameraAdapter;

  DroneCameraAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], _emberData['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots/pilot_drones",
    urlTemplate: '{+namespace}/{pilotDroneId}/cameras{/id}',
    urlSegments: {
      pilotDroneId: function pilotDroneId(type, id, snapshot, query) {
        return snapshot.belongsTo('pilotDrone', {
          id: true
        });
      },
      droneCameraId: function droneCameraId(type, id, snapshot, query) {
        return snapshot.belongsTo('camera', {
          id: true
        });
      }
    },
    deleteRecord: function deleteRecord(store, type, snapshot) {
      var id, pilotDroneId;
      id = snapshot.id;
      pilotDroneId = snapshot.adapterOptions.pilotDroneId;
      return this.ajax(this.get('namespace') + "/" + pilotDroneId + "/cameras/" + id, "DELETE");
    },
    handleResponse: function handleResponse(status, headers, payload, requestData) {
      if (requestData.method === 'DELETE') {
        status = 204;
        payload = {};
        payload.meta = {};
        payload.meta.success = true;
        headers = {};
      }
      return this._super(status, headers, payload, requestData);
    }
  });

  exports['default'] = DroneCameraAdapter;
});
define('pilots/adapters/drone', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var DroneAdapter;

  DroneAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/public",
    urlTemplate: '{+namespace}/drones'
  });

  exports['default'] = DroneAdapter;
});
define('pilots/adapters/image', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var ImageAdapter;

  ImageAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots",
    urlTemplate: '{+namespace}/missions/{missionId}/images{/id}',
    urlSegments: {
      missionId: function missionId(type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports['default'] = ImageAdapter;
});
define('pilots/adapters/license', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var LicenseAdapter;

  LicenseAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/public",
    urlTemplate: '{+namespace}/licenses'
  });

  exports['default'] = LicenseAdapter;
});
define('pilots/adapters/location', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var LocationAdapter;

  LocationAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: _pilotsConfigEnvironment['default'].api.namespace + '/pilots'
  });

  exports['default'] = LocationAdapter;
});
define('pilots/adapters/mission-reschedule', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var MissionRescheduleAdapter;

  MissionRescheduleAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots",
    urlTemplate: '{+namespace}/missions/{missionId}/schedule{/id}',
    urlSegments: {
      missionId: function missionId(type, id, snaphot, query) {
        return snaphot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports['default'] = MissionRescheduleAdapter;
});
define('pilots/adapters/mission', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var MissionAdapter;

  MissionAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: 'v2/pilots',
    deleteRecord: function deleteRecord(store, type, snapshot) {
      var id;
      id = snapshot.id;
      return this.ajax(_pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + id + "/invitation", "DELETE");
    },
    handleResponse: function handleResponse(status, headers, payload, requestData) {
      if (requestData.method === 'DELETE') {
        status = 204;
        payload = {};
        payload.meta = {};
        payload.meta.success = true;
        headers = {};
      }
      return this._super(status, headers, payload, requestData);
    }
  });

  exports['default'] = MissionAdapter;
});
define('pilots/adapters/notification', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var NotificationAdapter;

  NotificationAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: _pilotsConfigEnvironment['default'].api.namespace + '/pilots'
  });

  exports['default'] = NotificationAdapter;
});
define('pilots/adapters/pilot-device', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var PilotDeviceAdapter;

  PilotDeviceAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: 'v1/pilots'
  });

  exports['default'] = PilotDeviceAdapter;
});
define('pilots/adapters/pilot-drone-camera', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var PilotDroneCameraAdapter;

  PilotDroneCameraAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots/pilot_drones",
    urlTemplate: '{+namespace}/{pilotDroneId}/cameras',
    urlSegments: {
      pilotDroneId: function pilotDroneId(type, id, snapshot, query) {
        return snapshot.belongsTo('pilotDrone', {
          id: true
        });
      },
      droneCameraId: function droneCameraId(type, id, snapshot, query) {
        return snapshot.belongsTo('camera', {
          id: true
        });
      }
    }
  });

  exports['default'] = PilotDroneCameraAdapter;
});
define('pilots/adapters/pilot-drone', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var PilotDroneAdapter;

  PilotDroneAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: 'v1/pilots'
  });

  exports['default'] = PilotDroneAdapter;
});
define('pilots/adapters/pilot-equipment', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var PilotEquipmentAdapter;

  PilotEquipmentAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/public",
    urlTemplate: '{+namespace}/pilot_equipment'
  });

  exports['default'] = PilotEquipmentAdapter;
});
define('pilots/adapters/pilot-license', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var PilotLicenseAdapter;

  PilotLicenseAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: 'v1/pilots'
  });

  exports['default'] = PilotLicenseAdapter;
});
define('pilots/adapters/pilot-pilot-equipment', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var PilotPilotEquipmentAdapter;

  PilotPilotEquipmentAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: 'v1/pilots'
  });

  exports['default'] = PilotPilotEquipmentAdapter;
});
define('pilots/adapters/pilot', ['exports', 'pilots/adapters/application'], function (exports, _pilotsAdaptersApplication) {
  var PilotAdapter;

  PilotAdapter = _pilotsAdaptersApplication['default'].extend({
    accountUrl: function accountUrl() {
      return this.urlPrefix() + "/pilots/account";
    },
    updateRecord: function updateRecord(store, type, snapshot) {
      var data, serializer;
      data = {};
      serializer = store.serializerFor(type.modelName);
      serializer.serializeIntoHash(data, type, snapshot);
      return this.ajax(this.accountUrl(), 'PATCH', {
        data: data
      });
    },
    findRecord: function findRecord() {
      return this.ajax(this.accountUrl(), 'GET');
    }
  });

  exports['default'] = PilotAdapter;
});
define('pilots/adapters/reschedule-reason', ['exports', 'pilots/adapters/application', 'pilots/config/environment'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment) {
  var RescheduleReasonAdapter;

  RescheduleReasonAdapter = _pilotsAdaptersApplication['default'].extend({
    namespace: _pilotsConfigEnvironment['default'].api.namespace + '/pilots'
  });

  exports['default'] = RescheduleReasonAdapter;
});
define('pilots/adapters/shot', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var ShotAdapter;

  ShotAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots",
    urlTemplate: '{+namespace}/missions/{missionId}/shots{/id}',
    urlSegments: {
      missionId: function missionId(type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports['default'] = ShotAdapter;
});
define('pilots/adapters/video', ['exports', 'pilots/adapters/application', 'pilots/config/environment', 'ember-data-url-templates'], function (exports, _pilotsAdaptersApplication, _pilotsConfigEnvironment, _emberDataUrlTemplates) {
  var VideoAdapter;

  VideoAdapter = _pilotsAdaptersApplication['default'].extend(_emberDataUrlTemplates['default'], {
    namespace: _pilotsConfigEnvironment['default'].api.host + "/" + _pilotsConfigEnvironment['default'].api.namespace + "/pilots",
    urlTemplate: '{+namespace}/missions/{missionId}/videos{/id}',
    urlSegments: {
      missionId: function missionId(type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports['default'] = VideoAdapter;
});
define('pilots/app', ['exports', 'ember', 'pilots/resolver', 'ember-load-initializers', 'pilots/config/environment', 'accounting/format-money'], function (exports, _ember, _pilotsResolver, _emberLoadInitializers, _pilotsConfigEnvironment, _accountingFormatMoney) {
  var App;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  _ember['default'].$.ajaxSetup({
    headers: {
      'X-API-TOKEN': _pilotsConfigEnvironment['default'].api.app_token
    }
  });

  App = _ember['default'].Application.extend({
    modulePrefix: _pilotsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pilotsConfigEnvironment['default'].podModulePrefix,
    Resolver: _pilotsResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _pilotsConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('pilots/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise', 'pilots/config/environment'], function (exports, _emberSimpleAuthAuthenticatorsDevise, _pilotsConfigEnvironment) {
  var DeviseAuthenticator;

  DeviseAuthenticator = _emberSimpleAuthAuthenticatorsDevise['default'].extend({
    serverTokenEndpoint: _pilotsConfigEnvironment['default'].api.host + '/v1/authenticate',
    resourceName: 'pilot',
    makeRequest: function makeRequest(data, options) {
      if (options == null) {
        options = {};
      }
      Ember.merge(options, {
        data: data,
        headers: {
          'X-API-TOKEN': _pilotsConfigEnvironment['default'].api.app_token,
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      });
      return this._super(data, options);
    }
  });

  exports['default'] = DeviseAuthenticator;
});
define('pilots/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, _emberSimpleAuthAuthorizersDevise) {
  var DeviseAuthorizer;

  DeviseAuthorizer = _emberSimpleAuthAuthorizersDevise['default'].extend();

  exports['default'] = DeviseAuthorizer;
});
define('pilots/components/active-mission-summary-panel', ['exports', 'ember'], function (exports, _ember) {
  var ActiveMissionSummaryPanelComponent;

  ActiveMissionSummaryPanelComponent = _ember['default'].Component.extend({
    showWeatherDisplay: _ember['default'].computed('showWeather', function () {
      return this.get('showWeather');
    }),
    actions: {
      showWeather: function showWeather() {
        return this.set('showWeather', !this.get('showWeather'));
      },
      selectMission: function selectMission(mission) {
        return this.sendAction('action', mission);
      }
    }
  });

  exports['default'] = ActiveMissionSummaryPanelComponent;
});
define('pilots/components/address-lookup', ['exports', 'ember'], function (exports, _ember) {
  var AddressLookupComponent;

  AddressLookupComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return this.setupAutocomplete();
    },
    setupAutocomplete: function setupAutocomplete() {
      var autocomplete, input;
      input = this.$('input')[0];
      autocomplete = new google.maps.places.SearchBox(input);
      google.maps.event.addDomListener(input, 'keydown', function (e) {
        if (e.keyCode === 13) {
          return e.preventDefault();
        }
      });
      return autocomplete.addListener('places_changed', (function (_this) {
        return function () {
          var address_components, city, place;
          place = autocomplete.getPlaces()[0];
          if (!(place && place.geometry)) {
            _this.set('changeset.longitude', null);
            _this.set('changeset.latitude', null);
            _this.set('error', 'Not a valid address. Please try again.');
            _this.set('showError', true);
            return;
          }
          address_components = {};
          Em.$.each(place.address_components, function (k, v1) {
            Em.$.each(v1.types, function (k2, v2) {
              address_components[v2] = v1;
            });
          });
          if (address_components.street_number && address_components.route) {
            _this.set('changeset.address', address_components.street_number.long_name + " " + address_components.route.long_name);
          } else if (address_components.route) {
            _this.set('changeset.address', address_components.route.long_name);
          } else {
            _this.set('changeset.address', null);
          }
          if (city = address_components.locality || address_components.administrative_area_level_3 || address_components.neighborhood) {
            _this.set('changeset.city', city.long_name);
          } else {
            _this.set('changeset.city', null);
          }
          if (address_components.administrative_area_level_1) {
            _this.set('changeset.state', address_components.administrative_area_level_1.long_name);
          } else {
            _this.set('changeset.state', null);
          }
          if (address_components.country) {
            _this.set('changeset.country', address_components.country.short_name);
          } else {
            _this.set('changeset.country', null);
          }
          if (address_components.postal_code) {
            _this.set('changeset.postal_code', address_components.postal_code.long_name);
          } else {
            _this.set('changeset.postal_code', null);
          }
          _this.set('changeset.longitude', place.geometry.location.lng());
          return _this.set('changeset.latitude', place.geometry.location.lat());
        };
      })(this));
    },
    actions: {
      showError: function showError() {
        return this.set('showError', true);
      }
    }
  });

  exports['default'] = AddressLookupComponent;
});
define('pilots/components/asset-uploader', ['exports', 'ember', 'pilots/utils/w', 'pilots/config/environment'], function (exports, _ember, _pilotsUtilsW, _pilotsConfigEnvironment) {
  var AssetUploaderComponent;

  AssetUploaderComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    fileProgress: 0,
    showNativeThumbnail: true,
    filesUploaded: 0,
    inProgress: (function () {
      var file, filesUploaded, i, len, progress, queue, ref, uploaded, uploader;
      progress = this.get('queue.progress');
      filesUploaded = 0;
      queue = this.get('queue');
      if (queue) {
        uploader = queue.get('uploader');
        ref = uploader.files;
        for (i = 0, len = ref.length; i < len; i++) {
          file = ref[i];
          if (file.percent > 0) {
            filesUploaded++;
          }
        }
        if (filesUploaded > queue.numFilesUploading) {
          filesUploaded = filesUploaded - (uploader.files.length - queue.numFilesUploading);
        }
        this.set('filesUploaded', filesUploaded);
        this.set('numFilesUploading', queue.numFilesUploading);
      }
      if (!progress || progress <= 0) {
        progress = 0;
      }
      if (progress >= 100) {
        progress = 100;
        this.set('numFilesUploading', 0);
        queue.clearNumUploading();
        this.set('filesUploaded', 0);
      }
      this.set('uploadProgress', progress);
      uploaded = this.get('fileSize') * progress / 100.0;
      if (uploaded) {
        return this.set('fileProgress', filesize(uploaded, {
          'base': 10,
          'round': 0
        }));
      }
    }).observes('queue.progress'),
    startUploading: (function () {
      var queue, uploader, uploadsQueued;
      uploadsQueued = this.get('queue.uploadsQueued');
      if (uploadsQueued) {
        queue = this.get('queue');
        uploader = queue.get('uploader');
        this.set('numFilesUploading', uploader.files.length);
        if (uploader.files.length > 100) {
          this.set('listView', true);
        }
        return Em.run.later(function () {
          return uploader.start();
        });
      }
    }).observes('queue.uploadsQueued'),
    shotId: (function () {
      if (this.get('queue')) {
        return this.get('queue').set('shot_id', this.get('shot_id'));
      }
    }).observes('shot_id'),
    showInstructions: _ember['default'].computed('queue.content.length', 'images.length', 'videos.length', function () {
      return this.get('queue.content.length') === 0 && this.get('images.length') === 0 && this.get('videos.length') === 0;
    }),
    queueLookup: _ember['default'].inject.service('upload-queue-manager'),
    runtimes: (0, _pilotsUtilsW['default'])(['html5', 'html4']),
    extensions: (0, _pilotsUtilsW['default'])(),
    'max-file-size': 0,
    'no-duplicates': true,
    multiple: true,
    classNames: ['asset-uploader'],
    onfileadd: null,
    onerror: null,
    config: _ember['default'].computed(function () {
      var config, filters;
      config = {
        url: true,
        browse_button: "uploader" + (this.get('shot_type') || ''),
        filters: {
          max_file_size: this.get('max-file-size'),
          prevent_duplicates: this.get('no-duplicates')
        },
        multi_selection: this.get('multiple'),
        runtimes: this.get('runtimes').join(','),
        container: this.get('elementId'),
        uploadCount: this.get('uploadedCount')
      };
      filters = this.get('fileFilters') || {};
      Object.keys(filters).forEach(function (filter) {
        if (this.get(filter)) {
          return config.filters[filter] = this.get(filter);
        }
      });
      if (this.get('extensions.length')) {
        config.filters.mime_types = [{
          extensions: this.get('extensions').map(function (ext) {
            return ext.toLowerCase();
          }).join(',')
        }];
      }
      return config;
    }),
    didInsertElement: function didInsertElement() {
      this._super();
      return _ember['default'].run.scheduleOnce('afterRender', this, 'attachUploadQueue');
    },
    attachUploadQueue: function attachUploadQueue() {
      var queue, queueLookup, queueName;
      queueLookup = this.get('queueLookup');
      if (this.get('shot_type')) {
        queueName = this.get('shot_type');
        this.get('mission.shots').forEach((function (_this) {
          return function (shot) {
            if (shot.get('shot_type.slug') === _this.get('shot_type')) {
              return _this.set('shot_id', shot.get('id'));
            }
          };
        })(this));
      } else {
        queueName = 'uploader';
      }
      queue = queueLookup.findOrCreate(queueName, this, this.get('config'));
      this.initDragDrop();
      return this.set('queue', queue);
    },
    destroyUploadQueue: _ember['default'].on('willDestroyElement', function () {
      var queue;
      queue = this.get('queue');
      if (queue) {
        queue.uploader.destroy();
        return this.set('queue', null);
      }
    }),
    addAsset: function addAsset(file, not_used, model) {
      return this.sendAction('onfileadd', file, this.get('shot_id'), model);
    },
    initDragDrop: function initDragDrop(target) {
      var elementName, uploadElement;
      elementName = target || this.get('shot_type') || 'upload-target';
      elementName = "." + elementName;
      uploadElement = $(elementName);
      return uploadElement.on('drag dragend dragover dragenter dragleave drop', function (e) {
        e.preventDefault();
        return e.stopPropagation();
      }).on('dragover dragenter', function (e) {
        if (e.dataTransfer.types.length !== 3) {
          return uploadElement.addClass('is-dragover');
        }
      }).on('dragleave dragend drop', function () {
        return uploadElement.removeClass('is-dragover');
      }).on('drop', (function (_this) {
        return function (e) {
          return _this.addFilesAndUpload(e.originalEvent.dataTransfer.files);
        };
      })(this));
    },
    addFilesAndUpload: function addFilesAndUpload(droppedFiles) {
      var file, i, len, queue, results, uploader;
      queue = this.get('queue');
      uploader = queue.get('uploader');
      uploader.bind('FilesAdded', _ember['default'].run.bind(this, 'afterFilesAdded'));
      results = [];
      for (i = 0, len = droppedFiles.length; i < len; i++) {
        file = droppedFiles[i];
        results.push(uploader.addFile(file));
      }
      return results;
    },
    afterFilesAdded: function afterFilesAdded() {
      return Em.run.later((function (_this) {
        return function () {
          var queue, uploader;
          queue = _this.get('queue');
          uploader = queue.get('uploader');
          return uploader.start();
        };
      })(this));
    },
    uploadsComplete: function uploadsComplete() {
      var confirm;
      confirm = window.confirm('Have you uploaded all assets for this mission?');
      if (!confirm) {
        return;
      }
      return this.updateStatus('assets_uploaded');
    },
    updateStatus: function updateStatus(newStatus, callback) {
      var _mission, _this, headers;
      _this = this;
      _mission = this.get('mission');
      this.set('mission.status', newStatus);
      headers = this.get('sessionAccount.headers');
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + _mission.id + "/status/" + newStatus,
        type: 'PATCH',
        dataType: 'json',
        headers: headers
      }).then(function (response) {
        _mission.reload();
        if (callback) {
          callback.call();
        }
        return console.log('success');
      }, function (response) {
        return console.log('fail');
      });
    },
    deselectAll: function deselectAll() {},
    actions: {
      uploadsComplete: function uploadsComplete() {
        return this.uploadsComplete();
      },
      startUpload: function startUpload(uploader) {
        return this.sendAction('onstartupload', uploader);
      },
      addAsset: function addAsset(file, shot_id, model) {
        return this.sendAction('onfileadd', file, shot_id, model);
      }
    }
  });

  exports['default'] = AssetUploaderComponent;
});
define('pilots/components/available-mission', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var AvailableMissionComponent;

  AvailableMissionComponent = _ember['default'].Component.extend({
    tagName: '',
    acceptedModal: false,
    declineModal: false,
    scheduleTitle: _ember['default'].computed('model.mission.admin_scheduled', function () {
      if (this.get('model.mission.admin_scheduled')) {
        return 'Accept Mission';
      } else {
        return 'Schedule Mission';
      }
    }),
    initAvailableMission: _ember['default'].on('init', function () {
      if (this.get('model.mission').get('laanc_exemptions') && this.get('model.mission').get('laanc_exemptions').get('firstObject')) {
        return this.set('LAANCExemption', this.get('model.mission').get('laanc_exemptions').get('firstObject'));
      }
    }),
    didInsertElement: function didInsertElement() {
      $("#mobileAcceptDenyFixedButton").click(function () {
        return $(this).hide().slideUp(1000, function () {
          return $('html, body').animate({
            scrollTop: $("#missionScheduleBox").offset().top
          }, 1000);
        });
      });
      return window.onscroll = function (event) {
        if (document.body.scrollTop === 0) {
          return $("#mobileAcceptDenyFixedButton").show();
        }
      };
    },
    actions: {
      accept: function accept() {
        return this.set('acceptedModal', true);
      },
      closeAcceptedModal: function closeAcceptedModal() {
        return this.set('acceptedModal', false);
      },
      confirmAccepted: function confirmAccepted(mission) {
        return this.sendAction('acceptMission', mission);
      },
      confirmDeclined: function confirmDeclined(mission) {
        return this.sendAction('declineMission', mission, this);
      },
      decline: function decline(mission) {
        return this.set('declineModal', true);
      },
      closeDeclinedModal: function closeDeclinedModal() {
        return this.set('declineModal', false);
      },
      scrollToMissionScheduling: function scrollToMissionScheduling() {}
    }
  });

  exports['default'] = AvailableMissionComponent;
});
define('pilots/components/bulk-upload', ['exports', 'ember', 'pilots/utils/w', 'pilots/config/environment', 'pilots/mixins/s3-asset-uploads', 'pilots/utils/uploader/file_proxy'], function (exports, _ember, _pilotsUtilsW, _pilotsConfigEnvironment, _pilotsMixinsS3AssetUploads, _pilotsUtilsUploaderFile_proxy) {
  var BulkUploadComponent;

  BulkUploadComponent = _ember['default'].Component.extend(_pilotsMixinsS3AssetUploads['default'], {
    store: _ember['default'].inject.service(),
    queueLookup: _ember['default'].inject.service('upload-queue-manager'),
    classNames: 'bulk-upload',
    shot_id: null,
    fileProgress: 0,
    showNativeThumbnail: false,
    uploading: false,
    filesUploaded: 0,
    filesSelected: 0,
    timeRemaningIndex: 0,
    previousUploadTime: null,
    timeRemaining: null,
    autoSubmitMission: false,
    finishingUp: false,
    filtering: false,
    cancelled: false,
    cancelBtn: 'CANCEL',
    onlyOneEmptyShot: false,
    filteringFiles: _ember['default'].observer('queue.filteringFiles', function () {
      return this.set('filtering', this.get('queue.filteringFiles'));
    }),
    autoSubmitCheckboxSvg: _ember['default'].computed('autoSubmitMission', function () {
      if (this.get('autoSubmitMission')) {
        return 'selected';
      } else {
        return 'unselected';
      }
    }),
    updateOnlyOneEmptyShot: _ember['default'].observer('shot_id', function () {
      var empty;
      empty = 0;
      this.get('mission.pilotShots').forEach((function (_this) {
        return function (shot) {
          if (!shot.get('images.length') && !shot.get('videos.length') && _this.get('shot_id') !== shot.id) {
            return empty = empty + 1;
          }
        };
      })(this));
      if (empty < 1) {
        return this.set('onlyOneEmptyShot', true);
      } else {
        this.set('onlyOneEmptyShot', false);
        return this.set('autoSubmitMission', false);
      }
    }),
    runtimes: (0, _pilotsUtilsW['default'])(['html5', 'html4']),
    extensions: (0, _pilotsUtilsW['default'])(),
    'max-file-size': 0,
    'no-duplicates': true,
    inProgress: _ember['default'].observer('queue.progress', function () {
      var file, filesUploaded, i, len, progress, queue, ref, timeRemaingingInMin, timeUploadingInMin, uploader;
      if (this.get('cancelled')) {
        return;
      }
      queue = this.get('queue');
      progress = queue.get('progress');
      uploader = queue.get('uploader');
      filesUploaded = 0;
      if (progress >= 100) {
        progress = 100;
        queue.clearNumUploading();
        if (this.get('autoSubmitMission') && uploader.total.queued === 0) {
          this.set('finishingUp', true);
          this.set('finishingUpText', 'Uploading done. Updating mission...');
          if (this.get('mission.status') === 'assets_uploaded') {
            this.updateStatusAndReload('assets_classified').then((function (_this) {
              return function () {
                return _this.sendAction('toggleBulkUploaderModalAction');
              };
            })(this));
          } else if (this.get('mission.status') === 'flight_complete') {
            this.updateStatusAndReload('assets_uploaded').then((function (_this) {
              return function () {
                return _this.updateStatusAndReload('assets_classified').then(function () {
                  return _this.sendAction('toggleBulkUploaderModalAction');
                });
              };
            })(this));
          } else if (this.get('mission.status') === 'pilot_accepted') {
            this.updateStatusAndReload('flight_complete').then((function (_this) {
              return function () {
                return _this.updateStatusAndReload('assets_uploaded').then(function () {
                  return _this.updateStatusAndReload('assets_classified').then(function () {
                    return _this.sendAction('toggleBulkUploaderModalAction');
                  });
                });
              };
            })(this));
          } else {
            console.error("Incorrect status: " + this.get('mission.status'));
          }
        } else if (uploader.total.queued === 0) {
          this.set('finishingUp', true);
          this.set('finishingUpText', 'Updating mission...');
          this.sendAction('toggleBulkUploaderModalAction');
        }
      }
      ref = uploader.files;
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        if (file.percent > 0) {
          filesUploaded++;
        }
      }
      if (filesUploaded > queue.numFilesUploading) {
        filesUploaded = filesUploaded - (uploader.files.length - queue.numFilesUploading);
      }
      this.set('filesUploaded', filesUploaded);
      this.set('numFilesUploading', queue.numFilesUploading);
      if (!progress || progress <= 0) {
        progress = 0;
      }
      this.set('uploadProgress', progress);
      if (filesUploaded !== this.get('timeRemaningIndex') && queue.numFilesUploading > 10) {
        if (!this.get('previousUploadTime')) {
          this.set('previousUploadTime', Date.now());
        }
        if (filesUploaded % 5 === 0) {
          this.set('timeRemaningIndex', filesUploaded);
          timeUploadingInMin = Math.abs(Date.now() - this.get('previousUploadTime')) / 1000 / 60 / 5;
          timeRemaingingInMin = Math.ceil(timeUploadingInMin * (queue.numFilesUploading - filesUploaded));
          if (!this.get('timeRemaining') || timeRemaingingInMin < this.get('timeRemaining')) {
            this.set('timeRemaining', timeRemaingingInMin);
          }
          return this.set('previousUploadTime', Date.now());
        }
      }
    }),
    config: _ember['default'].computed(function () {
      var config, filters;
      config = {
        disableAutoUpload: true,
        url: true,
        browse_button: "bulk-uploader",
        filters: {
          max_file_size: this.get('max-file-size'),
          prevent_duplicates: this.get('no-duplicates')
        },
        multi_selection: true,
        runtimes: this.get('runtimes').join(','),
        container: this.get('elementId'),
        uploadCount: this.get('uploadedCount')
      };
      filters = this.get('fileFilters') || {};
      Object.keys(filters).forEach(function (filter) {
        if (this.get(filter)) {
          return config.filters[filter] = this.get(filter);
        }
      });
      if (this.get('extensions.length')) {
        config.filters.mime_types = [{
          extensions: this.get('extensions').map(function (ext) {
            return ext.toLowerCase();
          }).join(',')
        }];
      }
      return config;
    }),
    didInsertElement: function didInsertElement() {
      this._super();
      return _ember['default'].run.scheduleOnce('afterRender', this, 'attachUploadQueue');
    },
    attachUploadQueue: function attachUploadQueue() {
      var queue, queueLookup, queueName;
      queueLookup = this.get('queueLookup');
      queueName = 'bulk-uploader';
      queue = queueLookup.findOrCreate(queueName, this, this.get('config'));
      this.set('queue', queue);
      return this.$('#bulk-uploader').hide();
    },
    uploadsQueue: (function () {
      var queue, uploader, uploadsQueued;
      uploadsQueued = this.get('queue.uploadsQueued');
      if (uploadsQueued) {
        queue = this.get('queue');
        uploader = queue.get('uploader');
        this.set('filesSelected', uploader.files.length);
        if (this.get('filesSelected')) {
          return $('.moxie-shim').hide();
        }
      }
    }).observes('queue.uploadsQueued'),
    startUploader: function startUploader() {
      var queue, uploader;
      queue = this.get('queue');
      uploader = queue.get('uploader');
      return Em.run.later(function () {
        console.log('uploader started');
        return uploader.start();
      });
    },
    addAsset: function addAsset(file, shot_id, mission) {
      return this.send('addAsset', file, shot_id, mission);
    },
    updateStatusAndReload: function updateStatusAndReload(newStatus) {
      return new Promise((function (_this) {
        return function (resolve, reject) {
          return _ember['default'].$.ajax({
            url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + _this.get('mission.id') + "/status/" + newStatus,
            type: 'PATCH',
            dataType: 'json',
            headers: _this.get('sessionAccount.headers')
          }).then(function (response) {
            return resolve();
          }, function (response) {
            return reject(console.log("failed to update status: " + newStatus));
          });
        };
      })(this));
    },
    actions: {
      setShotId: function setShotId(id) {
        if (id) {
          this.set('shot_id', id);
          return this.$('#bulk-uploader').show();
        } else {
          this.set('shot_id', false);
          return this.$('#bulk-uploader').hide();
        }
      },
      cancel: function cancel() {
        this.set('cancelBtn', 'CANCELING...');
        this.set('cancelled', true);
        this.get('queue.uploader').stop();
        this.get('queue').clearNumUploading();
        return this.sendAction('toggleBulkUploaderModalAction');
      },
      addAsset: function addAsset(file, shot_id, model) {
        return this.sendAction('addAssetAction', file, shot_id, model);
      },
      upload: function upload() {
        var queue;
        this.set('uploading', true);
        queue = this.get('queue');
        queue.forEach((function (_this) {
          return function (filep) {
            filep.shot_id = _this.get('shot_id');
            return _this.addAsset(filep, _this.get('shot_id'), _this.get('mission'));
          };
        })(this));
        return this.startUploader();
      },
      toggleAutoSubmit: function toggleAutoSubmit(src, event) {
        return this.toggleProperty('autoSubmitMission');
      }
    }
  });

  exports['default'] = BulkUploadComponent;
});
define('pilots/components/client-mission-uploader', ['exports', 'ember', 'pilots/config/environment', 'pilots/components/asset-uploader'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsComponentsAssetUploader) {
  var ClientMissionUploader,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  ClientMissionUploader = _pilotsComponentsAssetUploader['default'].extend({
    sessionAccount: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    lastShotListWidth: 0,
    lastAssetLeft: 0,
    currentImages: _ember['default'].computed('currentShot', 'mission.unassignedImages.[]', function () {
      if (this.get('currentShot') === 'allAssets') {
        return this.get('mission.images').sortBy('uploadNumber');
      }
      if (this.get('currentShot') === 'unassignedAssets') {
        return this.get('mission.unassignedImages').sortBy('uploadNumber');
      }
      return this.get('currentShot.images').sortBy('uploadNumber');
    }),
    currentVideos: _ember['default'].computed('currentShot', 'mission.unassignedVideos.[]', function () {
      if (this.get('currentShot') === 'allAssets') {
        return this.get('mission.videos').sortBy('uploadNumber');
      }
      if (this.get('currentShot') === 'unassignedAssets') {
        return this.get('mission.unassignedVideos').sortBy('uploadNumber');
      }
      return this.get('currentShot.videos').sortBy('uploadNumber');
    }),
    currentAssets: _ember['default'].computed.union('currentImages', 'currentVideos'),
    showInstructions: _ember['default'].computed('currentAssets.length', function () {
      return this.get('currentAssets.length') === 0;
    }),
    readyToSubmit: _ember['default'].computed('mission.pilotShots.@each.readyToSubmit', 'mission.unassignedAssetsCount', function () {
      var ready;
      ready = true;
      this.get('mission.pilotShots').forEach(function (shot) {
        return ready = ready && shot.get('readyToSubmit');
      });
      return ready && this.get('mission.unassignedAssetsCount') === 0;
    }),
    didInsertElement: function didInsertElement() {
      this._super();
      this.initAddShotDropdown();
      return this.initShotListScroll();
    },
    cleanup: _ember['default'].on('willDestroyElement', function () {
      $(window).off('scroll');
      _ember['default'].run.cancel(this._addShot);
      return _ember['default'].run.cancel(this._deselectAll);
    }),
    initShotListScroll: function initShotListScroll() {
      var assets, shotList, win;
      win = $(window);
      shotList = $('.shot-list');
      assets = $('.assets');
      return win.scroll((function (_this) {
        return function () {
          if (win.scrollTop() > assets.offset().top - 20) {
            if (_this.get('lastShotListWidth') === 0) {
              _this.set('lastShotListWidth', shotList.width());
              _this.set('lastAssetLeft', assets.offset().left);
            }
            shotList.css({
              position: 'fixed',
              top: '20px',
              width: _this.get('lastShotListWidth')
            });
            return assets.css({
              marginLeft: _this.get('lastShotListWidth') + 4
            });
          } else {
            _this.set('lastShotListWidth', 0);
            _this.set('lastAssetLeft', 0);
            shotList.css({
              position: 'relative',
              top: ''
            });
            return assets.css({
              marginLeft: ''
            });
          }
        };
      })(this));
    },
    initAddShotDropdown: function initAddShotDropdown() {
      return this.get('store').findAll('shot_type').then((function (_this) {
        return function (shotTypes) {
          var validShotTypes;
          validShotTypes = ['9', '3', '4', '8', '11', '19', '23', '10', '1', '2', '7'];
          shotTypes = shotTypes.filter(function (item, index, self) {
            var ref;
            if ((ref = item.id, indexOf.call(validShotTypes, ref) >= 0)) {
              return true;
            }
          });
          _this.set('shotTypes', shotTypes);
          return _this._addShot = _ember['default'].run.later(function () {
            $('.add-shot').niceSelect().change(function () {
              var shotTypeId;
              shotTypeId = $('.add-shot').val();
              return _this.addCustomShot(shotTypeId);
            });
            return $('.add-shot').on('click', function (e) {
              return setTimeout(function () {
                var shotList;
                shotList = $('.shot-list');
                return shotList.scrollTop(99999999);
              }, 300);
            });
          });
        };
      })(this));
    },
    addCustomShot: function addCustomShot(shotTypeId) {
      var newShot, shotType;
      if (shotTypeId === '-1') {
        return;
      }
      shotType = this.get('store').peekRecord('shot-type', parseInt(shotTypeId));
      newShot = this.get('mission').get('shots').createRecord({
        shot_type: shotType
      });
      newShot.set('isDeletable', true);
      newShot.save().then(function (response) {}, function (response) {
        this.get('mission').reload();
        return alert('There was an issue creating this shot.');
      });
      return $('.add-shot').val('-1').niceSelect('update');
    },
    selectedAssets: function selectedAssets() {
      var asset, i, len, ref, selected;
      selected = [];
      ref = this.get('currentAssets');
      for (i = 0, len = ref.length; i < len; i++) {
        asset = ref[i];
        if (asset.get('isSelected')) {
          selected.push(asset);
        }
      }
      this.set('selectedCount', selected.length);
      return selected;
    },
    mouseDown: function mouseDown(e) {
      var asset, assetId, assetWrapperArr, previouslySelectedAssetId;
      assetWrapperArr = $(e.target).closest('.asset-wrapper');
      if (assetWrapperArr.length === 0) {
        return;
      }
      assetId = $(assetWrapperArr[0]).data('asset-id');
      if (!assetId || assetId === '') {
        return;
      }
      asset = this.get('mission.allAssets').filterBy('id', assetId);
      previouslySelectedAssetId = this.get('previouslySelectedAssetId');
      if (e.shiftKey && previouslySelectedAssetId && assetId !== previouslySelectedAssetId) {
        this.toggleRange(previouslySelectedAssetId, assetId);
      } else {
        this.toggleElementSelection(asset[0]);
      }
      return this.set('previouslySelectedAssetId', assetId);
    },
    toggleRange: function toggleRange(assetId1, assetId2) {
      var asset, i, inSelectedRange, len, ref;
      inSelectedRange = false;
      ref = this.get('currentAssets');
      for (i = 0, len = ref.length; i < len; i++) {
        asset = ref[i];
        if (asset.id === assetId1 || asset.id === assetId2) {
          inSelectedRange = !inSelectedRange;
          asset.set('isSelected', true);
        }
        if (inSelectedRange) {
          asset.set('isSelected', true);
        }
      }
      return this.selectedAssets();
    },
    toggleElementSelection: function toggleElementSelection(asset) {
      if (asset.get('isSelected')) {
        asset.set('isSelected', false);
      } else {
        asset.set('isSelected', true);
      }
      return this.selectedAssets();
    },
    deselectAll: function deselectAll() {
      var asset, i, len, ref;
      ref = this.get('mission.allAssets');
      for (i = 0, len = ref.length; i < len; i++) {
        asset = ref[i];
        asset.set('isSelected', false);
      }
      return this.selectedAssets();
    },
    addAsset: function addAsset(file) {
      var asset, fileType, model;
      model = this.get('mission');
      if (this.get('mission.status') !== 'assets_uploaded') {
        this.updateStatus('assets_uploaded');
      }
      fileType = file.get('type').match(/video|image/)[0];
      asset = this.get('store').createRecord(fileType, {
        id: file.get('id'),
        name: file.get('sanitizedName'),
        processing: true,
        generatingNativeThumbnail: this.get('showNativeThumbnail'),
        file: file,
        uploadNumber: file.uploadNumber
      });
      if (this.get('shot_id')) {
        asset.set('shot', model.get('shots').findBy('id', this.get('shot_id')));
      }
      model.get(fileType + 's').unshiftObject(asset);
      return this._super(file, null, model);
    },
    init: function init() {
      this._super();
      this.set('currentShot', 'unassignedAssets');
      this.set('unassignedAssets', true);
      this.set('commentButtonName', 'SAVE COMMENT');
      if (this.get('currentAssets').length > 100) {
        return this.set('listView', true);
      }
    },
    actions: {
      toggleModal: function toggleModal() {
        return this.sendAction('toggleModal');
      },
      deselectAll: function deselectAll() {
        return this.deselectAll();
      },
      assignAsset: function assignAsset(_asset, options) {
        var asset, assets, i, len, shot;
        assets = this.selectedAssets();
        shot = options.target.shot;
        if (!assets.contains(_asset)) {
          assets.push(_asset);
        }
        for (i = 0, len = assets.length; i < len; i++) {
          asset = assets[i];
          asset.set('shot', shot);
          if (asset.get('isNew')) {
            if (asset.get('hasProperId')) {
              asset.saveAsUpdate();
            } else {}
          } else {
            asset.save();
          }
        }
        return this.deselectAll();
      },
      clickShot: function clickShot(shot, options) {
        var name;
        this.set('currentShot', shot);
        if (this.get('currentAssets').length > 100) {
          this.set('listView', true);
        }
        if (shot === 'unassignedAssets') {
          this.set('unassignedAssets', true);
        } else {
          this.set('unassignedAssets', false);
        }
        $('.shot').removeClass('selected');
        if (shot.id) {
          name = 'shot-' + shot.id;
          this.set('shot_id', shot.id);
          $('#shot-comment').css('display', 'block');
        } else {
          name = shot;
          $('#shot-comment').css('display', 'none');
          this.set('shot_id', null);
        }
        $('#' + name).addClass('selected');
        return this.selectedAssets();
      },
      clickDraggable: function clickDraggable(asset) {
        return this.toggleElementSelection(asset);
      },
      saveComment: function saveComment(shot) {
        var _this;
        _this = this;
        this.set('commentButtonName', 'SAVING...');
        return this.get('currentShot').save().then(function (response) {
          _this.set('commentButtonName', 'SAVED');
          return setTimeout(function () {
            _this.set('commentButtonName', 'SAVE COMMENT');
          }, 4000);
        }, function (response) {
          return alert('There was an issue saving this comment');
        });
      },
      doneClassifying: function doneClassifying() {
        if (this.get('queue.uploader.total.queued') !== 0) {
          alert('Please wait for uploads to finish.');
          return;
        }
        if (!this.get('readyToSubmit')) {
          alert('Before moving to the next step, make sure that all images are assigned to a shot, and every shot has some images, or a comment, assigned to it.');
          $('.shot-list').removeClass('hide-notready');
          return;
        }
        return this.sendAction('doneClassifying');
      },
      deleteShot: function deleteShot(shot) {
        if (shot.get('images.length') || shot.get('videos.length')) {
          alert('Please remove assets from shot first.');
          return;
        }
        if (!confirm('Do you want to delete this shot?')) {
          return;
        }
        return shot.destroyRecord().then((function (_this) {
          return function () {
            _this.set('currentShot', 'unassignedAssets');
            return _this.set('unassignedAssets', true);
          };
        })(this));
      },
      deleteAsset: function deleteAsset(asset) {
        if (window.confirm('Are you sure? This will permanently remove this asset.')) {
          return asset.destroyRecord().then((function (_this) {
            return function (response) {
              alert('The asset was deleted successfully');
              return _this.deselectAll();
            };
          })(this), function (response) {
            return alert('There was an issue deleting this asset');
          });
        }
      },
      deleteAssets: function deleteAssets() {
        var targets;
        if (!confirm('Do you want to delete the selected assets?')) {
          return;
        }
        targets = [];
        this.selectedAssets().forEach(function (asset) {
          var item, type;
          if (asset._internalModel.modelName.includes('video')) {
            type = 'video';
          } else if (asset._internalModel.modelName.includes('image')) {
            type = 'image';
          } else {
            return;
          }
          item = {
            type: type,
            id: asset.get('id')
          };
          return targets.push(item);
        });
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('mission.id') + "/assets/delete_all",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            targets: targets
          }
        }).then((function (_this) {
          return function (response) {
            _this.get('mission').reload();
            return _this._deselectAll = _ember['default'].run.later(function () {
              return _this.deselectAll();
            });
          };
        })(this), function (response) {
          return alert('Sorry, there was an error while deleting these assets.');
        });
      },
      toggleListView: function toggleListView() {
        this.set('listView', !this.get('listView'));
        return this.toggleProperty('showNativeThumbnail');
      },
      toggleBulkUploaderModal: function toggleBulkUploaderModal() {
        this.set('showNativeThumbnail', false);
        this.set('listView', true);
        if (this.get('bulkUploadModal')) {
          return this.get('mission').reload().then((function (_this) {
            return function () {
              if (!_this.get('isDestroyed')) {
                return _this.toggleProperty('bulkUploadModal');
              }
            };
          })(this));
        } else {
          return this.toggleProperty('bulkUploadModal');
        }
      }
    }
  });

  exports['default'] = ClientMissionUploader;
});
define('pilots/components/client-mission', ['exports', 'ember', 'pilots/config/environment', 'pilots/utils/feature-manager'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsUtilsFeatureManager) {
  var ClientMissionComponent;

  ClientMissionComponent = _ember['default'].Component.extend({
    tagName: '',
    sessionAccount: _ember['default'].inject.service(),
    hideScheduling: true,
    callbackLink: window.location.origin + '/airmapcallback/',
    isShowingModal: false,
    readyToSubmit: _ember['default'].computed('model.mission.status', 'assetsClassified', function () {
      return this.get('model.mission.status') === 'assets_uploaded' && this.get('assetsClassified');
    }),
    initClientMission: _ember['default'].on('init', function () {
      if (this.get('model.mission').get('laanc_flights') && this.get('model.mission').get('laanc_flights').get('firstObject')) {
        this.set('LAANCAuth', this.get('model.mission').get('laanc_flights').get('firstObject').get('authorizations')[0]);
      }
      if (this.get('model.mission').get('laanc_exemptions') && this.get('model.mission').get('laanc_exemptions').get('firstObject')) {
        return this.set('LAANCExemption', this.get('model.mission').get('laanc_exemptions').get('firstObject'));
      }
    }),
    percentEncode: function percentEncode(string) {
      return string.replace(/#/g, "%23").replace(/\[/g, "%5B").replace(/]/g, "%5D").replace(/&/g, "%26").replace(/'/g, "%27").replace(/=/g, "%3D");
    },
    iosAuthLink: _ember['default'].computed('model.mission', function () {
      var link, stringDeep;
      link = this.get('model.mission.location').get('airmap_authorization') + "&callback_url=" + this.callbackLink + this.get('model.mission.id') + "?";
      stringDeep = "https://xjy5t.app.goo.gl/?link=" + this.percentEncode(link) + "&apn=com.airmap.airmap" + "&isi=1042824733" + "&ibi=com.airmap.AirMap" + "&ofl=https%3A%2F%2Fwww.airmap.com%2Fairspace-authorization%2F" + "&efr=1" + "&utm_source=partner" + "&utm_medium=deeplink" + "&utm_campaign=link" + "&utm_content=" + window.location.href + "&ct=laanc&mt=8&pt=117967485";
      return stringDeep;
    }),
    androidAuthLink: _ember['default'].computed('model.mission', function () {
      var link, stringDeep;
      link = this.get('model.mission.location').get('airmap_authorization') + "&callback_url=" + this.callbackLink + this.get('model.mission.id') + "?";
      stringDeep = "https://xjy5t.app.goo.gl/?link=" + this.percentEncode(link) + "&apn=com.airmap.airmap" + "&isi=1042824733" + "&ibi=com.airmap.AirMap" + "&ofl=https%3A%2F%2Fwww.airmap.com%2Fairspace-authorization%2F" + "&efr=1" + "&utm_source=partner" + "&utm_medium=deeplink" + "&utm_campaign=link" + "&utm_content=" + window.location.href;
      return stringDeep;
    }),
    showContactInfoColumn1: _ember['default'].computed('mode.mission', function () {
      return !!this.get('model.mission.onsite_contact.call_action') && this.get('model.mission.onsite_contact.call_action') !== 'Not needed';
    }),
    showContactInfoColumn2: _ember['default'].computed('mode.mission', function () {
      return this.get('model.mission.onsite_contact.note');
    }),
    showContactInfoDivider: _ember['default'].computed('model.mission', function () {
      return this.get('showContactInfoColumn1') && this.get('showContactInfoColumn2');
    }),
    showContactInfoBox: _ember['default'].computed(function () {
      return _pilotsUtilsFeatureManager['default'].FeatureManager.onsiteContactsEnabledPilot() && (this.get('showContactInfoColumn1') || this.get('showContactInfoColumn2'));
    }),
    updateStatus: function updateStatus(newStatus) {
      var _data, _mission, _this, headers;
      _this = this;
      _mission = this.get('model.mission');
      headers = this.get('sessionAccount.headers');
      _data = {
        pilot_comment: this.get('model.mission.pilot_comment')
      };
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + (_mission.id + "/status/" + newStatus),
        type: 'PATCH',
        dataType: 'json',
        headers: headers,
        data: _data
      }).then(function (response) {
        return _mission.reload();
      }, function (response) {
        return console.log('fail');
      });
    },
    actions: {
      toggleModal: function toggleModal() {
        return this.set('isShowingModal', !this.get('isShowingModal'));
      },
      toggleReSchedulingSuccess: function toggleReSchedulingSuccess() {
        this.set('isShowingRescheduleSuccessModal', !this.get('isShowingRescheduleSuccessModal'));
        if (this.get('isShowingRescheduleSuccessModal') === false) {
          this.set('showRescheduleReason', false);
          return this.set('showRescheduleNotes', false);
        }
      },
      toggleRescheduleReason: function toggleRescheduleReason() {
        return this.set('showRescheduleReason', !this.get('showRescheduleReason'));
      },
      doneClassifying: function doneClassifying() {
        return this.set('assetsClassified', true);
      },
      back: function back() {
        return this.set('assetsClassified', false);
      },
      addAsset: function addAsset(file, shot_id) {
        return this.sendAction('onfileadd', file, shot_id, this.get('model'));
      },
      startUpload: function startUpload(uploader) {
        return this.sendAction('onstartupload', uploader);
      },
      flightComplete: function flightComplete() {
        return this.updateStatus('flight_complete');
      },
      submitMission: function submitMission() {
        return this.updateStatus('assets_classified');
      },
      update: function update(mission) {
        this.set('hideScheduling', true);
        return this.sendAction('updateAction', mission);
      },
      reschedule: function reschedule() {
        return this.get('model.reschedule').save().then((function (_this) {
          return function () {
            _this.get('model.mission').reload();
            return _this.send('toggleReSchedulingSuccess');
          };
        })(this));
      },
      reSchedule: function reSchedule(mission) {
        if (mission.get('admin_scheduled')) {
          return;
        }
        mission = this.get('model.mission');
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission.id + "/schedule",
          type: 'PATCH',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            scheduled_at_start: mission.get('scheduled_at_start'),
            scheduled_at_end: mission.get('scheduled_at_end')
          }
        }).then(function (response) {
          return mission.reload();
        }, function (response) {});
      }
    }
  });

  exports['default'] = ClientMissionComponent;
});
define("pilots/components/content-backdrop", ["exports", "ember-side-menu/components/content-backdrop"], function (exports, _emberSideMenuComponentsContentBackdrop) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuComponentsContentBackdrop["default"];
    }
  });
});
define('pilots/components/daily-message', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var DailyMessageComponent;

  DailyMessageComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    initMessage: _ember['default'].on('init', function () {
      var _this;
      _this = this;
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/daily_messages/random",
        type: 'GET',
        dataType: 'json',
        headers: _this.get('sessionAccount.headers')
      }).then(function (response) {
        return _this.set('message', response.data.attributes.message);
      });
    })
  });

  exports['default'] = DailyMessageComponent;
});
define('pilots/components/dashboard-header', ['exports', 'ember'], function (exports, _ember) {
  var DashboardHeaderComponent;

  DashboardHeaderComponent = _ember['default'].Component.extend({
    classNames: ['container-top dashboard-header-wrap']
  });

  exports['default'] = DashboardHeaderComponent;
});
define('pilots/components/dashboard-infographic', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var DashboardInfographicComponent;

  DashboardInfographicComponent = _ember['default'].Component.extend({
    metrics: _ember['default'].inject.service(),
    tagName: '',
    showGetty: _pilotsConfigEnvironment['default'].SHOW_GETTY_PROMO,
    page0: _pilotsConfigEnvironment['default'].SHOW_GETTY_PROMO,
    minPanel: _pilotsConfigEnvironment['default'].SHOW_GETTY_PROMO ? 0 : 1,
    cookieName: _pilotsConfigEnvironment['default'].SHOW_GETTY_PROMO ? 'gettyPromo' : 'dashBoardInfographic',
    didInsertElement: function didInsertElement() {
      _ember['default'].run.scheduleOnce('render', this, function () {
        if (Cookies.get(this.get('cookieName'))) {
          return this.toggleHeight();
        } else {
          return Cookies.set(this.get('cookieName'), 'viewed');
        }
      });
      return _ember['default'].run.schedule('afterRender', this, function () {
        this.selectedPanel = this.get('minPanel');
        $('#get-on-getty-button').on('click', (function (_this) {
          return function (e) {
            return _this.get('metrics').trackEvent({
              category: 'Getty City',
              action: 'Get On Getty',
              label: 'How To Button'
            });
          };
        })(this));
        $('.left-arrow').on('click', (function (_this) {
          return function (e) {
            _this.slideLeft();
            return _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: 'Slide Infographic Left'
            });
          };
        })(this));
        $('.right-arrow').on('click', (function (_this) {
          return function (e) {
            _this.slideRight();
            return _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: 'Slide Infographic Right'
            });
          };
        })(this));
        return $('.collapse-arrow, .collapsed-title').on('click', (function (_this) {
          return function (e) {
            _this.toggleHeight();
            return _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: 'Toggle Infographic'
            });
          };
        })(this));
      });
    },
    toggleHeight: function toggleHeight() {
      $('.should-lower').toggleClass('lowered');
      $('.dashboard-infographic').toggleClass('collapsed');
      $('.collapse-arrow').toggleClass('icon-Arrow2_up icon-Arrow2_down');
      $('.row.bullets').toggleClass('hidden');
      $('.container.bullets').toggleClass('collapsed');
      $('.right-arrow, .left-arrow').toggleClass('collapsed');
      return $('.collapsed-title').toggleClass('expanded');
    },
    slideRight: function slideRight() {
      this.selectedPanel = Math.min(this.selectedPanel + 1, 2);
      return this.updatePanels();
    },
    slideLeft: function slideLeft() {
      this.selectedPanel = Math.max(this.selectedPanel - 1, this.get('minPanel'));
      return this.updatePanels();
    },
    updatePanels: function updatePanels() {
      $('.bullet-0').removeClass('selected');
      $('.bullet-1').removeClass('selected');
      $('.bullet-2').removeClass('selected');
      this.set('page0', false);
      this.set('page1', false);
      switch (this.selectedPanel) {
        case 0:
          $('.page0').removeClass('hidden-left hidden-right');
          $('.page1').addClass('hidden-right');
          $('.page2').addClass('hidden-right');
          $('.bullet-0').addClass('selected');
          return this.set('page0', true);
        case 1:
          $('.page0').addClass('hidden-left');
          $('.page2').addClass('hidden-right');
          $('.page1').removeClass('hidden-left hidden-right');
          $('.bullet-1').addClass('selected');
          return this.set('page1', true);
        case 2:
          $('.page0').addClass('hidden-left');
          $('.page1').addClass('hidden-left');
          $('.page2').removeClass('hidden-left hidden-right');
          return $('.bullet-2').addClass('selected');
      }
    }
  });

  exports['default'] = DashboardInfographicComponent;
});
define('pilots/components/dashboard-map-active-missions', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var DashboardMapActiveMissionsComponent;

  DashboardMapActiveMissionsComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    showGetty: _pilotsConfigEnvironment['default'].SHOW_GETTY_PROMO,
    sortedMissions: _ember['default'].computed('missions.[]', function () {
      return this.get('missions').sortBy('created_on').reverseObjects();
    }),
    didInsertElement: function didInsertElement() {
      return _ember['default'].run.schedule('afterRender', this, function () {
        this.selectedPanel = this.get('minPanel');
        return $('#getty-see-details-button').on('click', (function (_this) {
          return function (e) {
            return _this.get('metrics').trackEvent({
              category: 'Getty City',
              action: 'See Details',
              label: 'Mission Card'
            });
          };
        })(this));
      });
    },
    actions: {
      toggleMissionsPanel: function toggleMissionsPanel() {
        if (this.$('.mission-wrapper').css('display') === 'none') {
          this.$('.mission-wrapper').css('display', 'block');
          $('.active-missions-container').removeClass('shrink');
          return this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: "Show Active Missions Panel"
          });
        } else {
          this.$('.mission-wrapper').css('display', 'none');
          this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: "Hide Active Missions Panel"
          });
          return $('.active-missions-container').addClass('shrink');
        }
      },
      availableMission: function availableMission(mission) {
        return this.sendAction('availableMissionAction', mission);
      },
      declineAvailable: function declineAvailable(mission) {
        console.log('cancel ', mission.id);
        if (!confirm("Do you want to decline mission " + mission.id + "?")) {
          return;
        }
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission.id + "/status/decline",
          type: 'PATCH',
          dataType: 'json',
          headers: this.get('sessionAccount.headers')
        }).then((function (_this) {
          return function (response) {
            return _this.sendAction('declineAction', mission);
          };
        })(this), (function (_this) {
          return function (response) {
            return alert("Something went wrong. Please try again or contact: pilots@dronebase.com");
          };
        })(this));
      },
      cancelPano: function cancelPano(mission) {
        var pano_id;
        if (!confirm("Do you want to cancel mission " + mission.id + "?")) {
          return;
        }
        pano_id = mission.get('point_of_interest.id');
        mission.deleteRecord();
        return mission.save().then((function (_this) {
          return function (response) {
            response.get('store').recordForId('point_of_interest', pano_id).unloadRecord();
            return _this.sendAction('cancelPanoAction', response);
          };
        })(this), function (response) {
          return alert('There was an issue cancelling this mission.');
        });
      },
      selectMission: function selectMission(mission) {
        return this.sendAction('selectedAction', mission);
      }
    }
  });

  exports['default'] = DashboardMapActiveMissionsComponent;
});
define('pilots/components/dashboard-map-filter-button', ['exports', 'ember'], function (exports, _ember) {
  var DashboardMapFilterButtonComponent;

  DashboardMapFilterButtonComponent = _ember['default'].Component.extend({
    metrics: _ember['default'].inject.service(),
    classNames: ['map-filter-button'],
    selected: _ember['default'].computed('missionType.selected', function () {
      if (this.get('missionType').selected) {
        return this.get('missionType').color;
      }
    }),
    click: function click(event) {
      event.stopPropagation();
      event.preventDefault();
      this.sendAction('updateFilterAction', this.get('missionType'));
      if (this.get('missionType').selected) {
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Filter Show " + this.get('missionType').name
        });
      } else {
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Filter Hide " + this.get('missionType').name
        });
      }
    },
    actions: {
      updateFilter: function updateFilter(mission_type) {
        return this.sendAction('updateFilterAction', mission_type);
      }
    }
  });

  exports['default'] = DashboardMapFilterButtonComponent;
});
define('pilots/components/dashboard-map-filter', ['exports', 'ember'], function (exports, _ember) {
  var DashboardMapFilterComponent;

  DashboardMapFilterComponent = _ember['default'].Component.extend({
    metrics: _ember['default'].inject.service(),
    clientMission: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'client_mission');
    }),
    clientMissionAvailable: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'client_mission_available');
    }),
    panoCommercialAvailable: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'pano_commercial_available');
    }),
    panoCommercialActive: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'pano_commercial_active');
    }),
    panoResidentialAvailable: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'pano_residential_available');
    }),
    panoResidentialActive: _ember['default'].computed('missionFilters.@each.selected', function () {
      return this.get('missionFilters').findBy('type', 'pano_residential_active');
    }),
    didInsertElement: function didInsertElement() {
      this.$('#search-filter-button').on('click', (function (_this) {
        return function () {
          _this.$('.map-filter-search').toggle();
          _this.$('.map-filter-missions.pano-commercial, .map-filter-missions.pano-residential, .map-filter-missions.client').hide();
          return _this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: 'Filter Toggle Search'
          });
        };
      })(this));
      this.$('#client-filter-button').on('click', (function (_this) {
        return function () {
          _this.$('.map-filter-missions.client').toggle();
          _this.$('.map-filter-missions.pano-commercial, .map-filter-missions.pano-residential, .map-filter-search').hide();
          return _this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: 'Filter Toggle Client Missions'
          });
        };
      })(this));
      this.$('#commercial-filter-button').on('click', (function (_this) {
        return function () {
          _this.$('.map-filter-missions.pano-commercial').toggle();
          _this.$('.map-filter-missions.client, .map-filter-missions.pano-residential, .map-filter-search').hide();
          return _this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: 'Filter Toggle Pano Commercial'
          });
        };
      })(this));
      return this.$('#residential-filter-button').on('click', (function (_this) {
        return function () {
          _this.$('.map-filter-missions.pano-residential').toggle();
          _this.$('.map-filter-missions.client, .map-filter-missions.pano-commercial, .map-filter-search').hide();
          return _this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: 'Filter Toggle Pano Residential'
          });
        };
      })(this));
    },
    actions: {
      updateFilter: function updateFilter(mission_type) {
        return this.sendAction('updateFilterAction', mission_type);
      }
    }
  });

  exports['default'] = DashboardMapFilterComponent;
});
define('pilots/components/dashboard-map', ['exports', 'ember', 'pilots/config/environment', 'pilots/data/mission_type', 'pilots/data/map_style'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsDataMission_type, _pilotsDataMap_style) {
  var DashboardMapComponent;

  DashboardMapComponent = _ember['default'].Component.extend({
    defaultLocation: new google.maps.LatLng(34.019341, -118.493139),
    sessionAccount: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    router: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).lookup('router:main');
    }).readOnly(),
    store: _ember['default'].inject.service(),
    assetMap: _ember['default'].inject.service(),
    classNameBindings: ['pilotlog:map-container:map-container-dashboard'],
    pilotlog: false,
    smallDevice: false,
    mapStyles: _pilotsDataMap_style['default'],
    pointOfInterestMarkers: _ember['default'].A([]),
    missionMarkers: _ember['default'].A([]),
    missionTypeData: _pilotsDataMission_type['default'],
    missionFilters: _ember['default'].A([]),
    assetsDir: 'assets/images/v2/',
    actions: {
      declineMission: function declineMission(mission) {
        this.get('model.missions').removeObject(mission);
        this.loadMissions();
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Decline Available Mission"
        });
      },
      selectedMission: function selectedMission(mission) {
        this.selectMission(mission, true);
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Select Mission From Panel"
        });
      },
      cancelPano: function cancelPano(mission) {
        this.get('model.missions').removeObject(mission);
        this.loadMissions();
        this.loadPointOfInterests();
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Cancel Pano"
        });
      },
      updateFilter: function updateFilter(missionType) {
        return this.updateFilter(missionType);
      },
      availableMission: function availableMission(mission) {
        return this.get('store').findRecord('mission', mission.id).then((function (_this) {
          return function (mission) {
            return _this.get('router').transitionTo('availablemission', mission.id);
          };
        })(this), (function (_this) {
          return function (response) {
            alert('This mission is no longer available...');
            _this.get('model.missions').removeObject(mission);
            return _this.loadMissions();
          };
        })(this));
      }
    },
    init: function init() {
      this._super();
      if (window.innerWidth <= 767) {
        this.smallDevice = true;
      }
      this.setupFilters();
      return Em.run.scheduleOnce('afterRender', this, function () {
        return this.initMap();
      });
    },
    setupFilters: function setupFilters() {
      var MissionType;
      MissionType = Em.Object.extend({
        type: null,
        color: null,
        fontIcon: null,
        png: null,
        name: null,
        selected: true,
        selected_png: null
      });
      return this.missionTypeData.forEach((function (_this) {
        return function (mission_type) {
          var icon_png, icon_png_array, missionType;
          missionType = MissionType.create(mission_type);
          icon_png_array = missionType.png.split('.');
          icon_png_array[0] = icon_png_array[0] + '_selected';
          icon_png = icon_png_array.join('.');
          missionType.selected_png = _this.get('assetMap').resolve(_this.assetsDir + icon_png);
          missionType.png = _this.get('assetMap').resolve(_this.assetsDir + missionType.png);
          return _this.get('missionFilters').pushObject(missionType);
        };
      })(this));
    },
    updateFilter: function updateFilter(mission_type) {
      var ref;
      this.get('missionFilters').findBy('type', mission_type.type).set('selected', !mission_type.selected);
      if ((ref = mission_type.type) !== 'pano_residential_available' && ref !== 'pano_commercial_available') {
        return this.filterMap();
      } else {
        return this.loadPointOfInterests();
      }
    },
    filterMap: function filterMap() {
      return this.missionMarkers.forEach((function (_this) {
        return function (marker) {
          return marker.setVisible(_this.get('missionFilters').findBy('type', marker.getIcon().type).get('selected'));
        };
      })(this));
    },
    initMap: function initMap() {
      var mapOptions, zoom;
      zoom = this.smallDevice ? 13 : 15;
      mapOptions = {
        zoom: zoom,
        tilt: 0,
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        streetViewControl: false,
        scaleControl: true,
        panControl: true,
        zoomControl: true,
        draggable: true,
        scrollwheel: !this.get('publicsearch'),
        styles: this.mapStyles,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        }
      };
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      }
      if (this.get('publicsearch')) {
        console.log("publicsearch");
        return this.locateMe().then((function (_this) {
          return function () {
            _this.setupInfoWindow();
            _this.setupAutocomplete();
            return _this.map.addListener('idle', function () {
              _this.infoWindow.close();
              return _this.loadPointOfInterests();
            });
          };
        })(this));
      } else if (this.get('pilotlog')) {
        if (!this.get('model.missions').get('length')) {
          this.locateMe();
        }
        return this.loadMissions(true);
      } else {
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('map-filter-container'));
        this.infoWindow = new google.maps.InfoWindow();
        return this.locateMe().then((function (_this) {
          return function () {
            _this.loadMissions();
            _this.setupInfoWindow();
            _this.setupAutocomplete();
            return _this.map.addListener('idle', function () {
              _this.infoWindow.close();
              _this.loadPointOfInterests();
              return _this.filterMap();
            });
          };
        })(this));
      }
    },
    locateMe: function locateMe() {
      return new Promise((function (_this) {
        return function (resolve, reject) {
          var error, lat, lat_lng, lon;
          try {
            lat = Number(_this.get('sessionAccount.account').get('latitude'));
            lon = Number(_this.get('sessionAccount.account').get('longitude'));
            if (isNaN(lat)) {
              lat_lng = _this.get('defaultLocation');
            } else {
              lat_lng = new google.maps.LatLng(lat, lon);
            }
          } catch (error) {
            lat_lng = _this.get('defaultLocation');
          }
          if (navigator.geolocation) {
            console.log('navigator.geolocation: true');
            navigator.geolocation.getCurrentPosition(function (response) {
              console.log('geo coded location');
              lat_lng = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Geolocated"
              });
              return resolve(true);
            }, function (response) {
              console.log('pilot account/default location');
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Pilot Account Location"
              });
              return resolve(true);
            });
          } else {
            console.log('navigator.geolocation: false');
            lat_lng = new google.maps.LatLng(lat, lon);
            _this.map.setCenter(lat_lng);
            _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: "Map Location: Default"
            });
            resolve(true);
          }
          return setTimeout(function () {
            if (_this.map.center == null) {
              console.log('firefox pilot account/default location after 5sec timeout');
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Default (After FF Timeout)"
              });
              return resolve(true);
            }
          }, 5000);
        };
      })(this));
    },
    setupInfoWindow: function setupInfoWindow() {
      var _this;
      _this = this;
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindowNode = _ember['default'].$('#info-window-node');
      return this.infoWindow.addListener('domready', function (event) {
        var iwBackground, iwCloseBtn, iwOuter;
        iwOuter = _ember['default'].$('.gm-style-iw');
        iwOuter.children().first().css({
          'display': 'block'
        });
        iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(4)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(3)').find('div').children().css({
          'z-index': 1,
          'box-shadow': '0 1px 6px rgba(178, 178, 178, 0.6)'
        });
        iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({
          'display': 'none'
        });
        return _this.populateInfoWindow(_this.infoWindow);
      });
    },
    populateInfoWindow: function populateInfoWindow(infoWindow) {
      var address, contentArr, image_url, share_url;
      contentArr = infoWindow.getContent().split('||');
      if (this.get('publicsearch')) {
        image_url = contentArr[0];
        share_url = contentArr[1];
        address = contentArr[2];
        this.infoWindowNode.html("<div id='publicsearch-pano-infowindow'> <img src='" + image_url + "'/> <div class='content'> <div class='icon icon-Pin'></div> <div class='address'>" + address + "</div> <a href=" + share_url + " class='link' target='_blank'>View Pano ></a> </div> </div>");
      } else {
        this.infoWindowNode.html("<div id='pano-infowindow'> <div class='pano-infowindow-content'> <div class='pano-infowindow-title'>Pano Mission - " + contentArr[1] + "</div> <div class='pano-infowindow-icon icon-Pin'></div> <div class='pano-infowindow-address'>" + contentArr[2] + "</div> <div class='pano-infowindow-likelihood' title='Likelihood of Payout'> <div class='likelihood-container'> <div class='likelihood-bg'> <div class='likelihood-bg-bar' style='width: " + contentArr[3] + "%'></div> <span class='likelihood-space'></span><span class='likelihood-space'></span><span class='likelihood-space'></span><span class='likelihood-space'></span><span class='likelihood-space'></span> <a href='http://go.dronebase.com/faq/pilot' title='Likelihood of Payout' target='_blank' class='likelihood-info-icon icon-info'></a> </div> </div> </div> <div data-pano-id=" + contentArr[0] + " class='pano-infowindow-action'> <div class='icon-Star_a pano-infowindow-action-icon'></div> Add Mission </div>");
      }
      this.infoWindowNode.find('.pano-infowindow-action').click((function (_this) {
        return function (event) {
          var pano_id;
          if (!(pano_id = Number(event.target.dataset.panoId))) {
            pano_id = Number(event.target.parentElement.dataset.panoId);
          }
          return _this.createPointOfInteresMission(pano_id);
        };
      })(this));
      return infoWindow.setContent(this.infoWindowNode[0]);
    },
    loadPointOfInterests: function loadPointOfInterests() {
      var _this, bottomRightLatLng, bounds, data, metersPerPixel, property_types, topLeftLatLng, widthAndHeight;
      _this = this;
      property_types = [];
      if (this.get('missionFilters').findBy('type', 'pano_residential_available').get('selected')) {
        property_types.pushObject('residential');
      }
      if (this.get('missionFilters').findBy('type', 'pano_commercial_available').get('selected')) {
        property_types.pushObject('commercial');
      }
      if (property_types.length < 1) {
        this.clearPointOfInterestMarkers();
        return;
      }
      bounds = this.map.getBounds();
      topLeftLatLng = new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng());
      bottomRightLatLng = new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getNorthEast().lng());
      metersPerPixel = Math.round(156543.03392 * Math.cos(this.map.getCenter().lat() * Math.PI / 180) / Math.pow(2, this.map.getZoom()));
      widthAndHeight = 50 * 2 * metersPerPixel;
      data = {
        min_cluster_width: widthAndHeight,
        min_cluster_height: widthAndHeight,
        tl: topLeftLatLng.lat() + "," + topLeftLatLng.lng(),
        br: bottomRightLatLng.lat() + "," + bottomRightLatLng.lng(),
        property_types: property_types,
        search_mode: this.get('publicsearch') ? 'customer_landing_preview' : void 0
      };
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/points_of_interest_search",
        type: 'GET',
        dataType: 'json',
        data: data,
        headers: {
          Authorization: _this.get('sessionAccount.headers')['Authorization'],
          'X-Api-Format': 'flattenjson'
        }
      }).then(function (response) {
        _this.clearPointOfInterestMarkers();
        return _this.addPointOfInterests(response);
      }, function (response) {
        return console.log(JSON.stringify(response));
      });
    },
    addPointOfInterests: function addPointOfInterests(result) {
      return result.forEach((function (_this) {
        return function (poi) {
          var icon_png, marker, pano_type, poiLatLng;
          if (!(Number(poi.coordinate.latitude) && Number(poi.coordinate.longitude))) {
            return;
          }
          poiLatLng = new google.maps.LatLng(poi.coordinate.latitude, poi.coordinate.longitude);
          if (poi.cluster_count > 1) {
            marker = new RichMarker({
              position: poiLatLng,
              map: _this.map,
              draggable: false,
              flat: true,
              content: "<div class='marker-cluster'>" + [[poi.cluster_count]] + "</div>",
              icon: {
                type: 'cluster'
              }
            });
          } else {
            pano_type = "pano_" + poi.top_points_of_interest[0].property_type + "_available";
            icon_png = _this.get('missionFilters').findBy('type', pano_type).get('png');
            marker = new google.maps.Marker({
              position: poiLatLng,
              map: _this.map,
              icon: {
                url: icon_png,
                scale: 20,
                type: pano_type
              }
            });
            marker.setVisible(_this.get('missionFilters').findBy('type', marker.getIcon().type).get('selected'));
          }
          google.maps.event.addListener(marker, 'click', function () {
            var address, content, image_url, likelihood_score, offsetHeight, share_url, zoomAdjustment, zoomLevel;
            if (poi.cluster_count > 1) {
              zoomAdjustment = (function () {
                switch (false) {
                  case !(poi.cluster_count < 100):
                    return 2;
                  case !(poi.cluster_count >= 100 && poi.cluster_count < 1000):
                    return 3;
                  default:
                    return 4;
                }
              })();
              zoomLevel = _this.map.getZoom() + zoomAdjustment;
              _this.map.setCenter(marker.getPosition());
              _this.map.setZoom(zoomLevel);
              return _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map: Cluster Icon"
              });
            } else {
              likelihood_score = poi.top_points_of_interest[0].likelihood_of_payout * 10;
              offsetHeight = new google.maps.Size(0, -30);
              _this.infoWindow.setPosition(marker.position);
              if (_this.get('publicsearch')) {
                image_url = poi.viewable_missions[0].beauty_shot;
                share_url = poi.viewable_missions[0].share_url;
                address = poi.top_points_of_interest[0].location.name;
                content = image_url + "||" + share_url + "||" + address;
              } else {
                content = poi.top_points_of_interest[0].id + "||" + poi.top_points_of_interest[0].property_type.capitalize() + "||" + poi.top_points_of_interest[0].location.name + "||" + likelihood_score;
              }
              _this.infoWindow.setOptions({
                content: content,
                pixelOffset: offsetHeight,
                disableAutoPan: true
              });
              _this.infoWindow.open(_this.map);
              return _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map: Pin Icon"
              });
            }
          });
          return _this.pointOfInterestMarkers.pushObject(marker);
        };
      })(this));
    },
    clearPointOfInterestMarkers: function clearPointOfInterestMarkers() {
      this.pointOfInterestMarkers.forEach(function (marker) {
        return marker.setMap(null);
      });
      return this.pointOfInterestMarkers.clear();
    },
    createPointOfInteresMission: function createPointOfInteresMission(id) {
      var _mission, _poi, _this;
      _this = this;
      _poi = this.get('model.missions').store.createRecord('point_of_interest', {
        id: id
      });
      _mission = this.get('model.missions').store.createRecord('mission', {
        point_of_interest: _poi
      });
      return _mission.save().then(function (response) {
        var _marker;
        _this.infoWindow.close();
        if (_marker = _this.pointOfInterestMarkers.findBy('position', _this.infoWindow.position)) {
          _marker.setVisible(false);
          _this.pointOfInterestMarkers.removeObject(_marker);
        }
        _this.get('model.missions').pushObject(response._internalModel);
        _mission = _this.get('model.missions').findBy('id', response.id);
        _this.missionMarkers.pushObject(_this.createMarker(_mission));
        _this.selectMission(_mission);
        return _this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Map: Starred Pano"
        });
      }, function (response) {
        return alert('No longer available');
      });
    },
    getIcon: function getIcon(mission, selected) {
      var anchor, icon, icon_png;
      if (selected == null) {
        selected = false;
      }
      icon_png = this.get('missionFilters').findBy('type', mission.get('missionStatusType')).get('png');
      anchor = new google.maps.Point(0, 0);
      if (selected) {
        icon_png = this.get('missionFilters').findBy('type', mission.get('missionStatusType')).get('selected_png');
        anchor = new google.maps.Point(17, 13);
      }
      icon = {
        url: icon_png,
        anchor: anchor,
        type: mission.get('missionStatusType')
      };
      return icon;
    },
    selectMission: function selectMission(mission, pan_to) {
      var selected_missions;
      if (pan_to == null) {
        pan_to = false;
      }
      selected_missions = this.get('model.missions').filterBy('selected_on_dashboard', true);
      if (selected_missions) {
        selected_missions.forEach((function (_this) {
          return function (selected_mission) {
            selected_mission.get('map_marker').setIcon(_this.getIcon(selected_mission));
            return selected_mission.set('selected_on_dashboard', false);
          };
        })(this));
      }
      mission.set('selected_on_dashboard', true);
      mission.get('map_marker').setIcon(this.getIcon(mission, true));
      if (pan_to) {
        return this.map.panTo(mission.get('map_marker').getPosition());
      }
    },
    createMarker: function createMarker(mission) {
      var marker;
      if (mission.get('missionStatusType') === 'creative_mission') {
        return;
      }
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(mission.get('location.latitude'), mission.get('location.longitude')),
        map: this.map,
        icon: this.getIcon(mission)
      });
      mission.set('map_marker', marker);
      google.maps.event.addListener(marker, 'click', (function (_this) {
        return function () {
          return _this.selectMission(mission);
        };
      })(this));
      return marker;
    },
    clearMissionMarkers: function clearMissionMarkers() {
      this.missionMarkers.forEach(function (marker) {
        return marker.setMap(null);
      });
      return this.missionMarkers.clear();
    },
    loadMissions: function loadMissions(set_bounds) {
      var bounds;
      if (set_bounds == null) {
        set_bounds = false;
      }
      bounds = new google.maps.LatLngBounds();
      this.clearMissionMarkers();
      this.get('model.missions').forEach((function (_this) {
        return function (mission) {
          var marker;
          marker = _this.createMarker(mission);
          if (!marker) {
            return;
          }
          bounds.extend(marker.getPosition());
          return _this.missionMarkers.pushObject(marker);
        };
      })(this));
      if (set_bounds) {
        return this.map.fitBounds(bounds);
      }
    },
    setupAutocomplete: function setupAutocomplete() {
      var input, searchBox;
      input = $('#filter-search-field')[0];
      searchBox = new google.maps.places.SearchBox(input);
      this.map.addListener('bounds_changed', (function (_this) {
        return function () {
          return searchBox.setBounds(_this.map.getBounds());
        };
      })(this));
      return searchBox.addListener('places_changed', (function (_this) {
        return function () {
          var place;
          if (searchBox.getPlaces().length === 0) {
            alert('Address search returned no results.');
            _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: "Failed Search"
            });
            return;
          }
          place = searchBox.getPlaces()[0];
          _this.map.setCenter(place.geometry.location);
          return _this.get('metrics').trackEvent({
            category: 'Active Missions',
            action: 'click',
            label: "Successful Search"
          });
        };
      })(this));
    }
  });

  exports['default'] = DashboardMapComponent;
});
define('pilots/components/dashboard-mission-map', ['exports', 'ember', 'pilots/config/environment', 'pilots/data/mission_type', 'pilots/data/map_style'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsDataMission_type, _pilotsDataMap_style) {
  var DashboardMissionMapComponent;

  DashboardMissionMapComponent = _ember['default'].Component.extend({
    defaultLocation: new google.maps.LatLng(34.019341, -118.493139),
    sessionAccount: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    router: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).lookup('router:main');
    }).readOnly(),
    store: _ember['default'].inject.service(),
    assetMap: _ember['default'].inject.service(),
    classNameBindings: ['pilotlog:map-container:map-container-pilot-dashboard'],
    pilotlog: false,
    smallDevice: false,
    mapStyles: _pilotsDataMap_style['default'],
    pointOfInterestMarkers: _ember['default'].A([]),
    missionMarkers: _ember['default'].A([]),
    missionFilters: _ember['default'].A([]),
    missionTypeData: _pilotsDataMission_type['default'],
    assetsDir: 'assets/images/v2/',
    actions: {
      declineMission: function declineMission(mission) {
        this.get('missions').removeObject(mission);
        this.loadMissions(true);
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Decline Available Mission"
        });
      },
      selectedMission: function selectedMission(mission) {
        this.selectMission(mission, true);
        return this.get('metrics').trackEvent({
          category: 'Active Missions',
          action: 'click',
          label: "Select Mission From Panel"
        });
      },
      availableMission: function availableMission(mission) {
        return this.get('store').findRecord('mission', mission.id).then((function (_this) {
          return function (mission) {
            return _this.get('router').transitionTo('availablemission', mission.id);
          };
        })(this), (function (_this) {
          return function (response) {
            alert('This mission is no longer available...');
            _this.get('missions').removeObject(mission);
            return _this.loadMissions(true);
          };
        })(this));
      }
    },
    init: function init() {
      this._super();
      this.setupFilters();
      if (window.innerWidth <= 767) {
        this.smallDevice = true;
      }
      return Em.run.scheduleOnce('afterRender', this, function () {
        return this.initMap();
      });
    },
    setupFilters: function setupFilters() {
      var MissionType;
      MissionType = Em.Object.extend({
        type: null,
        color: null,
        fontIcon: null,
        png: null,
        name: null,
        selected: true,
        selected_png: null
      });
      return this.missionTypeData.forEach((function (_this) {
        return function (mission_type) {
          var icon_png, icon_png_array, missionType;
          missionType = MissionType.create(mission_type);
          icon_png_array = missionType.png.split('.');
          icon_png_array[0] = icon_png_array[0] + '_selected';
          icon_png = icon_png_array.join('.');
          missionType.selected_png = _this.get('assetMap').resolve(_this.assetsDir + icon_png);
          missionType.png = _this.get('assetMap').resolve(_this.assetsDir + missionType.png);
          return _this.get('missionFilters').pushObject(missionType);
        };
      })(this));
    },
    initMap: function initMap() {
      var mapOptions, zoom;
      zoom = this.smallDevice ? 13 : 15;
      mapOptions = {
        zoom: zoom,
        tilt: 0,
        streetViewControl: false,
        scaleControl: true,
        panControl: true,
        zoomControl: true,
        draggable: true,
        scrollwheel: !this.get('publicsearch'),
        styles: this.mapStyles,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        }
      };
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      }
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('map-filter-container'));
      this.infoWindow = new google.maps.InfoWindow();
      return this.locateMe().then((function (_this) {
        return function () {
          _this.loadMissions(true);
          _this.setupInfoWindow();
          return google.maps.event.addListener(_this.map, 'click', function () {
            return _this.infoWindow.close();
          });
        };
      })(this));
    },
    setupInfoWindow: function setupInfoWindow() {
      var _this;
      _this = this;
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindowNode = _ember['default'].$('#info-window-node');
      return this.infoWindow.addListener('domready', function (event) {
        var iwBackground, iwCloseBtn, iwOuter;
        iwOuter = _ember['default'].$('.gm-style-iw');
        iwOuter.children().first().css({
          'display': 'block'
        });
        iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(4)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(3)').find('div').children().css({
          'z-index': 1,
          'box-shadow': '0 1px 6px rgba(178, 178, 178, 0.6)'
        });
        iwCloseBtn = iwOuter.next();
        return iwCloseBtn.css({
          'display': 'none'
        });
      });
    },
    locateMe: function locateMe() {
      return new Promise((function (_this) {
        return function (resolve, reject) {
          var error, lat, lat_lng, lon;
          try {
            lat = Number(_this.get('sessionAccount.account').get('latitude'));
            lon = Number(_this.get('sessionAccount.account').get('longitude'));
            if (isNaN(lat)) {
              lat_lng = _this.get('defaultLocation');
            } else {
              lat_lng = new google.maps.LatLng(lat, lon);
            }
          } catch (error) {
            lat_lng = _this.get('defaultLocation');
          }
          if (navigator.geolocation) {
            console.log('navigator.geolocation: true');
            navigator.geolocation.getCurrentPosition(function (response) {
              console.log('geo coded location');
              lat_lng = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Geolocated"
              });
              return resolve(true);
            }, function (response) {
              console.log('pilot account/default location');
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Pilot Account Location"
              });
              return resolve(true);
            });
          } else {
            console.log('navigator.geolocation: false');
            lat_lng = new google.maps.LatLng(lat, lon);
            _this.map.setCenter(lat_lng);
            _this.get('metrics').trackEvent({
              category: 'Active Missions',
              action: 'click',
              label: "Map Location: Default"
            });
            resolve(true);
          }
          return setTimeout(function () {
            if (_this.map.center == null) {
              console.log('firefox pilot account/default location after 5sec timeout');
              _this.map.setCenter(lat_lng);
              _this.get('metrics').trackEvent({
                category: 'Active Missions',
                action: 'click',
                label: "Map Location: Default (After FF Timeout)"
              });
              return resolve(true);
            }
          }, 5000);
        };
      })(this));
    },
    generateInfoNodeContent: function generateInfoNodeContent(mission) {
      var added_comma, address, content, decline_button, header, icon, payout, scheduled_date, scheduled_time, viewDetails, viewDetailsButtonText;
      added_comma = "";
      if (mission.get('mission_type') === 'client') {
        if (mission.get('status') === 'pilots_notified') {
          header = "Available Client Mission";
          icon = "available-mission-pin";
          decline_button = "<div data-mission-id=" + mission.get('id') + " class='decline-mission-button'>DECLINE</div>";
          viewDetails = "/availablemission/" + mission.id;
        } else {
          header = "Client Mission";
          icon = "client-mission-pin";
          decline_button = "";
          viewDetails = "/clientmission/" + mission.id;
        }
        payout = mission.get('estimated_pilot_payout_in_dollars');
        viewDetailsButtonText = "VIEW DETAILS";
        if (mission.get('scheduled_at_start')) {
          scheduled_date = moment.tz(mission.get('scheduled_at_start'), mission.get('location.timezone_id')).format('MM/DD/YYYY');
          scheduled_time = moment.tz(mission.get('scheduled_at_start'), mission.get('location.timezone_id')).format('hh:mmA') + " - " + moment.tz(mission.get('scheduled_at_end'), mission.get('location.timezone_id')).format('hh:mmA');
          if (scheduled_time) {
            added_comma = ",";
          }
        } else {
          scheduled_date = "1 - 3 Days";
          scheduled_time = "";
        }
      } else {
        header = "Getty Mission";
        icon = "getty-mission-pin";
        payout = "Varies";
        scheduled_date = moment.tz(mission.get('created_on'), mission.get('location.timezone_id')).format('MM/DD/YYYY');
        scheduled_time = "";
        decline_button = "<div data-mission-id=" + mission.get('id') + " class='decline-mission-button'>CANCEL</div>";
        viewDetails = "/getty/" + mission.id;
        viewDetailsButtonText = "UPLOAD";
      }
      address = "Location Unknown";
      if (mission.get('location.formatted_address')) {
        address = mission.get('location.formatted_address');
      }
      content = "<div class='info-window-panel'> <div class='header'> <div class='mission-wide-col'> <div class='mission-title'>" + header + "</div> </div> <div class='mission-schedule hidden-xs'> <div class='day'>" + scheduled_date + "</div> <div class='time'>" + scheduled_time + "</div> </div> <div class='mission-payout'> " + payout + " </div> </div> <div class='second-row'> <div class='address-and-pin mission-wide-col'> <div class='icon " + icon + "'></div> <div class='address'> " + address + " <div class='mission-schedule visible-xs'> <span class='day'>" + scheduled_date + added_comma + "</span><span class='time'> " + scheduled_time + "</span> </div> </div> </div> <div class='buttons'> <a href='" + viewDetails + "' class='turquoise-button'> " + viewDetailsButtonText + " </a> " + decline_button + " </div> </div> </div>";
      return content;
    },
    getIcon: function getIcon(mission, selected) {
      var anchor, icon, icon_png;
      if (selected == null) {
        selected = false;
      }
      icon_png = this.get('missionFilters').findBy('type', mission.get('missionStatusType')).get('png');
      anchor = new google.maps.Point(0, 0);
      if (selected) {
        icon_png = this.get('missionFilters').findBy('type', mission.get('missionStatusType')).get('selected_png');
        anchor = new google.maps.Point(17, 13);
      }
      icon = {
        url: icon_png,
        anchor: anchor,
        type: mission.get('missionStatusType')
      };
      return icon;
    },
    selectMission: function selectMission(mission, pan_to) {
      var selected_missions;
      if (pan_to == null) {
        pan_to = false;
      }
      selected_missions = this.get('missions').filterBy('selected_on_dashboard', true);
      if (selected_missions) {
        selected_missions.forEach((function (_this) {
          return function (selected_mission) {
            selected_mission.get('map_marker').setIcon(_this.getIcon(selected_mission));
            return selected_mission.set('selected_on_dashboard', false);
          };
        })(this));
      }
      mission.set('selected_on_dashboard', true);
      mission.get('map_marker').setIcon(this.getIcon(mission, true));
      if (pan_to) {
        return this.map.panTo(mission.get('map_marker').getPosition());
      }
    },
    createMarker: function createMarker(mission) {
      var _this, marker;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(mission.get('location.latitude'), mission.get('location.longitude')),
        map: this.map,
        icon: this.getIcon(mission)
      });
      _this = this;
      mission.set('map_marker', marker);
      google.maps.event.addListener(marker, 'click', (function (_this) {
        return function () {
          var content, declineButton;
          _this.selectMission(mission);
          _this.infoWindow.setPosition(marker.position);
          content = _this.generateInfoNodeContent(mission);
          _this.infoWindow.setOptions({
            content: content,
            pixelOffset: new google.maps.Size(10, -30),
            disableAutoPan: false
          });
          _this.infoWindowNode = _ember['default'].$('#info-window-node');
          _this.infoWindow.open(_this.map);
          declineButton = document.getElementsByClassName('decline-mission-button')[0];
          if (declineButton) {
            return declineButton.addEventListener('click', function () {
              _this.infoWindow.close();
              marker.setMap(null);
              return _this.sendAction('deleteAction', mission);
            });
          }
        };
      })(this));
      return marker;
    },
    clearMissionMarkers: function clearMissionMarkers() {
      this.missionMarkers.forEach(function (marker) {
        return marker.setMap(null);
      });
      return this.missionMarkers.clear();
    },
    loadMissions: function loadMissions(set_bounds) {
      var bounds;
      if (set_bounds == null) {
        set_bounds = false;
      }
      bounds = new google.maps.LatLngBounds();
      this.clearMissionMarkers();
      this.get('missions').forEach((function (_this) {
        return function (mission) {
          var marker;
          marker = _this.createMarker(mission);
          if (!marker) {
            return;
          }
          bounds.extend(marker.getPosition());
          return _this.missionMarkers.pushObject(marker);
        };
      })(this));
      if (set_bounds) {
        return this.map.fitBounds(bounds);
      }
    }
  });

  exports['default'] = DashboardMissionMapComponent;
});
define('pilots/components/draggable-object-target', ['exports', 'ember-drag-drop/components/draggable-object-target'], function (exports, _emberDragDropComponentsDraggableObjectTarget) {
  exports['default'] = _emberDragDropComponentsDraggableObjectTarget['default'];
});
define('pilots/components/draggable-object', ['exports', 'ember-drag-drop/components/draggable-object'], function (exports, _emberDragDropComponentsDraggableObject) {
  exports['default'] = _emberDragDropComponentsDraggableObject['default'];
});
define('pilots/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('pilots/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('pilots/components/getty-mission', ['exports', 'ember', 'pilots/components/asset-uploader', 'pilots/config/environment', 'pilots/validations/getty', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsComponentsAssetUploader, _pilotsConfigEnvironment, _pilotsValidationsGetty, _emberChangesetValidations, _emberChangeset) {
  var GettyMissionComponent;

  GettyMissionComponent = _pilotsComponentsAssetUploader['default'].extend(_pilotsValidationsGetty['default'], {
    metrics: _ember['default'].inject.service(),
    sessionAccount: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    fakeModel: null,
    initGetty: _ember['default'].on('init', function () {
      var gettyObject;
      if (this.get('model.mission')) {
        gettyObject = _ember['default'].Object.extend({
          description: null,
          city: this.get('model.mission.location.city'),
          state: this.get('model.mission.location.state'),
          country: this.get('model.mission.location.country'),
          category: null,
          fileInput: null,
          timecode: null,
          tags: null
        });
        return this.changeset = new _emberChangeset['default'](gettyObject.create(), (0, _emberChangesetValidations['default'])(_pilotsValidationsGetty['default']), _pilotsValidationsGetty['default']);
      } else {
        gettyObject = _ember['default'].Object.extend({
          description: null,
          city: null,
          state: null,
          country: null,
          category: null,
          fileInput: null,
          timecode: null,
          tags: null
        });
        this.set('fakeModel', gettyObject.create());
        return this.changeset = new _emberChangeset['default'](this.get('fakeModel'), (0, _emberChangesetValidations['default'])(_pilotsValidationsGetty['default']), _pilotsValidationsGetty['default']);
      }
    }),
    uploadComplete: false,
    uploadInProgress: false,
    uploadProgress: 0,
    progressObserver: (function () {
      var callback;
      if (this.get('uploadProgress') >= 100 && !this.get('uploadComplete')) {
        callback = (function (_this) {
          return function () {
            return _this.set('uploadComplete', true);
          };
        })(this);
        return this.updateStatus('assets_classified', callback);
      }
    }).observes('uploadProgress'),
    didInsertElement: function didInsertElement() {
      var promise, promiseMobile;
      this._super();
      this.displayAnimatedElements();
      this.initFilePicker();
      this.initCountryPicker();
      this.initGettyImages();
      this.initUploadNowButton();
      this.initAddFileLabel();
      this.initCategoryPicker();
      promise = document.getElementById("video").play();
      promiseMobile = document.getElementById("mobilevideo").play();
      if (!(promise === void 0)) {
        promise.then(function () {})["catch"](function () {});
      }
      if (!(promiseMobile === void 0)) {
        promiseMobile.then(function () {})["catch"](function () {});
      }
      this.set('selectedCarouselPage', 0);
      this.setupAutocomplete();
      return this.setMobileOrTablet();
    },
    setMobileOrTablet: function setMobileOrTablet() {
      var check;
      check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
          check = true;
        }
      })(navigator.userAgent || navigator.vendor || window.opera);
      return this.set('mobile', check);
    },
    setupAutocomplete: function setupAutocomplete() {
      var autocomplete, input;
      input = document.getElementById('city');
      autocomplete = new google.maps.places.SearchBox(input);
      return autocomplete.addListener('places_changed', (function (_this) {
        return function () {
          var address_components, city, place;
          place = autocomplete.getPlaces()[0];
          if (!(place && place.geometry)) {
            _this.set('error', 'Not a valid address. Please try again.');
            _this.set('showError', true);
            return;
          }
          address_components = {};
          Em.$.each(place.address_components, function (k, v1) {
            Em.$.each(v1.types, function (k2, v2) {
              address_components[v2] = v1;
            });
          });
          if (city = address_components.locality || address_components.administrative_area_level_3 || address_components.neighborhood) {
            $('#city').val(city.long_name);
            _this.set('changeset.city', city.long_name);
          } else {
            _this.set('changeset.city', null);
          }
          if (address_components.administrative_area_level_1) {
            _this.set('changeset.state', address_components.administrative_area_level_1.long_name);
          } else {
            _this.set('changeset.state', null);
          }
          if (address_components.country) {
            _this.set('country-selector', address_components.country.long_name);
            $('#country-selector')[0].value = address_components.country.long_name;
            $('.ui-autocomplete-input')[0].value = address_components.country.long_name;
            return _this.set('changeset.country', address_components.country.long_name);
          } else {
            return _this.set('changeset.country', null);
          }
        };
      })(this));
    },
    categoryChosen: function categoryChosen(category) {
      return this.set('category', category);
    },
    initGettyImages: function initGettyImages() {
      $(".overlay1").hover(function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Skyline.gif");
      }, function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Skyline.png");
      });
      $(".overlay2").hover(function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Upload.gif");
      }, function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Upload.png");
      });
      return $(".overlay3").hover(function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Upload-Money.gif");
      }, function () {
        return $(this).find('img').attr('src', "/assets/images/getty/Getty-infographic_Upload-Money.png");
      });
    },
    initCategoryPicker: function initCategoryPicker() {
      return Em.run.later((function (_this) {
        return function () {
          return $('.categories-dropdown').niceSelect();
        };
      })(this));
    },
    initCountryPicker: function initCountryPicker() {
      $('#country-selector').selectToAutocomplete();
      if (this.get('model.mission')) {
        this.set('country-selector', this.get('model.mission.location.country'));
        $('#country-selector')[0].value = this.get('model.mission.location.country');
        $('.ui-autocomplete-input')[0].value = this.get('model.mission.location.country');
        return this.set('changeset.country', this.get('model.mission.location.country'));
      }
    },
    initFilePicker: function initFilePicker() {
      var _this;
      _this = this;
      return $('#fileInput').each(function () {
        var input, label;
        input = $(this);
        label = input.next('label');
        return input.on('change', function (e) {
          var fileName, fileSize;
          fileName = '';
          if (this.files) {
            fileName = this.files[0].name;
            fileSize = this.files[0].size;
            _this.set('fileName', fileName);
            _this.set('fileSize', fileSize);
            return _this.set('fileSizeText', filesize(fileSize, {
              'base': 10,
              'round': 0
            }));
          }
        });
      });
    },
    initUploadNowButton: function initUploadNowButton() {
      return $('.upload-now a').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $('#upload').offset().top
        }, 'slow');
        return false;
      });
    },
    initAddFileLabel: function initAddFileLabel() {
      return $('#fileInputLabel').on('click', (function (_this) {
        return function (e) {
          return _this.get('metrics').trackEvent({
            category: 'Getty City',
            action: 'Add File',
            label: 'Upload Cityscape Video'
          });
        };
      })(this));
    },
    displayAnimatedElements: function displayAnimatedElements() {
      var delay;
      delay = 0;
      $('.scroll-hidden').each(function (index, element) {
        if ($(element).visible(true)) {
          _ember['default'].run.later(function () {
            $(element).css('visibility', 'visible');
            return $(element).addClass('animated fadeInUp');
          }, delay);
          return delay += 500;
        }
      });
      return $('.scroll-hidden').scrollable({
        "in": function _in(e, ui) {
          $(ui.element).css('visibility', 'visible');
          return $(ui.element).addClass('animated fadeInUp');
        }
      });
    },
    addAsset: function addAsset(file) {
      var model, shotId, timecode;
      model = {
        mission: this.get('mission')
      };
      shotId = this.get('mission.shots').objectAt(0).id;
      timecode = this.get('changeset.timecode');
      return this.sendAction('onfileadd', file, shotId, model, timecode);
    },
    startUpload: function startUpload() {
      return this.addFilesAndUpload(this.get('changeset.fileInput'));
    },
    gettyMissionsCount: _ember['default'].computed('sessionAccount.account.mission_breakdown', function () {
      var mission_breakdown;
      mission_breakdown = this.get('sessionAccount.account.mission_breakdown');
      if (mission_breakdown) {
        return mission_breakdown['getty'] + 1;
      } else {
        return '1';
      }
    }),
    actions: {
      onFileSelected: function onFileSelected(event) {
        event.preventDefault();
        return this.set('changeset.fileInput', $('#fileInput').prop('files'));
      },
      onCategorySelected: function onCategorySelected() {
        return this.set('changeset.category', Number($('.categories-dropdown').val()));
      },
      onCountrySelected: function onCountrySelected() {
        return this.set('changeset.country', $('#country-selector').val());
      },
      goToCarouselPage: function goToCarouselPage(page) {
        this.set('selectedCarouselPage', page);
        return this.updateSelectedCarouselPage();
      },
      rotateCarouselLeft: function rotateCarouselLeft() {
        if (this.get('selectedCarouselPage') - 1 < 0) {
          this.set('selectedCarouselPage', 3);
        } else {
          this.set('selectedCarouselPage', this.get('selectedCarouselPage') - 1);
        }
        return this.updateSelectedCarouselPage();
      },
      rotateCarouselRight: function rotateCarouselRight() {
        if (this.get('selectedCarouselPage') + 1 > 3) {
          this.set('selectedCarouselPage', 0);
        } else {
          this.set('selectedCarouselPage', this.get('selectedCarouselPage') + 1);
        }
        return this.updateSelectedCarouselPage();
      },
      newUpload: function newUpload() {
        this.get('metrics').trackEvent({
          category: 'Getty City',
          action: 'Add Another',
          label: 'Add Another Success'
        });
        return window.location = '/getty';
      },
      cancelUploadAction: function cancelUploadAction() {
        this.get('metrics').trackEvent({
          category: 'Getty City',
          action: 'Cancel',
          label: 'Cancel Upload'
        });
        location.reload();
        return $('html, body').animate({
          scrollTop: $('#upload').offset().top
        }, 'slow');
      },
      cancelFile: function cancelFile() {
        this.get('metrics').trackEvent({
          category: 'Getty City',
          action: 'Cancel',
          label: 'Cancel Add File'
        });
        $('#fileInput').val('');
        this.set('fileName', null);
        return this.set('fileSize', null);
      },
      createMission: function createMission() {
        this.get('metrics').trackEvent({
          category: 'Getty City',
          action: 'Submit',
          label: 'Submit Video'
        });
        return this.changeset.validate().then((function (_this) {
          return function () {
            if (_this.changeset.get('isInvalid')) {} else {
              return _this.changeset.save().then(function () {
                var data;
                data = {
                  location: {
                    city: _this.get('changeset.city'),
                    state: _this.get('changeset.state'),
                    country: _this.get('changeset.country')
                  },
                  category_id: _this.get('changeset.category'),
                  description: _this.get('changeset.description'),
                  tags: _this.get('changeset.tags')
                };
                _this.set('uploadInProgress', true);
                if (_this.get('model.mission')) {
                  _this.set('model.mission.location', data.location);
                  _this.set('model.mission.category_id', data.category_id);
                  _this.set('model.mission.description', data.description);
                  _this.set('model.mission.tags', data.tags);
                  return _ember['default'].$.ajax({
                    url: _pilotsConfigEnvironment['default'].api.host + "/v2/pilots/missions/" + _this.get('model.mission.id'),
                    type: 'PATCH',
                    dataType: 'json',
                    data: data,
                    headers: _this.get('sessionAccount.headers')
                  }).then(function (response) {
                    _this.set('mission', _this.get('model.mission'));
                    return _this.startUpload();
                  }, function (response) {
                    return console.log('failure creating mission');
                  });
                } else {
                  return _ember['default'].$.ajax({
                    url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/creative",
                    type: 'POST',
                    dataType: 'json',
                    data: data,
                    headers: _this.get('sessionAccount.headers')
                  }).then(function (response) {
                    var mission;
                    _this.get('store').pushPayload(response);
                    mission = _this.get('store').peekRecord('mission', response.data.id);
                    _this.set('mission', mission);
                    return _this.startUpload();
                  }, function (response) {
                    return console.log('failure creating mission');
                  });
                }
              });
            }
          };
        })(this));
      }
    },
    updateSelectedCarouselPage: function updateSelectedCarouselPage() {
      $('.reveal-item').css('opacity', 0);
      $(".reveal-item").css('pointer-events', 'none');
      $(".reveal-item").css('left', '100%');
      $(".reveal-item-" + this.get('selectedCarouselPage')).css('opacity', 1);
      $(".reveal-item-" + this.get('selectedCarouselPage')).css('left', 0);
      $(".reveal-item-" + this.get('selectedCarouselPage')).css('pointer-events', 'auto');
      $('.bullet-b').removeClass('selected');
      return $(".bullet-" + this.get('selectedCarouselPage') + "b").addClass('selected');
    }
  });

  exports['default'] = GettyMissionComponent;
});
define('pilots/components/head-content', ['exports', 'ember', 'pilots/templates/head'], function (exports, _ember, _pilotsTemplatesHead) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    model: _ember['default'].inject.service('head-data'),
    layout: _pilotsTemplatesHead['default']
  });
});
define('pilots/components/head-layout', ['exports', 'ember', 'ember-cli-head/templates/components/head-layout'], function (exports, _ember, _emberCliHeadTemplatesComponentsHeadLayout) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    layout: _emberCliHeadTemplatesComponentsHeadLayout['default']
  });
});
define('pilots/components/head-tag', ['exports', 'ember-cli-meta-tags/components/head-tag'], function (exports, _emberCliMetaTagsComponentsHeadTag) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsComponentsHeadTag['default'];
    }
  });
});
define('pilots/components/head-tags', ['exports', 'ember-cli-meta-tags/components/head-tags'], function (exports, _emberCliMetaTagsComponentsHeadTags) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsComponentsHeadTags['default'];
    }
  });
});
define('pilots/components/image-asset', ['exports', 'ember'], function (exports, _ember) {
  var ImageAssetComponent;

  ImageAssetComponent = _ember['default'].Component.extend({
    tagName: '',
    thumbnailObserver: (function () {
      return this.get('image').setProperties({
        generatingNativeThumbnail: false,
        nativeThumbnail: this.get('image.file.thumbnail')
      });
    }).observes('image.file.thumbnail'),
    actions: {
      deleteAsset: function deleteAsset(asset, proxyAsset) {
        if (window.confirm('Are you sure? This will permanently remove this asset.')) {
          return asset.destroyRecord().then((function (_this) {
            return function (response) {
              alert('The asset was deleted successfully');
              console.log("send action deselectAll");
              return _this.sendAction('deselectAll');
            };
          })(this), function (response) {
            return alert('There was an issue deleting this asset');
          });
        }
      }
    }
  });

  exports['default'] = ImageAssetComponent;
});
define('pilots/components/input-inplace-edit', ['exports', 'ember'], function (exports, _ember) {
  var InputInplaceEditComponent;

  InputInplaceEditComponent = _ember['default'].Component.extend({
    classNames: ['form-group', 'form-group-inplace'],
    click: function click() {
      if (!this.get('isEditing')) {
        this.set('isEditing', true);
        return _ember['default'].run.scheduleOnce('afterRender', this, this.focusTextField);
      }
    },
    focusTextField: function focusTextField() {
      var $input, val;
      $input = this.$('input, textarea');
      val = $input.val();
      $input.focus();
      $input.val('');
      return $input.val(val);
    },
    flashSuccess: function flashSuccess() {
      return this.$('.inline-input').addClass('success');
    },
    actions: {
      save: function save() {
        var _this;
        _this = this;
        return this.get('model').save().then(function () {
          if (_this.$('input').attr('type') === "password") {
            _this.set('value', null);
          }
          _this.set('isEditing', false);
          return _ember['default'].run.scheduleOnce('afterRender', _this, _this.flashSuccess);
        }, function (response) {
          return _this.$('input').addClass('error');
        });
      }
    }
  });

  exports['default'] = InputInplaceEditComponent;
});
define('pilots/components/input-trigger-save', ['exports', 'ember'], function (exports, _ember) {
  var InputTriggerSaveComponent;

  InputTriggerSaveComponent = _ember['default'].TextField.extend({
    classNames: ['form-control'],
    type: 'text',
    keyPress: function keyPress(e) {
      if (e.which === 13) {
        return this.get('parentView.controller').send('save');
      }
    },
    focusOut: function focusOut() {
      return this.get('parentView.controller').send('save');
    }
  });

  exports['default'] = InputTriggerSaveComponent;
});
define('pilots/components/input-validated', ['exports', 'ember'], function (exports, _ember) {
  var InputValidatedComponent;

  InputValidatedComponent = _ember['default'].Component.extend({
    classNames: ['form-group'],
    actions: {
      showErrors: function showErrors() {
        return this.set('showError', true);
      }
    }
  });

  exports['default'] = InputValidatedComponent;
});
define('pilots/components/login-form', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/auth', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsAuth, _emberChangesetValidations, _emberChangeset) {
  var LoginFormComponent;

  LoginFormComponent = _ember['default'].Component.extend(_pilotsValidationsAuth['default'], {
    session: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    tagName: 'form',
    role: 'form',
    classNames: ['form', 'form-login'],
    attributeBindings: ['novalidate'],
    novalidate: true,
    homeUrl: "" + _pilotsConfigEnvironment['default'].dronebaseHome,
    buttonName: 'SUBMIT',
    buttonDisabled: false,
    credentials: {
      identification: null,
      password: null
    },
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('credentials'), (0, _emberChangesetValidations['default'])(_pilotsValidationsAuth['default']), _pilotsValidationsAuth['default']);
    }),
    actions: {
      save: function save(event) {
        event.preventDefault();
        this.changeset.set('authentication', null);
        return this.changeset.validate().then((function (_this) {
          return function () {
            if (_this.changeset.get('isInvalid')) {} else {
              return _this.changeset.save().then(_this.get('session').authenticate('authenticator:devise', _this.changeset.get('identification'), _this.changeset.get('password')).then(function (response) {
                var attemptedTransition;
                _this.get('metrics').trackEvent({
                  category: 'Authentication',
                  action: 'click',
                  label: 'Login - Success'
                });
                if (attemptedTransition = _this.get('session.attemptedTransition')) {
                  attemptedTransition.retry();
                  return _this.get('session').set('attemptedTransition', null);
                }
              }, function (response) {
                _this.get('metrics').trackEvent({
                  category: 'Authentication',
                  action: 'click',
                  label: 'Login - Failed'
                });
                return _this.changeset.pushErrors('authentication', response.errors[0].detail);
              }));
            }
          };
        })(this));
      }
    }
  });

  exports['default'] = LoginFormComponent;
});
define('pilots/components/markdown-to-html', ['exports', 'ember-cli-showdown/components/markdown-to-html'], function (exports, _emberCliShowdownComponentsMarkdownToHtml) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliShowdownComponentsMarkdownToHtml['default'];
    }
  });
});
define('pilots/components/md-dummy', ['exports', 'ember-remarkable/components/md-dummy'], function (exports, _emberRemarkableComponentsMdDummy) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRemarkableComponentsMdDummy['default'];
    }
  });
});
define('pilots/components/md-text', ['exports', 'ember-remarkable/components/md-text'], function (exports, _emberRemarkableComponentsMdText) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRemarkableComponentsMdText['default'];
    }
  });
});
define('pilots/components/mission-filters', ['exports', 'ember'], function (exports, _ember) {
  var MissionFiltersComponent;

  MissionFiltersComponent = _ember['default'].Component.extend({
    classNames: ['row']
  });

  exports['default'] = MissionFiltersComponent;
});
define('pilots/components/mission-map', ['exports', 'ember', 'pilots/data/map_style', 'ember-cli-file-saver/mixins/file-saver'], function (exports, _ember, _pilotsDataMap_style, _emberCliFileSaverMixinsFileSaver) {
  var MissionMapComponent;

  MissionMapComponent = _ember['default'].Component.extend(_emberCliFileSaverMixinsFileSaver['default'], {
    featureOptions: {
      PROPERTYAREA: {
        type: 'Property Area',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          fillColor: '#3fc0c2',
          fillOpacity: 0.5,
          editable: false,
          draggable: false,
          zIndex: 2
        }
      },
      NOFLYZONE: {
        type: 'No Fly Zone',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          fillColor: '#f26649',
          fillOpacity: 0.3,
          editable: false,
          draggable: false,
          zIndex: 2
        }
      },
      POINTOFINTEREST: {
        type: 'Point of Interest',
        geometry_type: 'Point',
        defaultOptions: {
          paths: null,
          draggable: false,
          icon: '/assets/images/blank.png',
          zIndex: 3
        }
      }
    },
    selectedFeatureOptions: {
      strokeWeight: 0,
      fillOpacity: 0.7,
      editable: false,
      draggable: false,
      zIndex: 2
    },
    disabledFeatureOptions: {
      strokeWeight: 0,
      fillOpacity: 0.3,
      editable: false,
      draggable: false,
      zIndex: 1
    },
    features: null,
    clientNotesVisible: false,
    mapStyles: _pilotsDataMap_style['default'],
    clientNotes: _ember['default'].computed('model.properties.features', function () {
      var clientNotes;
      clientNotes = [];
      if (!this.get('model.properties.features')) {
        return [];
      }
      this.get('model.properties.features').forEach(function (feature) {
        var clientNote;
        clientNote = {
          type: feature.properties.type,
          name: feature.properties.name,
          notes: feature.properties.notes,
          id: feature.id
        };
        return clientNotes.push(clientNote);
      });
      return clientNotes;
    }),
    onInit: _ember['default'].on('init', function () {
      return Em.run.scheduleOnce('afterRender', this, (function (_this) {
        return function () {
          _this.init_map();
          _this = _this;
          return $('.client-note').on('click', function () {
            var id;
            id = $(this).data('id');
            if (id == null) {
              return;
            }
            $('.client-note').removeClass('highlight');
            $(".id-" + id).addClass('highlight');
            id = id - 1;
            return _this.enableFeature(_this.get('geoFeatures')[id]);
          });
        };
      })(this));
    }),
    init_map: function init_map() {
      var _this, latLng, mapOptions;
      _this = this;
      this.set('features', Em.A([]));
      mapOptions = {
        tilt: 0,
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        streetViewControl: false,
        scaleControl: false,
        panControl: true,
        zoomControl: true,
        draggable: true,
        scrollwheel: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        panControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        styles: this.mapStyles
      };
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      }
      this.map.setZoom(13);
      this.map.data.addListener('addfeature', function (event) {
        var bounds, center, classes, id, latlng, marker;
        _this.map.data.overrideStyle(event.feature, _this.get("featureOptions." + event.feature.getProperty('type').replace(/ /g, '').toUpperCase() + ".defaultOptions"));
        _this.get('features').pushObject(_this.Feature.create({
          id: event.feature.getId(),
          type: event.feature.getProperty('type'),
          style: event.feature.getProperty('type').dasherize(),
          color: event.feature.getProperty('color'),
          object: event.feature,
          name: event.feature.getProperty('name'),
          notes: event.feature.getProperty('notes'),
          shots: event.feature.getProperty('shots')
        }));
        center = event.feature.getProperty('center');
        if (center) {
          latlng = new google.maps.LatLng(center.lat, center.lng);
        } else {
          if (event.feature.getGeometry().getType() === 'Point') {
            latlng = event.feature.getGeometry().get();
          } else {
            bounds = new google.maps.LatLngBounds();
            event.feature.getGeometry().getArray().forEach(function (path) {
              return path.getArray().forEach(function (latLng) {
                return bounds.extend(latLng);
              });
            });
            latlng = new google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng());
          }
        }
        if (!(id = event.feature.getId())) {
          id = 1;
        }
        if (event.feature.getGeometry().getType() === 'Point') {
          classes = 'client-note-marker point';
        } else {
          classes = 'client-note-marker polygon';
        }
        return marker = new RichMarker({
          position: latlng,
          map: _this.map,
          draggable: false,
          flat: true,
          content: "<div class='" + classes + "'>" + id + "</div>"
        });
      });
      this.map.data.addListener('setproperty', function (event) {
        var polygon;
        polygon = _this.get('features').findBy('object', event.feature);
        if (polygon) {
          return polygon.set(event.name, event.newValue);
        }
      });
      this.map.data.addListener('setgeometry', function (event) {
        if (event.feature.getGeometry().getType() === 'Polygon') {
          return _this.setGeometryData(event.feature);
        }
      });
      this.map.data.addListener('click', function (event) {
        return _this.enableFeature(event.feature);
      });
      this.map.data.addListener('mousedown', function (event) {
        return _this.infoWindow.close();
      });
      this.map.addListener('mousedown', (function (_this) {
        return function (event) {
          _this.infoWindow.close();
          return _this.set('clientNotesVisible', false);
        };
      })(this));
      this.map.addListener('zoom_changed', (function (_this) {
        return function (event) {
          return $('.client-note-marker').css('font-size', _this.map.getZoom() + 'px');
        };
      })(this));
      this.map.data.addListener('mousedown', (function (_this) {
        return function (event) {
          var id;
          id = event.feature.getId();
          _this.set('clientNotesVisible', true);
          $('.client-note').removeClass('highlight');
          return $(".id-" + id).addClass('highlight');
        };
      })(this));
      google.maps.event.addListenerOnce(this.map, 'idle', (function (_this) {
        return function () {
          return _this.addMarker(_this.map.getCenter(), false);
        };
      })(this));
      this.infowindow = new google.maps.InfoWindow();
      this.setupInfoWindow();
      this.Feature = _ember['default'].Object.extend({
        id: null,
        type: null,
        color: null,
        object: null,
        name: '',
        notes: '',
        area: null,
        center: null
      });
      google.maps.event.addListener(this.map, 'click', function () {
        return _this.disableFeatures();
      });
      latLng = null;
      if (this.get('model.properties') && this.get('model.properties.features')) {
        return this.addGeoJson(this.get('model.properties'));
      } else if (this.get('model.latitude') && this.get('model.longitude')) {
        latLng = new google.maps.LatLng({
          lat: Number(this.get('model.latitude')),
          lng: Number(this.get('model.longitude'))
        });
        return this.map.setCenter(latLng);
      } else {
        return this.defaultLocation();
      }
    },
    defaultLocation: function defaultLocation() {
      var lat_lng;
      lat_lng = new google.maps.LatLng(37.2350, -115.8111);
      return this.map.setCenter(lat_lng);
    },
    setupInfoWindow: function setupInfoWindow() {
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindowNode = _ember['default'].$('#info-window-node');
      return this.infoWindow.addListener('domready', function (event) {
        var iwBackground, iwCloseBtn, iwOuter;
        iwOuter = _ember['default'].$('.gm-style-iw');
        iwOuter.children().first().css({
          'display': 'block'
        });
        iwBackground = iwOuter.prev();
        iwBackground.children(':nth-child(2)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(4)').css({
          'display': 'none'
        });
        iwBackground.children(':nth-child(3)').find('div').children().css({
          'z-index': 1,
          'box-shadow': '0 1px 6px rgba(178, 178, 178, 0.6)'
        });
        iwCloseBtn = iwOuter.next();
        return iwCloseBtn.css({
          'display': 'none'
        });
      });
    },
    addGeoJson: function addGeoJson(json) {
      var _this, bounds, features;
      _this = this;
      features = this.map.data.addGeoJson(json);
      this.set('geoFeatures', features);
      bounds = new google.maps.LatLngBounds();
      features.forEach(function (feature) {
        if (feature.getGeometry().getType() === 'Polygon') {
          return feature.getGeometry().getArray().forEach(function (path) {
            return path.getArray().forEach(function (latLng) {
              return bounds.extend(latLng);
            });
          });
        } else if (feature.getGeometry().getType() === 'Point') {
          return bounds.extend(feature.getGeometry().get());
        }
      });
      this.enableFeature(features[0]);
      return this.map.fitBounds(bounds);
    },
    addMarker: function addMarker(position, draggable) {
      var _this, animation, marker;
      if (draggable == null) {
        draggable = true;
      }
      animation = google.maps.Animation.DROP;
      marker = new google.maps.Marker({
        map: this.map,
        position: position,
        draggable: draggable,
        animation: animation,
        icon: {
          url: '/assets/images/v2/client_mission_assigned.png'
        }
      });
      _this = this;
      return marker.addListener('click', function () {
        _this.enableInfoWindow();
        _this.infoWindow.setPosition(this.getPosition());
        return _this.infoWindow.open(_this.map);
      });
    },
    setGeometryData: function setGeometryData(polygon) {
      var bounds;
      bounds = new google.maps.LatLngBounds();
      polygon.getGeometry().getArray().forEach(function (path) {
        return path.getArray().forEach(function (latLng) {
          return bounds.extend(latLng);
        });
      });
      polygon.setProperty('bounds', bounds);
      polygon.setProperty('area', Math.round(google.maps.geometry.spherical.computeArea(polygon.getGeometry().getArray()[0].getArray())));
      return polygon.setProperty('center', polygon.getProperty('bounds').getCenter());
    },
    enableInfoWindow: function enableInfoWindow() {
      var addressLine1, addressLine2, feature_description, offsetHeight;
      addressLine1 = this.get('mission.location.address') + ", " + this.get('mission.location.city') + ",";
      addressLine2 = this.get('mission.location.state') + ", " + this.get('mission.location.country');
      feature_description = "<div class='client-infowindow'> <span class='address'>" + this.get('mission.id') + "</span><br> " + addressLine1 + "<br>" + addressLine2 + " </div>";
      offsetHeight = new google.maps.Size(-2, -30);
      this.infoWindow.setOptions({
        pixelOffset: offsetHeight
      });
      return this.infoWindow.setContent(feature_description);
    },
    enableFeature: function enableFeature(feature) {
      var _this;
      _this = this;
      this.map.data.overrideStyle(feature, this.get('selectedFeatureOptions'));
      return this.get('features').forEach(function (f) {
        if (feature.getId() !== f.id) {
          return _this.map.data.overrideStyle(f.object, _this.get('disabledFeatureOptions'));
        }
      });
    },
    disableFeatures: function disableFeatures() {
      var _this;
      _this = this;
      return this.get('features').forEach(function (f) {
        return _this.map.data.overrideStyle(f.object, _this.get('disabledPolygonOptions'));
      });
    },
    actions: {
      enable_feature: function enable_feature(feature) {
        return this.enableFeature(feature);
      },
      toggleClientNotes: function toggleClientNotes(event) {
        this.set('clientNotesVisible', !this.get('clientNotesVisible'));
        return $('.client-note').removeClass('highlight');
      },
      downloadKML: function downloadKML() {
        var bb, blob, error, error1, filename, kml;
        kml = tokml(this.get('mission.location.properties'));
        kml = kml.substring(kml.indexOf(">") + 1);
        try {
          blob = new Blob([kml], {
            type: 'application/vnd.google-earth.kml+xml'
          });
        } catch (error1) {
          error = error1;
          window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
          if (error.name === 'TypeError' && window.BlobBuilder) {
            bb = new BlobBuilder();
            bb.append(kml);
            blob = bb.getBlob("application/vnd.google-earth.kml+xml");
          } else if (e.name === 'InvalidStateError') {
            blob = new Blob([kml], {
              type: 'application/vnd.google-earth.kml+xml'
            });
          } else {
            alert('Downloading is not supported on your device.');
          }
        }
        filename = this.get('mission.id') + '_' + this.get('mission.location.address') + '_' + this.get('mission.location.city') + '_' + this.get('mission.location.state') + '_' + '.kml';
        filename = filename.split(' ').join('_');
        return this.saveFileAs(filename, blob, 'application/vnd.google-earth.kml+xml');
      }
    }
  });

  exports['default'] = MissionMapComponent;
});
define('pilots/components/mission-scheduled-at-time', ['exports', 'ember'], function (exports, _ember) {
  var MissionScheduledAtTimeComponent;

  MissionScheduledAtTimeComponent = _ember['default'].Component.extend({
    sameStartEndTime: _ember['default'].computed('model.scheduled_at_start', 'model.scheduled_at_end', function () {
      return this.get('model.scheduled_at_start') === this.get('model.scheduled_at_end');
    })
  });

  exports['default'] = MissionScheduledAtTimeComponent;
});
define('pilots/components/mission-weather-forecast', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var MissionWeatherForecastComponent;

  MissionWeatherForecastComponent = _ember['default'].Component.extend({
    classNames: ['weather-forecast'],
    sessionAccount: _ember['default'].inject.service(),
    hasForecast: _ember['default'].computed('dayForecastData', 'hourlyForecastData', 'threeDayForecastData', function () {
      return this.get('dayForecastData') || this.get('hourlyForecastData') || this.get('threeDayForecastData');
    }),
    dayForecastData: null,
    hourlyForecastData: null,
    threeDayForecastData: null,
    loading: true,
    forecast: null,
    dayForecast: false,
    hourlyForecast: null,
    didPilotScheduleDate: _ember['default'].observer('model.scheduled_at_start', function () {
      var pilotScheduledDay;
      pilotScheduledDay = moment(this.get('model.scheduled_at_start')).date();
      return this.get('forecast').daily.data.forEach((function (_this) {
        return function (day, index) {
          var endIndex, startIndex;
          if (moment.unix(day.time).date() === pilotScheduledDay) {
            if (index) {
              startIndex = index - 1;
            } else {
              startIndex = index;
            }
            endIndex = startIndex + 2;
            _this.set('dayForecastData', null);
            _this.set('hourlyForecastData', null);
            return _this.set('threeDayForecastData', _this.get('forecast').daily.data.slice(startIndex, +endIndex + 1 || 9e9));
          }
        };
      })(this));
    }),
    init: function init() {
      this._super();
      if (moment(this.get('model.scheduled_at_start')).isSameOrAfter(Date.now(), 'day') || !this.get('model.scheduled_at_start')) {
        this.set('scheduled_at_start', this.get('model.scheduled_at_start'));
      } else {
        this.set('scheduled_at_start', Date.now());
      }
      return this.fetchForecast();
    },
    fetchForecast: function fetchForecast() {
      var _this;
      _this = this;
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('model.id') + "/weather",
        type: 'GET',
        dataType: 'json',
        headers: _this.get('sessionAccount.headers')
      }).then(function (response) {
        _this.set('loading', false);
        _this.set('forecast', response);
        return _this.checkForecast();
      }, function (response) {});
    },
    checkForecast: function checkForecast() {
      var _dayForecast, _hourlyForecast, _validDay, _validHours, forecast, hourly_start_day, scheduled_at_start_unix;
      console.log('checkForecast');
      forecast = this.get('forecast');
      scheduled_at_start_unix = moment(this.get('scheduled_at_start')).unix();
      if (moment.unix(forecast.daily.data.get('firstObject').time).date() !== moment().date()) {
        forecast.daily.data.removeObject(forecast.daily.data.get('firstObject'));
      }
      hourly_start_day = moment(forecast.hourly.data.get('firstObject').time).day();
      if (moment(scheduled_at_start_unix).isBetween(hourly_start_day, forecast.hourly.data[24].time)) {
        _validHours = [7, 10, 13, 16, 19];
        _validDay = moment.unix(scheduled_at_start_unix).day();
        _hourlyForecast = _ember['default'].A([]);
        forecast.hourly.data.forEach(function (hour) {
          if (moment.unix(hour.time).day() === _validDay && _ember['default'].$.inArray(moment.unix(hour.time).hour(), _validHours) > -1) {
            return _hourlyForecast[_hourlyForecast.length] = hour;
          }
        });
        this.set('hourlyForecast', true);
        return this.set('hourlyForecastData', _hourlyForecast);
      } else if (moment(scheduled_at_start_unix).isBetween(forecast.daily.data.get('firstObject').time, forecast.daily.data.get('lastObject').time)) {
        _validDay = moment.unix(scheduled_at_start_unix).day();
        _dayForecast = null;
        forecast.daily.data.forEach(function (day) {
          if (moment.unix(day.time).day() === _validDay) {
            return _dayForecast = day;
          }
        });
        this.set('dayForecast', true);
        return this.set('dayForecastData', _dayForecast);
      } else if (!scheduled_at_start_unix) {
        return this.set('threeDayForecastData', forecast.daily.data.slice(0, 3));
      }
    },
    actions: {
      checkFiveDayForecast: function checkFiveDayForecast() {
        this.set('dayForecastData', null);
        this.set('hourlyForecastData', null);
        return this.set('threeDayForecastData', this.get('forecast').daily.data.slice(0, 3));
      },
      checkDefaultForecast: function checkDefaultForecast() {
        this.set('threeDayForecastData', null);
        return this.checkForecast();
      },
      hideWeather: function hideWeather() {
        return this.sendAction('hideWeather');
      }
    }
  });

  exports['default'] = MissionWeatherForecastComponent;
});
define('pilots/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('pilots/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _emberModalDialogComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialog['default'];
    }
  });
});
define('pilots/components/moment-format-local-date', ['exports', 'ember'], function (exports, _ember) {
  var MomentFormatLocalDateComponent;

  MomentFormatLocalDateComponent = _ember['default'].Component.extend({
    tagName: '',
    format: 'MM/DD/YYYY'
  });

  exports['default'] = MomentFormatLocalDateComponent;
});
define('pilots/components/moment-format-local-time', ['exports', 'ember'], function (exports, _ember) {
  var MomentFormatLocalTimeComponent;

  MomentFormatLocalTimeComponent = _ember['default'].Component.extend({
    tagName: '',
    format: 'hh:mmA',
    timezone: 'America/Los_Angeles',
    locatTime: null,
    formatTime: _ember['default'].on('init', function () {
      var moment_time;
      moment_time = moment.tz(this.get('model'), this.get('timezone')).format(this.get('format'));
      return this.set('localTime', moment_time);
    })
  });

  exports['default'] = MomentFormatLocalTimeComponent;
});
define('pilots/components/notification-dropdown', ['exports', 'ember'], function (exports, _ember) {
  var NotificationComponent;

  NotificationComponent = _ember['default'].Component.extend({
    tagName: 'tr',
    classNames: ['notification-list'],
    assetsDir: 'assets/images/notifications/',
    assetMap: _ember['default'].inject.service(),
    read: _ember['default'].computed('model.read_status', function () {
      if (this.get('model.read_status') === 'read') {
        return 'notification-list-read';
      }
    }),
    icon: _ember['default'].computed('model.fontIcon', function () {
      var iconArray, newAssetUrl;
      if (!this.get('read')) {
        return this.get('assetMap').resolve(this.assetsDir + this.get('model.fontIcon'));
      }
      iconArray = this.get('model.fontIcon').split('.');
      iconArray[0] = iconArray[0] + '_read';
      newAssetUrl = iconArray.join('.');
      return this.get('assetMap').resolve(this.assetsDir + newAssetUrl);
    }),
    router: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).lookup('router:main');
    }).readOnly(),
    store: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    click: function click(event) {
      event.preventDefault();
      this.markAsRead();
      switch (this.get('model.notification_type')) {
        case 'blog/new':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "New Blog"
          });
          return window.open('http://dronebase.com/blog');
        case 'pilot/mission/new':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Available Mission"
          });
          return this.routeToMission('availablemission');
        case 'app/updated':
          if (!confirm('In order to update our app we need to reload ' + 'your page. Click OK to reload.')) {
            return;
          }
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Reload App"
          });
          return location.reload();
        case 'pilot/mission/updated':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Mission Update"
          });
          return this.routeToMission();
        case 'pilot/payout/new':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "New Payout"
          });
          return this.get('router').transitionTo('pilotlog');
        case 'pilot/mission/pano_accept':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Accept Pano"
          });
          return this.routeToMission('panomission');
        case 'pilot/mission/pano_reject':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Reject Pano"
          });
          return this.routeToMission('panomission');
        case 'pilot/mission/getty_accept':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Accept Getty"
          });
          return this.get('router').transitionTo('pilotlog');
        case 'pilot/mission/getty_reject':
          this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Reject Getty"
          });
          return this.get('router').transitionTo('pilotlog');
      }
    },
    markAsRead: function markAsRead() {
      $('.notifications').toggle();
      if (this.get('model.read_status') !== 'unread') {
        return;
      }
      this.get('model').set('read_status', 'read');
      return this.get('model').save().then((function (_this) {
        return function (response) {
          return console.log('notifcation read');
        };
      })(this), (function (_this) {
        return function (response) {
          return console.log('could not mark notification as read');
        };
      })(this));
    },
    routeToMission: function routeToMission(route) {
      var mission_id;
      mission_id = this.get('model.web_route_url').split('/')[1];
      return this.get('store').findRecord('mission', mission_id).then((function (_this) {
        return function (mission) {
          return _this.get('router').transitionTo(route, mission.id);
        };
      })(this), (function (_this) {
        return function (response) {
          alert('This mission is no longer available...');
          return _this.get('metrics').trackEvent({
            category: 'Notifications',
            action: 'click',
            label: "Mission No Longer Available"
          });
        };
      })(this));
    }
  });

  exports['default'] = NotificationComponent;
});
define('pilots/components/object-bin', ['exports', 'ember-drag-drop/components/object-bin'], function (exports, _emberDragDropComponentsObjectBin) {
  exports['default'] = _emberDragDropComponentsObjectBin['default'];
});
define('pilots/components/one-way-checkbox', ['exports', 'ember-one-way-controls/components/one-way-checkbox'], function (exports, _emberOneWayControlsComponentsOneWayCheckbox) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayCheckbox['default'];
    }
  });
});
define('pilots/components/one-way-color', ['exports', 'ember-one-way-controls/components/one-way-color'], function (exports, _emberOneWayControlsComponentsOneWayColor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayColor['default'];
    }
  });
});
define('pilots/components/one-way-date', ['exports', 'ember-one-way-controls/components/one-way-date'], function (exports, _emberOneWayControlsComponentsOneWayDate) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayDate['default'];
    }
  });
});
define('pilots/components/one-way-datetime-local', ['exports', 'ember-one-way-controls/components/one-way-datetime-local'], function (exports, _emberOneWayControlsComponentsOneWayDatetimeLocal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayDatetimeLocal['default'];
    }
  });
});
define('pilots/components/one-way-email', ['exports', 'ember-one-way-controls/components/one-way-email'], function (exports, _emberOneWayControlsComponentsOneWayEmail) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayEmail['default'];
    }
  });
});
define('pilots/components/one-way-file', ['exports', 'ember-one-way-controls/components/one-way-file'], function (exports, _emberOneWayControlsComponentsOneWayFile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayFile['default'];
    }
  });
});
define('pilots/components/one-way-hidden', ['exports', 'ember-one-way-controls/components/one-way-hidden'], function (exports, _emberOneWayControlsComponentsOneWayHidden) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayHidden['default'];
    }
  });
});
define('pilots/components/one-way-input', ['exports', 'ember-one-way-controls/components/one-way-input'], function (exports, _emberOneWayControlsComponentsOneWayInput) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayInput['default'];
    }
  });
});
define('pilots/components/one-way-month', ['exports', 'ember-one-way-controls/components/one-way-month'], function (exports, _emberOneWayControlsComponentsOneWayMonth) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayMonth['default'];
    }
  });
});
define('pilots/components/one-way-number', ['exports', 'ember-one-way-controls/components/one-way-number'], function (exports, _emberOneWayControlsComponentsOneWayNumber) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayNumber['default'];
    }
  });
});
define('pilots/components/one-way-password', ['exports', 'ember-one-way-controls/components/one-way-password'], function (exports, _emberOneWayControlsComponentsOneWayPassword) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayPassword['default'];
    }
  });
});
define('pilots/components/one-way-radio', ['exports', 'ember-one-way-controls/components/one-way-radio'], function (exports, _emberOneWayControlsComponentsOneWayRadio) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayRadio['default'];
    }
  });
});
define('pilots/components/one-way-range', ['exports', 'ember-one-way-controls/components/one-way-range'], function (exports, _emberOneWayControlsComponentsOneWayRange) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayRange['default'];
    }
  });
});
define('pilots/components/one-way-search', ['exports', 'ember-one-way-controls/components/one-way-search'], function (exports, _emberOneWayControlsComponentsOneWaySearch) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWaySearch['default'];
    }
  });
});
define('pilots/components/one-way-select', ['exports', 'ember-one-way-controls/components/one-way-select'], function (exports, _emberOneWayControlsComponentsOneWaySelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWaySelect['default'];
    }
  });
});
define('pilots/components/one-way-select/option', ['exports', 'ember-one-way-controls/components/one-way-select/option'], function (exports, _emberOneWayControlsComponentsOneWaySelectOption) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWaySelectOption['default'];
    }
  });
});
define('pilots/components/one-way-tel', ['exports', 'ember-one-way-controls/components/one-way-tel'], function (exports, _emberOneWayControlsComponentsOneWayTel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayTel['default'];
    }
  });
});
define('pilots/components/one-way-text', ['exports', 'ember-one-way-controls/components/one-way-text'], function (exports, _emberOneWayControlsComponentsOneWayText) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayText['default'];
    }
  });
});
define('pilots/components/one-way-textarea', ['exports', 'ember-one-way-controls/components/one-way-textarea'], function (exports, _emberOneWayControlsComponentsOneWayTextarea) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayTextarea['default'];
    }
  });
});
define('pilots/components/one-way-time', ['exports', 'ember-one-way-controls/components/one-way-time'], function (exports, _emberOneWayControlsComponentsOneWayTime) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayTime['default'];
    }
  });
});
define('pilots/components/one-way-url', ['exports', 'ember-one-way-controls/components/one-way-url'], function (exports, _emberOneWayControlsComponentsOneWayUrl) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayUrl['default'];
    }
  });
});
define('pilots/components/one-way-week', ['exports', 'ember-one-way-controls/components/one-way-week'], function (exports, _emberOneWayControlsComponentsOneWayWeek) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayWeek['default'];
    }
  });
});
define('pilots/components/page-numbers', ['exports', 'ember-cli-pagination/components/page-numbers'], function (exports, _emberCliPaginationComponentsPageNumbers) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliPaginationComponentsPageNumbers['default'];
    }
  });
});
define('pilots/components/pano-mission-uploader', ['exports', 'ember', 'pilots/utils/w', 'pilots/config/environment', 'pilots/components/asset-uploader'], function (exports, _ember, _pilotsUtilsW, _pilotsConfigEnvironment, _pilotsComponentsAssetUploader) {
  var PanoMissionUploaderComponent;

  PanoMissionUploaderComponent = _pilotsComponentsAssetUploader['default'].extend({
    sessionAccount: _ember['default'].inject.service(),
    sortedImages: _ember['default'].computed('images.[]', function () {
      return this.get('images').sortBy('uploadNumber');
    }),
    addAsset: function addAsset(file) {
      if (this.get('mission.status') !== 'flight_complete') {
        this.updateStatus('flight_complete');
      }
      return this._super(file, null, this.get('mission'));
    },
    actions: {
      deleteAllAssets: function deleteAllAssets() {
        var targets;
        if (!confirm("Do you want to delete all " + this.get('mission.assetsCount') + " assets for this shot?")) {
          return;
        }
        targets = [];
        this.get('images').forEach(function (asset) {
          var item;
          item = {
            type: 'image',
            id: asset.get('id')
          };
          return targets.push(item);
        });
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('mission.id') + "/assets/delete_all",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            targets: targets
          }
        }).then((function (_this) {
          return function (response) {
            _this.get('mission').reload();
            return Em.run.later(function () {
              return _this.deselectAll();
            });
          };
        })(this), function (response) {
          return alert('Sorry, there was an error while deleting these assets.');
        });
      }
    }
  });

  exports['default'] = PanoMissionUploaderComponent;
});
define('pilots/components/pano-mission', ['exports', 'ember', 'pilots/config/environment', 'pilots/utils/init-qtip'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsUtilsInitQtip) {
  var PanoMissionComponent;

  PanoMissionComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    tagName: '',
    panoUrl: _ember['default'].computed('model.mission.panoramas', function () {
      if (this.get('model.mission.panoramas').objectAt(0)) {
        return this.get('model.mission.panoramas').objectAt(0).get('viewer_url') + this.get('sessionAccount.urlParams');
      } else {
        return '';
      }
    }),
    panoReady: _ember['default'].computed('model.mission.panoramas', function () {
      if (this.get('model.mission.panoramas').objectAt(0)) {
        return this.get('model.mission.panoramas').objectAt(0).get('processing_status') === 'ready';
      } else {
        return false;
      }
    }),
    frontShot: _ember['default'].computed('model.mission.shots.[]', function () {
      return this.get('model.mission.shots').filterBy('shot_type.slug', 'front_shot')[0];
    }),
    panoShot: _ember['default'].computed('model.mission.shots.[]', function () {
      return this.get('model.mission.shots').filterBy('shot_type.slug', 'pano_tiles')[0];
    }),
    showUploader: _ember['default'].computed('model.mission.status', function () {
      var status;
      status = this.get('model.mission.status');
      return status === 'pilot_assigned' || status === 'pilot_accepted' || status === 'flight_complete';
    }),
    missionComplete: _ember['default'].computed('model.mission.status', function () {
      return this.get('model.mission.status') === 'assets_classified';
    }),
    initShowPano: _ember['default'].on('init', function () {
      if (this.get('panoReady')) {
        return this.set('showPano', true);
      } else {
        return this.set('showPano', false);
      }
    }),
    didInsertElement: function didInsertElement() {
      return (0, _pilotsUtilsInitQtip['default'])('.pano-toggle');
    },
    actions: {
      addAsset: function addAsset(file, shot_id) {
        return this.sendAction('onfileadd', file, shot_id, this.get('model'));
      },
      startUpload: function startUpload(uploader) {
        return this.sendAction('onstartupload', uploader);
      },
      submitMission: function submitMission() {
        var _mission, headers;
        if (!this.get('frontShot.images.length') || !this.get('panoShot.images.length')) {
          alert('Please upload images to the pano shot and the front shot before submitting mission.');
          return;
        }
        if (!confirm('Do you want to submit this mission?')) {
          return;
        }
        _mission = this.get('model.mission');
        headers = this.get('sessionAccount.headers');
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + _mission.id + "/status/assets_classified",
          type: 'PATCH',
          dataType: 'json',
          headers: headers
        }).then(function (response) {
          _mission.reload();
          return console.log('success');
        }, function (response) {
          return console.log('fail');
        });
      },
      showWeather: function showWeather() {
        return this.set('showWeather', true);
      },
      hideWeather: function hideWeather() {
        return this.set('showWeather', false);
      },
      togglePanorama: function togglePanorama() {
        return this.set('showPano', !this.get('showPano'));
      }
    }
  });

  exports['default'] = PanoMissionComponent;
});
define('pilots/components/pill-list', ['exports', 'ember'], function (exports, _ember) {
  var PillListComponent;

  PillListComponent = _ember['default'].Component.extend({
    pillCount: 0,
    selectedIndex: null,
    pillsHash: _ember['default'].computed('count', 'selectedIndex', function () {
      var counter, max, selectedIndex, tempHash;
      counter = 0;
      max = this.get('pillCount');
      selectedIndex = this.get('selectedIndex');
      tempHash = [];
      while (counter < max) {
        tempHash.push(selectedIndex === counter);
        counter += 1;
      }
      return tempHash;
    })
  });

  exports['default'] = PillListComponent;
});
define('pilots/components/pilot-dashboard', ['exports', 'ember', 'pilots/config/environment', 'pilots/data/mission_type', 'pilots/data/map_style'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsDataMission_type, _pilotsDataMap_style) {
  var PilotDashboardComponent;

  PilotDashboardComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    trainingMissions: _ember['default'].computed('model.missions.[]', function () {
      return this.get('model.missions').filter(function (mission) {
        return mission.get('mission_type') === 'training';
      }).filter(function (mission) {
        return mission.get('status') !== 'rejected';
      }).filter(function (mission) {
        return mission.get('status') !== 'canceled';
      });
    }),
    showMapView: false,
    clientMissions: _ember['default'].computed('model.missions.[]', function () {
      return this.get('model.missions').filter(function (mission) {
        return mission.get('mission_type') === 'client';
      }).filter(function (mission) {
        return mission.get('status') !== 'canceled';
      });
    }),
    gettyMissions: _ember['default'].computed('model.missions.[]', function () {
      return this.get('model.missions').filter(function (mission) {
        return mission.get('mission_type') === 'creative';
      }).filter(function (mission) {
        return mission.get('status') === 'flight_complete';
      });
    }),
    showNoMissionsInfoGraph: _ember['default'].computed('model.pilot.total_client_missions.[]', 'model.pilot.total_training_missions.[]', 'model.pilot.missing_profile_data', function () {
      return !this.get('model.pilot.missing_profile_data') && (this.get('model.pilot.total_client_missions') || this.get('model.pilot.total_training_missions'));
    }),
    actions: {
      showMapView: function showMapView(missionList, missionType) {
        this.set('mapViewMissions', missionList);
        this.set('mapViewMissionType', missionType);
        return this.set('showMapView', true);
      },
      hideMapView: function hideMapView() {
        return this.set('showMapView', false);
      },
      deleteMission: function deleteMission(mission) {
        var _this;
        if (mission.get('mission_type') === 'client' || mission.get('mission_type') === 'training') {
          _this = this;
          return _ember['default'].$.ajax({
            url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission.id + "/invitation",
            type: 'DELETE',
            dataType: 'json',
            headers: this.get('sessionAccount.headers')
          }).then((function (_this) {
            return function (response) {
              _this.get('model.missions').removeObject(mission);
              return _this.get('model.missions').save();
            };
          })(this), (function (_this) {
            return function (response) {
              return console.log('fail: response ', response);
            };
          })(this));
        } else {
          _this = this;
          return _ember['default'].$.ajax({
            url: _pilotsConfigEnvironment['default'].api.host + "/v2/pilots/missions/" + mission.id,
            type: 'DELETE',
            dataType: 'json',
            headers: this.get('sessionAccount.headers')
          }).then((function (_this) {
            return function (response) {
              _this.get('model.missions').removeObject(mission);
              return _this.get('model.missions').save();
            };
          })(this), (function (_this) {
            return function (response) {
              return alert("Something went wrong. Please try again or contact: pilots@dronebase.com");
            };
          })(this));
        }
      }
    }
  });

  exports['default'] = PilotDashboardComponent;
});
define('pilots/components/pilot-details', ['exports', 'ember'], function (exports, _ember) {
  var PilotDetailsComponent;

  PilotDetailsComponent = _ember['default'].Component.extend({
    tagName: ''
  });

  exports['default'] = PilotDetailsComponent;
});
define('pilots/components/pilot-form', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/pilot', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsPilot, _emberChangesetValidations, _emberChangeset) {
  var PilotFormComponent;

  PilotFormComponent = _ember['default'].Component.extend(_pilotsValidationsPilot['default'], {
    tagName: 'form',
    role: 'form',
    metrics: _ember['default'].inject.service(),
    session: _ember['default'].inject.service(),
    router: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).lookup('router:main');
    }).readOnly(),
    buttonName: 'REGISTER',
    buttonDisabled: false,
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('pilot'), (0, _emberChangesetValidations['default'])(_pilotsValidationsPilot['default']), _pilotsValidationsPilot['default']);
    }),
    actions: {
      save: function save(event) {
        event.preventDefault();
        this.set('buttonName', 'REGISTERING...');
        return this.changeset.validate().then((function (_this) {
          return function () {
            if (_this.changeset.get('isInvalid')) {
              _this.set('buttonName', 'REGISTER');
            } else {
              return _this.changeset.save().then(function () {
                _this.get('metrics').trackEvent({
                  category: 'Users',
                  action: 'submit',
                  label: 'Registration Completed'
                });
                if (_pilotsConfigEnvironment['default'].environment === 'production') {
                  Cookies.set('registrationCompleted', 'true');
                }
                _this.set('buttonName', 'REGISTERED');
                _this.get('session').authenticate('authenticator:devise', _this.get('pilot.email'), _this.get('pilot.password')).then(function () {
                  _this.set('pilot.password', null);
                  return _this.get('router').transitionTo('profile');
                });
                (function (response) {});
                return console.log('server side validation failed');
              })["catch"](function () {
                return _this.get('pilot.errors').forEach(function (arg) {
                  var attribute, message;
                  attribute = arg.attribute, message = arg.message;
                  _this.changeset.pushErrors(attribute, message);
                  _this.set('buttonName', 'REGISTER');
                });
              });
            }
          };
        })(this));
      }
    }
  });

  exports['default'] = PilotFormComponent;
});
define('pilots/components/pilot-log', ['exports', 'ember'], function (exports, _ember) {
  var PilotlogComponent;

  PilotlogComponent = _ember['default'].Component.extend({
    metrics: _ember['default'].inject.service(),
    didRender: function didRender() {
      return $('.top-row').on('click', (function (_this) {
        return function (e) {
          return _this.toggleMissionListing(e);
        };
      })(this));
    },
    toggleMissionListing: function toggleMissionListing(e) {
      var element;
      e.stopPropagation();
      element = $(e.target).closest('.mission-listing').children('.expanded-mission');
      if (element.css('display') === 'none') {
        element.css('display', 'flex');
      } else {
        element.css('display', 'none');
      }
      return this.get('metrics').trackEvent({
        category: 'Completed Missions',
        action: 'click',
        label: "Toggle Mission"
      });
    }
  });

  exports['default'] = PilotlogComponent;
});
define('pilots/components/pilot-mission-information', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var PilotMissionInformation;

  PilotMissionInformation = _ember['default'].Component.extend({
    classNames: ['mission-list-data'],
    actions: {
      confirmDeclined: function confirmDeclined() {
        return this.sendAction("deleteAction", this.get('mission'));
      },
      decline: function decline(mission) {
        return this.set('declineModal', true);
      },
      closeDeclinedModal: function closeDeclinedModal() {
        return this.set('declineModal', false);
      }
    }
  });

  exports['default'] = PilotMissionInformation;
});
define('pilots/components/pilot-mission-list', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var PilotMissionListComponent;

  PilotMissionListComponent = _ember['default'].Component.extend({
    classNames: ['mission-list-data'],
    missionPage: 0,
    sortMissions: function sortMissions(a, b) {
      var missionOrder;
      missionOrder = ['pilots_notified', 'pilot_accepted', 'flight_complete', 'assets_uploaded'];
      if (a.get('status') === b.get('status')) {
        if (a.get('status') === 'pilots_notified') {
          if (a.get('mission_type') !== b.get('mission_type')) {
            if (a.get('mission_type') === 'training') {
              return 1;
            }
            return -1;
          }
        }
        if (a.get('scheduled_at_start') && b.get('scheduled_at_start')) {
          return a.get('pilots_notified') < b.get('pilots_notified');
        }
        if (a.get('scheduled_at_start')) {
          return 1;
        }
        return -1;
      }
      return missionOrder.indexOf(a.get('status')) - missionOrder.indexOf(b.get('status'));
    },
    sortedMissions: _ember['default'].computed('missions.[]', 'trainingMissions.[]', function () {
      return this.get('missions').concat(this.get('trainingMissions') ? this.get('trainingMissions') : []).sort(this.sortMissions).filter(function (mission) {
        return mission.get('status') !== 'created';
      });
    }),
    missionPages: _ember['default'].computed('sortedMissions', function () {
      var i, j, missionPages;
      missionPages = [];
      i = 0;
      j = 0;
      while (j < this.get('sortedMissions').length / 10) {
        missionPages.push([]);
        j++;
      }
      j = 0;
      while (j * 10 + i < this.get('sortedMissions').length) {
        missionPages[j].push(this.get('sortedMissions')[j * 10 + i]);
        i++;
        if (i >= 10) {
          i = 0;
          j++;
        }
      }
      return missionPages;
    }),
    displayMissions: _ember['default'].computed('missionPages', 'missionPage', function () {
      return this.get('missionPages')[this.get('missionPage')];
    }),
    displayMissionsMobile: _ember['default'].computed('missionPages', 'missionPage', function () {
      var i, missions;
      i = 0;
      missions = [];
      while (i <= this.get('missionPage')) {
        missions = missions.concat(this.get('missionPages')[i]);
        i++;
      }
      return missions;
    }),
    needMorePages: _ember['default'].computed('sortedMissions', function () {
      return this.get('sortedMissions').length > 10;
    }),
    actions: {
      changePage: function changePage(pageNumber) {
        this.set('missionPage', pageNumber);
        $(".mission-page").removeClass('selected');
        return $("#mission-page" + pageNumber).addClass('selected');
      },
      showMoreMissions: function showMoreMissions() {
        return this.set('missionPage', this.get('missionPage') + 1);
      },
      deleteMission: function deleteMission(mission) {
        return this.sendAction("deleteAction", mission);
      }
    }
  });

  exports['default'] = PilotMissionListComponent;
});
define('pilots/components/pilot-profile-address-lookup', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileAddressLookupComponent;

  PilotProfileAddressLookupComponent = _ember['default'].Component.extend({
    classNames: ['form-group'],
    didInsertElement: function didInsertElement() {
      return this.setupAutocomplete();
    },
    setupAutocomplete: function setupAutocomplete() {
      var autocomplete, input;
      input = this.$('input')[0];
      autocomplete = new google.maps.places.SearchBox(input);
      google.maps.event.addDomListener(input, 'keydown', function (e) {
        if (e.keyCode === 13) {
          return e.preventDefault();
        }
      });
      return autocomplete.addListener('places_changed', (function (_this) {
        return function () {
          var address_components, city, place;
          place = autocomplete.getPlaces()[0];
          if (!(place && place.geometry)) {
            _this.set('error', 'Not a valid address. Please try again.');
            _this.set('showError', true);
            return;
          }
          address_components = {};
          Em.$.each(place.address_components, function (k, v1) {
            Em.$.each(v1.types, function (k2, v2) {
              address_components[v2] = v1;
            });
          });
          if (address_components.street_number && address_components.route) {
            _this.set('changeset.address', address_components.street_number.long_name + " " + address_components.route.long_name);
          } else if (address_components.route) {
            _this.set('changeset.address', address_components.route.long_name);
          } else {
            _this.set('changeset.address', null);
          }
          if (city = address_components.locality || address_components.administrative_area_level_3 || address_components.neighborhood) {
            _this.set('changeset.city', city.long_name);
          } else {
            _this.set('changeset.city', null);
          }
          if (address_components.administrative_area_level_1) {
            _this.set('changeset.state', address_components.administrative_area_level_1.long_name);
          } else {
            _this.set('changeset.state', null);
          }
          if (address_components.country) {
            _this.set('changeset.country', address_components.country.short_name);
          } else {
            _this.set('changeset.country', null);
          }
          if (address_components.postal_code) {
            _this.set('changeset.postal_code', address_components.postal_code.long_name);
          } else {
            _this.set('changeset.postal_code', null);
          }
          _this.set('changeset.longitude', place.geometry.location.lng());
          _this.set('changeset.latitude', place.geometry.location.lat());
          ['address', 'city', 'country', 'longitude', 'latitude'].forEach(function (field) {
            return _this.get('changeset').validate(field);
          });
          if (_this.get('changeset.isValid')) {
            return _this.get('changeset').save();
          }
        };
      })(this));
    },
    actions: {
      showError: function showError() {
        return this.set('showError', true);
      },
      checkEmpty: function checkEmpty() {
        if (this.$('input')[0].value.trim() === '') {
          this.set('changeset.address', null);
          return this.get('changeset').validate('address');
        }
      }
    }
  });

  exports['default'] = PilotProfileAddressLookupComponent;
});
define('pilots/components/pilot-profile-device-new', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDeviceNewComponent;

  PilotProfileDeviceNewComponent = _ember['default'].Component.extend({
    pilotDevicesNumber: _ember['default'].computed('model.pilotDevices.length', function () {
      return this.get('model.pilotDevices.length') + 1;
    }),
    observepilotDevicesNumber: _ember['default'].observer('model.pilotDevices.length', function () {
      return this.set('pilotDevicesNumber', this.get('model.pilotDevices.length') + 1);
    }),
    availableDevices: _ember['default'].computed('model.pilotDevices.[]', function () {
      var pilotDevices;
      pilotDevices = [];
      this.get('model.devices').forEach((function (_this) {
        return function (device) {
          if (!_this.get('model.pilotDevices').mapBy('device').mapBy('content').includes(device)) {
            return pilotDevices.push(device);
          }
        };
      })(this));
      return pilotDevices;
    }),
    cta: _ember['default'].computed('model.pilotDevices.length', function () {
      if (this.get('model.pilotDevices.length') > 0) {
        return 'Add Another Device';
      } else {
        return 'Choose Device Type';
      }
    }),
    didInsertElement: function didInsertElement() {
      return this.$('.select-device').on('click', (function (_this) {
        return function () {
          event.stopPropagation();
          _this.$('.device-dropdown').toggle();
          return $('html').one('click', function () {
            return $('.device-dropdown').hide();
          });
        };
      })(this));
    },
    actions: {
      create: function create(device) {
        this.$('.device-dropdown').toggle();
        return this.sendAction('createAction', device);
      }
    }
  });

  exports['default'] = PilotProfileDeviceNewComponent;
});
define('pilots/components/pilot-profile-device', ['exports', 'ember', 'pilots/config/environment', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _emberChangeset) {
  var PilotProfileDeviceComponent;

  PilotProfileDeviceComponent = _ember['default'].Component.extend({
    pilotDeviceNumber: _ember['default'].computed('index', function () {
      if (this.get('index') >= 0) {
        return this.get('index') + 1;
      }
    }),
    actions: {
      destroy: function destroy(device) {
        this.set('pilotDeviceNumber', this.get('pilotDeviceNumber') - 1);
        return this.sendAction('destroyAction', device);
      }
    }
  });

  exports['default'] = PilotProfileDeviceComponent;
});
define('pilots/components/pilot-profile-devices', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDevicesComponent;

  PilotProfileDevicesComponent = _ember['default'].Component.extend({
    classNames: ['profile-component'],
    store: _ember['default'].inject.service(),
    devicesAvailable: _ember['default'].computed('model.pilotDevices.[]', function () {
      return this.get('model.pilotDevices.length') < this.get('model.devices.length');
    }),
    missingInfo: _ember['default'].computed('model.pilotDevices.[]', function () {
      return this.get('model.pilotDevices.length') === 0;
    }),
    actions: {
      createDevice: function createDevice(device) {
        device = this.get('store').createRecord('pilot-device', {
          device: device,
          pilot: this.get('model.pilot')
        });
        return device.save();
      },
      destroyDevice: function destroyDevice(device) {
        return device.destroyRecord().then((function (_this) {
          return function () {
            return _this.get('model.pilot').reload();
          };
        })(this));
      }
    }
  });

  exports['default'] = PilotProfileDevicesComponent;
});
define('pilots/components/pilot-profile-drone-camera', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDroneCameraComponent;

  PilotProfileDroneCameraComponent = _ember['default'].Component.extend({
    actions: {
      create: function create(camera) {
        return this.sendAction('createAction', camera);
      }
    }
  });

  exports['default'] = PilotProfileDroneCameraComponent;
});
define('pilots/components/pilot-profile-drone-cameras', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDroneCamerasComponent;

  PilotProfileDroneCamerasComponent = _ember['default'].Component.extend({
    selectedCameras: _ember['default'].computed('pilotDrone.cameras.[]', function () {
      var cameras;
      cameras = [];
      this.get('pilotDrone.cameras').forEach(function (camera) {
        if (!camera.get('stock')) {
          return cameras.pushObject(camera);
        }
      });
      return cameras;
    }),
    didInsertElement: function didInsertElement() {
      this.$('.cameras-section, .camera-dropdown-arrow').on('click', (function (_this) {
        return function (event) {
          event.stopPropagation();
          if (event.target !== event.currentTarget) {
            return;
          }
          _this.$('.camera-dropdown').toggle();
          return $('html').one('click', function () {
            return $('.camera-dropdown').hide();
          });
        };
      })(this));
      if (this.get('pilotDrone.isNew')) {
        return this.$('.camera-dropdown').toggle();
      }
    },
    actions: {
      createCamera: function createCamera(camera) {
        this.$('.camera-dropdown').toggle();
        this.get('pilotDrone.cameras').pushObject(camera);
        return this.get('pilotDrone').save();
      },
      destroyCamera: function destroyCamera(camera) {
        if (this.get('pilotDrone.cameras.length') === 1) {
          alert('You need to have at least one non-stock camera for this drone.');
          return;
        }
        this.get('pilotDrone.cameras').removeObject(camera);
        return this.get('pilotDrone').save();
      }
    }
  });

  exports['default'] = PilotProfileDroneCamerasComponent;
});
define('pilots/components/pilot-profile-drone-system-new', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDroneSystemNewComponent;

  PilotProfileDroneSystemNewComponent = _ember['default'].Component.extend({
    pilotDroneNumber: _ember['default'].computed('model.pilotDrones.length', function () {
      return this.get('model.pilotDrones.length') + 1;
    }),
    observePilotDroneLength: _ember['default'].observer('model.pilotDrones.length', function () {
      return this.set('pilotDroneNumber', this.get('model.pilotDrones.length') + 1);
    }),
    cta: _ember['default'].computed('model.pilotDrones.length', function () {
      if (this.get('model.pilotDrones.length') > 0) {
        return 'Add Another Drone';
      } else {
        return 'Add a Drone';
      }
    }),
    didInsertElement: function didInsertElement() {
      return this.$('.select-drone').on('click', (function (_this) {
        return function () {
          event.stopPropagation();
          _this.$('.drone-dropdown').toggle();
          return $('html').one('click', function () {
            return $('.drone-dropdown').hide();
          });
        };
      })(this));
    },
    actions: {
      create: function create(drone) {
        this.$('.drone-dropdown').toggle();
        return this.sendAction('createAction', drone);
      }
    }
  });

  exports['default'] = PilotProfileDroneSystemNewComponent;
});
define('pilots/components/pilot-profile-drone-system', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDroneSystemComponent;

  PilotProfileDroneSystemComponent = _ember['default'].Component.extend({
    classNames: ['drone-system'],
    pilotDroneNumber: _ember['default'].computed('index', function () {
      if (this.get('index') >= 0) {
        return this.get('index') + 1;
      }
    }),
    actions: {
      destroy: function destroy(drone) {
        this.set('pilotDroneNumber', this.get('pilotDroneNumber') - 1);
        return this.sendAction('destroyAction', drone);
      }
    }
  });

  exports['default'] = PilotProfileDroneSystemComponent;
});
define('pilots/components/pilot-profile-drone-systems', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileDroneSystemsComponent;

  PilotProfileDroneSystemsComponent = _ember['default'].Component.extend({
    classNames: ['profile-component'],
    store: _ember['default'].inject.service(),
    onInit: _ember['default'].on('init', function () {}),
    missingInfo: _ember['default'].computed('model.pilotDrones.[]', function () {
      return this.get('model.pilotDrones.length') === 0;
    }),
    sortedPilotDrones: _ember['default'].computed('model.pilotDrones.[]', function () {
      return this.get('model.pilotDrones').sortBy('drone.full_name');
    }),
    actions: {
      createDrone: function createDrone(drone) {
        var pilotDrone;
        pilotDrone = this.get('store').createRecord('pilot-drone', {
          drone: drone,
          pilot: this.get('model.pilot')
        });
        return pilotDrone.save();
      },
      destroyDrone: function destroyDrone(drone) {
        return drone.destroyRecord().then((function (_this) {
          return function () {
            return _this.get('model.pilot').reload();
          };
        })(this));
      }
    }
  });

  exports['default'] = PilotProfileDroneSystemsComponent;
});
define('pilots/components/pilot-profile-equipment-existing', ['exports', 'ember', 'pilots/config/environment', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _emberChangeset) {
  var PilotProfileEquipmentExistingComponent;

  PilotProfileEquipmentExistingComponent = _ember['default'].Component.extend({
    pilotEquipmentNumber: _ember['default'].computed('index', function () {
      if (this.get('index') >= 0) {
        return this.get('index') + 1;
      }
    }),
    actions: {
      destroy: function destroy(equipment) {
        this.set('pilotEquipmentNumber', this.get('pilotEquipmentNumber') - 1);
        return this.sendAction('destroyAction', equipment);
      }
    }
  });

  exports['default'] = PilotProfileEquipmentExistingComponent;
});
define('pilots/components/pilot-profile-equipment-new', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileEquipmentNewComponent;

  PilotProfileEquipmentNewComponent = _ember['default'].Component.extend({
    pilotEquipmentNumber: _ember['default'].computed('model.pilotEquipment.length', function () {
      return this.get('model.pilotEquipment.length') + 1;
    }),
    observepilotEquipmentNumber: _ember['default'].observer('model.pilotEquipment.length', function () {
      return this.set('pilotEquipmentNumber', this.get('model.pilotEquipment.length') + 1);
    }),
    availableEquipment: _ember['default'].computed('model.pilotEquipment.[]', function () {
      var pilotEquipment;
      pilotEquipment = [];
      this.get('model.equipment').forEach((function (_this) {
        return function (equipment) {
          if (!_this.get('model.pilotEquipment').mapBy('pilot_equipment').mapBy('content').includes(equipment)) {
            return pilotEquipment.push(equipment);
          }
        };
      })(this));
      return pilotEquipment;
    }),
    didInsertElement: function didInsertElement() {
      return this.$('.select-equipment').on('click', (function (_this) {
        return function () {
          event.stopPropagation();
          _this.$('.equipment-dropdown').toggle();
          return $('html').one('click', function () {
            return $('.equipment-dropdown').hide();
          });
        };
      })(this));
    },
    actions: {
      create: function create(equipment) {
        this.$('.equipment-dropdown').toggle();
        return this.sendAction('createAction', equipment);
      }
    }
  });

  exports['default'] = PilotProfileEquipmentNewComponent;
});
define('pilots/components/pilot-profile-equipment', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileEquipmentComponent;

  PilotProfileEquipmentComponent = _ember['default'].Component.extend({
    classNames: ['profile-component'],
    store: _ember['default'].inject.service(),
    equipmentAvailable: _ember['default'].computed('model.pilotEquipment.[]', function () {
      return this.get('model.pilotEquipment.length') < this.get('model.equipment.length');
    }),
    missingInfo: _ember['default'].computed('model.pilotEquipment.[]', function () {
      return this.get('model.pilotEquipment.length') === 0;
    }),
    actions: {
      createEquipment: function createEquipment(pilot_equipment) {
        var pilotEquipment;
        pilotEquipment = this.get('store').createRecord('pilot-pilot-equipment', {
          pilot_equipment: pilot_equipment,
          pilot: this.get('model.pilot')
        });
        return pilotEquipment.save();
      },
      destroyEquipment: function destroyEquipment(pilot_equipment) {
        return pilot_equipment.destroyRecord().then((function (_this) {
          return function () {
            return _this.get('model.pilot').reload();
          };
        })(this));
      }
    }
  });

  exports['default'] = PilotProfileEquipmentComponent;
});
define('pilots/components/pilot-profile-license-new', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileLicenseNewComponent;

  PilotProfileLicenseNewComponent = _ember['default'].Component.extend({
    pilotLicenseNumber: _ember['default'].computed('model.pilotLicenses.length', function () {
      return this.get('model.pilotLicenses.length') + 1;
    }),
    observePilotLicenseNumber: _ember['default'].observer('model.pilotLicenses.length', function () {
      return this.set('pilotLicenseNumber', this.get('model.pilotLicenses.length') + 1);
    }),
    availableLicenses: _ember['default'].computed('model.pilotLicenses.[]', function () {
      var licenses;
      licenses = [];
      this.get('model.licenses').forEach((function (_this) {
        return function (license) {
          if (!_this.get('model.pilotLicenses').mapBy('license').mapBy('content').includes(license)) {
            return licenses.push(license);
          }
        };
      })(this));
      return licenses;
    }),
    cta: _ember['default'].computed('model.pilotLicenses.length', function () {
      if (this.get('model.pilotLicenses.length') > 0) {
        return 'Add Another License';
      } else {
        return 'Add a License';
      }
    }),
    didInsertElement: function didInsertElement() {
      return this.$('.select-license').on('click', (function (_this) {
        return function () {
          event.stopPropagation();
          _this.$('.license-dropdown').toggle();
          return $('html').one('click', function () {
            return $('.license-dropdown').hide();
          });
        };
      })(this));
    },
    actions: {
      create: function create(license) {
        this.$('.license-dropdown').toggle();
        return this.sendAction('newAction', license);
      }
    }
  });

  exports['default'] = PilotProfileLicenseNewComponent;
});
define('pilots/components/pilot-profile-license', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/pilot-license', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsPilotLicense, _emberChangesetValidations, _emberChangeset) {
  var PilotProfileLicenseComponent;

  PilotProfileLicenseComponent = _ember['default'].Component.extend(_pilotsValidationsPilotLicense['default'], {
    pilotLicenseNumber: _ember['default'].computed('index', function () {
      if (this.get('index') >= 0) {
        return this.get('index') + 1;
      }
    }),
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('pilotLicense'), (0, _emberChangesetValidations['default'])(_pilotsValidationsPilotLicense['default']), _pilotsValidationsPilotLicense['default']);
    }),
    didInsertElement: function didInsertElement() {
      return this.$('input')[0].focus();
    },
    actions: {
      destroy: function destroy(license) {
        this.set('pilotLicenseNumber', this.get('pilotLicenseNumber') - 1);
        return this.sendAction('destroyAction', license);
      }
    }
  });

  exports['default'] = PilotProfileLicenseComponent;
});
define('pilots/components/pilot-profile-licenses', ['exports', 'ember'], function (exports, _ember) {
  var PilotProfileLicensesComponent;

  PilotProfileLicensesComponent = _ember['default'].Component.extend({
    classNames: ['profile-component'],
    store: _ember['default'].inject.service(),
    licensesAvailable: _ember['default'].computed('model.pilotLicenses.[]', function () {
      return this.get('model.pilotLicenses.length') < this.get('model.licenses.length');
    }),
    missingInfo: _ember['default'].computed('model.pilotLicenses.[]', function () {
      return this.get('model.pilotLicenses.length') === 0;
    }),
    actions: {
      newLicense: function newLicense(license) {
        return this.get('store').createRecord('pilot-license', {
          license: license,
          pilot: this.get('model.pilot')
        });
      },
      createLicense: function createLicense(license) {
        return license.save();
      },
      destroyLicense: function destroyLicense(license) {
        return license.destroyRecord().then((function (_this) {
          return function () {
            return _this.get('model.pilot').reload();
          };
        })(this));
      }
    }
  });

  exports['default'] = PilotProfileLicensesComponent;
});
define('pilots/components/pilot-profile-mission-preferences', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/pilot', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsPilot, _emberChangesetValidations, _emberChangeset) {
  var PilotProfileMissionPreferencesComponent;

  PilotProfileMissionPreferencesComponent = _ember['default'].Component.extend(_pilotsValidationsPilot['default'], {
    classNames: ['profile-component'],
    metrics: _ember['default'].inject.service(),
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('model.pilot'), (0, _emberChangesetValidations['default'])(_pilotsValidationsPilot['default']), _pilotsValidationsPilot['default']);
    })
  });

  exports['default'] = PilotProfileMissionPreferencesComponent;
});
define('pilots/components/pilot-profile-payment-information', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/pilot', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsPilot, _emberChangesetValidations, _emberChangeset) {
  var PilotProfilePaymentInformationComponent;

  PilotProfilePaymentInformationComponent = _ember['default'].Component.extend(_pilotsValidationsPilot['default'], {
    classNames: ['profile-component'],
    metrics: _ember['default'].inject.service(),
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('model.pilot'), (0, _emberChangesetValidations['default'])(_pilotsValidationsPilot['default']), _pilotsValidationsPilot['default']);
    }),
    international: _ember['default'].computed('model.pilot.country', function () {
      return this.get('model.pilot.country') !== 'US';
    })
  });

  exports['default'] = PilotProfilePaymentInformationComponent;
});
define('pilots/components/pilot-profile-personal-information', ['exports', 'ember', 'pilots/config/environment', 'pilots/validations/pilot', 'ember-changeset-validations', 'ember-changeset'], function (exports, _ember, _pilotsConfigEnvironment, _pilotsValidationsPilot, _emberChangesetValidations, _emberChangeset) {
  var PilotProfilePersonalInformationComponent;

  PilotProfilePersonalInformationComponent = _ember['default'].Component.extend(_pilotsValidationsPilot['default'], {
    classNames: ['profile-component'],
    metrics: _ember['default'].inject.service(),
    initChangeSet: _ember['default'].on('init', function () {
      return this.changeset = new _emberChangeset['default'](this.get('model.pilot'), (0, _emberChangesetValidations['default'])(_pilotsValidationsPilot['default']), _pilotsValidationsPilot['default']);
    })
  });

  exports['default'] = PilotProfilePersonalInformationComponent;
});
define('pilots/components/pilot-profile', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var PilotProfileComponent;

  PilotProfileComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    returnedOptIns: false,
    onInit: _ember['default'].on('init', function () {
      if (this.get('model.pilotLicenses.length') === 0 || this.get('model.pilotDrones.length') === 0 || !this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance') || this.get('model.pilotDevices.length') === 0) {
        return this.set('showHeaderBadge', true);
      }
    }),
    didInsertElement: function didInsertElement() {
      var cookie;
      $('.overlay').height($(this.element).height() + 50);
      cookie = Cookies.get('viewedLightBoxes');
      if (!cookie && this.get('showHeaderBadge')) {
        $('.overlay').css('display', 'block');
        $($('.profile-tooltip')[0]).css('display', 'block');
      }
      if (window.innerWidth < 1000) {
        return this.initMobileLightBoxes();
      } else {
        return this.initDesktopLightBoxes();
      }
    },
    initDesktopLightBoxes: function initDesktopLightBoxes() {
      var tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, width;
      tooltip1 = $($('.profile-tooltip')[0]);
      tooltip2 = $($('.profile-tooltip')[1]);
      tooltip3 = $($('.profile-tooltip')[2]);
      tooltip4 = $($('.profile-tooltip')[3]);
      tooltip5 = $($('.profile-tooltip')[4]);
      tooltip6 = $($('.profile-tooltip')[5]);
      tooltip7 = $($('.profile-tooltip')[6]);
      width = tooltip1.innerWidth();
      tooltip1.css('top', $('.row').offset().top - 25);
      tooltip1.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip2.css('top', $('.licenses-row .section-header').offset().top - tooltip2.height() / 2.5);
      tooltip2.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip3.css('top', $('.drones-row .section-header').offset().top - tooltip3.height() / 2.5);
      tooltip3.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip4.css('top', $('.devices-row .section-header').offset().top - tooltip4.height() / 2.5);
      tooltip4.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip5.css('top', $('.equipment-row .section-header').offset().top - tooltip4.height() / 2.5);
      tooltip5.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip6.css('top', $('.availability').offset().top - tooltip4.height() / 2.5);
      tooltip6.css('left', $('.availability').children().last().offset().left + 150);
      tooltip7.css('top', $('.header-badge').offset().top - tooltip5.height() / 2);
      return tooltip7.css('left', $('.header-badge').offset().left + 30);
    },
    initMobileLightBoxes: function initMobileLightBoxes() {
      var tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, width;
      tooltip1 = $($('.profile-tooltip')[0]);
      tooltip2 = $($('.profile-tooltip')[1]);
      tooltip3 = $($('.profile-tooltip')[2]);
      tooltip4 = $($('.profile-tooltip')[3]);
      tooltip5 = $($('.profile-tooltip')[4]);
      tooltip6 = $($('.profile-tooltip')[5]);
      tooltip7 = $($('.profile-tooltip')[6]);
      width = tooltip1.innerWidth();
      tooltip1.css('top', $('.row').offset().top - 25);
      tooltip1.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip2.css('top', $('.licenses-row .section-header').offset().top - tooltip2.height() * 1.5);
      tooltip2.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip3.css('top', $('.drones-row .section-header').offset().top - tooltip3.height() * 1.5);
      tooltip3.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip4.css('top', $('.devices-row .section-header').offset().top - tooltip3.height() * 1.5);
      tooltip4.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip5.css('top', $('.equipment-row .section-header').offset().top - tooltip3.height() * 1.5);
      tooltip5.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip6.css('top', $('.availability-row .section-header').offset().top - tooltip4.height() * 1.5);
      tooltip6.css('left', "calc(50% - " + width / 2 + "px)");
      tooltip7.css('top', $('.header-badge').offset().top - tooltip5.height() * 1.5);
      return tooltip7.css('left', "calc(50% - " + width / 2 + "px)");
    },
    missingInfoCount: _ember['default'].computed('model', 'model.pilot', 'model.pilotLicenses.[]', 'model.pilotDrones.[]', 'model.pilot.travel_https://annvelents.github.io/dronebase_styleguide_t/distance', function () {
      var count, pilot;
      pilot = this.get('model.pilot');
      count = 0;
      if (this.get('model.pilotLicenses.length') === 0) {
        count += 1;
      }
      if (this.get('model.pilotDrones.length') === 0) {
        count += 1;
      }
      if (!pilot.get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
        count += 1;
      }
      if (this.get('model.pilotDevices.length') === 0) {
        count += 1;
      }
      return count;
    }),
    hideToolTipsAndUnfocus: function hideToolTipsAndUnfocus() {
      $('.profile-tooltip').css('display', 'none');
      return $('.content').removeClass('focused');
    },
    finishToolTips: function finishToolTips() {
      $('.profile-tooltip').css('display', 'none');
      $('.content').removeClass('focused');
      $('.overlay').css('display', 'none');
      return Cookies.set('viewedLightBoxes', true);
    },
    goToLicenses: function goToLicenses() {
      $($('.profile-tooltip')[1]).css('display', 'block');
      $('.licenses-row .content').addClass('focused');
      return $('html,body').animate({
        scrollTop: $(".licenses-row").offset().top - $($('.profile-tooltip')[1]).innerHeight() - 50
      });
    },
    goToDrones: function goToDrones() {
      $($('.profile-tooltip')[2]).css('display', 'block');
      $('.licenses-row .content').removeClass('focused');
      $('.drones-row .content').addClass('focused');
      return $('html,body').animate({
        scrollTop: $(".drones-row").offset().top - $($('.profile-tooltip')[2]).innerHeight() - 50
      });
    },
    goToDevices: function goToDevices() {
      $($('.profile-tooltip')[3]).css('display', 'block');
      $('.devices-row .content').removeClass('focused');
      $('.devices-row .content').addClass('focused');
      return $('html,body').animate({
        scrollTop: $(".devices-row").offset().top - $($('.profile-tooltip')[3]).innerHeight() - 50
      });
    },
    goToEquipment: function goToEquipment() {
      $($('.profile-tooltip')[4]).css('display', 'block');
      $('.equipment-row .content').removeClass('focused');
      $('.equipment-row .content').addClass('focused');
      return $('html,body').animate({
        scrollTop: $(".equipment-row").offset().top - $($('.profile-tooltip')[4]).innerHeight() - 50
      });
    },
    goToAvailability: function goToAvailability() {
      $($('.profile-tooltip')[5]).css('display', 'block');
      $('.drones-row .content').removeClass('focused');
      $('.availability-row .content').addClass('focused');
      return $('html,body').animate({
        scrollTop: $(".availability-row").offset().top - $($('.profile-tooltip')[5]).innerHeight() - 50
      });
    },
    hasOptIns: _ember['default'].computed('model.pilot.opt_ins', 'returnedOptIns', function () {
      return this.get('returnedOptIns') || this.get('model.pilot.opt_ins');
    }),
    actions: {
      optIn: function optIn() {
        var _this, headers;
        headers = this.get('sessionAccount.headers');
        _this = this;
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/pilot_opt_in",
          type: 'POST',
          dataType: 'json',
          headers: headers,
          data: {
            id: 'generic_training'
          }
        }).then(function (response) {
          return _this.set('returnedOptIns', true);
        }, function (response) {});
      },
      completeProfilePrompt: function completeProfilePrompt() {
        return $($('.profile-tooltip')[6]).css('display', 'block');
      },
      step1: function step1() {
        this.get('hideToolTipsAndUnfocus')();
        if (this.get('model.pilotLicenses.length') === 0) {
          return this.get('goToLicenses')();
        } else if (this.get('model.pilotDrones.length') === 0) {
          return this.get('goToDrones')();
        } else if (this.get('model.pilotDevices.length') === 0) {
          return this.get('goToDevices')();
        } else if (this.get('model.pilotEquipment.length') === 0) {
          return this.get('goToEquipment')();
        } else if (!this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
          return this.get('goToAvailability')();
        } else {
          return this.get('finishToolTips')();
        }
      },
      step2: function step2() {
        this.get('hideToolTipsAndUnfocus')();
        if (this.get('model.pilotDrones.length') === 0) {
          return this.get('goToDrones')();
        } else if (this.get('model.pilotDevices.length') === 0) {
          return this.get('goToDevices')();
        } else if (this.get('model.pilotEquipment.length') === 0) {
          return this.get('goToEquipment')();
        } else if (!this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
          return this.get('goToAvailability')();
        } else {
          return this.get('finishToolTips')();
        }
      },
      step3: function step3() {
        this.get('hideToolTipsAndUnfocus')();
        if (this.get('model.pilotDevices.length') === 0) {
          return this.get('goToDevices')();
        } else if (this.get('model.pilotEquipment.length') === 0) {
          return this.get('goToEquipment')();
        } else if (!this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
          return this.get('goToAvailability')();
        } else {
          return this.get('finishToolTips')();
        }
      },
      step4: function step4() {
        this.get('hideToolTipsAndUnfocus')();
        if (this.get('model.pilotEquipment.length') === 0) {
          return this.get('goToEquipment')();
        } else if (!this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
          return this.get('goToAvailability')();
        } else {
          return this.get('finishToolTips')();
        }
      },
      step5: function step5() {
        this.get('hideToolTipsAndUnfocus')();
        if (!this.get('model.pilot').get('travel_https://annvelents.github.io/dronebase_styleguide_t/distance')) {
          return this.get('goToAvailability')();
        } else {
          return this.get('finishToolTips')();
        }
      },
      step6: function step6() {
        return this.get('finishToolTips')();
      },
      takeMeThere: function takeMeThere() {
        var pilot;
        $($('.profile-tooltip')[6]).css('display', 'none');
        pilot = this.get('model.pilot');
        if (pilot.get('pilot_licenses').length === 0) {
          return $('html,body').animate({
            scrollTop: $(".licenses-row").offset().top
          });
        } else if (pilot.get('drones').length === 0) {
          return $('html,body').animate({
            scrollTop: $(".drones-row").offset().top
          });
        } else if (this.get('model.pilotDevices.length') === 0) {
          return $('html,body').animate({
            scrollTop: $(".devices-row").offset().top
          });
        } else if (this.get('model.pilotEquipment.length') === 0) {
          return $('html,body').animate({
            scrollTop: $(".equipment-row").offset().top
          });
        } else {
          return $('html,body').animate({
            scrollTop: $(".availability-row").offset().top
          });
        }
      },
      done: function done() {
        return this.get('finishToolTips')();
      }
    }
  });

  exports['default'] = PilotProfileComponent;
});
define('pilots/components/pilot-stats', ['exports', 'ember'], function (exports, _ember) {
  var PilotStatsComponent;

  PilotStatsComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    classNames: ['container', 'container-top']
  });

  exports['default'] = PilotStatsComponent;
});
define('pilots/components/profile-tooltip-prompt', ['exports', 'ember', 'pilots/components/profile-tooltip'], function (exports, _ember, _pilotsComponentsProfileTooltip) {
  var ProfileTooltipPromptComponent;

  ProfileTooltipPromptComponent = _pilotsComponentsProfileTooltip['default'].extend({
    classNames: 'profile-tooltip-prompt'
  });

  exports['default'] = ProfileTooltipPromptComponent;
});
define('pilots/components/profile-tooltip', ['exports', 'ember'], function (exports, _ember) {
  var ProfileTooltipComponent;

  ProfileTooltipComponent = _ember['default'].Component.extend({
    classNames: 'profile-tooltip',
    showLeftArrow: true,
    showNextArrow: true,
    showPills: true,
    showCross: true,
    actions: {
      nextAction: function nextAction() {
        return this.get('nextAction')();
      },
      doneAction: function doneAction() {
        return this.get('doneAction')();
      }
    }
  });

  exports['default'] = ProfileTooltipComponent;
});
define('pilots/components/public-search', ['exports', 'ember'], function (exports, _ember) {
  var PublicSearch;

  PublicSearch = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      return $('.find-button').on('click', function () {
        var input;
        input = document.getElementById('filter-search-field');
        google.maps.event.trigger(input, 'focus');
        return google.maps.event.trigger(input, 'keydown', {
          keyCode: 13
        });
      });
    }
  });

  exports['default'] = PublicSearch;
});
define('pilots/components/request-password-reset-form', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var RequestPasswordResetFormComponent;

  RequestPasswordResetFormComponent = _ember['default'].Component.extend({
    tagName: 'form',
    role: 'form',
    classNames: 'form form-reset',
    homeUrl: "" + _pilotsConfigEnvironment['default'].dronebaseHome,
    errors: null,
    requesting: false,
    submit: function submit(e) {
      var _data, _this;
      e.preventDefault();
      if (this.get('requesting')) {
        return;
      }
      if (this.get('email').length && this.get('email').match(/.@.*\./)) {
        this.set('requesting', true);
        this.set('buttonText', 'Processing...');
        _this = this;
        _data = {
          pilot: {
            email: this.get('email')
          }
        };
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/request_reset_password",
          type: 'POST',
          dataType: 'json',
          data: _data
        }).then(function (response) {
          _this.set('email', '');
          return _this.set('errors', 'Request sent, please check your email for a password reset link.');
        }, function (response) {
          return _this.set('errors', response.responseJSON.errors[0].detail);
        });
      } else {
        return this.set('errors', 'Please enter a valid email.');
      }
    }
  });

  exports['default'] = RequestPasswordResetFormComponent;
});
define('pilots/components/reschedule-mission', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var RescheduleMissionComponent;

  RescheduleMissionComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    reschedulingStep: 0,
    lastDate: "",
    didInsertElement: function didInsertElement() {
      return this.$('.reschedule-reason').niceSelect();
    },
    canGoToRescheduleStep: _ember['default'].computed('notesRequires', 'model.reschedule.notes', function () {
      if (this.get('notesRequires')) {
        return this.get('model.reschedule.notes.length');
      } else {
        return true;
      }
    }),
    updateScheduledAt: _ember['default'].observer('displayScheduledAt', function () {
      var end_time, local_end_time, local_start_time, start_time;
      if (this.get('displayScheduledAt').length === 10) {
        this.set('lastDate', this.get('displayScheduledAt'));
      }
      if (this.get('displayScheduledAt').trim() === "" || !this.get('model.reschedule')) {
        return;
      }
      start_time = moment(this.get('displayScheduledAt')).hour(11).format('YYYY-MM-DD HH:mm').toString();
      local_start_time = moment.tz(start_time, this.get('model.mission.location.timezone_id')).utc().toString();
      this.set('model.reschedule.scheduled_at_start', local_start_time);
      end_time = moment(this.get('displayScheduledAt')).hour(14).format('YYYY-MM-DD HH:mm').toString();
      local_end_time = moment.tz(end_time, this.get('model.mission.location.timezone_id')).utc().toString();
      return this.set('model.reschedule.scheduled_at_end', local_end_time);
    }),
    actions: {
      toggleReScheduling: function toggleReScheduling() {
        return this.send('toggleRescheduling');
      },
      toggleRescheduleReason: function toggleRescheduleReason() {
        return this.set('showRescheduleReason', !this.get('showRescheduleReason'));
      },
      toggleShowRescheduleNotes: function toggleShowRescheduleNotes() {
        return this.set('showRescheduleNotes', !this.get('showRescheduleNotes'));
      },
      setReschedulingStep: function setReschedulingStep(step) {
        this.set('reschedulingStep', step);
        if (step === 1) {
          return Em.run.later((function (_this) {
            return function () {
              return _this.send('initializeDatePicker');
            };
          })(this), 2);
        }
      },
      initializeDatePicker: function initializeDatePicker() {
        var _this;
        _this = this;
        Em.$('.rescheduleTimeDatePicker').datetimepicker({
          collapse: false,
          focusOnShow: true,
          viewMode: 'days',
          format: 'MM/DD/YYYY',
          useCurrent: false,
          minDate: moment().startOf('day'),
          maxDate: moment().add(5, 'days').endOf('day'),
          icons: {
            date: "fa fa-calendar",
            previous: "icon-DB_icon_ArrowStroke_left",
            next: "icon-DB_icon_ArrowStroke_right",
            up: "icon-Arrow2_down",
            down: "icon-Arrow2_up",
            close: "icon-Xmark"
          }
        });
        this.$('input.schedule-mission-datetime-field').on('click', function () {
          return $('.rescheduleTimeDatePicker').datetimepicker('show');
        });
        return this.$('input.schedule-mission-datetime-field').keyup(function (e) {
          if (!($('input.schedule-mission-datetime-field')[0].value.length === 10)) {
            _this.set('displayScheduledAt', _this.get('lastDate'));
          }
          return false;
        });
      },
      setRescheduleReason: function setRescheduleReason(reasonId) {
        var reason, reschedule, rescheduler;
        rescheduler = this.get('sessionAccount.account');
        reason = this.get('model.mission.store').peekRecord('reschedule-reason', reasonId);
        reschedule = this.get('model.mission.store').createRecord('mission-reschedule', {
          mission: this.get('model.mission'),
          reschedule_reason: reason,
          rescheduler: rescheduler
        });
        if (reason.get('short') === 'Other') {
          this.set('notesRequires', true);
        } else {
          this.set('notesRequires', false);
        }
        this.set('model.reschedule', reschedule);
        return this.set('showRescheduleNotes', true);
      },
      reschedule: function reschedule() {
        return this.sendAction('reSchedule');
      }
    }
  });

  exports['default'] = RescheduleMissionComponent;
});
define('pilots/components/reschedule-success-modal', ['exports', 'ember'], function (exports, _ember) {
  var RescheduleSuccessModalComponent;

  RescheduleSuccessModalComponent = _ember['default'].Component.extend({
    actions: {
      toggleModal: function toggleModal() {
        return this.sendAction('close');
      }
    }
  });

  exports['default'] = RescheduleSuccessModalComponent;
});
define('pilots/components/reset-password-form', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var ResetPasswordFormComponent;

  ResetPasswordFormComponent = _ember['default'].Component.extend({
    session: _ember['default'].inject.service(),
    tagName: 'form',
    role: 'form',
    classNames: 'form form-reset',
    errors: null,
    requesting: false,
    homeUrl: "" + _pilotsConfigEnvironment['default'].dronebaseHome,
    authenticate: function authenticate(identification, password) {
      var _this;
      _this = this;
      return this.get('session').authenticate('authenticator:devise', identification, password).then(function (response) {
        var attemptedTransition;
        if (attemptedTransition = _this.get('session.attemptedTransition')) {
          attemptedTransition.retry();
          return _this.get('session').set('attemptedTransition', null);
        }
      }, function (response) {
        return _this.set('errors.credentials.base', response.errors[0].detail);
      });
    },
    submit: function submit(e) {
      var _data, _this;
      e.preventDefault();
      if (this.get('requesting')) {
        return;
      }
      if (this.get('model.password') && this.get('model.confirm_password') && this.get('model.token') && this.get('model.password') === this.get('model.confirm_password')) {
        this.set('requesting', true);
        this.set('buttonText', 'Processing...');
        _this = this;
        _data = {
          pilot: {
            password: this.get('model.password'),
            token: this.get('model.token')
          }
        };
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/reset_password",
          type: 'PATCH',
          dataType: 'json',
          data: _data
        }).then(function (response) {
          _this.set('errors', null);
          _this.authenticate(response.email, _data.pilot.password);
          _this.set('requesting', false);
          return _this.set('buttonText', 'Success!');
        }, function (response) {
          _this.set('errors', response.responseJSON.errors[0].detail);
          _this.set('requesting', false);
          return _this.set('buttonText', 'Submit');
        });
      } else {
        return this.set('errors', 'Please enter your new password and make sure they are matching.');
      }
    }
  });

  exports['default'] = ResetPasswordFormComponent;
});
define('pilots/components/schedule-mission', ['exports', 'ember'], function (exports, _ember) {
  var ScheduleMissionComponent;

  ScheduleMissionComponent = _ember['default'].Component.extend({
    classNames: ['schedule-mission'],
    hide: _ember['default'].computed('hideScheduling', function () {
      if (this.get('hideScheduling')) {
        return 'hide';
      }
    }),
    schedulingRequired: _ember['default'].computed('model.admin_scheduled', 'model.scheduled_at_start', function () {
      return !this.get('model.admin_scheduled') && !this.get('model.scheduled_at_start');
    }),
    updateScheduledAt: _ember['default'].observer('displayScheduledAt', function () {
      var end_time, local_end_time, local_start_time, start_time;
      if (this.get('displayScheduledAt').trim() === "") {
        return;
      }
      start_time = moment(this.get('displayScheduledAt')).hour(11).format('YYYY-MM-DD HH:mm').toString();
      local_start_time = moment.tz(start_time, this.get('model.location.timezone_id')).utc().toString();
      this.set('model.scheduled_at_start', local_start_time);
      end_time = moment(this.get('displayScheduledAt')).hour(14).format('YYYY-MM-DD HH:mm').toString();
      local_end_time = moment.tz(end_time, this.get('model.location.timezone_id')).utc().toString();
      return this.set('model.scheduled_at_end', local_end_time);
    }),
    actions: {
      accept: function accept(mission) {
        return this.sendAction('acceptAction', mission);
      },
      decline: function decline(mission) {
        return this.sendAction('declineAction', mission);
      },
      reSchedule: function reSchedule(mission) {
        return this.sendAction('updateAction', mission);
      }
    },
    didInsertElement: function didInsertElement() {
      return this.$('#scheduleTimeDatePicker').datetimepicker({
        collapse: false,
        focusOnShow: false,
        viewMode: 'days',
        format: 'MM/DD/YYYY',
        useCurrent: false,
        minDate: moment().startOf('day'),
        maxDate: moment().add(6, 'days').endOf('day'),
        icons: {
          date: "fa fa-calendar",
          previous: "icon-DB_icon_ArrowStroke_left",
          next: "icon-DB_icon_ArrowStroke_right",
          up: "icon-Arrow2_down",
          down: "icon-Arrow2_up",
          close: "icon-Xmark"
        }
      });
    }
  });

  exports['default'] = ScheduleMissionComponent;
});
define('pilots/components/select-inplace-edit', ['exports', 'ember'], function (exports, _ember) {
  var SelectInplaceEditComponent;

  SelectInplaceEditComponent = _ember['default'].Component.extend({
    content: null,
    prompt: null,
    optionValuePath: 'value',
    optionLabelPath: 'label',
    action: _ember['default'].K,
    classNames: ['form-group'],
    selectClass: 'form-control input-lg',
    value: null,
    label: null,
    didInitAttrs: function didInitAttrs(attrs) {
      this._super(attrs);
      if (!this.get('content')) {
        return this.set('content', []);
      }
    },
    click: function click() {
      if (!this.get('isEditing')) {
        this.set('isEditing', true);
        return _ember['default'].run.scheduleOnce('afterRender', this, this.focusSelect);
      }
    },
    focusSelect: function focusSelect() {
      this.$('select').val(this.get('value'));
      return this.$('select').focus();
    },
    focusOut: function focusOut() {
      return this.set('isEditing', false);
    },
    actions: {
      save: function save() {
        var _this;
        _this = this;
        this.set('value', this.$('select').val());
        return this.get('model').save().then(function () {
          return _this.set('isEditing', false);
        }, function (response) {
          return _this.$('select').addClass('error');
        });
      }
    }
  });

  exports['default'] = SelectInplaceEditComponent;
});
define('pilots/components/select-validated', ['exports', 'ember'], function (exports, _ember) {
  var SelectValidatedComponent;

  SelectValidatedComponent = _ember['default'].Component.extend({
    content: null,
    prompt: null,
    optionValuePath: 'value',
    optionLabelPath: 'label',
    action: _ember['default'].K,
    classNames: ['form-group'],
    selectClass: 'form-control input-lg',
    value: null,
    didInitAttrs: function didInitAttrs(attrs) {
      this._super(attrs);
      if (!this.get('content')) {
        return this.set('content', []);
      }
    },
    didInsertElement: function didInsertElement() {
      return _ember['default'].run.schedule('afterRender', this, function () {
        return this.$('select').val(this.get('value'));
      });
    },
    actions: {
      updateValue: function updateValue() {
        this.set('value', this.$('select').val());
        this.set('showError', true);
        if (this.get('value') === "") {
          return this.$('select').addClass('error');
        } else {
          return this.$('select').removeClass('error');
        }
      }
    }
  });

  exports['default'] = SelectValidatedComponent;
});
define('pilots/components/shot-drop-target', ['exports', 'ember', 'pilots/components/draggable-object-target'], function (exports, _ember, _pilotsComponentsDraggableObjectTarget) {
  var ShotDropTarget;

  ShotDropTarget = _pilotsComponentsDraggableObjectTarget['default'].extend({
    validateDragEvent: function validateDragEvent(event) {
      var shotid;
      shotid = '#shot-' + this.get('shot.id');
      if ($(shotid).hasClass('selected')) {
        return false;
      }
      if (event.dataTransfer.types.length === 3) {
        return true;
      }
      if (event.dataTransfer.effectAllowed === 'move') {
        return true;
      }
      return false;
    }
  });

  exports['default'] = ShotDropTarget;
});
define("pilots/components/side-menu-link-to", ["exports", "ember-side-menu/components/side-menu-link-to"], function (exports, _emberSideMenuComponentsSideMenuLinkTo) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuComponentsSideMenuLinkTo["default"];
    }
  });
});
define("pilots/components/side-menu-toggle", ["exports", "ember-side-menu/components/side-menu-toggle"], function (exports, _emberSideMenuComponentsSideMenuToggle) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuComponentsSideMenuToggle["default"];
    }
  });
});
define("pilots/components/side-menu", ["exports", "ember-side-menu/components/side-menu"], function (exports, _emberSideMenuComponentsSideMenu) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuComponentsSideMenu["default"];
    }
  });
});
define('pilots/components/simple-weather', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var SimpleWeatherComponent;

  SimpleWeatherComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    classNames: ['weather'],
    initWeather: _ember['default'].on('init', function () {
      var _this, latitude, longitude;
      _this = this;
      longitude = this.get('pilot').get('longitude') ? this.get('pilot').get('longitude') : 118.496475;
      latitude = this.get('pilot').get('latitude') ? this.get('pilot').get('latitude') : 34.0195;
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/weather?latitude=" + this.get('pilot').get('latitude') + "&longitude=" + this.get('pilot').get('longitude'),
        type: 'GET',
        dataType: 'json',
        headers: _this.get('sessionAccount.headers')
      }).then(function (response) {
        _this.set('weather', response.currently);
        return _this.set('degree', Math.round(response.currently.temperature));
      });
    })
  });

  exports['default'] = SimpleWeatherComponent;
});
define('pilots/components/sortable-objects', ['exports', 'ember-drag-drop/components/sortable-objects'], function (exports, _emberDragDropComponentsSortableObjects) {
  exports['default'] = _emberDragDropComponentsSortableObjects['default'];
});
define('pilots/components/status-button', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var StatusButtonComponent;

  StatusButtonComponent = _ember['default'].Component.extend({
    sessionAccount: _ember['default'].inject.service(),
    isFlightComplete: _ember['default'].computed('mission.status', function () {
      return this.get('mission.status') !== 'pilot_assigned' && this.get('mission.status') !== 'pilot_accepted';
    }),
    statusText: _ember['default'].computed('mission.status', function () {
      if (this.get('isFlightComplete')) {
        return "Flight Complete";
      } else {
        return "Flight Not Complete";
      }
    }),
    actions: {
      markComplete: function markComplete() {
        var _mission, _this, headers;
        _this = this;
        _mission = this.get('mission');
        headers = this.get('sessionAccount.headers');
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + _mission.id + "/status/flight_complete",
          type: 'PATCH',
          dataType: 'json',
          headers: headers
        }).then(function (response) {
          _mission.reload();
          return console.log('success');
        }, function (response) {
          return console.log('fail');
        });
      }
    }
  });

  exports['default'] = StatusButtonComponent;
});
define('pilots/components/submit-button', ['exports', 'ember'], function (exports, _ember) {
  var SubmitButtonComponent;

  SubmitButtonComponent = _ember['default'].Component.extend({
    tagName: 'button',
    type: 'submit',
    classNameBindings: ['enabled::disabled'],
    enabled: true
  });

  exports['default'] = SubmitButtonComponent;
});
define('pilots/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('pilots/components/textarea-trigger-save', ['exports', 'ember'], function (exports, _ember) {
  var TextareaTriggerSaveComponent;

  TextareaTriggerSaveComponent = _ember['default'].TextArea.extend({
    classNames: ['form-control'],
    focusOut: function focusOut() {
      return this.get('parentView.controller').send('save');
    }
  });

  exports['default'] = TextareaTriggerSaveComponent;
});
define('pilots/components/top-navbar', ['exports', 'ember', 'pilots/utils/init-qtip'], function (exports, _ember, _pilotsUtilsInitQtip) {
  var TopNavbarComponent,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  TopNavbarComponent = _ember['default'].Component.extend({
    classNames: ['top-navbar'],
    session: _ember['default'].inject.service(),
    sessionAccount: _ember['default'].inject.service(),
    notifications: _ember['default'].inject.service(),
    sideMenu: _ember['default'].inject.service(),
    router: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).lookup('router:main');
    }).readOnly(),
    usesSlideOut: function usesSlideOut() {
      return $('.top-navbar-desktop:visible').length === 0;
    },
    showPilotMenu: _ember['default'].computed('pilotMenuVisible', function () {
      return this.get('pilotMenuVisible');
    }),
    didInsertElement: function didInsertElement() {
      return (0, _pilotsUtilsInitQtip['default'])('.nav-tooltip');
    },
    useDarkHeader: _ember['default'].computed('router.currentPath', function () {
      var currentRoute, lightBackground;
      currentRoute = this.get('router.currentPath');
      lightBackground = ['dashboard', 'pilotlog', 'availablemission', 'clientmission', 'terms_and_conditions'];
      if (currentRoute !== this.get('currentPath')) {
        if (!this.usesSlideOut()) {
          this.set('notificationSidebar', false);
          this.set('pilotMenuVisible', false);
          this.$('.notifications').hide();
        }
        this.get('sideMenu').close();
        this.set('currentPath', currentRoute);
      }
      return indexOf.call(lightBackground, currentRoute) >= 0;
    }),
    gettyActive: _ember['default'].computed('router.currentPath', function () {
      return this.get('router.currentPath') === 'gettymission';
    }),
    initNavBar: _ember['default'].on('init', function () {
      var _this;
      this.set('currentPath', this.get('router.currentPath'));
      _this = this;
      $('.ember-view').click(function (event) {});
      return document.addEventListener('click', function (event) {
        var doNotClear, targetClass;
        targetClass = event.target.className.trim();
        doNotClear = ['notifications-nav-button nav-tooltip notification-active', 'notifications-nav-container nav-tooltip', 'notifications-nav-button', 'username', 'profile-icon', 'profile-icon nav-tooltip profile-icon-active', 'notifications-nav-counter', 'pilot-information', 'username username-active', 'profile-icon profile-icon-active', 'sidebar-links', 'toggle', 'x-icon', 'nav-tooltip profile-header', 'notifications-nav-button notification-active', 'sidebar-link profile-header'];
        if (!(indexOf.call(doNotClear, targetClass) >= 0 || _this.usesSlideOut())) {
          _this.$('.notifications').hide();
          _this.set('notificationsActive', false);
          _this.set('pilotMenuVisible', false);
        }
        if (indexOf.call(doNotClear, targetClass) < 0 && _this.usesSlideOut()) {
          return _this.get('sideMenu').close();
        }
      });
    }),
    sideMenuChanged: _ember['default'].observer('sideMenu.isOpen', 'currentPath', function () {
      var ref, ref1;
      if (this.get('sideMenu.isOpen')) {
        this.set('pilotMenuVisible', (ref = this.get('currentPath')) === 'profile' || ref === 'pilotlog');
        this.set('notificationsActive', (ref1 = this.get('currentPath')) === 'availablemission' || ref1 === 'clientmission');
        if (this.get('notificationsActive')) {
          return this.$('.notifications').toggle();
        } else {
          return this.$('.notifications').hide();
        }
      }
    }),
    actions: {
      toggleNotificationsSidebar: function toggleNotificationsSidebar() {
        this.set('notificationsActive', !this.get('notificationsActive'));
        return this.set('pilotMenuVisible', false);
      },
      togglePilotMenu: function togglePilotMenu() {
        this.$('.notifications').hide();
        this.set('pilotMenuVisible', !this.get('pilotMenuVisible'));
        this.set('notificationSidebar', false);
        return this.set('notificationsActive', false);
      },
      toggleNotifications: function toggleNotifications() {
        this.set('pilotMenuVisible', false);
        this.$('.notifications').toggle();
        this.set('notificationsActive', true);
        return this.get('notifications').findAllNotifications();
      },
      invalidateSession: function invalidateSession() {
        return this.get('session').invalidate();
      },
      markAllAsRead: function markAllAsRead() {
        return this.get('notifications').markAllAsRead();
      }
    }
  });

  exports['default'] = TopNavbarComponent;
});
define('pilots/components/upload-assets-other-app', ['exports', 'ember', 'pilots/config/environment', 'ember-cli-file-saver/mixins/file-saver'], function (exports, _ember, _pilotsConfigEnvironment, _emberCliFileSaverMixinsFileSaver) {
  var UploadAssetsOtherAppComponent;

  UploadAssetsOtherAppComponent = _ember['default'].Component.extend(_emberCliFileSaverMixinsFileSaver['default'], {
    classNames: ['upload-assets-with-other-app'],
    sessionAccount: _ember['default'].inject.service(),
    cyberduckStatus: null,
    initCyberDuck: _ember['default'].on('init', function () {
      if (this.get('mission.flight_app.value.secret_key')) {
        return this.set('cyberduckStatus', 'COMPLETE');
      }
    }),
    actions: {
      startUploading: function startUploading() {
        var _this;
        _this = this;
        this.set('cyberduckStatus', 'LOADING');
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('mission.id') + "/cyberduck",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers')
        }).then(function (response) {
          return _this.get('mission').reload().then(function () {
            return _this.set('cyberduckStatus', 'COMPLETE');
          });
        });
      },
      copyKey: function copyKey(id) {
        var copyText;
        copyText = document.getElementById(id);
        copyText.select();
        document.execCommand("copy");
        this.set('textCopied', true);
        return setTimeout((function (_this) {
          return function () {
            return _this.set('textCopied', false);
          };
        })(this), 3000);
      },
      getDuckFile: function getDuckFile() {
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('mission.id') + "/cyberduck",
          type: 'GET',
          headers: this.get('sessionAccount.headers')
        }).then((function (_this) {
          return function (response) {
            var bb, blob, error, error1, filename;
            try {
              blob = new Blob([response], {
                type: 'application/octet-stream'
              });
            } catch (error1) {
              error = error1;
              window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
              if (error.name === 'TypeError' && window.BlobBuilder) {
                bb = new BlobBuilder();
                bb.append(response);
                blob = bb.getBlob("application/octet-stream");
              } else if (e.name === 'InvalidStateError') {
                blob = new Blob([response], {
                  type: 'application/octet-stream'
                });
              } else {
                alert('Downloading is not supported on your device.');
              }
            }
            filename = _this.get('mission.id') + '.duck';
            return _this.saveFileAs(filename, blob, 'application/octet-stream');
          };
        })(this));
      },
      doneUploading: function doneUploading() {
        var _this;
        _this = this;
        this.set('startingUploading', true);
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + this.get('mission.id') + "/cyberduck/complete",
          type: 'POST',
          headers: this.get('sessionAccount.headers')
        }).then(function (response) {
          _this.set('startingUploading', false);
          _this.get('mission').reload();
          return location.reload();
        });
      }
    }
  });

  exports['default'] = UploadAssetsOtherAppComponent;
});
define('pilots/components/uploading-asset', ['exports', 'ember'], function (exports, _ember) {
  var UploadingAssetComponent;

  UploadingAssetComponent = _ember['default'].Component.extend({
    tagName: '',
    actions: {
      removeAsset: function removeAsset(uploader, file) {
        return uploader.removeFile(file.content);
      }
    }
  });

  exports['default'] = UploadingAssetComponent;
});
define('pilots/components/validated-checkbox-auto-save', ['exports', 'ember'], function (exports, _ember) {
  var ValidatedCheckboxAutoSaveComponent;

  ValidatedCheckboxAutoSaveComponent = _ember['default'].Component.extend({
    classNames: ['roundCheckbox'],
    didInsertElement: function didInsertElement() {
      return this.$('input').attr('class', null);
    },
    actions: {
      validateProperty: function validateProperty(changeset, property) {
        return changeset.validate(property).then(function () {
          if (changeset.get('isValid')) {
            return changeset.save();
          }
        });
      }
    }
  });

  exports['default'] = ValidatedCheckboxAutoSaveComponent;
});
define('pilots/components/validated-checkbox-image-auto-save', ['exports', 'ember'], function (exports, _ember) {
  var ValidatedCheckboxImageAutoSaveComponent;

  ValidatedCheckboxImageAutoSaveComponent = _ember['default'].Component.extend({
    classNames: ['roundCheckbox'],
    setImage: function setImage() {
      if (this.get('changeset').get(this.get('propertyName'))) {
        return this.$('img').attr('src', '/assets/images/checkmark_selected.svg');
      } else {
        return this.$('img').attr('src', '/assets/images/checkmark_unselected.svg');
      }
    },
    didInsertElement: function didInsertElement() {
      return this.setImage();
    },
    actions: {
      validateProperty: function validateProperty(changeset, property) {
        var currrentValue;
        currrentValue = this.get('changeset').get(this.get('propertyName'));
        this.get('changeset').set(this.get('propertyName'), !currrentValue);
        return changeset.validate(property).then((function (_this) {
          return function () {
            if (changeset.get('isValid')) {
              _this.setImage();
              return changeset.save();
            }
          };
        })(this));
      }
    }
  });

  exports['default'] = ValidatedCheckboxImageAutoSaveComponent;
});
define('pilots/components/validated-checkbox', ['exports', 'ember'], function (exports, _ember) {
  var ValidatedCheckboxComponent;

  ValidatedCheckboxComponent = _ember['default'].Component.extend({
    actions: {
      validateProperty: function validateProperty(changeset, property) {
        return changeset.validate(property);
      }
    }
  });

  exports['default'] = ValidatedCheckboxComponent;
});
define('pilots/components/validated-input-auto-save', ['exports', 'ember'], function (exports, _ember) {
  var ValidatedInputAutoSaveComponent;

  ValidatedInputAutoSaveComponent = _ember['default'].Component.extend({
    classNames: ['form-group'],
    saved: false,
    cleanup: _ember['default'].on('willDestroyElement', function () {
      _ember['default'].run.cancel(this._saveLater);
      return _ember['default'].run.cancel(this._saved);
    }),
    actions: {
      validateProperty: function validateProperty(changeset, property) {
        if (!changeset.get('isDirty')) {
          return;
        }
        if (this._saveLater) {
          _ember['default'].run.cancel(this._saveLater);
        }
        return this._saveLater = _ember['default'].run.later(this, (function (_this) {
          return function () {
            return changeset.validate(property).then(function () {
              if (changeset.get('isValid')) {
                return changeset.save().then(function () {
                  _this.set('saved', true);
                  return _this._saved = _ember['default'].run.later(_this, function () {
                    return _this.set('saved', false);
                  }, 1000);
                });
              }
            });
          };
        })(this), 1000);
      }
    }
  });

  exports['default'] = ValidatedInputAutoSaveComponent;
});
define('pilots/components/validated-input', ['exports', 'ember'], function (exports, _ember) {
  var ValidatedInputComponent;

  ValidatedInputComponent = _ember['default'].Component.extend({
    actions: {
      validateProperty: function validateProperty(changeset, property) {
        return changeset.validate(property);
      }
    }
  });

  exports['default'] = ValidatedInputComponent;
});
define('pilots/components/video-js-source', ['exports', 'ember'], function (exports, _ember) {
  var VideoJsSourceComponent;

  VideoJsSourceComponent = _ember['default'].Component.extend({
    tagName: 'source',
    attributeBindings: ['src', 'type']
  });

  exports['default'] = VideoJsSourceComponent;
});
define('pilots/components/video-js', ['exports', 'ember'], function (exports, _ember) {
  var VideoJsComponent;

  VideoJsComponent = _ember['default'].Component.extend({
    tagName: 'video',
    classNames: ['video-js vjs-default-skin'],
    concatenatedProperties: ['playerAttributeBindings'],
    playerEvents: {
      durationchange: 'durationChange',
      loadedmetadata: 'loadedMetadata',
      play: 'play',
      resize: 'resize',
      seeked: 'seeked',
      timeupdate: 'timeUpdate',
      volumechange: 'volumeChange'
    },
    playerAttributeBindings: ['autoplay', 'controls', 'currentHeight:height', 'currentWidth:width', 'loop', 'muted', 'playbackRate', 'poster', 'preload', 'volume', 'fluid'],
    autoresize: false,
    controls: true,
    fluid: true,
    currentTimeDidChange: _ember['default'].on('seeked', 'timeUpdate', function (player) {
      return this.set('currentTime', player.currentTime());
    }),
    dimensionsDidChange: _ember['default'].on('resize', function (player) {
      return this.setProperties({
        currentHeight: player.height(),
        currentWidth: player.width()
      });
    }),
    durationDidChange: _ember['default'].on('durationChange', function (player) {
      return this.set('duration', player.duration());
    }),
    naturalAspectRatio: _ember['default'].computed('naturalHeight', 'naturalWidth', function () {
      return this.get('naturalHeight') / this.get('naturalWidth');
    }),
    volumeDidChange: _ember['default'].on('volumeChange', function (player) {
      this.set('muted', player.muted());
      return this.set('volume', player.volume());
    }),
    _applyPlayerAttribute: function _applyPlayerAttribute(player, attrName, newValue) {
      var method, oldValue;
      method = player[attrName];
      if (method) {
        oldValue = method.call(player);
        if (oldValue !== newValue) {
          return method.call(player, newValue);
        }
      }
    },
    _autoresizePlayer: function _autoresizePlayer(player) {
      var naturalAspectRatio, parentWidth;
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      if (!this.get('autoresize')) {
        return;
      }
      naturalAspectRatio = this.get('naturalAspectRatio');
      parentWidth = _ember['default'].$(player.el().parentNode).width();
      return this.setProperties({
        currentHeight: parentWidth * naturalAspectRatio,
        currentWidth: parentWidth
      });
    },
    _didInitPlayer: function _didInitPlayer(player) {
      this._setupPlayerAttributes(player);
      this._setupPlayerEvents(player);
      this._setupAutoresize(player);
      _ember['default'].run(this, function () {
        return this.sendAction('ready');
      });
      return this.on('willDestroyElement', function () {
        return player.dispose();
      });
    },
    _initPlayer: _ember['default'].on('didInsertElement', function () {
      var _this, element, options;
      _this = this;
      element = this.get('element');
      options = this.get('setup') || {};
      return videojs(element, options, function () {
        return _this._didInitPlayer(this);
      });
    }),
    _registerPlayerObserver: function _registerPlayerObserver(property, target, observer) {
      var scheduledObserver;
      scheduledObserver = function () {
        return _ember['default'].run.scheduleOnce('render', this, observer);
      };
      this.addObserver(property, target, scheduledObserver);
      return this.on('willClearRender', this, function () {
        return this.removeObserver(property, target, scheduledObserver);
      });
    },
    _setupAutoresize: function _setupAutoresize(player) {
      var observer;
      this._setupResizeListener(player);
      observer = function () {
        return this._autoresizePlayer(player);
      };
      this._registerPlayerObserver('autoresize', this, observer);
      this._registerPlayerObserver('naturalAspectRatio', this, observer);
      return _ember['default'].run(this, function () {
        return _ember['default'].run.scheduleOnce('render', this, observer);
      });
    },
    _setupPlayerAttributeBindingObservation: function _setupPlayerAttributeBindingObservation(player, property, attrName) {
      var observer;
      observer = function () {
        var propertyValue;
        propertyValue = this.get(property);
        return this._applyPlayerAttribute(player, attrName, propertyValue);
      };
      this._registerPlayerObserver(property, this, observer);
      return _ember['default'].run(this, function () {
        var propertyValue;
        if (this.isDestroyed) {
          return;
        }
        propertyValue = this.get(property);
        if (_ember['default'].isNone(propertyValue)) {
          propertyValue = player[attrName].call(player);
          this.set(property, propertyValue);
        }
        return this._applyPlayerAttribute(player, attrName, propertyValue);
      });
    },
    _setupPlayerAttributes: function _setupPlayerAttributes(player) {
      var attrName, binding, colonIndex, i, len, property, ref, results;
      ref = this.playerAttributeBindings;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        binding = ref[i];
        colonIndex = binding.indexOf(':');
        if (colonIndex === -1) {
          property = binding;
          attrName = binding;
        } else {
          property = binding.substring(0, colonIndex);
          attrName = binding.substring(colonIndex + 1);
        }
        results.push(this._setupPlayerAttributeBindingObservation(player, property, attrName));
      }
      return results;
    },
    _setupPlayerEventHandler: function _setupPlayerEventHandler(player, event, eventName) {
      var handlerFunction;
      handlerFunction = _ember['default'].run.bind(this, function (e) {
        return this.trigger(eventName, player, e);
      });
      return player.on(event, handlerFunction);
    },
    _setupPlayerEvents: function _setupPlayerEvents(player) {
      var event, events, i, len, results;
      events = this.get('playerEvents');
      results = [];
      for (i = 0, len = events.length; i < len; i++) {
        event = events[i];
        if (events.hasOwnProperty(event)) {
          results.push(this._setupPlayerEventHandler(player, event, events[event]));
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    _setupResizeListener: function _setupResizeListener(player) {
      var debouncedFunction, handlerFunction;
      handlerFunction = _ember['default'].run.bind(this, function () {
        return this._autoresizePlayer(player);
      });
      debouncedFunction = function () {
        return _ember['default'].run.debounce(this, handlerFunction, 150);
      };
      _ember['default'].$(window).on('resize', debouncedFunction);
      return this.on('willClearRender', function () {
        return _ember['default'].$(window).off('resize', debouncedFunction);
      });
    }
  });

  exports['default'] = VideoJsComponent;
});
define('pilots/components/video-player', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var VideoPlayerComponent;

  VideoPlayerComponent = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      if (this.get('autoplay')) {
        return this.$('video')[0].play();
      }
    },
    actions: {
      fullScreen: function fullScreen() {
        if (this.$('video')[0].requestFullscreen) {
          return this.$('video')[0].requestFullscreen();
        } else {
          if (this.$('video')[0].mozRequestFullScreen) {
            return this.$('video')[0].mozRequestFullScreen();
          } else {
            if (this.$('video')[0].webkitRequestFullscreen) {
              return Math.floor(this.$('video')[0].webkitRequestFullscreen() / Chrome) && Safari;
            }
          }
        }
      },
      showVideoControls: function showVideoControls() {
        return this.$('.video-controls').css('opacity', '1');
      },
      hideVideoControls: function hideVideoControls() {
        return setTimeout(function () {
          return this.$('.video-controls').css('opacity', '0');
        }, 500);
      },
      togglePlayPause: function togglePlayPause() {
        if (this.$('video')[0].paused === true) {
          this.$('.play').css('opacity', 1);
          setTimeout(function () {
            return this.$('.play').css('opacity', 0);
          }, 500);
          return this.$('video')[0].play();
        } else {
          this.$('.pause').css('opacity', 1);
          setTimeout(function () {
            return this.$('.pause').css('opacity', 0);
          }, 500);
          return this.$('video')[0].pause();
        }
      },
      toggleVolume: function toggleVolume() {
        console.log('here');
        console.log(this.$('video')[0].muted);
        if (this.$('video')[0].muted) {
          this.$('video')[0].muted = false;
          $('#volume-on').css('display', 'none');
          return $('#mute').css('display', 'flex');
        } else {
          this.$('video')[0].muted = true;
          $('#mute').css('display', 'none');
          return $('#volume-on').css('display', 'flex');
        }
      }
    }
  });

  exports['default'] = VideoPlayerComponent;
});
define('pilots/components/weather-icon', ['exports', 'ember'], function (exports, _ember) {
  var WeatherIconComponent;

  WeatherIconComponent = _ember['default'].Component.extend({
    tagName: 'canvas',
    classNames: 'weather-icon-canvas',
    attributeBindings: ['width', 'height'],
    width: _ember['default'].computed('width', function () {
      return this.get('width');
    }),
    height: _ember['default'].computed('width', function () {
      return this.get('width') / 2;
    }),
    didInsertElement: function didInsertElement() {
      var skycon;
      skycon = new Skycons({
        "color": "black"
      });
      skycon.add(this.element, this.get('icon'));
      return skycon.play();
    }
  });

  exports['default'] = WeatherIconComponent;
});
define('pilots/controllers/airmapcallback', ['exports', 'ember'], function (exports, _ember) {
  var AirmapcallbackController;

  AirmapcallbackController = _ember['default'].Controller.extend({
    queryParams: ['flight_id', 'authorizations']
  });

  exports['default'] = AirmapcallbackController;
});
define('pilots/controllers/application', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var ApplicationController;

  ApplicationController = _ember['default'].Controller.extend();

  exports['default'] = ApplicationController;
});
define('pilots/controllers/array', ['exports', '@ember/controller'], function (exports, _emberController) {
  exports['default'] = _emberController['default'];
});
define('pilots/controllers/dashboard', ['exports', 'ember'], function (exports, _ember) {
  var DashboardController;

  DashboardController = _ember['default'].Controller.extend({
    showRegistrationCode: _ember['default'].computed(function () {
      return Cookies.get('registrationCompleted');
    }).volatile()
  });

  exports['default'] = DashboardController;
});
define('pilots/controllers/object', ['exports', '@ember/controller'], function (exports, _emberController) {
  exports['default'] = _emberController['default'];
});
define('pilots/controllers/pilot/edit', ['exports', 'ember'], function (exports, _ember) {
  var PilotEditController;

  PilotEditController = _ember['default'].Controller.extend({
    international: _ember['default'].computed('model.pilot.country', function () {
      return this.get('model.pilot.country') !== 'US';
    })
  });

  exports['default'] = PilotEditController;
});
define('pilots/controllers/pilotaccount', ['exports', 'ember'], function (exports, _ember) {
  var PilotAccountController;

  PilotAccountController = _ember['default'].Controller.extend({
    international: _ember['default'].computed('model.pilot.country', function () {
      return this.get('model.pilot.country') !== 'US';
    })
  });

  exports['default'] = PilotAccountController;
});
define("pilots/data/iso_country", ["exports"], function (exports) {
  // Data comes from:
  // https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/slim-2/slim-2.json
  exports["default"] = [{ "label": "United States", "value": "US", "country-code": "840" }, { "label": "Canada", "value": "CA", "country-code": "124" }, { "label": "Afghanistan", "value": "AF", "country-code": "004" }, { "label": "Åland Islands", "value": "AX", "country-code": "248" }, { "label": "Albania", "value": "AL", "country-code": "008" }, { "label": "Algeria", "value": "DZ", "country-code": "012" }, { "label": "American Samoa", "value": "AS", "country-code": "016" }, { "label": "Andorra", "value": "AD", "country-code": "020" }, { "label": "Angola", "value": "AO", "country-code": "024" }, { "label": "Anguilla", "value": "AI", "country-code": "660" }, { "label": "Antarctica", "value": "AQ", "country-code": "010" }, { "label": "Antigua and Barbuda", "value": "AG", "country-code": "028" }, { "label": "Argentina", "value": "AR", "country-code": "032" }, { "label": "Armenia", "value": "AM", "country-code": "051" }, { "label": "Aruba", "value": "AW", "country-code": "533" }, { "label": "Australia", "value": "AU", "country-code": "036" }, { "label": "Austria", "value": "AT", "country-code": "040" }, { "label": "Azerbaijan", "value": "AZ", "country-code": "031" }, { "label": "Bahamas", "value": "BS", "country-code": "044" }, { "label": "Bahrain", "value": "BH", "country-code": "048" }, { "label": "Bangladesh", "value": "BD", "country-code": "050" }, { "label": "Barbados", "value": "BB", "country-code": "052" }, { "label": "Belarus", "value": "BY", "country-code": "112" }, { "label": "Belgium", "value": "BE", "country-code": "056" }, { "label": "Belize", "value": "BZ", "country-code": "084" }, { "label": "Benin", "value": "BJ", "country-code": "204" }, { "label": "Bermuda", "value": "BM", "country-code": "060" }, { "label": "Bhutan", "value": "BT", "country-code": "064" }, { "label": "Bolivia, Plurinational State of", "value": "BO", "country-code": "068" }, { "label": "Bonaire, Sint Eustatius and Saba", "value": "BQ", "country-code": "535" }, { "label": "Bosnia and Herzegovina", "value": "BA", "country-code": "070" }, { "label": "Botswana", "value": "BW", "country-code": "072" }, { "label": "Bouvet Island", "value": "BV", "country-code": "074" }, { "label": "Brazil", "value": "BR", "country-code": "076" }, { "label": "British Indian Ocean Territory", "value": "IO", "country-code": "086" }, { "label": "Brunei Darussalam", "value": "BN", "country-code": "096" }, { "label": "Bulgaria", "value": "BG", "country-code": "100" }, { "label": "Burkina Faso", "value": "BF", "country-code": "854" }, { "label": "Burundi", "value": "BI", "country-code": "108" }, { "label": "Cambodia", "value": "KH", "country-code": "116" }, { "label": "Cameroon", "value": "CM", "country-code": "120" }, { "label": "Cape Verde", "value": "CV", "country-code": "132" }, { "label": "Cayman Islands", "value": "KY", "country-code": "136" }, { "label": "Central African Republic", "value": "CF", "country-code": "140" }, { "label": "Chad", "value": "TD", "country-code": "148" }, { "label": "Chile", "value": "CL", "country-code": "152" }, { "label": "China", "value": "CN", "country-code": "156" }, { "label": "Christmas Island", "value": "CX", "country-code": "162" }, { "label": "Cocos (Keeling) Islands", "value": "CC", "country-code": "166" }, { "label": "Colombia", "value": "CO", "country-code": "170" }, { "label": "Comoros", "value": "KM", "country-code": "174" }, { "label": "Congo", "value": "CG", "country-code": "178" }, { "label": "Congo, the Democratic Republic of the", "value": "CD", "country-code": "180" }, { "label": "Cook Islands", "value": "CK", "country-code": "184" }, { "label": "Costa Rica", "value": "CR", "country-code": "188" }, { "label": "Côte d'Ivoire", "value": "CI", "country-code": "384" }, { "label": "Croatia", "value": "HR", "country-code": "191" }, { "label": "Cuba", "value": "CU", "country-code": "192" }, { "label": "Curaçao", "value": "CW", "country-code": "531" }, { "label": "Cyprus", "value": "CY", "country-code": "196" }, { "label": "Czech Republic", "value": "CZ", "country-code": "203" }, { "label": "Denmark", "value": "DK", "country-code": "208" }, { "label": "Djibouti", "value": "DJ", "country-code": "262" }, { "label": "Dominica", "value": "DM", "country-code": "212" }, { "label": "Dominican Republic", "value": "DO", "country-code": "214" }, { "label": "Ecuador", "value": "EC", "country-code": "218" }, { "label": "Egypt", "value": "EG", "country-code": "818" }, { "label": "El Salvador", "value": "SV", "country-code": "222" }, { "label": "Equatorial Guinea", "value": "GQ", "country-code": "226" }, { "label": "Eritrea", "value": "ER", "country-code": "232" }, { "label": "Estonia", "value": "EE", "country-code": "233" }, { "label": "Ethiopia", "value": "ET", "country-code": "231" }, { "label": "Falkland Islands (Malvinas)", "value": "FK", "country-code": "238" }, { "label": "Faroe Islands", "value": "FO", "country-code": "234" }, { "label": "Fiji", "value": "FJ", "country-code": "242" }, { "label": "Finland", "value": "FI", "country-code": "246" }, { "label": "France", "value": "FR", "country-code": "250" }, { "label": "French Guiana", "value": "GF", "country-code": "254" }, { "label": "French Polynesia", "value": "PF", "country-code": "258" }, { "label": "French Southern Territories", "value": "TF", "country-code": "260" }, { "label": "Gabon", "value": "GA", "country-code": "266" }, { "label": "Gambia", "value": "GM", "country-code": "270" }, { "label": "Georgia", "value": "GE", "country-code": "268" }, { "label": "Germany", "value": "DE", "country-code": "276" }, { "label": "Ghana", "value": "GH", "country-code": "288" }, { "label": "Gibraltar", "value": "GI", "country-code": "292" }, { "label": "Greece", "value": "GR", "country-code": "300" }, { "label": "Greenland", "value": "GL", "country-code": "304" }, { "label": "Grenada", "value": "GD", "country-code": "308" }, { "label": "Guadeloupe", "value": "GP", "country-code": "312" }, { "label": "Guam", "value": "GU", "country-code": "316" }, { "label": "Guatemala", "value": "GT", "country-code": "320" }, { "label": "Guernsey", "value": "GG", "country-code": "831" }, { "label": "Guinea", "value": "GN", "country-code": "324" }, { "label": "Guinea-Bissau", "value": "GW", "country-code": "624" }, { "label": "Guyana", "value": "GY", "country-code": "328" }, { "label": "Haiti", "value": "HT", "country-code": "332" }, { "label": "Heard Island and McDonald Islands", "value": "HM", "country-code": "334" }, { "label": "Holy See (Vatican City State)", "value": "VA", "country-code": "336" }, { "label": "Honduras", "value": "HN", "country-code": "340" }, { "label": "Hong Kong", "value": "HK", "country-code": "344" }, { "label": "Hungary", "value": "HU", "country-code": "348" }, { "label": "Iceland", "value": "IS", "country-code": "352" }, { "label": "India", "value": "IN", "country-code": "356" }, { "label": "Indonesia", "value": "ID", "country-code": "360" }, { "label": "Iran, Islamic Republic of", "value": "IR", "country-code": "364" }, { "label": "Iraq", "value": "IQ", "country-code": "368" }, { "label": "Ireland", "value": "IE", "country-code": "372" }, { "label": "Isle of Man", "value": "IM", "country-code": "833" }, { "label": "Israel", "value": "IL", "country-code": "376" }, { "label": "Italy", "value": "IT", "country-code": "380" }, { "label": "Jamaica", "value": "JM", "country-code": "388" }, { "label": "Japan", "value": "JP", "country-code": "392" }, { "label": "Jersey", "value": "JE", "country-code": "832" }, { "label": "Jordan", "value": "JO", "country-code": "400" }, { "label": "Kazakhstan", "value": "KZ", "country-code": "398" }, { "label": "Kenya", "value": "KE", "country-code": "404" }, { "label": "Kiribati", "value": "KI", "country-code": "296" }, { "label": "Korea, Democratic People's Republic of", "value": "KP", "country-code": "408" }, { "label": "Korea, Republic of", "value": "KR", "country-code": "410" }, { "label": "Kuwait", "value": "KW", "country-code": "414" }, { "label": "Kyrgyzstan", "value": "KG", "country-code": "417" }, { "label": "Lao People's Democratic Republic", "value": "LA", "country-code": "418" }, { "label": "Latvia", "value": "LV", "country-code": "428" }, { "label": "Lebanon", "value": "LB", "country-code": "422" }, { "label": "Lesotho", "value": "LS", "country-code": "426" }, { "label": "Liberia", "value": "LR", "country-code": "430" }, { "label": "Libya", "value": "LY", "country-code": "434" }, { "label": "Liechtenstein", "value": "LI", "country-code": "438" }, { "label": "Lithuania", "value": "LT", "country-code": "440" }, { "label": "Luxembourg", "value": "LU", "country-code": "442" }, { "label": "Macao", "value": "MO", "country-code": "446" }, { "label": "Macedonia, the former Yugoslav Republic of", "value": "MK", "country-code": "807" }, { "label": "Madagascar", "value": "MG", "country-code": "450" }, { "label": "Malawi", "value": "MW", "country-code": "454" }, { "label": "Malaysia", "value": "MY", "country-code": "458" }, { "label": "Maldives", "value": "MV", "country-code": "462" }, { "label": "Mali", "value": "ML", "country-code": "466" }, { "label": "Malta", "value": "MT", "country-code": "470" }, { "label": "Marshall Islands", "value": "MH", "country-code": "584" }, { "label": "Martinique", "value": "MQ", "country-code": "474" }, { "label": "Mauritania", "value": "MR", "country-code": "478" }, { "label": "Mauritius", "value": "MU", "country-code": "480" }, { "label": "Mayotte", "value": "YT", "country-code": "175" }, { "label": "Mexico", "value": "MX", "country-code": "484" }, { "label": "Micronesia, Federated States of", "value": "FM", "country-code": "583" }, { "label": "Moldova, Republic of", "value": "MD", "country-code": "498" }, { "label": "Monaco", "value": "MC", "country-code": "492" }, { "label": "Mongolia", "value": "MN", "country-code": "496" }, { "label": "Montenegro", "value": "ME", "country-code": "499" }, { "label": "Montserrat", "value": "MS", "country-code": "500" }, { "label": "Morocco", "value": "MA", "country-code": "504" }, { "label": "Mozambique", "value": "MZ", "country-code": "508" }, { "label": "Myanmar", "value": "MM", "country-code": "104" }, { "label": "Namibia", "value": "NA", "country-code": "516" }, { "label": "Nauru", "value": "NR", "country-code": "520" }, { "label": "Nepal", "value": "NP", "country-code": "524" }, { "label": "Netherlands", "value": "NL", "country-code": "528" }, { "label": "New Caledonia", "value": "NC", "country-code": "540" }, { "label": "New Zealand", "value": "NZ", "country-code": "554" }, { "label": "Nicaragua", "value": "NI", "country-code": "558" }, { "label": "Niger", "value": "NE", "country-code": "562" }, { "label": "Nigeria", "value": "NG", "country-code": "566" }, { "label": "Niue", "value": "NU", "country-code": "570" }, { "label": "Norfolk Island", "value": "NF", "country-code": "574" }, { "label": "Northern Mariana Islands", "value": "MP", "country-code": "580" }, { "label": "Norway", "value": "NO", "country-code": "578" }, { "label": "Oman", "value": "OM", "country-code": "512" }, { "label": "Pakistan", "value": "PK", "country-code": "586" }, { "label": "Palau", "value": "PW", "country-code": "585" }, { "label": "Palestine, State of", "value": "PS", "country-code": "275" }, { "label": "Panama", "value": "PA", "country-code": "591" }, { "label": "Papua New Guinea", "value": "PG", "country-code": "598" }, { "label": "Paraguay", "value": "PY", "country-code": "600" }, { "label": "Peru", "value": "PE", "country-code": "604" }, { "label": "Philippines", "value": "PH", "country-code": "608" }, { "label": "Pitcairn", "value": "PN", "country-code": "612" }, { "label": "Poland", "value": "PL", "country-code": "616" }, { "label": "Portugal", "value": "PT", "country-code": "620" }, { "label": "Puerto Rico", "value": "PR", "country-code": "630" }, { "label": "Qatar", "value": "QA", "country-code": "634" }, { "label": "Réunion", "value": "RE", "country-code": "638" }, { "label": "Romania", "value": "RO", "country-code": "642" }, { "label": "Russian Federation", "value": "RU", "country-code": "643" }, { "label": "Rwanda", "value": "RW", "country-code": "646" }, { "label": "Saint Barthélemy", "value": "BL", "country-code": "652" }, { "label": "Saint Helena, Ascension and Tristan da Cunha", "value": "SH", "country-code": "654" }, { "label": "Saint Kitts and Nevis", "value": "KN", "country-code": "659" }, { "label": "Saint Lucia", "value": "LC", "country-code": "662" }, { "label": "Saint Martin (French part)", "value": "MF", "country-code": "663" }, { "label": "Saint Pierre and Miquelon", "value": "PM", "country-code": "666" }, { "label": "Saint Vincent and the Grenadines", "value": "VC", "country-code": "670" }, { "label": "Samoa", "value": "WS", "country-code": "882" }, { "label": "San Marino", "value": "SM", "country-code": "674" }, { "label": "Sao Tome and Principe", "value": "ST", "country-code": "678" }, { "label": "Saudi Arabia", "value": "SA", "country-code": "682" }, { "label": "Senegal", "value": "SN", "country-code": "686" }, { "label": "Serbia", "value": "RS", "country-code": "688" }, { "label": "Seychelles", "value": "SC", "country-code": "690" }, { "label": "Sierra Leone", "value": "SL", "country-code": "694" }, { "label": "Singapore", "value": "SG", "country-code": "702" }, { "label": "Sint Maarten (Dutch part)", "value": "SX", "country-code": "534" }, { "label": "Slovakia", "value": "SK", "country-code": "703" }, { "label": "Slovenia", "value": "SI", "country-code": "705" }, { "label": "Solomon Islands", "value": "SB", "country-code": "090" }, { "label": "Somalia", "value": "SO", "country-code": "706" }, { "label": "South Africa", "value": "ZA", "country-code": "710" }, { "label": "South Georgia and the South Sandwich Islands", "value": "GS", "country-code": "239" }, { "label": "South Sudan", "value": "SS", "country-code": "728" }, { "label": "Spain", "value": "ES", "country-code": "724" }, { "label": "Sri Lanka", "value": "LK", "country-code": "144" }, { "label": "Sudan", "value": "SD", "country-code": "729" }, { "label": "Suriname", "value": "SR", "country-code": "740" }, { "label": "Svalbard and Jan Mayen", "value": "SJ", "country-code": "744" }, { "label": "Swaziland", "value": "SZ", "country-code": "748" }, { "label": "Sweden", "value": "SE", "country-code": "752" }, { "label": "Switzerland", "value": "CH", "country-code": "756" }, { "label": "Syrian Arab Republic", "value": "SY", "country-code": "760" }, { "label": "Taiwan, Province of China", "value": "TW", "country-code": "158" }, { "label": "Tajikistan", "value": "TJ", "country-code": "762" }, { "label": "Tanzania, United Republic of", "value": "TZ", "country-code": "834" }, { "label": "Thailand", "value": "TH", "country-code": "764" }, { "label": "Timor-Leste", "value": "TL", "country-code": "626" }, { "label": "Togo", "value": "TG", "country-code": "768" }, { "label": "Tokelau", "value": "TK", "country-code": "772" }, { "label": "Tonga", "value": "TO", "country-code": "776" }, { "label": "Trinidad and Tobago", "value": "TT", "country-code": "780" }, { "label": "Tunisia", "value": "TN", "country-code": "788" }, { "label": "Turkey", "value": "TR", "country-code": "792" }, { "label": "Turkmenistan", "value": "TM", "country-code": "795" }, { "label": "Turks and Caicos Islands", "value": "TC", "country-code": "796" }, { "label": "Tuvalu", "value": "TV", "country-code": "798" }, { "label": "Uganda", "value": "UG", "country-code": "800" }, { "label": "Ukraine", "value": "UA", "country-code": "804" }, { "label": "United Arab Emirates", "value": "AE", "country-code": "784" }, { "label": "United Kingdom", "value": "GB", "country-code": "826" }, { "label": "United States Minor Outlying Islands", "value": "UM", "country-code": "581" }, { "label": "Uruguay", "value": "UY", "country-code": "858" }, { "label": "Uzbekistan", "value": "UZ", "country-code": "860" }, { "label": "Vanuatu", "value": "VU", "country-code": "548" }, { "label": "Venezuela, Bolivarian Republic of", "value": "VE", "country-code": "862" }, { "label": "Viet Nam", "value": "VN", "country-code": "704" }, { "label": "Virgin Islands, British", "value": "VG", "country-code": "092" }, { "label": "Virgin Islands, U.S.", "value": "VI", "country-code": "850" }, { "label": "Wallis and Futuna", "value": "WF", "country-code": "876" }, { "label": "Western Sahara", "value": "EH", "country-code": "732" }, { "label": "Yemen", "value": "YE", "country-code": "887" }, { "label": "Zambia", "value": "ZM", "country-code": "894" }, { "label": "Zimbabwe", "value": "ZW", "country-code": "716" }];
});
define("pilots/data/map_style", ["exports"], function (exports) {
  exports["default"] = [{ "stylers": [{ "saturation": -100 }, { "gamma": 1 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "stylers": [{ "visibility": "on" }, { "saturation": 50 }, { "gamma": 0 }, { "hue": "#50a5d1" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#333333" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "weight": 0.5 }, { "color": "#333333" }] }, { "featureType": "transit.station", "elementType": "labels.icon", "stylers": [{ "gamma": 1 }, { "saturation": 50 }] }, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility:": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "off" }] }];
});
define("pilots/data/mission_type", ["exports"], function (exports) {
  exports["default"] = [{ "type": "client_mission", "name": "Client Mission", "color": "client-mission-icon-color", "fontIcon": "icon-ClientPin", "png": "client_mission_assigned.png" }, { "type": "client_mission_available", "name": "Available Mission", "color": "client-mission-available-icon-color", "fontIcon": "icon-ClientPin", "png": "client_mission_available.png" }, { "type": "pano_commercial_available", "name": "Commercial Pano", "color": "pano-icon-color", "fontIcon": "icon-CommercialPin", "png": "pano_commercial_available.png" }, { "type": "pano_commercial_active", "name": "Active Pano", "color": "pano-icon-color", "fontIcon": "icon-DroneBase_Icons_Commercial_Star-Pin", "png": "pano_commercial_active.png" }, { "type": "pano_commercial_completed", "name": "Completed Pano", "color": "pano-icon-color", "fontIcon": "icon-DroneBase_Icons_Commercial_complete_pin", "png": "pano_commercial_completed.png" }, { "type": "pano_residential_available", "name": "Residential Pano", "color": "pano-icon-color", "fontIcon": "icon-ResidentialPin", "png": "pano_residential_available.png" }, { "type": "pano_residential_active", "name": "Active Pano", "color": "pano-icon-color", "fontIcon": " icon-DroneBase_Icons_Residential_Star_pin", "png": "pano_residential_active.png" }, { "type": "pano_residential_completed", "name": "Completed Pano", "color": "pano-icon-color", "fontIcon": "icon-DroneBase_Icons_Residential_complete_pin", "png": "pano_residential_completed.png" }, { "type": "creative_mission", "name": "Creative Mission", "color": "creative-icon-color", "fontIcon": "icon-DroneBase_Icons_Residential_complete_pin", "png": "creative_mission.png" }];
});
define("pilots/data/travel_https://annvelents.github.io/dronebase_styleguide_t/distance", ["exports"], function (exports) {
  exports["default"] = [{ "label": "25 Miles", "value": "25" }, { "label": "50 Miles", "value": "50" }, { "label": "100 Miles", "value": "100" }, { "label": "250 Miles", "value": "250" }];
});
define('pilots/helpers/addition', ['exports', 'ember'], function (exports, _ember) {
  var AdditionHelper;

  AdditionHelper = _ember['default'].Helper.helper(function (arg) {
    var value1, value2;
    value1 = arg[0], value2 = arg[1];
    return value1 + value2;
  });

  exports['default'] = AdditionHelper;
});
define('pilots/helpers/and', ['exports', 'ember'], function (exports, _ember) {
  var AndHelper;

  AndHelper = _ember['default'].Helper.helper(function (arg) {
    var leftSide, rightSide;
    leftSide = arg[0], rightSide = arg[1];
    return leftSide && rightSide;
  });

  exports['default'] = AndHelper;
});
define('pilots/helpers/app-version', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _pilotsConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('pilots/helpers/are-dates-equal', ['exports', 'ember'], function (exports, _ember) {
  var MomentFormatUnixHelper;

  MomentFormatUnixHelper = _ember['default'].Helper.helper(function (arg) {
    var format, time;
    time = arg[0], format = arg[1];
    return moment.unix(time).format(format);
  });

  exports['default'] = MomentFormatUnixHelper;
});
define('pilots/helpers/asset-map', ['exports', 'ember-cli-ifa/helpers/asset-map'], function (exports, _emberCliIfaHelpersAssetMap) {
  exports['default'] = _emberCliIfaHelpersAssetMap['default'];
});
define('pilots/helpers/changeset', ['exports', 'ember-changeset-validations/helpers/changeset'], function (exports, _emberChangesetValidationsHelpersChangeset) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberChangesetValidationsHelpersChangeset['default'];
    }
  });
  Object.defineProperty(exports, 'changeset', {
    enumerable: true,
    get: function get() {
      return _emberChangesetValidationsHelpersChangeset.changeset;
    }
  });
});
define('pilots/helpers/clear-cookie', ['exports', 'ember'], function (exports, _ember) {
  var ClearCookieHelper;

  ClearCookieHelper = _ember['default'].Helper.helper(function (arg) {
    var name;
    name = arg[0];
    return Cookies.remove(name);
  });

  exports['default'] = ClearCookieHelper;
});
define("pilots/helpers/decimal-to-percent", ["exports", "ember"], function (exports, _ember) {
  var DecimalToPercentHelper;

  DecimalToPercentHelper = _ember["default"].Helper.helper(function (arg) {
    var number;
    number = arg[0];
    return Math.round(number * 100) + "%";
  });

  exports["default"] = DecimalToPercentHelper;
});
define('pilots/helpers/disable-bubbling', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.disableBubbling = disableBubbling;

  function disableBubbling(_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var action = _ref2[0];

    return function (event) {
      event.stopPropagation();

      return action(event);
    };
  }

  exports['default'] = _ember['default'].Helper.helper(disableBubbling);
});
define('pilots/helpers/division', ['exports', 'ember'], function (exports, _ember) {
  var DivisionHelper;

  DivisionHelper = _ember['default'].Helper.helper(function (arg) {
    var value1, value2;
    value1 = arg[0], value2 = arg[1];
    return value1 / value2;
  });

  exports['default'] = DivisionHelper;
});
define('pilots/helpers/format-money', ['exports', 'accounting/helpers/format-money'], function (exports, _accountingHelpersFormatMoney) {
  exports['default'] = _accountingHelpersFormatMoney['default'];
});
define('pilots/helpers/format-number', ['exports', 'accounting/helpers/format-number'], function (exports, _accountingHelpersFormatNumber) {
  exports['default'] = _accountingHelpersFormatNumber['default'];
});
define('pilots/helpers/human-readable-filesize', ['exports', 'ember'], function (exports, _ember) {
  var HumanReadableFilesizeHelper;

  HumanReadableFilesizeHelper = _ember['default'].Helper.helper(function (arg) {
    var i, size;
    size = arg[0];
    i = Math.floor(Math.log(size) / Math.log(1024));
    if (i < 0) {
      i = 0;
    }
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  });

  exports['default'] = HumanReadableFilesizeHelper;
});
define('pilots/helpers/is-after', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsAfter) {
  exports['default'] = _emberMomentHelpersIsAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/is-android', ['exports', 'ember'], function (exports, _ember) {
  var IsAndroidHelper;

  IsAndroidHelper = _ember['default'].Helper.helper(function () {
    var userAgent;
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (/android/i.test(userAgent)
    );
  });

  exports['default'] = IsAndroidHelper;
});
define('pilots/helpers/is-before', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsBefore) {
  exports['default'] = _emberMomentHelpersIsBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/is-between', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsBetween) {
  exports['default'] = _emberMomentHelpersIsBetween['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/is-equal', ['exports', 'ember'], function (exports, _ember) {
  var IsEqualHelper;

  IsEqualHelper = _ember['default'].Helper.helper(function (arg) {
    var leftSide, rightSide;
    leftSide = arg[0], rightSide = arg[1];
    return leftSide === rightSide;
  });

  exports['default'] = IsEqualHelper;
});
define('pilots/helpers/is-in', ['exports', 'ember'], function (exports, _ember) {
  var IsInHelper,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  IsInHelper = _ember['default'].Helper.helper(function (arg) {
    var list, value;
    value = arg[0], list = arg[1];
    return indexOf.call(list.split(','), value) >= 0;
  });

  exports['default'] = IsInHelper;
});
define('pilots/helpers/is-ios', ['exports', 'ember'], function (exports, _ember) {
  var IsiOS;

  IsiOS = _ember['default'].Helper.helper(function () {
    var userAgent;
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    );
  });

  exports['default'] = IsiOS;
});
define('pilots/helpers/is-mobile', ['exports', 'ember'], function (exports, _ember) {
  var isMobileHelper;

  isMobileHelper = _ember['default'].Helper.helper(function () {
    var android, ios, userAgent;
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
    android = /android/i.test(userAgent);
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
    ios = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    return android || ios;
  });

  exports['default'] = isMobileHelper;
});
define('pilots/helpers/is-not', ['exports', 'ember'], function (exports, _ember) {
  var IsNotHelper;

  IsNotHelper = _ember['default'].Helper.helper(function (arg) {
    var value;
    value = arg[0];
    return !value;
  });

  exports['default'] = IsNotHelper;
});
define('pilots/helpers/is-same-or-after', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsSameOrAfter) {
  exports['default'] = _emberMomentHelpersIsSameOrAfter['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/is-same-or-before', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsSameOrBefore) {
  exports['default'] = _emberMomentHelpersIsSameOrBefore['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/is-same', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersIsSame) {
  exports['default'] = _emberMomentHelpersIsSame['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define("pilots/helpers/log", ["exports"], function (exports) {
  exports["default"] = function () {
    //console.debug(str);
  };

  ;
});
define('pilots/helpers/mission-next-step', ['exports', 'ember'], function (exports, _ember) {
  var MissionNextStepHelper;

  MissionNextStepHelper = _ember['default'].Helper.helper(function (arg) {
    var status;
    status = arg[0];
    if (status === 'pilot_assigned') {
      return 'Complete Flight';
    } else if (status === 'flight_complete') {
      return 'Upload Assets';
    } else {
      return '';
    }
  });

  exports['default'] = MissionNextStepHelper;
});
define('pilots/helpers/moment-add', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentAdd) {
  exports['default'] = _emberMomentHelpersMomentAdd['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-calendar', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('pilots/helpers/moment-format-unix', ['exports', 'ember'], function (exports, _ember) {
  var MomentFormatUnixHelper;

  MomentFormatUnixHelper = _ember['default'].Helper.helper(function (arg) {
    var format, time;
    time = arg[0], format = arg[1];
    return moment.unix(time).format(format);
  });

  exports['default'] = MomentFormatUnixHelper;
});
define('pilots/helpers/moment-format', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-from-now', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-from', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentFrom) {
  exports['default'] = _emberMomentHelpersMomentFrom['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-subtract', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentSubtract) {
  exports['default'] = _emberMomentHelpersMomentSubtract['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-to-date', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentToDate) {
  exports['default'] = _emberMomentHelpersMomentToDate['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-to-now', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-to', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentHelpersMomentTo) {
  exports['default'] = _emberMomentHelpersMomentTo['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('pilots/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('pilots/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _emberMomentHelpersMoment) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMoment['default'];
    }
  });
});
define('pilots/helpers/multiplication', ['exports', 'ember'], function (exports, _ember) {
  var MultiplicationHelper;

  MultiplicationHelper = _ember['default'].Helper.helper(function (arg) {
    var value1, value2;
    value1 = arg[0], value2 = arg[1];
    if (!value1) {
      value1 = 0;
    }
    return value1 * value2;
  });

  exports['default'] = MultiplicationHelper;
});
define('pilots/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define("pilots/helpers/number-in-dollars", ["exports", "ember"], function (exports, _ember) {
  var NumberInDollarsHelper;

  NumberInDollarsHelper = _ember["default"].Helper.helper(function (arg) {
    var number;
    number = arg[0];
    if (number === null) {
      return new _ember["default"].Handlebars.SafeString("<span class='dollarsign'>$</span>0");
    }
    return new _ember["default"].Handlebars.SafeString("<span class='dollarsign'>$</span>" + number / 100);
  });

  exports["default"] = NumberInDollarsHelper;
});
define('pilots/helpers/one-way-select/contains', ['exports', 'ember-one-way-controls/helpers/one-way-select/contains'], function (exports, _emberOneWayControlsHelpersOneWaySelectContains) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsHelpersOneWaySelectContains['default'];
    }
  });
  Object.defineProperty(exports, 'contains', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsHelpersOneWaySelectContains.contains;
    }
  });
});
define('pilots/helpers/or', ['exports', 'ember'], function (exports, _ember) {
  var OrHelper;

  OrHelper = _ember['default'].Helper.helper(function (arg) {
    var leftSide, rightSide;
    leftSide = arg[0], rightSide = arg[1];
    return leftSide || rightSide;
  });

  exports['default'] = OrHelper;
});
define('pilots/helpers/pluralize', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.pluralize = pluralize;

  function pluralize(params, options) {
    var _params = _slicedToArray(params, 2);

    var count = _params[0];
    var word = _params[1];
    var omitCount = options.omitCount;

    if (count !== 1) {
      count = count || 0;
      word = _ember['default'].String.pluralize(word);
    }

    return (omitCount ? '' : count + ' ') + word;
  }

  exports['default'] = _ember['default'].Helper.helper(pluralize);
});
define('pilots/helpers/read-path', ['exports', 'ember'], function (exports, _ember) {
  var ReadPathHelper;

  ReadPathHelper = _ember['default'].Helper.helper(function (arg) {
    var object, path;
    object = arg[0], path = arg[1];
    return _ember['default'].get(object, path);
  });

  exports['default'] = ReadPathHelper;
});
define('pilots/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _emberRouteActionHelperHelpersRouteAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouteActionHelperHelpersRouteAction['default'];
    }
  });
});
define('pilots/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('pilots/helpers/starts-with', ['exports', 'ember'], function (exports, _ember) {
  var StartsWithHelper;

  StartsWithHelper = _ember['default'].Helper.helper(function (arg) {
    var prefix, string;
    string = arg[0], prefix = arg[1];
    if (typeof string !== 'string' || typeof prefix !== 'string') {
      return false;
    }
    return string.startsWith(prefix);
  });

  exports['default'] = StartsWithHelper;
});
define("pilots/helpers/temperature", ["exports", "ember"], function (exports, _ember) {
  var TemperatureHelper;

  TemperatureHelper = _ember["default"].Helper.helper(function (arg) {
    var number, type;
    number = arg[0], type = arg[1];
    return "" + Math.round(number) + type;
  });

  exports["default"] = TemperatureHelper;
});
define('pilots/helpers/titleize', ['exports', 'ember'], function (exports, _ember) {
  var TitleizeHelper;

  TitleizeHelper = _ember['default'].Helper.helper(function (arg) {
    var string;
    string = arg[0];
    if (!string) {
      return '';
    }
    return string.split('_').map(function (st) {
      return st.charAt(0).toUpperCase() + st.slice(1);
    }).join(' ');
  });

  exports['default'] = TitleizeHelper;
});
define('pilots/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _emberMomentHelpersUnix) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix['default'];
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersUnix.unix;
    }
  });
});
define('pilots/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
});
define('pilots/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'pilots/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _pilotsConfigEnvironment) {
  var _config$APP = _pilotsConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('pilots/initializers/asset-map', ['exports', 'ember-cli-ifa/initializers/asset-map'], function (exports, _emberCliIfaInitializersAssetMap) {
  exports['default'] = _emberCliIfaInitializersAssetMap['default'];
});
define('pilots/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define("pilots/initializers/coordinator-setup", ["exports", "pilots/models/coordinator"], function (exports, _pilotsModelsCoordinator) {
  exports["default"] = {
    name: "setup coordinator",

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register("drag:coordinator", _pilotsModelsCoordinator["default"]);
      app.inject("component", "coordinator", "drag:coordinator");
    }
  };
});
define('pilots/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('pilots/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('pilots/initializers/ember-pusher-injections', ['exports', 'ember-pusher/initializers/ember-pusher-injections'], function (exports, _emberPusherInitializersEmberPusherInjections) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPusherInitializersEmberPusherInjections['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberPusherInitializersEmberPusherInjections.initialize;
    }
  });
});
define('pilots/initializers/ember-simple-auth', ['exports', 'pilots/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _pilotsConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _pilotsConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _pilotsConfigEnvironment['default'].rootURL || _pilotsConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('pilots/initializers/export-application-global', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_pilotsConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _pilotsConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_pilotsConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('pilots/initializers/head-tags', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize() {
    // ember 1.13 backwards compatibility
    var application = arguments[1] || arguments[0];
    application.inject('service:head-tags', 'router', 'router:main');
  }

  exports['default'] = {
    name: 'head-tags',
    initialize: initialize
  };
});
define('pilots/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('pilots/initializers/metrics', ['exports', 'pilots/config/environment'], function (exports, _pilotsConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    var _config$metricsAdapters = _pilotsConfigEnvironment['default'].metricsAdapters;
    var metricsAdapters = _config$metricsAdapters === undefined ? [] : _config$metricsAdapters;
    var _config$environment = _pilotsConfigEnvironment['default'].environment;
    var environment = _config$environment === undefined ? 'development' : _config$environment;

    var options = { metricsAdapters: metricsAdapters, environment: environment };

    application.register('config:metrics', options, { instantiate: false });
    application.inject('service:metrics', 'options', 'config:metrics');
  }

  exports['default'] = {
    name: 'metrics',
    initialize: initialize
  };
});
define("pilots/initializers/side-menu", ["exports", "ember-side-menu/initializers/side-menu"], function (exports, _emberSideMenuInitializersSideMenu) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuInitializersSideMenu["default"];
    }
  });
  Object.defineProperty(exports, "initialize", {
    enumerable: true,
    get: function get() {
      return _emberSideMenuInitializersSideMenu.initialize;
    }
  });
});
define('pilots/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('pilots/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('pilots/instance-initializers/browser/head', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  exports.initialize = initialize;

  function initialize(owner) {
    if (_pilotsConfigEnvironment['default']['ember-cli-head'] && _pilotsConfigEnvironment['default']['ember-cli-head']['suppressBrowserRender']) {
      return true;
    }

    // clear fast booted head (if any)
    _ember['default'].$('meta[name="ember-cli-head-start"]').nextUntil('meta[name="ember-cli-head-end"] ~').addBack().remove();

    var component = owner.lookup('component:head-layout');
    component.appendTo(document.head);
  }

  exports['default'] = {
    name: 'head-browser',
    initialize: initialize
  };
});
define('pilots/instance-initializers/ember-cli-airbrake', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {

  function registerEmberOnError(notifyFn) {
    var originalOnError = _ember['default'].onerror || _ember['default'].K;
    _ember['default'].onerror = function (err) {
      originalOnError(err);
      notifyFn(err);
    };
  }

  function registerWindowOnError(notifyFn) {
    window.onerror = function (message, file, line, column, error) {
      if (message === 'Script error.') {
        // Ignore.
        return;
      }

      error = error || { error: {
          message: message,
          fileName: file,
          lineNumber: line,
          columnNumber: column || 0
        } };

      notifyFn(error);
    };
  }

  function initialize(instance) {
    // see http://emberjs.com/deprecations/v2.x/#toc_ember-applicationinstance-container
    var lookup = instance.lookup ? function () {
      return instance.lookup.apply(instance, arguments);
    } : function () {
      var _instance$container;

      return (_instance$container = instance.container).lookup.apply(_instance$container, arguments);
    };

    var notifyFn = function notifyFn(error) {
      var airbrake = lookup('service:airbrake');
      airbrake.notify(error);
    };

    if (!!_pilotsConfigEnvironment['default'].airbrake) {
      registerEmberOnError(notifyFn);
      registerWindowOnError(notifyFn);
    }
  }

  exports['default'] = {
    name: 'ember-cli-airbrake',
    initialize: initialize
  };
});
define("pilots/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('pilots/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('pilots/instance-initializers/head-tags', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(instance) {
    var container = instance.lookup ? instance : instance.container;
    var service = container.lookup('service:head-tags');
    service.get('router').on('didTransition', function () {
      service.collectHeadTags();
    });
  }

  exports['default'] = {
    name: 'head-tags',
    initialize: initialize
  };
});
define('pilots/instance-initializers/rollbar', ['exports', 'ember-rollbar-client/instance-initializers/rollbar'], function (exports, _emberRollbarClientInstanceInitializersRollbar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRollbarClientInstanceInitializersRollbar['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberRollbarClientInstanceInitializersRollbar.initialize;
    }
  });
});
define('pilots/mixins/s3-asset-uploads', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var S3AssetUploadsMixin;

  S3AssetUploadsMixin = _ember['default'].Mixin.create({
    airbrake: _ember['default'].inject.service(),
    sessionAccount: _ember['default'].inject.service(),
    headers: {},
    lookupAsset: function lookupAsset(fileType, file) {
      var asset, store;
      asset = null;
      store = this.get('store') ? this.get('store') : this.store;
      store.peekAll(fileType).filter(function (a) {
        if (a.get('id') === file.get('id')) {
          return asset = a;
        }
      });
      return asset;
    },
    xhrAPISuccessResponse: function xhrAPISuccessResponse(asset, response) {
      asset.setProperties({
        name: response.data.attributes.name,
        id: response.data.id,
        uploaded: true
      });
      if (asset.get('shot') && asset.get('mission.id')) {
        return asset.saveAsUpdate();
      }
    },
    xhrS3SuccessAPIRequest: function xhrS3SuccessAPIRequest(asset, response, mission_id, shot_id, timecode, fileType) {
      var uploadData, url;
      if (asset) {
        asset.setProperties({
          uploading: true
        });
      }
      url = _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission_id + "/" + fileType + "s";
      uploadData = {
        url: url,
        type: 'POST',
        dataType: 'json',
        data: {
          shot_id: shot_id,
          asset_url: unescape(response.full_url),
          chunked: response.chunked,
          base_key: unescape(response.base_key)
        },
        headers: this.get('sessionAccount.headers')
      };
      if (timecode) {
        uploadData['data']['timecode'] = timecode;
      }
      return _ember['default'].$.ajax(uploadData);
    },
    actions: {
      addAsset: function addAsset(file, shot_id, model, timecode) {
        var _this, asset, fileCheckUrl, fileType, mission_id, s3AuthUrl;
        _this = this;
        mission_id = model.mission ? model.mission.id : model.id;
        s3AuthUrl = _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission_id + "/s3_upload_request";
        fileCheckUrl = _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission_id + "/file_check";
        if (file != null) {
          fileType = file.get('type').match(/video|image/)[0];
          asset = _this.lookupAsset(fileType, file);
          return file.prepareForUpload({
            s3AuthUrl: s3AuthUrl,
            fileCheckUrl: fileCheckUrl
          }, fileType, this.get('sessionAccount.headers')).then(function (response) {
            return _this.xhrS3SuccessAPIRequest(asset, response, mission_id, shot_id, timecode, fileType).then(function (response) {
              if (asset) {
                return _this.xhrAPISuccessResponse(asset, response);
              }
            }, function (error) {
              return _this.get('airbrake').notify(new Error("Error posting upload to the api: " + JSON.stringify(error)));
            });
          }, function (error) {
            var $xml, xmlDoc;
            if (xmlDoc = Em.$.parseXML(error.response)) {
              $xml = Em.$(xmlDoc);
              return _this.get('airbrake').notify(new Error("Error preparing file for upload:(xml) " + $xml.find('Error').text()));
            } else {
              return _this.get('airbrake').notify(new Error("Error preparing file for upload: " + JSON.stringify(error)));
            }
          });
        }
      },
      removeAsset: function removeAsset(uploader, file) {
        return uploader.removeFile(file.content);
      },
      startUpload: function startUpload(uploader) {
        return uploader.start();
      },
      willTransition: function willTransition() {
        this.set('headers', {});
        return this.set('s3SignedUrls', {});
      }
    }
  });

  exports['default'] = S3AssetUploadsMixin;
});
define('pilots/models/category', ['exports', 'ember-data'], function (exports, _emberData) {
  var Category;

  Category = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    ordinality: _emberData['default'].attr('number')
  });

  exports['default'] = Category;
});
define('pilots/models/client', ['exports', 'ember-data'], function (exports, _emberData) {
  var Client;

  Client = _emberData['default'].Model.extend({
    first_name: _emberData['default'].attr('string'),
    last_name: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string')
  });

  exports['default'] = Client;
});
define('pilots/models/coordinator', ['exports', 'ember', 'pilots/models/obj-hash'], function (exports, _ember, _pilotsModelsObjHash) {
  exports['default'] = _ember['default'].Object.extend(_ember['default'].Evented, {
    objectMap: _ember['default'].computed(function () {
      return _pilotsModelsObjHash['default'].create();
    }),

    getObject: function getObject(id, ops) {
      ops = ops || {};
      var payload = this.get('objectMap').getObj(id);

      if (payload.ops.source) {
        payload.ops.source.sendAction('action', payload.obj);
      }

      if (payload.ops.target) {
        payload.ops.target.sendAction('action', payload.obj);
      }

      this.trigger("objectMoved", { obj: payload.obj, source: payload.ops.source, target: ops.target });

      return payload.obj;
    },

    setObject: function setObject(obj, ops) {
      ops = ops || {};
      return this.get('objectMap').add({ obj: obj, ops: ops });
    }
  });
});
define('pilots/models/device', ['exports', 'ember-data'], function (exports, _emberData) {
  var Device;

  Device = _emberData['default'].Model.extend({
    operating_system: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    device_type: _emberData['default'].attr('string')
  });

  exports['default'] = Device;
});
define('pilots/models/drone-camera', ['exports', 'ember-data'], function (exports, _emberData) {
  var DroneCamera;

  DroneCamera = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    stock: _emberData['default'].attr('boolean'),
    drone_manufacturer: _emberData['default'].belongsTo('drone-manufacturer')
  });

  exports['default'] = DroneCamera;
});
define('pilots/models/drone-manufacturer', ['exports', 'ember-data'], function (exports, _emberData) {
  var DroneManufacturer;

  DroneManufacturer = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    drones: _emberData['default'].hasMany('drone')
  });

  exports['default'] = DroneManufacturer;
});
define('pilots/models/drone', ['exports', 'ember-data'], function (exports, _emberData) {
  var Drone;

  Drone = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    optional_cameras: _emberData['default'].hasMany('stock-drone-camera', {
      async: false
    }),
    stock_cameras: _emberData['default'].hasMany('optional-drone-camera', {
      async: false
    }),
    drone_manufacturer: _emberData['default'].belongsTo('drone-manufacturer'),
    full_name: Ember.computed('name', 'drone_manufacturer', function () {
      return this.get('drone_manufacturer.name') + ' ' + this.get('name');
    })
  });

  exports['default'] = Drone;
});
define('pilots/models/flight-app', ['exports', 'ember-data'], function (exports, _emberData) {
  var FlightApp;

  FlightApp = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    app: _emberData['default'].attr('string'),
    data_type: _emberData['default'].attr('string'),
    value: _emberData['default'].attr('string'),
    delivery_to: _emberData['default'].attr('string'),
    delivery_to_url: _emberData['default'].attr('string'),
    pilot_flight_description: _emberData['default'].attr(''),
    pilot_delivery_description: _emberData['default'].attr(''),
    pilot_flight_instruction: _emberData['default'].attr(''),
    pilot_delivery_instruction: _emberData['default'].attr('')
  });

  exports['default'] = FlightApp;
});
define('pilots/models/image', ['exports', 'ember-data'], function (exports, _emberData) {
  var Image;

  Image = _emberData['default'].Model.extend({
    url: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    processing: _emberData['default'].attr('boolean'),
    version_urls: _emberData['default'].attr(),
    gps_latitude: _emberData['default'].attr('number'),
    gps_longitude: _emberData['default'].attr('number'),
    gps_altitude: _emberData['default'].attr('number'),
    mission: _emberData['default'].belongsTo('mission'),
    shot: _emberData['default'].belongsTo('shot'),
    isMissingGpsInfo: Ember.computed('gps_latitude', 'gps_longitude', 'gps_altitude', function () {
      return (!this.get('gps_latitude') || !this.get('gps_longitude') || !this.get('gps_altitude')) && !this.get('processing');
    }),
    file: null,
    uploadNumber: null,
    isSelected: false,
    generatingNativeThumbnail: false,
    nativeThumbnail: null,
    uploaded: false,
    hasProperId: Ember.computed('name', 'id', function () {
      return this.get('id').substr(0, 2) === 'DB';
    }),
    saveAsUpdate: function saveAsUpdate() {
      this.send('willCommit');
      this.send('didCommit');
      return this.save();
    }
  });

  exports['default'] = Image;
});
define('pilots/models/laanc-exemption', ['exports', 'ember-data'], function (exports, _emberData) {
  var LaancExemption;

  LaancExemption = _emberData['default'].Model.extend({
    city: _emberData['default'].attr('string'),
    ceiling: _emberData['default'].attr('number'),
    name: _emberData['default'].attr('string'),
    type: _emberData['default'].attr('string'),
    code: _emberData['default'].attr('string')
  });

  exports['default'] = LaancExemption;
});
define('pilots/models/laanc-flight', ['exports', 'ember-data'], function (exports, _emberData) {
  var LaancFlight;

  LaancFlight = _emberData['default'].Model.extend({
    authorizations: _emberData['default'].attr('')
  });

  exports['default'] = LaancFlight;
});
define('pilots/models/license', ['exports', 'ember-data'], function (exports, _emberData) {
  var License;

  License = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    country_id: _emberData['default'].attr('number')
  });

  exports['default'] = License;
});
define('pilots/models/location', ['exports', 'ember-data'], function (exports, _emberData) {
  var Location;

  Location = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    latitude: _emberData['default'].attr('string'),
    longitude: _emberData['default'].attr('string'),
    address: _emberData['default'].attr('string'),
    address2: _emberData['default'].attr('string'),
    city: _emberData['default'].attr('string'),
    state: _emberData['default'].attr('string'),
    postal_code: _emberData['default'].attr('string'),
    country: _emberData['default'].attr('string'),
    formatted_address: _emberData['default'].attr('string'),
    properties: _emberData['default'].attr(),
    timezone_id: _emberData['default'].attr('string'),
    missions: _emberData['default'].hasMany('mission', {
      async: false
    }),
    airmap_authorization: _emberData['default'].attr('string')
  });

  exports['default'] = Location;
});
define('pilots/models/mission-reschedule', ['exports', 'ember-data', 'pilots/config/environment'], function (exports, _emberData, _pilotsConfigEnvironment) {
  var MissionReschedule;

  MissionReschedule = _emberData['default'].Model.extend({
    mission: _emberData['default'].belongsTo('mission'),
    reschedule_reason: _emberData['default'].belongsTo('reschedule-reason'),
    notes: _emberData['default'].attr('string'),
    scheduled_at_start: _emberData['default'].attr('string'),
    scheduled_at_end: _emberData['default'].attr('string'),
    rescheduler: _emberData['default'].belongsTo('rescheduler', {
      polymorphic: true,
      inverse: 'mission_reschedules'
    })
  });

  exports['default'] = MissionReschedule;
});
define('pilots/models/mission', ['exports', 'ember-data'], function (exports, _emberData) {
  var Mission;

  Mission = _emberData['default'].Model.extend({
    created_on: _emberData['default'].attr('string'),
    status: _emberData['default'].attr('string'),
    instructions: _emberData['default'].attr('string'),
    scheduled_at_start: _emberData['default'].attr('string'),
    scheduled_at_end: _emberData['default'].attr('string'),
    scheduled_at: _emberData['default'].attr('string'),
    admin_scheduled: _emberData['default'].attr('boolean'),
    shot_list: _emberData['default'].attr(''),
    pilot_comment: _emberData['default'].attr('string'),
    estimated_pilot_payout: _emberData['default'].attr('number'),
    assigned: _emberData['default'].attr('boolean'),
    completed: _emberData['default'].attr('boolean'),
    status_timestamps: _emberData['default'].attr(''),
    pilot_payouts: _emberData['default'].attr(''),
    location: _emberData['default'].belongsTo('location', {
      async: false
    }),
    point_of_interest: _emberData['default'].belongsTo('point_of_interest', {
      async: false
    }),
    images: _emberData['default'].hasMany('image', {
      async: true
    }),
    videos: _emberData['default'].hasMany('videos', {
      async: true
    }),
    panoramas: _emberData['default'].hasMany('panoramas', {
      async: true
    }),
    shots: _emberData['default'].hasMany('shot', {
      async: true
    }),
    mission_type: _emberData['default'].attr('string'),
    rejectionReason: _emberData['default'].attr('string'),
    category: _emberData['default'].belongsTo('category', {
      async: false
    }),
    laanc_flights: _emberData['default'].hasMany('laanc_flight', {
      async: false
    }),
    laanc_exemptions: _emberData['default'].hasMany('laanc_exemption', {
      async: false
    }),
    onsite_contact: _emberData['default'].belongsTo('onsite_contact', {
      async: false
    }),
    mission_reschedules: _emberData['default'].hasMany('mission-reschedule', {
      async: false
    }),
    is_on_hold: _emberData['default'].attr('boolean'),
    flight_app: _emberData['default'].belongsTo('flight_app', {
      async: false
    }),
    pilotShots: Ember.computed('shots.[]', function () {
      var shots;
      shots = [];
      this.get('shots').forEach(function (shot) {
        if (shot.get('shot_type.name') !== 'Final Assets') {
          return shots.push(shot);
        }
      });
      return shots;
    }),
    selected_on_dashboard: _emberData['default'].attr('boolean'),
    map_marker: _emberData['default'].attr(''),
    allAssets: Ember.computed.union('images', 'videos'),
    unassignedImages: Ember.computed('images.@each.shot.id', function () {
      return this.get('images').reduce(function (acc, image) {
        if (image.get('shot.id')) {
          return acc;
        } else {
          acc.push(image);
          return acc;
        }
      }, []);
    }),
    unassignedVideos: Ember.computed('videos.@each.shot.id', function () {
      return this.get('videos').reduce(function (acc, video) {
        if (video.get('shot.id')) {
          return acc;
        } else {
          acc.push(video);
          return acc;
        }
      }, []);
    }),
    estimated_pilot_payout_in_dollars: Ember.computed('estimated_pilot_payout', function () {
      if (this.get('mission_type') === 'training') {
        return new Ember.Handlebars.SafeString("<span class='dollarsign'>$</span>0");
      }
      if (!this.get('estimated_pilot_payout')) {
        return "Varies";
      }
      return new Ember.Handlebars.SafeString("<span class='dollarsign'>$</span>" + this.get('estimated_pilot_payout') / 100);
    }),
    showOnHold: Ember.computed('is_on_hold', function () {
      var status;
      status = this.get('status');
      return this.get('is_on_hold') && (status === 'pilots_notified' || status === 'pilot_accepted' || status === 'assets_uploaded' || status === 'assets_classified');
    }),
    mainImage: Ember.computed('images.[]', function () {
      if (this.get('images').get('length')) {
        return this.get('images').get('firstObject.url');
      }
    }),
    hasUnassignedMissingGpsInfo: Ember.computed('unassignedMissingGpsCount', function () {
      return this.get('unassignedMissingGpsCount') > 0;
    }),
    unassignedMissingGpsCount: Ember.computed('unassignedImagesMissingGpsInfo', function () {
      return this.get('unassignedImagesMissingGpsInfo').length;
    }),
    unassignedImagesMissingGpsInfo: Ember.computed.filterBy('unassignedImages.[]', 'isMissingGpsInfo', true),
    unassignedAssetsCount: Ember.computed('unassignedVideos.[]', 'unassignedImages.[]', function () {
      return this.get('unassignedVideos.length') + this.get('unassignedImages.length');
    }),
    hasMissingGpsInfo: Ember.computed('imagesMissingGpsInfoCount', function () {
      return this.get('imagesMissingGpsInfoCount') > 0;
    }),
    imagesMissingGpsInfoCount: Ember.computed('imagesMissingGpsInfo', function () {
      return this.get('imagesMissingGpsInfo').length;
    }),
    imagesMissingGpsInfo: Ember.computed.filterBy('images.[]', 'isMissingGpsInfo', true),
    assetsCount: Ember.computed('allAssets.[]', function () {
      return this.get('allAssets.length');
    }),
    pilotAssigned: Ember.computed('status', function () {
      return this.get('status') === 'pilot_assigned';
    }),
    missionComplete: Ember.computed('status', 'flight_app', function () {
      var status;
      status = this.get('status');
      if (this.get('flight_app') && this.get('flight_app.value') && this.get('flight_app.value.upload_started_at')) {
        return true;
      }
      return status !== 'pilot_assigned' && status !== 'flight_complete' && status !== 'assets_uploaded' && status !== 'pilot_accepted';
    }),
    hasAssets: Ember.computed('images', 'videos', function () {
      return this.get('images.length') > 0 || this.get('videos.length') > 0;
    }),
    payoutTotal: Ember.computed('pilot_payouts', function () {
      return this.get('pilot_payouts').mapBy('amount').reduce(function (sum, value) {
        return sum + Number(value);
      }, 0);
    }),
    address: Ember.computed('location', function () {
      return this.get('location.address') + ", " + this.get('location.city') + ", " + this.get('location.state') + ", " + this.get('location.country');
    }),
    shortAddress: Ember.computed('location', function () {
      return this.get('location.city') + ", " + this.get('location.state') + ", " + this.get('location.country');
    }),
    paymentDate: Ember.computed('pilot_payouts', function () {
      if (!this.get('pilot_payouts').get('length')) {
        return '';
      }
      return this.get('pilot_payouts')[0]['updated_at'];
    }),
    paymentProcessor: Ember.computed('pilot_payouts', function () {
      if (!this.get('pilot_payouts').get('length')) {
        return '';
      }
      return this.get('pilot_payouts')[0]['payment_processor'];
    }),
    formattedMissionType: Ember.computed('mission_type', function () {
      switch (this.get('mission_type')) {
        case 'creative':
          return 'Creative Mission';
        case 'panorama':
          return 'Panorama Mission';
        case 'client':
          return 'Client Mission';
        case 'training':
          return 'Training Mission';
        default:
          return 'Other';
      }
    }),
    uploadedDate: Ember.computed('status_timestamps', function () {
      var date;
      date = this.get('status_timestamps.assets_uploaded');
      if (!date) {
        return date = this.get('status_timestamps.assets_classified');
      }
    }),
    missionStatusType: Ember.computed('status', 'completed', 'point_of_interest', function () {
      if (this.get('mission_type') === 'creative') {
        return 'creative_mission';
      }
      if (this.get('point_of_interest')) {
        if (this.get('completed')) {
          if (this.get('point_of_interest.property_type') === 'commercial') {
            return 'pano_commercial_completed';
          } else {
            return 'pano_residential_completed';
          }
        } else {
          if (this.get('point_of_interest.property_type') === 'commercial') {
            return 'pano_commercial_active';
          } else {
            return 'pano_residential_active';
          }
        }
      } else if (this.get('status') === 'pilots_notified') {
        return 'client_mission_available';
      } else {
        return 'client_mission';
      }
    }),
    icon: Ember.computed('missionStatusType', function () {
      switch (this.get('missionStatusType')) {
        case 'pano_commercial_completed':
          return 'icon-DroneBase_Icons_Commercial_complete_pin pano-icon-color';
        case 'pano_residential_completed':
          return 'icon-DroneBase_Icons_Residential_complete_pin pano-icon-color';
        case 'pano_commercial_active':
          return 'icon-DroneBase_Icons_Commercial_Star-Pin pano-icon-color';
        case 'pano_residential_active':
          return 'icon-DroneBase_Icons_Residential_Star_pin pano-icon-color';
        case 'client_mission_available':
          return 'icon-ClientPin client-mission-icon-color';
        case 'client_mission':
          return 'icon-ClientPin client-mission-icon-color';
        case 'creative_mission':
          return 'icon-Drone_b creative-mission-icon-color';
      }
    })
  });

  exports['default'] = Mission;
});
define('pilots/models/notification', ['exports', 'ember-data'], function (exports, _emberData) {
  var Notification;

  Notification = _emberData['default'].Model.extend({
    app_route_url: _emberData['default'].attr('string'),
    body: _emberData['default'].attr('string'),
    created_at: _emberData['default'].attr('string'),
    icon_urls: _emberData['default'].attr(''),
    meta: _emberData['default'].attr('string'),
    notification_type: _emberData['default'].attr('string'),
    read_status: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    web_route_url: _emberData['default'].attr('string'),
    fontIcon: Ember.computed('notification_type', function () {
      switch (this.get('notification_type')) {
        case 'blog/new':
          return 'blog_notification.svg';
        case 'app/updated':
          return 'app_update_notification.svg';
        case 'pilot/mission/updated':
          return 'available_mission_notification.svg';
        case 'pilot/payout/new':
          return 'payout_notification.svg';
        case 'pilot/mission/pano_reject':
          return '';
        case 'pilot/mission/pano_accept':
          return '';
        case 'pilot/mission/getty_accept':
          return 'available_mission_notification.svg';
        case 'pilot/mission/getty_reject':
          return 'available_mission_notification.svg';
        case 'pilot/mission/new':
          return 'available_mission_notification.svg';
      }
    })
  });

  exports['default'] = Notification;
});
define('pilots/models/obj-hash', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({
    content: {},
    contentLength: 0,

    add: function add(obj) {
      var id = this.generateId();
      this.get('content')[id] = obj;
      this.incrementProperty("contentLength");
      return id;
    },

    getObj: function getObj(key) {
      var res = this.get('content')[key];
      if (!res) {
        throw "no obj for key " + key;
      }
      return res;
    },

    generateId: function generateId() {
      var num = Math.random() * 1000000000000.0;
      num = parseInt(num);
      num = "" + num;
      return num;
    },

    keys: function keys() {
      var res = [];
      for (var key in this.get('content')) {
        res.push(key);
      }
      return _ember['default'].A(res);
    },

    lengthBinding: "contentLength"
  });
});
define('pilots/models/onsite-contact', ['exports', 'ember-data'], function (exports, _emberData) {
  var OnsiteContact;

  OnsiteContact = _emberData['default'].Model.extend({
    call_action: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    note: _emberData['default'].attr('string'),
    phone: _emberData['default'].attr('string'),
    mission: _emberData['default'].belongsTo('mission', {
      async: false
    })
  });

  exports['default'] = OnsiteContact;
});
define('pilots/models/optional-drone-camera', ['exports', 'ember-data'], function (exports, _emberData) {
  var OptionalDroneCamera;

  OptionalDroneCamera = _emberData['default'].Model.extend({
    camera: _emberData['default'].belongsTo('drone-camera')
  });

  exports['default'] = OptionalDroneCamera;
});
define('pilots/models/panorama', ['exports', 'ember-data'], function (exports, _emberData) {
  var Panorama;

  Panorama = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    processing: _emberData['default'].attr('boolean'),
    processing_status: _emberData['default'].attr('string'),
    source_type: _emberData['default'].attr('string'),
    thumbnail_url: _emberData['default'].attr('string'),
    viewer_url: _emberData['default'].attr('string'),
    mission: _emberData['default'].belongsTo('mission'),
    shot: _emberData['default'].belongsTo('shot')
  });

  exports['default'] = Panorama;
});
define('pilots/models/pilot-device', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotDevice;

  PilotDevice = _emberData['default'].Model.extend({
    pilot: _emberData['default'].belongsTo('pilot'),
    device: _emberData['default'].belongsTo('device')
  });

  exports['default'] = PilotDevice;
});
define('pilots/models/pilot-drone-camera', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotDroneCamera;

  PilotDroneCamera = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    pilotDrone: _emberData['default'].belongsTo('pilot-drone', {
      async: false
    })
  });

  exports['default'] = PilotDroneCamera;
});
define('pilots/models/pilot-drone', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotDrone;

  PilotDrone = _emberData['default'].Model.extend({
    pilot: _emberData['default'].belongsTo('pilot'),
    drone: _emberData['default'].belongsTo('drone'),
    cameras: _emberData['default'].hasMany('drone-camera')
  });

  exports['default'] = PilotDrone;
});
define('pilots/models/pilot-equipment', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotEquipment;

  PilotEquipment = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string')
  });

  exports['default'] = PilotEquipment;
});
define('pilots/models/pilot-license', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotLicense;

  PilotLicense = _emberData['default'].Model.extend({
    license_number: _emberData['default'].attr('string'),
    pilot: _emberData['default'].belongsTo('pilot'),
    license: _emberData['default'].belongsTo('license')
  });

  exports['default'] = PilotLicense;
});
define('pilots/models/pilot-opt-in', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotOptIn;

  PilotOptIn = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string')
  });

  exports['default'] = PilotOptIn;
});
define('pilots/models/pilot-pilot-equipment', ['exports', 'ember-data'], function (exports, _emberData) {
  var PilotPilotEquipment;

  PilotPilotEquipment = _emberData['default'].Model.extend({
    pilot_equipment: _emberData['default'].belongsTo('pilot-equipment')
  });

  exports['default'] = PilotPilotEquipment;
});
define('pilots/models/pilot', ['exports', 'ember-data', 'pilots/models/rescheduler'], function (exports, _emberData, _pilotsModelsRescheduler) {
  var Pilot;

  Pilot = _pilotsModelsRescheduler['default'].extend({
    first_name: _emberData['default'].attr('string'),
    last_name: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    password: _emberData['default'].attr('string'),
    address: _emberData['default'].attr('string'),
    address2: _emberData['default'].attr('string'),
    city: _emberData['default'].attr('string'),
    state: _emberData['default'].attr('string'),
    postal_code: _emberData['default'].attr('string'),
    country: _emberData['default'].attr('string'),
    birthday: _emberData['default'].attr('string'),
    phone: _emberData['default'].attr('string'),
    longitude: _emberData['default'].attr('string'),
    latitude: _emberData['default'].attr('string'),
    travel_https://annvelents.github.io/dronebase_styleguide_t/distance: _emberData['default'].attr('number'),
    drone_system: _emberData['default'].attr('string'),
    status: _emberData['default'].attr('string'),
    payout_total: _emberData['default'].attr('number'),
    total_client_missions: _emberData['default'].attr('number'),
    total_training_missions: _emberData['default'].attr('number'),
    total_panorama_missions: _emberData['default'].attr('number'),
    total_ar_blocks: _emberData['default'].attr('number'),
    payment_processor_id: _emberData['default'].attr('string'),
    payment_processor: _emberData['default'].attr('string'),
    first_flight_on: _emberData['default'].attr('date'),
    timezone_id: _emberData['default'].attr('string'),
    mission_breakdown: _emberData['default'].attr(''),
    is_available_weekdays: _emberData['default'].attr('boolean'),
    is_available_weekends: _emberData['default'].attr('boolean'),
    missing_profile_data: _emberData['default'].attr(''),
    image: _emberData['default'].attr('string'),
    pilot_licenses: _emberData['default'].hasMany('license', {
      async: false
    }),
    drones: _emberData['default'].hasMany('pilot_drone', {
      async: false
    }),
    opt_ins: _emberData['default'].hasMany('pilot_opt_in', {
      async: false
    }),
    terms_and_conditions: false,
    full_name: Ember.computed('first_name', 'last_name', function () {
      return this.get('first_name') + " " + this.get('last_name');
    }),
    created: Ember.computed('status', function () {
      return this.get('status') === 'created';
    }),
    approved: Ember.computed('status', function () {
      return this.get('status') === 'approved';
    }),
    rejected: Ember.computed('status', function () {
      return this.get('status') === 'rejected';
    }),
    evaluation_complete: Ember.computed('status', function () {
      return this.get('status') === 'evaluation_completed';
    }),
    displayedLicense: Ember.computed('pilot_licenses.[]', function () {
      if (this.get('pilot_licenses') && this.get('pilot_licenses').objectAt(0)) {
        return this.get('pilot_licenses').objectAt(0).get('license_number');
      }
    })
  });

  exports['default'] = Pilot;
});
define('pilots/models/point-of-interest', ['exports', 'ember-data'], function (exports, _emberData) {
  var PointOfInterest;

  PointOfInterest = _emberData['default'].Model.extend({
    likelihood_of_payout: _emberData['default'].attr('number'),
    property_type: _emberData['default'].attr('string'),
    location: _emberData['default'].belongsTo('location', {
      async: false
    })
  });

  exports['default'] = PointOfInterest;
});
define('pilots/models/reschedule-reason', ['exports', 'ember-data'], function (exports, _emberData) {
  var ReschedulenReason;

  ReschedulenReason = _emberData['default'].Model.extend({
    short: _emberData['default'].attr('string'),
    is_pilot_selectable: _emberData['default'].attr('boolean'),
    blurb: _emberData['default'].attr('string')
  });

  exports['default'] = ReschedulenReason;
});
define('pilots/models/rescheduler', ['exports', 'ember-data'], function (exports, _emberData) {
  var Rescheduler;

  Rescheduler = _emberData['default'].Model.extend({
    mission_reschedules: _emberData['default'].hasMany('mission-reschedule', {
      async: false
    })
  });

  exports['default'] = Rescheduler;
});
define('pilots/models/shot-type', ['exports', 'ember-data'], function (exports, _emberData) {
  var ShotType;

  ShotType = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    video: _emberData['default'].attr('string'),
    shots: _emberData['default'].hasMany('shot', {
      async: false
    }),
    slug: _emberData['default'].attr('string')
  });

  exports['default'] = ShotType;
});
define('pilots/models/shot', ['exports', 'ember-data'], function (exports, _emberData) {
  var Shot;

  Shot = _emberData['default'].Model.extend({
    instructions: _emberData['default'].attr('string'),
    pilot_comment: _emberData['default'].attr('string'),
    mission: _emberData['default'].belongsTo('mission', {
      async: false
    }),
    shot_type: _emberData['default'].belongsTo('shot_type', {
      async: false
    }),
    images: _emberData['default'].hasMany('images', {
      async: false
    }),
    videos: _emberData['default'].hasMany('videos', {
      async: false
    }),
    assetsCount: Ember.computed('images.[]', 'videos.[]', function () {
      return this.get('images.length') + this.get('videos.length');
    }),
    readyToSubmit: Ember.computed('assetsCount', 'pilot_comment', function () {
      return !!this.get('assetsCount') || !!this.get('pilot_comment');
    }),
    isDeletable: false,
    hasMissingGpsInfo: Ember.computed('missingGpsCount', function () {
      return this.get('missingGpsCount') > 0;
    }),
    missingGpsCount: Ember.computed('imagesMissingGpsInfo', function () {
      return this.get('imagesMissingGpsInfo').length;
    }),
    imagesMissingGpsInfo: Ember.computed.filterBy('images', 'isMissingGpsInfo', true)
  });

  exports['default'] = Shot;
});
define('pilots/models/stock-drone-camera', ['exports', 'ember-data'], function (exports, _emberData) {
  var StockDroneCamera;

  StockDroneCamera = _emberData['default'].Model.extend({
    camera: _emberData['default'].belongsTo('drone-camera')
  });

  exports['default'] = StockDroneCamera;
});
define('pilots/models/video', ['exports', 'ember-data'], function (exports, _emberData) {
  var Video;

  Video = _emberData['default'].Model.extend({
    url: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    version_urls: _emberData['default'].attr(),
    processing: _emberData['default'].attr('boolean'),
    source_type: _emberData['default'].attr('string'),
    mission: _emberData['default'].belongsTo('mission'),
    shot: _emberData['default'].belongsTo('shot'),
    generatingNativeThumbnail: false,
    uploaded: false,
    file: null,
    uploadNumber: null,
    downloadUrl: Ember.computed('version_urls.{}', function () {
      return this.get('version_urls.download');
    }),
    final: Ember.computed('source_type', function () {
      return this.get('source_type') === 'edit';
    }),
    isSelected: false,
    hasProperId: Ember.computed('name', 'id', function () {
      return this.get('id').substr(0, 2) === 'DB';
    }),
    saveAsUpdate: function saveAsUpdate() {
      this.send('willCommit');
      this.send('didCommit');
      return this.save();
    }
  });

  exports['default'] = Video;
});
define('pilots/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('pilots/router', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var Router;

  Router = _ember['default'].Router.extend({
    location: _pilotsConfigEnvironment['default'].locationType,
    metrics: _ember['default'].inject.service(),
    notifications: _ember['default'].inject.service(),
    onAllTransitions: (function () {
      return _ember['default'].run.scheduleOnce('afterRender', this, (function (_this) {
        return function () {
          var page, title;
          page = _this.get('url');
          title = page;
          _this.get('metrics').trackPage({
            page: page,
            title: title
          });
          return _this.get('notifications').findAllNotifications();
        };
      })(this));
    }).on('didTransition')
  });

  Router.map(function () {
    this.route('dashboard', {
      path: '/active-missions'
    });
    this.route('pilotlog', {
      path: '/pilotlog'
    });
    this.route('pilotlog', {
      path: '/completed-missions'
    });
    this.route('clientmission', {
      path: '/clientmission/:mission_id'
    });
    this.route('availablemission', {
      path: '/availablemission/:mission_id'
    });
    this.route('panomission', {
      path: '/panomission/:mission_id'
    });
    this.route('profile', {
      path: '/pilotaccount'
    });
    this.route('profile', {
      path: '/profile'
    });
    this.route('pilot.new', {
      path: '/register'
    });
    this.route('pilot.edit', {
      path: '/account'
    });
    this.route('pilot.onboarding', {
      path: 'welcome'
    });
    this.route('reset-password', {
      path: '/reset-password/:token'
    });
    this.route('request-password-reset', {
      path: '/request-password-reset'
    });
    this.route('login');
    this.route('publicsearch');
    this.route('terms_and_conditions', {
      path: 'terms'
    });
    this.route('clientmissionintro', {
      path: '/client-missions'
    });
    this.route('fourOhFour', {
      path: '/*path'
    });
    return this.route('airmapcallback', {
      path: '/airmapcallback/:mission_id'
    });
  });

  exports['default'] = Router;
});
define('pilots/routes/airmapcallback', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin', 'pilots/mixins/s3-asset-uploads'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _pilotsMixinsS3AssetUploads) {
  var AirmapCallbackRoute;

  AirmapCallbackRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], _pilotsMixinsS3AssetUploads['default'], {
    tagName: '',
    sessionAccount: _ember['default'].inject.service(),
    model: function model(params) {
      var auths, data, headers, missionId;
      missionId = params.mission_id;
      auths = JSON.parse(decodeURIComponent(params.authorizations))[0];
      data = {
        id: decodeURIComponent(params.flight_id),
        authorizations: [{
          message: auths.message,
          authority_name: auths.authority.name,
          authority_id: auths.authority.id,
          status: auths.status
        }]
      };
      headers = this.get('sessionAccount.headers');
      headers['Content-Type'] = 'application/json';
      return _ember['default'].$.ajax({
        url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + params.mission_id + "/laanc_flights",
        type: 'POST',
        dataType: 'json',
        headers: headers,
        data: JSON.stringify(data)
      }).then((function (_this) {
        return function (response) {
          return _this.replaceWith('clientmission', missionId);
        };
      })(this));
    }
  });

  exports['default'] = AirmapCallbackRoute;
});
define('pilots/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
define('pilots/routes/availablemission', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var AvailableMissionRoute;

  AvailableMissionRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    tagName: '',
    sessionAccount: _ember['default'].inject.service(),
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        mission: this.store.find('mission', params.mission_id).then((function (_this) {
          return function (response) {
            if (response.get('status') !== 'pilots_notified') {
              _this.replaceWith('clientmission', response.id);
            }
            return response;
          };
        })(this), (function (_this) {
          return function (error) {
            console.log('error loading AvailableMissionRoute: ', error);
            return _this.replaceWith('fourOhFour', {});
          };
        })(this))
      });
    },
    actions: {
      acceptMission: function acceptMission(mission) {
        var data;
        if (!mission.get('admin_scheduled')) {
          data = {
            scheduled_at_start: mission.get('scheduled_at_start'),
            scheduled_at_end: mission.get('scheduled_at_end')
          };
        }
        return _ember['default'].$.ajax({
          url: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/missions/" + mission.id + "/invitation",
          type: 'PATCH',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: data
        }).then((function (_this) {
          return function (response) {
            return _this.replaceWith('clientmission', mission.id);
          };
        })(this), function (response) {
          return console.log('fail: ', response);
        });
      },
      declineMission: function declineMission(mission, _this) {
        mission.deleteRecord();
        return mission.save().then((function (_this) {
          return function () {
            return _this.replaceWith('dashboard');
          };
        })(this));
      }
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    }
  });

  exports['default'] = AvailableMissionRoute;
});
define('pilots/routes/clientmission', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin', 'pilots/mixins/s3-asset-uploads'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _pilotsMixinsS3AssetUploads) {
  var ClientMissionRoute;

  ClientMissionRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], _pilotsMixinsS3AssetUploads['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        mission: this.store.find('mission', params.mission_id).then((function (_this) {
          return function (response) {
            return response;
          };
        })(this), (function (_this) {
          return function (error) {
            console.log("error loading ClientMissionRoute: " + error);
            return _this.replaceWith('fourOhFour', {});
          };
        })(this)),
        mission_reschedule_reasons: this.store.query('reschedule-reason', {})
      });
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    },
    actions: {
      update: function update(mission) {
        return mission.save();
      }
    }
  });

  exports['default'] = ClientMissionRoute;
});
define('pilots/routes/clientspage', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var ClientsPageRoute;

  ClientsPageRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId')
      });
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    }
  });

  exports['default'] = ClientsPageRoute;
});
define('pilots/routes/dashboard', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var DashboardRoute;

  DashboardRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      var _this;
      _this = this;
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId'),
        missions: this.store.query('mission', {
          status: 'available,pilot_accepted,flight_complete,assets_uploaded',
          per_page: 50,
          page: params.pageNumber
        }).then(function (response) {
          var i, promise, promises, totalPages;
          totalPages = response.meta.total_pages;
          i = 2;
          promises = [];
          while (i <= totalPages) {
            promise = _this.get('store').query('mission', {
              status: 'available,pilot_accepted,flight_complete,assets_uploaded',
              per_page: 50,
              page: i
            }).then(function (data) {
              return _this.get('store').peekAll('mission');
            });
            promises.push(promise);
            i++;
          }
          return _ember['default'].RSVP.all(promises).then(function () {
            return _this.get('store').peekAll('mission');
          });
        })
      });
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    },
    actions: {
      addedPanoMission: function addedPanoMission() {
        return this.refresh();
      }
    }
  });

  exports['default'] = DashboardRoute;
});
define('pilots/routes/four-oh-four', ['exports', 'ember'], function (exports, _ember) {
  var FourOhFourRoute;

  FourOhFourRoute = _ember['default'].Route.extend({
    redirect: function redirect() {
      var url;
      url = this.router.location.formatURL('/four-oh-four');
      if (window.location.pathname !== url) {
        return this.transitionTo('/four-oh-four');
      }
    }
  });

  exports['default'] = FourOhFourRoute;
});
define('pilots/routes/gettymission', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin', 'pilots/mixins/s3-asset-uploads'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _pilotsMixinsS3AssetUploads) {
  var GettyMissionRoute;

  GettyMissionRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], _pilotsMixinsS3AssetUploads['default'], {
    model: function model(params) {
      if (params.mission_id) {
        return _ember['default'].RSVP.hash({
          categories: this.store.findAll('category'),
          mission: this.store.find('mission', params.mission_id)
        });
      } else {
        return _ember['default'].RSVP.hash({
          categories: this.store.findAll('category')
        });
      }
    }
  });

  exports['default'] = GettyMissionRoute;
});
define('pilots/routes/index', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var IndexRoute;

  IndexRoute = _ember['default'].Route.extend({
    redirect: function redirect() {
      return this.transitionTo('dashboard');
    }
  });

  exports['default'] = IndexRoute;
});
define('pilots/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var LoginRoute;

  LoginRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return this.controllerFor('application').set('hideNav', true);
    },
    actions: {
      willTransition: function willTransition(transition) {
        return this.controllerFor('application').set('hideNav', false);
      }
    },
    didInsertElement: function didInsertElement() {
      return _ember['default'].run.schedule('afterRender', this, function () {
        return this.$().attr('novalidate', true);
      });
    }
  });

  exports['default'] = LoginRoute;
});
define('pilots/routes/missions', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var MissionsRoute;

  MissionsRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        missions: this.store.findAll('mission')
      });
    },
    afterModel: function afterModel(model, transition) {
      if (!model.missions.get('length')) {
        return this.transitionTo('pilot.onboarding');
      }
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      model.missionAssignedCount = model.missions.filterBy('assigned', true).length;
      return model.missionsCompletedCount = model.missions.filterBy('completed', true).length;
    }
  });

  exports['default'] = MissionsRoute;
});
define('pilots/routes/panomission', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin', 'pilots/mixins/s3-asset-uploads'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _pilotsMixinsS3AssetUploads) {
  var PanoMissionRoute;

  PanoMissionRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], _pilotsMixinsS3AssetUploads['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        mission: this.store.find('mission', params.mission_id).then((function (_this) {
          return function (response) {
            return response;
          };
        })(this), (function (_this) {
          return function (error) {
            console.log('Error loading PanoMissionRoute: ' + error);
            return _this.replaceWith('fourOhFour', {});
          };
        })(this))
      });
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    },
    tagName: ''
  });

  exports['default'] = PanoMissionRoute;
});
define('pilots/routes/pilot/edit', ['exports', 'ember', 'pilots/data/iso_country', 'pilots/data/travel_https://annvelents.github.io/dronebase_styleguide_t/distance', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsDataIso_country, _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var PilotsEditRoute;

  PilotsEditRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId'),
        travelhttps://annvelents.github.io/dronebase_styleguide_t/distance: _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance['default'],
        countries: _pilotsDataIso_country['default']
      });
    }
  });

  exports['default'] = PilotsEditRoute;
});
define('pilots/routes/pilot/new', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin', 'pilots/data/iso_country', 'pilots/data/travel_https://annvelents.github.io/dronebase_styleguide_t/distance'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin, _pilotsDataIso_country, _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance) {
  var PilotRoute;

  PilotRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return this.controllerFor('application').set('hideNav', true);
    },
    actions: {
      willTransition: function willTransition(transition) {
        return this.controllerFor('application').set('hideNav', false);
      }
    },
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.createRecord('pilot'),
        countries: _pilotsDataIso_country['default'],
        travelhttps://annvelents.github.io/dronebase_styleguide_t/distance: _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance['default']
      });
    }
  });

  exports['default'] = PilotRoute;
});
define('pilots/routes/pilot/onboarding', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var PilotsOnboardingRoute;

  PilotsOnboardingRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    config: _ember['default'].inject.service(),
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId')
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return model.typeFormId = this.get('config.env.TYPEFORM_ID');
    }
  });

  exports['default'] = PilotsOnboardingRoute;
});
define('pilots/routes/pilotaccount', ['exports', 'ember', 'pilots/data/iso_country', 'pilots/data/travel_https://annvelents.github.io/dronebase_styleguide_t/distance', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsDataIso_country, _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var PilotAccountRoute;

  PilotAccountRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId'),
        travelhttps://annvelents.github.io/dronebase_styleguide_t/distance: _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance['default'],
        countries: _pilotsDataIso_country['default']
      });
    }
  });

  exports['default'] = PilotAccountRoute;
});
define('pilots/routes/pilotlog', ['exports', 'ember', 'pilots/config/environment', 'ember-simple-auth/mixins/authenticated-route-mixin', 'ember-cli-pagination/remote/route-mixin'], function (exports, _ember, _pilotsConfigEnvironment, _emberSimpleAuthMixinsAuthenticatedRouteMixin, _emberCliPaginationRemoteRouteMixin) {
  var PilotLogRoute;

  PilotLogRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], _emberCliPaginationRemoteRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId'),
        missions: this.findPaged('mission', {
          status: 'assets_classified,in_production,awaiting_payment,invoice_needed,invoiced,complete,rejected',
          per_page: 20
        })
      });
    },
    setupController: function setupController(controller, model) {
      return this._super(controller, model);
    }
  });

  exports['default'] = PilotLogRoute;
});
define('pilots/routes/profile', ['exports', 'ember', 'pilots/data/iso_country', 'pilots/data/travel_https://annvelents.github.io/dronebase_styleguide_t/distance', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _pilotsDataIso_country, _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
  var ProfileRoute;

  ProfileRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        pilot: this.store.findRecord('pilot', 'stubId'),
        drones: this.store.findAll('drone'),
        pilotDrones: this.store.findAll('pilot-drone'),
        licenses: this.store.findAll('license'),
        pilotLicenses: this.store.findAll('pilot-license'),
        travelhttps://annvelents.github.io/dronebase_styleguide_t/distance: _pilotsDataTravel_https://annvelents.github.io/dronebase_styleguide_t/distance['default'],
        countries: _pilotsDataIso_country['default'],
        pilotEquipment: this.store.findAll('pilot-pilot-equipment'),
        equipment: this.store.findAll('pilot-equipment'),
        pilotDevices: this.store.findAll('pilot-device'),
        devices: this.store.findAll('device')
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return model.sortedDrones = model.drones.toArray().sortBy('full_name');
    }
  });

  exports['default'] = ProfileRoute;
});
define('pilots/routes/publicsearch', ['exports', 'ember'], function (exports, _ember) {
  var PublicSearchRoute;

  PublicSearchRoute = _ember['default'].Route.extend({
    setupController: function setupController(controller, model) {
      this._super(controller, model);
      return this.controllerFor('application').set('hideNav', true);
    }
  });

  exports['default'] = PublicSearchRoute;
});
define('pilots/routes/request-password-reset', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var RequestPasswordResetRoute;

  RequestPasswordResetRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default']);

  exports['default'] = RequestPasswordResetRoute;
});
define('pilots/routes/reset-password', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var ResetPasswordRoute;

  ResetPasswordRoute = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {
    model: function model(params) {
      return {
        token: params.token
      };
    }
  });

  exports['default'] = ResetPasswordRoute;
});
define('pilots/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  var ApplicationSerializer;

  ApplicationSerializer = _emberData['default'].JSONAPISerializer.extend({
    keyForAttribute: function keyForAttribute(attr) {
      return Ember.String.underscore(attr);
    },
    keyForRelationship: function keyForRelationship(rawKey) {
      return Ember.String.underscore(rawKey);
    }
  });

  exports['default'] = ApplicationSerializer;
});
define('pilots/serializers/license', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].JSONAPISerializer.extend({
    modelNameFromPayloadKey: function modelNameFromPayloadKey() {
      return 'license';
    }
  });
});
define('pilots/serializers/mission', ['exports', 'pilots/serializers/application'], function (exports, _pilotsSerializersApplication) {
  var MissionSerializer;

  MissionSerializer = _pilotsSerializersApplication['default'].extend({
    attrs: {
      location: {
        serialize: false,
        deserialize: 'records'
      },
      images: {
        serialize: false,
        deserialize: 'records'
      }
    }
  });

  exports['default'] = MissionSerializer;
});
define('pilots/serializers/pilot-drone-camera', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].JSONAPISerializer.extend({
    serialize: function serialize() {
      var json = this._super.apply(this, arguments);
      json.data.attributes = {
        id: json.data.relationships.camera.data.id
      };

      delete json.data.relationships;

      return json;
    },
    normalizeCreateRecordResponse: function normalizeCreateRecordResponse(store, primaryModelClass, payload) {
      var newId = Math.floor(Math.random() * 100000001);
      payload.data.id = newId;
      payload.data.type = 'pilot_drone_camera';
      payload.data.relationships.camera = payload.data.relationships.cameras.data.get('lastObject');
      return this._super.apply(this, arguments);
    }
  });
});
define('pilots/serializers/pilot', ['exports', 'pilots/serializers/application'], function (exports, _pilotsSerializersApplication) {
  var PilotSerializer;

  PilotSerializer = _pilotsSerializersApplication['default'].extend();

  exports['default'] = PilotSerializer;
});
define('pilots/services/airbrake', ['exports', 'ember-cli-airbrake/services/airbrake'], function (exports, _emberCliAirbrakeServicesAirbrake) {
  exports['default'] = _emberCliAirbrakeServicesAirbrake['default'];
});
define('pilots/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('pilots/services/asset-map', ['exports', 'ember-cli-ifa/services/asset-map'], function (exports, _emberCliIfaServicesAssetMap) {
  exports['default'] = _emberCliIfaServicesAssetMap['default'];
});
define('pilots/services/config', ['exports', 'ember'], function (exports, _ember) {
  var Config;

  Config = _ember['default'].Service.extend({
    env: _ember['default'].computed(function () {
      return _ember['default'].getOwner(this).resolveRegistration('config:environment');
    })
  });

  exports['default'] = Config;
});
define('pilots/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('pilots/services/drag-coordinator', ['exports', 'ember-drag-drop/services/drag-coordinator'], function (exports, _emberDragDropServicesDragCoordinator) {
  exports['default'] = _emberDragDropServicesDragCoordinator['default'];
});
define('pilots/services/head-data', ['exports', 'ember-cli-head/services/head-data'], function (exports, _emberCliHeadServicesHeadData) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliHeadServicesHeadData['default'];
    }
  });
});
define('pilots/services/head-tags', ['exports', 'ember-cli-meta-tags/services/head-tags'], function (exports, _emberCliMetaTagsServicesHeadTags) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMetaTagsServicesHeadTags['default'];
    }
  });
});
define('pilots/services/metrics', ['exports', 'ember-metrics/services/metrics'], function (exports, _emberMetricsServicesMetrics) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsServicesMetrics['default'];
    }
  });
});
define('pilots/services/modal-dialog', ['exports', 'ember', 'ember-modal-dialog/services/modal-dialog', 'pilots/config/environment'], function (exports, _ember, _emberModalDialogServicesModalDialog, _pilotsConfigEnvironment) {
  var computed = _ember['default'].computed;
  exports['default'] = _emberModalDialogServicesModalDialog['default'].extend({
    destinationElementId: computed(function () {
      /*
        everywhere except test, this property will be overwritten
        by the initializer that appends the modal container div
        to the DOM. because initializers don't run in unit/integration
        tests, this is a nice fallback.
      */
      if (_pilotsConfigEnvironment['default'].environment === 'test') {
        return 'ember-testing';
      }
    })
  });
});
define('pilots/services/moment', ['exports', 'ember', 'pilots/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _pilotsConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_pilotsConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define('pilots/services/notifications', ['exports', 'ember'], function (exports, _ember) {
  var NotificationsService;

  NotificationsService = _ember['default'].Service.extend({
    store: _ember['default'].inject.service(),
    sessionAccount: _ember['default'].inject.service(),
    metrics: _ember['default'].inject.service(),
    model: null,
    notificationCount: _ember['default'].computed('model.@each.read_status', function () {
      if (this.get('model')) {
        return this.get('model').filterBy('read_status', 'unread').get('length');
      }
    }),
    init: function init() {
      this._super();
      this.findAllNotifications();
      return this.checkForNewNotifications(300000);
    },
    findAllNotifications: function findAllNotifications() {
      if (!this.get('sessionAccount.account')) {
        return;
      }
      return this.get('store').findAll('notification').then((function (_this) {
        return function (response) {
          var _reponse;
          _reponse = response.sortBy('created_at').reverseObjects();
          _this.set('model', _reponse);
          return _this.set('lastFetch', Math.floor(Date.now() / 1000));
        };
      })(this), (function (_this) {
        return function (response) {
          return console.log('error loading notifiactions');
        };
      })(this));
    },
    checkForNewNotifications: function checkForNewNotifications(interval) {
      return setInterval((function (_this) {
        return function () {
          _this.findAllNotifications();
        };
      })(this), interval);
    },
    markAllAsRead: function markAllAsRead() {
      if (!this.get('model')) {
        return;
      }
      this.get('model').forEach(function (notification) {
        notification.set('read_status', 'read');
        return notification.save();
      });
      return this.get('metrics').trackEvent({
        category: 'Notifications',
        action: 'click',
        label: "Mark All As Read"
      });
    }
  });

  exports['default'] = NotificationsService;
});
define('pilots/services/pusher', ['exports', 'npm:pusher-js', 'ember-pusher/services/pusher'], function (exports, _npmPusherJs, _emberPusherServicesPusher) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPusherServicesPusher['default'];
    }
  });
});
// This is required for ember-browserify to work properly.
// https://github.com/ef4/ember-browserify#the-workaround
define('pilots/services/pusher_data', ['exports', 'ember', 'pilots/config/environment'], function (exports, _ember, _pilotsConfigEnvironment) {
  var PusherData;

  PusherData = _ember['default'].Service.extend({
    sessionAccount: _ember['default'].inject.service(),
    session: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    pusherEvents: ['image-updated', 'video-updated'],
    start: function start(pilotId) {
      var pusher, pusherKey, store;
      pusherKey = _pilotsConfigEnvironment['default'].pusher_key;
      pusher = new Pusher(pusherKey, {
        authEndpoint: _pilotsConfigEnvironment['default'].api.host + "/v1/pilots/pusher/auth",
        auth: {
          headers: this.get('sessionAccount.headers')
        }
      });
      this.set('pusher', pusher);
      store = this.get('store');
      pusher.subscribe("private-pilot-pilot-" + pilotId);
      pusher.bind('image-updated', (function (_this) {
        return function (payload) {
          return _this.assetUpdated(store, 'image', payload);
        };
      })(this));
      return pusher.bind('video-updated', (function (_this) {
        return function (payload) {
          return _this.assetUpdated(store, 'video', payload);
        };
      })(this));
    },
    assetUpdated: function assetUpdated(store, type, payload) {
      var asset;
      asset = null;
      store.peekAll(type).filter(function (a) {
        if (a.get('id') === payload.data.id) {
          return asset = a;
        }
      });
      if (asset) {
        asset.setProperties(payload.data.attributes);
        if (asset.get('generatingNativeThumbnail')) {
          asset.setProperties({
            generatingNativeThumbnail: false
          });
        }
        if (!asset.get('isNew')) {
          return asset.save();
        } else {
          return asset.saveAsUpdate();
        }
      }
    },
    actions: {
      imageUpdated: function imageUpdated() {
        return console.log(arguments);
      }
    }
  });

  exports['default'] = PusherData;
});
define('pilots/services/rollbar', ['exports', 'ember-rollbar-client/services/rollbar'], function (exports, _emberRollbarClientServicesRollbar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRollbarClientServicesRollbar['default'];
    }
  });
});
define('pilots/services/session-account', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  var SessionAccount;

  SessionAccount = _ember['default'].Service.extend({
    session: _ember['default'].inject.service(),
    store: _ember['default'].inject.service(),
    pusherData: _ember['default'].inject.service(),
    account: _ember['default'].computed('session.data.authenticated', function () {
      var promise;
      if (this.get('session.data.authenticated.token')) {
        promise = this.get('store').findRecord('pilot', 'stubId');
        promise.then((function (_this) {
          return function (response) {
            return _this.get('pusherData').start(response.id);
          };
        })(this));
        return promise;
      }
    }),
    headers: _ember['default'].computed('session.data.authenticated.token,session.data.authenticated.email', function () {
      return {
        "Authorization": "Token token=\"" + this.get('session.data.authenticated.token') + "\", email=\"" + this.get('session.data.authenticated.email') + "\""
      };
    }),
    urlParams: _ember['default'].computed('session.data.authenticated.token,session.data.authenticated.email', function () {
      var email;
      email = encodeURIComponent("" + this.get('session.data.authenticated.email'));
      return "?auth=" + this.get('session.data.authenticated.token') + "," + email + "&full_screen=1";
    })
  });

  exports['default'] = SessionAccount;
});
define('pilots/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('pilots/services/side-menu', ['exports', 'ember-side-menu/services/side-menu'], function (exports, _emberSideMenuServicesSideMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberSideMenuServicesSideMenu['default'];
    }
  });
});
define('pilots/services/upload-queue-manager', ['exports', 'ember', 'pilots/utils/uploader/queue', 'pilots/utils/flatten'], function (exports, _ember, _pilotsUtilsUploaderQueue, _pilotsUtilsFlatten) {
  var UploadQueueManagerService;

  UploadQueueManagerService = _ember['default'].Service.extend({
    airbrake: _ember['default'].inject.service(),
    init: function init() {
      return this.set('queues', _ember['default'].Map.create());
    },
    findOrCreate: function findOrCreate(name, component, config) {
      var queue;
      if (this.get('queues').has(name)) {
        queue = this.get('queues').get(name);
        if (config !== null) {
          queue.set('target', component);
          queue.configureUploader(config);
        }
      } else {
        queue = _pilotsUtilsUploaderQueue['default'].create({
          name: name,
          target: component
        });
        this.get('queues').set(name, queue);
        queue.configureUploader(config, this.get('airbrake'));
      }
      return queue;
    }
  });

  exports['default'] = UploadQueueManagerService;
});
define('pilots/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("pilots/templates/airmapcallback", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7ao5+kCi", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/airmapcallback.hbs" } });
});
define("pilots/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "sdps4tFZ", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"hideNav\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[1,[26,[\"top-navbar\"]],false],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/application.hbs" } });
});
define("pilots/templates/availablemission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RR0VO8up", "block": "{\"statements\":[[1,[33,[\"available-mission\"],null,[[\"model\",\"acceptMission\",\"declineMission\"],[[28,[\"model\"]],\"acceptMission\",\"declineMission\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/availablemission.hbs" } });
});
define("pilots/templates/clientmission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "iO0zzXSl", "block": "{\"statements\":[[1,[33,[\"client-mission\"],null,[[\"model\",\"onfileadd\",\"onstartupload\",\"updateAction\"],[[28,[\"model\"]],\"addAsset\",\"startUpload\",\"update\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/clientmission.hbs" } });
});
define("pilots/templates/clientmissionintro", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A/dBFzRm", "block": "{\"statements\":[[1,[33,[\"client-mission-intro\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/clientmissionintro.hbs" } });
});
define("pilots/templates/components/active-mission-summary-panel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "H1I6qy85", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"client-mission-panel \",[33,[\"if\"],[[28,[\"mission\",\"selected_on_dashboard\"]],\"mission-panel-selected\"],null]]]],[5,[\"action\"],[[28,[null]],\"selectMission\",[28,[\"mission\"]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"down-arrow\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[13],[0,\"Client Mission\\n    \"],[11,\"span\",[]],[15,\"class\",\"icon-Weather\"],[5,[\"action\"],[[28,[null]],\"showWeather\"]],[13],[0,\"\\n       \"],[11,\"span\",[]],[15,\"class\",\"path1\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path2\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path3\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path4\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path5\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path6\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"path7\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showWeatherDisplay\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"mission-weather-forecast\"],null,[[\"model\"],[[28,[\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"price\"],[13],[1,[33,[\"number-in-dollars\"],[[28,[\"mission\",\"estimated_pilot_payout\"]]],null],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-id\"],[13],[1,[28,[\"mission\",\"id\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"icon-Pin\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address-wrapper\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[1,[28,[\"mission\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"icon-Calendar\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"date-wrapper\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"due-date\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"            Flight Date \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            Flight Date: Best available time\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"button-panel\"],[13],[0,\"\\n      \"],[1,[33,[\"status-button\"],null,[[\"mission\"],[[28,[\"mission\"]]]]],false],[0,\"\\n      \"],[6,[\"link-to\"],[\"clientmission\",[28,[\"mission\",\"id\"]]],[[\"class\",\"bubbles\"],[\"button\",false]],{\"statements\":[[0,\"SEE DETAILS\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/active-mission-summary-panel.hbs" } });
});
define("pilots/templates/components/address-lookup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "W3K0seTF", "block": "{\"statements\":[[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"errorPropertyName\",\"changeset\",\"class\",\"placeholder\",\"autocomplete\",\"elementId\"],[\"address\",\"longitude\",[28,[\"changeset\"]],\"form-group address-field\",\"Address\",\"new-password\",\"address\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/address-lookup.hbs" } });
});
define("pilots/templates/components/available-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZWWHdbH/", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"available-mission\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header hidden-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null],\"TRAINING MISSION\",\"AVAILABLE MISSION\"],null],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Pin mission-header-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"mission-header-icon-text\"],[13],[0,\"\\n          \"],[1,[28,[\"model\",\"mission\",\"address\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"status\"],[13],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-container\"],[13],[0,\"\\n    \"],[1,[33,[\"mission-map\"],null,[[\"model\",\"mission\"],[[28,[\"model\",\"mission\",\"location\"]],[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header visible-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null],\"TRAINING MISSION\",\"AVAILABLE MISSION\"],null],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Pin mission-header-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"mission-header-icon-text\"],[13],[0,\"\\n          \"],[1,[28,[\"model\",\"mission\",\"address\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"status\"],[13],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container-fluid mission-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row instructions-content\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-md-8 no-padding-xs\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"instructions\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"details-box-row\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-box\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"details-box-label\"],[13],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"icon-Payment\"],[13],[14],[0,\"\\n                Payment\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"details-box-content\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"details-box-content-above\"],[13],[0,\"\\n                  \"],[1,[33,[\"number-in-dollars\"],[[28,[\"model\",\"mission\",\"estimated_pilot_payout\"]]],null],false],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details-box\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"details-box-label\"],[13],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"icon-Calendar\"],[13],[14],[0,\"Flight Date\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"details-box-content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"admin_scheduled\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"div\",[]],[15,\"class\",\"details-box-content-above\"],[13],[0,\"\\n                    \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"details-box-content-below\"],[13],[0,\"\\n                    \"],[1,[33,[\"mission-scheduled-at-time\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n                  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                  \"],[11,\"div\",[]],[15,\"class\",\"details-box-content-above\"],[13],[0,\"Within 1-3 days\"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"details-box-content-below\"],[13],[0,\"\\n                     (After accepting the mission)\\n                  \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"details-box-row\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel training-mission\"],[13],[0,\"\\n                \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/training_mission_icon.svg\"],[13],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"training-mission-details\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"training-mission-label\"],[13],[0,\"\\n                    This is a Training Mission.\\n                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"training-mission-text\"],[13],[0,\"\\n                    You may fly this mission at your home address or another\\n                    location that is convenient, safe, \"],[11,\"b\",[]],[13],[0,\"and legal\"],[14],[0,\". Because\\n                    this training is designed to qualify pilots for Client\\n                    Missions, the payout is listed as $0. Please schedule\\n                    the mission to accept it. After your scheduled flight,\\n                    upload assets ASAP so we can get you paid work!\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"mission\",\"flight_app\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"turquoise-border\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"turquoise-header\"],[13],[0,\"\\n                  Please Review Before You Accept This Mission\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"flight-app-instruction\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"flight-app-header-and-caret\"],[13],[0,\"\\n                    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/arrow.svg\"],[15,\"class\",\"flight-app-caret\"],[13],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"flight-app-header\"],[13],[0,\"Flight App \"],[11,\"span\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"–\"],[14],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"flight-app-instructions\"],[13],[0,\"\\n                    \"],[1,[33,[\"markdown-to-html\"],[[28,[\"model\",\"mission\",\"flight_app\",\"pilot_flight_description\",\"web\"]]],null],false],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"flight-app-instruction\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"flight-app-header-and-caret\"],[13],[0,\"\\n                    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/arrow.svg\"],[15,\"class\",\"flight-app-caret\"],[13],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"flight-app-header\"],[13],[0,\"Upload Assets \"],[11,\"span\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"–\"],[14],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"flight-app-instructions\"],[13],[0,\"\\n                    \"],[1,[33,[\"markdown-to-html\"],[[28,[\"model\",\"mission\",\"flight_app\",\"pilot_delivery_description\",\"web\"]]],null],false],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[11,\"h3\",[]],[13],[0,\"\\n            Mission Details\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"LAANCExemption\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"laanc-exception hidden-xs\"],[13],[0,\"\\n                \"],[11,\"span\",[]],[15,\"class\",\"authorization\"],[13],[0,\"LAANC Authorization \"],[14],[0,\"\\n                This is a LAANC enabled airspace. As a Part 107 pilot, you can get automatic\\n                FAA authorization to fly here. We will provide a link after you accept this mission.\\n                For more information check out our \"],[11,\"a\",[]],[15,\"class\",\"pilot-faq-link\"],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/articles/115003896191\"],[13],[0,\"Pilot FAQ Page.\"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"laanc-exception visible-xs\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"authorization\"],[13],[0,\"LAANC Authorization \"],[14],[0,\"\\n                \"],[11,\"p\",[]],[13],[0,\"\\n                  This is a LAANC enabled airspace. As a Part 107 pilot, you can get automatic\\n                  FAA authorization to fly here.\\n                \"],[14],[0,\"\\n                \"],[11,\"p\",[]],[13],[0,\"We will provide a link after you accept this mission.\"],[14],[0,\"\\n                \"],[11,\"a\",[]],[15,\"class\",\"pilot-faq-link\"],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/articles/115003896191\"],[13],[0,\"Pilot FAQ Page.\"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n            \"],[11,\"h3\",[]],[13],[0,\"Required Shot List\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"shots-panel\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"mission\",\"pilotShots\"]]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[13],[0,\"\\n                  \"],[11,\"strong\",[]],[13],[1,[28,[\"shot\",\"shot_type\",\"name\"]],false],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"shots-panel-intructions\"],[13],[0,\"\\n                    \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"shot\",\"shot_type\",\"description\"]]]]],false],[0,\"\\n                    \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"shot\",\"instructions\"]]]]],false],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[\"shot\"]},null],[0,\"            \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"instructions\"]]],null,{\"statements\":[[0,\"            \"],[11,\"h3\",[]],[13],[0,\"Instructions\"],[14],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"model\",\"mission\",\"instructions\"]]]]],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"id\",\"missionScheduleBox\"],[15,\"class\",\"col-md-4 no-padding-xs\"],[13],[0,\"\\n        \"],[1,[33,[\"schedule-mission\"],null,[[\"model\",\"acceptAction\",\"declineAction\",\"title\"],[[28,[\"model\",\"mission\"]],\"accept\",\"decline\",[28,[\"scheduleTitle\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"id\",\"mobileAcceptDenyFixedButton\"],[13],[0,\"\\n  Schedule Mission\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"acceptedModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\"],[true]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"ember-modal-dialog-close\"],[5,[\"action\"],[[28,[null]],\"closeAcceptedModal\"]],[13],[0,\"×\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-header\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"ember-modal-dialog-title\"],[13],[0,\"PREPARE FOR TAKEOFF\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-body\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Thanks for working with us! Your flight date is:\"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\" \"],[1,[33,[\"mission-scheduled-at-time\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[11,\"br\",[]],[13],[14],[0,\"\\n        Make sure you have studied the mission details before flying.\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/Accept_infographic.svg\"],[13],[14],[0,\"\\n      \"],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"confirm-button\"],[5,[\"action\"],[[28,[null]],\"confirmAccepted\",[28,[\"model\",\"mission\"]]]],[13],[0,\"CONFIRM\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"declineModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\"],[true]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"ember-modal-dialog-close\"],[5,[\"action\"],[[28,[null]],\"closeDeclinedModal\"]],[13],[0,\"×\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-header\"],[13],[0,\"\\n      \"],[11,\"h4\",[]],[15,\"class\",\"ember-modal-dialog-title\"],[13],[0,\"WOMP WOMP!\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-body\"],[13],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"OK, take a break. But don't let those propellers get dusty, Captain!\"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/Decline_infographic.svg\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"confirm-button\"],[5,[\"action\"],[[28,[null]],\"confirmDeclined\",[28,[\"model\",\"mission\"]]]],[13],[0,\"GOT IT\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/available-mission.hbs" } });
});
define("pilots/templates/components/bulk-upload", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "q2PTeUm7", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"uploading\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"bulk-uploading\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"finishingUp\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[1,[26,[\"finishingUpText\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"loader-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"loader\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"uploadProgress\"],[13],[1,[26,[\"uploadProgress\"]],false],[0,\"%\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"progress-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Uploading \"],[1,[26,[\"filesUploaded\"]],false],[0,\" of \"],[1,[26,[\"numFilesUploading\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"timeRemaining\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[11,\"strong\",[]],[13],[1,[26,[\"timeRemaining\"]],false],[14],[0,\" minutes left...\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"button\",[]],[15,\"class\",\"button cancel\"],[5,[\"action\"],[[28,[null]],\"cancel\"]],[13],[1,[26,[\"cancelBtn\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"h3\",[]],[13],[0,\"Bulk Upload\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    If you’d like to upload more than 250 assets at once, we recommend using the Bulk Upload feature.\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    Uploads work best in Google Chrome.\\n  \"],[14],[0,\"\\n  \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"setShotId\"],[[\"value\"],[\"target.value\"]]],null],[15,\"class\",\"form-control input-lg shots\"],[13],[0,\"\\n    \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"\\n      Select Shot\\n    \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"mission\",\"pilotShots\"]]],null,{\"statements\":[[0,\"    \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"item\",\"id\"]]]]],[13],[0,\"\\n      \"],[1,[28,[\"item\",\"shot_type\",\"name\"]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"filesSelected\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"selected-images\"],[13],[0,\"\\n      \"],[11,\"strong\",[]],[13],[1,[26,[\"filesSelected\"]],false],[14],[0,\" images were selected.\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"onlyOneEmptyShot\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"auto-submit\"],[13],[0,\"\\n        \"],[11,\"strong\",[]],[13],[0,\"Is this the last batch of assets to upload for this mission?\"],[14],[11,\"br\",[]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"auto-submit-checkbox\"],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"autoSubmitMission\",[28,[\"autoSubmitMission\"]]]]],false],[11,\"div\",[]],[13],[11,\"strong\",[]],[13],[0,\"Yes\"],[14],[0,\" - Automatically submit the mission when upload are completed.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"button cancel\"],[5,[\"action\"],[[28,[null]],\"cancel\"]],[13],[1,[26,[\"cancelBtn\"]],false],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"upload\"]],[13],[0,\"UPLOAD\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"filtering\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"selected-images\"],[13],[0,\"\\n        Preparing files...\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"buttons\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"button cancel\"],[5,[\"action\"],[[28,[null]],\"cancel\"]],[13],[1,[26,[\"cancelBtn\"]],false],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"filtering\"]]],null,{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"id\",\"bulk-uploader\"],[15,\"class\",\"button\"],[13],[0,\"\\n          CHOOSE FILES\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/bulk-upload.hbs" } });
});
define("pilots/templates/components/client-mission-intro", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MjK/3cyi", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"clients-page\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"header-image\"],[13],[0,\"\\n    \"],[11,\"h2\",[]],[13],[0,\"Client Missions\"],[14],[0,\"\\n    \"],[11,\"p\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"How to Become a DroneBase Pro Pilot\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs steps-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"steps-group\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/complete_profile_icon.svg\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n          1\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n          COMPLETE PROFILE\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"steps-group\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/get_license_icon.svg\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n          2\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n          GET A LICENSE\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"steps-group\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/download_app_icon.svg\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n          3\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n          DOWNLOAD PILOT APP\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"steps-group\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/get_experience_icon.svg\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n          4\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n          GET EXPERIENCE\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"visible-xs how-to-become\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[15,\"class\",\"how-to-become-header\"],[13],[0,\"How to Become a DroneBase Pro Pilot\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"steps-group-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n        1\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n        COMPLETE PROFILE\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/complete_profile_icon_mobile.svg\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"steps-group-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n        2\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n        GET A LICENSE\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/get_license_icon_mobile.svg\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"steps-group-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n        3\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n        DOWNLOAD PILOT APP\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/download_app_icon_mobile.svg\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"steps-group-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-number\"],[13],[0,\"\\n        4\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"step-text\"],[13],[0,\"\\n        GET EXPERIENCE\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/get_experience_icon_mobile.svg\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"limit-width\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"client-page-section complete-profile\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[15,\"class\",\"section-header\"],[13],[0,\"Complete Your Profile\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"centered-text\"],[13],[0,\"\\n        A fully-completed profile is necessary to get paid. Once your Pilot Profile is complete, we can match you with appropriate Missions in your area!\\n      \"],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/infographic_client_mission_money.svg\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n        The highest earning pilot has earned over \"],[11,\"span\",[]],[15,\"class\",\"emphasize\"],[13],[0,\"$60,000\"],[14],[0,\" flying Client Missions for DroneBase.\\n      \"],[14],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[15,\"href\",\"/profile\"],[13],[0,\"\\n        EDIT PROFILE\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"client-page-section license\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[15,\"class\",\"section-header\"],[13],[0,\"Do You Have Your Pilot License?\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"centered-text\"],[13],[0,\"\\n        We take airspace regulations and training seriously: all DroneBase Pilots must have a Part 107 License or 333 Exemption in order to fly and get paid for Client Missions.\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-block\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[13],[0,\"\\n            I Need a Part 107 License\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_need_license.svg\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Need help getting started? Visit our blog to find our Part 107 Guide, which will give you an overview of the FAA regulations and what you’ll need to do to secure your own license.\\n          \"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://blog.dronebase.com/2017/03/14/part-107-guide/\"],[15,\"class\",\"turquoise-button\"],[13],[0,\"LEARN MORE\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card has-license\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[13],[0,\"\\n            I Have a Part 107 License\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_have_license.svg\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Already licensed? Great! Make sure that your license number is in your Pilot Profile, which signals to us that you’re ready to fly commercial Missions.\\n          \"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"/profile\"],[15,\"class\",\"turquoise-button\"],[13],[0,\"UPDATE PROFILE\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"client-page-section download\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[15,\"class\",\"section-header\"],[13],[0,\"Download the DroneBase App\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"centered-text\"],[13],[0,\"\\n        The DroneBase app streamlines your workflow, so you can spend more time flying! Our deep integration with DJI’s SDK means you’re able to find and fly available missions seamlessly.\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"download-buttons\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://itunes.apple.com/us/app/dronebase-pilot/id1057404436?mt=8\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/apple-store.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://play.google.com/store/apps/details?id=com.dronebase.pilotapp\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/android_appstore_button.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"benefits-of-download\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"benefit\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_push_notifications2.svg\"],[15,\"class\",\"hidden-xs\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"benefit-headline\"],[13],[0,\"Push Notifications\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Never miss a Mission with push notifications. Accept available missions as soon as they become available!\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_push_notifications.svg\"],[15,\"class\",\"visible-xs\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"benefit\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_access_information2.svg\"],[15,\"class\",\"hidden-xs\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"benefit-headline\"],[13],[0,\"Access Mission Information\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Get on-the-go access to your Mission instructions, directions, shot list, schedule, and more.\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_access_information.svg\"],[15,\"class\",\"visible-xs\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"benefit\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_mission_specific_shot_list2.svg\"],[15,\"class\",\"hidden-xs\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"benefit-headline\"],[13],[0,\"Mission-Specific Shot List\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            The shot list is integrated directly into the fly screen. Plus, your shots are automatically tagged for quicker uploading.\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/inforgraphic_mission_specific_shot_list.svg\"],[15,\"class\",\"last visible-xs\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"client-page-apps\"],[13],[0,\"\\n      Dronebase Pilot Apps:\\n      \"],[11,\"div\",[]],[15,\"class\",\"download-buttons\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://itunes.apple.com/us/app/dronebase-pilot/id1057404436?mt=8\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/apple-store.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://play.google.com/store/apps/details?id=com.dronebase.pilotapp\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/android_appstore_button.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"base-cards\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/visit_our_blog_image.png\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n            Visit Our Blog\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Stay up to date with drone news, events, company events & more. Get tips and insights from pilots & industry leaders.\\n          \"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://blog.dronebase.com/\"],[15,\"class\",\"darkblue-button\"],[13],[0,\"VIEW NOW\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/clients/droneBase_support_image.png\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n            DroneBase Support\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"subtext\"],[13],[0,\"\\n            Have a question? Visit our Pilot FAQ page to find your answer.\\n          \"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/categories/115000254371-FAQ\"],[15,\"class\",\"darkblue-button\"],[13],[0,\"LEARN MORE\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/client-mission-intro.hbs" } });
});
define("pilots/templates/components/client-mission-uploader", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "j3iXyqXS", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"client-uploader-top-row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"shot-instructions\"],[13],[0,\"\\n    Shot List\\n    \"],[11,\"span\",[]],[15,\"class\",\"small-text\"],[13],[0,\"Drag and drop is enabled\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"left-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"selectedCount\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"button delete-assets-button\"],[5,[\"action\"],[[28,[null]],\"deleteAssets\"]],[13],[0,\"\\n        DELETE\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[13],[1,[26,[\"selectedCount\"]],false],[0,\" Asset(s)\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"uploadProgress\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"progress-container\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"uploading-stats\"],[13],[0,\"\\n          Uploading \"],[11,\"span\",[]],[15,\"class\",\"uploading-numbers\"],[13],[1,[26,[\"filesUploaded\"]],false],[0,\" of \"],[1,[26,[\"numFilesUploading\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"progress-bg\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"progress-bg-bar\"],[16,\"style\",[34,[\"width: calc(\",[26,[\"uploadProgress\"]],\"%);\"]]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"right-container\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[15,\"class\",\"bulk-upload-link\"],[5,[\"action\"],[[28,[null]],\"toggleBulkUploaderModal\"],[[\"on\"],[\"click\"]]],[13],[0,\"\\n      Bulk upload?\\n    \"],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"id\",\"uploader\"],[15,\"class\",\"button\"],[13],[0,\"\\n      UPLOAD\\n    \"],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"class\",\"next-button button\"],[5,[\"action\"],[[28,[null]],\"doneClassifying\"]],[13],[0,\"\\n      DONE\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"client-mission-uploader container-fluid\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"shot-list hide-notready\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"unassignedAssets\"],[15,\"class\",\"shot selected\"],[5,[\"action\"],[[28,[null]],\"clickShot\",\"unassignedAssets\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"currentShot\"]],\"unassignedAssets\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_selected.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_icon.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"shot-name\"],[13],[0,\"Unassigned assets\"],[14],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"asset-count\"],[13],[1,[28,[\"mission\",\"unassignedAssetsCount\"]],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"background\"],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"unassignedAssetsCount\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"notready-checkmark icon-DB_icon_exclamation_solid\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"allAssets\"],[15,\"class\",\"shot\"],[5,[\"action\"],[[28,[null]],\"clickShot\",\"allAssets\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"currentShot\"]],\"allAssets\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_selected.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_icon.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"shot-name\"],[13],[0,\"All assets\"],[14],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"asset-count\"],[13],[1,[28,[\"mission\",\"assetsCount\"]],false],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"background\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"mission\",\"pilotShots\"]]],null,{\"statements\":[[6,[\"shot-drop-target\"],null,[[\"shot\",\"action\"],[[28,[\"shot\"]],\"assignAsset\"]],{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"id\",[34,[\"shot-\",[28,[\"shot\",\"id\"]]]]],[15,\"class\",\"shot\"],[5,[\"action\"],[[28,[null]],\"clickShot\",[28,[\"shot\"]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"currentShot\"]],[28,[\"shot\"]]],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_selected.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"div\",[]],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/folder_icon.svg\"],[15,\"class\",\"folder-icon\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"shot-name\"],[13],[1,[28,[\"shot\",\"shot_type\",\"name\"]],false],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"asset-count\"],[13],[1,[28,[\"shot\",\"assetsCount\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"shot\",\"isDeletable\"]]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"icon-Xmark delete-shot\"],[5,[\"action\"],[[28,[null]],\"deleteShot\",[28,[\"shot\"]]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"background\"],[13],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"shot\",\"readyToSubmit\"]]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"notready-checkmark icon-DB_icon_exclamation_solid\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"shot\"]},null],[0,\"\\n    \"],[11,\"select\",[]],[15,\"class\",\"add-shot\"],[13],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"-1\"],[13],[0,\"Add Shot\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"shotTypes\"]]],null,{\"statements\":[[0,\"        \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"shotType\",\"id\"]]]]],[13],[1,[28,[\"shotType\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"shotType\"]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"note\"],[13],[0,\"\\n      If errors occur, please send a screenshot to pilots@dronebase.com.\"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"assets \",[33,[\"if\"],[[28,[\"listView\"]],\"list-view-assets\"],null]]]],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"asset-list upload-target\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"uploader-header\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"uploader-header-text\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"current-shot-type\"],[13],[0,\"\\n            \"],[1,[33,[\"if\"],[[28,[\"currentShot\",\"shot_type\",\"name\"]],[28,[\"currentShot\",\"shot_type\",\"name\"]],[33,[\"if\"],[[28,[\"unassignedAssets\"]],\"Unassigned Assets\",\"All Shots\"],null]],null],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"p\",[]],[13],[0,\"Choose the list view for faster upload. Uploads work best in Google Chrome.\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"currentShot\",\"shot_type\",\"name\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"currentShot\",\"hasMissingGpsInfo\"]]],null,{\"statements\":[[0,\"              \"],[11,\"p\",[]],[15,\"class\",\"missing-gps-info\"],[13],[11,\"a\",[]],[15,\"href\",\"#\"],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[0,\" Asset(s) missing GPS Metadata. (\"],[1,[28,[\"currentShot\",\"missingGpsCount\"]],false],[0,\")\"],[14],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"unassignedAssets\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"mission\",\"hasUnassignedMissingGpsInfo\"]]],null,{\"statements\":[[0,\"                \"],[11,\"p\",[]],[15,\"class\",\"missing-gps-info\"],[13],[11,\"a\",[]],[15,\"href\",\"#\"],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[0,\" Asset(s) missing GPS Metadata. (\"],[1,[28,[\"mission\",\"unassignedMissingGpsCount\"]],false],[0,\")\"],[14],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"mission\",\"hasMissingGpsInfo\"]]],null,{\"statements\":[[0,\"                \"],[11,\"p\",[]],[15,\"class\",\"missing-gps-info\"],[13],[11,\"a\",[]],[15,\"href\",\"#\"],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[0,\" Asset(s) missing GPS Metadata. (\"],[1,[28,[\"mission\",\"imagesMissingGpsInfoCount\"]],false],[0,\")\"],[14],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"list-view-switcher\"],[5,[\"action\"],[[28,[null]],\"toggleListView\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"listView\"]]],null,{\"statements\":[[0,\"            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/list_view_icon.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/thumbnail_view_icon.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"upload-instructions \",[33,[\"unless\"],[[28,[\"showInstructions\"]],\"hidden\"],null]]]],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"class\",\"upload-icon\"],[15,\"src\",\"/assets/images/v2/DragAndDrop_files.svg\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"large-text\"],[13],[0,\"Drop files here\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\"or use the \\\"Upload\\\" button above\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"unless\"],[[28,[\"showInstructions\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"listView\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"list-view-header\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"header-filename\"],[13],[0,\"Name\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"header-upload-progress\"],[13],[0,\"Progress\"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n          \"],[11,\"div\",[]],[15,\"class\",\"list-view-contents uploaded-content\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"currentImages\"]]],null,{\"statements\":[[6,[\"draggable-object\"],null,[[\"content\",\"class\"],[[28,[\"image\"]],\"shot-asset\"]],{\"statements\":[[0,\"                \"],[1,[33,[\"image-asset\"],null,[[\"image\",\"deselectAll\",\"fileSize\",\"progress\",\"listView\",\"toggleModal\"],[[28,[\"image\"]],\"deselectAll\",[28,[\"image\",\"file\",\"fileSize\"]],[28,[\"image\",\"file\",\"percent\"]],[28,[\"listView\"]],[33,[\"action\"],[[28,[null]],\"toggleModal\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"image\"]},null],[6,[\"each\"],[[28,[\"currentVideos\"]]],null,{\"statements\":[[6,[\"draggable-object\"],null,[[\"content\",\"class\"],[[28,[\"video\"]],\"shot-asset\"]],{\"statements\":[[0,\"              \"],[11,\"div\",[]],[16,\"class\",[34,[\"asset-viewer asset-wrapper \",[33,[\"if\"],[[28,[\"video\",\"isSelected\"]],\"selected\"],null]]]],[16,\"data-asset-id\",[34,[[28,[\"video\",\"id\"]]]]],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"file-information\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"video\",\"file\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"video\",\"file\",\"progress\"]],100],null]],null,{\"statements\":[[0,\"                      \"],[11,\"span\",[]],[15,\"class\",\"checkmark icon-Checkmark_b status-icon\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                      \"],[11,\"span\",[]],[15,\"class\",\"loader-status status-icon\"],[13],[0,\"Loading...\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"                    \"],[11,\"span\",[]],[15,\"class\",\"checkmark icon-Checkmark_b status-icon\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                  \"],[11,\"div\",[]],[15,\"class\",\"list-view-filename\"],[13],[1,[28,[\"video\",\"name\"]],false],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"progress-percent\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"video\",\"file\"]]],null,{\"statements\":[[0,\"                      \"],[1,[33,[\"human-readable-filesize\"],[[33,[\"multiplication\"],[[33,[\"division\"],[[28,[\"video\",\"file\",\"progress\"]],100],null],[28,[\"video\",\"file\",\"content\",\"size\"]]],null]],null],false],[0,\" of \"],[1,[33,[\"human-readable-filesize\"],[[28,[\"video\",\"file\",\"content\",\"size\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                      \"],[11,\"span\",[]],[15,\"class\",\"uploaded-text\"],[13],[0,\"Uploaded\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"delete-asset\"],[13],[0,\"\\n                    \"],[11,\"a\",[]],[15,\"class\",\"delete-asset btn icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"deleteAsset\",[28,[\"video\"]]],[[\"bubbles\"],[false]]],[13],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"video\"]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"uploaded-content thumbnail-view\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"currentImages\"]]],null,{\"statements\":[[6,[\"draggable-object\"],null,[[\"content\",\"class\"],[[28,[\"image\"]],\"shot-asset\"]],{\"statements\":[[0,\"                \"],[1,[33,[\"image-asset\"],null,[[\"image\",\"deselectAll\",\"progress\",\"toggleModal\"],[[28,[\"image\"]],\"deselectAll\",[28,[\"image\",\"file\",\"percent\"]],[33,[\"action\"],[[28,[null]],\"toggleModal\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"image\"]},null],[0,\"\\n\"],[6,[\"each\"],[[28,[\"currentVideos\"]]],null,{\"statements\":[[6,[\"draggable-object\"],null,[[\"content\",\"class\"],[[28,[\"video\"]],\"shot-asset\"]],{\"statements\":[[0,\"                \"],[11,\"div\",[]],[16,\"class\",[34,[\"asset-viewer asset-wrapper \",[33,[\"if\"],[[28,[\"video\",\"isSelected\"]],\"selected\"],null]]]],[16,\"data-asset-id\",[34,[[28,[\"video\",\"id\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"video\",\"processing\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"processing-wrapper\"],[13],[0,\"\\n                      \"],[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"class\",\"loading\"],[15,\"src\",\"assets/images/play_button_icon.svg\"],[13],[14],[14],[0,\"\\n                    \"],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"progressMeter\"],[16,\"style\",[34,[\"width: \",[28,[\"video\",\"file\",\"progress\"]],\"%;\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"video-js\"],null,[[\"poster\",\"autoplay\",\"preload\"],[[28,[\"video\",\"version_urls\",\"poster_image\"]],false,\"metadata\"]],{\"statements\":[[0,\"                      \"],[1,[33,[\"video-js-source\"],null,[[\"src\",\"type\"],[[28,[\"video\",\"version_urls\",\"hls\"]],\"application/x-mpegURL\"]]],false],[0,\"\\n                      \"],[1,[33,[\"video-js-source\"],null,[[\"src\",\"type\"],[[28,[\"video\",\"version_urls\",\"mp4_high\"]],\"video/mp4\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"                  \"],[11,\"div\",[]],[15,\"class\",\"filename\"],[13],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"name\"],[13],[1,[28,[\"video\",\"name\"]],false],[14],[0,\"\\n                    \"],[11,\"a\",[]],[15,\"class\",\"delete-asset btn icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"deleteAsset\",[28,[\"video\"]]],[[\"bubbles\"],[false]]],[13],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"video\"]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"shot-comment\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"instruction\"],[13],[0,\"If you weren't able to complete this shot,\\n        please enter the reason in order to continue.\"],[14],[0,\"\\n      \"],[11,\"form\",[]],[15,\"class\",\"form\"],[5,[\"action\"],[[28,[null]],\"saveComment\",[28,[\"model\"]]],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\",\"placeholder\"],[[28,[\"currentShot\",\"pilot_comment\"]],\"form-control input-lg\",\"How did this shot go?\"]]],false],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"submit\",[28,[\"commentButtonName\"]],\"btn button-white btn-lg save-comment-button\"]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"bulkUploadModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\"],[true]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-body\"],[13],[0,\"\\n      \"],[1,[33,[\"bulk-upload\"],null,[[\"mission\",\"toggleBulkUploaderModalAction\",\"addAssetAction\",\"startUploadAction\",\"bulkUploadCompleteAction\"],[[28,[\"mission\"]],\"toggleBulkUploaderModal\",\"addAsset\",\"startUpload\",\"bulkUploadComplete\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/client-mission-uploader.hbs" } });
});
define("pilots/templates/components/client-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MckAAea7", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isShowingModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\",\"onClickOverlay\"],[true,\"toggleModal\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap gps-metadata-missing-modal\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"header\"],[13],[0,\"Your Asset Is Missing GPS Meta Data\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"body\"],[13],[0,\"\\n        This could happen if you shot in Raw (DNG) format or used an application that removed\\n        GPS MetaData prior to uploading. Please check the mission details to find out if\\n        this mission requires GPS MetaData.\\n      \"],[14],[0,\"\\n      \"],[11,\"button\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[0,\"OK\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"isShowingRescheduleSuccessModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\",\"onClickOverlay\"],[true,\"toggleReSchedulingSuccess\"]],{\"statements\":[[0,\"    \"],[1,[33,[\"reschedule-success-modal\"],null,[[\"close\",\"mission\"],[\"toggleReSchedulingSuccess\",[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"client-mission\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header hidden-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null],\"TRAINING MISSION\",\"CLIENT MISSION\"],null],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Pin mission-header-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"mission-header-icon-text\"],[13],[0,\"\\n          \"],[1,[28,[\"model\",\"mission\",\"address\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"status\"],[13],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"mission-map\"],null,[[\"model\",\"mission\"],[[28,[\"model\",\"mission\",\"location\"]],[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header visible-xs\"],[13],[0,\"\\n    \"],[11,\"table\",[]],[13],[0,\"\\n      \"],[11,\"tr\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n        \"],[11,\"td\",[]],[13],[0,\"\\n          \"],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null],\"TRAINING MISSION\",\"CLIENT MISSION\"],null],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"tr\",[]],[13],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[16,\"class\",[34,[\"mission-icon \",[28,[\"model\",\"mission\",\"icon\"]]]]],[13],[14],[0,\" \"],[1,[28,[\"model\",\"mission\",\"location\",\"address\"]],false],[0,\", \"],[1,[28,[\"model\",\"mission\",\"location\",\"city\"]],false],[0,\", \"],[1,[28,[\"model\",\"mission\",\"location\",\"state\"]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"showOnHold\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"visible-xs\"],[13],[0,\"\\n      \"],[11,\"hr\",[]],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel on-hold-panel\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"on-hold-icon\"],[13],[0,\"\\n          \"],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"on-hold-content\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"This mission is on hold.\"],[14],[0,\"\\n          \"],[11,\"p\",[]],[13],[0,\"This mission is temporarily on hold. Hang tight - we're getting more information from the customer. We'll contact you when the mission is resumed.\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"hr\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details visible-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-label\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Payment\"],[13],[14],[0,\"\\n        Payment\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-above\"],[13],[0,\"\\n          \"],[1,[33,[\"number-in-dollars\"],[[28,[\"model\",\"mission\",\"estimated_pilot_payout\"]]],null],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box date-scheduled\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-label\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Calendar\"],[13],[14],[0,\"Flight Date\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-above\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            Rescheduling\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-below\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"mission-scheduled-at-time\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            We will contact you when a new date is available\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"mission\",\"admin_scheduled\"]]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"mission-details-reschedule-link\"],[5,[\"action\"],[[28,[null]],\"toggleRescheduleReason\"]],[13],[0,\"\\n            Need to Reschedule?\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRescheduleReason\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box reschedule\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"close-box\"],[5,[\"action\"],[[28,[null]],\"toggleRescheduleReason\"]],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"cross icon-Xmark\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"reschedule-mission\"],null,[[\"model\",\"reSchedule\"],[[28,[\"model\"]],\"reschedule\"]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n      \"],[1,[33,[\"status-button\"],null,[[\"mission\",\"twoButtons\"],[[28,[\"model\",\"mission\"]],true]]],false],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"LAANCAuth\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"status-button\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"status-icon-cell icon-Checkmark_b\"],[13],[0,\" \"],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"status-icon-text\"],[13],[0,\"\\n            LAANC Authorization Number: \"],[1,[28,[\"LAANCAuth\",\"confirmation_number\"]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"LAANCExemption\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box laanc-authorization-details\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-mobile\"],null,null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n          This is a LAANC enabled airspace. As a Part 107 pilot,\\n          you can get automatic FAA authorization to fly here.\\n          \"],[11,\"br\",[]],[13],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[33,[\"if\"],[[33,[\"is-ios\"],null,null],[28,[\"iosAuthLink\"]],[28,[\"androidAuthLink\"]]],null],null],[13],[0,\"\\n            GET LAANC AUTHORIZATION\\n          \"],[14],[0,\"\\n          This button will open the AirMap app in a new window.\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"skinny-browser-laanc\"],[13],[0,\"\\n            This is a LAANC enabled airspace. As a Part 107 pilot, you can get\\n            automatic FAA authorization to fly here through the DroneBase Pilot app.\\n            \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/articles/115003896191\"],[13],[0,\"\\n              Learn More\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"missionScheduleBox\"],[13],[0,\"\\n      \"],[1,[33,[\"schedule-mission\"],null,[[\"model\",\"updateAction\",\"hideScheduling\",\"reschedule\",\"title\"],[[28,[\"model\",\"mission\"]],\"update\",[28,[\"hideScheduling\"]],true,\"Reschedule Your Flight\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"container-fluid mission-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row instructions-content\"],[13],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"instructions col-sm-8\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel training-mission\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/training_mission_icon.svg\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"training-mission-details\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"training-mission-label\"],[13],[0,\"\\n                This is a Training Mission.\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"training-mission-text\"],[13],[0,\"\\n                You may fly this mission at your home address or another\\n                location that is convenient, safe, \"],[11,\"b\",[]],[13],[0,\"and legal\"],[14],[0,\". Because\\n                this training is designed to qualify pilots for Client\\n                Missions, the payout is listed as $0. Please schedule\\n                the mission to accept it. After your scheduled flight,\\n                upload assets ASAP so we can get you paid work!\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"mission\",\"flight_app\"]]],null,{\"statements\":[[0,\"          \"],[11,\"h3\",[]],[13],[0,\"Flight App\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel\"],[15,\"id\",\"flight-app-information\"],[13],[0,\"\\n            \"],[1,[33,[\"markdown-to-html\"],[[28,[\"model\",\"mission\",\"flight_app\",\"pilot_flight_instruction\",\"web\"]]],null],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showContactInfoBox\"]]],null,{\"statements\":[[0,\"          \"],[11,\"h3\",[]],[13],[0,\"On-site Contact Information\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel contact-panel\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showContactInfoColumn1\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"contact-name-panel\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n                  \"],[1,[28,[\"model\",\"mission\",\"onsite_contact\",\"call_action\"]],false],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[13],[1,[28,[\"model\",\"mission\",\"onsite_contact\",\"name\"]],false],[14],[0,\"\\n                \"],[11,\"div\",[]],[13],[1,[28,[\"model\",\"mission\",\"onsite_contact\",\"phone\"]],false],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"showContactInfoColumn2\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[16,\"class\",[34,[\"contact-notes-panel\\n                  \",[33,[\"if\"],[[28,[\"showContactInfoDivider\"]],\"divider\"],null]]]],[13],[0,\"\\n                \"],[1,[28,[\"model\",\"mission\",\"onsite_contact\",\"note\"]],false],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"showOnHold\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel on-hold-panel\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"on-hold-icon\"],[13],[0,\"\\n                \"],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"on-hold-content\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"This mission is on hold.\"],[14],[0,\"\\n                \"],[11,\"p\",[]],[13],[0,\"This mission is temporarily on hold. Hang tight - we're getting more information from the customer. We'll contact you when the mission is resumed.\"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Instructions\\n          \"],[11,\"span\",[]],[15,\"class\",\"count\"],[13],[0,\"\\n            \"],[1,[28,[\"model\",\"mission\",\"pilotShots\",\"length\"]],false],[0,\" Total shots\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"camera-settings\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Camera Settings\"],[14],[0,\"\\n            Check exposure and set your white balance depending on intensity of light\\n            (sun or clouds).\"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[11,\"strong\",[]],[13],[0,\"Video:\"],[14],[0,\" 4K, 30fps (MP4 or MOV formats) \"],[11,\"strong\",[]],[13],[0,\"Image:\"],[14],[0,\"\\n            4000px x 3000px, 12MP (JPG format)\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"shots-panel\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"mission\",\"pilotShots\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[13],[0,\"\\n                \"],[11,\"strong\",[]],[13],[1,[28,[\"shot\",\"shot_type\",\"name\"]],false],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"shots-panel-intructions\"],[13],[0,\"\\n                  \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"shot\",\"instructions\"]]]]],false],[0,\"\\n                  \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"shot\",\"shot_type\",\"description\"]]]]],false],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[\"shot\"]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Additional Information\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"instructions-panel additional-instructions\"],[13],[0,\"\\n          If there are issues during the mission, please contact DroneBase Ops at\\n          pilots@dronebase.com.\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"instructions\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[13],[0,\"\\n              \"],[11,\"br\",[]],[13],[14],[0,\"\\n              \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"model\",\"mission\",\"instructions\"]]]]],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"col-sm-4 mission-details hidden-xs \",[33,[\"if\"],[[28,[\"model\",\"mission\",\"showOnHold\"]],\"on-hold\"],null]]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-label\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"icon-Payment\"],[13],[14],[0,\"\\n            Payment\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-above\"],[13],[0,\"\\n              \"],[1,[33,[\"number-in-dollars\"],[[28,[\"model\",\"mission\",\"estimated_pilot_payout\"]]],null],false],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box date-scheduled\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-label\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"icon-Calendar\"],[13],[14],[0,\"Flight Date\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content \"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-above\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                Rescheduling\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box-content-below\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"mission-scheduled-at-time\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                We will contact you when a new date is available\\n\"]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"mission\",\"admin_scheduled\"]]],null,{\"statements\":[[0,\"              \"],[11,\"span\",[]],[15,\"class\",\"mission-details-reschedule-link\"],[5,[\"action\"],[[28,[null]],\"toggleRescheduleReason\"]],[13],[0,\"\\n                Need to Reschedule?\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRescheduleReason\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box reschedule\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"close-box\"],[5,[\"action\"],[[28,[null]],\"toggleRescheduleReason\"]],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"cross icon-Xmark\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[1,[33,[\"reschedule-mission\"],null,[[\"model\",\"reSchedule\"],[[28,[\"model\"]],\"reschedule\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n          \"],[1,[33,[\"status-button\"],null,[[\"mission\",\"twoButtons\"],[[28,[\"model\",\"mission\"]],true]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"LAANCAuth\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"status-button\"],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"status-icon-cell icon-Checkmark_b\"],[13],[0,\" \"],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"status-icon-text\"],[13],[0,\"\\n                LAANC Authorization Number: \"],[1,[28,[\"LAANCAuth\",\"confirmation_number\"]],false],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"LAANCExemption\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box laanc-authorization\"],[13],[0,\"\\n            LAANC Authorization\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"mission-details-box laanc-authorization-details\"],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              This is a LAANC enabled airspace. As a Part 107 pilot, you can get\\n              automatic FAA authorization to fly here through the DroneBase Pilot app.\\n              \"],[11,\"br\",[]],[13],[14],[0,\"\\n              \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/articles/115003896191\"],[13],[0,\"\\n                Learn More\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"        \"],[1,[33,[\"schedule-mission\"],null,[[\"model\",\"updateAction\",\"hideScheduling\",\"reschedule\",\"title\"],[[28,[\"model\",\"mission\"]],\"reSchedule\",[28,[\"hideScheduling\"]],true,\"Reschedule Your Flight\"]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"row visible-xs\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"additional-info desktop\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"icon-Upload desktop-icon\"],[13],[14],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"desktop-icon-text\"],[13],[0,\"\\n            Please use a desktop computer to upload assets for this mission.\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"row mission-upload-wrapper hidden-xs\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"model\",\"mission\",\"missionComplete\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"mission\",\"flight_app\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-12\"],[13],[0,\"\\n            \"],[11,\"h3\",[]],[13],[0,\"Upload\"],[14],[0,\"\\n            \"],[1,[33,[\"upload-assets-other-app\"],null,[[\"mission\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-12\"],[13],[0,\"\\n            \"],[11,\"h3\",[]],[13],[0,\"Upload Steps\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"upload-steps-panel\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"part col-sm-4\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n                  1. Upload Files\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"Select a shot and upload assets directly to it. Or,\\n                  upload all assets to \\\"Unassigned Assets\\\" and then drag them to the\\n                  appropriate shot.\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"separator\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"part col-sm-4 border\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n                  2. Assign Assets to Shots\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"Make sure all assets are placed in the correct\\n                  shot. \\\"Unassigned Assets\\\" should be 0 and each shot should have\\n                  at least 1 asset. If there are no assets for a shot, enter a\\n                  comment explaining why.\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"separator\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"part col-sm-4\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n                  3. Submit Mission\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"Add a comment about how the mission went overall\\n                  and submit. Mission complete!\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-12\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"readyToSubmit\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"client-mission-uploader\"],null,[[\"mission\",\"doneClassifying\",\"status\",\"uploadProgress\",\"extensions\",\"onfileadd\",\"onstartupload\",\"uploadedCount\",\"mission\",\"images\",\"videos\",\"toggleModal\",\"submitMissionAction\"],[[28,[\"model\",\"mission\"]],\"doneClassifying\",[28,[\"model\",\"mission\",\"status\"]],[28,[\"uploadProgress\"]],\"mov mp4 jpg jpeg tif tiff png\",\"addAsset\",\"startUpload\",[28,[\"model\",\"mission\",\"assetsCount\"]],[28,[\"model\",\"mission\"]],[28,[\"model\",\"mission\",\"images\"]],[28,[\"model\",\"mission\",\"videos\"]],[33,[\"action\"],[[28,[null]],\"toggleModal\"],null],\"submitMission\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"readyToSubmit\"]]],null,{\"statements\":[[0,\"              \"],[11,\"h3\",[]],[13],[0,\"Summary\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"You have uploaded \"],[1,[28,[\"model\",\"mission\",\"assetsCount\"]],false],[0,\" assets.\"],[11,\"br\",[]],[13],[14],[0,\"\\n                   Please let us know how the mission went, overall.\\n              \"],[14],[0,\"\\n              \"],[11,\"form\",[]],[15,\"class\",\"form pilot-comment\"],[5,[\"action\"],[[28,[null]],\"submitMission\",[28,[\"model\"]]],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n                \"],[1,[33,[\"textarea\"],null,[[\"value\",\"placeholder\",\"class\"],[[28,[\"model\",\"mission\",\"pilot_comment\"]],\"Add comment...\",\"form-control input-lg\"]]],false],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"form-buttons\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[13],[0,\"\\n                    \"],[11,\"a\",[]],[15,\"class\",\"back-button button button-orange\"],[5,[\"action\"],[[28,[null]],\"back\"]],[13],[0,\"\\n                      BACK\\n                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[1,[33,[\"input\"],null,[[\"type\",\"value\",\"class\"],[\"submit\",\"SUBMIT\",\"button-orange save-comment-button\"]]],false],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"mission\",\"missionComplete\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"mission\",\"mission_type\"]],\"training\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"mission-complete\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"background1\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"background2\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"congrats forward\"],[13],[0,\"NICE JOB, PILOT!\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"forward\"],[13],[0,\"You've completed a Training Mission.\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"forward\"],[13],[0,\"Our team will be in touch with next steps!\"],[14],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"forward chair-img\"],[15,\"src\",\"/assets/images/v2/training_mission_complete.svg\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"mission-complete\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"background1\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"background2\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"congrats forward\"],[13],[0,\"CONGRATULATIONS!\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"forward\"],[13],[0,\"You've completed your mission. Now just sit back and relax.\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"forward\"],[13],[0,\"We'll edit the assets and process your payment.\"],[14],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"forward chair-img\"],[15,\"src\",\"/assets/images/v2/infog_Chair_Umbrella.svg\"],[13],[14],[0,\"\\n            \"],[6,[\"link-to\"],[\"pilotlog\"],[[\"class\"],[\"completed forward\"]],{\"statements\":[[0,\"See your completed missions\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/client-mission.hbs" } });
});
define("pilots/templates/components/daily-message", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LQGNfw3H", "block": "{\"statements\":[[1,[26,[\"message\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/daily-message.hbs" } });
});
define("pilots/templates/components/dashboard-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "U5T1lXGu", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dashboard-header\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"header-item divider\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"header-container\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"header-icon icon-Flag\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"count\"],[13],[1,[28,[\"pilot\",\"total_client_missions\"]],false],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"small-text\"],[13],[0,\" CLIENT \"],[11,\"br\",[]],[13],[14],[0,\" MISSIONS DONE\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"header-item\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"header-container\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"header-icon-2 icon-Coins\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"count\"],[13],[1,[33,[\"number-in-dollars\"],[[28,[\"pilot\",\"payout_total\"]]],null],false],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"small-text\"],[13],[0,\" TOTAL \"],[11,\"br\",[]],[13],[14],[0,\"EARNED\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-header.hbs" } });
});
define("pilots/templates/components/dashboard-infographic", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cREyyv5V", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"dashboard-infographic-wrapper \",[33,[\"if\"],[[28,[\"page0\"]],\"show-ar-image\",[33,[\"if\"],[[28,[\"page1\"]],\"show-getty-image\"],null]],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"dashboard-infographic\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"collapsed-title title\"],[13],[0,\"\\n      Get Paid for Your Creative Aerial Videos!\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"left-arrow icon-Arrow3_l\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"info-page-wrapper col-xs-12\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"info-page page0\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"ar-text\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/AirCraft_logo_Final.svg\"],[13],[14],[0,\"\\n          \"],[11,\"p\",[]],[13],[0,\"Soar into the Skies of Augmented Reality\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"ar-buttons\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"http://dronebase.com/ar\"],[15,\"class\",\"turquoise-button hidden-xs\"],[13],[0,\"LEARN MORE\"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://itunes.apple.com/us/app/dronebase-pilot/id1057404436?mt=8\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/apple-store.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"info-page page1 \",[33,[\"if\"],[[28,[\"showGetty\"]],\"hidden-right\"],null]]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"getty-headline\"],[13],[0,\"\\n          Take Flight and Land on \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/GettyImage_logo.svg\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"DroneBase is proud to provide pilots with the opportunity\\n          to get their creative work featured for purchase on Getty Images. Get on Getty, and get paid!\"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"href\",\"/getty\"],[15,\"id\",\"get-on-getty-button\"],[13],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/upload_now_button.svg\"],[13],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"info-page page2 \",[33,[\"if\"],[[28,[\"showGetty\"]],\"hidden-right\"],null]]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n          Let's map the skies!\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"info-row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\" item\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/Infog_PickLocation.svg\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"small-title\"],[13],[0,\"Pick a mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"Browse missions on the map. Pano Missions pay you if customers\\n              purchase them, and Client Missions pay you a guaranteed amount.\"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/Infog_FlyYourDrone.svg\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"small-title\"],[13],[0,\"Fly your drone\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"Note the rules of safe operation and have fun flying your drone.\"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/Infog_Upload.svg\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"small-title\"],[13],[0,\"Upload & done\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"When you're done, come back and upload the results. DroneBase will\\n              take care of editing, sales, and your payment.\"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"right-arrow icon-Arrow3_r\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container bullets\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row bullets\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"bullet bullet-0 selected\"],[13],[0,\"•\"],[14],[0,\"\\n      \"],[11,\"span\",[]],[16,\"class\",[34,[\"bullet bullet-1 \",[33,[\"unless\"],[[28,[\"showGetty\"]],\"selected\"],null]]]],[13],[0,\"•\"],[14],[0,\"\\n      \"],[11,\"span\",[]],[16,\"class\",[34,[\"bullet bullet-2 \",[33,[\"unless\"],[[28,[\"showGetty\"]],\"selected\"],null]]]],[13],[0,\"•\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"icon-Arrow2_up collapse-arrow\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-infographic.hbs" } });
});
define("pilots/templates/components/dashboard-map-active-missions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4avl74Jg", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"should-lower lowered active-missions-container \",[33,[\"if\"],[[28,[\"hidePanel\"]],\"shrink\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"active-missions\"],[5,[\"action\"],[[28,[null]],\"toggleMissionsPanel\"]],[13],[0,\"ACTIVE MISSIONS\\n    \"],[11,\"div\",[]],[15,\"class\",\"icon-Arrow2_down arrow\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"icon-Arrow2_up arrow\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-wrapper\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"scroll-wrapper\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showGetty\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"getty-mission-panel\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"down-arrow\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"Creative Mission\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"headline\"],[13],[0,\"GETTY IMAGES\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"Get paid for your creative aerial videos.\"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"blue-button\"],[15,\"href\",\"/getty\"],[15,\"id\",\"getty-see-details-button\"],[13],[0,\"\\n            SEE DETAILS\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"unless\"],[[28,[\"sortedMissions\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"no-active-mission-panel\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"no-active-mission-panel-title\"],[13],[0,\"\\n          No Active Missions\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"no-active-mission-panel-copy\"],[13],[0,\"\\n          You can add missions by browsing the map and starring the ones you are interested in.\\n        \"],[14],[0,\"\\n        \"],[11,\"img\",[]],[15,\"class\",\"no-active-mission-panel-img\"],[15,\"src\",\"/assets/images/ig/Infog_AddStar_Likelihood-for-Payout.svg\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"each\"],[[28,[\"sortedMissions\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"missionStatusType\"]],\"client_mission_available\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"available-mission-panel \",[33,[\"if\"],[[28,[\"mission\",\"selected_on_dashboard\"]],\"mission-panel-selected\"],null]]]],[5,[\"action\"],[[28,[null]],\"selectMission\",[28,[\"mission\"]]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"down-arrow\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"price\"],[13],[1,[33,[\"number-in-dollars\"],[[28,[\"mission\",\"estimated_pilot_payout\"]]],null],false],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"Available Client Mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"mission-id\"],[13],[1,[28,[\"mission\",\"id\"]],false],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"icon-Pin\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"address-wrapper\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[1,[28,[\"mission\",\"shortAddress\"]],false],[14],[0,\"\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"icon-Calendar\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"date-wrapper\"],[13],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"due-date\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"                    Flight Date \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                    Flight Date: Best available time\\n\"]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"button-panel\"],[13],[0,\"\\n              \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"availableMission\",[28,[\"mission\"]]],[[\"bubbles\"],[false]]],[13],[0,\"SEE DETAILS\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"declineAvailable\",[28,[\"mission\"]]],[[\"bubbles\"],[false]]],[13],[0,\"DECLINE\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"is-in\"],[[28,[\"mission\",\"missionStatusType\"]],\"pano_residential_active,pano_commercial_active\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[16,\"class\",[34,[\"pano-mission-panel  \",[33,[\"if\"],[[28,[\"mission\",\"selected_on_dashboard\"]],\"mission-panel-selected\"],null]]]],[5,[\"action\"],[[28,[null]],\"selectMission\",[28,[\"mission\"]]]],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"down-arrow\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"icon-Star_b\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"Pano Mission - Commercial\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"mission-id\"],[13],[1,[28,[\"mission\",\"id\"]],false],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"icon-Pin\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"address-wrapper\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[1,[28,[\"mission\",\"address\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"button-panel\"],[13],[0,\"\\n              \"],[6,[\"link-to\"],[\"panomission\",[28,[\"mission\",\"id\"]]],[[\"class\",\"bubbles\"],[\"button\",false]],{\"statements\":[[0,\"SEE DETAILS\"]],\"locals\":[]},null],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"cancelPano\",[28,[\"mission\"]]],[[\"bubbles\"],[false]]],[13],[0,\"CANCEL\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"missionStatusType\"]],\"client_mission\"],null]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"active-mission-summary-panel\"],null,[[\"mission\",\"action\"],[[28,[\"mission\"]],\"selectMission\"]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"mission\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-map-active-missions.hbs" } });
});
define("pilots/templates/components/dashboard-map-filter-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "p4dZ+L0a", "block": "{\"statements\":[[11,\"span\",[]],[16,\"class\",[34,[[28,[\"missionType\",\"fontIcon\"]],\" \",[28,[\"missionType\",\"active\"]],\" \",[26,[\"selected\"]]]]],[13],[14],[0,\"\\n\"],[1,[28,[\"missionType\",\"name\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-map-filter-button.hbs" } });
});
define("pilots/templates/components/dashboard-map-filter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CVhp2r7v", "block": "{\"statements\":[[11,\"div\",[]],[15,\"id\",\"map-filter-container\"],[15,\"class\",\"should-lower lowered map-filter\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"search-filter-button\"],[15,\"class\",\"icon-filter icon-Search\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"client-filter-button\"],[15,\"class\",\"icon-filter icon-ClientPin\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"commercial-filter-button\"],[15,\"class\",\"icon-filter icon-CommercialPin\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"residential-filter-button\"],[15,\"class\",\"icon-filter icon-ResidentialPin\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"should-lower lowered map-filter-search\"],[13],[0,\"\\n  \"],[11,\"input\",[]],[15,\"id\",\"filter-search-field\"],[15,\"type\",\"text\"],[15,\"placeholder\",\"Enter Location\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"should-lower lowered map-filter-missions client\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-right-arrow\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission right-border\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"clientMission\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"clientMissionAvailable\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"should-lower lowered map-filter-missions pano-commercial\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-right-arrow\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission right-border\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"panoCommercialAvailable\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"panoCommercialActive\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"should-lower lowered map-filter-missions pano-residential\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-right-arrow\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission right-border\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"panoResidentialAvailable\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-filter-mission\"],[13],[0,\"\\n    \"],[1,[33,[\"dashboard-map-filter-button\"],null,[[\"missionType\",\"updateFilterAction\"],[[28,[\"panoResidentialActive\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-map-filter.hbs" } });
});
define("pilots/templates/components/dashboard-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rS3T7VNL", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"showfilter\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"dashboard-map-filter\"],null,[[\"missionFilters\",\"updateFilterAction\"],[[28,[\"missionFilters\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[1,[33,[\"dashboard-map-active-missions\"],null,[[\"missions\",\"declineAction\",\"selectedAction\",\"cancelPanoAction\",\"availableMissionAction\"],[[28,[\"model\",\"missions\"]],\"declineMission\",\"selectedMission\",\"cancelPano\",\"availableMission\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[15,\"id\",\"map-canvas\"],[16,\"class\",[34,[[33,[\"unless\"],[[28,[\"pilotlog\"]],\"map-canvas-dashboard\"],null]]]],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"id\",\"info-window-node\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-map.hbs" } });
});
define("pilots/templates/components/dashboard-mission-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HMAD+88+", "block": "{\"statements\":[[11,\"div\",[]],[15,\"id\",\"map-canvas\"],[16,\"class\",[34,[[33,[\"unless\"],[[28,[\"pilotlog\"]],\"map-canvas-dashboard\"],null]]]],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/dashboard-mission-map.hbs" } });
});
define("pilots/templates/components/draggable-object-target", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "XR8eSRm0", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"enableClicking\"]]],null,{\"statements\":[[0,\"  \"],[11,\"a\",[]],[15,\"href\",\"#\"],[5,[\"action\"],[[28,[null]],\"acceptForDrop\"]],[13],[0,\"\\n    \"],[18,\"default\"],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/draggable-object-target.hbs" } });
});
define("pilots/templates/components/draggable-object", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yAHV4SXo", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"enableClicking\"]]],null,{\"statements\":[[0,\"  \"],[11,\"a\",[]],[15,\"href\",\"#\"],[5,[\"action\"],[[28,[null]],\"selectForDrag\"]],[13],[0,\"\\n    \"],[18,\"default\"],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/draggable-object.hbs" } });
});
define("pilots/templates/components/explore-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "a/zRRRYa", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"explore-card\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"EXPLORE\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"main-card\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"class\",\"main-card-image hidden-xs\"],[15,\"src\",\"/assets/images/pilot/explore_download_pilot_app_desktop.jpg\"],[13],[14],[0,\"\\n    \"],[11,\"img\",[]],[15,\"class\",\"main-card-image visible-xs\"],[15,\"src\",\"/assets/images/pilot/explore_download_pilot_app.jpg\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"main-card-body\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n        Download the DroneBase App\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n        The DroneBase App streamlines your workflow, so you can spend more time flying! Our deep integration with DJI’s SDK means you’re able to find and fly available missions seamlessly.\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"download-buttons\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://itunes.apple.com/us/app/dronebase-pilot/id1057404436?mt=8\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/apple-store.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://play.google.com/store/apps/details?id=com.dronebase.pilotapp\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/android_appstore_button.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"blog-posts\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"blog-post\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"card-image\"],[15,\"src\",\"/assets/images/pilot/explore_tile_image1.jpg\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-body\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n          Get More Client Missions\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n          Learn how you can improve your chances of getting more client missions.\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"darkblue-button\"],[15,\"href\",\"/client-missions\"],[13],[0,\"\\n          LEARN MORE\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"blog-post\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"card-image\"],[15,\"src\",\"/assets/images/pilot/dronebase_blog_tile.png\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-body\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n          The DroneBase Blog\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n          Stay up to date with drone news, events, company announcements & more. Get tips and insights from pilots & industry leaders.\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"darkblue-button less-margin\"],[15,\"href\",\"https://blog.dronebase.com\"],[15,\"target\",\"_blank\"],[13],[0,\"\\n          READ NOW\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"blog-post last\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"card-image\"],[15,\"src\",\"/assets/images/pilot/explore_start_training_tile.png\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"card-body\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-header\"],[13],[0,\"\\n          Start Training to Get Paid\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"card-text\"],[13],[0,\"\\n          Get started by completing your profile today, so we can invite you to online training courses and get you more opportunities.\\n        \"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"darkblue-button less-margin\"],[15,\"href\",\"/profile\"],[13],[0,\"\\n          COMPLETE PROFILE\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/explore-card.hbs" } });
});
define("pilots/templates/components/getty-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZrD0hRaW", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"getty-mission\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"getty-mission-header\"],[13],[0,\"\\n    \"],[11,\"video\",[]],[15,\"class\",\"getty-video-background hidden-xs\"],[15,\"muted\",\"\"],[15,\"loop\",\"\"],[15,\"id\",\"video\"],[15,\"playsinline\",\"\"],[15,\"autoplay\",\"\"],[15,\"preload\",\"none\"],[13],[0,\"\\n      \"],[11,\"source\",[]],[15,\"src\",\"https://cdn.dronebase.com/static/videos/Getty_LandingPage_Web_13pt_credit.mp4\"],[15,\"type\",\"video/mp4\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"video\",[]],[15,\"class\",\"getty-video-background visible-xs\"],[15,\"muted\",\"\"],[15,\"loop\",\"\"],[15,\"id\",\"mobilevideo\"],[15,\"playsinline\",\"\"],[15,\"autoplay\",\"\"],[13],[0,\"\\n      \"],[11,\"source\",[]],[15,\"src\",\"https://cdn.dronebase.com/static/videos/Getty_Header_mobile_Credits.mp4\"],[15,\"type\",\"video/mp4\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"header-text\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"\\n        Take Flight and Land on \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/GettyImage_logo.svg\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"\\n        Submit your awe-inspiring aerial videos to be featured on the world’s largest stock image site!\\n      \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"mobile\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"upload-now\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"turquoise-button\"],[13],[0,\"UPLOAD NOW\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"get-on scroll-hidden\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"class\",\"lowertri hidden-xs\"],[15,\"src\",\"/assets/images/getty/Bottom_triangle.png\"],[13],[14],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"Get Paid for Your Aerial Videos\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"body\"],[13],[0,\"\\n      DroneBase is proud to provide pilots with the opportunity to get their\\n      creative work featured for purchase on Getty Images. Normally, it’s not\\n      easy to become a contributor on the world’s most prolific stock website,\\n      but DroneBase pilots now have a unique backdoor opportunity to take their\\n      creativity (and earnings!) to the next level.\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"infog\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"title scroll-hidden\"],[13],[0,\"\\n      How It Works\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"infog-row scroll-hidden\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"infog-column\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"info-gifs overlay1\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/Getty-infographic_Skyline.png\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n          We're looking for creative 4k aerial videos, from busy cities to the great outdoors... and everything in between!\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"infog-column\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"info-gifs overlay2\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/Getty-infographic_Upload.png\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n          Upload your best 4k video to show us what you've got. Only videos\\n          between 5 and 60 seconds in .mov or .mp4 format will be accepted.\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"infog-column\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"info-gifs overlay3\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/Getty-infographic_Upload-Money.png\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n          If your submission is approved, you'll receive $15 for your creative work!\\n          If it's not accepted, we'll give you feedback so you can try again.\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"video-guidelines scroll-hidden\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"id\",\"guidelines\"],[15,\"class\",\"guidelines\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"headline\"],[13],[0,\"Guidelines\"],[14],[0,\"\\n      \"],[11,\"ol\",[]],[15,\"class\",\"items\"],[13],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"All submissions must be between 5 and 60 seconds.\"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"Videos shorter than 5 seconds OR longer than 60 seconds will be rejected.\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"Video must be shot in 4k resolution and QuickTime (.mov) or .mp4 format,\\n          created with H.264 codec. All other formats will be rejected.\\n        \"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"Video should not contain audio.\"],[14],[0,\"\\n        \"],[11,\"li\",[]],[13],[0,\"\\n          DroneBase reserves the right to reject submissions that do not meet\\n          quality or guideline requirements.\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"questions\"],[15,\"target\",\"_blank\"],[15,\"href\",\"https://dbpilots.zendesk.com/hc/en-us/articles/115002060291-Getty-Missions\"],[13],[0,\"Have Questions?\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"example-video-row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"example-video-headline\"],[13],[0,\"Example Videos\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-examples\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"arrow-left hidden-xs\"],[5,[\"action\"],[[28,[null]],\"rotateCarouselLeft\"]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/arrow_left.png\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"carousel\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item reveal-item-0 reveal-item\"],[13],[0,\"\\n            \"],[1,[33,[\"video-player\"],null,[[\"videoSrc\",\"hideAudio\",\"showDefaultControls\"],[\"https://cdn.dronebase.com/static/videos/gettymissionexamples/getty_example_video_1_1.mp4\",true,true]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item reveal-item-1 reveal-item\"],[13],[0,\"\\n            \"],[1,[33,[\"video-player\"],null,[[\"videoSrc\",\"hideAudio\",\"showDefaultControls\"],[\"https://cdn.dronebase.com/static/videos/gettymissionexamples/Getty_example_video_2_1.mp4\",true,true]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item reveal-item-2 reveal-item\"],[13],[0,\"\\n            \"],[1,[33,[\"video-player\"],null,[[\"videoSrc\",\"hideAudio\",\"showDefaultControls\"],[\"https://cdn.dronebase.com/static/videos/gettymissionexamples/Getty_example_video_3.mp4\",true,true]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"item reveal-item-3 reveal-item\"],[13],[0,\"\\n            \"],[1,[33,[\"video-player\"],null,[[\"videoSrc\",\"hideAudio\",\"showDefaultControls\"],[\"https://cdn.dronebase.com/static/videos/gettymissionexamples/Getty_example_video_4.mp4\",true,true]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"arrow-right hidden-xs\"],[5,[\"action\"],[[28,[null]],\"rotateCarouselRight\"]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/arrow_right.png\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"row bullets\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"bullet bullet-b bullet-0b selected\"],[15,\"data-page-no\",\"0\"],[5,[\"action\"],[[28,[null]],\"goToCarouselPage\",0]],[13],[0,\"•\"],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"bullet bullet-b bullet-1b\"],[15,\"data-page-no\",\"1\"],[5,[\"action\"],[[28,[null]],\"goToCarouselPage\",1]],[13],[0,\"•\"],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"bullet bullet-b bullet-2b\"],[15,\"data-page-no\",\"2\"],[5,[\"action\"],[[28,[null]],\"goToCarouselPage\",2]],[13],[0,\"•\"],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"bullet bullet-b bullet-3b\"],[15,\"data-page-no\",\"3\"],[5,[\"action\"],[[28,[null]],\"goToCarouselPage\",3]],[13],[0,\"•\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"id\",\"upload\"],[15,\"class\",\"upload\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"headline\"],[13],[0,\"Upload\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"scroll-hidden\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mobile\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"mobile-upload-redirect\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"log-in-text\"],[13],[0,\"\\n            Please log in to your pilot dashboard and upload from your computer.\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/upload_computer_infogrphic@2x.png\"],[15,\"class\",\"upload-computer-infog\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"large-turquoise-text\"],[13],[0,\"\\n            OR\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"use-app-text\"],[13],[0,\"\\n            Upload through the DroneBase Pilot App.\\n          \"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/upload_dronebase_app_infogrphic@2x.png\"],[15,\"class\",\"upload-app-infog\"],[13],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"target\",\"_blank\"],[15,\"href\",\"https://itunes.apple.com/us/app/dronebase-pilot/id1057404436?mt=8\"],[15,\"class\",\"js-ga-click\"],[15,\"data-category\",\"appStore\"],[15,\"data-label\",\"success\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/apple-store.svg\"],[15,\"class\",\"app-store-badge\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"more-questions-text\"],[13],[0,\"\\n            Have more questions about Getty Missions? Visit our FAQ page for more helpful answers to our most common questions.\\n          \"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"questions\"],[15,\"href\",\"https://go.dronebase.com/faq/pilot#getty\"],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/pilot_faq_button@2x.png\"],[15,\"class\",\"pilot-faq-button\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"class\",[34,[\"upload-panel \",[33,[\"if\"],[[28,[\"uploadComplete\"]],\"upload-complete\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"uploadComplete\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"complete-container\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"close icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"newUpload\"]],[13],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/Drone_on_a_Shelf.svg\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"headline\"],[13],[0,\"THANK YOU!\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"Your submission is on its way to Getty Images for review. Good luck!\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[5,[\"action\"],[[28,[null]],\"newUpload\"]],[13],[11,\"img\",[]],[15,\"class\",\"hand-cursor submit-again\"],[15,\"src\",\"/assets/images/getty/submit_another_one_button@2x.png\"],[13],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"uploadInProgress\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"progress-container\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"loader\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"uploadProgress\"],[13],[1,[26,[\"uploadProgress\"]],false],[0,\"%\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"headline\"],[13],[0,\"SUBMITTING...\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[1,[26,[\"fileProgress\"]],false],[0,\" of \"],[1,[26,[\"fileSizeText\"]],false],[0,\" uploaded\"],[14],[0,\"\\n\\n              \"],[11,\"img\",[]],[15,\"class\",\"cancel-button hand-cursor\"],[15,\"src\",\"/assets/images/getty/cancel_button@2x.png\"],[5,[\"action\"],[[28,[null]],\"cancelUploadAction\"]],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"select-file-panel\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Entry \"],[1,[26,[\"gettyMissionsCount\"]],false],[0,\":\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[0,\"Upload your video (4k .mov or .mp4 only). Uploads\\n                work best in Google Chrome.\\n              \"],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"uploader-container\"],[13],[0,\"\\n                \"],[4,\" not used, just to make plupload happy \"],[0,\"\\n                \"],[11,\"div\",[]],[15,\"id\",\"uploader\"],[13],[14],[0,\"\\n                \"],[4,\" this is the actually file input but it's hidden, so styling can be applied to the label instead \"],[0,\"\\n                \"],[11,\"input\",[]],[15,\"id\",\"fileInput\"],[15,\"type\",\"file\"],[15,\"accept\",\"video/quicktime,video/mp4\"],[16,\"onChange\",[33,[\"action\"],[[28,[null]],\"onFileSelected\"],null],null],[13],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"filenameWrapper\"],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"fileName\"]]],null,{\"statements\":[[0,\"                  \"],[11,\"label\",[]],[15,\"for\",\"fileInput\"],[15,\"id\",\"fileInputLabel\"],[13],[0,\"\\n                    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/Plus_icon.svg\"],[13],[14],[0,\"\\n                    \"],[11,\"span\",[]],[13],[0,\"Add your file\"],[14],[0,\"\\n                  \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                  \"],[11,\"div\",[]],[15,\"class\",\"uploadFilename\"],[13],[1,[26,[\"fileName\"]],false],[0,\"\\n                    \"],[11,\"span\",[]],[15,\"class\",\"cancel icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"cancelFile\"]],[13],[14],[14],[0,\"\\n                    \"],[11,\"div\",[]],[15,\"class\",\"uploadfilesize\"],[13],[1,[26,[\"fileSizeText\"]],false],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"fileInput\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"fileInput\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"emph\"],[13],[11,\"br\",[]],[13],[14],[0,\"Tell us a little about your video.\"],[14],[0,\"\\n                \"],[11,\"div\",[]],[16,\"class\",[34,[\"categories \",[33,[\"if\"],[[28,[\"showCategoryError\"]],\"categories-error\"],null],\" \",[33,[\"if\"],[[28,[\"category\"]],\"\",\"no-category\"],null]]]],[13],[0,\"\\n                  \"],[11,\"select\",[]],[15,\"class\",\"categories-dropdown\"],[16,\"onChange\",[33,[\"action\"],[[28,[null]],\"onCategorySelected\"],null],null],[13],[0,\"\\n                    \"],[11,\"option\",[]],[15,\"value\",\"-1\"],[15,\"disabled\",\"\"],[15,\"selected\",\"\"],[13],[0,\"Select Category\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"categories\"]]],null,{\"statements\":[[0,\"                      \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"category\",\"id\"]]]]],[13],[1,[28,[\"category\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"category\"]},null],[0,\"                  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"category\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"category\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                \"],[14],[0,\"\\n\\n                \"],[1,[33,[\"textarea\"],null,[[\"id\",\"value\",\"class\",\"rows\",\"placeholder\",\"maxlength\"],[\"description\",[28,[\"changeset\",\"description\"]],\"textbox\",3,\"Description (e.g. Watch the lights of the bustling carnival grounds come to life as the sun sinks into the Pacific.)\",\"300\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"description\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"description\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"input-row\"],[13],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"left\"],[13],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"id\",\"value\",\"class\",\"placeholder\",\"maxlength\"],[\"city\",[28,[\"changeset\",\"city\"]],\"textbox\",\"City\",\"50\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"city\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"city\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[15,\"class\",\"left\"],[13],[0,\"\\n                    \"],[1,[33,[\"input\"],null,[[\"id\",\"value\",\"class\",\"placeholder\",\"maxlength\"],[\"state\",[28,[\"changeset\",\"state\"]],\"textbox\",\"State/Province\",\"50\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"state\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"state\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                  \"],[14],[0,\"\\n                  \"],[11,\"div\",[]],[13],[0,\"\\n                    \"],[11,\"select\",[]],[15,\"name\",\"Country\"],[15,\"value\",\"country-selector\"],[15,\"id\",\"country-selector\"],[15,\"placeholder\",\"Country\"],[16,\"onChange\",[33,[\"action\"],[[28,[null]],\"onCountrySelected\"],null],null],[13],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"\"],[15,\"selected\",\"selected\"],[13],[0,\"Select Country\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Afghanistan\"],[15,\"data-alternative-spellings\",\"AF افغانستان\"],[13],[0,\"Afghanistan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Albania\"],[15,\"data-alternative-spellings\",\"AL\"],[13],[0,\"Albania\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Algeria\"],[15,\"data-alternative-spellings\",\"DZ الجزائر\"],[13],[0,\"Algeria\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"American Samoa\"],[15,\"data-alternative-spellings\",\"AS\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"American Samoa\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Andorra\"],[15,\"data-alternative-spellings\",\"AD\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Andorra\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Angola\"],[15,\"data-alternative-spellings\",\"AO\"],[13],[0,\"Angola\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Anguilla\"],[15,\"data-alternative-spellings\",\"AI\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Anguilla\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Antarctica\"],[15,\"data-alternative-spellings\",\"AQ\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Antarctica\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Antigua And Barbuda\"],[15,\"data-alternative-spellings\",\"AG\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Antigua And Barbuda\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Argentina\"],[15,\"data-alternative-spellings\",\"AR\"],[13],[0,\"Argentina\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Armenia\"],[15,\"data-alternative-spellings\",\"AM Հայաստան\"],[13],[0,\"Armenia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Aruba\"],[15,\"data-alternative-spellings\",\"AW\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Aruba\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Australia\"],[15,\"data-alternative-spellings\",\"AU\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Australia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Austria\"],[15,\"data-alternative-spellings\",\"AT Österreich Osterreich Oesterreich \"],[13],[0,\"Austria\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Azerbaijan\"],[15,\"data-alternative-spellings\",\"AZ\"],[13],[0,\"Azerbaijan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bahamas\"],[15,\"data-alternative-spellings\",\"BS\"],[13],[0,\"Bahamas\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bahrain\"],[15,\"data-alternative-spellings\",\"BH البحرين\"],[13],[0,\"Bahrain\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bangladesh\"],[15,\"data-alternative-spellings\",\"BD বাংলাদেশ\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Bangladesh\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Barbados\"],[15,\"data-alternative-spellings\",\"BB\"],[13],[0,\"Barbados\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Belarus\"],[15,\"data-alternative-spellings\",\"BY Беларусь\"],[13],[0,\"Belarus\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Belgium\"],[15,\"data-alternative-spellings\",\"BE België Belgie Belgien Belgique\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Belgium\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Belize\"],[15,\"data-alternative-spellings\",\"BZ\"],[13],[0,\"Belize\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Benin\"],[15,\"data-alternative-spellings\",\"BJ\"],[13],[0,\"Benin\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bermuda\"],[15,\"data-alternative-spellings\",\"BM\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Bermuda\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bhutan\"],[15,\"data-alternative-spellings\",\"BT भूटान\"],[13],[0,\"Bhutan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bolivia\"],[15,\"data-alternative-spellings\",\"BO\"],[13],[0,\"Bolivia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bosnia and Herzegovina\"],[15,\"data-alternative-spellings\",\"BA BiH Bosna i Hercegovina Босна и Херцеговина\"],[13],[0,\"Bosnia and Herzegovina\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Botswana\"],[15,\"data-alternative-spellings\",\"BW\"],[13],[0,\"Botswana\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Brazil\"],[15,\"data-alternative-spellings\",\"BR Brasil\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Brazil\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"British Indian Ocean Territories\"],[15,\"data-alternative-spellings\",\"IO\"],[13],[0,\"British Indian Ocean Territories\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Brunei Darussalam\"],[15,\"data-alternative-spellings\",\"BN\"],[13],[0,\"Brunei Darussalam\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Bulgaria\"],[15,\"data-alternative-spellings\",\"BG България\"],[13],[0,\"Bulgaria\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Burkina Faso\"],[15,\"data-alternative-spellings\",\"BF\"],[13],[0,\"Burkina Faso\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Burundi\"],[15,\"data-alternative-spellings\",\"BI\"],[13],[0,\"Burundi\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cambodia\"],[15,\"data-alternative-spellings\",\"KH កម្ពុជា\"],[13],[0,\"Cambodia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cameroon\"],[15,\"data-alternative-spellings\",\"CM\"],[13],[0,\"Cameroon\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Canada\"],[15,\"data-alternative-spellings\",\"CA\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Canada\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cape Verde\"],[15,\"data-alternative-spellings\",\"CV Cabo\"],[13],[0,\"Cape Verde\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cayman Islands\"],[15,\"data-alternative-spellings\",\"KY\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Cayman Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Central African Republic\"],[15,\"data-alternative-spellings\",\"CF\"],[13],[0,\"Central African Republic\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Chad\"],[15,\"data-alternative-spellings\",\"TD تشاد‎ Tchad\"],[13],[0,\"Chad\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Chile\"],[15,\"data-alternative-spellings\",\"CL\"],[13],[0,\"Chile\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"China\"],[15,\"data-relevancy-booster\",\"3.5\"],[15,\"data-alternative-spellings\",\"CN Zhongguo Zhonghua Peoples Republic 中国/中华\"],[13],[0,\"China\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Christmas Island\"],[15,\"data-alternative-spellings\",\"CX\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Christmas Island\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cocos Islands\"],[15,\"data-alternative-spellings\",\"CC\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Cocos (Keeling) Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Colombia\"],[15,\"data-alternative-spellings\",\"CO\"],[13],[0,\"Colombia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Comoros\"],[15,\"data-alternative-spellings\",\"KM جزر القمر\"],[13],[0,\"Comoros\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Congo\"],[15,\"data-alternative-spellings\",\"CG\"],[13],[0,\"Congo\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Democratic Republic of Congo\"],[15,\"data-alternative-spellings\",\"CD Congo-Brazzaville Repubilika ya Kongo\"],[13],[0,\"Democratic Republic of Congo\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cook Islands\"],[15,\"data-alternative-spellings\",\"CK\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Cook Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Costa Rica\"],[15,\"data-alternative-spellings\",\"CR\"],[13],[0,\"Costa Rica\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ivory Coast\"],[15,\"data-alternative-spellings\",\"CI Cote dIvoire\"],[13],[0,\"Côte d'Ivoire\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Croatia\"],[15,\"data-alternative-spellings\",\"HR Hrvatska\"],[13],[0,\"Croatia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cuba\"],[15,\"data-alternative-spellings\",\"CU\"],[13],[0,\"Cuba\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Cyprus\"],[15,\"data-alternative-spellings\",\"CY Κύπρος Kýpros Kıbrıs\"],[13],[0,\"Cyprus\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Czech Republic\"],[15,\"data-alternative-spellings\",\"CZ Česká Ceska\"],[13],[0,\"Czech Republic\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Denmark\"],[15,\"data-alternative-spellings\",\"DK Danmark\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Denmark\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Djibouti\"],[15,\"data-alternative-spellings\",\"DJ جيبوتي‎ Jabuuti Gabuuti\"],[13],[0,\"Djibouti\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Dominica\"],[15,\"data-alternative-spellings\",\"DM Dominique\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Dominica\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Dominican Republic\"],[15,\"data-alternative-spellings\",\"DO\"],[13],[0,\"Dominican Republic\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ecuador\"],[15,\"data-alternative-spellings\",\"EC\"],[13],[0,\"Ecuador\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Egypt\"],[15,\"data-alternative-spellings\",\"EG\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Egypt\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"El Salvador\"],[15,\"data-alternative-spellings\",\"SV\"],[13],[0,\"El Salvador\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Equatorial Guinea\"],[15,\"data-alternative-spellings\",\"GQ\"],[13],[0,\"Equatorial Guinea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Eritrea\"],[15,\"data-alternative-spellings\",\"ER إرتريا ኤርትራ\"],[13],[0,\"Eritrea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Estonia\"],[15,\"data-alternative-spellings\",\"EE Eesti\"],[13],[0,\"Estonia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ethiopia\"],[15,\"data-alternative-spellings\",\"ET ኢትዮጵያ\"],[13],[0,\"Ethiopia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Falkland Islands\"],[15,\"data-alternative-spellings\",\"FK\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Falkland Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Faroe Islands\"],[15,\"data-alternative-spellings\",\"FO Føroyar Færøerne\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Faroe Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Fiji\"],[15,\"data-alternative-spellings\",\"FJ Viti फ़िजी\"],[13],[0,\"Fiji\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Finland\"],[15,\"data-alternative-spellings\",\"FI Suomi\"],[13],[0,\"Finland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"France\"],[15,\"data-alternative-spellings\",\"FR République française\"],[15,\"data-relevancy-booster\",\"2.5\"],[13],[0,\"France\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"French Guiana\"],[15,\"data-alternative-spellings\",\"GF\"],[13],[0,\"French Guiana\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"French Polynesia\"],[15,\"data-alternative-spellings\",\"PF Polynésie française\"],[13],[0,\"French Polynesia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"French Southern Territories\"],[15,\"data-alternative-spellings\",\"TF\"],[13],[0,\"French Southern Territories\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Gabon\"],[15,\"data-alternative-spellings\",\"GA République Gabonaise\"],[13],[0,\"Gabon\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Gambia\"],[15,\"data-alternative-spellings\",\"GM\"],[13],[0,\"Gambia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Gaza\"],[15,\"data-alternative-spellings\",\"GZ\"],[13],[0,\"Gaza\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Georgia\"],[15,\"data-alternative-spellings\",\"GE საქართველო\"],[13],[0,\"Georgia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Germany\"],[15,\"data-alternative-spellings\",\"DE Bundesrepublik Deutschland\"],[15,\"data-relevancy-booster\",\"3\"],[13],[0,\"Germany\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ghana\"],[15,\"data-alternative-spellings\",\"GH\"],[13],[0,\"Ghana\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Gibraltar\"],[15,\"data-alternative-spellings\",\"GI\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Gibraltar\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Greece\"],[15,\"data-alternative-spellings\",\"GR Ελλάδα\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Greece\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Greenland\"],[15,\"data-alternative-spellings\",\"GL grønland\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Greenland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Grenada\"],[15,\"data-alternative-spellings\",\"GD\"],[13],[0,\"Grenada\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guadeloupe\"],[15,\"data-alternative-spellings\",\"GP\"],[13],[0,\"Guadeloupe\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guam\"],[15,\"data-alternative-spellings\",\"GU\"],[13],[0,\"Guam\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guatemala\"],[15,\"data-alternative-spellings\",\"GT\"],[13],[0,\"Guatemala\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guinea\"],[15,\"data-alternative-spellings\",\"GN\"],[13],[0,\"Guinea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guinea-Bissau\"],[15,\"data-alternative-spellings\",\"GW\"],[13],[0,\"Guinea-Bissau\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Guyana\"],[15,\"data-alternative-spellings\",\"GY\"],[13],[0,\"Guyana\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Haiti\"],[15,\"data-alternative-spellings\",\"HT\"],[13],[0,\"Haiti\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Vatican\"],[15,\"data-alternative-spellings\",\"VA\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Holy See (Vatican City State)\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Honduras\"],[15,\"data-alternative-spellings\",\"HN\"],[13],[0,\"Honduras\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Hong Kong\"],[15,\"data-alternative-spellings\",\"HK 香港\"],[13],[0,\"Hong Kong\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Hungary\"],[15,\"data-alternative-spellings\",\"HU Magyarország\"],[13],[0,\"Hungary\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Iceland\"],[15,\"data-alternative-spellings\",\"IS Island\"],[13],[0,\"Iceland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"India\"],[15,\"data-alternative-spellings\",\"IN भारत गणराज्य Hindustan\"],[15,\"data-relevancy-booster\",\"3\"],[13],[0,\"India\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Indonesia\"],[15,\"data-alternative-spellings\",\"ID\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Indonesia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Iran\"],[15,\"data-alternative-spellings\",\"IR ایران\"],[13],[0,\"Iran, Islamic Republic of\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Iraq\"],[15,\"data-alternative-spellings\",\"IQ العراق‎\"],[13],[0,\"Iraq\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ireland\"],[15,\"data-alternative-spellings\",\"IE Éire\"],[15,\"data-relevancy-booster\",\"1.2\"],[13],[0,\"Ireland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Isle of Man\"],[15,\"data-alternative-spellings\",\"IM\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Isle of Man\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Israel\"],[15,\"data-alternative-spellings\",\"IL إسرائيل ישראל\"],[13],[0,\"Israel\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Italy\"],[15,\"data-alternative-spellings\",\"IT Italia\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Italy\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Jamaica\"],[15,\"data-alternative-spellings\",\"JM\"],[13],[0,\"Jamaica\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Japan\"],[15,\"data-alternative-spellings\",\"JP Nippon Nihon 日本\"],[15,\"data-relevancy-booster\",\"2.5\"],[13],[0,\"Japan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Jersey\"],[15,\"data-alternative-spellings\",\"JE\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Jersey\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Jordan\"],[15,\"data-alternative-spellings\",\"JO الأردن\"],[13],[0,\"Jordan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Kazakhstan\"],[15,\"data-alternative-spellings\",\"KZ Қазақстан Казахстан\"],[13],[0,\"Kazakhstan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Kenya\"],[15,\"data-alternative-spellings\",\"KE\"],[13],[0,\"Kenya\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"North Korea\"],[15,\"data-alternative-spellings\",\"KP North Korea\"],[13],[0,\"North Korea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"South Korea\"],[15,\"data-alternative-spellings\",\"KR South Korea\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"South Korea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Kuwait\"],[15,\"data-alternative-spellings\",\"KW الكويت\"],[13],[0,\"Kuwait\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Kyrgyzstan\"],[15,\"data-alternative-spellings\",\"KG Кыргызстан\"],[13],[0,\"Kyrgyzstan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Laos\"],[15,\"data-alternative-spellings\",\"LA\"],[13],[0,\"Laos\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Latvia\"],[15,\"data-alternative-spellings\",\"LV Latvija\"],[13],[0,\"Latvia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Lebanon\"],[15,\"data-alternative-spellings\",\"LB لبنان\"],[13],[0,\"Lebanon\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Lesotho\"],[15,\"data-alternative-spellings\",\"LS\"],[13],[0,\"Lesotho\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Liberia\"],[15,\"data-alternative-spellings\",\"LR\"],[13],[0,\"Liberia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Libya\"],[15,\"data-alternative-spellings\",\"LY ليبيا\"],[13],[0,\"Libya\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Liechtenstein\"],[15,\"data-alternative-spellings\",\"LI\"],[13],[0,\"Liechtenstein\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Lithuania\"],[15,\"data-alternative-spellings\",\"LT Lietuva\"],[13],[0,\"Lithuania\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Luxembourg\"],[15,\"data-alternative-spellings\",\"LU\"],[13],[0,\"Luxembourg\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Macau\"],[15,\"data-alternative-spellings\",\"MO\"],[13],[0,\"Macau\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Macedonia\"],[15,\"data-alternative-spellings\",\"MK Македонија\"],[13],[0,\"Macedonia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Madagascar\"],[15,\"data-alternative-spellings\",\"MG Madagasikara\"],[13],[0,\"Madagascar\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Malawi\"],[15,\"data-alternative-spellings\",\"MW\"],[13],[0,\"Malawi\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Malaysia\"],[15,\"data-alternative-spellings\",\"MY\"],[13],[0,\"Malaysia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Maldives\"],[15,\"data-alternative-spellings\",\"MV\"],[13],[0,\"Maldives\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mali\"],[15,\"data-alternative-spellings\",\"ML\"],[13],[0,\"Mali\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Malta\"],[15,\"data-alternative-spellings\",\"MT\"],[13],[0,\"Malta\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Martinique\"],[15,\"data-alternative-spellings\",\"MQ\"],[13],[0,\"Martinique\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mauritania\"],[15,\"data-alternative-spellings\",\"MR الموريتانية\"],[13],[0,\"Mauritania\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mauritius\"],[15,\"data-alternative-spellings\",\"MU\"],[13],[0,\"Mauritius\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mexico\"],[15,\"data-alternative-spellings\",\"MX Mexicanos\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Mexico\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Moldova\"],[15,\"data-alternative-spellings\",\"MD\"],[13],[0,\"Moldova\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Monaco\"],[15,\"data-alternative-spellings\",\"MC\"],[13],[0,\"Monaco\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mongolia\"],[15,\"data-alternative-spellings\",\"MN Mongγol ulus Монгол улс\"],[13],[0,\"Mongolia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Montenegro\"],[15,\"data-alternative-spellings\",\"ME\"],[13],[0,\"Montenegro\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Montserrat\"],[15,\"data-alternative-spellings\",\"MS\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Montserrat\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Morocco\"],[15,\"data-alternative-spellings\",\"MA المغرب\"],[13],[0,\"Morocco\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Mozambique\"],[15,\"data-alternative-spellings\",\"MZ Moçambique\"],[13],[0,\"Mozambique\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Myanmar\"],[15,\"data-alternative-spellings\",\"MM\"],[13],[0,\"Myanmar\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Namibia\"],[15,\"data-alternative-spellings\",\"NA Namibië\"],[13],[0,\"Namibia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Nepal\"],[15,\"data-alternative-spellings\",\"NP नेपाल\"],[13],[0,\"Nepal\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Netherlands\"],[15,\"data-alternative-spellings\",\"NL Holland Nederland\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Netherlands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"New Zealand\"],[15,\"data-alternative-spellings\",\"NZ Aotearoa\"],[13],[0,\"New Zealand\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Nicaragua\"],[15,\"data-alternative-spellings\",\"NI\"],[13],[0,\"Nicaragua\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Niger\"],[15,\"data-alternative-spellings\",\"NE Nijar\"],[13],[0,\"Niger\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Nigeria\"],[15,\"data-alternative-spellings\",\"NG Nijeriya Naíjíríà\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Nigeria\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Norway\"],[15,\"data-alternative-spellings\",\"NO Norge Noreg\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Norway\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Oman\"],[15,\"data-alternative-spellings\",\"OM عمان\"],[13],[0,\"Oman\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Pakistan\"],[15,\"data-alternative-spellings\",\"PK پاکستان\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Pakistan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Palau\"],[15,\"data-alternative-spellings\",\"PW\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Palau\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Palestinian Territory, Occupied\"],[15,\"data-alternative-spellings\",\"PS فلسطين\"],[13],[0,\"Palestinian Territory, Occupied\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Panama\"],[15,\"data-alternative-spellings\",\"PA\"],[13],[0,\"Panama\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Papua New Guinea\"],[15,\"data-alternative-spellings\",\"PG\"],[13],[0,\"Papua New Guinea\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Paraguay\"],[15,\"data-alternative-spellings\",\"PY\"],[13],[0,\"Paraguay\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Peru\"],[15,\"data-alternative-spellings\",\"PE\"],[13],[0,\"Peru\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Philippines\"],[15,\"data-alternative-spellings\",\"PH Pilipinas\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Philippines\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Poland\"],[15,\"data-alternative-spellings\",\"PL Polska\"],[15,\"data-relevancy-booster\",\"1.25\"],[13],[0,\"Poland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Portugal\"],[15,\"data-alternative-spellings\",\"PT Portuguesa\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Portugal\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Puerto Rico\"],[15,\"data-alternative-spellings\",\"PR\"],[13],[0,\"Puerto Rico\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Qatar\"],[15,\"data-alternative-spellings\",\"QA قطر\"],[13],[0,\"Qatar\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Reunion\"],[15,\"data-alternative-spellings\",\"RE Reunion\"],[13],[0,\"Reunion\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Romania\"],[15,\"data-alternative-spellings\",\"RO Rumania Roumania România\"],[13],[0,\"Romania\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Russia\"],[15,\"data-alternative-spellings\",\"RU Rossiya Российская Россия\"],[15,\"data-relevancy-booster\",\"2.5\"],[13],[0,\"Russia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Rwanda\"],[15,\"data-alternative-spellings\",\"RW\"],[13],[0,\"Rwanda\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Helena\"],[15,\"data-alternative-spellings\",\"SH St.\"],[13],[0,\"Saint Helena\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Kitts and Nevis\"],[15,\"data-alternative-spellings\",\"KN St.\"],[13],[0,\"Saint Kitts and Nevis\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Lucia\"],[15,\"data-alternative-spellings\",\"LC St.\"],[13],[0,\"Saint Lucia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Martin\"],[15,\"data-alternative-spellings\",\"MF St.\"],[13],[0,\"Saint Martin (French Part)\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Pierre and Miquelon\"],[15,\"data-alternative-spellings\",\"PM St.\"],[13],[0,\"Saint Pierre and Miquelon\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saint Vincent and The Grenadines\"],[15,\"data-alternative-spellings\",\"VC St.\"],[13],[0,\"Saint Vincent and The Grenadines\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"San Marino\"],[15,\"data-alternative-spellings\",\"SM RSM Repubblica\"],[13],[0,\"San Marino\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Sao Tome and Principe\"],[15,\"data-alternative-spellings\",\"ST\"],[13],[0,\"Sao Tome and Principe\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Saudi Arabia\"],[15,\"data-alternative-spellings\",\"SA السعودية\"],[13],[0,\"Saudi Arabia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Senegal\"],[15,\"data-alternative-spellings\",\"SN Sénégal\"],[13],[0,\"Senegal\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Seychelles\"],[15,\"data-alternative-spellings\",\"SC\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Seychelles\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Sierra Leone\"],[15,\"data-alternative-spellings\",\"SL\"],[13],[0,\"Sierra Leone\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Singapore\"],[15,\"data-alternative-spellings\",\"SG Singapura  சிங்கப்பூர் குடியரசு 新加坡共和国\"],[13],[0,\"Singapore\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Slovakia\"],[15,\"data-alternative-spellings\",\"SK Slovenská Slovensko\"],[13],[0,\"Slovakia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Slovenia\"],[15,\"data-alternative-spellings\",\"SI Slovenija\"],[13],[0,\"Slovenia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Solomon Islands\"],[15,\"data-alternative-spellings\",\"SB\"],[13],[0,\"Solomon Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Somalia\"],[15,\"data-alternative-spellings\",\"SO الصومال\"],[13],[0,\"Somalia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"South Africa\"],[15,\"data-alternative-spellings\",\"ZA RSA Suid-Afrika\"],[13],[0,\"South Africa\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"South Georgia and The South Sandwich Islands\"],[15,\"data-alternative-spellings\",\"GS\"],[13],[0,\"South Georgia and The South Sandwich Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Spain\"],[15,\"data-alternative-spellings\",\"ES España\"],[15,\"data-relevancy-booster\",\"2\"],[13],[0,\"Spain\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Sri Lanka\"],[15,\"data-alternative-spellings\",\"LK ශ්‍රී ලංකා இலங்கை Ceylon\"],[13],[0,\"Sri Lanka\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Sudan\"],[15,\"data-alternative-spellings\",\"SD السودان\"],[13],[0,\"Sudan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Suriname\"],[15,\"data-alternative-spellings\",\"SR शर्नम् Sarnam Sranangron\"],[13],[0,\"Suriname\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Swaziland\"],[15,\"data-alternative-spellings\",\"SZ weSwatini Swatini Ngwane\"],[13],[0,\"Swaziland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Sweden\"],[15,\"data-alternative-spellings\",\"SE Sverige\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Sweden\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Switzerland\"],[15,\"data-alternative-spellings\",\"CH Swiss Confederation Schweiz Suisse Svizzera Svizra\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Switzerland\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Syria\"],[15,\"data-alternative-spellings\",\"SY Syria سورية\"],[13],[0,\"Syria\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Taiwan\"],[15,\"data-alternative-spellings\",\"TW 台灣 臺灣\"],[13],[0,\"Taiwan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Tajikistan\"],[15,\"data-alternative-spellings\",\"TJ Тоҷикистон Toçikiston\"],[13],[0,\"Tajikistan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Tanzania\"],[15,\"data-alternative-spellings\",\"TZ\"],[13],[0,\"Tanzania\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Thailand\"],[15,\"data-alternative-spellings\",\"TH ประเทศไทย Prathet Thai\"],[13],[0,\"Thailand\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Togo\"],[15,\"data-alternative-spellings\",\"TG Togolese\"],[13],[0,\"Togo\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Tonga\"],[15,\"data-alternative-spellings\",\"TO\"],[13],[0,\"Tonga\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Trinidad And Tobago\"],[15,\"data-alternative-spellings\",\"TT\"],[13],[0,\"Trinidad And Tobago\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Tunisia\"],[15,\"data-alternative-spellings\",\"TN تونس\"],[13],[0,\"Tunisia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Turkey\"],[15,\"data-alternative-spellings\",\"TR Türkiye Turkiye\"],[13],[0,\"Turkey\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Turkmenistan\"],[15,\"data-alternative-spellings\",\"TM Türkmenistan\"],[13],[0,\"Turkmenistan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Turks and Caicos Islands\"],[15,\"data-alternative-spellings\",\"TC\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Turks and Caicos Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Tuvalu\"],[15,\"data-alternative-spellings\",\"TV\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Tuvalu\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Uganda\"],[15,\"data-alternative-spellings\",\"UG\"],[13],[0,\"Uganda\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Ukraine\"],[15,\"data-alternative-spellings\",\"UA Ukrayina Україна\"],[13],[0,\"Ukraine\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"United Arab Emirates\"],[15,\"data-alternative-spellings\",\"AE UAE الإمارات\"],[13],[0,\"United Arab Emirates\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"United Kingdom\"],[15,\"data-alternative-spellings\",\"GB Great Britain England UK Wales Scotland Northern Ireland\"],[15,\"data-relevancy-booster\",\"2.5\"],[13],[0,\"United Kingdom\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"United States\"],[15,\"data-relevancy-booster\",\"3.5\"],[15,\"data-alternative-spellings\",\"US USA United States of America\"],[13],[0,\"United States\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"United States Minor Outlying Islands\"],[15,\"data-alternative-spellings\",\"UM\"],[13],[0,\"United States Minor Outlying Islands\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Uruguay\"],[15,\"data-alternative-spellings\",\"UY\"],[13],[0,\"Uruguay\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Uzbekistan\"],[15,\"data-alternative-spellings\",\"UZ Ўзбекистон O'zbekstan O‘zbekiston\"],[13],[0,\"Uzbekistan\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Vanuatu\"],[15,\"data-alternative-spellings\",\"VU\"],[13],[0,\"Vanuatu\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Venezuela\"],[15,\"data-alternative-spellings\",\"VE\"],[13],[0,\"Venezuela\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Vietnam\"],[15,\"data-alternative-spellings\",\"VN Việt Nam\"],[15,\"data-relevancy-booster\",\"1.5\"],[13],[0,\"Vietnam\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Virgin Islands, British\"],[15,\"data-alternative-spellings\",\"VG\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Virgin Islands, British\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Virgin Islands, U.S.\"],[15,\"data-alternative-spellings\",\"VI\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Virgin Islands, U.S.\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Wallis and Futuna\"],[15,\"data-alternative-spellings\",\"WF\"],[15,\"data-relevancy-booster\",\"0.5\"],[13],[0,\"Wallis and Futuna\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Western Sahara\"],[15,\"data-alternative-spellings\",\"EH لصحراء الغربية\"],[13],[0,\"Western Sahara\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Yemen\"],[15,\"data-alternative-spellings\",\"YE اليمن\"],[13],[0,\"Yemen\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Zambia\"],[15,\"data-alternative-spellings\",\"ZM\"],[13],[0,\"Zambia\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Zimbabwe\"],[15,\"data-alternative-spellings\",\"ZW\"],[13],[0,\"Zimbabwe\"],[14],[0,\"\\n                      \"],[11,\"option\",[]],[15,\"value\",\"Unspecified\"],[15,\"data-alternative-spellings\",\"Other Not Listed\"],[13],[0,\"Unspecified\"],[14],[0,\"\\n                    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"country\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"country\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"upload-form-section\"],[13],[11,\"span\",[]],[15,\"class\",\"emph\"],[13],[0,\"Video Thumbnail\"],[14],[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"optional\"],[13],[0,\"Optional\"],[14],[0,\"\\n                  \"],[11,\"br\",[]],[13],[14],[0,\"\\n                  Pick a timecode to select which still image represents your video best.\\n                \"],[14],[0,\"\\n                \"],[1,[33,[\"input\"],null,[[\"class\",\"value\",\"id\",\"placeholder\",\"maxlength\"],[\"textbox video-thumbnail\",[28,[\"changeset\",\"timecode\"]],\"timecode\",\"e.g. 00:15\",5]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"timecode\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"timecode\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"upload-form-section\"],[13],[11,\"span\",[]],[15,\"class\",\"emph\"],[13],[0,\"Tags:\"],[14],[0,\" (Minimum 5, comma-separated)  \"],[11,\"span\",[]],[15,\"class\",\"optional\"],[13],[0,\"Required\"],[14],[0,\" \"],[11,\"br\",[]],[13],[14],[0,\"\\n                  What keywords might someone search to find your video? \"],[11,\"br\",[]],[13],[14],[0,\"The more tags, the better!\\n                \"],[14],[0,\"\\n                \"],[1,[33,[\"textarea\"],null,[[\"id\",\"class\",\"placeholder\",\"value\"],[\"tags\",\"textbox\",\"e.g. Sunset, Coastal, Ferris Wheel, Carnival, Pier, Los Angeles\",[28,[\"changeset\",\"tags\"]]]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"tags\"],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"tags\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"textbox-error\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null],[0,\"\\n                \"],[11,\"div\",[]],[15,\"class\",\"submit-button hand-cursor\"],[5,[\"action\"],[[28,[null]],\"createMission\"]],[13],[0,\"\\n                  \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/getty/submit_button.png\"],[13],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"img\",[]],[15,\"class\",\"visible-xs\"],[15,\"src\",\"/assets/images/getty/Upload_BottomBg_mobile.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/getty-mission.hbs" } });
});
define("pilots/templates/components/image-asset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7p434e3h", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"asset-wrapper \",[33,[\"if\"],[[28,[\"image\",\"isSelected\"]],\"selected\"],null]]]],[16,\"data-asset-id\",[34,[[28,[\"image\",\"id\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"listView\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"file-information\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"image\",\"file\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"image\",\"file\",\"progress\"]],100],null]],null,{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"checkmark icon-Checkmark_b status-icon\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"loader-status status-icon\"],[13],[0,\"Loading...\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"checkmark icon-Checkmark_b status-icon\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"list-view-row\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"list-view-filename d-inline-block\"],[13],[1,[28,[\"image\",\"name\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"image\",\"isMissingGpsInfo\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"missing-gps-info d-inline-block\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"progress-percent\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"image\",\"file\"]]],null,{\"statements\":[[0,\"          \"],[1,[33,[\"human-readable-filesize\"],[[33,[\"multiplication\"],[[33,[\"division\"],[[28,[\"image\",\"file\",\"progress\"]],100],null],[28,[\"image\",\"file\",\"content\",\"size\"]]],null]],null],false],[0,\" of \"],[1,[33,[\"human-readable-filesize\"],[[28,[\"image\",\"file\",\"content\",\"size\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"span\",[]],[15,\"class\",\"uploaded-text\"],[13],[0,\"Uploaded\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"delete-asset\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"delete-asset btn icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"deleteAsset\",[28,[\"image\"]]],[[\"bubbles\"],[false]]],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"image\",\"generatingNativeThumbnail\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"processing-wrapper\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"class\",\"loading\"],[15,\"src\",\"assets/images/Circle-Loading-Progress.gif\"],[13],[14],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"image\",\"processing\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[16,\"alt\",[34,[[28,[\"image\",\"name\"]]]]],[15,\"class\",\"processing-wrapper asset\"],[16,\"style\",[34,[\"background-image:url(\",[28,[\"image\",\"nativeThumbnail\"]],\")\"]]],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"progressMeter\"],[16,\"style\",[34,[\"width: \",[28,[\"image\",\"file\",\"progress\"]],\"%;\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"div\",[]],[16,\"alt\",[34,[[28,[\"image\",\"name\"]]]]],[15,\"class\",\"asset\"],[16,\"style\",[34,[\"background-image:url(\",[28,[\"image\",\"version_urls\",\"small_640\"]],\")\"]]],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"progressMeter\"],[16,\"style\",[34,[\"width: \",[28,[\"image\",\"file\",\"progress\"]],\"%;\"]]],[13],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"table-filename\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"image\",\"isMissingGpsInfo\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"missing-gps-info d-inline-block\"],[13],[11,\"i\",[]],[15,\"class\",\"fa fa-warning\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"name d-inline-block\"],[13],[1,[28,[\"image\",\"name\"]],false],[14],[0,\"\\n      \"],[11,\"a\",[]],[15,\"class\",\"delete-asset btn icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"deleteAsset\",[28,[\"image\"]]],[[\"bubbles\"],[false]]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/image-asset.hbs" } });
});
define("pilots/templates/components/input-inplace-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Z+8BcfTS", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isEditing\"]]],null,{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"field-label\"],[13],[1,[26,[\"placeholder\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"typeTextArea\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"textarea-trigger-save\"],null,[[\"value\"],[[28,[\"value\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[1,[33,[\"input-trigger-save\"],null,[[\"type\",\"value\"],[[28,[\"type\"]],[28,[\"value\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"inline-input\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"value\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"typeTextArea\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"md-text\"],[[28,[\"value\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[26,[\"value\"]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"placeholder\"],[13],[0,\"\\n        \"],[1,[26,[\"placeholder\"]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-pencil\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/input-inplace-edit.hbs" } });
});
define("pilots/templates/components/input-trigger-save", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Txyl+mwc", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/input-trigger-save.hbs" } });
});
define("pilots/templates/components/input-validated", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kGJr8ejz", "block": "{\"statements\":[[6,[\"each\"],[[28,[\"modelErrors\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[1,[28,[\"error\",\"message\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[6,[\"if\"],[[28,[\"showError\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[1,[26,[\"errors\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[1,[33,[\"input\"],[[33,[\"-input-type\"],[[28,[\"type\"]]],null]],[[\"value\",\"focus-out\",\"type\",\"class\",\"placeholder\",\"maxlength\"],[[28,[\"value\"]],\"showErrors\",[28,[\"type\"]],\"form-control input-lg {{if modelErrors.length ''error}}\",[28,[\"placeholder\"]],[28,[\"maxlength\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/input-validated.hbs" } });
});
define("pilots/templates/components/login-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6WZtuNla", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"login-form container-fluid container-main container-top\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4 container-content\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[16,\"href\",[26,[\"homeUrl\"]],null],[15,\"class\",\"close-button icon-Xmark\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"page-header\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/DB_logo_LoginPage.png\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"changeset\",\"error\",\"authentication\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"error text-center\"],[13],[1,[28,[\"changeset\",\"error\",\"authentication\",\"validation\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\"],[\"identification\",[28,[\"changeset\"]],\"Email\",\"email\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group form-password\"],[13],[0,\"\\n          \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\"],[\"password\",[28,[\"changeset\"]],\"Password\",\"password\"]]],false],[0,\"\\n          \"],[11,\"small\",[]],[13],[6,[\"link-to\"],[\"request-password-reset\"],[[\"class\"],[\"forgot-password\"]],{\"statements\":[[0,\"Forgot password?\"]],\"locals\":[]},null],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group buttons\"],[13],[0,\"\\n          \"],[11,\"button\",[]],[15,\"class\",\"login-button\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"save\"],null],null],[16,\"disabled\",[26,[\"buttonDisabled\"]],null],[13],[1,[26,[\"buttonName\"]],false],[14],[0,\"\\n          \"],[6,[\"link-to\"],[\"pilot.new\"],[[\"class\"],[\"signup-button\"]],{\"statements\":[[0,\"SIGN UP\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/login-form.hbs" } });
});
define("pilots/templates/components/mission-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "BCYucMWK", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"map-wrapper\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"id\",\"map-canvas\"],[13],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"clientNotes\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"client-notes\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"down-arrow\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"client-title\"],[5,[\"action\"],[[28,[null]],\"toggleClientNotes\"]],[13],[0,\"\\n        \"],[11,\"span\",[]],[16,\"class\",[34,[\"arrow \",[33,[\"if\"],[[28,[\"clientNotesVisible\"]],\"icon-Arrow2_up\",\"icon-Arrow2_down\"],null]]]],[13],[14],[0,\"\\n        Client Notes\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Bubble_b\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"client-notes-wrapper \",[33,[\"unless\"],[[28,[\"clientNotesVisible\"]],\"shrink\"],null]]]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"clientNotes\"]]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[16,\"class\",[34,[\"client-note id-\",[28,[\"note\",\"id\"]]]]],[16,\"data-id\",[28,[\"note\",\"id\"]],null],[13],[0,\"\\n            \"],[11,\"div\",[]],[13],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"bubble icon-Bubble_a\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"bubble icon-Bubble_b\"],[13],[14],[0,\"\\n              \"],[11,\"span\",[]],[15,\"class\",\"note-id\"],[13],[1,[28,[\"note\",\"id\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[1,[28,[\"note\",\"name\"]],false],[11,\"br\",[]],[13],[14],[1,[28,[\"note\",\"notes\"]],false],[14],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[\"note\"]},null],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[16,\"class\",[34,[\"kml-button \",[33,[\"if\"],[[33,[\"is-mobile\"],null,null],\"hidden\"],null]]]],[13],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"white-button\"],[16,\"disabled\",[33,[\"if\"],[[33,[\"or\"],[[33,[\"is-not\"],[[28,[\"mission\",\"location\",\"properties\"]]],null],[33,[\"is-not\"],[[28,[\"mission\",\"location\",\"properties\",\"features\"]]],null]],null],true,false],null],null],[5,[\"action\"],[[28,[null]],\"downloadKML\"]],[13],[0,\"DOWNLOAD KML\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/mission-map.hbs" } });
});
define("pilots/templates/components/mission-scheduled-at-time", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5UNeSIin", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"sameStartEndTime\"]]],null,{\"statements\":[[0,\" at \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"format\",\"timezone\"],[[28,[\"model\",\"scheduled_at_start\"]],\"hh:mmA z\",[28,[\"model\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"between \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"timezone\"],[[28,[\"model\",\"scheduled_at_start\"]],[28,[\"model\",\"location\",\"timezone_id\"]]]]],false],[0,\" -\\n\"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"format\",\"timezone\"],[[28,[\"model\",\"scheduled_at_end\"]],\"hh:mmA z\",[28,[\"model\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/mission-scheduled-at-time.hbs" } });
});
define("pilots/templates/components/mission-weather-forecast", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RbZzayth", "block": "{\"statements\":[[11,\"div\",[]],[13],[0,\"\\n  \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"closeButton\"]]],null,{\"statements\":[[0,\"    \"],[11,\"span\",[]],[15,\"class\",\"icon-Xmark weather-close-button\"],[5,[\"action\"],[[28,[null]],\"hideWeather\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"weather-forecast-title\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasForecast\"]]],null,{\"statements\":[[0,\"        Weather Forecast\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"loading\"]]],null,{\"statements\":[[0,\"        Fetching weather...\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        No weather available.\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"hasForecast\"]]],null,{\"statements\":[[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"dayForecastData\"]]],null,{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"weather-forecast-table\"],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td\"],[15,\"rowspan\",\"2\"],[13],[0,\"\\n        \"],[1,[33,[\"weather-icon\"],null,[[\"icon\",\"width\"],[[28,[\"dayForecastData\",\"icon\"]],100]]],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[28,[\"dayForecastData\",\"summary\"]],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td small\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"weather-forecast-label\"],[13],[0,\"chance of rain\"],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"dayForecastData\",\"precipProbability\"]]],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td small left-border\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"weather-forecast-label\"],[13],[0,\"cloud cover\"],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"dayForecastData\",\"cloudCover\"]]],null],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"weather-forecast-label\"],[13],[0,\"temperature\"],[14],[0,\"\\n        \"],[1,[33,[\"temperature\"],[[28,[\"dayForecastData\",\"temperatureMin\"]],\"F\"],null],false],[0,\" / \"],[1,[33,[\"temperature\"],[[28,[\"dayForecastData\",\"temperatureMax\"]],\"F\"],null],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td small\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"weather-forecast-label\"],[13],[0,\"wind speed\"],[14],[0,\"\\n        \"],[1,[28,[\"dayForecastData\",\"windSpeed\"]],false],[0,\" mph\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"hourlyForecastData\"]]],null,{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"weather-forecast-table\"],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"hourlyForecastData\"]]],null,{\"statements\":[[0,\"      \"],[11,\"td\",[]],[15,\"class\",\"weather-forecast-td\"],[13],[0,\"\\n        \"],[1,[33,[\"moment-format-unix\"],[[28,[\"forecast\",\"time\"]],\"h A\"],null],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"weather-icon\"],null,[[\"icon\",\"width\"],[[28,[\"forecast\",\"icon\"]],50]]],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"temperature\"],[[28,[\"forecast\",\"temperature\"]],\"F\"],null],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"forecast\",\"precipProbability\"]]],null],false],[0,\" rain\"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"forecast\",\"cloudCover\"]]],null],false],[0,\" cloudy\"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[28,[\"forecast\",\"windSpeed\"]],false],[0,\" mph wind\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"forecast\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"threeDayForecastData\"]]],null,{\"statements\":[[0,\"  \"],[11,\"table\",[]],[15,\"class\",\"weather-forecast-table\"],[13],[0,\"\\n    \"],[11,\"tr\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"threeDayForecastData\"]]],null,{\"statements\":[[0,\"      \"],[11,\"td\",[]],[16,\"class\",[34,[\"weather-forecast-td \",[33,[\"if\"],[[33,[\"is-equal\"],[[33,[\"moment-format-unix\"],[[28,[\"forecast\",\"time\"]],\"D\"],null],[33,[\"moment-format\"],[[28,[\"model\",\"scheduled_at\"]],\"D\"],[[\"timeZone\"],[[28,[\"model\",\"location\",\"timezone_id\"]]]]]],null],\"current\"],null]]]],[13],[0,\"\\n        \"],[1,[33,[\"moment-format-unix\"],[[28,[\"forecast\",\"time\"]],\"M/D\"],null],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"weather-icon\"],null,[[\"icon\",\"width\"],[[28,[\"forecast\",\"icon\"]],50]]],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"temperature\"],[[28,[\"forecast\",\"temperatureMin\"]],\"F\"],null],false],[0,\"/\"],[1,[33,[\"temperature\"],[[28,[\"forecast\",\"temperatureMax\"]],\"F\"],null],false],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"forecast\",\"precipProbability\"]]],null],false],[0,\" rain\"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"decimal-to-percent\"],[[28,[\"forecast\",\"cloudCover\"]]],null],false],[0,\" cloudy\"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[28,[\"forecast\",\"windSpeed\"]],false],[0,\" mph wind\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"forecast\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/mission-weather-forecast.hbs" } });
});
define('pilots/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _emberModalDialogTemplatesComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsModalDialog['default'];
    }
  });
});
define("pilots/templates/components/moment-format-local-date", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "x0Lu42qe", "block": "{\"statements\":[[1,[33,[\"moment-format\"],[[28,[\"model\",\"scheduled_at_start\"]],[28,[\"format\"]]],[[\"timeZone\"],[[28,[\"model\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/moment-format-local-date.hbs" } });
});
define("pilots/templates/components/moment-format-local-time", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "C+GU+kIj", "block": "{\"statements\":[[1,[26,[\"localTime\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/moment-format-local-time.hbs" } });
});
define("pilots/templates/components/notification-dropdown", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cdbprHBg", "block": "{\"statements\":[[11,\"td\",[]],[16,\"class\",[34,[\"notification-list notification-list-icon \",[26,[\"read\"]]]]],[13],[0,\"\\n  \"],[11,\"img\",[]],[16,\"src\",[34,[[26,[\"icon\"]]]]],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"td\",[]],[15,\"class\",\"notification-list notification-list-content\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"notification-list-content-title \",[26,[\"read\"]]]]],[13],[0,\"\\n    \"],[1,[28,[\"model\",\"title\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"notification-list-content-message \",[26,[\"read\"]]]]],[13],[0,\"\\n    \"],[1,[28,[\"model\",\"body\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"notification-list-content-time\"],[13],[0,\"\\n    \"],[1,[33,[\"moment-format\"],[[28,[\"model\",\"created_at\"]],\"dddd, MMMM Do, YYYY\"],null],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/notification-dropdown.hbs" } });
});
define("pilots/templates/components/object-bin", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RxxSTvDk", "block": "{\"statements\":[[6,[\"draggable-object-target\"],null,[[\"action\"],[\"handleObjectDropped\"]],{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"object-bin-title\"],[13],[1,[26,[\"name\"]],false],[14],[0,\"\\n  \"],[11,\"br\",[]],[13],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\"]]],null,{\"statements\":[[6,[\"draggable-object\"],null,[[\"action\",\"content\"],[\"handleObjectDragged\",[28,[\"obj\"]]]],{\"statements\":[[0,\"      \"],[18,\"default\",[[28,[\"obj\"]]]],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[\"obj\"]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/object-bin.hbs" } });
});
define("pilots/templates/components/page-numbers", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Rd8f6bWH", "block": "{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"page-buttons\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"canStepBackward\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"arrow-enabled fa fa-angle-left\"],[5,[\"action\"],[[28,[null]],\"incrementPage\",-1]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"arrow-disabled fa fa-angle-left\"],[5,[\"action\"],[[28,[null]],\"incrementPage\",-1]],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[11,\"div\",[]],[13],[1,[26,[\"currentPage\"]],false],[14],[0,\" / \\n    \"],[11,\"div\",[]],[13],[1,[26,[\"totalPages\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"canStepForward\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"arrow-enabled fa fa-angle-right\"],[5,[\"action\"],[[28,[null]],\"incrementPage\",1]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"href\",\"#\"],[15,\"class\",\"arrow-disabled fa fa-angle-right\"],[5,[\"action\"],[[28,[null]],\"incrementPage\",1]],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/page-numbers.hbs" } });
});
define("pilots/templates/components/pano-mission-uploader", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eAeO8Ykr", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"uploader-top-row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"uploader-top-row-left\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"button-wrapper\"],[13],[0,\"\\n      \"],[11,\"a\",[]],[16,\"id\",[34,[\"uploader\",[26,[\"shot_type\"]]]]],[15,\"class\",\"button\"],[13],[0,\"\\n        UPLOAD \"],[11,\"span\",[]],[15,\"class\",\"icon-db_upload_icon\"],[13],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"assetsCount\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"button-wrapper\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"deleteAllAssets\"]],[13],[0,\"\\n          DELETE ALL\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"uploadProgress\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"uploadProgress\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"progressMeter\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"completed\"],[16,\"style\",[34,[\"width: calc(\",[26,[\"uploadProgress\"]],\"%);\"]]],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"not-completed\"],[16,\"style\",[34,[\"width: calc(100% - \",[26,[\"uploadProgress\"]],\"%);\"]]],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[13],[0,\" \"],[1,[26,[\"uploadProgress\"]],false],[0,\"%\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"uploader\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[[26,[\"shot_type\"]],\" upload-target \",[33,[\"if\"],[[28,[\"showInstructions\"]],\"outline\"],null]]]],[13],[0,\"\\n    \"],[11,\"div\",[]],[16,\"class\",[34,[\"upload-instructions \",[33,[\"unless\"],[[28,[\"showInstructions\"]],\"hidden\"],null]]]],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"class\",\"upload-icon\"],[15,\"src\",\"/assets/images/v2/DragAndDrop_files.svg\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"large-text\"],[13],[0,\"Drop files here\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"or use the \\\"Upload\\\" button above\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\\n\"],[6,[\"each\"],[[28,[\"sortedImages\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"shot-asset\"],[13],[0,\"\\n        \"],[1,[33,[\"image-asset\"],null,[[\"image\",\"progress\"],[[28,[\"image\"]],[28,[\"image\",\"file\",\"percent\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"image\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"final-instructions\"],[13],[0,\"\\n  Uploads work best in Google Chrome.  If errors still occur, please send a screenshot to pilots@dronebase.com.\"],[11,\"br\",[]],[13],[14],[0,\"\\n  Ad blockers might interfere with uploading, please disable/pause them if you have problems uploading.\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pano-mission-uploader.hbs" } });
});
define("pilots/templates/components/pano-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fGgPG2Zq", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"pano-mission\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header hidden-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"PANO MISSION \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Pin mission-header-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"mission-header-icon-text\"],[13],[1,[28,[\"model\",\"mission\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"status\"],[13],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"map-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPano\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"pano-embed\"],[13],[0,\"\\n          \"],[11,\"iframe\",[]],[16,\"src\",[26,[\"panoUrl\"]],null],[15,\"frameborder\",\"0\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[33,[\"mission-map\"],null,[[\"model\",\"mission\"],[[28,[\"model\",\"mission\",\"location\"]],[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[6,[\"if\"],[[28,[\"panoReady\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"showPano\"]],\"icon-Map_a\",\"icon-PanoPin\"],null],\" pano-toggle\"]]],[15,\"title\",\"Show/hide panorama\"],[5,[\"action\"],[[28,[null]],\"togglePanorama\"]],[13],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-header visible-xs\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"PANO MISSION \"],[11,\"span\",[]],[15,\"class\",\"id\"],[13],[1,[28,[\"model\",\"mission\",\"id\"]],false],[14],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"address\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Pin mission-header-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"mission-header-icon-text\"],[13],[1,[28,[\"model\",\"mission\",\"address\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"status\"],[13],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container-fluid mission-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12 no-padding-xs\"],[13],[0,\"\\n        \"],[1,[33,[\"mission-weather-forecast\"],null,[[\"model\"],[[28,[\"model\",\"mission\"]]]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row instructions-panel\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-md-12\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Instructions\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"info-graphic row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-3 item-wrapper\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"num\"],[13],[0,\"1\"],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/001_PanoMission_Infographic_041917.svg\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"BEAUTY SHOTS\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"Take 4-5 images of the front of the property at roof level.\\n              The better these look, the more likely they are to sell.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-3 item-wrapper\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"num\"],[13],[0,\"2\"],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/002_PanoMission_Infographic_041917.svg\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"FIRST 360°\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"\\n                Rise to 100ft and back away so the property is in view, angle the camera to 0° (horizon mid-frame) and do a 360° spin while taking 12 pics. Overlap the edges of the pics.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-3 item-wrapper\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"item\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"num\"],[13],[0,\"3\"],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/003_PanoMission_Infographic_041917.svg\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"30°, 60°, 80°\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"\\n                In the same spot, repeat the 360° spin three more times at 30°, 60°, 80° for a total of 48 pics.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-3 item-wrapper\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"last-item\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"num\"],[13],[0,\"4\"],[14],[0,\"\\n              \"],[11,\"img\",[]],[15,\"class\",\"info-img\"],[15,\"src\",\"/assets/images/ig/004_PanoMission_Infographic_041917.svg\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"STRAIGHT DOWN\"],[14],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"\\n                To finish the pano, take one last picture looking straight down in the same spot.\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row instructions-panel desktop visible-xs\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"icon-Upload desktop-icon\"],[13],[14],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"desktop-icon-text\"],[13],[0,\"\\n          Please use a desktop computer to upload assets for this mission.\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showUploader\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"row uploads hidden-xs\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-md-12\"],[13],[0,\"\\n          \"],[11,\"h3\",[]],[13],[0,\"Upload\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"directions\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"orange\"],[13],[0,\"Pano Images\"],[14],[0,\"\\n            Drag and drop the pano images\\n            below or click the Upload button. The pano images are the two sets of 360°\\n            pics and the pic looking straight down.\\n          \"],[14],[0,\"\\n          \"],[1,[33,[\"pano-mission-uploader\"],null,[[\"status\",\"uploadProgress\",\"extensions\",\"onfileadd\",\"onstartupload\",\"uploadedCount\",\"mission\",\"shot_type\",\"images\",\"videos\"],[[28,[\"model\",\"mission\",\"status\"]],[28,[\"uploadProgress\"]],\"jpg jpeg tif tiff png zip\",\"addAsset\",\"startUpload\",[28,[\"model\",\"mission\",\"assetsCount\"]],[28,[\"model\",\"mission\"]],\"pano_tiles\",[28,[\"panoShot\",\"images\"]],[28,[\"panoShot\",\"videos\"]]]]],false],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"directions cover\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"orange\"],[13],[0,\"Beauty Shots\"],[14],[0,\"\\n            Drag and drop the beauty shots\\n            below or click the Upload button.\\n          \"],[14],[0,\"\\n          \"],[1,[33,[\"pano-mission-uploader\"],null,[[\"status\",\"uploadProgress\",\"extensions\",\"onfileadd\",\"onstartupload\",\"uploadedCount\",\"mission\",\"shot_type\",\"images\",\"videos\"],[[28,[\"model\",\"mission\",\"status\"]],[28,[\"uploadProgress\"]],\"jpg jpeg tif tiff png\",\"addAsset\",\"startUpload\",[28,[\"model\",\"mission\",\"assetsCount\"]],[28,[\"model\",\"mission\"]],\"front_shot\",[28,[\"frontShot\",\"images\"]],[28,[\"frontShot\",\"videos\"]]]]],false],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"submit-row\"],[13],[11,\"span\",[]],[15,\"class\",\"submit-button\"],[5,[\"action\"],[[28,[null]],\"submitMission\"]],[13],[0,\"SUBMIT\"],[14],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"missionComplete\"]]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"row complete\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-md-12\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"orange\"],[13],[0,\"\\n            GREAT!\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"\\n            We'll work on stitching the pano images together\"],[11,\"br\",[]],[13],[14],[0,\" and will notify\\n            you when it's done.\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"\\n            \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/Infog_PanoStitching.svg\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pano-mission.hbs" } });
});
define("pilots/templates/components/pill-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YwEQseL2", "block": "{\"statements\":[[6,[\"each\"],[[28,[\"pillsHash\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"a\"]],true],null]],null,{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-circle selected\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-circle\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[\"a\"]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pill-list.hbs" } });
});
define("pilots/templates/components/pilot-dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7+sUm5UX", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"pilot-dashboard\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"welcome-pilot pilot-dashboard-section\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"WELCOME, PILOT\"],[14],[0,\"\\n    \"],[1,[33,[\"simple-weather\"],null,[[\"pilot\"],[[28,[\"model\",\"pilot\"]]]]],false],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"small-quote\"],[13],[1,[26,[\"daily-message\"]],false],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"pilot-stats-container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"pilot-stats-chunk\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"pilot-stat-box\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[15,\"class\",\"count\"],[13],[1,[28,[\"model\",\"pilot\",\"total_client_missions\"]],false],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"CLIENT MISSIONS\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[16,\"class\",[34,[\"pilot-stat-box \",[33,[\"unless\"],[[28,[\"model\",\"pilot\",\"mission_breakdown\",\"getty\"]],\"hidden\"],null]]]],[13],[0,\"\\n          \"],[11,\"h1\",[]],[15,\"class\",\"count\"],[13],[1,[28,[\"model\",\"pilot\",\"mission_breakdown\",\"getty\"]],false],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"GETTY MISSIONS\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"pilot-stat-box\"],[13],[0,\"\\n          \"],[11,\"h1\",[]],[15,\"class\",\"count\"],[13],[1,[33,[\"number-in-dollars\"],[[28,[\"model\",\"pilot\",\"payout_total\"]]],null],false],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"MONEY EARNED\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-list pilot-dashboard-section client-missions\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-header\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[13],[0,\"CLIENT MISSIONS\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"clientMissions\",\"length\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"map-view-button\"],[5,[\"action\"],[[28,[null]],\"showMapView\",[28,[\"clientMissions\"]],\"client\"]],[13],[0,\"\\n          MAP VIEW\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-list-columns mission-list-header hidden-xs\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-location\"],[13],[0,\"Location\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-status\"],[13],[0,\"Mission Status\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-flight-date\"],[13],[0,\"Flight Date\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-payout\"],[13],[0,\"Payout\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-action\"],[13],[0,\"Action\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"or\"],[[28,[\"clientMissions\",\"length\"]],[28,[\"trainingMissions\",\"length\"]]],null]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"pilot-mission-list\"],null,[[\"missions\",\"deleteAction\",\"trainingMissions\"],[[28,[\"clientMissions\"]],\"deleteMission\",[28,[\"trainingMissions\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"showNoMissionsInfoGraph\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"no-missions\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"class\",\"infographic\"],[15,\"src\",\"/assets/images/pilot/look_foravailable_mission_infog.svg\"],[13],[14],[0,\"\\n          \"],[11,\"h2\",[]],[13],[0,\"Look out for available missions\"],[14],[0,\"\\n          Sit tight! We'll reach out to you as soon as we've got a mission in your area.\\n          \"],[11,\"br\",[]],[13],[14],[0,\"\\n          Ready to fly? Start your first training mission now.\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"no-missions hidden-xs\"],[13],[0,\"\\n          \"],[11,\"h2\",[]],[15,\"class\",\"steps-text-header\"],[13],[0,\"Just a few more things...\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"steps-icons\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/dash_empty_state_step1.svg\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"Complete your profile to be considered for Client Missions.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/dash_empty_state_step2.svg\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"DroneBase will review your profile & location.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/dash_empty_state_step3.svg\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"If you are eligible, we will send you training to start earning!\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"learn-more\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[15,\"href\",\"https://blog.dronebase.com/trainingmissions/\"],[15,\"target\",\"_blank\"],[13],[0,\"Learn More\"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"missing_profile_data\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[15,\"href\",\"/profile\"],[13],[0,\"COMPLETE MY PROFILE\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"no-missions visible-xs\"],[13],[0,\"\\n          \"],[11,\"h2\",[]],[15,\"class\",\"steps-text-header\"],[13],[0,\"Just a few more things...\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"steps-icons\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/step1_empty_state_mobile.png\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"Complete your profile to be considered for Client Missions.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/step2_empty_state_mobile.png\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"DroneBase will review your profile & location.\"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"step-icon-and-text\"],[13],[0,\"\\n              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot/step3_empty_state_mobile.png\"],[13],[14],[0,\"\\n              \"],[11,\"p\",[]],[13],[0,\"If you are eligible, we will send you training to start earning!\"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"learn-more\"],[13],[0,\"\\n            \"],[11,\"a\",[]],[15,\"href\",\"https://blog.dronebase.com/trainingmissions/\"],[15,\"target\",\"_blank\"],[13],[0,\"Learn More\"],[14],[0,\"\\n          \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"missing_profile_data\"]]],null,{\"statements\":[[0,\"            \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[15,\"href\",\"/profile\"],[13],[0,\"COMPLETE MY PROFILE\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n  \"],[1,[26,[\"explore-card\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showMapView\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\",\"onClickOverlay\"],[true,\"hideMapView\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-close map-view-close\"],[5,[\"action\"],[[28,[null]],\"hideMapView\"]],[13],[0,\"×\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-body\"],[13],[0,\"\\n        \"],[1,[33,[\"dashboard-mission-map\"],null,[[\"missions\",\"deleteAction\"],[[28,[\"mapViewMissions\"]],\"deleteMission\"]]],false],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-dashboard.hbs" } });
});
define("pilots/templates/components/pilot-details", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Q+GkHhfr", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"pilot-details col-sm-3\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"pilot-img\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/Infog_Pilot_Profile_MintGreen.svg\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"name\"],[13],[1,[28,[\"pilot\",\"full_name\"]],false],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"full-box top-box\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"ID No.\"],[14],[0,\" \"],[1,[28,[\"pilot\",\"id\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"split\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"left-box\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"Based in\"],[14],[0,\"\\n      \"],[1,[28,[\"pilot\",\"city\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"right-box\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"small-text\"],[13],[0,\"LICENSE NO.\"],[14],[0,\"\\n      \"],[1,[28,[\"pilot\",\"displayedLicense\"]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[6,[\"link-to\"],[\"profile\"],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"EDIT PROFILE\"]],\"locals\":[]},null],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-details.hbs" } });
});
define("pilots/templates/components/pilot-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vmiumjFm", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container-top container-main pilot-registration\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6 col-sm-offset-3 container-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"page-header\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/DB_logo_LoginPage.png\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"Create Account\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"changeset\",\"error\",\"authentication\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"error text-center\"],[13],[1,[28,[\"changeset\",\"error\",\"authentication\",\"validation\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"text-center\"],[13],[0,\"\\n          \"],[11,\"small\",[]],[13],[0,\"Already have an account? \"],[6,[\"link-to\"],[\"login\"],[[\"elementId\"],[\"login\"]],{\"statements\":[[0,\"Login here\"]],\"locals\":[]},null],[0,\".\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n            \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"elementId\"],[\"first_name\",[28,[\"changeset\"]],\"First Name\",\"text\",\"firstname\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n            \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"elementId\"],[\"last_name\",[28,[\"changeset\"]],\"Last Name\",\"text\",\"lastname\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n            \"],[4,\" hack to get around Chrome autocomplete \"],[0,\"\\n            \"],[11,\"input\",[]],[15,\"name\",\"hidden\"],[15,\"type\",\"text\"],[15,\"style\",\"display:none;\"],[15,\"class\",\"form-control input-lg\"],[13],[14],[0,\"\\n            \"],[1,[33,[\"address-lookup\"],null,[[\"model\",\"changeset\"],[[28,[\"pilot\"]],[28,[\"changeset\"]]]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n            \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"elementId\"],[\"email\",[28,[\"changeset\"]],\"Email\",\"email\",\"email\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n            \"],[1,[33,[\"validated-input\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"elementId\"],[\"password\",[28,[\"changeset\"]],\"Password\",\"password\",\"password\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-xs-12\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[13],[0,\"\\n                 \"],[1,[33,[\"validated-checkbox\"],null,[[\"propertyName\",\"changeset\",\"elementId\"],[\"terms_and_conditions\",[28,[\"changeset\"]],\"terms-agree\"]]],false],[0,\" I am 18 years of age or older and I agree to the \"],[6,[\"link-to\"],[\"terms_and_conditions\"],[[\"target\",\"elementId\"],[\"_new\",\"terms-link\"]],{\"statements\":[[0,\"DroneBase Terms and Conditions\"]],\"locals\":[]},null],[0,\".\\n              \"],[14],[0,\"\\n              \"],[11,\"button\",[]],[15,\"class\",\"register-button\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"save\"],null],null],[16,\"disabled\",[26,[\"buttonDisabled\"]],null],[15,\"id\",\"register\"],[13],[1,[26,[\"buttonName\"]],false],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-form.hbs" } });
});
define("pilots/templates/components/pilot-log", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dlbmLT2N", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container pilotlog-list\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row header\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 visible-xs\"],[13],[0,\"Mission #\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs  col-sm-3\"],[13],[0,\"Completed Mission\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6  col-sm-2\"],[13],[0,\"Mission Type\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs col-sm-2\"],[13],[0,\"Status\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs col-sm-2\"],[13],[0,\"Uploaded On\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6  col-sm-2\"],[13],[0,\"City\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 col-sm-1\"],[13],[0,\"Payment\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"missions\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"mission-listing\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"top-row row\"],[5,[\"action\"],[[28,[null]],[28,[\"toggleMissionListing\"]]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 col-sm-3 mission-id\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"icon-Arrow3_r arrow\"],[13],[14],[0,\"\\n          \"],[1,[28,[\"mission\",\"id\"]],false],[0,\"\\n          \"],[11,\"span\",[]],[16,\"class\",[34,[[28,[\"mission\",\"icon\"]],\" mission-icon hidden-xs\"]]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 col-sm-2\"],[13],[1,[28,[\"mission\",\"formattedMissionType\"]],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs col-sm-2\"],[13],[1,[33,[\"titleize\"],[[28,[\"mission\",\"status\"]]],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs col-sm-2\"],[13],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"uploadedDate\"]],\"MM/DD/YYYY\"],null],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 col-sm-2\"],[13],[1,[28,[\"mission\",\"location\",\"city\"]],false],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"col-xs-6 col-sm-1\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"payoutTotal\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"number-in-dollars\"],[[28,[\"mission\",\"payoutTotal\"]]],null],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"payment-due\"],[13],[0,\"\\n              \"],[1,[33,[\"number-in-dollars\"],[[28,[\"mission\",\"estimated_pilot_payout\"]]],null],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"missionStatusType\"]],\"creative_mission\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"expanded-mission\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"mission\",\"mainImage\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"class\",\"main-image\"],[16,\"src\",[34,[[28,[\"mission\",\"mainImage\"]]]]],[13],[14]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Creative Mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Pin\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[1,[28,[\"mission\",\"shortAddress\"]],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Upload\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Uploaded assets on \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"uploadedDate\"]],\"MM/DD/YYYY\"],null],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Drone_b\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Getty Mission\"],[14],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"mission\",\"rejectionReason\"]]],null,{\"statements\":[[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"src\",\"/assets/images/rejected_icon.svg\"],[15,\"class\",\"rejected-icon-svg\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[11,\"strong\",[]],[13],[0,\"Rejected:\"],[14],[0,\" \"],[1,[28,[\"mission\",\"rejectionReason\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"missionStatusType\"]],\"client_mission_available\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"expanded-mission\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"mission\",\"mainImage\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"class\",\"main-image\"],[16,\"src\",[34,[[28,[\"mission\",\"mainImage\"]]]]],[13],[14]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Available Client Mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Pin\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[1,[28,[\"mission\",\"shortAddress\"]],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Upload\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Uploaded assets on \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"uploadedDate\"]],\"MM/DD/YYYY\"],null],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Payment\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Payment made via \"],[1,[28,[\"mission\",\"paymentProcessor\"]],false],[14],[14],[0,\"\\n            \"],[6,[\"link-to\"],[\"availablemission\",[28,[\"mission\",\"id\"]]],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"SEE DETAILS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"starts-with\"],[[28,[\"mission\",\"missionStatusType\"]],\"client\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"expanded-mission\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"mission\",\"mainImage\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"class\",\"main-image\"],[16,\"src\",[34,[[28,[\"mission\",\"mainImage\"]]]]],[13],[14]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Client Mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Pin\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[1,[28,[\"mission\",\"shortAddress\"]],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Upload\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Uploaded assets on \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"uploadedDate\"]],\"MM/DD/YYYY\"],null],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Payment\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Payment made via \"],[1,[28,[\"mission\",\"paymentProcessor\"]],false],[14],[14],[0,\"\\n            \"],[6,[\"link-to\"],[\"clientmission\",[28,[\"mission\",\"id\"]]],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"SEE DETAILS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"starts-with\"],[[28,[\"mission\",\"missionStatusType\"]],\"pano\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"expanded-mission\"],[13],[0,\"\\n          \"],[6,[\"if\"],[[28,[\"mission\",\"mainImage\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"class\",\"main-image\"],[16,\"src\",[34,[[28,[\"mission\",\"mainImage\"]]]]],[13],[14]],\"locals\":[]},null],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"details\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"Pano Mission\"],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Pin\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[1,[28,[\"mission\",\"shortAddress\"]],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Upload\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Uploaded assets on \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"uploadedDate\"]],\"MM/DD/YYYY\"],null],false],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[13],[11,\"span\",[]],[15,\"class\",\"icon icon-Payment\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[0,\"Payment made via \"],[1,[28,[\"mission\",\"paymentProcessor\"]],false],[14],[14],[0,\"\\n            \"],[6,[\"if\"],[[28,[\"mission\",\"rejectionReason\"]]],null,{\"statements\":[[11,\"div\",[]],[13],[11,\"img\",[]],[15,\"src\",\"/assets/images/rejected_icon.svg\"],[15,\"class\",\"rejected-icon-svg\"],[13],[14],[11,\"span\",[]],[15,\"class\",\"text\"],[13],[11,\"strong\",[]],[13],[0,\"Rejected:\"],[14],[0,\" \"],[1,[28,[\"mission\",\"rejectionReason\"]],false],[14],[14]],\"locals\":[]},null],[0,\"\\n            \"],[6,[\"link-to\"],[\"panomission\",[28,[\"mission\",\"id\"]]],[[\"class\"],[\"button\"]],{\"statements\":[[0,\"SEE DETAILS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[\"mission\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-log.hbs" } });
});
define("pilots/templates/components/pilot-mission-information", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FQHSm87A", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"declineModal\"]]],null,{\"statements\":[[6,[\"modal-dialog\"],null,[[\"translucentOverlay\"],[true]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"ember-modal-dialog-close\"],[5,[\"action\"],[[28,[null]],\"closeDeclinedModal\"]],[13],[0,\"×\"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-header\"],[13],[0,\"\\n        \"],[11,\"h4\",[]],[15,\"class\",\"ember-modal-dialog-title\"],[13],[0,\"WOMP WOMP!\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"ember-modal-dialog-body\"],[13],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"OK, take a break. But don't let those propellers get dusty, Captain!\"],[14],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/Decline_infographic.svg\"],[13],[14],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"confirm-button\"],[5,[\"action\"],[[28,[null]],\"confirmDeclined\",[28,[\"mission\"]]]],[13],[0,\"GOT IT\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"mission-list-columns hidden-xs \",[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"training\"],null],\"training-mission-information\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-location\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"client\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/available_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/client_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"getty\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/getty_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/training_mission_icon.svg\"],[13],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"mission-address\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"training\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"b\",[]],[13],[0,\"Training Mission\"],[14],[11,\"br\",[]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"mission\",\"location\",\"formatted_address\"]]],null,{\"statements\":[[0,\"        \"],[1,[28,[\"mission\",\"location\",\"formatted_address\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        Location Unknown\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-status\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"showOnHold\"]]],null,{\"statements\":[[0,\"      ON HOLD\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"      AVAILABLE\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      IN PROGRESS\\n    \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"mission-flight-date \",[33,[\"if\"],[[28,[\"mission\",\"showOnHold\"]],\"disabled\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"client\"],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"        \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\"]],[28,[\"model\",\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n        \"],[11,\"br\",[]],[13],[14],[0,\"\\n        \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\",\"scheduled_at_start\"]],[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\" -\\n        \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\",\"scheduled_at_end\"]],[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        1 - 3 Days\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"      \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"created_on\"]],\"MM/DD/YYYY\"],[[\"timezone\"],[[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-payout\"],[13],[1,[28,[\"mission\",\"estimated_pilot_payout_in_dollars\"]],false],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-action\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"button-bundle\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/availablemission/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"VIEW DETAILS\"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"decline-button\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"getty\"],null],\"CANCEL\",\"DECLINE\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"creative\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"button-bundle\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/getty/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"UPLOAD\"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"decline-button\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[0,\"CANCEL\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/clientmission/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"UPLOAD\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"mission-list-cards visible-xs \",[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"training\"],null],\"training-mission-information\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-icon\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"client\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/available_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/client_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"getty\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/pilot/getty_mission_pin.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"img\",[]],[15,\"class\",\"pin\"],[15,\"src\",\"/assets/images/training_mission_icon.svg\"],[13],[14],[0,\"\\n      \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-location-schedule\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-address\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"training\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"b\",[]],[13],[0,\"Training Mission\"],[14],[11,\"br\",[]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"mission\",\"location\",\"formatted_address\"]]],null,{\"statements\":[[0,\"          \"],[1,[28,[\"mission\",\"location\",\"formatted_address\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          Location Unknown\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"mission-flight-date  \",[33,[\"if\"],[[28,[\"mission\",\"showOnHold\"]],\"disabled\"],null]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"client\"],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"moment-format-local-date\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\"]],[28,[\"model\",\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n            \"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\",\"scheduled_at_start\"]],[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\" -\\n            \"],[1,[33,[\"moment-format-local-time\"],null,[[\"model\",\"timezone\"],[[28,[\"mission\",\"scheduled_at_end\"]],[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            1 - 3 Days\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[33,[\"moment-format\"],[[28,[\"mission\",\"created_on\"]],\"MM/DD/YYYY\"],[[\"timezone\"],[[28,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"mission-price-status\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-price\"],[13],[0,\"\\n        \"],[1,[28,[\"mission\",\"estimated_pilot_payout_in_dollars\"]],false],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"mission-status\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"mission\",\"showOnHold\"]]],null,{\"statements\":[[0,\"          ON HOLD\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"          AVAILABLE\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          IN PROGRESS\\n        \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-actions\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"status\"]],\"pilots_notified\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"button-bundle\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/availablemission/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"VIEW DETAILS\"],[14],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"decline-button\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[1,[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"getty\"],null],\"CANCEL\",\"DECLINE\"],null],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"mission_type\"]],\"creative\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"button-bundle\"],[13],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/getty/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"UPLOAD\"],[14],[0,\"\\n          \"],[11,\"a\",[]],[15,\"class\",\"decline-button\"],[5,[\"action\"],[[28,[null]],\"decline\"]],[13],[0,\"CANCEL\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[34,[\"/clientmission/\",[28,[\"mission\",\"id\"]]]]],[13],[0,\"UPLOAD\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-mission-information.hbs" } });
});
define("pilots/templates/components/pilot-mission-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FqaXzECD", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayMissions\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"pilot-mission-information\"],null,[[\"mission\",\"deleteAction\"],[[28,[\"mission\"]],\"deleteMission\"]]],false],[0,\"\\n\"]],\"locals\":[\"mission\"]},null],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"visible-xs\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"displayMissionsMobile\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"pilot-mission-information\"],null,[[\"mission\",\"deleteAction\"],[[28,[\"mission\"]],\"deleteMission\"]]],false],[0,\"\\n\"]],\"locals\":[\"mission\"]},null],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"needMorePages\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"mission-page-links hidden-xs\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"missionPages\"]]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[16,\"class\",[34,[\"mission-page \",[33,[\"if\"],[[33,[\"is-equal\"],[[28,[\"index\"]],0],null],\"selected\"],null]]]],[16,\"id\",[34,[\"mission-page\",[28,[\"index\"]]]]],[5,[\"action\"],[[28,[null]],\"changePage\",[28,[\"index\"]]]],[13],[1,[33,[\"addition\"],[[28,[\"index\"]],1],null],false],[14],[0,\"\\n\"]],\"locals\":[\"page\",\"index\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[33,[\"is-equal\"],[[33,[\"addition\"],[[28,[\"missionPage\"]],1],null],[28,[\"missionPages\",\"length\"]]],null]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"mission-page-links see-more-missions visible-xs\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[15,\"class\",\"mission-page\"],[5,[\"action\"],[[28,[null]],\"showMoreMissions\"]],[13],[0,\"\\n          SEE MORE MISSIONS\\n          \"],[11,\"br\",[]],[13],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"class\",\"see-more-missions-icon\"],[15,\"src\",\"/assets/images/pilot/see_more_missions_icon.svg\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-mission-list.hbs" } });
});
define("pilots/templates/components/pilot-profile-address-lookup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nPOHX41e", "block": "{\"statements\":[[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"address\"],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[0,\"\\n\"],[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],\"address\"],null],\"validation\"],null]],null,{\"statements\":[[0,\"    \"],[1,[28,[\"error\"]],false],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[1,[33,[\"input\"],null,[[\"value\",\"class\",\"placeholder\",\"autocomplete\",\"key-up\",\"elementId\"],[[28,[\"model\",\"address\"]],\"form-control\",\"Address\",\"off\",\"checkEmpty\",\"address\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-address-lookup.hbs" } });
});
define("pilots/templates/components/pilot-profile-device-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AEZNpbV5", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"item-row devices \",[33,[\"if\"],[[28,[\"missingInfo\"]],\"missing-info\"],null]]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name new\"],[13],[0,\"DEVICE \"],[1,[26,[\"pilotDevicesNumber\"]],false],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"field-value select-device\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-value-empty\"],[13],[1,[26,[\"cta\"]],false],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-arrow icon-Arrow2_down\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"device-dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"availableDevices\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[5,[\"action\"],[[28,[null]],\"create\",[28,[\"device\"]]]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"item-creator\"],[13],[1,[28,[\"device\",\"name\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"device\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-device-new.hbs" } });
});
define("pilots/templates/components/pilot-profile-device", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wgXihe7I", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"item-row devices\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"device-item item-row btm-border-line\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"DEVICE \"],[1,[26,[\"pilotDeviceNumber\"]],false],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"device-name\"],[13],[0,\"\\n      \"],[1,[28,[\"pilotDevice\",\"device\",\"name\"]],false],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"delete-me icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"destroy\",[28,[\"pilotDevice\"]]]],[13],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-device.hbs" } });
});
define("pilots/templates/components/pilot-profile-devices", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZEQnVv2N", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  DEVICE\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"secion-description\"],[13],[0,\"\\n  Enter the device(s) you use to fly your drone(s)\\n\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"pilotDevices\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-device\"],null,[[\"model\",\"pilotDevice\",\"index\",\"destroyAction\"],[[28,[\"model\"]],[28,[\"device\"]],[28,[\"index\"]],\"destroyDevice\"]]],false],[0,\"\\n\"]],\"locals\":[\"device\",\"index\"]},null],[6,[\"if\"],[[28,[\"devicesAvailable\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-device-new\"],null,[[\"model\",\"createAction\",\"missingInfo\"],[[28,[\"model\"]],\"createDevice\",[28,[\"missingInfo\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-devices.hbs" } });
});
define("pilots/templates/components/pilot-profile-drone-camera", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TcUH85xA", "block": "{\"statements\":[[11,\"span\",[]],[5,[\"action\"],[[28,[null]],\"create\",[28,[\"camera\"]]]],[13],[1,[28,[\"camera\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-drone-camera.hbs" } });
});
define("pilots/templates/components/pilot-profile-drone-cameras", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "l+VKLrUf", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cameras-section\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"cameras-section-title\"],[13],[0,\"\\n    Cameras:\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"cameras-section-pills\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"selectedCameras\"]]],null,{\"statements\":[[0,\"      \"],[11,\"button\",[]],[15,\"class\",\"btn btn-xs camera-pill\"],[16,\"onClick\",[33,[\"disable-bubbling\"],[[33,[\"action\"],[[28,[null]],\"destroyCamera\",[28,[\"camera\"]]],null]],null],null],[13],[1,[28,[\"camera\",\"name\"]],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"delete-me icon-Xmark\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[\"camera\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"span\",[]],[15,\"class\",\"camera-dropdown-arrow field-arrow icon-Arrow2_down\"],[13],[14],[0,\"\\n\"],[11,\"ul\",[]],[15,\"class\",\"camera-dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"pilotDrone\",\"drone\",\"optional_cameras\"]]],null,{\"statements\":[[0,\"    \"],[11,\"li\",[]],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-drone-camera\"],null,[[\"camera\",\"createAction\"],[[28,[\"camera\"]],\"createCamera\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"camera\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-drone-cameras.hbs" } });
});
define("pilots/templates/components/pilot-profile-drone-system-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "YW5TwQR5", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"item-row drone-system \",[33,[\"if\"],[[28,[\"missingInfo\"]],\"missing-info\"],null]]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name new\"],[13],[0,\"DRONE \"],[1,[26,[\"pilotDroneNumber\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"field-value select-drone\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-value-empty\"],[13],[1,[26,[\"cta\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"field-arrow icon-Arrow2_down\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"drone-dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"sortedDrones\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[5,[\"action\"],[[28,[null]],\"create\",[28,[\"drone\"]]]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"item-creator\"],[13],[1,[28,[\"drone\",\"full_name\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"drone\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-drone-system-new.hbs" } });
});
define("pilots/templates/components/pilot-profile-drone-system", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "E4kykuuJ", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"drone-system-item item-row \",[33,[\"unless\"],[[28,[\"pilotDrone\",\"drone\",\"optional_cameras\",\"length\"]],\"btm-border-line\"],null]]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"DRONE \"],[1,[26,[\"pilotDroneNumber\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"drone-system-name\"],[13],[0,\"\\n    \"],[1,[28,[\"pilotDrone\",\"drone\",\"full_name\"]],false],[0,\" \"],[11,\"span\",[]],[15,\"class\",\"delete-me icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"destroy\",[28,[\"pilotDrone\"]]]],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pilotDrone\",\"drone\",\"optional_cameras\",\"length\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"drone-system-item item-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cameras-container\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"top-arrow\"],[13],[14],[0,\"\\n        \"],[1,[33,[\"pilot-profile-drone-cameras\"],null,[[\"pilotDrone\"],[[28,[\"pilotDrone\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-drone-system.hbs" } });
});
define("pilots/templates/components/pilot-profile-drone-systems", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "AWn3/MhH", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  DRONE SYSTEM\\n\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"sortedPilotDrones\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-drone-system\"],null,[[\"model\",\"pilotDrone\",\"index\",\"destroyAction\"],[[28,[\"model\"]],[28,[\"pilotDrone\"]],[28,[\"index\"]],\"destroyDrone\"]]],false],[0,\"\\n\"]],\"locals\":[\"pilotDrone\",\"index\"]},null],[1,[33,[\"pilot-profile-drone-system-new\"],null,[[\"model\",\"createAction\",\"missingInfo\"],[[28,[\"model\"]],\"createDrone\",[28,[\"missingInfo\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-drone-systems.hbs" } });
});
define("pilots/templates/components/pilot-profile-equipment-existing", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gffQhGEo", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"item-row equipment\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"equipment-item item-row btm-border-line\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"EQUIPMENT \"],[1,[26,[\"pilotEquipmentNumber\"]],false],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"equipment-name\"],[13],[0,\"\\n      \"],[1,[28,[\"pilotEquipment\",\"pilot_equipment\",\"name\"]],false],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"delete-me icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"destroy\",[28,[\"pilotEquipment\"]]]],[13],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-equipment-existing.hbs" } });
});
define("pilots/templates/components/pilot-profile-equipment-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+aRu6C1e", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"item-row equipment\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name new\"],[13],[0,\"EQUIPMENT \"],[1,[26,[\"pilotEquipmentNumber\"]],false],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"field-value select-equipment\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-value-empty\"],[13],[0,\"Choose Equipment Type\"],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-arrow icon-Arrow2_down\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"equipment-dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"availableEquipment\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[5,[\"action\"],[[28,[null]],\"create\",[28,[\"equipment\"]]]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"item-creator\"],[13],[1,[28,[\"equipment\",\"name\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"equipment\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-equipment-new.hbs" } });
});
define("pilots/templates/components/pilot-profile-equipment", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2/JvKLMG", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  OTHER EQUIPMENT\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"secion-description\"],[13],[0,\"\\n  Let us know what other equipment\\n  you have that will help us match you with missions\\n\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"pilotEquipment\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-equipment-existing\"],null,[[\"model\",\"pilotEquipment\",\"index\",\"destroyAction\"],[[28,[\"model\"]],[28,[\"equipment\"]],[28,[\"index\"]],\"destroyEquipment\"]]],false],[0,\"\\n\"]],\"locals\":[\"equipment\",\"index\"]},null],[6,[\"if\"],[[28,[\"equipmentAvailable\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-equipment-new\"],null,[[\"model\",\"createAction\",\"missingInfo\"],[[28,[\"model\"]],\"createEquipment\",[28,[\"missingInfo\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-equipment.hbs" } });
});
define("pilots/templates/components/pilot-profile-license-new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "iQZe/OD1", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"item-row license \",[33,[\"if\"],[[28,[\"missingInfo\"]],\"missing-info\"],null]]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name new\"],[13],[0,\"LICENSE \"],[1,[26,[\"pilotLicenseNumber\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"field-value select-license\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-value-empty\"],[13],[1,[26,[\"cta\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"field-arrow icon-Arrow2_down\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"ul\",[]],[15,\"class\",\"license-dropdown\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"availableLicenses\"]]],null,{\"statements\":[[0,\"      \"],[11,\"li\",[]],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"item-creator\"],[5,[\"action\"],[[28,[null]],\"create\",[28,[\"license\"]]]],[13],[1,[28,[\"license\",\"name\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"license\"]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-license-new.hbs" } });
});
define("pilots/templates/components/pilot-profile-license", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fGjGFyX8", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"item-row license\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"license-item item-row\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"LICENSE \"],[1,[26,[\"pilotLicenseNumber\"]],false],[14],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"license-name\"],[13],[0,\"\\n      \"],[1,[28,[\"pilotLicense\",\"license\",\"name\"]],false],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"delete-me icon-Xmark\"],[5,[\"action\"],[[28,[null]],\"destroy\",[28,[\"pilotLicense\"]]]],[13],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row license\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"license-number\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"top-arrow\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"license-number-section\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"licence-number-section-title\"],[13],[0,\"\\n        Number:\\n      \"],[14],[0,\"\\n      \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\"],[\"license_number\",[28,[\"changeset\"]],\"License Number\",\"text\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-license.hbs" } });
});
define("pilots/templates/components/pilot-profile-licenses", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "09JyZCo2", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  CERTIFICATIONS\\n\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"pilotLicenses\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-license\"],null,[[\"model\",\"pilotLicense\",\"index\",\"destroyAction\"],[[28,[\"model\"]],[28,[\"pilotLicense\"]],[28,[\"index\"]],\"destroyLicense\"]]],false],[0,\"\\n\"]],\"locals\":[\"pilotLicense\",\"index\"]},null],[6,[\"if\"],[[28,[\"licensesAvailable\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"pilot-profile-license-new\"],null,[[\"model\",\"newAction\",\"createAction\",\"missingInfo\"],[[28,[\"model\"]],\"newLicense\",\"createLicense\",[28,[\"missingInfo\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-licenses.hbs" } });
});
define("pilots/templates/components/pilot-profile-mission-preferences", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HMcxmfXL", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  MISSION PREFERENCES\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name wide\"],[13],[0,\"MILES WILLING TO TRAVEL\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\"],[\"travel_https://annvelents.github.io/dronebase_styleguide_t/distance\",[28,[\"changeset\"]],\"Travel https://annvelents.github.io/dronebase_styleguide_t/distance\",\"text\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"AVAILABILITY\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"availability\"],[13],[0,\"\\n    \"],[1,[33,[\"validated-checkbox-image-auto-save\"],null,[[\"propertyName\",\"changeset\"],[\"is_available_weekdays\",[28,[\"changeset\"]]]]],false],[0,\" Weekdays\\n    \"],[1,[33,[\"validated-checkbox-image-auto-save\"],null,[[\"propertyName\",\"changeset\"],[\"is_available_weekends\",[28,[\"changeset\"]]]]],false],[0,\" Weekends\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-mission-preferences.hbs" } });
});
define("pilots/templates/components/pilot-profile-payment-information", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kFF40dLj", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  PAYMENT INFORMATION\\n\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"international\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"full-row line\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"DroneBase uses PayPal for non-US based pilots. Please fill in your PayPal address.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"PAYPAL EMAIL ADDRESS\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n      \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"type\"],[\"payment_processor_id\",[28,[\"changeset\"]],\"text\"]]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"pilot\",\"payment_processor_id\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"full-row line\"],[13],[0,\"\\n      Payments will be made via direct deposit into your account.\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"full-row line\"],[13],[0,\"\\n      Manage your Qwil account \"],[11,\"a\",[]],[15,\"href\",\"https://app.qwil.co/\"],[15,\"target\",\"_blank\"],[13],[0,\"here\"],[14],[0,\".\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"full-row\"],[13],[0,\"\\n      You will be notified with details on how to set up your account after you've accepted your first mission.\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-payment-information.hbs" } });
});
define("pilots/templates/components/pilot-profile-personal-information", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "40Jafi1I", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"section-header\"],[13],[0,\"\\n  PERSONAL INFORMATION\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"FIRST NAME\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"first_name\",[28,[\"changeset\"]],\"First Name\",\"text\",\"first-name\"]]],false],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name narrow\"],[13],[0,\"LAST NAME\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer narrow\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"last_name\",[28,[\"changeset\"]],\"Last Name\",\"text\",\"last-name\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"EMAIL\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"inline-input no-edit\"],[15,\"id\",\"email\"],[13],[0,\"\\n    \"],[1,[28,[\"model\",\"pilot\",\"email\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"PASSWORD\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"password\",[28,[\"changeset\"]],\"Password\",\"password\",\"password\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"PHONE\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"phone\",[28,[\"changeset\"]],\"Phone\",\"text\",\"phone\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"BIRTHDAY\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"birthday\",[28,[\"changeset\"]],\"Birthday\",\"text\",\"birthday\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"ADDRESS\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"pilot-profile-address-lookup\"],null,[[\"model\",\"changeset\"],[[28,[\"model\",\"pilot\"]],[28,[\"changeset\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"CITY\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"city\",[28,[\"changeset\"]],\"City\",\"text\",\"city\"]]],false],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"STATE\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"state\",[28,[\"changeset\"]],\"State\",\"text\",\"state\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"item-row\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"POSTAL CODE\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"postal_code\",[28,[\"changeset\"]],\"Postal Code\",\"text\",\"postal-code\"]]],false],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"field-name\"],[13],[0,\"COUNTRY\"],[14],[11,\"span\",[]],[15,\"class\",\"field-spacer\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"validated-input-auto-save\"],null,[[\"propertyName\",\"changeset\",\"placeholder\",\"type\",\"inputId\"],[\"country\",[28,[\"changeset\"]],\"Country\",\"text\",\"country\"]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile-personal-information.hbs" } });
});
define("pilots/templates/components/pilot-profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vTDxXGjp", "block": "{\"statements\":[[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"showLeftArrow\",\"showPills\",\"nextAction\",\"doneAction\"],[\"Help us connect you with more missions!\",\"Updating your profile will allow us to ensure that you’re not missing out on any flights.\",\"Get Started\",false,false,[33,[\"action\"],[[28,[null]],\"step1\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null]]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"pillCount\",\"selectedPillIndex\"],[\"Are you certified?\",\"Enter your certifications so we can match your qualifications to paid missions.\",\"Next\",[33,[\"action\"],[[28,[null]],\"step2\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],5,0]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"pillCount\",\"selectedPillIndex\"],[\"What are you flying?\",\"Tell us more about your drones. Some missions have unique specs that will require different capabilities in your gear.\",\"Next\",[33,[\"action\"],[[28,[null]],\"step3\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],5,1]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"pillCount\",\"selectedPillIndex\"],[\"What device(s) do you use?\",\"iPhone or Android? Tablet or phone? Tell us what you're using to fly your drone so we can assign you more paid missions.\",\"Next\",[33,[\"action\"],[[28,[null]],\"step4\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],5,2]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"pillCount\",\"selectedPillIndex\"],[\"Do you own extra equipment?\",\"Tell us if you have ground control points, safety gear, or a DSLR so we can match you with more missions!\",\"Next\",[33,[\"action\"],[[28,[null]],\"step5\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],5,3]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"showNextArrow\",\"pillCount\",\"selectedPillIndex\"],[\"When are you available to fly?\",\"Make sure we’re only sending you missions when you’re ready to go.\",\"Done\",[33,[\"action\"],[[28,[null]],\"step6\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],false,5,4]]],false],[0,\"\\n\"],[1,[33,[\"profile-tooltip-prompt\"],null,[[\"title\",\"text\",\"nextText\",\"nextAction\",\"doneAction\",\"showPills\"],[\"Don't miss out!\",\"Complete your profile to help ensure you’re getting all the flights that fit your skills and availability. See below for missing info.\",\"Get Started\",[33,[\"action\"],[[28,[null]],\"takeMeThere\"],null],[33,[\"action\"],[[28,[null]],\"done\"],null],false]]],false],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"overlay\"],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"profile\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"header\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"class\",\"pilot-img\"],[15,\"src\",\"/assets/images/v2/Infog_Pilot_Profile_MintGreen.svg\"],[13],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"name\"],[13],[0,\"Hi, \"],[1,[28,[\"model\",\"pilot\",\"first_name\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"hasOptIns\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"opt-in-training\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/profile/training_infographic_profile_banner.svg\"],[15,\"class\",\"hidden-xs\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"interested-in-training\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"Ready for Client Missions?\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"To be eligible for paid Client Missions, complete your profile below with your \"],[11,\"b\",[]],[13],[0,\"license, drone system\"],[14],[0,\"(s), and \"],[11,\"b\",[]],[13],[0,\"device\"],[14],[0,\"(s). You must also have the DroneBase Pilot app to receive push notifications and training missions when available. (Download on iOS or Android)\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[11,\"h2\",[]],[15,\"class\",\"page-title\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[13],[0,\"PROFILE\"],[14],[0,\"\\n        \"],[11,\"div\",[]],[16,\"class\",[34,[\"header-badge \",[33,[\"unless\"],[[28,[\"missingInfoCount\"]],\"hidden\"],null]]]],[5,[\"action\"],[[28,[null]],\"completeProfilePrompt\"]],[13],[1,[26,[\"missingInfoCount\"]],false],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-personal-information\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row licenses-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-licenses\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row drones-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-drone-systems\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row devices-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-devices\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row equipment-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-equipment\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"row availability-row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-mission-preferences\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"col-sm-8 col-sm-offset-2 content\"],[13],[0,\"\\n      \"],[1,[33,[\"pilot-profile-payment-information\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-profile.hbs" } });
});
define("pilots/templates/components/pilot-stats", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "N/FDcyl6", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6 text-center pilot-stats\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"pilot-stats-number\"],[13],[1,[28,[\"model\",\"missionsCompletedCount\"]],false],[14],[11,\"span\",[]],[15,\"class\",\"pilot-stats-label\"],[13],[0,\"Jobs\"],[11,\"br\",[]],[13],[14],[0,\"Completed\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6 text-center pilot-stats no-left-border\"],[13],[0,\"\\n    \"],[11,\"span\",[]],[15,\"class\",\"pilot-stats-number\"],[13],[1,[33,[\"number-in-dollars\"],[[28,[\"sessionAccount\",\"account\",\"payout_total\"]]],null],false],[14],[11,\"span\",[]],[15,\"class\",\"pilot-stats-label\"],[13],[0,\"Total\"],[11,\"br\",[]],[13],[14],[0,\"Earned\"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/pilot-stats.hbs" } });
});
define("pilots/templates/components/profile-tooltip-prompt", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5cm748Ug", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"left-arrow \",[33,[\"unless\"],[[28,[\"showLeftArrow\"]],\"hidden\"],null]]]],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showCross\"]]],null,{\"statements\":[[0,\"    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"doneAction\"]],[13],[11,\"span\",[]],[15,\"class\",\"cross icon-Xmark\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n    \"],[1,[26,[\"title\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n    \"],[1,[26,[\"text\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"footer\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"nextAction\"]],[13],[1,[26,[\"nextText\"]],false],[0,\" \"],[6,[\"if\"],[[28,[\"showNextArrow\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"src\",\"/assets/images/orange_arrow.svg\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/profile-tooltip-prompt.hbs" } });
});
define("pilots/templates/components/profile-tooltip", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hWaaVQes", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"left-arrow \",[33,[\"unless\"],[[28,[\"showLeftArrow\"]],\"hidden\"],null]]]],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showCross\"]]],null,{\"statements\":[[0,\"    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"doneAction\"]],[13],[11,\"span\",[]],[15,\"class\",\"cross icon-Xmark\"],[13],[14],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n    \"],[1,[26,[\"title\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"text\"],[13],[0,\"\\n    \"],[1,[26,[\"text\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"footer\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"nextAction\"]],[13],[1,[26,[\"nextText\"]],false],[0,\" \"],[6,[\"if\"],[[28,[\"showNextArrow\"]]],null,{\"statements\":[[11,\"img\",[]],[15,\"src\",\"/assets/images/orange_arrow.svg\"],[13],[14]],\"locals\":[]},null],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showPills\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"pills\"],[13],[0,\"\\n      \"],[1,[33,[\"pill-list\"],null,[[\"pillCount\",\"selectedIndex\"],[[28,[\"pillCount\"]],[28,[\"selectedPillIndex\"]]]]],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/profile-tooltip.hbs" } });
});
define("pilots/templates/components/public-search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LB7O+rT8", "block": "{\"statements\":[[11,\"div\",[]],[15,\"id\",\"publicsearch\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"text-section\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"title hidden-xs\"],[13],[0,\"HERE. THERE.\"],[11,\"br\",[]],[13],[14],[0,\"EVERYWHERE.\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"title visible-xs\"],[13],[0,\"HERE. THERE. EVERYWHERE.\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"smalltext hidden-xs\"],[13],[0,\"Check out the interactive panoramas we've created in\\n      your area. DroneBase flies in all 50 states and over 30 countries.\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"smalltext visible-xs\"],[13],[0,\"Check out the interactive panoramas we've created in\\n      your area.\"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"inputwrapper\"],[13],[0,\"\\n      \"],[11,\"input\",[]],[15,\"id\",\"filter-search-field\"],[15,\"placeholder\",\"Find Your City\"],[13],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"find-button icon-DB-icon_Arrow-right-3\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"smalltext\"],[13],[0,\"Have a specific location in mind?\"],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"href\",\"https://dbcustomers.zendesk.com/hc/en-us/requests/new?ticket_form_id=114093984671\"],[15,\"target\",\"_blank\"],[15,\"class\",\"button\"],[13],[0,\"REQUEST PANO\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n  \"],[1,[33,[\"dashboard-map\"],null,[[\"model\",\"publicsearch\"],[[28,[\"model\"]],true]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/public-search.hbs" } });
});
define("pilots/templates/components/request-password-reset-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KE7SKkF0", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"request-password-reset-form\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"container-content col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[16,\"href\",[26,[\"homeUrl\"]],null],[15,\"class\",\"close-button icon-Xmark\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"page-header\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/DB_logo_LoginPage.png\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"Request Password Reset\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"error text-center\"],[13],[1,[26,[\"errors\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"input-validated\"],null,[[\"type\",\"placeholder\",\"value\"],[\"email\",\"Email\",[28,[\"email\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"submit-button\"],null,[[\"name\",\"class\"],[\"SUBMIT\",\"submit-button\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/request-password-reset-form.hbs" } });
});
define("pilots/templates/components/reschedule-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HAI2uB0I", "block": "{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"reschedulingStep\"]],0],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-title\"],[13],[0,\"\\n    Tell Us Why You Need To Reschedule\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-description\"],[13],[0,\"\\n    We ask that you reschedule only when you need to - in cases of bad weather, or an emergency situation.\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-reason\"],[13],[0,\"\\n    \"],[11,\"select\",[]],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"setRescheduleReason\"],[[\"value\"],[\"target.value\"]]],null],[15,\"class\",\"form-control input-lg reschedule-reason\"],[13],[0,\"\\n      \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"\\n        Select Reason For Reschedule\\n      \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"model\",\"mission_reschedule_reasons\"]]],null,{\"statements\":[[0,\"      \"],[11,\"option\",[]],[16,\"value\",[34,[[28,[\"item\",\"id\"]]]]],[13],[0,\"\\n        \"],[1,[28,[\"item\",\"short\"]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRescheduleNotes\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-notes\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"notes-label\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"model\",\"reschedule\",\"reschedule_reason\",\"short\"]],\"Other\"],null]],null,{\"statements\":[[0,\"        Please Specify (Required):\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        Notes:\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[1,[33,[\"textarea\"],null,[[\"value\",\"class\",\"placeholder\",\"required\"],[[28,[\"model\",\"reschedule\",\"notes\"]],\"form-control input-lg\",\"Please add additional details here\",[28,[\"notesRequired\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"class\",[34,[\"schedule-mission-button \",[33,[\"unless\"],[[28,[\"canGoToRescheduleStep\"]],\"disabled\"],null]]]],[5,[\"action\"],[[28,[null]],\"setReschedulingStep\",1]],[13],[0,\" Next \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"reschedulingStep\"]],1],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-title\"],[13],[0,\"\\n    Set Your New Flight Date\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-description\"],[13],[0,\"\\n    When you can fly this mission? We'll notify the customer and let them know why you need to update the flight date.\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    The date must be within 5 days from today.\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"mission-details-reschedule-calendar\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"input-group date\"],[16,\"class\",[34,[\"rescheduleTimeDatePicker \",[33,[\"if\"],[[28,[\"displayScheduledAt\"]],\"date-entered\"],null]]]],[13],[0,\"\\n        \"],[1,[33,[\"input\"],null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control schedule-mission-datetime-field\",\"MM/DD/YYYY\",[28,[\"displayScheduledAt\"]]]]],false],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"input-group-addon schedule-mission-datetime-button\"],[13],[0,\"\\n          \"],[11,\"span\",[]],[15,\"class\",\"fa fa-calendar\"],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"mission\",\"laanc_flights\",\"length\"]]],null,{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"mission-detail-reschedule-laanc-note\"],[13],[0,\"\\n      \"],[11,\"i\",[]],[13],[11,\"b\",[]],[13],[0,\"Note:\"],[14],[0,\" You will have to obtain LAANC authorization again for the new date.\"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"and\"],[[28,[\"model\",\"reschedule\",\"scheduled_at_start\"]],[28,[\"model\",\"reschedule\",\"scheduled_at_end\"]]],null]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[15,\"class\",\"schedule-mission-button\"],[5,[\"action\"],[[28,[null]],\"reschedule\"]],[13],[0,\" Reschedule \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/reschedule-mission.hbs" } });
});
define("pilots/templates/components/reschedule-success-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Vx48Gm2w", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"ember-modal-inner-wrap reschedule-success-modal\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-close-container\"],[13],[0,\"\\n    \"],[11,\"a\",[]],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[11,\"i\",[]],[15,\"class\",\"icon-Xmark\"],[13],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal-success-image reschedule-icon\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"header\"],[13],[0,\"Flight Rescheduled!\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"body\"],[13],[0,\"\\n    Thanks for working with us! Your mission is scheduled for:\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n     \"],[11,\"span\",[]],[15,\"class\",\"date\"],[13],[1,[33,[\"moment-format-local-date\"],null,[[\"model\"],[[28,[\"mission\"]]]]],false],[14],[0,\"\\n     \"],[11,\"span\",[]],[15,\"class\",\"time\"],[13],[1,[33,[\"mission-scheduled-at-time\"],null,[[\"model\"],[[28,[\"mission\"]]]]],false],[14],[0,\"\\n    \"],[11,\"br\",[]],[13],[14],[0,\"\\n    Make sure you've studied the mission details before flying.\\n  \"],[14],[0,\"\\n  \"],[11,\"button\",[]],[15,\"class\",\"button\"],[5,[\"action\"],[[28,[null]],\"toggleModal\"]],[13],[0,\"Got it\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/reschedule-success-modal.hbs" } });
});
define("pilots/templates/components/reset-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3q5CJGOS", "block": "{\"statements\":[[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"reset-password-form\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"container-content col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\"],[13],[0,\"\\n        \"],[11,\"a\",[]],[16,\"href\",[26,[\"homeUrl\"]],null],[15,\"class\",\"close-button icon-Xmark\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"page-header\"],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/v2/DB_logo_LoginPage.png\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"divider\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[13],[0,\"Reset Password\"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"error text-center\"],[13],[1,[26,[\"errors\"]],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"input-validated\"],null,[[\"type\",\"placeholder\",\"value\"],[\"password\",\"New Password\",[28,[\"model\",\"password\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"input-validated\"],null,[[\"type\",\"placeholder\",\"value\"],[\"password\",\"Confirm Password\",[28,[\"model\",\"confirm_password\"]]]]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[1,[33,[\"input-validated\"],null,[[\"type\",\"value\"],[\"hidden\",[28,[\"model\",\"token\"]]]]],false],[0,\"\\n          \"],[1,[33,[\"submit-button\"],null,[[\"name\",\"class\"],[\"SUBMIT\",\"submit-button\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/reset-password-form.hbs" } });
});
define("pilots/templates/components/schedule-mission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "maIowcMM", "block": "{\"statements\":[[0,\"\\n\\n\"],[6,[\"unless\"],[[28,[\"reschedule\"]]],null,{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"schedule-mission-title-bar \",[26,[\"hide\"]]]]],[13],[0,\"\\n  \"],[1,[26,[\"title\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[16,\"class\",[34,[\"schedule-mission-datetime-container \",[26,[\"hide\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"admin_scheduled\"]]],null,{\"statements\":[[0,\"    \"],[11,\"p\",[]],[13],[0,\"\\n      This flight has a set flight date. Please review before accepting.\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"div\",[]],[16,\"class\",[34,[\"schedule-mission-datetime-container \",[26,[\"hide\"]]]]],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"reschedule\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"schedule-mission-title\"],[13],[0,\"\\n          Schedule Your Flight \"],[11,\"span\",[]],[15,\"class\",\"small\"],[13],[1,[33,[\"if\"],[[28,[\"schedulingRequired\"]],\"(required)\"],null],false],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Pick a date and time that works for you, and we'll let the customer know.\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"schedule-mission-datetime-picker\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"schedule-mission-datetime-picker-label\"],[13],[0,\"\\n          Flight Date:\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"input-group date\"],[15,\"id\",\"scheduleTimeDatePicker\"],[13],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control schedule-mission-datetime-field\",\"MM/DD/YYYY\",[28,[\"displayScheduledAt\"]]]]],false],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"input-group-addon schedule-mission-datetime-button\"],[13],[0,\"\\n            \"],[11,\"span\",[]],[15,\"class\",\"fa fa-calendar\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"weather\"],[13],[0,\"\\n  \"],[1,[33,[\"mission-weather-forecast\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"schedule-mission-buttons \",[26,[\"hide\"]]]]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"reschedule\"]]],null,{\"statements\":[[0,\"    \"],[11,\"button\",[]],[15,\"class\",\"schedule-mission-button reschedule\"],[16,\"disabled\",[26,[\"schedulingRequired\"]],null],[16,\"title\",[34,[[33,[\"if\"],[[28,[\"schedulingRequired\"]],\"Please schedule your flight to accept the mission\"],null]]]],[5,[\"action\"],[[28,[null]],\"reSchedule\",[28,[\"model\"]]]],[13],[0,\"UPDATE\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"    \"],[11,\"button\",[]],[15,\"class\",\"schedule-mission-button\"],[16,\"disabled\",[26,[\"schedulingRequired\"]],null],[16,\"title\",[34,[[33,[\"if\"],[[28,[\"schedulingRequired\"]],\"Please schedule your flight to accept the mission\"],null]]]],[5,[\"action\"],[[28,[null]],\"accept\",[28,[\"model\"]]]],[13],[0,\"ACCEPT\"],[14],[0,\"\\n    \"],[11,\"button\",[]],[15,\"class\",\"schedule-mission-button\"],[5,[\"action\"],[[28,[null]],\"decline\",[28,[\"model\"]]]],[13],[0,\"DECLINE\"],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/schedule-mission.hbs" } });
});
define("pilots/templates/components/select-inplace-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "m/jBYyo8", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"isEditing\"]]],null,{\"statements\":[[11,\"select\",[]],[16,\"class\",[26,[\"selectClass\"]],null],[5,[\"action\"],[[28,[null]],\"save\"],[[\"on\"],[\"change\"]]],[13],[0,\"\\n  \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"\\n    \"],[1,[26,[\"prompt\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"content\"]]],[[\"key\"],[\"@identity\"]],{\"statements\":[[0,\"    \"],[11,\"option\",[]],[16,\"value\",[34,[[33,[\"read-path\"],[[28,[\"item\"]],[28,[\"optionValuePath\"]]],null]]]],[13],[0,\"\\n      \"],[1,[33,[\"read-path\"],[[28,[\"item\"]],[28,[\"optionLabelPath\"]]],null],false],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"inline-input\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"value\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"label\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"field-label\"],[13],[1,[26,[\"label\"]],false],[0,\":\"],[14],[0,\" \"],[1,[26,[\"value\"]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[1,[26,[\"value\"]],false],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"placeholder\"],[13],[0,\"\\n        \"],[1,[26,[\"prompt\"]],false],[0,\"\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[11,\"i\",[]],[15,\"class\",\"fa fa-pencil\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/select-inplace-edit.hbs" } });
});
define("pilots/templates/components/select-validated", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4dI9XoI5", "block": "{\"statements\":[[6,[\"each\"],[[28,[\"modelErrors\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[1,[28,[\"error\",\"message\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[6,[\"if\"],[[28,[\"showError\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[1,[26,[\"errors\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[11,\"select\",[]],[16,\"class\",[26,[\"selectClass\"]],null],[5,[\"action\"],[[28,[null]],\"updateValue\"],[[\"on\"],[\"change\"]]],[13],[0,\"\\n  \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"\\n    \"],[1,[26,[\"prompt\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"content\"]]],[[\"key\"],[\"@identity\"]],{\"statements\":[[0,\"    \"],[11,\"option\",[]],[16,\"value\",[34,[[33,[\"read-path\"],[[28,[\"item\"]],[28,[\"optionValuePath\"]]],null]]]],[13],[0,\"\\n      \"],[1,[33,[\"read-path\"],[[28,[\"item\"]],[28,[\"optionLabelPath\"]]],null],false],[0,\"\\n     \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/select-validated.hbs" } });
});
define("pilots/templates/components/side-menu-toggle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8rM38D0T", "block": "{\"statements\":[[6,[\"if\"],[[29,\"default\"]],null,{\"statements\":[[0,\"  \"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"toggle-bars\"],[13],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/side-menu-toggle.hbs" } });
});
define("pilots/templates/components/side-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "5SW/1jpZ", "block": "{\"statements\":[[18,\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/side-menu.hbs" } });
});
define("pilots/templates/components/simple-weather", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "cnxjiEsr", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"weather\"]]],null,{\"statements\":[[0,\"  \"],[11,\"span\",[]],[15,\"class\",\"temperature\"],[13],[1,[26,[\"degree\"]],false],[14],[11,\"span\",[]],[13],[0,\"F\"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"\\n    \"],[1,[33,[\"weather-icon\"],null,[[\"icon\",\"width\"],[[28,[\"weather\",\"icon\"]],50]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"visible-xs\"],[13],[0,\"\\n    \"],[1,[33,[\"weather-icon\"],null,[[\"icon\",\"width\"],[[28,[\"weather\",\"icon\"]],35]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/simple-weather.hbs" } });
});
define("pilots/templates/components/sortable-objects", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FAKME76P", "block": "{\"statements\":[[18,\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/sortable-objects.hbs" } });
});
define("pilots/templates/components/status-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "66uCdPwo", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"twoButtons\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"status-button\"],[13],[0,\"\\n  \"],[11,\"span\",[]],[16,\"class\",[34,[\"status-icon-cell \",[33,[\"unless\"],[[28,[\"isFlightComplete\"]],\"icon-Checkmark_b\",\"icon-Checkmark_c\"],null]]]],[13],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"status-icon-text\"],[13],[0,\"\\n    Flight Not Complete\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[16,\"class\",[34,[\"status-button \",[33,[\"if\"],[[28,[\"isFlightComplete\"]],\"\",\"showPointer\"],null]]]],[5,[\"action\"],[[28,[null]],\"markComplete\"],[[\"bubbles\"],[false]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[16,\"class\",[34,[\"status-icon-cell \",[33,[\"if\"],[[28,[\"isFlightComplete\"]],\"icon-Checkmark_b\",\"icon-Checkmark_c\"],null]]]],[13],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"status-icon-text\"],[13],[0,\"\\n    Flight Completed\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"status-button \",[33,[\"if\"],[[28,[\"isFlightComplete\"]],\"\",\"showPointer\"],null]]]],[5,[\"action\"],[[28,[null]],\"markComplete\"],[[\"bubbles\"],[false]]],[13],[0,\"\\n  \"],[11,\"span\",[]],[16,\"class\",[34,[\"status-icon-cell \",[33,[\"if\"],[[28,[\"isFlightComplete\"]],\"icon-Checkmark_b\",\"icon-Checkmark_c\"],null]]]],[13],[14],[0,\"\\n  \"],[11,\"span\",[]],[15,\"class\",\"status-icon-text\"],[13],[0,\"\\n    \"],[1,[26,[\"statusText\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/status-button.hbs" } });
});
define("pilots/templates/components/submit-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kpeOjqpc", "block": "{\"statements\":[[1,[26,[\"name\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/submit-button.hbs" } });
});
define('pilots/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define("pilots/templates/components/textarea-trigger-save", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ne+vRXdC", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/textarea-trigger-save.hbs" } });
});
define("pilots/templates/components/top-navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "56b0cHrS", "block": "{\"statements\":[[11,\"div\",[]],[16,\"class\",[34,[\"hidden-xs hidden-sm top-navbar-desktop \",[33,[\"if\"],[[33,[\"is-not\"],[[28,[\"useDarkHeader\"]]],null],\"dark-header\"],null]]]],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"right-wrapper\"],[13],[0,\"\\n\"],[6,[\"link-to\"],[\"dashboard\"],[[\"class\"],[\"navbar-logo\"]],{\"statements\":[[6,[\"if\"],[[28,[\"useDarkHeader\"]]],null,{\"statements\":[[0,\"      \"],[11,\"img\",[]],[16,\"src\",[34,[[26,[\"rootURL\"]],\"/assets/images/dronebase_logo_navy.svg\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"img\",[]],[16,\"src\",[34,[[26,[\"rootURL\"]],\"/assets/images/logo_white.png\"]]],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[6,[\"link-to\"],[\"dashboard\"],[[\"class\"],[\"icon\"]],{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"DASHBOARD\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"link-to\"],[\"clientmissionintro\"],[[\"class\"],[\"icon\"]],{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"CLIENT MISSION\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"left-wrapper\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"notifications-nav-container nav-tooltip\"],[5,[\"action\"],[[28,[null]],\"toggleNotifications\",\"click\"]],[13],[0,\"\\n      \"],[11,\"img\",[]],[16,\"src\",[34,[[33,[\"if\"],[[28,[\"useDarkHeader\"]],\"/assets/images/notifications_icon.svg\",\"/assets/images/notification_bell_white.svg\"],null]]]],[16,\"class\",[34,[\"notifications-nav-button nav-tooltip \",[33,[\"if\"],[[28,[\"notificationsActive\"]],\"notification-active\"],null]]]],[15,\"title\",\"Notifications\"],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"notifications\",\"notificationCount\"]]],null,{\"statements\":[[0,\"        \"],[11,\"span\",[]],[15,\"class\",\"notifications-nav-counter\"],[13],[1,[28,[\"notifications\",\"notificationCount\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"notifications\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"class\",\"notifications-up-arrow\"],[13],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"notifications-header\"],[13],[0,\"\\n          NOTIFICATIONS\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"notifications-table\"],[13],[0,\"\\n          \"],[11,\"table\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"notifications\",\"model\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"notification-dropdown\"],null,[[\"model\",\"index\"],[[28,[\"notification\"]],[28,[\"index\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"notification\",\"index\"]},null],[0,\"            \"],[11,\"tr\",[]],[15,\"class\",\"mark-read-list-item\"],[13],[0,\"\\n              \"],[11,\"td\",[]],[13],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"td\",[]],[15,\"class\",\"notifications-markallasread\"],[5,[\"action\"],[[28,[null]],\"markAllAsRead\"]],[13],[0,\"Mark all as read\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"pilot-menu\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"username\"],[13],[1,[28,[\"sessionAccount\",\"account\",\"email\"]],false],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot_profile_icon.svg\"],[15,\"title\",\"Profile\"],[16,\"class\",[34,[\"profile-icon nav-tooltip \",[33,[\"if\"],[[28,[\"pilotMenuVisible\"]],\"profile-icon-active\"],null]]]],[5,[\"action\"],[[28,[null]],\"togglePilotMenu\"]],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pilotMenuVisible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[16,\"class\",[34,[\"pilot-menu-items \",[33,[\"if\"],[[28,[\"pilotMenuVisible\"]],\"\",\"hidden\"],null]]]],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip profile-header\"],[13],[0,\"PROFILE\"],[14],[0,\"\\n\"],[6,[\"link-to\"],[\"profile\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"Edit Profile\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"link-to\"],[\"pilotlog\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"Completed Missions\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"sidebar-link\"],[5,[\"action\"],[[28,[null]],\"invalidateSession\"]],[13],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"Log out\"],[14],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"class\",\"visible-xs visible-sm\"],[13],[0,\"\\n\"],[6,[\"side-menu-toggle\"],null,null,{\"statements\":[[6,[\"if\"],[[28,[\"useDarkHeader\"]]],null,{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"class\",\"toggle\"],[15,\"src\",\"/assets/images/menu_navy.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"class\",\"toggle\"],[15,\"src\",\"/assets/images/menu_white.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null],[6,[\"side-menu\"],null,[[\"class\"],[\"sidebar\"]],{\"statements\":[[0,\"    \"],[11,\"div\",[]],[15,\"class\",\"sidebar-header\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"sidebar-header-icons\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"pilot-information\"],[5,[\"action\"],[[28,[null]],\"togglePilotMenu\"]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/pilot_profile_icon.svg\"],[16,\"class\",[34,[\"profile-icon \",[33,[\"if\"],[[28,[\"pilotMenuVisible\"]],\"profile-icon-active\"],null]]]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"notifications-nav-container nav-tooltip\"],[15,\"title\",\"Notifications\"],[5,[\"action\"],[[28,[null]],\"toggleNotificationsSidebar\",\"click\"]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/notifications_icon.svg\"],[16,\"class\",[34,[\"notifications-nav-button \",[33,[\"if\"],[[28,[\"notificationsActive\"]],\"notification-active\"],null]]]],[13],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"notifications\",\"notificationCount\"]]],null,{\"statements\":[[0,\"            \"],[11,\"span\",[]],[15,\"class\",\"notifications-nav-counter\"],[13],[1,[28,[\"notifications\",\"notificationCount\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[16,\"class\",[34,[\"username \",[33,[\"if\"],[[28,[\"pilotMenuVisible\"]],\"username-active\"],null]]]],[5,[\"action\"],[[28,[null]],\"togglePilotMenu\"]],[13],[1,[28,[\"sessionAccount\",\"account\",\"email\"]],false],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"sidebar-links\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"pilotMenuVisible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"sidebar-link profile-header\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip profile-header\"],[13],[0,\"PROFILE\"],[14],[0,\"\\n          \"],[11,\"img\",[]],[15,\"class\",\"x-icon\"],[15,\"src\",\"/assets/images/x_mark.svg\"],[5,[\"action\"],[[28,[null]],\"togglePilotMenu\"]],[13],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"link-to\"],[\"profile\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[15,\"data-target\",\"profile\"],[13],[0,\"Edit Profile\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"link-to\"],[\"pilotlog\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[15,\"data-target\",\"profile\"],[13],[0,\"Completed Missions\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"sidebar-link\"],[5,[\"action\"],[[28,[null]],\"invalidateSession\"]],[13],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"Log out\"],[14],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"notificationsActive\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"sidebar-notifications\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"sidebar-link profile-header\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip profile-header\"],[13],[0,\"NOTIFICATIONS\"],[14],[0,\"\\n            \"],[11,\"img\",[]],[15,\"class\",\"x-icon\"],[15,\"src\",\"/assets/images/x_mark.svg\"],[5,[\"action\"],[[28,[null]],\"toggleNotificationsSidebar\"]],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"notifications-table\"],[13],[0,\"\\n            \"],[11,\"table\",[]],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"notifications\",\"model\"]]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"notification-dropdown\"],null,[[\"model\",\"index\"],[[28,[\"notification\"]],[28,[\"index\"]]]]],false],[0,\"\\n\"]],\"locals\":[\"notification\",\"index\"]},null],[0,\"              \"],[11,\"tr\",[]],[15,\"class\",\"mark-read-list-item\"],[13],[0,\"\\n                \"],[11,\"td\",[]],[13],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"td\",[]],[15,\"class\",\"notifications-markallasread\"],[5,[\"action\"],[[28,[null]],\"markAllAsRead\"]],[13],[0,\"Mark all as read\"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"link-to\"],[\"dashboard\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"DASHBOARD\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"link-to\"],[\"clientmissionintro\"],[[\"class\"],[\"sidebar-link\"]],{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"nav-tooltip\"],[13],[0,\"CLIENT MISSION\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/top-navbar.hbs" } });
});
define("pilots/templates/components/upload-assets-other-app", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nYlP4Vn1", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"upload-assets-other-app container-fluid\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"other-app-pic\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"flight_app\",\"delivery_to\"]],\"flight_app\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"class\",\"third-party-app\"],[15,\"src\",\"/assets/images/infog_3pfa_app.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/3rd_party_upload_infographic.svg\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"title\"],[13],[0,\"\\n    Please upload via \"],[1,[28,[\"mission\",\"flight_app\",\"name\"]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"description\"],[13],[0,\"\\n    \"],[1,[33,[\"md-text\"],null,[[\"text\"],[[28,[\"mission\",\"flight_app\",\"pilot_delivery_instruction\",\"web\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"flight_app\",\"name\"]],\"Cyberduck\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"cyberduckStatus\"]],\"COMPLETE\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"cyberduck-access\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"duck-file\"],[5,[\"action\"],[[28,[null]],\"getDuckFile\"]],[13],[0,\"\\n          \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/credential_icon.svg\"],[15,\"class\",\"credential-icon\"],[13],[14],[0,\"\\n          Download Cyberduck Credential\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cyberduck-title\"],[13],[0,\"\\n          Secret Access Key:\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"copy-text\"],[13],[0,\"\\n          \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"value\",[28,[\"mission\",\"flight_app\",\"value\",\"secret_key\"]],null],[15,\"id\",\"secret_key\"],[13],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"id\",\"copyButton\"],[5,[\"action\"],[[28,[null]],\"copyKey\",\"secret_key\"]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"textCopied\"]]],null,{\"statements\":[[0,\"              \"],[11,\"p\",[]],[13],[0,\"Copied\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"              \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/copy_link_icon.svg\"],[15,\"class\",\"copy-link\"],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n\"],[6,[\"unless\"],[[28,[\"startingUploading\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"done-uploading-text\"],[13],[0,\"\\n          Click the “Done Uploading” button below when your upload is completed.\\n        \"],[14],[0,\"\\n        \"],[11,\"button\",[]],[15,\"class\",\"turquoise-button\"],[5,[\"action\"],[[28,[null]],\"doneUploading\"]],[13],[0,\"DONE UPLOADING\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"loading-pane loading-data\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"box\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"sk-circle\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"spinner\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"rect1\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"rect2\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"rect3\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"rect4\"],[13],[14],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"rect5\"],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"is-equal\"],[[28,[\"cyberduckStatus\"]],\"LOADING\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"loading-pane loading-data\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"box\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"sk-circle\"],[13],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"spinner\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"rect1\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"rect2\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"rect3\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"rect4\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"rect5\"],[13],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"generating-key\"],[13],[0,\"\\n        Generating access key…\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"button\",[]],[15,\"class\",\"turquoise-button\"],[5,[\"action\"],[[28,[null]],\"startUploading\"]],[13],[0,\"START UPLOADING PROCESS\"],[14],[0,\"\\n    \"]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"unless\"],[[33,[\"is-equal\"],[[28,[\"mission\",\"flight_app\",\"delivery_to\"]],\"flight_app\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"a\",[]],[15,\"class\",\"turquoise-button\"],[16,\"href\",[28,[\"mission\",\"flight_app\",\"delivery_to_url\"]],null],[15,\"target\",\"_blank\"],[13],[0,\"\\n        UPLOAD NOW\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"small-description\"],[13],[0,\"\\n        This will open the new window\\n      \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[]}],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/upload-assets-other-app.hbs" } });
});
define("pilots/templates/components/uploading-asset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kQwwsKx2", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"upload-file shot-asset\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"processing-wrapper\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"asset\"],[16,\"style\",[34,[\"background-image:url(\",[28,[\"file\",\"thumbnail\"]],\")\"]]],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"filename\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"name\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"file\",\"error\"]]],null,{\"statements\":[[0,\"        \"],[11,\"i\",[]],[15,\"class\",\"fa fa-exclamation-triangle\"],[13],[14],[0,\" \"],[1,[28,[\"file\",\"sanitizedName\"]],false],[0,\" \"],[11,\"b\",[]],[13],[0,\"There was an error uploading this file. Please remove and try again.\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"          \"],[1,[28,[\"file\",\"sanitizedName\"]],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[11,\"a\",[]],[15,\"class\",\"delete-asset\"],[5,[\"action\"],[[28,[null]],\"removeAsset\",[28,[\"queue\",\"uploader\"]],[28,[\"file\"]]]],[13],[11,\"i\",[]],[15,\"class\",\"icon-Xmark\"],[13],[14],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/uploading-asset.hbs" } });
});
define("pilots/templates/components/v2-dashboard-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Gg0w40Tb", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"showfilter\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"dashboard-map-filter\"],null,[[\"missionFilters\",\"updateFilterAction\"],[[28,[\"missionFilters\"]],\"updateFilter\"]]],false],[0,\"\\n  \"],[1,[33,[\"dashboard-map-active-missions\"],null,[[\"missions\",\"declineAction\",\"selectedAction\",\"cancelPanoAction\",\"availableMissionAction\"],[[28,[\"model\",\"missions\"]],\"declineMission\",\"selectedMission\",\"cancelPano\",\"availableMission\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[11,\"div\",[]],[15,\"id\",\"map-canvas\"],[16,\"class\",[34,[[33,[\"if\"],[[28,[\"dashboard\"]],\"map-canvas-dashboard\"],null],\" \",[33,[\"if\"],[[28,[\"publicsearch\"]],\"map-canvas-publicsearch\"],null]]]],[13],[14],[0,\"\\n\"],[11,\"div\",[]],[15,\"id\",\"info-window-node\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/v2-dashboard-map.hbs" } });
});
define("pilots/templates/components/validated-checkbox-auto-save", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yyXjLZri", "block": "{\"statements\":[[1,[33,[\"one-way-checkbox\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],[[\"update\",\"onchange\",\"required\",\"data-validate\",\"id\",\"classNames\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],null]],null],[33,[\"action\"],[[28,[null]],\"validateProperty\",[28,[\"changeset\"]],[28,[\"propertyName\"]]],null],true,true,[28,[\"propertyName\"]],[28,[\"childClassNames\"]]]]],false],[0,\"\\n\"],[11,\"label\",[]],[16,\"for\",[34,[[26,[\"propertyName\"]]]]],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/validated-checkbox-auto-save.hbs" } });
});
define("pilots/templates/components/validated-checkbox-image-auto-save", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Ocl1xuBY", "block": "{\"statements\":[[11,\"img\",[]],[15,\"src\",\"/assets/images/checkmark_selected.svg\"],[5,[\"action\"],[[28,[null]],\"validateProperty\",[28,[\"changeset\"]],[28,[\"propertyName\"]]]],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/validated-checkbox-image-auto-save.hbs" } });
});
define("pilots/templates/components/validated-checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gshINgYf", "block": "{\"statements\":[[1,[33,[\"one-way-checkbox\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],[[\"update\",\"onchange\",\"required\",\"data-validate\"],[[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],null]],null],[33,[\"action\"],[[28,[null]],\"validateProperty\",[28,[\"changeset\"]],[28,[\"propertyName\"]]],null],true,true]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[28,[\"propertyName\"]]],null]],null,{\"statements\":[[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[28,[\"propertyName\"]]],null],\"validation\"],null]],null,{\"statements\":[[0,\"      \"],[11,\"span\",[]],[15,\"class\",\"error term\"],[13],[1,[28,[\"error\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"error\"]},null]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/validated-checkbox.hbs" } });
});
define("pilots/templates/components/validated-input-auto-save", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GsfcPQEk", "block": "{\"statements\":[[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[28,[\"propertyName\"]]],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[0,\"\\n\"],[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[28,[\"propertyName\"]]],null],\"validation\"],null]],null,{\"statements\":[[0,\"    \"],[1,[28,[\"error\"]],false],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"saved\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"saved\"],[13],[0,\"\\n    saved\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[1,[33,[\"one-way-input\"],null,[[\"id\",\"value\",\"update\",\"keyUp\",\"placeholder\",\"class\",\"type\"],[[28,[\"inputId\"]],[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null],[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],null]],null],[33,[\"action\"],[[28,[null]],\"validateProperty\",[28,[\"changeset\"]],[28,[\"propertyName\"]]],null],[28,[\"placeholder\"]],\"form-control\",[28,[\"type\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/validated-input-auto-save.hbs" } });
});
define("pilots/templates/components/validated-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZKZnTOc9", "block": "{\"statements\":[[6,[\"if\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[33,[\"if\"],[[28,[\"errorPropertyName\"]],[28,[\"errorPropertyName\"]],[28,[\"propertyName\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[0,\"\\n\"],[6,[\"each\"],[[33,[\"get\"],[[33,[\"get\"],[[28,[\"changeset\",\"error\"]],[33,[\"if\"],[[28,[\"errorPropertyName\"]],[28,[\"errorPropertyName\"]],[28,[\"propertyName\"]]],null]],null],\"validation\"],null]],null,{\"statements\":[[0,\"    \"],[1,[28,[\"error\"]],false],[0,\"\\n\"]],\"locals\":[\"error\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[1,[33,[\"one-way-input\"],null,[[\"value\",\"update\",\"onblur\",\"placeholder\",\"class\",\"type\",\"autocomplete\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null],[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"changeset\"]],[28,[\"propertyName\"]]],null]],null]],null],[33,[\"action\"],[[28,[null]],\"validateProperty\",[28,[\"changeset\"]],[33,[\"if\"],[[28,[\"errorPropertyName\"]],[28,[\"errorPropertyName\"]],[28,[\"propertyName\"]]],null]],null],[28,[\"placeholder\"]],\"form-control input-lg\",[28,[\"type\"]],[28,[\"autocomplete\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/validated-input.hbs" } });
});
define("pilots/templates/components/video-player", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "9GaOYw6j", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"video-player-container\"],[15,\"id\",\"video-player-container\"],[16,\"onMouseEnter\",[33,[\"action\"],[[28,[null]],\"showVideoControls\"],null],null],[16,\"onMouseLeave\",[33,[\"action\"],[[28,[null]],\"hideVideoControls\"],null],null],[13],[0,\"\\n  \"],[11,\"video\",[]],[15,\"class\",\"video-player\"],[16,\"muted\",[26,[\"muted\"]],null],[15,\"controlsList\",\"nodownload\"],[16,\"loop\",[26,[\"loop\"]],null],[16,\"controls\",[26,[\"showDefaultControls\"]],null],[5,[\"action\"],[[28,[null]],\"togglePlayPause\"]],[13],[0,\"\\n    \"],[11,\"source\",[]],[16,\"src\",[26,[\"videoSrc\"]],null],[15,\"type\",\"video/mp4\"],[13],[14],[0,\"\\n    Your browser does not support HTML5 video.\\n  \"],[14],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"showDefaultControls\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"play-hide\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/videoPlayer/play_button.svg\"],[15,\"class\",\"play-pause-button play\"],[13],[14],[0,\"\\n    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/videoPlayer/pause_button.svg\"],[15,\"class\",\"play-pause-button pause\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[16,\"class\",[34,[\"video-controls \",[33,[\"if\"],[[28,[\"hideAudio\"]],\"no-audio\"],null]]]],[13],[0,\"\\n\"],[6,[\"unless\"],[[28,[\"hideAudio\"]]],null,{\"statements\":[[0,\"      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/videoPlayer/no_audio_icon.svg\"],[15,\"class\",\"video-control-button\"],[15,\"id\",\"volume-on\"],[5,[\"action\"],[[28,[null]],\"toggleVolume\"]],[13],[14],[0,\"\\n      \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/videoPlayer/audio_icon.svg\"],[15,\"class\",\"video-control-button\"],[15,\"id\",\"muted\"],[5,[\"action\"],[[28,[null]],\"toggleVolume\"]],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"    \"],[11,\"img\",[]],[15,\"src\",\"/assets/images/videoPlayer/fullscreen_icon.svg\"],[15,\"class\",\"video-control-button\"],[15,\"id\",\"full-screen\"],[5,[\"action\"],[[28,[null]],\"fullScreen\"]],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/video-player.hbs" } });
});
define("pilots/templates/components/weather-icon", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7SqqTD71", "block": "{\"statements\":[[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/components/weather-icon.hbs" } });
});
define("pilots/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "RhNqYJoG", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"dashboard\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"showRegistrationCode\"]]],null,{\"statements\":[[0,\"    \"],[1,[33,[\"log\"],[\"after signup\"],null],false],[0,\"\\n    \"],[1,[33,[\"clear-cookie\"],[\"registrationCompleted\"],null],false],[0,\"\\n    \"],[4,\" Google Code for Pilot Sign Up Conversion Page \"],[0,\"\\n    \"],[11,\"div\",[]],[15,\"style\",\"display:inline;\"],[13],[0,\"\\n      \"],[11,\"img\",[]],[15,\"height\",\"1\"],[15,\"width\",\"1\"],[15,\"style\",\"border-style:none;\"],[15,\"alt\",\"\"],[15,\"src\",\"//www.googleadservices.com/pagead/conversion/956776802/?label=ZrrwCK_Mh2wQ4oKdyAM&guid=ON&script=0\"],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[1,[33,[\"pilot-dashboard\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/dashboard.hbs" } });
});
define("pilots/templates/four-oh-four", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zPYzlLFS", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"text-center\"],[13],[0,\"\\n  \"],[11,\"h3\",[]],[13],[0,\"Not Found\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Sorry, the page you are looking for does not exist. Please check\\n  the address and try again.\"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/four-oh-four.hbs" } });
});
define("pilots/templates/gettymission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "qHXiO3cg", "block": "{\"statements\":[[1,[33,[\"getty-mission\"],null,[[\"onfileadd\",\"model\"],[\"addAsset\",[28,[\"model\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/gettymission.hbs" } });
});
define("pilots/templates/head", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A7q+UG0U", "block": "{\"statements\":[[4,\" `ember-cli-meta-tags/templates/head.hbs` \"],[0,\"\\n\"],[1,[33,[\"head-tags\"],null,[[\"headTags\"],[[28,[\"model\",\"headTags\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/head.hbs" } });
});
define("pilots/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PBQkysl7", "block": "{\"statements\":[[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/index.hbs" } });
});
define("pilots/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "k4Cl149T", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"loading-pane\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"loading-message text-center\"],[13],[0,\"\\n    \"],[1,[26,[\"loadingMessage\"]],false],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"loader loader-md\"],[13],[0,\"\\n      \"],[11,\"span\",[]],[13],[14],[0,\"\\n      \"],[11,\"span\",[]],[13],[14],[0,\"\\n      \"],[11,\"span\",[]],[13],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/loading.hbs" } });
});
define("pilots/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lRJhLKWH", "block": "{\"statements\":[[1,[26,[\"login-form\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/login.hbs" } });
});
define("pilots/templates/panomission", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "/8IkOL+R", "block": "{\"statements\":[[1,[33,[\"pano-mission\"],null,[[\"model\",\"onfileadd\",\"onstartupload\"],[[28,[\"model\"]],\"addAsset\",\"startUpload\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/panomission.hbs" } });
});
define("pilots/templates/pilot/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oVo5agnW", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container-top container-main\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6 col-sm-offset-3 container-content\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"page-header\"],[13],[0,\"\\n          \"],[11,\"h2\",[]],[13],[0,\"Account\"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n            \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"first_name\"]],[28,[\"model\",\"pilot\"]],\"First Name\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6\"],[13],[0,\"\\n            \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"last_name\"]],[28,[\"model\",\"pilot\"]],\"Last Name\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"inline-input no-edit\"],[13],[0,\"\\n            \"],[1,[28,[\"model\",\"pilot\",\"email\"]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"type\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"password\"]],[28,[\"model\",\"pilot\"]],\"password\",\"Reset Password\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"phone\"]],[28,[\"model\",\"pilot\"]],\"Phone\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"birthday\"]],[28,[\"model\",\"pilot\"]],\"Birthday\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"address\"]],[28,[\"model\",\"pilot\"]],\"Street\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"address2\"]],[28,[\"model\",\"pilot\"]],\"Street 2\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"city\"]],[28,[\"model\",\"pilot\"]],\"City\"]]],false],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-5\"],[13],[0,\"\\n            \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"state\"]],[28,[\"model\",\"pilot\"]],\"State\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-3\"],[13],[0,\"\\n            \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"postal_code\"]],[28,[\"model\",\"pilot\"]],\"Postal Code\"]]],false],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-4\"],[13],[0,\"\\n            \"],[1,[33,[\"select-inplace-edit\"],null,[[\"content\",\"model\",\"prompt\",\"value\"],[[28,[\"model\",\"countries\"]],[28,[\"model\",\"pilot\"]],\"Country\",[28,[\"model\",\"pilot\",\"country\"]]]]],false],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[1,[33,[\"select-inplace-edit\"],null,[[\"content\",\"model\",\"prompt\",\"value\",\"label\"],[[28,[\"model\",\"travelhttps://annvelents.github.io/dronebase_styleguide_t/distance\"]],[28,[\"model\",\"pilot\"]],\"https://annvelents.github.io/dronebase_styleguide_t/distance willing to travel for mission\",[28,[\"model\",\"pilot\",\"travel_https://annvelents.github.io/dronebase_styleguide_t/distance\"]],\"https://annvelents.github.io/dronebase_styleguide_t/distance willing to travel for mission\"]]],false],[0,\"\\n        \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"drone_system\"]],[28,[\"model\",\"pilot\"]],\"Drone System (Phantom 3 Quality & Above Preferred)\"]]],false],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"col-sm-12\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"international\"]]],null,{\"statements\":[[0,\"              \"],[1,[33,[\"input-inplace-edit\"],null,[[\"value\",\"model\",\"placeholder\"],[[28,[\"model\",\"pilot\",\"payment_processor_id\"]],[28,[\"model\",\"pilot\"]],\"PayPal Email (For Payment)\"]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/pilot/edit.hbs" } });
});
define("pilots/templates/pilot/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "MtogVl06", "block": "{\"statements\":[[1,[33,[\"pilot-form\"],null,[[\"pilot\",\"countries\",\"travelhttps://annvelents.github.io/dronebase_styleguide_t/distance\",\"class\",\"action\"],[[28,[\"model\",\"pilot\"]],[28,[\"model\",\"countries\"]],[28,[\"model\",\"travelhttps://annvelents.github.io/dronebase_styleguide_t/distance\"]],\"form\",\"save\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/pilot/new.hbs" } });
});
define("pilots/templates/pilot/onboarding", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "T8frw1zg", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container-fluid container-main container-top\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-sm-6 col-sm-offset-3 container-content\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"created\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h4\",[]],[13],[0,\"Welcome \"],[1,[28,[\"model\",\"pilot\",\"first_name\"]],false],[0,\"!\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Thank you for your interest in being a pilot for DroneBase.\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          There are still a couple steps needed in order to fully qualify you.\\n        \"],[14],[0,\"\\n        \"],[11,\"ol\",[]],[15,\"class\",\"pilot-instructions\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[0,\"\\n            Review the following documents:\\n            \"],[11,\"ul\",[]],[13],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"href\",\"http://dronebase-documents.s3.amazonaws.com/pilots/dronebase-operating-principles.pdf\"],[15,\"target\",\"_blank\"],[13],[0,\"DroneBase Operating Principles\"],[14],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"href\",\"http://dronebase-documents.s3.amazonaws.com/pilots/dronebase-incident-report.pdf\"],[15,\"target\",\"_blank\"],[13],[0,\"DroneBase Incident Report\"],[14],[14],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"a\",[]],[15,\"href\",\"https://s3.amazonaws.com/dronebase-documents/pilots/part_107_summary.pdf\"],[15,\"target\",\"_blank\"],[13],[0,\"FAA Part 107 Regulations\"],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[0,\"\\n            Complete the DroneBase Pilot Evaluation:\\n            \"],[11,\"ul\",[]],[13],[0,\"\\n              \"],[11,\"li\",[]],[13],[11,\"a\",[]],[16,\"href\",[34,[\"https://dronebase.typeform.com/to/\",[28,[\"model\",\"typeFormId\"]],\"?pilotid=\",[28,[\"model\",\"pilot\",\"id\"]],\"&name=\",[28,[\"model\",\"pilot\",\"full_name\"]],\"&email=\",[28,[\"model\",\"pilot\",\"email\"]]]]],[15,\"target\",\"_blank\"],[13],[0,\"DroneBase Pilot Evaluation\"],[14],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Again, thank you for your interest in piloting for DroneBase.\"],[11,\"br\",[]],[13],[14],[0,\"\\n          We are excited to get you on board and start sending you missions!\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"evaluation_complete\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h4\",[]],[13],[0,\"Under Review\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          DroneBase staff is currently reviewing your application.\\n          We will contact you with updates to your application status.\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"approved\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h4\",[]],[13],[0,\"Congratulations!\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          You are now a \"],[11,\"b\",[]],[13],[0,\"Qualified DroneBase Pilot\"],[14],[0,\". You will recieve an email once a mission is available to you.\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Please take a moment to review your \"],[6,[\"link-to\"],[\"pilot.edit\"],null,{\"statements\":[[0,\"account information\"]],\"locals\":[]},null],[0,\". \\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[28,[\"model\",\"pilot\",\"rejected\"]]],null,{\"statements\":[[0,\"        \"],[11,\"h4\",[]],[13],[0,\"We're sorry...\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Unfortunately, your application to become a \"],[11,\"b\",[]],[13],[0,\"Qualified DroneBase Pilot\"],[14],[0,\" was rejected.\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[11,\"p\",[]],[13],[0,\"\\n          Best,\"],[11,\"br\",[]],[13],[14],[0,\"\\n          \"],[11,\"b\",[]],[13],[0,\"Team DroneBase\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/pilot/onboarding.hbs" } });
});
define("pilots/templates/pilotlog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "f6PsJmp+", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"pilotlog\"],[13],[0,\"\\n  \"],[1,[33,[\"dashboard-header\"],null,[[\"pilot\"],[[28,[\"model\",\"pilot\"]]]]],false],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"row\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hidden-xs\"],[13],[0,\"\\n      \"],[1,[33,[\"dashboard-map\"],null,[[\"model\",\"class\",\"pilotlog\"],[[28,[\"model\"]],\"col-sm-9\",true]]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[1,[33,[\"pilot-details\"],null,[[\"pilot\"],[[28,[\"model\",\"pilot\"]]]]],false],[0,\"\\n  \"],[14],[0,\"\\n  \"],[1,[33,[\"pilot-log\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n  \"],[1,[33,[\"page-numbers\"],null,[[\"content\"],[[28,[\"model\",\"missions\"]]]]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/pilotlog.hbs" } });
});
define("pilots/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "b2GGNadq", "block": "{\"statements\":[[1,[33,[\"pilot-profile\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/profile.hbs" } });
});
define("pilots/templates/publicsearch", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "t3gtBjAO", "block": "{\"statements\":[[1,[33,[\"public-search\"],null,[[\"model\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/publicsearch.hbs" } });
});
define("pilots/templates/request-password-reset", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "KzkSfaoE", "block": "{\"statements\":[[1,[26,[\"request-password-reset-form\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/request-password-reset.hbs" } });
});
define("pilots/templates/reset-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "jRuelFgU", "block": "{\"statements\":[[1,[33,[\"reset-password-form\"],null,[[\"model\",\"action\"],[[28,[\"model\"]],\"loginSuccess\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/reset-password.hbs" } });
});
define("pilots/templates/terms_and_conditions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "GZ3WVbof", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"container-fluid container-main container-top\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"row terms-container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"col-12-xs\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[13],[0,\"Terms and Conditions\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"lead\"],[13],[0,\"\\n          Last Updated on September 19, 2017\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          This Terms and Conditions (this “Agreement”) is made and entered by and between DroneBase Inc., a Delaware corporation with its principal place of business at 2800 Olympic Blvd, 2nd Floor, Santa Monica, CA (the “Company”) and “Pilot” (each herein referred to individually as a “Party,” or collectively as the “Parties”).\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          Pilot’s use of the services offered by Company as well, or, signing up to use such services offered by Company constitute acceptance of this Agreement.\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          This Agreement contains terms and conditions that are applicable to all Pilots, as well as a additional terms and conditions that apply to Pilots engaging in Paid Missions (“Contractor”).\\n        \"],[14],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"A. Terms and Conditions for all Pilots\"],[14],[0,\"\\n        \"],[11,\"dl\",[]],[13],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            1. Agreement to DroneBase Standard Terms of Service.\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              Pilot agrees to all terms, provisions and agreements set forth in the DroneBase Standard Terms of Service (http://www.dronebase.com/terms) (except to the extent expressly modified herein) are hereby incorporated herein by reference with the same force and effect as though fully set forth herein. To the extent that the terms set forth in this Agreement are inconsistent with the terms of the DroneBase Standard Terms of Service terms, the terms set forth in this Agreement shall apply.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            2. Disclaimer\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              THE SERVICES ARE PROVIDED \\\"AS IS\\\" AND \\\"AS AVAILABLE.\\\" THE COMPANY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN ADDITION, THE COMPANY MAKES NO REPRESENTATION, WARRANTY, OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, OR AVAILABILITY OF THE SERVICES OR ANY SERVICES OR GOODS REQUESTED THROUGH THE USE OF THE SERVICES, OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            3. Limitation of Liability\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              IN NO EVENT SHALL COMPANY BE LIABLE TO THE PILOT OR TO ANY OTHER PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS OR LOSS OF BUSINESS, HOWEVER CAUSED AND UNDER ANY THEORY OF LIABILITY, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHER THEORY OF LIABILITY, REGARDLESS OF WHETHER COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY. IN NO EVENT SHALL COMPANY’S LIABILITY ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT EXCEED THE AMOUNTS PAID BY COMPANY TO THE CONTRACTOR UNDER THIS AGREEMENT FOR THE SERVICES, DELIVERABLES OR INVENTION GIVING RISE TO SUCH LIABILITY.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            4. Miscellaneous\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.1 Governing Law;\"],[14],[0,\" Consent to Personal Jurisdiction. This Agreement shall be governed by the laws of the State of California, without regard to the conflicts of law provisions of any jurisdiction. To the extent that any lawsuit is permitted under this Agreement, the Parties hereby expressly consent to the personal and exclusive jurisdiction and venue of the state and federal courts located in California.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.2 Assignability.\"],[14],[0,\" This Agreement will be binding upon Pilot’s heirs, executors, assigns, administrators, and other legal representatives, and will be for the benefit of the Company, its successors, and its assigns. There are no intended third-party beneficiaries to this Agreement, except as expressly stated. Except as may otherwise be provided in this Agreement, Pilot may not sell, assign or delegate any rights or obligations under this Agreement. Notwithstanding anything to the contrary herein, Company may assign this Agreement and its rights and obligations under this Agreement to any successor to all or substantially all of Company’s relevant assets, whether by merger, consolidation, reorganization, reincorporation, sale of assets or stock, change of control or otherwise.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.3. Entire Agreement.\"],[14],[0,\" This Agreement constitutes the entire agreement and understanding between the Parties with respect to the subject matter herein and supersedes all prior written and oral agreements, discussions, or representations between the Parties. Pilot represents and warrants that he/she is not relying on any statement or representation not contained in this Agreement. To the extent any terms set forth in any exhibit or schedule conflict with the terms set forth in this Agreement, the terms of this Agreement shall control unless otherwise expressly agreed by the Parties in such exhibit or schedule.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.4. Headings.\"],[14],[0,\" Headings are used in this Agreement for reference only and shall not be considered when interpreting this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.5. Severability.\"],[14],[0,\" If a court or other body of competent jurisdiction finds, or the Parties mutually believe, any provision of this Agreement, or portion thereof, to be invalid or unenforceable, such provision will be enforced to the maximum extent permissible so as to effect the intent of the Parties, and the remainder of this Agreement will continue in full force and effect.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.6. Modification, Waiver.\"],[14],[0,\" No modification of or amendment to this Agreement, nor any waiver of any rights under this Agreement, will be effective unless in a writing signed by the Parties. Waiver by the Company of a breach of any provision of this Agreement will not operate as a waiver of any other or subsequent breach. However, Company reserves the right to update and change this Agreement. Any use of the service offered by Company after such changes and amendments constitute acceptance to the changes and amendments.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.7. Notices.\"],[14],[0,\" Any notice or other communication required or permitted by this Agreement to be given to a Party shall be in writing and shall be deemed given (i) if delivered personally or by commercial messenger or courier service, or (ii) if mailed by U.S. registered or certified mail (return receipt requested), to the Party at the Party’s address written below or at such other address as the Party may have previously specified by like notice. If by mail, delivery shall be deemed effective five business days after mailing in to the Company, to:\\n            \"],[14],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              2800 Olympic Blvd, Floor 2\"],[11,\"br\",[]],[13],[14],[0,\"\\n              Santa Monica, CA 90404\"],[11,\"br\",[]],[13],[14],[0,\"\\n              Attention: General Counsel\"],[11,\"br\",[]],[13],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.8. Attorneys’ Fees.\"],[14],[0,\" In any court action at law or equity that is brought by one of the Parties to this Agreement to enforce or interpret the provisions of this Agreement, the prevailing Party will be entitled to reasonable attorneys’ fees, in addition to any other relief to which that Party may be entitled.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"h4\",[]],[13],[0,\"B. Additional Terms and Conditions Applicable to Pilots as Contractors\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          DroneBase provides commercial opportunities for Pilots to engage in paid missions (“Paid Missions”) such as Client Missions, Pano Missions, and Getty Missions. This list is not exhaustive, but serves as a way of example.\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          In order to accept a Paid Mission, the Pilot also agrees to the following additional terms and conditions:\\n        \"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"\\n          The Company desires to retain Pilot (“Contractor”) as an independent contractor to perform contractor services for the Company, and Contractor is willing to perform such services, on the terms described below. In consideration of the mutual promises contained herein, the Parties agree as follows:\\n        \"],[14],[0,\"\\n        \"],[11,\"dl\",[]],[13],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            1. Eligibility\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"1.1 Additional Eligibility Terms.\"],[14],[0,\" In addition to the Eligibility terms listed in the DroneBase Standard Terms of Service, in order to be eligible for Paid Missions, Contractor represents and warrants that a) Contractor has full power and authority to enter into this Agreement and perform the obligations thereunder; b) Contractor will comply with all applicable laws in Contractor’s performance of this Agreement, including holding and complying with all permits, licenses, registrations, airspace authorizations, and other governmental authorizations necessary to provide the services in this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"1.2 Insurance.\"],[14],[0,\" Contractor also represents and warrants that Contractor maintains adequate liability insurance that provides protection against bodily injury and property damage to third parties at levels of coverage that satisfy the minimum requirements to operate a drone necessary to provide the services in this Agreement. Furthermore, Contractor agrees to provide Company a copy of the insurance policy, policy declarations, proof of insurance identification card, and proof of premium payment required in this Section B.1.2 upon request.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            2. Services and Compensation\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"2.1 General.\"],[14],[0,\" Contractor shall perform the Paid Missions provided by Company, its third party contractors, affiliates and partners for the Company (or its designee), and the Company agrees to pay Pilot the compensation for Pilot’s performance of the Paid Missions.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              The Paid Missions will include, but will not be limited to, the following: aerial imagery and video collection; online delivery of imagery and video. Pilot will perform Paid Missions for the Company on a project-by-project basis, and each Project shall be mutually agreed upon between Contractor and the Company in advance of each Paid Mission. Each Paid Mission shall contain at a minimum a detailed description of the services to be performed and any deliverables to be provided, and together with this Agreement (but separate and apart from any other Paid Mission), shall collectively constitute the entire agreement for such Paid Mission.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"2.2 Acceptance and Compensation.\"],[14],[0,\" The Company will pay Contractor job amount listed on schedule upon delivery by the Contractor and acceptance by the Company of aerial imagery and video collection. Acceptance includes final confirmation that delivery of outputs meet the defined scope of work and service as requested by the Company. All payments and benefits provided for under this Agreement are intended to be exempt from or otherwise comply with the requirements of Section 409A of the Internal Revenue Code of 1986, as amended, and the regulations and guidance thereunder (together, “Section 409A”) so that none of the severance payments and benefits to be provided hereunder will be subject to the additional tax imposed under Section 409A, and any ambiguities or ambiguous terms herein will be interpreted to be exempt or so comply. Each payment and benefit payable under this Agreement is intended to constitute a separate payment for purposes of Section 1.409A-2(b)(2) of the Treasury Regulations.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            3. Confidentiality\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"3.1 Definition of Confidential Information.\"],[14],[0,\" “Confidential Information” means any non-public information that relates to the actual or anticipated business and/or products, research or development of the Company, its affiliates or subsidiaries, or to the Company’s, its affiliates’ or subsidiaries’ technical data, trade secrets, or know-how, including, but not limited to, research, product plans, or other information regarding the Company’s, its affiliates’ or subsidiaries’ products or services and markets therefor, customer lists and customers (including, but not limited to, customers of the Company on whom Contractor called or with whom Contractor became acquainted during the term of this Agreement), software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances, and other business information disclosed by the Company, its affiliates or subsidiaries, either directly or indirectly, in writing, orally or by drawings or inspection of premises, parts, equipment, or other property of Company, its affiliates or subsidiaries. Notwithstanding the foregoing, Confidential Information shall not include any such information which Contractor can establish (i) was publicly known or made generally available prior to the time of disclosure to Contractor; (ii) becomes publicly known or made generally available after disclosure to Contractor through no wrongful action or inaction of Contractor; or (iii) is in the rightful possession of Contractor, without confidentiality obligations, at the time of disclosure as shown by Contractor’s then-contemporaneous written records.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"3.2. Nonuse and Nondisclosure.\"],[14],[0,\" During and after the term of this Agreement, Contractor will hold in the strictest confidence, and take all reasonable precautions to prevent any unauthorized use or disclosure of Confidential Information, and Contractor will not (i) use the Confidential Information for any purpose whatsoever other than as necessary for the performance of the Services on behalf of the Company, or (ii) disclose the Confidential Information to any third party without the prior written consent of an authorized representative of Company, except that Contractor may disclose Confidential Information to the extent compelled by applicable law; provided however, prior to such disclosure, Contractor shall provide prior written notice to Company and seek a protective order or such similar confidential protection as may be available under applicable law. Contractor agrees that no ownership of Confidential Information is conveyed to the Contractor. Without limiting the foregoing, Contractor shall not use or disclose any Company property, intellectual property rights, trade secrets or other proprietary know-how of the Company to invent, author, make, develop, design, or otherwise enable others to invent, author, make, develop, or design identical or substantially similar designs as those developed under this Agreement for any third party. Contractor agrees that Contractor’s obligations under this Section B.3.2 shall continue after the termination of this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"3.3. Other Client Confidential Information.\"],[14],[0,\" Contractor agrees that Contractor will not improperly use, disclose, or induce the Company to use any proprietary information or trade secrets of any former or concurrent employer of Contractor or other person or entity with which Contractor has an obligation to keep in confidence. Contractor also agrees that Contractor will not bring onto the Company’s premises or transfer onto the Company’s technology systems any unpublished document, proprietary information, or trade secrets belonging to any third party unless disclosure to, and use by, the Company has been consented to in writing by such third party.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"3.4. Third Party Confidential Information.\"],[14],[0,\" Contractor recognizes that the Company has received and in the future will receive from third parties their confidential or proprietary information subject to a duty on the Company’s part to maintain the confidentiality of such information and to use it only for certain limited purposes. Contractor agrees that at all times during the term of this Agreement and thereafter, Contractor owes the Company and such third parties a duty to hold all such confidential or proprietary information in the strictest confidence and not to use it or to disclose it to any person, firm, corporation, or other third party except as necessary in carrying out the Services for the Company consistent with the Company’s agreement with such third party.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            4. Ownership.\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.1 Assignment.\"],[14],[0,\" All text, photographs, images, videos, and other materials (“hereinafter collectively referred to as ‘Content’”) submitted to the Company become the exclusive property of the Company. By submitting any Content, the Contractor hereby agrees that the Content is a “Work For Hire” and the sole property of the company, and to the extent that any Content is not a “Work for Hire”, Contractor agrees to irrevocably assign and transfer to the Company and its successors and assigns, all rights, title, and interest in and to the Content. This assignment includes, but it is not limited to, all worldwide copyrights in and to the Content, and the right to use, assign, https://annvelents.github.io/dronebase_styleguide_t/distribute, sell, modify, edit, adapt, dispose, electronically alter, and otherwise make use of the Content the Contractor submit to the Company. The Contractor warrants to the Company that the Contractor has all rights to the Content, and that the Contractor will indemnify the Company for any loss relating from a breach of this warranty and defend the Company against claims regarding the same.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"4.2 Moral Rights.\"],[14],[0,\" Any assignment to the Company of Content includes all rights of attribution, paternity, integrity, modification, disclosure and withdrawal, and any other rights throughout the world that may be known as or referred to as “moral rights,” “artist’s rights,” “droit moral,” or the like (collectively, “Moral Rights”).  To the extent that Moral Rights cannot be assigned under applicable law, Contractor agrees to waive and agree not to enforce any and all Moral Rights, including, without limitation, any right to identification of authorship or limitation on subsequent modification that Contractor may have in the assigned Inventions.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            5. Conflicting Obligations.\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              Contractor represents and warrants that Contractor has no agreements, relationships, or commitments to any other person or entity that conflict with the provisions of this Agreement, Contractor’s obligations to the Company under this Agreement, and/or Contractor’s ability to perform the Services. Contractor will not enter into any such conflicting agreement during the term of this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            6. Return of Company Materials.\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              Upon the termination of this Agreement, or upon Company’s earlier request, Contractor will immediately deliver to the Company, and will not keep in Contractor’s possession, recreate, or deliver to anyone else, any and all Company property, including, but not limited to, Confidential Information, tangible embodiments of the Inventions, all devices and equipment belonging to the Company, all electronically-stored information and passwords to access such property, those records maintained and any reproductions of any of the foregoing items that Contractor may have in Contractor’s possession or control.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            7. Reports.\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              Contractor agrees that Contractor will periodically keep the Company advised as to Contractor’s progress in performing the Services under this Agreement. Contractor further agrees that Contractor will, as requested by the Company, prepare written reports with respect to such progress. The Company and Contractor agree that the reasonable time expended in preparing such written reports will be considered time devoted to the performance of the Services\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            8. Term and Termination\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"8.1 Term.\"],[14],[0,\" The term of this Agreement will commence on the date accepted by you and shall continue until terminated as set forth herein.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"8.2 Termination.\"],[14],[0,\" Either party may terminate this Agreement without cause at any time upon seven (7) days prior written notice to the other party. In addition, Company may terminate this Agreement immediately and without prior notice if (i) Contractor refuses to or is unable to perform the Services or is in breach of any material provision of this Agreement; (ii) in the event Contractor no longer qualifies, under applicable law or the standards and policies of Company, to provide services for Paid Missions or as otherwise set for in this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"8.3 Survival.\"],[14],[0,\" Upon any termination, all rights and duties of the Company and Contractor under this Section B (Additional Terms and Conditions Applicable to Pilots as Contractor) toward each other shall cease except the Company will pay, within thirty (30) days after the effective date of termination, all uncontested amounts owing to Contractor for Services completed and accepted by the Company prior to the termination date and related reimbursable expenses, if any, submitted in accordance with the Company’s policies; and the DroneBase Standard Terms of Service, Section A (Terms and Conditions for all Pilots), Section B.1 (Eligibility), Section B.3 (Confidentiality), Section B.4 (Ownership), B.6 (Return of Company Materials), B.8.3 (Survival), B.9 (Indemnification), B.10 (Nonsolicitation), shall survive the termination of this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            9. Independent Contractor; Benefits\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"9.1. Independent Contractor.\"],[14],[0,\" It is the express intention of the Company and Contractor that Contractor perform the Services as an independent contractor to the Company. Nothing in this Agreement shall in any way be construed to constitute Contractor as an agent, employee or representative of the Company. Without limiting the generality of the foregoing, Contractor is not authorized to bind the Company to any liability or obligation or to represent that Contractor has any such authority. Contractor agrees to furnish (or reimburse the Company for) all tools and materials necessary to accomplish this Agreement and shall incur all expenses associated with performance, except as expressly declared between Company and Contractor. Contractor acknowledges and agrees that Contractor is obligated to report as income all compensation received by Contractor pursuant to this Agreement. Contractor agrees to and acknowledges the obligation to pay all self-employment and other taxes on such income.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              \"],[11,\"i\",[]],[13],[0,\"9.2. Benefits.\"],[14],[0,\" The Company and Contractor agree that Contractor will receive no Company-sponsored benefits from the Company where benefits include, but are not limited to, paid vacation, sick leave, medical insurance and 401k participation. If Contractor is reclassified by a state or federal agency or court as the Company’s employee, Contractor will become a reclassified employee and will receive no benefits from the Company, except those mandated by state or federal law, even if by the terms of the Company’s benefit plans or programs of the Company in effect at the time of such reclassification, Contractor would otherwise be eligible for such benefits.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            10. Indemnification\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              Contractor agrees to indemnify and hold harmless the Company and its affiliates and their directors, officers and employees from and against all taxes, losses, damages, liabilities, costs and expenses, including attorneys’ fees and other legal expenses, arising directly or indirectly from or in connection with (i) any negligent, reckless or intentionally wrongful act of Contractor or Contractor’s assistants, employees, contractors or agents, (ii) a determination by a court or agency that the Contractor is not an independent contractor, (iii) any breach by the Contractor or Contractor’s assistants, employees, contractors or agents of any of the covenants contained in this Agreement and corresponding Confidential Information and Invention Assignment Agreement, (iv) any failure of Contractor to perform the Services in accordance with all applicable laws, rules and regulations, or (v) any violation or claimed violation of a third party’s rights resulting in whole or in part from the Company’s use of the Inventions or other deliverables of Contractor under this Agreement.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"dt\",[]],[13],[0,\"\\n            11. Nonsolicitation\\n          \"],[14],[0,\"\\n          \"],[11,\"dd\",[]],[13],[0,\"\\n            \"],[11,\"p\",[]],[13],[0,\"\\n              To the fullest extent permitted under applicable law, from the date of this Agreement until twelve (12) months after the termination of this Agreement for any reason (the “Restricted Period”), Contractor will not, without the Company’s prior written consent, directly or indirectly, solicit any of the Company’s employees to leave their employment, or attempt to solicit employees of the Company, either for Contractor or for any other person or entity. Contractor will not, without the Company's prior written consent, directly or indirectly, solicit any of the Company's customers that are introduced to Contractor or attempt to solicit any of the Company's customers, either for Contractor or for any other person or entity. Contractor agrees that nothing in this Section 11 shall affect Contractor’s continuing obligations under this Agreement during and after this twelve (12) month period, including, without limitation, Contractor’s obligations under Section B.3.\\n            \"],[14],[0,\"\\n          \"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "pilots/templates/terms_and_conditions.hbs" } });
});
define('pilots/utils/can-use-dom', ['exports', 'ember-metrics/utils/can-use-dom'], function (exports, _emberMetricsUtilsCanUseDom) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsUtilsCanUseDom['default'];
    }
  });
});
define('pilots/utils/feature-manager', ['exports', 'pilots/config/environment'], function (exports, _pilotsConfigEnvironment) {
  var FEATURE_MODULE;

  FEATURE_MODULE = function () {
    var FeatureManager, getKey;
    getKey = function () {
      var LD_KEY_DEVELOPMENT, LD_KEY_PRODUCTION, LD_KEY_STAGING;
      LD_KEY_PRODUCTION = '59d425277c606f0c6c2c9b96';
      LD_KEY_STAGING = '59dacbdd719d2b0aedeedd6a';
      LD_KEY_DEVELOPMENT = '59daccadf41b630ada0a1a3f';
      if (_pilotsConfigEnvironment['default'].environment === _pilotsConfigEnvironment['default'].DEVELOPMENT) {
        return LD_KEY_DEVELOPMENT;
      } else if (_pilotsConfigEnvironment['default'].environment === _pilotsConfigEnvironment['default'].STAGING) {
        return LD_KEY_STAGING;
      } else if (_pilotsConfigEnvironment['default'].environment === _pilotsConfigEnvironment['default'].PRODUCTION) {
        return LD_KEY_PRODUCTION;
      } else {
        throw new Error('Unrecognized environment: ' + _pilotsConfigEnvironment['default'].environment);
      }
    };
    FeatureManager = Ember.Object.extend({
      init: function init() {
        var options, user;
        user = {
          'key': 'ALL_USERS'
        };
        options = {
          bootstrap: 'localStorage'
        };
        this.ldclient = LDClient.initialize(getKey(), user, options);
        this.ldclient.on('ready', (function (_this) {
          return function () {
            return console.log('launchdarkly loaded:: ' + 'environment: ' + _pilotsConfigEnvironment['default'].environment + ' values: ' + JSON.stringify(_this.ldclient.allFlags()));
          };
        })(this));
        return this.ldclient.on('change', (function (_this) {
          return function (settings) {
            return console.log('ld flags changed:' + JSON.stringify(settings));
          };
        })(this));
      },
      onsiteContactsEnabledPilot: function onsiteContactsEnabledPilot() {
        return this.ldclient.variation('onsite-contacts-enabled-pilot-web', false);
      }
    });
    return {
      'FeatureManager': new FeatureManager()
    };
  };

  exports['default'] = FEATURE_MODULE(FEATURE_MODULE || {});
});
define('pilots/utils/flatten', ['exports', 'ember'], function (exports, _ember) {
  var flatten;

  flatten = function (array) {
    var flattened, i, len, value;
    flattened = [];
    for (i = 0, len = array.length; i < len; i++) {
      value = array[i];
      if (_ember['default'].isArray(value)) {
        flattened.push(flatten(value));
      } else {
        flattened.push(value);
      }
    }
    return flattened;
  };

  exports['default'] = flatten;
});
define('pilots/utils/init-qtip', ['exports'], function (exports) {
  var initQtip;

  initQtip = function (selector) {
    var touchDevice;
    touchDevice = 'ontouchend' in window ? true : false;
    if (!touchDevice) {
      return $(selector).qtip({
        position: {
          my: 'top center',
          at: 'bottom center'
        },
        style: 'qtip-dark',
        hide: {
          event: 'click mouseleave'
        }
      });
    }
  };

  exports['default'] = initQtip;
});
define('pilots/utils/object-transforms', ['exports', 'ember-metrics/utils/object-transforms'], function (exports, _emberMetricsUtilsObjectTransforms) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsUtilsObjectTransforms['default'];
    }
  });
});
define('pilots/utils/trim', ['exports'], function (exports) {
  var rtrim, trim;

  trim = String.prototype.trim ? function (string) {
    return (string || '').trim();
  } : (rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, function (string) {
    return (string || '').replace(rtrim, '');
  });

  exports['default'] = trim;
});
define('pilots/utils/uploader/file_proxy', ['exports', 'ember'], function (exports, _ember) {
  var FileProxy, mergeDefaults, sanitizeFilename, settingsToConfig;

  mergeDefaults = function (defaults, options) {
    var i, key, len, settings, unsetKeys;
    unsetKeys = _ember['default'].A(Object.keys(defaults)).removeObjects(Object.keys(options));
    settings = _ember['default'].copy(options, true);
    for (i = 0, len = unsetKeys.length; i < len; i++) {
      key = unsetKeys[i];
      settings[key] = defaults[key];
    }
    return settings;
  };

  settingsToConfig = function (settings) {
    var accepts, base_key, chunkSize, contentType, count, data, fileKey, headers, maxRetries, method, multipart, possible, randomString, ref, url;
    ref = mergeDefaults({
      method: 'POST',
      accepts: ['application/json', 'text/javascript'],
      contentType: this.get('type'),
      headers: {},
      data: {},
      maxRetries: 10,
      multipart: true,
      fileKey: 'file'
    }, settings), url = ref.url, method = ref.method, accepts = ref.accepts, contentType = ref.contentType, headers = ref.headers, data = ref.data, maxRetries = ref.maxRetries, chunkSize = ref.chunkSize, multipart = ref.multipart, fileKey = ref.fileKey;
    if (headers.Accept === null) {
      if (!_ember['default'].Array.detect(accepts)) {
        accepts = _ember['default'].A([accepts]).compact();
      }
      headers.Accept = accepts.join(',');
    }
    if (contentType) {
      if (multipart) {
        data['Content-Type'] = contentType;
      } else {
        headers['Content-Type'] = contentType;
      }
    }
    randomString = "";
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    count = 0;
    while (count < 8) {
      randomString += possible.charAt(Math.floor(Math.random() * possible.length));
      count++;
    }
    base_key = data.key;
    data.key = data.key + ["DBU", this.uploadNumber, randomString, this.get('sanitizedName')].join('-');
    return {
      url: url,
      method: method,
      headers: headers,
      multipart: multipart,
      multipart_params: data,
      max_retries: maxRetries,
      chunk_size: chunkSize,
      file_data_name: fileKey,
      base_key: base_key
    };
  };

  sanitizeFilename = function (filename) {
    return filename.replace(/[^a-zA-Z\d\s\-_\.]/g, '').replace(/\s/g, '_');
  };

  FileProxy = _ember['default'].Object.extend({
    airbrake: _ember['default'].inject.service(),
    id: _ember['default'].computed.reads('content.id'),
    name: _ember['default'].computed.alias('content.name'),
    size: _ember['default'].computed.reads('content.size'),
    type: _ember['default'].computed.reads('content.type'),
    uploadNumber: null,
    sanitizedName: _ember['default'].computed('content.name', 'uploadNumber', function () {
      return sanitizeFilename(this.get('content.name'));
    }),
    thumbnail: null,
    progress: _ember['default'].computed({
      get: function get() {
        return this.get('content.percent');
      }
    }),
    status: _ember['default'].computed({
      get: function get() {
        return this.get('content.status');
      }
    }),
    uploading: _ember['default'].computed('status', function () {
      return this.get('status') === plupload.UPLOADING;
    }),
    notifyPropertyChanges: function notifyPropertyChanges() {
      this.notifyPropertyChange('progress');
      return this.notifyPropertyChange('status');
    },
    prepareForUpload: function prepareForUpload(urls, fileType, authHeaders) {
      var _this, fileCheckUrl, s3AuthUrl;
      s3AuthUrl = urls['s3AuthUrl'];
      fileCheckUrl = urls['fileCheckUrl'];
      _this = this;
      this._deferred = _ember['default'].RSVP.defer("File: '" + this.get('id') + "' Upload file");
      if (this.get('status') === plupload.FAILED) {
        this.set('content.status', plupload.QUEUED);
        this.notifyPropertyChange('status');
      }
      this.set('s3AuthUrl', s3AuthUrl);
      this.set('fileCheckUrl', fileCheckUrl);
      this.set('file_type', fileType);
      this.set('authHeaders', authHeaders);
      this._deferred.promise.then(function (success) {}, function (error) {
        return _this.get('airbrake').notify(new Error("Upload error in " + error));
      });
      return this._deferred.promise;
    },
    fetchS3SignedUrl: function fetchS3SignedUrl(chunkedUpload, target_key) {
      var _this, authPromise;
      _this = this;
      authPromise = _ember['default'].$.ajax({
        url: _this.get('s3AuthUrl'),
        type: 'POST',
        dataType: 'json',
        data: {
          type: _this.get('file_type'),
          chunkedUpload: chunkedUpload
        },
        headers: _this.get('authHeaders')
      }).then(function (response) {
        return _this.settings = settingsToConfig.call(_this, {
          url: response.url,
          data: response.credentials
        });
      }, function (response) {
        return _this.get('airbrake').notify(new Error("Error s3 signed URL: " + JSON.stringify(response.errors)));
      });

      /* for chunked uploads, we want to perform the file existense check, before resolving the promise */
      if (chunkedUpload) {
        return new _ember['default'].RSVP.Promise(function (resolve, reject) {
          authPromise.then(function (response) {
            _ember['default'].$.ajax({
              url: _this.get('fileCheckUrl'),
              type: 'GET',
              dataType: 'json',
              data: {
                key: "" + response.base_key + target_key
              },
              headers: _this.get('authHeaders')
            }).then(function (response2) {
              _this.settings.uploaded_chunks = response2.uploaded_keys;
              return resolve(response);
            }, function (response2) {
              _this.get('airbrake').notify(new Error("Error s3 signed URL: " + JSON.stringify(response2.errors)));
              return reject(response);
            });
            return false;
          }, function (response) {
            return reject(response);
          });
          return false;
        });
      } else {
        return authPromise;
      }
    }
  });

  exports['default'] = FileProxy;
});
define('pilots/utils/uploader/queue', ['exports', 'ember', 'pilots/utils/uploader/file_proxy', 'pilots/utils/trim'], function (exports, _ember, _pilotsUtilsUploaderFile_proxy, _pilotsUtilsTrim) {
  var UploaderQueue,
      getHeader,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  getHeader = function (headers, header) {
    var headerIdx, headerKeys;
    headerKeys = _ember['default'].A(Object.keys(headers));
    headerIdx = headerKeys.map(function (s) {
      return s.toLowerCase();
    }).indexOf(header.toLowerCase());
    if (headerIdx !== -1) {
      headers[headerKeys[headerIdx]];
    }
    return null;
  };

  UploaderQueue = _ember['default'].ArrayProxy.extend({
    name: null,
    uploader: null,
    browsing: false,
    filteringFiles: false,
    status: _ember['default'].computed({
      get: function get() {
        return this.get('uploader.state');
      }
    }),
    uploadsQueued: _ember['default'].computed('length', 'uploading', function () {
      return this.get('length') && !this.get('uploading');
    }),
    uploading: _ember['default'].computed('status', function () {
      return this.get('status') === plupload.UPLOADING;
    }),
    stopped: _ember['default'].computed('status', function () {
      return this.get('status') === plupload.STOPPED;
    }),
    finished: _ember['default'].computed('status', 'uploadsQueued', function () {
      return this.get('stopped') && !this.get('uploadsQueued');
    }),
    uploadCount: 0,
    numFilesUploading: 0,
    init: function init() {
      this.set('content', _ember['default'].A([]));
      return this._super();
    },
    disableBrowse: function disableBrowse(disable) {
      if (disable == null) {
        disable = true;
      }
      return this.get('uploader').disableBrowse(disable);
    },
    isFileSizeChunkableOnS3: function isFileSizeChunkableOnS3(fileSize) {
      return fileSize > 1024 * 1024 * 5;
    },
    configureUploader: function configureUploader(config, airbrake) {
      var settings, uploader;
      if (config == null) {
        config = {};
      }
      uploader = new plupload.Uploader(config);
      uploader.bind('FilesAdded', _ember['default'].run.bind(this, 'filesAdded'));
      uploader.bind('FilesRemoved', _ember['default'].run.bind(this, 'filesRemoved'));
      uploader.bind('BeforeUpload', _ember['default'].run.bind(this, 'configureUpload'));
      uploader.bind('UploadProgress', _ember['default'].run.bind(this, 'progressDidChange'));
      uploader.bind('FileUploaded', _ember['default'].run.bind(this, 'fileUploaded'));
      uploader.bind('UploadComplete', _ember['default'].run.bind(this, 'uploadComplete'));
      uploader.bind('Error', _ember['default'].run.bind(this, 'onError'));
      uploader.bind('Browse', _ember['default'].run.bind(this, 'onBrowse'));
      uploader.bind('FileFiltered', _ember['default'].run.bind(this, 'onFileFiltered'));
      uploader.bind('StateChanged', _ember['default'].run.bind(this, 'onStateChange'));
      uploader.bind('ChunkUploaded', _ember['default'].run.bind(this, 'onChunkUploaded'));
      uploader.settings.browse_button = [config.browse_button];
      settings = _ember['default'].copy(uploader.settings);
      this.set('uploadCount', settings.uploadCount);
      if (!this.get('uploadCount')) {
        this.set('uploadCount', 0);
      }
      delete settings.uploadCount;
      this.set('settings', settings);
      this.set('uploader', uploader);
      this.set('airbrake', airbrake);
      uploader.init();
      return uploader;
    },
    onBrowse: function onBrowse() {
      return this.set('browsing', true);
    },
    onFileFiltered: function onFileFiltered() {
      return this.set('filteringFiles', true);
    },
    destroy: function destroy() {
      this._super();
      this.get('uploader').unbindAll();
      this.set('content', _ember['default'].A([]));
      return this.set('uploader', null);
    },
    clearNumUploading: function clearNumUploading() {
      return this.numFilesUploading = 0;
    },
    refresh: function refresh() {
      return this.get('uploader').refresh();
    },
    size: _ember['default'].computed(function () {
      return this.get('uploader.total.size') || 0;
    }),
    loaded: _ember['default'].computed(function () {
      return this.get('uploader.total.loaded') || 0;
    }),
    progress: _ember['default'].computed('size', 'loaded', function () {
      var percent;
      percent = this.get('loaded') / this.get('size') || 0;
      return Math.floor(percent * 100);
    }),
    dataURLtoBlob: function dataURLtoBlob(dataurl) {
      var arr, bstr, mime, n, u8arr;
      arr = dataurl.split(',');
      mime = arr[0].match(/:(.*?);/)[1];
      bstr = atob(arr[1]);
      n = bstr.length;
      u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    resizeThumbnail: function resizeThumbnail(file) {
      var canvas, context, img, maxH, maxW;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      maxW = 600;
      maxH = 600;
      img = document.createElement('img');
      img.onload = (function (_this) {
        return function () {
          var ih, ihScaled, iw, iwScaled, scale;
          iw = img.width;
          ih = img.height;
          scale = Math.min(maxW / iw, maxH / ih);
          iwScaled = iw * scale;
          ihScaled = ih * scale;
          canvas.width = iwScaled;
          canvas.height = ihScaled;
          context.drawImage(img, 0, 0, iwScaled, ihScaled);
          return file.set('thumbnail', URL.createObjectURL(_this.dataURLtoBlob(canvas.toDataURL())));
        };
      })(this);
      img.src = URL.createObjectURL(file.content.getNative());
    },
    filesAdded: function filesAdded(uploader, files) {
      var file, filep, i, len, results1;
      this.set('browsing', false);
      this.set('filteringFiles', false);
      results1 = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        this.uploadCount += 1;
        this.numFilesUploading += 1;
        filep = _pilotsUtilsUploaderFile_proxy['default'].create({
          uploadNumber: this.uploadCount,
          content: file,
          shot_id: this.get('shot_id')
        });
        if (this.get('target.showNativeThumbnail')) {
          this.resizeThumbnail(filep);
        }
        this.pushObject(filep);
        this.notifyPropertyChange('size');
        this.notifyPropertyChange('loaded');
        if (!uploader.settings.disableAutoUpload) {
          results1.push(this.get('target').addAsset(filep));
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    },
    filesRemoved: function filesRemoved(uploader, files) {
      var file, filep, i, len;
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        filep = this.findBy('id', file.id);
        if (filep) {
          this.removeObject(filep);
        }
      }
      this.uploadCount -= 1;
      this.notifyPropertyChange('size');
      return this.notifyPropertyChange('loaded');
    },
    chunkedKey: function chunkedKey(file) {
      var filep;
      filep = this.findBy('id', file.id);
      return "" + file.base_key + filep.get('sanitizedName') + ".tmp/" + filep.get('sanitizedName') + "." + file.chunkIndex;
    },
    configureChunkChecker: function configureChunkChecker(uploader, file) {
      return uploader.settings.pre_chunk_upload_check = new _ember['default'].RSVP.Promise(function (resolve, reject) {
        var ref;
        if ((ref = file.chunkIndex, indexOf.call(uploader.settings.uploaded_chunks, ref) >= 0)) {
          return reject();
        } else {
          return resolve();
        }
      });
    },
    configureUpload: function configureUpload(uploader, file) {
      var _this, filep;
      _this = this;
      filep = this.findBy('id', file.id);
      uploader.settings = _ember['default'].copy(this.get('settings'));
      uploader.settings.multipart_params = {
        "acl": "private",
        "success_action_status": "201"
      };
      file.isChunked = this.isFileSizeChunkableOnS3(file.size);
      this.preFetchS3SignedUrl(uploader, file, filep);
      return false;
    },
    preFetchS3SignedUrl: function preFetchS3SignedUrl(uploader, file, filep) {
      return filep.fetchS3SignedUrl(file.isChunked, filep.get('sanitizedName')).then((function (_this) {
        return function (response) {
          _ember['default'].assign(uploader.settings, filep.settings);
          file.status = plupload.UPLOADING;
          file.base_key = uploader.settings.base_key;
          if (file.isChunked) {
            file.chunkIndex = 0;
            uploader.settings.chunk_size = plupload.parseSize("10mb");
            delete uploader.settings.multipart_params.chunks;
            delete uploader.settings.multipart_params.chunk;
            uploader.settings.multipart_params.key = _this.chunkedKey(file);
            _this.configureChunkChecker(uploader, file);
          } else {
            uploader.settings.multipart_params.chunks = 0;
            uploader.settings.multipart_params.chunk = 0;
          }
          uploader.trigger("UploadFile", file);
          return _this.progressDidChange(uploader, file);
        };
      })(this), function (response) {});
    },
    onChunkUploaded: function onChunkUploaded(uploader, file, info) {
      file.chunkIndex++;
      this.configureChunkChecker(uploader, file);
      return uploader.settings.multipart_params.key = this.chunkedKey(file);
    },
    progressDidChange: function progressDidChange(uploader, file) {
      var filep;
      filep = this.findBy('id', file.id);
      if (filep) {
        filep.notifyPropertyChanges();
      }
      this.notifyPropertyChange('size');
      this.notifyPropertyChange('loaded');
      return uploader.refresh();
    },
    fileUploaded: function fileUploaded(uploader, file, response) {
      var filep, results;
      results = this.parseResponse(response);
      filep = this.findBy('id', file.id);
      results.target_key = filep.get('sanitizedName');
      results.base_key = file.base_key;
      results.chunked = file.isChunked;
      if (file.isChunked) {
        results.full_url = uploader.settings.url + "/" + uploader.settings.base_key + filep.get('sanitizedName');
      } else {
        results.full_url = results.headers.location;
        if (!results.headers.location) {
          this.get('airbrake').notify(new Error("S3 not returning Location header. response: " + JSON.stringify(response) + " - results: " + JSON.stringify(results)));
        }
      }
      filep = this.findBy('id', file.id);
      if (filep) {
        this.removeObject(filep);
      }
      if (results.status === 0 || Math.floor(results.status / 200) === 1) {
        filep._deferred.resolve(results);
      } else {
        filep._deferred.reject("Queue fileUploaded:138");
      }
      filep = null;
      return file = null;
    },
    uploadComplete: function uploadComplete() {
      _ember['default'].run.later(this.get('uploader'), 'refresh', 750);
      this.notifyPropertyChange('loaded');
      return this.notifyPropertyChange('size');
    },
    onError: function onError(uploader, error) {
      var filep;
      if (error.file) {
        filep = this.findBy('id', error.file.id);
        if (filep == null) {
          filep = _pilotsUtilsUploaderFile_proxy['default'].create({
            content: error.file
          });
        }
        filep.set('error', true);
        if (filep._deferred) {
          filep._deferred.reject("Queue onError:157, error: " + JSON.stringify(error));
        } else {
          filep.upload = filep.read = function () {
            _ember['default'].run.debounce(this.get('uploader'), 'refresh', 750);
            return _ember['default'].RSVP.reject(error, "File: '" + error.file.id + "' " + error.message);
          };
          filep.isDestroyed = true;
          this.get('target').sendAction('onfileadd', filep);
        }
        this.notifyPropertyChange('length');
        return _ember['default'].run.debounce(this.get('uploader'), 'refresh', 750);
      } else {
        this.set('error', error);
        return this.get('target').sendAction('onerror', error);
      }
    },
    onStateChange: function onStateChange(uploader) {
      if (uploader.state === plupload.STOPPED) {
        uploader.total.reset();
        this.notifyPropertyChange('size');
        this.notifyPropertyChange('loaded');
      }
      return this.notifyPropertyChange('status');
    },
    parseResponse: function parseResponse(response) {
      var body, contentType, headers, rawHeaders;
      body = (0, _pilotsUtilsTrim['default'])(response.response);
      rawHeaders = _ember['default'].A(response.responseHeaders.split(/\n|\r/)).without('');
      headers = rawHeaders.reduce(function (E, header) {
        var parts;
        parts = header.split(/^([A-Za-z_-]*:)/);
        if (parts.length > 0) {
          E[parts[1].slice(0, -1).toLowerCase()] = (0, _pilotsUtilsTrim['default'])(parts[2]);
        }
        return E;
      }, {});
      contentType = (getHeader(headers, 'Content-Type') || '').split(';');
      if (contentType.indexOf('text/html') !== -1) {
        body = _ember['default'].$.parseHTML(body);
      } else if (contentType.indexOf('text/xml') !== -1) {
        body = _ember['default'].$.parseXML(body);
      } else if (contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/javascript') !== -1 || contentType.indexOf('application/javascript') !== -1) {
        body = _ember['default'].$.parseJSON(body);
      }
      return {
        status: response.status,
        body: body,
        headers: headers
      };
    }
  });

  exports['default'] = UploaderQueue;
});
define('pilots/utils/w', ['exports', 'ember'], function (exports, _ember) {
  var toArray, w;

  toArray = function (value) {
    if (typeof value === 'string') {
      value = _ember['default'].String.w(value);
    }
    return _ember['default'].A(value);
  };

  w = function (defaultValue) {
    defaultValue = defaultValue || [];
    return _ember['default'].computed({
      get: function get() {
        return toArray(defaultValue);
      },
      set: function set(key, value) {
        return toArray(value);
      }
    });
  };

  exports['default'] = w;
});
define('pilots/validations/auth', ['exports', 'ember-changeset-validations/validators'], function (exports, _emberChangesetValidationsValidators) {
  exports['default'] = {
    'identification': (0, _emberChangesetValidationsValidators.validateFormat)({ type: 'email', message: 'Email must be valid' }),
    'password': (0, _emberChangesetValidationsValidators.validatePresence)(true)
  };
});
define("pilots/validations/custom_validators/boolean", ["exports"], function (exports) {
  exports["default"] = booleanValidator;

  function booleanValidator(message) {
    return function (key, newValue) {
      if (newValue === true) {
        return true;
      }
      return message;
    };
  }
});
define('pilots/validations/custom_validators/validateNumCommaSeparated', ['exports'], function (exports) {
  exports['default'] = validateNumCommaSeparated;

  function validateNumCommaSeparated(min, max, message) {
    return function (key, tags) {
      var trimmed = tags.trim();
      var numItems = 0;
      var items = trimmed.split(',');
      for (var i = 0; i < items.length; i++) {
        if (items[i].trim().length > 0) {
          numItems++;
        }
      }
      if (numItems <= max && numItems >= min) {
        return true;
      }
      return message;
    };
  }
});
define('pilots/validations/getty', ['exports', 'ember-changeset-validations/validators', 'pilots/validations/custom_validators/validateNumCommaSeparated'], function (exports, _emberChangesetValidationsValidators, _pilotsValidationsCustom_validatorsValidateNumCommaSeparated) {
  exports['default'] = {
    'fileInput': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please select a file' }),
    'category': (0, _emberChangesetValidationsValidators.validateNumber)({ gte: 0, message: 'Please select country' }),
    'description': [(0, _emberChangesetValidationsValidators.validatePresence)(true), (0, _emberChangesetValidationsValidators.validateLength)({ min: 20, message: 'Please enter at least 20 characters' })],
    'city': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please enter city' }),
    'state': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please enter state' }),
    'country': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please select country' }),
    'timecode': (0, _emberChangesetValidationsValidators.validateFormat)({ allowBlank: true, regex: /^(([0-9]){2}:([0-9]){2})$|^([0-9]){2}$|^(([0-9]){1}:([0-9]){2})$/, message: 'Timecode format: hh:mm' }),
    'tags': (0, _pilotsValidationsCustom_validatorsValidateNumCommaSeparated['default'])(5, 45, 'Please enter between 5 and 45 comma-separated tags')
  };
});
define('pilots/validations/pilot-license', ['exports', 'ember-changeset-validations/validators'], function (exports, _emberChangesetValidationsValidators) {
  exports['default'] = {
    'license_number': [(0, _emberChangesetValidationsValidators.validateLength)({ min: 6, max: 10, message: 'Please enter a valid number.' })]
  };
});
define('pilots/validations/pilot', ['exports', 'ember-changeset-validations/validators', 'pilots/validations/custom_validators/boolean'], function (exports, _emberChangesetValidationsValidators, _pilotsValidationsCustom_validatorsBoolean) {
  exports['default'] = {
    'email': (0, _emberChangesetValidationsValidators.validateFormat)({ type: 'email', message: 'Email must be valid' }),
    'first_name': (0, _emberChangesetValidationsValidators.validatePresence)(true),
    'last_name': (0, _emberChangesetValidationsValidators.validatePresence)(true),
    'password': [(0, _emberChangesetValidationsValidators.validatePresence)(true), (0, _emberChangesetValidationsValidators.validateLength)({ min: 6, message: 'Please enter a valid password. 6 characters or more.' })],
    'address': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please select your address from the search results' }),
    'city': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please enter city' }),
    'country': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please enter country' }),
    'longitude': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please select your address from the search results' }),
    'latitude': (0, _emberChangesetValidationsValidators.validatePresence)({ presence: true, message: 'Please select your address from the search results' }),
    'terms_and_conditions': (0, _pilotsValidationsCustom_validatorsBoolean['default'])('Please agree to our Terms and Conditions')
  };
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('pilots/config/environment', ['ember'], function(Ember) {
  var prefix = 'pilots';
/* jshint ignore:start */

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

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("pilots/app")["default"].create({"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"name":"pilots","version":"0.3.0+bbf47e12"});
}

/* jshint ignore:end */

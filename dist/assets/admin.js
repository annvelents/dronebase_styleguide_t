"use strict";



define('admin/adapters/activity-log', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
			'use strict';

			Object.defineProperty(exports, "__esModule", {
						value: true
			});
			exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
						namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/missions',
						queryUrlTemplate: '{+namespace}/{missionId}/activity_logs',
						urlSegments: {
									missionId: function (type, id, snapshot, query) {
												return query.missionId;
									}
						}
			});
});
define('admin/adapters/admin', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AdminAdapter;

  AdminAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = AdminAdapter;
});
define('admin/adapters/application', ['exports', 'ember-data', 'admin/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin', 'ember-inflector'], function (exports, _emberData, _environment, _dataAdapterMixin, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ApplicationAdapter;

  ApplicationAdapter = _emberData.default.JSONAPIAdapter.extend(_dataAdapterMixin.default, {
    shouldReloadRecord: function () {
      return true;
    },
    authorizer: 'authorizer:devise',
    namespace: _environment.default.api.namespace,
    host: _environment.default.api.host,
    headers: {
      'X-API-TOKEN': _environment.default.api.app_token
    },
    pathForType: function (type) {
      var underscored;
      underscored = Ember.String.underscore(type);
      return (0, _emberInflector.pluralize)(underscored);
    }
  });

  exports.default = ApplicationAdapter;
});
define('admin/adapters/badge', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var BadgeAdapter;

  BadgeAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = BadgeAdapter;
});
define('admin/adapters/category', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CategoryAdapater;

  CategoryAdapater = _application.default.extend({
    namespace: _environment.default.api.namespace + '/public'
  });

  exports.default = CategoryAdapater;
});
define('admin/adapters/checkr-package', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });
});
define('admin/adapters/client-available-package', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientAvailablePackageAdapter;

  ClientAvailablePackageAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin/clients",
    urlTemplate: '{+namespace}/{clientId}/available_packages{/id}',
    urlSegments: {
      clientId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('client', {
          id: true
        });
      }
    }
  });

  exports.default = ClientAvailablePackageAdapter;
});
define('admin/adapters/client-mission-csv', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientMissionCsvAdapter;

  ClientMissionCsvAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = ClientMissionCsvAdapter;
});
define('admin/adapters/client', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientAdapter;

  ClientAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = ClientAdapter;
});
define('admin/adapters/collaborator', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CollaboratorAdapter;

  CollaboratorAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.namespace + "/admin",
    urlTemplate: "{+host}/{+namespace}/missions/{missionId}/collaborators",
    urlSegments: {
      missionId: function (type, id, collaborator, query) {
        return collaborator.belongsTo('mission', {
          id: true
        });
      }
    },
    searchUrl: function () {
      return this.urlPrefix() + "/clients/search";
    },
    query: function (store, type, query) {
      return this.ajax(this.searchUrl(), 'POST', {
        data: query
      });
    },
    deleteRecordUrlTemplate: '{+host}/{+namespace}/missions/{missionId}/collaborators/{id}'
  });

  exports.default = CollaboratorAdapter;
});
define('admin/adapters/device', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DeviceAdapter;

  DeviceAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = DeviceAdapter;
});
define('admin/adapters/drone-camera', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates', 'ember-data'], function (exports, _application, _environment, _emberDataUrlTemplates, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneCameraAdapter;

  DroneCameraAdapter = _application.default.extend(_emberDataUrlTemplates.default, _emberData.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/cameras{/id}'
  });

  exports.default = DroneCameraAdapter;
});
define('admin/adapters/drone-manufacturer', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneManufacturerAdapter;

  DroneManufacturerAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/public",
    urlTemplate: '{+namespace}/drone_manufacturers'
  });

  exports.default = DroneManufacturerAdapter;
});
define('admin/adapters/drone', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneAdapter;

  DroneAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/drones{/id}'
  });

  exports.default = DroneAdapter;
});
define('admin/adapters/flight-app', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FlightApp;

  FlightApp = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = FlightApp;
});
define('admin/adapters/global-image', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var GlobalImageAdapter;

  GlobalImageAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + "/admin/assets",
    urlTemplate: '{+namespace}/global_assets{/id}'
  });

  exports.default = GlobalImageAdapter;
});
define('admin/adapters/hold', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var HoldAdapter;

  HoldAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = HoldAdapter;
});
define('admin/adapters/image-marker', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/missions',
    queryUrlTemplate: '{+namespace}/{missionId}/image_markers',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        return query.missionId;
      } }
  });
});
define('admin/adapters/image', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
      namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/missions',
      urlTemplate: '{+namespace}/{missionId}/images{/id}',
      queryUrlTemplate: '{+namespace}/{missionId}/images',
      urlSegments: {
         missionId: function (type, id, snapshot, query) {
            if (query == undefined) {
               return snapshot.belongsTo('mission', {
                  id: true
               });
            } else {
               return query.missionId;
            }
         }
      }
   });
});
define('admin/adapters/license', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    namespace: _environment.default.api.namespace + '/public'
  });
});
define('admin/adapters/location', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LocationAdapter;

  LocationAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = LocationAdapter;
});
define('admin/adapters/mindflash-series', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin',
    urlTemplate: '{+namespace}/mindflash_series?refresh={refreshList}',
    urlSegments: {
      refreshList: function (type, id, snapshot, query) {
        return query['mindflashRefresh'];
      }
    }
  });
});
define('admin/adapters/mission-flight-app', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionFlightAppAdapter;

  MissionFlightAppAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/missions/{missionId}/mission_flight_apps{/id}',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports.default = MissionFlightAppAdapter;
});
define('admin/adapters/mission-reschedule', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionRescheduleAdapter;

  MissionRescheduleAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/missions/{missionId}/schedule{/id}',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        if (snapshot.modelName) {
          return snapshot.belongsTo('mission', {
            id: true
          });
        } else {
          return snapshot.get('mission.id');
        }
      }
    },
    "delete": function (model) {
      var url;
      url = this.buildURL('mission-reschedule', '', model);
      return this.ajax(url, 'DELETE');
    }
  });

  exports.default = MissionRescheduleAdapter;
});
define('admin/adapters/mission', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionAdapter;

  MissionAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = MissionAdapter;
});
define('admin/adapters/mission_hold_reason', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionHoldReasonAdapter;

  MissionHoldReasonAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/public'
  });

  exports.default = MissionHoldReasonAdapter;
});
define('admin/adapters/mission_rejection_reason', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionRejectionAdapter;

  MissionRejectionAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/public'
  });

  exports.default = MissionRejectionAdapter;
});
define('admin/adapters/onsite-contact', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OnsiteContactAdapter;

  OnsiteContactAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/missions/{missionId}/onsite_contact/{id}',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports.default = OnsiteContactAdapter;
});
define('admin/adapters/organization-available-package', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationsAvailablePackageAdapter;

  OrganizationsAvailablePackageAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin/organizations",
    urlTemplate: '{+namespace}/{organizationId}/available_packages{/id}',
    urlSegments: {
      organizationId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('organization', {
          id: true
        });
      }
    }
  });

  exports.default = OrganizationsAvailablePackageAdapter;
});
define('admin/adapters/organization', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationAdapter;

  OrganizationAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = OrganizationAdapter;
});
define('admin/adapters/package', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PackageAdapter;

  PackageAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = PackageAdapter;
});
define('admin/adapters/panorama', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
      namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/missions',
      urlTemplate: '{+namespace}/{missionId}/panoramas{/id}',
      queryUrlTemplate: '{+namespace}/{missionId}/panoramas',
      urlSegments: {
         missionId: function (type, id, snapshot, query) {
            if (query == undefined) {
               return snapshot.belongsTo('mission', {
                  id: true
               });
            } else {
               return query.missionId;
            }
         }
      }
   });
});
define('admin/adapters/payout', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PayoutAdapter;

  PayoutAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    createRecordUrlTemplate: '{+namespace}/missions/{missionId}/payouts/{pilotId}',
    deleteRecordUrlTemplate: '{+namespace}/missions/{missionId}/payouts{/id}',
    queryUrlTemplate: '{+namespace}/payouts{?query*}',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      },
      pilotId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('pilot', {
          id: true
        });
      }
    }
  });

  exports.default = PayoutAdapter;
});
define('admin/adapters/pilot-badge', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotBadgeAdapter;

  PilotBadgeAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/badges/{badgeId}/pilot_badges{/id}',
    urlSegments: {
      badgeId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('badge', {
          id: true
        });
      }
    }
  });

  exports.default = PilotBadgeAdapter;
});
define('admin/adapters/pilot-equipment', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotEquipmentAdapter;

  PilotEquipmentAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/pilot_equipment{/id}'
  });

  exports.default = PilotEquipmentAdapter;
});
define('admin/adapters/pilot-search-metum', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotSearchMetumAdapter;

  PilotSearchMetumAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = PilotSearchMetumAdapter;
});
define('admin/adapters/pilot', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotAdapter;

  PilotAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = PilotAdapter;
});
define('admin/adapters/point-of-interest', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PointOfInterestAdapter;

  PointOfInterestAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = PointOfInterestAdapter;
});
define('admin/adapters/preset-search-filter', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PresetSearchFilterAdapter;

  PresetSearchFilterAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = PresetSearchFilterAdapter;
});
define('admin/adapters/rating', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var RatingAdapter;

  RatingAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/missions/{missionId}/pilot_ratings{/id}',
    createRecordUrlTemplate: '{+namespace}/missions/{missionId}/pilot_ratings',
    urlSegments: {
      missionId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        });
      }
    }
  });

  exports.default = RatingAdapter;
});
define('admin/adapters/reschedule_reason', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AdminAdapter;

  AdminAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = AdminAdapter;
});
define('admin/adapters/share', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShareAdapter;

  ShareAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/shares/{shareableId}',
    urlSegments: {
      shareableId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('shareable', {
          id: true
        });
      }
    }
  });

  exports.default = ShareAdapter;
});
define('admin/adapters/shot-type', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShotTypeAdapter;

  ShotTypeAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/shot_types{/id}'
  });

  exports.default = ShotTypeAdapter;
});
define('admin/adapters/shot', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShotAdapter;

  ShotAdapter = _application.default.extend(_emberDataUrlTemplates.default, {
    namespace: _environment.default.api.host + "/" + _environment.default.api.namespace + "/admin",
    urlTemplate: '{+namespace}/{parentType}/{parentId}/shots{/id}',
    urlSegments: {
      parentType: function (type, id, snapshot, query) {
        if (snapshot.belongsTo('mission', {
          id: true
        })) {
          return 'missions';
        } else if (snapshot.belongsTo('template', {
          id: true
        })) {
          return 'templates';
        }
      },
      parentId: function (type, id, snapshot, query) {
        return snapshot.belongsTo('mission', {
          id: true
        }) || snapshot.belongsTo('template', {
          id: true
        });
      }
    },
    downloadImages: function (shot) {
      var url;
      url = _environment.default.api.host + "/v1/admin/missions/" + shot.get('mission.id') + "/shots/" + shot.id + "/download_all_images";
      return this.ajax(url, 'POST');
    },
    promoteAssets: function (shot) {
      var url;
      url = _environment.default.api.host + "/v1/admin/missions/" + shot.get('mission.id') + "/shots/" + shot.id + "/promote_all_assets";
      return this.ajax(url, 'POST');
    }
  });

  exports.default = ShotAdapter;
});
define('admin/adapters/template', ['exports', 'admin/adapters/application', 'admin/config/environment'], function (exports, _application, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplateAdapter;

  TemplateAdapter = _application.default.extend({
    namespace: _environment.default.api.namespace + '/admin'
  });

  exports.default = TemplateAdapter;
});
define('admin/adapters/training-package', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
		namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/clients',
		urlTemplate: '{+namespace}/' + _environment.default.test_user + '/training_packages'
	});
});
define('admin/adapters/video', ['exports', 'admin/adapters/application', 'admin/config/environment', 'ember-data-url-templates'], function (exports, _application, _environment, _emberDataUrlTemplates) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.default = _application.default.extend(_emberDataUrlTemplates.default, {
      namespace: _environment.default.api.host + '/' + _environment.default.api.namespace + '/admin/missions',
      urlTemplate: '{+namespace}/{missionId}/videos{/id}',
      queryUrlTemplate: '{+namespace}/{missionId}/videos',
      urlSegments: {
         missionId: function (type, id, snapshot, query) {
            if (query == undefined) {
               return snapshot.belongsTo('mission', {
                  id: true
               });
            } else {
               return query.missionId;
            }
         }
      }
   });
});
define('admin/app', ['exports', 'admin/resolver', 'ember-load-initializers', 'admin/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  Ember.MODEL_FACTORY_INJECTIONS = true;
  Ember.$.ajaxSetup({
    headers: {
      'X-API-TOKEN': _environment.default.api.app_token
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-API-TOKEN', _environment.default.api.app_token);
    }
  });

  Ember.Router.reopen({
    renderTemplate: function () {
      const toolTips = () => {
        Ember.$('[data-toggle="tooltip"]').tooltip();
      };
      Ember.run.scheduleOnce('afterRender', toolTips);
      this._super();
    }
  });

  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default,
    ready: () => {
      Ember.$(document).ajaxStart(() => {
        NProgress.start();
      });
      Ember.$(document).ajaxStop(() => {
        NProgress.done();
      });
    }
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('admin/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise', 'admin/config/environment'], function (exports, _devise, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DeviseAuthenticator;

  DeviseAuthenticator = _devise.default.extend({
    serverTokenEndpoint: _environment.default.api.host + '/v1/authenticate',
    resourceName: 'admin',
    makeRequest: function (data, options) {
      if (options == null) {
        options = {};
      }
      Ember.merge(options, {
        data: data,
        headers: {
          'X-API-TOKEN': _environment.default.api.app_token,
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      });
      return this._super(data, options);
    }
  });

  exports.default = DeviseAuthenticator;
});
define('admin/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, _devise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DeviseAuthorizer;

  DeviseAuthorizer = _devise.default.extend();

  exports.default = DeviseAuthorizer;
});
define('admin/components/add-camera-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AddCameraModalComponent;

  AddCameraModalComponent = Ember.Component.extend({
    currentRecord: null,
    actions: {
      close: function () {
        return this.get('close')();
      },
      submit: function () {
        var record;
        record = this.get('currentRecord');
        if (!record.validate()) {
          return;
        }
        return this.sendAction('action');
      }
    }
  });

  exports.default = AddCameraModalComponent;
});
define('admin/components/add-device-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AddDeviceModalComponent;

  AddDeviceModalComponent = Ember.Component.extend({
    currentDevice: null,
    operatingSystems: [{
      value: 'ios',
      name: 'iOS'
    }, {
      value: 'android',
      name: 'Android'
    }],
    deviceTypes: [{
      value: 'phone',
      name: 'Phone'
    }, {
      value: 'tablet',
      name: 'Tablet'
    }],
    actions: {
      close: function () {
        return this.get('close')();
      },
      submit: function () {
        var device;
        device = this.get('currentRecord');
        if (!device.validate()) {
          return;
        }
        return this.sendAction('action');
      }
    }
  });

  exports.default = AddDeviceModalComponent;
});
define('admin/components/add-drone-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AddDroneModalComponent;

  AddDroneModalComponent = Ember.Component.extend({
    currentRecord: null,
    droneTypes: [{
      value: 'quadcopter',
      name: 'Quadcopter'
    }, {
      value: 'hexacopter',
      name: 'Hexacopter'
    }, {
      value: 'octocopter',
      name: 'Octocopter'
    }, {
      value: 'fixed_wing',
      name: 'Fixed Wing'
    }],
    actions: {
      close: function () {
        return this.get('close')();
      },
      submit: function () {
        var record;
        record = this.get('currentRecord');
        if (!record.validate()) {
          return;
        }
        return this.sendAction('action');
      },
      addStockCamera: function (value) {
        this.get('currentRecord.stock_cameras').popObject();
        return this.get('currentRecord.stock_cameras').pushObject(value);
      },
      addOptionalCamera: function (value) {
        return this.get('currentRecord.optional_cameras').pushObject(value);
      },
      removeStockCamera: function (value) {
        return this.get('currentRecord.stock_cameras').removeObject(value);
      },
      removeOptionalCamera: function (value) {
        return this.get('currentRecord.optional_cameras').removeObject(value);
      }
    }
  });

  exports.default = AddDroneModalComponent;
});
define('admin/components/add-pilot-equipment-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AddPilotEquipmentModalComponent;

  AddPilotEquipmentModalComponent = Ember.Component.extend({
    currentRecord: null,
    actions: {
      close: function () {
        return this.get('close')();
      },
      submit: function () {
        var record;
        record = this.get('currentRecord');
        if (!record.validate()) {
          return;
        }
        return this.sendAction('action');
      }
    }
  });

  exports.default = AddPilotEquipmentModalComponent;
});
define('admin/components/asset-share', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetShareComponent;

  AssetShareComponent = Ember.Component.extend({
    buttonText: null,
    classNames: ["asset-share"],
    shareLink: Ember.computed('shareable', function () {
      return this.get('shareable.shareLink');
    }),
    embedCode: Ember.computed('shareable', function () {
      var link;
      if (this.embeddable) {
        link = this.get('shareLink').replace(/collab/, 'player');
        return "<iframe src=\"" + link + "\" width=\"500\" height=\"281\" frameBorder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
      }
    }),
    embeddable: false,
    isShareable: Ember.computed('shareable', function () {
      return this.get('shareable').get('isShareable');
    }),
    actions: {
      shareShareable: function () {
        var _this, deferred;
        if (this.get('shareable.shareLink')) {
          return this.set('showShareModal', true);
        } else {
          _this = this;
          deferred = Ember.RSVP.defer();
          deferred.promise.then(function (response) {
            _this.set('share', response);
            _this.set('shareLink', _this.get('share.link'));
            return _this.set('showShareModal', true);
          }, function (response) {
            var error;
            if (error = response.errors[0]) {
              return alert(error.detail);
            } else {
              return alert('There is a problem sharing...');
            }
          });
          return this.sendAction('shareCreateAction', this.get('shareable'), deferred);
        }
      },
      hideShareModal: function () {
        return this.set('showShareModal', false);
      }
    }
  });

  exports.default = AssetShareComponent;
});
define('admin/components/asset-uploader', ['exports', 'admin/utils/w'], function (exports, _w) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetUploaderComponent;

  AssetUploaderComponent = Ember.Component.extend({
    name: 'asset-uploader',
    queueLookup: Ember.inject.service('upload-queue-manager'),
    runtimes: (0, _w.default)(['html5', 'html4']),
    extensions: (0, _w.default)(),
    'max-file-size': 0,
    'no-duplicates': true,
    multiple: true,
    classNames: ['asset-uploader'],
    onfileadd: null,
    onerror: null,
    config: Ember.computed(function () {
      var config, filters;
      config = {
        url: true,
        browse_button: this.get('for'),
        browse_button: "upload-asset-" + this.get('shot_id'),
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
    didInsertElement: function () {
      return Ember.run.scheduleOnce('afterRender', this, 'attachUploadQueue');
    },
    attachUploadQueue: function () {
      var queue, queueLookup;
      queueLookup = this.get('queueLookup');
      queue = queueLookup.findOrCreate("upload-asset-" + this.get('shot_id'), this, this.get('config'));
      return this.set('queue', queue);
    },
    destroyUploadQueue: Ember.on('willDestroyElement', function () {
      var error, queue;
      queue = this.get('queue');
      if (queue) {
        try {
          queue.uploader.destroy();
        } catch (error1) {
          error = error1;
          console.log("Could not destroy uploader: " + error.message);
          console.debug(error.stack);
        }
        return this.set('queue', null);
      }
    }),
    toggleAllRaw: function () {
      var checked;
      checked = $('.check-all-raw > input').prop('checked');
      return Ember.$('.file-edited > input').trigger('click');
    },
    actions: {
      startUpload: function (uploader) {
        return this.sendAction('onstartupload', uploader);
      }
    }
  });

  exports.default = AssetUploaderComponent;
});
define('admin/components/bread-crumb', ['exports', 'ember-crumbly/components/bread-crumb'], function (exports, _breadCrumb) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _breadCrumb.default;
    }
  });
});
define('admin/components/bread-crumbs', ['exports', 'ember-crumbly/components/bread-crumbs'], function (exports, _breadCrumbs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _breadCrumbs.default;
    }
  });
});
define('admin/components/button-to-circle', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ButtonToCircleComponent;

  ButtonToCircleComponent = Ember.Component.extend({
    text: 'Save',
    didInsertElement: function () {
      var btn;
      btn = $("button.btnSubmit");
      return btn.on('click', function () {
        if ($(this).hasClass('clicked')) {
          return;
        }
        return $(this).addClass('clicked');
      });
    },
    saveStateObserver: Ember.observer('saveState', function () {
      var btn, checkmarkTemplate, crossTemplate, loaderTemplate;
      btn = $("button.btnSubmit");
      loaderTemplate = $("svg.loader");
      checkmarkTemplate = $("svg.checkmark");
      crossTemplate = $("svg.cross");
      if (this.get('saveState') === 'inProgress') {
        btn.append(loaderTemplate.clone());
        btn.find('svg').removeClass('svg--template');
        btn.find('svg').css('display', 'initial');
      }
      if (this.get('saveState') === 'success') {
        btn.text('');
        btn.find('svg').remove();
        btn.append(checkmarkTemplate.clone());
        btn.find('svg').css('display', 'initial');
        btn.find('svg').removeClass('svg--template');
        btn.addClass('done');
      }
      if (this.get('saveState') === 'error') {
        btn.text('');
        btn.find('svg').remove();
        btn.append(crossTemplate.clone());
        btn.find('svg').css('display', 'initial');
        btn.find('svg').removeClass('svg--template');
        btn.addClass('error');
      }
      if (this.get('saveState') === 'initial' || this.get('saveState') === 'failed') {
        btn.find('svg').remove();
        btn.text(this.get('text'));
        btn.removeClass('clicked');
        btn.removeClass('done');
        return btn.removeClass('error');
      }
    }),
    actions: {
      buttonAction: function () {
        return this.sendAction('submit');
      }
    }
  });

  exports.default = ButtonToCircleComponent;
});
define('admin/components/camera-index-list', ['exports', 'admin/components/equipment-index-list'], function (exports, _equipmentIndexList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CameraIndexListComponent;

  CameraIndexListComponent = _equipmentIndexList.default.extend({
    collapsed: true,
    showModal: false,
    currentRecord: null,
    cachedRecords: [],
    recordType: null,
    actions: {
      cloneRecord: function (record) {
        this.set('currentRecord', this.get('store').createRecord(this.get('recordType')));
        this.get('currentRecord').setProperties(record.serialize().data.attributes);
        this.get('currentRecord').set('drone_manufacturer', record.get('drone_manufacturer'));
        return this.set('showModal', true);
      }
    }
  });

  exports.default = CameraIndexListComponent;
});
define('admin/components/capacity-modal', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    currPage: 1,
    dateToday: Ember.computed(function () {
      return moment.tz(moment(), this.get('model.mission.location.timezone_id'));
    }),
    timezone: Ember.computed(function () {
      return this.get('dateToday').format('z ZZ');
    }),
    didInsertElement: function () {
      return this.addHoverListeners();
    },
    addHoverListeners: function () {
      return Ember.run.schedule('afterRender', this, function () {
        this.$().find('.capacity-details').on('mouseenter mouseover', function (e) {
          return $(e.currentTarget).find('.popup').removeClass('hidden');
        });
        this.$().find('.capacity-details').on('mouseout', function (e) {
          return $(e.currentTarget).find('.popup').addClass('hidden');
        });
      });
    },
    updatePagedDays: function (newPage) {
      this.set('currPage', newPage);
      var dayRanges = [[0, 3], [3, 7], [7, 11]];
      var dayRange = dayRanges[newPage - 1];
      this.set('model.currDays', this.get('model.upcomingDays').slice(dayRange[0], dayRange[1]));
      this.addHoverListeners();
    },
    actions: {
      resetPage: function () {
        this.updatePagedDays(1);
      },
      prevPage: function (currPage) {
        if (currPage > 1) {
          var newPage = currPage - 1;
          this.updatePagedDays(newPage);
        }
      },
      nextPage: function (currPage) {
        if (currPage < 3) {
          var newPage = currPage + 1;
          this.updatePagedDays(newPage);
        }
      },
      close: function () {
        return this.get('close')();
      },
      selectSlot: function (start, end) {
        Em.$('.capacity').removeClass('selected');
        Em.$(event.target).parents('td').addClass('selected');
        this.set('selectedStart', start);
        this.set('selectedEnd', end);
        this.set('selected', true);
      },
      saveSchedule: function () {
        var data = {
          'mission_scheduled_at_start': this.get('selectedStart'),
          'mission_scheduled_at_end': this.get('selectedEnd')
        };
        this.get('close')();
        return this.sendAction('confirmAction', data);
      }
    }
  });
});
define('admin/components/checkbox-item', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CheckboxItemComponent;

  CheckboxItemComponent = Ember.Component.extend({
    init: function () {
      this._super();
      if (this.get('includeManufacturer')) {
        return this.send("checkPresenceInSelection", "full_name");
      } else if (this.get('byAttribute')) {
        return this.send("checkIfInSelection", this.get('byAttribute'));
      } else {
        return this.send("checkPresenceInSelection", "name");
      }
    },
    selectionsObserver: Ember.observer('selections', 'selections.length', function () {
      if (this.get('includeManufacturer')) {
        return this.send("checkPresenceInSelection", "full_name");
      } else if (this.get('byAttribute')) {
        return this.send("checkIfInSelection", this.get('byAttribute'));
      } else {
        return this.send("checkPresenceInSelection", "name");
      }
    }),
    label: Ember.computed('model', 'includeManufacturer', function () {
      if (this.get('includeManufacturer')) {
        return this.get('model.full_name');
      } else {
        return this.get('model.name');
      }
    }),
    formattedLabel: Ember.computed('label', function () {
      if (this.get('label') == null) {
        return 'untitled';
      }
      return this.get('label').toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    }),
    change: function (checkbox) {
      var elem, selections;
      elem = Ember.$(checkbox.target)[0];
      selections = this.get('selections');
      if (!selections) {
        selections = [];
      }
      if (elem.checked) {
        if (typeof selections.then === 'function') {
          selections.pushObject(this.get('model'));
        } else {
          selections = selections.without('a b c d').toArray();
          selections.push(this.get('model'));
        }
      } else {
        if (typeof selections.then === 'function') {
          selections.removeObject(this.get('model'));
        } else {
          if (this.get('model.id') === void 0) {
            selections = selections.without(this.get('model'));
          } else {
            selections = selections.rejectBy('id', this.get('model.id'));
          }
        }
      }
      return this.set('selections', selections);
    },
    actions: {
      checkIfInSelection: function (byAttribute) {
        if (this.get("selections").getEach(byAttribute).indexOf(this.get('model').get(byAttribute)) >= 0) {
          return this.set("checked", true);
        }
      },
      checkPresenceInSelection: function (byAttribute) {
        if (this.get("selections").getEach(byAttribute).indexOf(this.get("label")) >= 0) {
          return this.set("checked", true);
        }
      }
    }
  });

  exports.default = CheckboxItemComponent;
});
define('admin/components/client-details-view', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientDetailsViewComponent;

  ClientDetailsViewComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    showDetails: Ember.computed('client', function () {
      return this.get('client') != null;
    }),
    clientLoginParams: Ember.computed('missionNumber', function () {
      return {
        client_email: this.get('client.email'),
        redirect_route: 'missions.show',
        mission_id: this.get('missionNumber')
      };
    })
  });

  exports.default = ClientDetailsViewComponent;
});
define('admin/components/client-package-checkbox', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientPackageCheckboxComponent;

  ClientPackageCheckboxComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    packageAvailable: Ember.computed('available_package', 'model.client.available_packages.[]', function () {
      if (this.get('model.client.available_packages').findBy('id', this.get('available_package.id'))) {
        return true;
      }
    }),
    checkboxClass: Ember.computed('disabled', 'packageAvailable', function () {
      if (this.get('packageAvailable') && this.get('disabled')) {
        return 'available disabled';
      } else if (this.get('packageAvailable')) {
        return 'available';
      } else if (this.get('disabled')) {
        return 'not-available disabled';
      } else {
        return 'not-available';
      }
    }),
    actions: {
      toggleChecked: function () {
        if (this.get('disabled')) {
          return false;
        }
        if (this.get('packageAvailable')) {
          return this.send('destroy');
        } else {
          return this.send('create');
        }
      },
      create: function () {
        var available_package;
        available_package = this.get('model.client.available_packages').createRecord({
          "package": this.get('available_package')
        });
        return available_package.save().then(function (_this) {
          return function () {
            return _this.get('model.client').reload();
          };
        }(this));
      },
      destroy: function () {
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/clients/" + this.get('model.client.id') + "/available_packages/" + this.get('available_package.id'),
          headers: this.get('sessionAccount.headers'),
          type: 'DELETE',
          dataType: 'json'
        }).then(function (_this) {
          return function (response) {
            _this.get('model.client.available_packages').removeObject({
              "package": _this.get('available_package')
            });
            return _this.get('model.client').reload();
          };
        }(this), function (_this) {
          return function (response) {
            return console.log('somethign w wrong...');
          };
        }(this));
      }
    }
  });

  exports.default = ClientPackageCheckboxComponent;
});
define('admin/components/clients/client-form', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientFormComponent;

  ClientFormComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    clientLoginParams: Ember.computed('model', function () {
      return {
        client_email: this.get('client.email')
      };
    }),
    actions: {
      editProfile: function () {
        return this.get('editClientModal')();
      },
      update: function (model) {
        return model.save();
      }
    }
  });

  exports.default = ClientFormComponent;
});
define('admin/components/clients/client-profile-edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientProfileEditComponent;

  ClientProfileEditComponent = Ember.Component.extend({
    tagName: "form",
    init: function () {
      this._super();
      return this.set('selectedOrganization', this.get('model.client.organization'));
    },
    saveButtonText: Ember.computed('model.client', function () {
      if (this.get('model.client.id')) {
        return 'Save';
      } else {
        return 'Create';
      }
    }),
    submit: function (e) {
      e.preventDefault();
      return this.sendAction('saveClientAction', this.get('model.client'), this.get('selectedOrganization'));
    },
    actions: {
      closeModal: function () {
        this.get('model.client').rollbackAttributes();
        return this.sendAction('closeModalAction');
      }
    }
  });

  exports.default = ClientProfileEditComponent;
});
define('admin/components/clients/package-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PackageFormComponent;

  PackageFormComponent = Ember.Component.extend({
    tagName: "form",
    disableOnEdit: Ember.computed('model.package.isNew', function () {
      return !this.get('model.package.isNew');
    }),
    submitLabel: Ember.computed('model.package', function () {
      if (this.get('model.package.isNew')) {
        return "Create";
      } else {
        return "Update";
      }
    }),
    drones: Ember.computed('model.drones', function () {
      return this.get('model.drones').sortBy('full_name');
    }),
    sortProperties: ["vertical.short_name:asc", "priceInDollars:asc", "name:asc"],
    dronebasePackagesSorted: Ember.computed.sort("model.dronebase_packages", "sortProperties"),
    showDronebasePack: Ember.computed('disableOnEdit', 'mode', function () {
      return this.get('mode') !== 'Client' && !this.get('disableOnEdit');
    }),
    submit: function (e) {
      e.preventDefault();
      return this.sendAction('savePackageAction', this.get('model'));
    },
    selectedDronebasePackageObserver: Em.observer('selectedDronebasePackage', function () {
      var belongsToRelationships, dronebasePack, hasManyRelationships;
      dronebasePack = this.get('selectedDronebasePackage').toJSON();
      hasManyRelationships = [['devices', 'device'], ['drones', 'drone'], ['droneCameras', 'drone_camera'], ['pilotEquipments', 'pilot_equipment']];
      belongsToRelationships = ['vertical', 'template', 'accountRep', 'badge'];
      hasManyRelationships.forEach(function (_this) {
        return function (relation) {
          var values;
          values = [];
          dronebasePack[relation[0]].forEach(function (id) {
            return values.push(_this.get('model.package.store').peekRecord(relation[1], id));
          });
          return dronebasePack[relation[0]] = values;
        };
      }(this));
      this.get('model.package').setProperties(dronebasePack);
      belongsToRelationships.forEach(function (_this) {
        return function (relation) {
          return _this.set("model.package." + relation, _this.get("selectedDronebasePackage." + relation));
        };
      }(this));
      this.set('model.package.organization', this.get('model.organization'));
      return this.set('model.package.slug', null);
    }),
    actions: {
      setMegaPixels: function (val) {
        return this.set('model.package.camera_mega_pixels', val);
      },
      closeModal: function () {
        if (this.get('model.package.hasDirtyAttributes')) {
          if (this.get('model.package.hasDirtyAttributes')) {
            this.get('model.package').rollbackAttributes();
          } else {
            this.get('model.package').destroy();
          }
        }
        return this.sendAction('closeModalAction');
      },
      toggleAutoDispatch: function () {
        return this.toggleProperty('model.package.auto_dispatch_enabled');
      },
      changeBadge: function (val) {
        this.set('model.package.badge', val);
        if (val === void 0) {
          return this.set('model.package.badge_required', false);
        }
      }
    }
  });

  exports.default = PackageFormComponent;
});
define('admin/components/collaborator-list', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CollaboratorListComponent;

  CollaboratorListComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    actions: {
      "delete": function (collaborator, mission) {
        return collaborator.destroyRecord().then(function () {
          return collaborator.unloadRecord();
        });
      },
      reset: function () {
        this.set('createMode', false);
        return this.reset();
      },
      add: function (mission) {
        if (this.get('newEmail') === void 0 || this.get('newEmail').length <= 0) {} else if (this.get('createMode') && this.get('newEmail') && this.get('newFirstName') && this.get('newLastName')) {
          return this.createCollaborator(mission);
        } else {
          return mission.store.query('client', {
            'exact_email': this.get('newEmail')
          }).then(function (_this) {
            return function (clients) {
              var client;
              client = clients.get('firstObject');
              if (client) {
                _this.set('newEmail', client.get('email'));
                _this.set('newFirstName', clients.get('firstObject').get('first_name'));
                _this.set('newLastName', clients.get('firstObject').get('last_name'));
                _this.set('createMode', false);
                return _this.createCollaborator(mission);
              } else {
                _this.set('createMode', true);
                return _this.reset();
              }
            };
          }(this));
        }
      }
    },
    reset: function () {
      this.set('newFirstName', '');
      return this.set('newLastName', '');
    },
    createCollaborator: function (mission) {
      Ember.$.ajax({
        url: _environment.default.api.host + "/v1/admin/missions/" + this.get('mission.id') + "/collaborators",
        method: 'POST',
        data: {
          email: this.get('newEmail'),
          first_name: this.get('newFirstName'),
          last_name: this.get('newLastName')
        },
        headers: this.get('sessionAccount.headers')
      }).then(function (_this) {
        return function (response) {
          console.log('created collaborator');
          return _this.get('mission').store.pushPayload(response);
        };
      }(this));
      this.set('newEmail', '');
      this.set('createMode', false);
      return this.reset();
    }
  });

  exports.default = CollaboratorListComponent;
});
define('admin/components/collapsible-sidebar-item', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CollapsibleSidebarItemComponent;

  CollapsibleSidebarItemComponent = Ember.Component.extend({
    initPage: Ember.on('init', function () {
      return this.set('expanded', !this.get('collapsed'));
    }),
    actions: {
      toggle: function () {
        return this.set('expanded', !this.get('expanded'));
      }
    }
  });

  exports.default = CollapsibleSidebarItemComponent;
});
define('admin/components/creative-mission-meta-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CreativeMissionMetaFormComponent;

  CreativeMissionMetaFormComponent = Ember.Component.extend({
    classNames: ['row', 'creative-mission'],
    classNameBindings: ['creativeMission::hide'],
    tagList: Ember.computed('model.mission.tags.[]', function () {
      return this.get('model.mission.tags').join(',');
    }),
    creativeMission: Ember.computed('model.mission.mission_type', function () {
      return this.get('model.mission.mission_type') === 'creative';
    }),
    thumbnail_timecode: Ember.computed('model.mission.videos.[]', function () {
      return this.get('model.mission.videos.firstObject.thumbnail_timecode');
    }),
    updateTimecode: Ember.observer('thumbnail_timecode', function () {
      if (this.get('model.mission.videos.firstObject')) {
        return this.set('model.mission.videos.firstObject.thumbnail_timecode', this.get('thumbnail_timecode'));
      }
    }),
    actions: {
      updateMissionMeta: function (model) {
        var tag_array;
        if (this.get('model.mission.tags.length') > 45) {
          alert('45 or less tags!');
          return;
        }
        if (this.get('tagList').trim() !== '') {
          tag_array = this.get('tagList').split(',');
          this.set('model.mission.tags', tag_array);
        }
        if (this.get('model.mission.tags.lastObject').trim() === '') {
          this.get('model.mission.tags').popObject();
          this.set('tagList', this.get('model.mission.tags').join(','));
        }
        return this.sendAction('updateCreativeMissionMetaAction', model);
      }
    }
  });

  exports.default = CreativeMissionMetaFormComponent;
});
define('admin/components/creative-mission-response', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CreativeMissionResponseComponent;

  CreativeMissionResponseComponent = Ember.Component.extend({
    classNames: ['row', 'creative-mission'],
    classNameBindings: ['creativeMission::hide'],
    sessionAccount: Ember.inject.service(),
    creativeMission: Ember.computed('model.mission_type', function () {
      return this.get('model.mission_type') === 'creative';
    }),
    responseNotes: ['Color Setting', 'Content', 'Damaged Footage', 'Drone Visible', 'Edited Video', 'Featured Brands / People', 'Fisheye Distortion', 'Non-unique Footage', 'Out of Focus', 'Overexposed', 'Too Compressed/Pixelated', 'Underexposed', 'Uneven Gimbal', 'Unstable'],
    rejected: Ember.computed('model.accepted', function () {
      return this.get('model.accepted') === false || this.get('model.accepted') === 'false';
    }),
    transcoderRejected: false,
    didInsertElement: function () {
      if (this.get('rejected') && this.get('model.rejected_by') === null) {
        return this.set('transcoderRejected', true);
      }
    },
    actions: {
      setResponseNote: function (note) {
        return this.set('model.rejection_notes', note);
      },
      sendResponse: function (mission) {
        if (this.get('model.accepted') === true || this.get('model.accepted') === 'true') {
          this.set('model.rejection_notes', null);
        }
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/responses",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            accepted: mission.get('accepted'),
            rejection_notes: mission.get('rejection_notes')
          }
        }).then(function (response) {
          return mission.reload();
        }, function (response) {});
      }
    }
  });

  exports.default = CreativeMissionResponseComponent;
});
define('admin/components/device-index-list', ['exports', 'admin/components/equipment-index-list'], function (exports, _equipmentIndexList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DeviceIndexListComponent;

  DeviceIndexListComponent = _equipmentIndexList.default.extend({
    collapsed: true,
    showModal: false,
    currentRecord: null,
    cachedRecords: [],
    recordType: null
  });

  exports.default = DeviceIndexListComponent;
});
define('admin/components/drone-index-list', ['exports', 'admin/components/equipment-index-list'], function (exports, _equipmentIndexList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneIndexListComponent;

  DroneIndexListComponent = _equipmentIndexList.default.extend({
    collapsed: true,
    showModal: false,
    currentRecord: null,
    cachedRecords: [],
    recordType: null,
    actions: {
      cloneRecord: function (record) {
        var camera, i, len, ref;
        this.set('currentRecord', this.get('store').createRecord(this.get('recordType')));
        this.get('currentRecord').setProperties(record.serialize().data.attributes);
        this.get('currentRecord').set('drone_manufacturer', record.get('drone_manufacturer'));
        ref = record.get('optional_cameras').toArray();
        for (i = 0, len = ref.length; i < len; i++) {
          camera = ref[i];
          this.get('currentRecord').get('optional_cameras').pushObject(camera);
        }
        return this.set('showModal', true);
      }
    }
  });

  exports.default = DroneIndexListComponent;
});
define('admin/components/drones-devices-equipment-selection', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DronesDevicesEquipmentSelectionComponent;

  DronesDevicesEquipmentSelectionComponent = Ember.Component.extend({
    classNames: ['drones-devices-equipment'],
    includeManufacturer: true,
    droneCameraCounter: Ember.computed('selectedDrones.[]', 'selectedCameras.[]', function () {
      return this.get('selectedDrones.length') + this.get('selectedCameras.length');
    }),
    droneLength: Ember.computed('model.drones', function () {
      return this.get('model.drones.length');
    }),
    dronesHalf: Ember.computed('model.drones', function () {
      return Math.floor(this.get('droneLength') / 2) - 1;
    }),
    dronesOne: Ember.computed('model.drones', function () {
      return this.get('drones').toArray().slice(0, +this.get('dronesHalf') + 1 || 9e9);
    }),
    dronesTwo: Ember.computed('model.drones', function () {
      return this.get('drones').toArray().slice(this.get('dronesHalf') + 1, +(this.get('droneLength') - 1) + 1 || 9e9);
    }),
    devicesCounter: Ember.computed('selectedPhones.[]', 'selectedTablets.[]', function () {
      return this.get('selectedPhones.length') + this.get('selectedTablets.length');
    }),
    equipmentCounter: Ember.computed('selectedEquipment.[]', function () {
      return this.get('selectedEquipment.length');
    }),
    selectedDronesObjects: Ember.computed('model.drones', 'selectedDrones.[]', function () {
      var selection;
      selection = this.get('selectedDrones');
      return this.get('model.drones').filter(function (drone) {
        return selection.indexOf("" + drone.id) !== -1;
      });
    }),
    selectedPhones: Ember.computed('selectedDevices', 'selectedDevices.@each.type', function () {
      return this.get('selectedDevices').filter(function (device) {
        return device.get('device_type') === 'phone';
      });
    }),
    selectedTablets: Ember.computed('selectedDevices', 'selectedDevices.@each.type', function () {
      return this.get('selectedDevices').filter(function (device) {
        return device.get('device_type') === 'tablet';
      });
    }),
    cameras: Ember.computed('model.drones', function () {
      var availableCameraIds, cameras, seen;
      cameras = [];
      seen = {};
      availableCameraIds = [];
      this.get('model.drones').toArray().forEach(function (drone) {
        return drone.get('optional_cameras').sortBy('full_name').forEach(function (camera) {
          if (!seen[camera.id]) {
            seen[camera.id] = true;
            cameras.push(camera);
            return availableCameraIds.push(camera.get('id'));
          }
        });
      });
      return cameras;
    }),
    phones: Ember.computed('model.devices', function () {
      return this.get('model.devices').sortBy('full_name').filter(function (device) {
        return device.get('device_type') === 'phone';
      });
    }),
    tablets: Ember.computed('model.devices', function () {
      return this.get('model.devices').sortBy('full_name').filter(function (device) {
        return device.get('device_type') === 'tablet';
      });
    }),
    equipments: Ember.computed('model.equipment', function () {
      return this.get('model.equipment').sortBy('full_name');
    }),
    actions: {
      toggleDroneList: function (event) {
        $($('#drone-header-toggle').data('target')).toggle();
        return this.set('droneCameraOpen', !this.get('droneCameraOpen'));
      },
      toggleDeviceList: function (event) {
        $($('#devices-header-toggle').data('target')).toggle();
        return this.set('devicesOpen', !this.get('devicesOpen'));
      },
      toggleEquipmentList: function (event) {
        $($('#other-equipment-header-toggle').data('target')).toggle();
        return this.set('equipmentOpen', !this.get('equipmentOpen'));
      }
    }
  });

  exports.default = DronesDevicesEquipmentSelectionComponent;
});
define('admin/components/email-notify', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var EmailNotifyComponent;

  EmailNotifyComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    state: 'idle',
    headers: {},
    message: '',
    classNames: ['email-notify'],
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        var _this;
        _this = this;
        return _this.get('session').authorize('authorizer:devise', function (headerName, headerValue) {
          var hash;
          hash = _this.get('headers');
          hash[headerName] = headerValue;
          return _this.set('headers', hash);
        });
      });
    },
    idle: Ember.computed('state', function () {
      return this.get('state') === 'idle';
    }),
    clicked: Ember.computed('state', function () {
      return this.get('state') === 'clicked';
    }),
    confirmed: Ember.computed('state', function () {
      return this.get('state') === 'confirmed';
    }),
    error: Ember.computed('state', function () {
      return this.get('state') === 'error';
    }),
    sendPilotNotification: function () {
      return Ember.$.ajax({
        url: _environment.default.api.host + "/v1/admin/missions/" + this.get('mission.id') + "/notifications",
        headers: this.get('headers'),
        type: 'POST',
        dataType: 'json',
        data: {
          pilot: this.get('pilot.id')
        }
      }).then(function (_this) {
        return function (response) {
          _this.get('mission').reload();
          _this.set('message', 'Sent!');
          return _this.set('state', 'confirmed');
        };
      }(this), function (_this) {
        return function (response) {
          _this.set('state', 'error');
          return _this.set('message', response.responseJSON.errors[0].detail);
        };
      }(this));
    },
    actions: {
      setIdle: function () {
        return this.set('state', 'idle');
      },
      setClicked: function () {
        return this.set('state', 'clicked');
      },
      setConfirmed: function () {
        return this.sendPilotNotification();
      }
    }
  });

  exports.default = EmailNotifyComponent;
});
define('admin/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _positionedContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _positionedContainer.default;
    }
  });
});
define('admin/components/ember-modal-dialog/-basic-dialog', ['exports', 'ember-modal-dialog/components/basic-dialog'], function (exports, _basicDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDialog.default;
    }
  });
});
define('admin/components/ember-modal-dialog/-in-place-dialog', ['exports', 'ember-modal-dialog/components/in-place-dialog'], function (exports, _inPlaceDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inPlaceDialog.default;
    }
  });
});
define('admin/components/ember-modal-dialog/-liquid-dialog', ['exports', 'ember-modal-dialog/components/liquid-dialog'], function (exports, _liquidDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidDialog.default;
    }
  });
});
define('admin/components/ember-modal-dialog/-liquid-tether-dialog', ['exports', 'ember-modal-dialog/components/liquid-tether-dialog'], function (exports, _liquidTetherDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidTetherDialog.default;
    }
  });
});
define('admin/components/ember-modal-dialog/-tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _tetherDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tetherDialog.default;
    }
  });
});
define('admin/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('admin/components/equipment-index-list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var EquipmentIndexListComponent;

  EquipmentIndexListComponent = Ember.Component.extend({
    store: Ember.inject.service(),
    collapsed: true,
    showModal: false,
    currentRecord: null,
    cachedRecords: [],
    recordType: null,
    didInsertElement: function () {
      return this.set('currentRecord', this.get('store').createRecord(this.get('recordType')));
    },
    allRecords: Ember.computed('model', 'model.[]', 'cachedRecords.[]', function () {
      var temp;
      temp = [];
      temp.pushObjects(this.cachedRecords);
      return temp.pushObjects(this.get('model').toArray());
    }),
    actions: {
      toggleCollapsed: function () {
        return this.set('collapsed', !this.get('collapsed'));
      },
      toggleModal: function () {
        return this.set('showModal', !this.get('showModal'));
      },
      saveRecord: function () {
        var _this, addToCache, record;
        _this = this;
        record = this.get('currentRecord');
        addToCache = record.get('isNew');
        return record.save().then(function (response) {
          if (addToCache) {
            return _this.get('cachedRecords').pushObject(response);
          }
        });
      },
      cloneRecord: function (record) {
        this.set('currentRecord', this.get('store').createRecord(this.get('recordType')));
        this.get('currentRecord').setProperties(record.serialize().data.attributes);
        return this.set('showModal', true);
      },
      editRecord: function (record) {
        this.set('currentRecord', record);
        return this.set('showModal', true);
      },
      addRecord: function () {
        this.set('currentRecord', this.get('store').createRecord(this.get('recordType')));
        return this.set('showModal', true);
      }
    }
  });

  exports.default = EquipmentIndexListComponent;
});
define('admin/components/errors-for', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ErrorsForComponent;

  ErrorsForComponent = Ember.Component.extend();

  exports.default = ErrorsForComponent;
});
define('admin/components/expandable-table-row', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ExpandableTableRowComponent;

  ExpandableTableRowComponent = Ember.Component.extend({
    tagName: 'tbody',
    classNames: ['expandable-tbody'],
    click: function (e) {
      var $indicator, $togglable;
      $togglable = this.$().find('.expandable');
      $indicator = this.$().find('.toggle-indicator');
      if ($togglable.is(':visible')) {
        $togglable.hide();
        return $indicator.removeClass('fa-chevron-down').addClass('fa-chevron-right');
      } else {
        $togglable.show();
        return $indicator.removeClass('fa-chevron-right').addClass('fa-chevron-down');
      }
    },
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        return this.$().find('.expandable').on('click', function (e) {
          return e.stopPropagation();
        });
      });
    },
    willClearRender: function () {
      return this.$().find('.expandable').off('click');
    }
  });

  exports.default = ExpandableTableRowComponent;
});
define('admin/components/filter-missions', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FilterMissionsComponent;

  FilterMissionsComponent = Ember.Component.extend({
    classNames: ["filter-missions-sidebar"],
    sessionAccount: Ember.inject.service(),
    status: null,
    latitude: null,
    longitude: null,
    distance: null,
    distanceFilter: false,
    assets_late: false,
    on_hold: false,
    reshoot: false,
    include_client_ids: null,
    exclude_client_ids: null,
    selectedClients: [],
    statuses: null,
    router: Ember.computed(function () {
      return Ember.getOwner(this).lookup('router:main');
    }).readOnly(),
    initPage: Ember.on('init', function () {
      this.set('include', true);
      return Ember.run.schedule("afterRender", this, function () {
        return this.setupClientFilter();
      });
    }),
    showStatus: Ember.computed('router.currentPath', function () {
      return this.get('router.currentPath').includes('missions');
    }),
    showLocation: Ember.computed('router.currentPath', function () {
      if (this.get('router.currentPath') === 'pilots.index') {
        this.set('locationTitle', 'Pilot Location');
      } else {
        this.set('locationTitle', 'Mission Location');
      }
      return this.get('router.currentPath').includes('missions') || this.get('router.currentPath') === 'pilots.index';
    }),
    showPilotStatuses: Ember.computed('router.currentPath', function () {
      return this.get('router.currentPath') === 'pilots.index';
    }),
    setupClientFilter: function () {
      var client, clientArray, clients, i, len, results;
      if (this.get('exclude_client_ids')) {
        clients = this.get('exclude_client_ids');
        this.set('include', false);
      } else {
        clients = this.get('include_client_ids');
      }
      if (clients) {
        clientArray = clients.split(',');
        results = [];
        for (i = 0, len = clientArray.length; i < len; i++) {
          client = clientArray[i];
          results.push(this.requestClients(client).then(function (_this) {
            return function (response) {
              var formedClient;
              client = response.data[0];
              formedClient = {
                id: client.id,
                companyOrFullName: client.attributes.company_name || client.attributes.first_name + " " + client.attributes.last_name
              };
              return _this.set('selectedClients', _this.get('selectedClients').concat([formedClient]));
            };
          }(this)));
        }
        return results;
      }
    },
    requestClients: function (client) {
      return Ember.$.ajax({
        url: _environment.default.api.host + "/v1/admin/clients?quick_search=true&q=" + client,
        headers: this.get('sessionAccount.headers'),
        type: 'GET',
        dataType: 'json'
      });
    },
    actions: {
      updateAssetsLate: function () {
        this.set('assets_late', !this.get('assets_late'));
      },
      updateReshoot: function () {
        this.set('reshoot', !this.get('reshoot'));
      },
      updateOnHold: function () {
        this.set('on_hold', !this.get('on_hold'));
      },
      updateApprovedPilots: function () {
        this.set('approvedPilots', !get('approvedPilots'));
      },
      toggleFilter: function () {
        return this.set('hideFilter', true);
      },
      toggleInclude: function () {
        return this.set('include', !this.get('include'));
      },
      updateClientAutocomplete: function () {
        var requestFunc;
        if (this.get('client')) {
          requestFunc = function () {
            return this.requestClients(this.get('client')).then(function (_this) {
              return function (response) {
                var client, formedClient, i, len, list, ref;
                list = [];
                ref = response.data;
                for (i = 0, len = ref.length; i < len; i++) {
                  client = ref[i];
                  formedClient = {
                    id: client.id,
                    companyOrFullName: client.attributes.company_name || client.attributes.first_name + " " + client.attributes.last_name
                  };
                  list.push(formedClient);
                }
                return _this.set('clientAutocompleteList', list);
              };
            }(this));
          };
          return Ember.run.debounce(this, requestFunc, 500);
        }
      },
      selectClient: function (client) {
        this.set('selectedClients', this.get('selectedClients').concat([client]));
        this.set('clientAutocompleteList', []);
        return this.set('client', null);
      },
      deselectClient: function (client) {
        return this.set('selectedClients', this.get('selectedClients').filter(function (selected) {
          return client !== selected;
        }));
      },
      filterClients: function () {
        var client, i, len, ref, selected_ids;
        selected_ids = '';
        ref = this.get('selectedClients');
        for (i = 0, len = ref.length; i < len; i++) {
          client = ref[i];
          selected_ids += ',';
          selected_ids += client.id;
        }
        selected_ids = selected_ids.substring(1);
        if (this.get('include')) {
          this.set('include_client_ids', selected_ids);
          return this.set('exclude_client_ids', '');
        } else {
          this.set('exclude_client_ids', selected_ids);
          return this.set('include_client_ids', '');
        }
      }
    }
  });

  exports.default = FilterMissionsComponent;
});
define('admin/components/hold-mission-modal', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var HoldMissionModalComponent;

  HoldMissionModalComponent = Ember.Component.extend({
    actions: {
      close: function () {
        return this.get('close')();
      },
      setHoldReason: function (value) {
        return this.set('reason_id', value);
      },
      hold: function (model) {
        var data;
        if (!$('.form-horizontal select').val()) {
          $($('.error-message')[0]).show();
          return;
        } else {
          $($('.error-message')[0]).hide();
        }
        data = {
          'mission_hold_reason_id': this.get('reason_id'),
          'reason_notes': this.get('reasonDetails')
        };
        this.get('close')();
        return this.sendAction('action', model, data);
      }
    }
  });

  exports.default = HoldMissionModalComponent;
});
define('admin/components/infinity-loader', ['exports', 'ember-infinity/components/infinity-loader'], function (exports, _infinityLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _infinityLoader.default;
});
define('admin/components/input-checkbox-inplace-edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputCheckboxInplaceEditComponent;

  InputCheckboxInplaceEditComponent = Ember.Component.extend({
    classNames: ['inline-info'],
    value: null,
    saveOnChange: function () {
      return this.send('save');
    }.observes('value'),
    actions: {
      save: function () {
        var _this;
        _this = this;
        return this.get('model').save().then(function (response) {}, function (response) {
          return _this.$('input').addClass('error');
        });
      }
    }
  });

  exports.default = InputCheckboxInplaceEditComponent;
});
define('admin/components/input-inplace-edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputInplaceEditComponent;

  InputInplaceEditComponent = Ember.Component.extend({
    classNames: ['form-group-inplace'],
    click: function () {
      if (!this.get('isEditing')) {
        this.set('isEditing', true);
        return Ember.run.scheduleOnce('afterRender', this, this.focusTextField);
      }
    },
    focusTextField: function () {
      var $input, val;
      $input = this.$('input, textarea');
      val = $input.val();
      $input.focus();
      $input.val('');
      return $input.val(val);
    },
    flashSuccess: function () {
      return this.$('.inline-input').addClass('success');
    },
    actions: {
      save: function () {
        var _this;
        _this = this;
        return this.get('model').save().then(function () {
          if (_this.$('input').attr('type') === "password") {
            _this.set('value', null);
          }
          _this.set('isEditing', false);
          return Ember.run.scheduleOnce('afterRender', _this, _this.flashSuccess);
        }, function (response) {
          return _this.$('input').addClass('error');
        });
      }
    }
  });

  exports.default = InputInplaceEditComponent;
});
define('admin/components/input-readonly-select-all', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputReadonlySelectAllComponent;

  InputReadonlySelectAllComponent = Ember.TextField.extend({
    readonly: true,
    type: 'text',
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        return this.$().select();
      });
    },
    click: function () {
      return this.$().select();
    }
  });

  exports.default = InputReadonlySelectAllComponent;
});
define('admin/components/input-trigger-save', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputTriggerSaveComponent;

  InputTriggerSaveComponent = Ember.TextField.extend({
    classNames: ['form-control'],
    type: 'text',
    keyPress: function (e) {
      if (e.which === 13) {
        return this.sendAction('save');
      }
    },
    focusOut: function () {
      return this.sendAction('save');
    }
  });

  exports.default = InputTriggerSaveComponent;
});
define('admin/components/input-validated-dollars', ['exports', 'admin/components/input-validated', 'accounting/format-money', 'accounting/unformat'], function (exports, _inputValidated, _formatMoney, _unformat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputValidatedDollarsComponent;

  InputValidatedDollarsComponent = _inputValidated.default.extend({
    formatMoney: _formatMoney.default,
    unformatMoney: _unformat.default,
    valueChanged: Ember.observer('value', function () {
      return this.set('displayValue', this.formatMoney(this.get('value') / 100));
    }),
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        return this.set('displayValue', this.formatMoney(this.get('value') / 100));
      });
    },
    actions: {
      focus: function () {
        var displayValue, price;
        displayValue = this.get('displayValue');
        price = this.unformatMoney(displayValue);
        this.set('displayValue', price);
        return this.$('input').select();
      },
      showErrors: function () {
        var priceInCents;
        this._super();
        priceInCents = this.unformatMoney(this.get('displayValue')) * 100;
        this.set('value', priceInCents);
        return this.set('displayValue', this.formatMoney(priceInCents / 100));
      }
    }
  });

  exports.default = InputValidatedDollarsComponent;
});
define('admin/components/input-validated', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var InputValidatedComponent;

  InputValidatedComponent = Ember.Component.extend({
    classNames: ["form-group"],
    inputClasses: Em.computed('modelErrors.length', function () {
      var classes;
      classes = 'form-control';
      if (this.get('modelErrors.length')) {
        classes = classes + ' error';
      }
      return classes;
    }),
    actions: {
      showErrors: function () {
        return this.set('showError', true);
      }
    }
  });

  exports.default = InputValidatedComponent;
});
define('admin/components/main-navigation', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MainNavigationComponent;

  MainNavigationComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    router: Ember.computed(function () {
      return Ember.getOwner(this).lookup('router:main');
    }).readOnly(),
    tagName: 'nav',
    classNames: ["navbar", "navbar-default"],
    highlightedClients: Ember.computed('router.currentPath', function () {
      return this.get('router.currentPath').includes('clients');
    }),
    highlightedPilots: Ember.computed('router.currentPath', function () {
      return this.get('router.currentPath').includes('pilots');
    }),
    highlightedAdminTools: Ember.computed('router.currentPath', function () {
      return this.get('router.currentPath').includes('global_assets') || this.get('router.currentPath').includes('templates') || this.get('router.currentPath').includes('partner_integration') || this.get('router.currentPath').includes('equipment') || this.get('router.currentPath').includes('badges');
    }),
    click: function (e) {
      var el;
      el = this.$('.navbar-collapse.in');
      if (el.length > 0) {
        return el.collapse('hide');
      }
    },
    actions: {
      invalidateSession: function () {
        return this.get('session').invalidate();
      }
    }
  });

  exports.default = MainNavigationComponent;
});
define('admin/components/mapbox-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MapboxMapComponent,
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  MapboxMapComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    needActionStatus: ['created', 'confirmed', 'pilots_notified', 'unfulfilled'],
    map: null,
    missionLayer: null,
    didInsertElement: function () {
      return Ember.run.scheduleOnce('afterRender', this, function () {
        return this.initMap();
      });
    },
    didReceiveAttrs: function () {
      return this.setupGeojson();
    },
    setupGeojson: function () {
      var geojson;
      if (this.map) {
        geojson = this.get('geoJsonArrayForMissions');
        this.missionLayer.setGeoJSON(geojson);
        if (geojson.length) {
          return this.map.fitBounds(this.missionLayer.getBounds());
        }
      }
    },
    generateFeatureContent: function (properties) {
      var addressFirstLine, addressSecondLine, content, link, missionPrice, missionShortName, scheduled_date, scheduled_time;
      addressFirstLine = properties.address.get('address');
      addressSecondLine = this.getAddressSecondLine(properties.address);
      link = this.getMissionLink(properties.missionId);
      missionShortName = properties.mission_type.get('vertical.short_name');
      missionPrice = properties.mission_type.get('price') / 100;
      scheduled_date = properties.scheduled_date;
      scheduled_time = properties.scheduled_time;
      content = "<div class='info-window-panel'> <div class='left-panel'> <div class='addresses'> <div class='addressFirstLine'> " + addressFirstLine + " </div> <div class='addressSecondLine'> " + addressSecondLine + " </div> </div> <div class='mission-details'> " + missionShortName + " $" + missionPrice + " <br /> <b>Payout: </b> " + properties.payout + " <br /> <b>Status: </b> " + properties.status + " <br /> </div> </div> <div class='right-panel'> " + scheduled_date + " <br /> " + scheduled_time + " <a href='" + link + "' target='_blank' class='turquoise-button'>View</a> </div> </div>";
      return content;
    },
    initMap: function () {
      var _this, geojson;
      L.mapbox.accessToken = 'pk.eyJ1IjoiZHJvbmViYXNlLWVuZyIsImEiOiJjamd6ZmcxNWowMWFzMnFycGFmdHhyN2Y3In0.1esJJNW-X93nqHOwdZnJug';
      this.map = L.mapbox.map('map').setView([37.8, -96], 4);
      L.mapbox.styleLayer('mapbox://styles/dronebase-eng/cjl2nhmob6spv2rs8w4sp1iu1').addTo(this.map);
      this.missionLayer = L.mapbox.featureLayer().addTo(this.map);
      geojson = this.get('geoJsonArrayForMissions');
      _this = this;
      this.missionLayer.on('layeradd', function (e) {
        var content, feature, marker, properties;
        marker = e.layer;
        if (marker.feature.type === 'Feature') {
          feature = marker.feature;
          properties = feature.properties;
          marker.setIcon(L.divIcon(properties.icon));
          content = _this.generateFeatureContent(properties);
          return marker.bindPopup(content);
        }
      });
      this.missionLayer.setGeoJSON(geojson);
      this.map.featureLayer.on('click', function (e) {
        return this.map.panTo(e.layer.getLatLng());
      });
      return this.missionLayer.on('ready', function (e) {
        if (geojson.length) {
          return this.map.fitBounds(this.missionLayer.getBounds());
        }
      });
    },
    geoJsonArrayForMissions: Ember.computed('missions.[]', function () {
      var _this, geojson;
      geojson = [];
      _this = this;
      this.get('missions').forEach(function (mission) {
        var added_comma, iconClass, missionJson, payout, ref, scheduled_date, scheduled_time;
        iconClass = 'blue-pin';
        if (ref = mission.get('status'), indexOf.call(_this.needActionStatus, ref) >= 0) {
          iconClass = 'yellow-pin';
        }
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
        payout = "Not set";
        if (mission.get('estimated_pilot_payout') && !(mission.get('estimated_pilot_payout') === "0")) {
          payout = "$" + mission.get('estimated_pilot_payout') / 100;
        }
        if (mission.get('location.longitude') && mission.get('location.latitude')) {
          missionJson = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(mission.get('location.longitude')), parseFloat(mission.get('location.latitude'))]
            },
            properties: {
              icon: {
                className: iconClass,
                iconSize: null,
                iconAnchor: [16, 37],
                popupAnchor: [0, -42]
              },
              address: mission.get('location'),
              scheduled_date: scheduled_date,
              scheduled_time: scheduled_time,
              mission_type: mission.get('package'),
              status: mission.get('status'),
              payout: payout,
              missionId: mission.get('id')
            }
          };
          return geojson.push(missionJson);
        }
      });
      return geojson;
    }),
    geoJsonPolygons: function () {},
    getMissionLink: function (missionId) {
      return "missions/" + missionId + "/edit";
    },
    getAddressSecondLine: function (location) {
      var addressParts;
      addressParts = [location.get('city'), location.get('state'), location.get('postal_code'), location.get('country')];
      return addressParts = addressParts.filter(function (part) {
        return part;
      }).join(', ');
    }
  });

  exports.default = MapboxMapComponent;
});
define('admin/components/md-dummy', ['exports', 'ember-remarkable/components/md-dummy'], function (exports, _mdDummy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mdDummy.default;
    }
  });
});
define('admin/components/md-text', ['exports', 'ember-remarkable/components/md-text'], function (exports, _mdText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mdText.default;
    }
  });
});
define('admin/components/mission-asset-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionAssetMapComponent;

  MissionAssetMapComponent = Ember.Component.extend({
    featureOptions: {
      PROPERTYAREA: {
        type: 'Property Area',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          strokeOpacity: 1,
          strokeColor: '#2e6da4',
          strokeWeight: 6,
          fillColor: '#2e6da4',
          fillOpacity: 0.7,
          editable: true,
          draggable: true,
          zIndex: 2
        }
      },
      NOFLYZONE: {
        type: 'No Fly Zone',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          strokeOpacity: 1,
          strokeColor: '#d43f3a',
          strokeWeight: 6,
          fillColor: '#d43f3a',
          fillOpacity: 0.7,
          editable: true,
          draggable: true,
          zIndex: 2
        }
      },
      POINTOFINTEREST: {
        type: 'Point of Interest',
        geometry_type: 'Point',
        defaultOptions: {
          paths: null,
          draggable: true,
          icon: '/assets/images/poi_icon.png',
          zIndex: 3
        }
      }
    },
    didInsertElement: function () {
      this.initMap();
      return this.addObserver('mapImageMarkers', this, 'refreshMap');
    },
    refreshMap: function () {
      this.clearMarkers();
      return this.initMap();
    },
    initMap: function () {
      var _this, latLng, options;
      _this = this;
      options = {
        zoom: 17,
        tilt: 0,
        mapTypeId: google.maps.MapTypeId['HYBRID'],
        mapTypeControl: false,
        streetViewControl: false,
        scaleControl: false,
        panControl: false,
        draggable: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        draggable: true,
        disableDoubleClickZoom: false
      };
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('asset-map'), options);
      }
      if (this.get('mission.location.latitude') && this.get('mission.location.longitude')) {
        latLng = this.buildLatLng(this.get('mission.location.latitude'), this.get('mission.location.longitude'));
      } else {
        latLng = new google.maps.LatLng(37.2350, -115.8111);
      }
      this.map.setCenter(latLng);
      this.map.data.addListener('addfeature', function (event) {
        return _this.map.data.overrideStyle(event.feature, _this.get("featureOptions." + event.feature.getProperty('type').replace(/ /g, '').toUpperCase() + ".defaultOptions"));
      });
      this.loadMissionCenterPin();
      this.loadPropertyPolygon();
      this.loadImagePins();
      return this.fitAllFeatures();
    },
    loadMissionCenterPin: function () {
      var latLng, marker;
      if (this.get('mission.location.latitude') && this.get('mission.location.longitude')) {
        latLng = this.buildLatLng(this.get('mission.location.latitude'), this.get('mission.location.longitude'));
        return marker = new google.maps.Marker({
          map: this.map,
          icon: {
            url: '/assets/images/property_pin.svg',
            scaledSize: new google.maps.Size(50, 80),
            origin: new google.maps.Point(0, 0)
          },
          position: latLng
        });
      }
    },
    loadPropertyPolygon: function () {
      if (this.get('mission.location.properties') && this.get('mission.location.properties.features') && this.get('mission.location.properties.features').length) {
        try {
          return this.map.data.addGeoJson(this.get('mission.location.properties'));
        } catch (error) {
          return console.log('property data malformed, cannot load image map');
        }
      }
    },
    loadImagePins: function () {
      var _this, markers, total;
      _this = this;
      markers = [];
      total = this.get('mapImageMarkers.length');
      if (total && total > 0) {
        this.get('mapImageMarkers').forEach(function (image) {
          if (image.get('gps_latitude') && image.get('gps_longitude')) {
            return markers.push(new google.maps.Marker({
              icon: _this.markerIcon(total),
              map: _this.map,
              position: _this.buildLatLng(image.get('gps_latitude'), image.get('gps_longitude'))
            }));
          }
        });
      }
      return this.set('markers', markers);
    },
    markerIcon: function (total) {
      if (total < 250) {
        return {
          url: '/assets/images/gps-map-marker.svg',
          scaledSize: new google.maps.Size(30, 30),
          origin: new google.maps.Point(10, 10)
        };
      } else {
        return {
          url: '/assets/images/gps-map-marker_sml.png'
        };
      }
    },
    clearMarkers: function () {
      if (this.get('markers')) {
        return this.get('markers').forEach(function (marker) {
          return marker.setMap(null);
        });
      }
    },
    fitAllFeatures: function () {
      var _this, bounds;
      _this = this;
      bounds = new google.maps.LatLngBounds();
      if (this.get('mission.location.properties') && this.get('mission.location.properties.features') && this.get('mission.location.properties.features').length) {
        this.get('mission.location.properties.features').forEach(function (feature) {
          var point;
          if (feature.geometry.type === 'Polygon') {
            return feature.geometry.coordinates.forEach(function (path) {
              return path.forEach(function (latLng) {
                var point;
                point = _this.buildLatLng(latLng[1], latLng[0]);
                return bounds.extend(point);
              });
            });
          } else if (feature.geometry.type === 'Point') {
            point = _this.buildLatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            return bounds.extend(point);
          }
        });
      }
      if (this.get('markers')) {
        this.get('markers').forEach(function (marker) {
          return bounds.extend(marker.position);
        });
      }
      if (!bounds.isEmpty()) {
        return this.map.fitBounds(bounds);
      }
    },
    buildLatLng: function (lat, lng) {
      lat = Number(lat);
      lng = Number(lng);
      return new google.maps.LatLng({
        lat: lat,
        lng: lng
      });
    }
  });

  exports.default = MissionAssetMapComponent;
});
define('admin/components/mission-flight-app', ['exports', 'admin/config/environment', 'ember-cli-file-saver/mixins/file-saver'], function (exports, _environment, _fileSaver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionFlightAppComponent;

  MissionFlightAppComponent = Ember.Component.extend(_fileSaver.default, {
    classNames: ["mission-flight-app row panel-group"],
    sessionAccount: Ember.inject.service(),
    store: Ember.inject.service(),
    miision: null,
    flightApps: null,
    workflowModeOverride: null,
    hasCyberduckCredentials: true,
    didInsertElement: function () {
      if (!(this.get('missionFlightApp.flight_app.deliver_to_app') === 'cyberduck' && this.get('missionFlightApp.value.access_id') != null && this.get('missionFlightApp.value.secret_key') != null)) {
        return this.set('hasCyberduckCredentials', false);
      }
    },
    groupedFlightApps: Ember.computed('model.flightApps', function () {
      var output, values;
      output = {};
      this.get('model.flightApps').forEach(function (flightApp) {
        var key;
        key = flightApp.get('name') + '-' + flightApp.get('data_type');
        if (output[key]) {
          return output[key]['apps'].push(flightApp);
        } else {
          return output[key] = {
            name: flightApp.get('name'),
            dataType: flightApp.get('data_type'),
            apps: [flightApp]
          };
        }
      });
      values = Object.values(output);
      if (!this.get('activeFlightAppGroup')) {
        this.set('activeFlightAppGroup', values[0]);
      }
      return values.sort(function (a, b) {
        var textA, textB;
        textA = a.name;
        textB = b.name;
        return textA.localeCompare(textB);
      });
    }),
    workflowMode: Ember.computed('missionFlightApp', function () {
      if (this.get('missionFlightApp')) {
        return 'create';
      } else {
        return 'none';
      }
    }),
    requireCyberduck: Ember.computed('missionFlightApp', 'missionFlightApp.flight_app', function () {
      return this.get('missionFlightApp.flight_app.deliver_to_app') === 'cyberduck';
    }),
    requireExternalUrl: Ember.computed('missionFlightApp', 'missionFlightApp.flight_app', function () {
      return this.get('missionFlightApp.flight_app.deliver_to_app') === 'external_url';
    }),
    missionFlightApp: Ember.computed('model.mission.mission_flight_app', 'transientMissionFlightApp', function () {
      if (this.get('model.mission.mission_flight_app')) {
        console.log('using persisted');
        return this.get('model.mission.mission_flight_app');
      } else {
        return this.get('transientMissionFlightApp');
      }
    }),
    valueErrorObserver: Ember.observer('valueError', 'missionFlightApp.value.android', 'missionFlightApp.value.ios', 'missionFlightApp.value.external_id', function () {
      var valuePresent;
      valuePresent = this.get('missionFlightApp.value.android') || this.get('missionFlightApp.value.ios') || this.get('missionFlightApp.value.external_id');
      if (this.get('valueError') && valuePresent) {
        return this.set('valueError', !valuePresent);
      }
    }),
    deliveryErrorObserver: Ember.observer('deliveryError', 'missionFlightApp.delivery_to_url', function () {
      var deliveryPresent;
      deliveryPresent = this.get('missionFlightApp.delivery_to_url');
      if (this.get('deliveryError') && deliveryPresent) {
        return this.set('deliveryError', !deliveryPresent);
      }
    }),
    actions: {
      setEditorMode: function (value) {
        var mfa;
        if (value === 'none') {
          if ((mfa = this.get('missionFlightApp')) && mfa.id) {
            if (confirm("Are you sure you want to delete the workflow for this mission? " + mfa.get('mission.id'))) {
              mfa.set('mission', this.get('model.mission'));
              this.get('mission').set('mission_flight_app', mfa);
              return mfa.destroyRecord().then(function (_this) {
                return function () {
                  _this.get('model.mission').set('mission_flight_app', null);
                  _this.set('transientMissionFlightApp', null);
                  return alert("Workflow has been deleted");
                };
              }(this), function () {
                return alert("Failed to delete Workflow");
              });
            } else {
              return Ember.$(this.element).find('[name=workflow-mode][value=create]').click();
            }
          } else {
            return this.set('transientMissionFlightApp', null);
          }
        } else {
          if (!this.get('model.mission.mission_flight_app')) {
            console.log('creating a transient mission flight app');
            mfa = this.get('store').createRecord('mission_flight_app');
            mfa.set('value', {});
            mfa.set('flight_app', this.get('model.flightApps.firstObject'));
            return this.set('transientMissionFlightApp', mfa);
          }
        }
      },
      setAppGroup: function (elem) {
        var currentFlightAppUpload, equivalentUploadMethod, selection, value;
        console.clear();
        value = parseInt(elem.target.value);
        selection = this.get('groupedFlightApps').objectAt(value);
        this.set('activeFlightAppGroup', selection);
        console.log('app group items', selection.apps);
        currentFlightAppUpload = this.get('missionFlightApp.flight_app.deliver_to_app');
        equivalentUploadMethod = selection.apps.filter(function (app) {
          console.log(app.get('deliver_to_app'), currentFlightAppUpload);
          return app.get('deliver_to_app') === currentFlightAppUpload;
        })[0];
        console.log('equivalent upload method', equivalentUploadMethod);
        return this.get('missionFlightApp').set('flight_app', equivalentUploadMethod || selection.apps.objectAt(0));
      },
      setFlightApp: function (elem) {
        var selection, value;
        value = parseInt(elem.target.value);
        selection = this.get('flightApps').filter(function (app) {
          return parseInt(app.get('id')) === value;
        })[0];
        console.log('value', value);
        console.log('setFlightApp', selection);
        if (!selection) {
          selection = this.get('flightApps')[0];
        }
        return this.get('missionFlightApp').set('flight_app', selection);
      },
      submit: function () {
        var mfa;
        mfa = this.get('missionFlightApp');
        mfa.set('mission', this.get('model.mission'));
        if (mfa.get('flight_app.deliver_to_app') !== 'external_url') {
          mfa.set('delivery_to_url', null);
        }
        return mfa.save().then(function () {
          return alert("Workflow Saved");
        }, function (_this) {
          return function (response) {
            console.log(response.errors);
            return response.errors[0].detail.split(', ').forEach(function (error) {
              var field;
              field = error.split(' ')[0].toLowerCase();
              return _this.set(field + 'Error', error);
            });
          };
        }(this));
      },
      generateCredentials: function (mission) {
        $('.cyberduck-credentials .error').hide();
        return $.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/cyberduck",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (data) {
            _this.get('mission').reload();
            return _this.set('hasCyberduckCredentials', true);
          };
        }(this), function (_this) {
          return function (error) {
            return $('.cyberduck-credentials .error').show();
          };
        }(this));
      },
      resetCyberduck: function (mission) {
        var really_delete;
        really_delete = confirm('Delete all assets and set mission to pilot_accepted?');
        if (!really_delete) {
          return;
        }
        $('.cyberduck-reset .error').hide();
        return $.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/cyberduck/reset",
          type: 'DELETE',
          dataType: 'json',
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (data) {
            return window.location.reload(true);
          };
        }(this), function (_this) {
          return function (error) {
            return $('.cyberduck-reset .error').show();
          };
        }(this));
      },
      getDuckFile: function (mission) {
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/cyberduck",
          type: 'GET',
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (response) {
            var bb, blob, error, filename;
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
            filename = mission.id + '.duck';
            return _this.saveFileAs(filename, blob, 'application/octet-stream');
          };
        }(this));
      }
    }
  });

  exports.default = MissionFlightAppComponent;
});
define('admin/components/mission-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionMapComponent;

  MissionMapComponent = Ember.Component.extend({
    featureOptions: {
      PROPERTYAREA: {
        type: 'Property Area',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          strokeOpacity: 1,
          strokeColor: '#2e6da4',
          strokeWeight: 6,
          fillColor: '#2e6da4',
          fillOpacity: 0.7,
          editable: false,
          draggable: false,
          zIndex: 2
        }
      }
    },
    classNames: ['form-group', 'mission-map'],
    DEFAULT_ZOOM: 19,
    buttonDisabled: true,
    typedLatLng: null,
    showInput: true,
    searchValue: Ember.computed('model.location', function () {
      return this.get('model.location.formatted_address');
    }),
    setSearchValue: Ember.observer('model.location.formatted_address', 'typedLatLng', function () {
      if (this.get('typedLatLng')) {
        return this.set('searchValue', this.get('typedLatLng').lat() + ',' + this.get('typedLatLng').lng());
      } else {
        return this.set('searchValue', this.get('model.location.formatted_address'));
      }
    }),
    disableSubmit: Ember.computed('buttonDisabled', function () {
      return this.get('buttonDisabled');
    }),
    didInsertElement: function () {
      Ember.run.scheduleOnce('afterRender', this, function () {
        if (!(typeof google === 'object' && typeof google.maps === 'object')) {
          return Ember.$.getScript('https://maps.googleapis.com/maps/api/js?v=3&signed_in=false&key=AIzaSyD4cDK8yKANxS8psneOCtUQ6WCQOR3boMw&libraries=places,drawing,geometry&callback=__emberGoogleMapLoaded__');
        } else {
          return this.initMap();
        }
      });
      return window.__emberGoogleMapLoaded__ = Ember.run.bind(this, function () {
        return this.initMap();
      });
    },
    initMap: function () {
      var _this, mapOptions;
      _this = this;
      mapOptions = {
        zoom: this.DEFAULT_ZOOM,
        tilt: 0,
        mapTypeId: google.maps.MapTypeId['HYBRID'],
        mapTypeControl: false,
        streetViewControl: false,
        scaleControl: false,
        panControl: false,
        zoomControl: true,
        draggable: true,
        scrollwheel: false
      };
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
      }
      this.markers = Em.A([]);
      this.setupAutocomplete();
      this.map.data.addListener('addfeature', function (_this) {
        return function (event) {
          return _this.map.data.overrideStyle(event.feature, _this.get("featureOptions.PROPERTYAREA.defaultOptions"));
        };
      }(this));
      return this.defaultLocation();
    },
    setupAutocomplete: function () {
      var _this, input, searchBox;
      _this = this;
      input = this.$('.search-field')[0];
      searchBox = new google.maps.places.SearchBox(input);
      this.map.addListener('bounds_changed', function () {
        return searchBox.setBounds(_this.map.getBounds());
      });
      input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          return e.preventDefault();
        }
      });
      input.addEventListener('keydown', function () {
        return _this.set('buttonDisabled', true);
      });
      return searchBox.addListener('places_changed', function () {
        var i, inputString, latLong, len, number, place;
        _this.set('buttonDisabled', true);
        _this.set('message', null);
        if (searchBox.getPlaces().length === 0) {
          alert('We could not find a location based on your search.');
          return;
        }
        place = searchBox.getPlaces()[0];
        if (!place.address_components) {
          inputString = input.value.replace(/\s/g, '');
          latLong = inputString.split(',');
          if (latLong.length !== 2) {
            return;
          }
          for (i = 0, len = latLong.length; i < len; i++) {
            number = latLong[i];
            if (isNaN(number) || number.length === 0) {
              return;
            }
          }
          place.geometry.location = new google.maps.LatLng(latLong[0], latLong[1]);
          return _this.findAddressForPlace(place.geometry.location.lat(), place.geometry.location.lng()).then(function (response) {
            _this.set('typedLatLng', new google.maps.LatLng(latLong[0], latLong[1]));
            response.geometry.location = _this.get('typedLatLng');
            return _this.dropPin(response);
          }, function (response) {
            alert('We could not find a location based on your search.');
          });
        } else {
          _this.set('typedLatLng', null);
          return _this.dropPin(place);
        }
      });
    },
    dropPin: function (place) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(this.DEFAULT_ZOOM);
      this.setAddress(place);
      return this.addMarker(this.map.getCenter(), false);
    },
    defaultLocation: function () {
      var lat_lng;
      this.map.setZoom(1);
      lat_lng = new google.maps.LatLng(37.2350, -115.8111);
      this.map.setCenter(lat_lng);
      return this.$('.search-field').attr('placeholder', 'Enter Location');
    },
    setAddress: function (place) {
      var address_components, city, name;
      this.set('buttonDisabled', false);
      this.set('model.location.longitude', place.geometry.location.lng());
      this.set('model.location.latitude', place.geometry.location.lat());
      name = place.formatted_address;
      if (place.name && !name.toLowerCase().startsWith(place.name.toLowerCase())) {
        name = place.name + ", " + name;
      }
      this.set('model.location.name', name);
      this.set('model.location.formatted_address', name);
      this.set('showInput', false);
      address_components = {};
      Ember.$.each(place.address_components, function (k, v1) {
        Ember.$.each(v1.types, function (k2, v2) {
          address_components[v2] = v1.long_name;
        });
      });
      if (address_components.street_number && address_components.route) {
        this.set('model.location.address', address_components.street_number + " " + address_components.route);
      } else if (address_components.route) {
        this.set('model.location.address', "" + address_components.route);
      } else {
        this.set('model.location.address', '');
      }
      if (city = address_components.locality || address_components.administrative_area_level_3 || address_components.neighborhood) {
        this.set('model.location.city', city);
      } else {
        this.set('model.location.city', '');
      }
      if (address_components.administrative_area_level_1) {
        this.set('model.location.state', address_components.administrative_area_level_1);
      } else {
        this.set('model.location.state', '');
      }
      if (address_components.country) {
        this.set('model.location.country', address_components.country);
      } else {
        this.set('model.location.country', '');
      }
      if (address_components.postal_code) {
        this.set('model.location.postal_code', address_components.postal_code);
      } else {
        this.set('model.location.postal_code', '');
      }
      return this.$('.search-field').attr('placeholder', 'Enter Location');
    },
    addMarker: function (position, draggable) {
      var animation, marker;
      if (draggable == null) {
        draggable = true;
      }
      this.markers.forEach(function (marker) {
        return marker.setMap(null);
      });
      this.markers.clear();
      animation = google.maps.Animation.DROP;
      marker = new google.maps.Marker({
        map: this.map,
        position: position,
        draggable: draggable,
        animation: animation,
        icon: {
          url: '/assets/images/property_pin.svg',
          scaledSize: new google.maps.Size(50, 80),
          origin: new google.maps.Point(0, 0)
        }
      });
      this.markers.push(marker);
      return marker;
    },
    findAddressForPlace: function (lat, lng) {
      return new Promise(function (resolve, reject) {
        var geocoder, lat_lng;
        lat_lng = new google.maps.LatLng(lat, lng);
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          'location': lat_lng
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results.length > 0) {
              return resolve(results[0]);
            } else {
              return reject('No results');
            }
          } else {
            return reject('geocoder is not reponding');
          }
        });
      });
    },
    fitAllFeatures: function () {
      var bounds;
      bounds = new google.maps.LatLngBounds();
      this.map.data.forEach(function (_this) {
        return function (feature) {
          return feature.getGeometry().forEachLatLng(function (latLng) {
            return bounds.extend(latLng);
          });
        };
      }(this));
      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }
      return bounds;
    },
    removeFeatures: function () {
      return this.map.data.forEach(function (_this) {
        return function (feature) {
          return _this.map.data.remove(feature);
        };
      }(this));
    },
    loadGeoJson: function (file) {
      var reader;
      reader = new FileReader();
      reader.onloadend = function (_this) {
        return function () {
          var bounds, geoJson, xml;
          try {
            xml = $.parseXML(reader.result);
            geoJson = toGeoJSON.kml(xml);
            _this.removeFeatures();
            geoJson.features[0].properties.type = 'Property Area';
            _this.set('model.location.properties', geoJson);
            _this.map.data.addGeoJson(geoJson);
            bounds = _this.fitAllFeatures();
            return _this.findAddressForPlace(bounds.getCenter().lat(), bounds.getCenter().lng()).then(function (response) {
              _this.addMarker(response.geometry.location, false);
              return _this.setAddress(response);
            }, function (response) {
              alert("We could not find an address based on lat and lng: " + lat + " " + lng);
            });
          } catch (error) {
            return alert("Failed to load this KML file.");
          }
        };
      }(this);
      if (file) {
        return reader.readAsBinaryString(file);
      }
    },
    actions: {
      create: function (model) {
        return this.sendAction('action', model);
      },
      add_geojson: function () {
        this.loadGeoJson(event.currentTarget.files[0]);
        return event.target.value = null;
      },
      toggleShowInput: function () {
        return this.set('showInput', !this.get('showInput'));
      }
    }
  });

  exports.default = MissionMapComponent;
});
define('admin/components/mission-plan-map-feature', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionPlanMapFeatureComponent;

  MissionPlanMapFeatureComponent = Ember.Component.extend({
    tagName: 'li',
    classNameBindings: ['featureStyle'],
    featureStyle: Ember.computed('feature.type', function () {
      return this.get('feature.type').dasherize();
    }),
    featureIcon: Ember.computed('feature.type', function () {
      switch (this.get('feature.type')) {
        case 'Property Area':
          return 'fa-object-ungroup';
        case 'Point of Interest':
          return 'fa-star';
        default:
          return 'fa-ban';
      }
    }),
    pointOfInterest: Ember.computed('feature.type', function () {
      return this.get('feature.type') === 'Point of Interest';
    }),
    areaAcres: Ember.computed('feature.area', function () {
      var acres;
      acres = Math.round(this.get('feature.area') * 0.0002471);
      if (acres < 1) {
        return "< 1 acre";
      } else if (acres === 1) {
        return acres + " acre";
      } else if (acres > 1) {
        return acres + " acres";
      } else {
        return null;
      }
    }),
    nameChanged: Ember.observer('feature.name', function () {
      return this.get('feature.object').setProperty('name', this.get('feature.name'));
    }),
    notesChanged: Ember.observer('feature.notes', function () {
      return this.get('feature.object').setProperty('notes', this.get('feature.notes'));
    }),
    addShot: function (id, name) {
      var _name;
      _name = Em.$.trim(name);
      return this.get('feature.shots').pushObject({
        id: id,
        name: _name
      });
    },
    removeShot: function (shot) {
      return this.get('feature.shots').removeObject(shot);
    },
    didInsertElement: function () {
      var _this;
      _this = this;
      this.get('feature.object').setProperty('shots', this.get('feature.shots'));
      return this.$('.map-list-item-title').on('click', function (event) {
        event.stopPropagation();
        return _this.$('.map-list-item').toggle();
      });
    }
  });

  exports.default = MissionPlanMapFeatureComponent;
});
define('admin/components/mission-plan-map', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionPlanMapComponent;

  MissionPlanMapComponent = Em.Component.extend({
    classNames: ['google-map'],
    sampleLink: false,
    undoObject: null,
    DEFAULT_ZOOM: 19,
    updateAction: Em.computed('action', function () {
      return this.get('action') === 'update';
    }),
    featureOptions: {
      PROPERTYAREA: {
        type: 'Property Area',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          strokeOpacity: 1,
          strokeColor: '#2e6da4',
          strokeWeight: 6,
          fillColor: '#2e6da4',
          fillOpacity: 0.7,
          editable: true,
          draggable: true,
          zIndex: 2
        }
      },
      NOFLYZONE: {
        type: 'No Fly Zone',
        geometry_type: 'Polygon',
        defaultOptions: {
          paths: null,
          strokeOpacity: 1,
          strokeColor: '#d43f3a',
          strokeWeight: 6,
          fillColor: '#d43f3a',
          fillOpacity: 0.7,
          editable: true,
          draggable: true,
          zIndex: 2
        }
      },
      POINTOFINTEREST: {
        type: 'Point of Interest',
        geometry_type: 'Point',
        defaultOptions: {
          paths: null,
          draggable: true,
          icon: '/assets/images/poi_icon.png',
          zIndex: 3
        }
      }
    },
    selectedFeatureOptions: {
      strokeOpacity: 1,
      strokeWeight: 6,
      fillOpacity: 0.7,
      editable: true,
      draggable: true,
      icon: '/assets/images/poi_icon_selected.png',
      zIndex: 2
    },
    disabledFeatureOptions: {
      strokeOpacity: 0.7,
      strokeWeight: 4,
      fillOpacity: 0.3,
      editable: false,
      draggable: false,
      icon: '/assets/images/poi_icon.png',
      zIndex: 1
    },
    location: Em.computed('model.mission.location.formatted_address', function () {
      return this.get('model.mission.location.formatted_address');
    }),
    noLocation: Em.computed('model.mission.location.formatted_address', function () {
      return !this.get('model.mission.location.formatted_address') || this.get('model.mission.location.formatted_address').length < 1;
    }),
    noProperty: Em.computed('model.features.[]', function () {
      return this.get('model.features').length < 1;
    }),
    noPointOfInterest: Em.computed('model.features.[]', function () {
      return !this.get('model.features').findBy('type', this.get('featureOptions.POINTOFINTEREST.type'));
    }),
    clientMapUrl: Em.computed('model.mission.id', function () {
      return _environment.default.clients.host + "/orders/" + this.get('model.mission.id') + "/edit";
    }),
    didInsertElement: function () {
      this.smallScreen = Em.$(window).width() <= 768;
      if (this.smallScreen) {
        Em.$('nav').hide();
        Em.$('.container-main').css('padding-top', '0');
      }
      Em.run.scheduleOnce('afterRender', this, function () {
        if (!(typeof google === 'object' && typeof google.maps === 'object')) {
          return Em.$.getScript('https://maps.googleapis.com/maps/api/js?v=3&signed_in=false&key=AIzaSyD4cDK8yKANxS8psneOCtUQ6WCQOR3boMw&libraries=places,drawing,geometry&callback=__emberGoogleMapLoaded__');
        } else {
          return this.initMap();
        }
      });
      return window.__emberGoogleMapLoaded__ = Em.run.bind(this, function () {
        return this.initMap();
      });
    },
    willDestroyElement: function () {
      Em.$('nav').show();
      return Em.$('.container-main').css('padding-top', '50px');
    },
    initMap: function () {
      var _this, options;
      _this = this;
      options = {
        zoom: this.DEFAULT_ZOOM,
        tilt: 0,
        mapTypeId: google.maps.MapTypeId['HYBRID'],
        mapTypeControl: false,
        streetViewControl: false,
        scaleControl: false,
        panControl: false,
        draggable: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        draggable: true,
        disableDoubleClickZoom: false
      };
      if (this.smallScreen) {
        options.zoomControl = false;
        options.disableDoubleClickZoom = true;
      }
      if (!this.map) {
        this.map = new google.maps.Map(document.getElementById('map_canvas'), options);
      }
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.$('#map_ui_container')[0]);
      this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.$('#small_device_controls_container')[0]);
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.$('#control_boundry_zoom')[0]);
      this.map.addListener('tilesloaded', function (event) {
        _this.$('#map_ui_container').show();
        _this.$('#control_boundry_zoom').show();
        return _this.$('#map_list_container').show();
      });
      this.map.addListener('click', function (event) {
        _this.infoWindow.close();
        return _this.disableFeatures();
      });
      this.Feature = Em.Object.extend({
        id: null,
        type: null,
        color: null,
        object: null,
        name: '',
        notes: '',
        area: null,
        center: null,
        shots: Em.A([])
      });
      this.map.data.addListener('addfeature', function (event) {
        var _shots;
        if (event.feature.getGeometry().getType() === 'Polygon') {
          _this.setGeometryData(event.feature);
        }
        _this.map.data.overrideStyle(event.feature, _this.get("featureOptions." + event.feature.getProperty('type').replace(/ /g, '').toUpperCase() + ".defaultOptions"));
        _shots = event.feature.getProperty('shots') || Em.A([]);
        return _this.get('model.features').pushObject(_this.Feature.create({
          id: event.feature.getId(),
          type: event.feature.getProperty('type'),
          color: event.feature.getProperty('color'),
          object: event.feature,
          area: event.feature.getProperty('area'),
          name: event.feature.getProperty('name'),
          notes: event.feature.getProperty('notes'),
          shots: _shots
        }));
      });
      this.map.data.addListener('setproperty', function (event) {
        var polygon;
        polygon = _this.get('model.features').findBy('object', event.feature);
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
      if (!this.get('updateAction')) {
        this.set('sampleLink', true);
      }
      this.markers = Em.A([]);
      this.setupInfoWindow();
      this.setupAutocomplete();
      return this.loadData();
    },
    setupInfoWindow: function () {
      var _this;
      _this = this;
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindowNode = Em.$('#info-window-node');
      return this.infoWindow.addListener('domready', function (event) {
        return _this.populateInfoWindow(this);
      });
    },
    setupAutocomplete: function () {
      var _this, input, searchBox;
      _this = this;
      input = this.$('.search-field')[0];
      searchBox = new google.maps.places.SearchBox(input);
      this.map.addListener('bounds_changed', function () {
        return searchBox.setBounds(_this.map.getBounds());
      });
      input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          return e.preventDefault();
        }
      });
      return searchBox.addListener('places_changed', function () {
        var place;
        _this.set('message', null);
        if (searchBox.getPlaces().length === 0) {
          alert('We could not find a location based on your search.');
          return;
        }
        place = searchBox.getPlaces()[0];
        if (!place.address_components) {
          return _this.findAddressForPlace(place).then(function (response) {
            return _this.dropPin(response);
          }, function (response) {
            alert('We could not find a location based on your search.');
          });
        } else {
          return _this.dropPin(place);
        }
      });
    },
    dropPin: function (place) {
      var _this;
      _this = this;
      return this.saveUndo().then(function () {
        _this.map.setCenter(place.geometry.location);
        _this.map.setZoom(_this.DEFAULT_ZOOM);
        _this.clearMap();
        _this.setAddress(place);
        _this.addMarker(_this.map.getCenter(), false);
        if (!_this.get('updateAction')) {
          return _this.set('sampleLink', true);
        }
      });
    },
    loadData: function () {
      var latLng;
      if (this.get('model.mission.location.latitude') && this.get('model.mission.location.longitude')) {
        latLng = new google.maps.LatLng({
          lat: Number(this.get('model.mission.location.latitude')),
          lng: Number(this.get('model.mission.location.longitude'))
        });
        this.map.setCenter(latLng);
        this.addMarker(this.map.getCenter(), false);
        if (this.get('model.mission.location.properties') && this.get('model.mission.location.properties.features') && this.get('model.mission.location.properties.features').length) {
          return this.addGeoJson(this.get('model.mission.location.properties'));
        }
      } else {
        return this.defaultLocation();
      }
    },
    clearMap: function () {
      var _this;
      _this = this;
      this.get('model.features').forEach(function (f) {
        return _this.map.data.remove(f.object);
      });
      this.get('model.features').clear();
      this.markers.forEach(function (marker) {
        return marker.setMap(null);
      });
      this.markers.clear();
      return this.infoWindow.close();
    },
    defaultLocation: function () {
      var lat_lng;
      this.clearMap();
      this.map.setZoom(3);
      lat_lng = new google.maps.LatLng(37.2350, -115.8111);
      this.map.setCenter(lat_lng);
      this.$('.search-field').attr('placeholder', 'Enter Location');
      return this.$('.search-field')[0].focus();
    },
    setAddress: function (place) {
      var address_components, city, name;
      this.set('model.mission.location.longitude', place.geometry.location.lng());
      this.set('model.mission.location.latitude', place.geometry.location.lat());
      name = place.formatted_address;
      if (place.name && !name.toLowerCase().startsWith(place.name.toLowerCase())) {
        name = place.name + ", " + name;
      }
      this.set('location', name);
      this.set('model.mission.location.name', name);
      this.set('model.mission.location.formatted_address', name);
      address_components = {};
      Em.$.each(place.address_components, function (k, v1) {
        Em.$.each(v1.types, function (k2, v2) {
          address_components[v2] = v1.long_name;
        });
      });
      if (address_components.street_number && address_components.route) {
        this.set('model.mission.location.address', address_components.street_number + " " + address_components.route);
      } else if (address_components.route) {
        this.set('model.mission.location.address', "" + address_components.route);
      } else {
        this.set('model.mission.location.address', '');
      }
      if (city = address_components.locality || address_components.administrative_area_level_3 || address_components.neighborhood) {
        this.set('model.mission.location.city', city);
      } else {
        this.set('model.mission.location.city', '');
      }
      if (address_components.administrative_area_level_1) {
        this.set('model.mission.location.state', address_components.administrative_area_level_1);
      } else {
        this.set('model.mission.location.state', '');
      }
      if (address_components.country) {
        this.set('model.mission.location.country', address_components.country);
      } else {
        this.set('model.mission.location.country', '');
      }
      if (address_components.postal_code) {
        this.set('model.mission.location.postal_code', address_components.postal_code);
      } else {
        this.set('model.mission.location.postal_code', '');
      }
      this.$('.search-field').attr('placeholder', 'Enter Location');
      return this.$('.search-field')[0].select();
    },
    findAddressForPlace: function (place) {
      return new Promise(function (resolve, reject) {
        var geocoder, lat_lng;
        lat_lng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          'location': lat_lng
        }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results.length > 0) {
              return resolve(results[0]);
            } else {
              return reject('No results');
            }
          } else {
            return reject('geocoder is not reponding');
          }
        });
      });
    },
    geoLocate: function () {
      var _this, errorGeoLocation, setGeoLocation;
      _this = this;
      this.$('.search-field').val('');
      this.$('.search-field').attr('placeholder', 'Locating...');
      setGeoLocation = function (position) {
        var geocoder, lat_lng;
        lat_lng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          'location': lat_lng
        }, function (results, status) {
          var place;
          if (status === google.maps.GeocoderStatus.OK) {
            place = results[0];
            if (place) {
              _this.clearMap();
              _this.setAddress(place);
              _this.map.setCenter(place.geometry.location);
              _this.map.setZoom(_this.DEFAULT_ZOOM);
              _this.addMarker(_this.map.getCenter(), false);
            } else {
              _this.defaultLocation();
            }
          } else {
            _this.defaultLocation();
          }
        });
      };
      errorGeoLocation = function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('In order to use this feature you need to enable location services for your browser.');
            _this.defaultLocation();
            break;
          case error.POSITION_UNAVAILABLE:
            _this.defaultLocation();
            break;
          case error.TIMEOUT:
            _this.defaultLocation();
            break;
          case error.UNKNOWN_ERROR:
            _this.defaultLocation();
        }
      };
      return navigator.geolocation.getCurrentPosition(setGeoLocation, errorGeoLocation);
    },
    addGeoJson: function (json) {
      var _this, features;
      _this = this;
      features = this.map.data.addGeoJson(json);
      return this.fitAllFeatures();
    },
    addFeature: function (feature) {
      var _this, f, feature_name, feature_object, i, id, lat, len, lng, point_object, polygonCoordinates, polygon_object, sortedFeatures;
      _this = this;
      id = this.get('model.features').length + 1;
      sortedFeatures = this.get('model.features').sort(function (a, b) {
        return a.get('id') > b.get('id');
      });
      for (i = 0, len = sortedFeatures.length; i < len; i++) {
        f = sortedFeatures[i];
        if (f.get('id') === id) {
          id++;
        }
      }
      feature_name = feature.type + " #" + (this.get('model.features').filterBy('type', feature.type).length + 1);
      if (feature.geometry_type === 'Polygon') {
        lat = this.map.center.lat();
        lng = this.map.center.lng();
        polygonCoordinates = [new google.maps.LatLng(lat + 0.0001, lng + 0.00012), new google.maps.LatLng(lat + 0.0001, lng - 0.00012), new google.maps.LatLng(lat - 0.0001, lng - 0.00012), new google.maps.LatLng(lat - 0.0001, lng + 0.00012)];
        polygon_object = new google.maps.Data.Polygon([polygonCoordinates]);
        feature_object = new google.maps.Data.Feature({
          geometry: polygon_object,
          id: id,
          properties: {
            type: feature.type,
            name: feature_name,
            notes: '',
            area: null,
            bounds: null,
            center: null,
            color: feature.color
          }
        });
      } else if (feature.geometry_type = 'Point') {
        point_object = new google.maps.Data.Point(this.map.getCenter());
        feature_object = new google.maps.Data.Feature({
          geometry: point_object,
          id: id,
          properties: {
            type: feature.type,
            name: feature_name,
            notes: '',
            color: feature.color,
            shots: Em.A([])
          }
        });
      }
      this.map.data.add(feature_object);
      return this.enableFeature(feature_object);
    },
    removeFeature: function (feature) {
      this.get('model.features').removeObject(feature);
      this.map.data.remove(feature.object);
      return this.infoWindow.close();
    },
    fitAllFeatures: function () {
      var bounds;
      bounds = new google.maps.LatLngBounds();
      this.get('model.features').forEach(function (feature) {
        if (feature.object.getGeometry().getType() === 'Polygon') {
          return feature.object.getGeometry().getArray().forEach(function (path) {
            return path.getArray().forEach(function (latLng) {
              return bounds.extend(latLng);
            });
          });
        } else if (feature.object.getGeometry().getType() === 'Point') {
          return bounds.extend(feature.object.getGeometry().get());
        }
      });
      return this.map.fitBounds(bounds);
    },
    setGeometryData: function (polygon) {
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
    enableFeature: function (feature) {
      var _this;
      _this = this;
      this.map.data.overrideStyle(feature, this.get('selectedFeatureOptions'));
      this.enableInfoWindow(feature);
      return this.get('model.features').forEach(function (f) {
        if (feature.getId() !== f.id) {
          return _this.map.data.overrideStyle(f.object, _this.get('disabledFeatureOptions'));
        }
      });
    },
    disableFeatures: function () {
      var _this;
      _this = this;
      this.infoWindow.close();
      return this.get('model.features').forEach(function (f) {
        return _this.map.data.overrideStyle(f.object, _this.get('disabledFeatureOptions'));
      });
    },
    addMarker: function (position, draggable) {
      var animation, marker;
      if (draggable == null) {
        draggable = true;
      }
      animation = google.maps.Animation.DROP;
      marker = new google.maps.Marker({
        map: this.map,
        icon: '/assets/images/mission_icon.png',
        position: position,
        draggable: draggable,
        animation: animation
      });
      this.markers.push(marker);
      return marker;
    },
    populateInfoWindow: function (target) {
      var _this, contentArr;
      _this = this;
      contentArr = target.content.split('||');
      this.infoWindowNode.html("<strong>" + contentArr[1] + "</strong><br> <textarea id=" + contentArr[0] + " placeholder='Details' rows='3'>" + contentArr[2] + "</textarea><br> <p class='small pull-left'>" + contentArr[3] + "</p> <p class='shots small pull-left'>" + contentArr[4] + "</p> <button id=" + contentArr[0] + " class='btn btn-xs btn-danger pull-right'>delete</button>");
      this.infoWindowNode.contents('button').click(function (event) {
        var f;
        f = _this.get('model.features').findBy('id', Number(event.target.id));
        if (window.confirm('Are you sure?')) {
          return _this.removeFeature(f);
        }
      });
      this.infoWindowNode.focusout(function (event) {
        var f;
        if (f = _this.map.data.getFeatureById(event.target.id)) {
          return f.setProperty('notes', event.target.value);
        }
      });
      target.set('content', this.infoWindowNode[0]);
      if (this.infoWindowNode.children('textarea')[0].value === '') {
        return this.infoWindowNode.children('textarea')[0].focus();
      }
    },
    enableInfoWindow: function (feature) {
      var content, position;
      content = feature.getId() + "||" + feature.getProperty('name') + "||" + feature.getProperty('notes') + "||" + this.formatAcres(feature.getProperty('area')) + "||" + this.listShots(feature.getProperty('shots'));
      if (feature.getGeometry().getType() === 'Polygon') {
        position = feature.getGeometry().getAt(0).getAt(0);
        this.infoWindow.setOptions({
          content: content,
          position: position,
          pixelOffset: new google.maps.Size(0, 0)
        });
      } else {
        position = feature.getGeometry().get();
        this.infoWindow.setOptions({
          content: content,
          position: position,
          pixelOffset: new google.maps.Size(0, -30)
        });
      }
      return this.infoWindow.open(this.map);
    },
    saveUndo: function () {
      var _this;
      _this = this;
      return new Em.RSVP.Promise(function (resolve, reject) {
        _this.set('undoObject', _this.get('model.mission.location').toJSON());
        return _this.map.data.toGeoJson(function (json) {
          var elem;
          _this.set('undoObject.properties', json);
          elem = _this.$('.map-search-undo');
          elem.stop().data('timer');
          elem.show(function () {
            $.data(this, 'timer', setTimeout(function () {
              elem.fadeOut(1000);
            }, 10000));
          });
          return resolve(true);
        });
      });
    },
    formatAcres: function (area) {
      var acres;
      acres = Math.round(area * 0.0002471);
      if (acres < 1) {
        return "< 1 acre";
      } else if (acres === 1) {
        return acres + " acre";
      } else if (acres > 1) {
        return acres + " acres";
      } else {
        return '';
      }
    },
    listShots: function (shots) {
      if (shots) {
        return shots.mapBy('name');
      } else {
        return '';
      }
    },
    actions: {
      add_property: function () {
        return this.addFeature(this.get('featureOptions.PROPERTYAREA'));
      },
      add_no_fly_zone: function () {
        return this.addFeature(this.get('featureOptions.NOFLYZONE'));
      },
      add_point_of_interest: function () {
        return this.addFeature(this.get('featureOptions.POINTOFINTEREST'));
      },
      add_sample_mission: function () {
        var _this;
        _this = this;
        this.set('sampleLink', false);
        return this.saveUndo().then(function () {
          _this.clearMap();
          _this.set('location', 'Apple, Infinite Loop, Cupertino, CA, United States');
          _this.set('model.mission.location.formatted_address', 'Apple, Infinite Loop, Cupertino, CA, United States');
          return _this.addGeoJson(_this.get('model.sample_mission'));
        });
      },
      remove_feature: function (feature) {
        return this.remove_feature(feature);
      },
      geo_locate: function () {
        var _this;
        _this = this;
        return this.saveUndo().then(function () {
          return _this.geoLocate();
        });
      },
      boundry_zoom: function () {
        return this.fitAllFeatures();
      },
      toggle_tabs: function (show, hide) {
        Em.$('.tab').removeClass('selected');
        Em.$(event.target).addClass('selected');
        Em.$(hide).hide();
        return Em.$(show).show();
      },
      undo_search: function () {
        var _this;
        _this = this;
        if (this.get('undoObject')) {
          this.clearMap();
          if (!this.get('updateAction')) {
            this.set('sampleLink', true);
          }
          if (this.get('undoObject.properties').features[0]) {
            this.addGeoJson(this.get('undoObject.properties'));
          } else {
            this.defaultLocation();
          }
          this.get('model.mission.location').eachAttribute(function (attr) {
            if (attr !== 'properties') {
              return _this.get('model.mission.location').set("" + attr, _this.get("undoObject." + attr));
            }
          });
          this.set('undoObject', null);
          return this.set('location', this.get('model.mission.location.formatted_address'));
        }
      },
      "continue": function () {
        var _this;
        _this = this;
        return this.map.data.toGeoJson(function (json) {
          _this.set('model.mission.location.properties', json);
          return _this.sendAction('action');
        });
      },
      update: function () {
        var _this;
        _this = this;
        return this.map.data.toGeoJson(function (json) {
          _this.set('model.mission.location.properties', json);
          return _this.sendAction('action', _this.get('model'));
        });
      }
    }
  });

  exports.default = MissionPlanMapComponent;
});
define('admin/components/mission-plan-shot-select', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SelectShotComponent;

  SelectShotComponent = Ember.Component.extend({
    content: null,
    prompt: null,
    optionValuePath: 'value',
    optionLabelPath: 'label',
    action: Ember.K,
    classNames: ['form-group'],
    selectClass: 'form-control',
    value: null,
    init: function (attrs) {
      this._super(attrs);
      if (!this.get('content')) {
        return this.set('content', []);
      }
    },
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        return this.$('select').val(this.get('value'));
      });
    },
    actions: {
      updateValue: function () {
        if (this.value) {
          return this.parentView.updateShot(this.$('select').val(), this.$('select option:selected').text());
        } else {
          this.parentView.addShot(this.$('select').val(), this.$('select option:selected').text());
          return this.$('select').val(null);
        }
      }
    }
  });

  exports.default = SelectShotComponent;
});
define('admin/components/mission-plan-shot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionPlanShotComponent;

  MissionPlanShotComponent = Ember.Component.extend({
    updateShot: function (id, name) {
      var _name;
      _name = Em.$.trim(name);
      this.set('shot.name', _name);
      return this.set('shot.id', id);
    },
    actions: {
      remove_shot: function (shot) {
        return this.parentView.removeShot(shot);
      }
    }
  });

  exports.default = MissionPlanShotComponent;
});
define('admin/components/mission-schedule', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    notScheduled: Ember.computed('selectedStart', 'selectedEnd', function () {
      return !this.get('selectedStart') || !this.get('selectedEnd');
    }),
    scheduleErrorObserver: Ember.observer('selectedStart', 'selectedEnd', function () {
      if (this.get('scheduleError')) {
        this.set('scheduleError', false);
      }
    }),
    actions: {
      saveSchedule: function () {
        var data = {
          'mission_scheduled_at_start': this.get('selectedStart'),
          'mission_scheduled_at_end': this.get('selectedEnd')
        };
        return this.sendAction('saveAction', data);
      },
      clearSchedule: function () {
        this.set('model.mission.admin_scheduled', false);
        this.set('model.mission.scheduled_at_start', null);
        this.set('model.mission.scheduled_at_end', null);
        return this.get('model.mission').save();
      },
      rescheduleFlight: function () {
        return this.sendAction('rescheduleFlightModal');
      },
      chooseSchedule: function () {
        var _this = this;
        Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + this.get('model.mission').id + "/capacity_estimations",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers')
        }).then(function (response) {
          return _this.sendAction('showCapacityModal', response.data.attributes.availability_slots);
        }, function (error) {
          if (error.errors) {
            var message = error.errors[0].detail;
            _this.set('scheduleError', message);
            return alert(message);
          }
        });
      }
    }
  });
});
define('admin/components/mission-shotlist-assets', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShotlistAssetsComponent;

  MissionShotlistAssetsComponent = Ember.Component.extend({
    actions: {
      addAsset: function (file, shot_id) {
        return this.sendAction('onfileadd', file, shot_id);
      },
      startUpload: function (uploader) {
        return this.sendAction('onstartupload', uploader);
      },
      shareShareable: function (shareable, deferred) {
        return this.sendAction('shareCreateAction', shareable, deferred);
      },
      filterByShot: function (shot) {
        return this.sendAction('filterByShot', shot);
      },
      viewAsset: function (asset) {
        return asset.set('viewing', true);
      },
      regenerateZip: function (mission) {
        return mission.regenerateZip();
      }
    }
  });

  exports.default = MissionShotlistAssetsComponent;
});
define('admin/components/mission-shotlist-shot-assets', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShotlistShotAssetsComponent;

  MissionShotlistShotAssetsComponent = Ember.Component.extend({
    classNames: ['panel panel-default'],
    galleryImages: Ember.computed('shot.images.@each.source_type', function () {
      var _this;
      _this = this;
      return this.get('shot.images').map(function (image) {
        if (!image.get('processing')) {
          return _this.buildGalleryImages(image);
        }
      }).sortBy('record.source_type', 'record.id:desc');
    }),
    buildGalleryImages: function (image) {
      return {
        src: image.get('version_urls.medium_1024'),
        msrc: image.get('version_urls.small_640'),
        w: 1024,
        h: image.get('height') / image.get('width') * 1024,
        title: image.get('name'),
        record: image
      };
    },
    galleryOptions: {
      hideShare: true
    },
    imagesProcessing: Ember.computed('shot.images.@each.processing', function () {
      return this.get('shot.images').filterBy('processing');
    }),
    actions: {
      promoteAll: function () {
        return this.get('shot').promoteAssets().then(function (_this) {
          return function (response) {
            _this.get('shot.mission').loadImages();
            _this.get('shot.mission').loadVideos();
            return _this.get('shot.mission').loadPanoramas();
          };
        }(this));
      },
      downloadShotArchive: function () {
        return this.get('shot').downloadImages().then(function (response) {
          return alert("The zip file is now generating, and will be sent to your email");
        });
      },
      addAsset: function (file) {
        return this.sendAction('onfileadd', file, this.get('shot.id'));
      },
      startUpload: function (uploader) {
        return this.sendAction('onstartupload', uploader);
      },
      selectedShot: function (shot) {
        return this.sendAction('selectedShot', shot);
      },
      downloadAsset: function (asset_url) {
        return window.location = asset_url;
      },
      editPanorama: function (panorama) {
        return window.open(_environment.default.panoEditor.host + "/p/" + panorama.get('accessKey') + "/edit");
      },
      deleteAsset: function (asset, proxyAsset) {
        var _this;
        if (asset && window.confirm('Are you sure? This will permanently remove this asset.')) {
          _this = this;
          return asset.destroyRecord().then(function (response) {
            if (proxyAsset) {
              return _this.get('galleryImages').removeObject(proxyAsset);
            }
          }, function (response) {
            return alert('There was an issue deleting this asset');
          });
        }
      },
      toggleSourceType: function (asset) {
        if (asset.get('source_type') === 'raw') {
          asset.set('source_type', 'edit');
        } else {
          asset.set('source_type', 'raw');
        }
        return asset.save().then(function (response) {}, function (response) {
          if (asset.get('source_type') === 'raw') {
            asset.set('source_type', 'edit');
          } else {
            asset.set('source_type', 'raw');
          }
          return alert("There was an error updating asset " + asset.get('id'));
        });
      },
      viewAsset: function (asset) {
        return asset.set('viewing', true);
      },
      shareShareable: function (shareable, deferred) {
        return this.sendAction('shareCreateAction', shareable, deferred);
      }
    }
  });

  exports.default = MissionShotlistShotAssetsComponent;
});
define('admin/components/mission-shotlist-shot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShotlistShotComponent;

  MissionShotlistShotComponent = Ember.Component.extend({
    tagName: 'li',
    actions: {
      update: function (model) {
        var _this;
        _this = this;
        return model.save();
      },
      remove: function (model) {
        var _this;
        _this = this;
        model.deleteRecord();
        return model.save();
      }
    }
  });

  exports.default = MissionShotlistShotComponent;
});
define('admin/components/mission-shotlist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShotListComponent;

  MissionShotListComponent = Ember.Component.extend({
    saveTemplateButton: 'Save As Template',
    reverseList: Ember.computed('model.mission.shots.[]', function () {
      return this.get('model.mission.shots').toArray().reverse();
    }),
    templateLink: null,
    templateForm: null,
    addShot: function (shot_type) {
      var _this;
      _this = this;
      this.get('model.mission.shots').createRecord({
        shot_type: shot_type
      });
      return this.get('model.mission.shots').save();
    },
    didInsertElement: function () {
      var _this;
      this.templateLink = Em.$('.template-link');
      this.templateForm = Em.$('.template-form');
      _this = this;
      return this.templateLink.on('click', function (e) {
        e.preventDefault();
        _this.templateLink.fadeOut(200);
        return _this.templateForm.delay(200).fadeIn(200);
      });
    },
    actions: {
      choose_template: function (template) {
        var _this;
        if (window.confirm('Are you sure you want to clear current shot list?')) {
          _this = this;
          this.get('model.mission.shots').forEach(function (shot) {
            return shot.deleteRecord();
          });
          return this.get('model.mission.shots').save().then(function (result) {
            var i, saveShots;
            i = 0;
            saveShots = function (template) {
              var _shot, _template_shot;
              _template_shot = template.get('shots').objectAt(i);
              _shot = _this.get('model.mission.shots').createRecord({
                shot_type: _template_shot.get('shot_type'),
                instructions: _template_shot.get('instructions')
              });
              return _shot.save().then(function () {
                i++;
                if (template.get('shots').objectAt(i)) {
                  return saveShots(template);
                }
              });
            };
            saveShots(template);
            return _this.set('saveTemplateButton', 'Save As Template');
          });
        }
      },
      save_template: function () {
        var _this;
        _this = this;
        this.set('saveTemplateButton', 'Saving...');
        this.get('model.template').set('shot_ids', this.get('model.mission.shots').mapBy('id'));
        return this.get('model.template').save().then(function (response) {
          _this.set('saveTemplateButton', 'Saved!');
          return _this.templateForm.delay(2000).fadeOut(1000);
        });
      },
      add_shot: function (shot) {
        return this.addShot(shot);
      }
    }
  });

  exports.default = MissionShotListComponent;
});
define('admin/components/mission-status-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionStatusFilterComponent;

  MissionStatusFilterComponent = Ember.Component.extend({
    classNames: ["mission-status-filter"],
    missionStatuses: [{
      value: 'created',
      name: 'Created'
    }, {
      value: 'confirmed',
      name: 'Confirmed'
    }, {
      value: 'pilots_notified',
      name: 'Pilots Notified'
    }, {
      value: 'pilot_accepted',
      name: 'Pilot Accepted'
    }, {
      value: 'flight_complete',
      name: 'Flight Complete'
    }, {
      value: 'assets_uploaded',
      name: 'Assets Uploaded'
    }, {
      value: 'assets_classified',
      name: 'Assets Classified'
    }, {
      value: 'in_production',
      name: 'In Production'
    }, {
      value: 'awaiting_payment',
      name: 'Awaiting Payment'
    }, {
      value: 'invoice_needed',
      name: 'Invoice Needed'
    }, {
      value: 'invoiced',
      name: 'Invoiced'
    }, {
      value: 'complete',
      name: 'Complete'
    }, {
      value: 'canceled',
      name: 'Canceled',
      separator: true
    }, {
      value: 'rejected',
      name: 'Rejected'
    }, {
      value: 'unfulfilled',
      name: 'Unfulfilled'
    }],
    didInsertElement: function () {
      var i, len, ref, results, status;
      if (this.get('selectedStatus')) {
        ref = this.get('selectedStatus').split(',');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          status = ref[i];
          results.push(this.$("input:checkbox[data-status='" + status + "']").prop('checked', true));
        }
        return results;
      }
    },
    actions: {
      updateMissionStatuses: function () {
        var statuses;
        statuses = [];
        this.$('input:checkbox').each(function (index, checkbox) {
          if (checkbox.checked) {
            return statuses.push(checkbox.value);
          }
        });
        return this.set('selectedStatus', statuses.join());
      },
      clearMissionStatuses: function () {
        this.set('selectedStatus', null);
        return this.$("input:checkbox").prop('checked', false);
      }
    }
  });

  exports.default = MissionStatusFilterComponent;
});
define('admin/components/mission-status-rewind-button', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionStatusRewindButtonComponent;

  MissionStatusRewindButtonComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    headers: {},
    tagName: 'button',
    type: 'submit',
    classNameBindings: ['isHidden:hide'],
    isHidden: false,
    isSendingRequest: false,
    statusObserver: Em.observer('model.status', function () {
      switch (this.get('model.status')) {
        case 'confirmed':
          this.set('isHidden', false);
          return this.set('name', 'previous step');
        default:
          return this.set('isHidden', true);
      }
    }),
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        var _this;
        this.notifyPropertyChange('model.status');
        _this = this;
        return _this.get('session').authorize('authorizer:devise', function (headerName, headerValue) {
          var hash;
          hash = _this.get('headers');
          hash[headerName] = headerValue;
          return _this.set('headers', hash);
        });
      });
    },
    click: function (e) {
      var _model, _this, confirm, headers;
      e.preventDefault();
      e.stopPropagation();
      if (this.get('model').get('isOnHold')) {
        return;
      }
      confirm = this.get('isSendingRequest') ? false : window.confirm("Are you sure you want to change the status?");
      if (confirm) {
        _this = this;
        _model = this.get('model');
        headers = this.get('headers');
        _this.set('isSendingRequest', true);
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + _model.id + "/status?rewind=true",
          type: 'PATCH',
          dataType: 'json',
          headers: headers
        }).then(function (response) {
          _model.reload();
          return _this.set('isSendingRequest', false);
        }, function (response) {
          return _this.set('isSendingRequest', false);
        });
      }
    }
  });

  exports.default = MissionStatusRewindButtonComponent;
});
define('admin/components/mission-status-update-button', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionStatusUpdateButtonComponent;

  MissionStatusUpdateButtonComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    headers: {},
    tagName: 'button',
    type: 'submit',
    classNameBindings: ['isHidden:hide'],
    isHidden: false,
    isSendingRequest: false,
    confirmAndAutoDispatchButton: Em.computed('model.pilot_invitations_dispatch', 'model.package.auto_dispatch_enabled', 'model.isReshoot', function () {
      return this.get('model.package.auto_dispatch_enabled') && this.get('model.pilot_invitations_dispatch') === null && !this.get('model.isReshoot');
    }),
    statusDisabledTooltip: Em.computed('model.ready_for_auto_dispatch', 'model.status', function () {
      if (!this.get('model.ready_for_auto_dispatch') && this.get('model.status') === 'created' && this.get('confirmAndAutoDispatchButton')) {
        return 'You must set an account rep and estimated pilot payout before proceeding. Please check below';
      }
    }),
    statusObserver: Em.observer('model.status', function () {
      switch (this.get('model.status')) {
        case 'created':
        case 'canceled':
        case 'confirmed':
        case 'pilot_accepted':
        case 'flight_complete':
        case 'assets_uploaded':
        case 'assets_classified':
        case 'in_production':
        case 'awaiting_payment':
        case 'invoice_needed':
        case 'invoiced':
          this.set('isHidden', false);
          return this.set('name', 'next step');
        default:
          return this.set('isHidden', true);
      }
    }),
    nextStatus: Ember.computed('model.status', 'model.client.invoiceable', function () {
      switch (this.get('model.status')) {
        case 'created':
          if (this.get('confirmAndAutoDispatchButton')) {
            return 'confirm and auto-dispatch';
          } else {
            return 'confirmed';
          }
          break;
        case 'pilot_accepted':
          return 'Flight Complete';
        case 'flight_complete':
          return 'Assets Uploaded';
        case 'assets_uploaded':
          return 'Assets Classified';
        case 'assets_classified':
          return 'In Production';
        case 'in_production':
          if (this.get('model.client.invoiceable')) {
            return 'Invoice Needed';
          } else {
            return 'Awaiting Payment';
          }
          break;
        case 'invoice_needed':
          return 'Invoiced';
        case 'invoiced':
          return 'Complete';
        case 'awaiting_payment':
          return 'Complete';
        case 'canceled':
          return 'confirmed';
      }
    }),
    didInsertElement: function () {
      return Ember.run.schedule('afterRender', this, function () {
        var _this;
        this.notifyPropertyChange('model.status');
        _this = this;
        return _this.get('session').authorize('authorizer:devise', function (headerName, headerValue) {
          var hash;
          hash = _this.get('headers');
          hash[headerName] = headerValue;
          return _this.set('headers', hash);
        });
      });
    },
    click: function (e) {
      var _model, _this, confirm, headers;
      e.preventDefault();
      e.stopPropagation();
      if (this.get('model').get('isOnHold') || this.get('statusDisabledTooltip')) {
        return;
      }
      confirm = this.get('isSendingRequest') ? false : window.confirm("Are you sure you want to change the status?");
      if (confirm) {
        _this = this;
        _model = this.get('model');
        headers = this.get('headers');
        _this.set('isSendingRequest', true);
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + _model.id + "/status",
          type: 'PATCH',
          dataType: 'json',
          headers: headers
        }).then(function (response) {
          _model.reload();
          return _this.set('isSendingRequest', false);
        }, function (response) {
          var errors;
          errors = "";
          response.responseJSON.errors.forEach(function (_this) {
            return function (e) {
              return errors = errors + e.detail + "\n";
            };
          }(this));
          alert(errors);
          return _this.set('isSendingRequest', false);
        });
      }
    }
  });

  exports.default = MissionStatusUpdateButtonComponent;
});
define('admin/components/mission-weather-forecast', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionWeatherForecastComponent;

  MissionWeatherForecastComponent = Ember.Component.extend({
    classNames: 'd-inline-block forecast',
    time: null,
    icon: null,
    temperature: null,
    precipProbability: null,
    cloudCover: null,
    windSpeed: null
  });

  exports.default = MissionWeatherForecastComponent;
});
define('admin/components/mission-weather', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionWeatherComponent;

  MissionWeatherComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    headers: {},
    classNames: '',
    startIndex: Ember.computed('forecasts', 'forecasts.[]', function () {
      return this.get('forecasts').findIndex(function (_this) {
        return function (el) {
          var missionStart, time;
          time = new Date(el.forecast[0].time * 1000);
          missionStart = new Date(_this.get('mission.scheduled_at_start'));
          return time.getDay() === missionStart.getDay() && time.getMonth() === missionStart.getMonth() && time.getFullYear() === missionStart.getFullYear();
        };
      }(this));
    }),
    showArrows: Ember.computed('forecasts', 'forecasts.[]', function () {
      var length;
      length = this.get('forecasts.length');
      return length > 1;
    }),
    endIndex: Ember.computed('forecasts', 'forecasts.[]', function () {
      return this.get('forecasts.length') - 1;
    }),
    didInsertElement: function () {
      return Ember.run.scheduleOnce('afterRender', this, function () {
        return this.missionForecast();
      });
    },
    missionForecast: function () {
      return Ember.$.ajax({
        url: _environment.default.api.host + "/v1/admin/missions/" + this.get('mission.id') + "/weather",
        headers: this.get('sessionAccount.headers'),
        type: 'GET',
        dataType: 'json'
      }).then(function (_this) {
        return function (response) {
          return _this.set('forecasts', response);
        };
      }(this), function (_this) {
        return function (response) {
          console.log('error getting weather data');
          return console.log(response);
        };
      }(this));
    }
  });

  exports.default = MissionWeatherComponent;
});
define('admin/components/modal-dialog-custom', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ModalDialogCustomComponent;

  ModalDialogCustomComponent = Ember.Component.extend({
    didInsertElement: function () {
      window.scrollTo(0, 0);
      return Ember.$('body').css('overflow', 'hidden');
    },
    willDestroyElement: function () {
      return Ember.$('body').css('overflow', 'visible');
    },
    actions: {
      close: function () {
        return this.sendAction();
      }
    }
  });

  exports.default = ModalDialogCustomComponent;
});
define('admin/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _modalDialogOverlay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _modalDialogOverlay.default;
    }
  });
});
define('admin/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _modalDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _modalDialog.default;
    }
  });
});
define('admin/components/onboarding/badge-modal', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    selectedPilots: [],
    badges: [],
    selectedAllPilots: false,
    totalCount: null,
    lat: null,
    lon: null,
    distance: null,
    droneIds: null,
    cameraIds: null,
    deviceIds: null,
    licenseIds: null,
    sendInvites: function () {
      var _this = this;
      if (this.get('selectedAllPilots')) {
        var requestData = {
          lat: this.get('lat'),
          lon: this.get('lon'),
          distance: this.get('distance'),
          drone_ids: this.get('droneIds'),
          camera_ids: this.get('cameraIds'),
          device_ids: this.get('deviceIds'),
          license_ids: this.get('licenseIds'),
          onboarding: this.get('selectedBadge.has_requirements')
        };
      } else {
        var requestData = {
          pilot_ids: this.get('selectedPilots').map(function (pilot) {
            return pilot.get('id');
          }),
          onboarding: this.get('selectedBadge.has_requirements')
        };
      }
      Ember.$.ajax({
        url: _environment.default.api.host + '/v1/admin/badges/' + this.get('selectedBadge').id + '/pilot_badges',
        headers: this.get('sessionAccount.headers'),
        type: 'POST',
        dataType: 'json',
        data: requestData
      }).then(function (response) {
        if (_this.get('selectedAllPilots')) {
          _this.set('successMessage', _this.get('totalCount') + ' pilot(s) will be invited.');
        } else {
          _this.set('successMessage', "You've invited " + response.data.length + ' pilot(s)');
          if (response.data.length != _this.get('selectedPilots').length) {
            let alreadyHaveCount = _this.get('selectedPilots').length - response.data.length;
            _this.set('successSubMessage', alreadyHaveCount + " pilots were previously invited to earn this badge.");
          }
        }
        _this.get('resetPilotSelection')();
      });
    },
    actions: {
      close() {
        this.get('close')();
      },
      invitePilots() {
        this.set('inviteConfirmation', true);
      },
      confirmInvitePilots() {
        this.sendInvites();
      },
      cancelInvitePilots() {
        if (this.get('inviteConfirmation')) {
          this.set('inviteConfirmation', false);
        } else {
          this.get('close')();
        }
      }
    }
  });
});
define('admin/components/onboarding/filter-pilots', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    panelMode: null,
    panelTitle: null,
    status: null,
    lat: null,
    lon: null,
    distance: null,
    selectedDrones: null,
    selectedCameras: null,
    selectedDevices: null,
    selectedLicenses: null,
    selectedBadges: null,
    selectPilotBadgeStatuses: null,
    statuses: null,
    locationTitle: Ember.computed('', function () {
      return 'Location';
    }),
    licenseTitle: Ember.computed('selectedLicenses.[]', function () {
      return 'Licenses (' + this.get('selectedLicenses.length') + ')';
    }),
    setPanel(mode, title) {
      this.set('panelMode', mode);
      this.set('panelTitle', title);
    },
    actions: {
      setPanel(mode, title) {
        this.setPanel(mode, title);
      },
      toggleFilter() {
        this.get('toggleFilter')();
      },
      cacheObjects(key, value) {
        this.set(key, value);
      }
    }
  });
});
define('admin/components/onboarding/pilot-badge-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    selectedBadges: null,
    badgeTitle: null,
    badges: [],
    badgeStatuses: [],
    pilotBadgeBadgeIds: [],
    pilotBadgeStatusIds: [],
    selectedPilotBadgeStatuses: [],
    pilotBadgeStatuses: [],
    selectPilotBadgeStatuses: [],

    didInsertElement() {
      const _this = this;
      if (this.get('badges.length') === undefined || this.get('badges.length') == 0) {
        this.store.query('badge', {}).then(function (data) {
          _this.set('badges', data.toArray());
          _this.sendAction('cacheObjects', 'badges', data.toArray());

          _this.get('badges').forEach(function (badge) {
            if (_this.get('pilotBadgeBadgeIds').includes(badge.get('id'))) {
              _this.get('selectedBadges').pushObject(badge);
            }
          });
        });
      }
    },

    disableBadgeStatuses: Ember.computed('selectedBadges.length', function () {
      return this.get('selectedBadges.length') <= 0 || this.get('pilotWithoutBadges');
    }),

    badgeTitle: Ember.computed('selectedBadges.length', function () {
      return 'Badges (' + this.get('selectedBadges.length') + ')';
    }),

    isNoBadgeChecked: Ember.computed('pilotWithoutBadges', function () {
      this.get('pilotWithoutBadges');
    }),

    selectedBadgesObserver: Ember.observer('selectedBadges', function () {
      if (this.get('selectedBadges.length') > 0) {
        this.set('pilotWithoutBadges', false);
      } else {
        this.set('selectPilotBadgeStatuses', []);
      }
    }),

    actions: {
      toggleNoBadge() {
        this.set('pilotWithoutBadges', !this.get('pilotWithoutBadges'));
        if (this.get('pilotWithoutBadges')) {
          this.set('selectedBadges', []);
          this.set('selectPilotBadgeStatuses', []);
        }
      },

      toggleInclude() {
        this.set('pilotBadgeInclude', !this.get('pilotBadgeInclude'));
      }
    }
  });
});
define('admin/components/onboarding/pilot-device-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    totalSelectedCount: Ember.computed('selectedDevices.[]', function () {
      return this.get('selectedDevices.length');
    }),
    didInsertElement() {
      const _this = this;
      if (this.get('devices.length') === undefined) {
        this.store.query('device', {}).then(function (data) {
          _this.set('devices', data.toArray());
          _this.sendAction('cacheObjects', 'devices', data.toArray());

          _this.get('devices').forEach(function (device) {
            if (_this.get('deviceIds').includes(device.get('id'))) {
              _this.get('selectedDevices').pushObject(device);
            }
          });
        });
      }
    },
    actions: {
      clear() {
        this.set('selectedDevices', []);
        this.set('deviceIds', []);
      },
      setPanel() {
        this.sendAction('setPanel', null, null);
      }
    }
  });
});
define('admin/components/onboarding/pilot-drone-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    totalSelectedCount: Ember.computed('selectedDrones.[]', 'selectedCameras.[]', function () {
      return this.get('selectedDrones.length') + this.get('selectedCameras.length');
    }),
    didInsertElement() {
      const _this = this;
      if (this.get('drones.length') === undefined) {
        this.store.query('drone', {}).then(function (data) {
          _this.set('drones', data.toArray());
          _this.sendAction('cacheObjects', 'drones', data.toArray());

          _this.get('drones').forEach(function (drone) {
            if (_this.get('droneIds').includes(drone.get('id'))) {
              _this.get('selectedDrones').pushObject(drone);
            }
          });
        });
      }

      if (this.get('cameras.length') === undefined) {
        this.store.query('drone-camera', {}).then(function (data) {
          _this.set('cameras', data.toArray());
          _this.sendAction('cacheObjects', 'cameras', data.toArray());

          _this.get('cameras').forEach(function (drone) {
            if (_this.get('cameraIds').includes(drone.get('id'))) {
              _this.get('selectedCameras').pushObject(drone);
            }
          });
        });
      }
    },
    actions: {
      clear() {
        this.set('selectedDrones', []);
        this.set('droneIds', []);
        this.set('selectedCameras', []);
        this.set('cameraIds', []);
      },
      setPanel() {
        this.sendAction('setPanel', null, null);
      }
    }
  });
});
define('admin/components/onboarding/pilot-license-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    totalSelectedCount: Ember.computed('selectedLicenses.[]', function () {
      return this.get('selectedLicenses.length');
    }),
    didInsertElement() {
      const _this = this;
      if (this.get('licenses.length') === undefined) {
        this.store.query('license', {}).then(function (data) {
          _this.set('licenses', data.toArray());
          _this.sendAction('cacheObjects', 'licenses', data.toArray());

          _this.get('licenses').forEach(function (license) {
            if (_this.get('licenseIds').includes(license.get('id'))) {
              _this.get('selectedLicenses').pushObject(license);
            }
          });
        });
      }
    },
    actions: {
      clear() {
        this.set('selectedLicenses', []);
        this.set('licenseIds', []);
      },
      setPanel() {
        this.sendAction('setPanel', null, null);
      }
    }
  });
});
define('admin/components/onboarding/pilot-location-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service(),
    didInsertElement() {
      this.setupAutocomplete();
    },
    clearLocationSearch() {
      this.setProperties({
        distanceFilter: false,
        lat: null,
        lon: null,
        distance: null
      });
    },
    setupAutocomplete() {
      const input = document.getElementById('locationSearch');
      if (input) {
        if (!input.value) {
          // in case we load in a link with a query location in the url
          this.clearLocationSearch();
        }
        const _this = this;
        input.addEventListener('change', function (event) {
          if (event.target.value === '') {
            _this.clearLocationSearch();
          }
        });
        const autocomplete = new google.maps.places.SearchBox(input);
        autocomplete.addListener('places_changed', function () {
          const place = autocomplete.getPlaces()[0];
          if (place && place.geometry) {
            _this.setProperties({
              distanceFilter: true,
              lat: place.geometry.location.lat(),
              lon: place.geometry.location.lng(),
              distance: _this.get('distance') || 25
            });
          } else {
            _this.clearLocationSearch();
          }
        });
      }
    },
    actions: {
      clear() {
        this.set('selectedDevices', []);
        this.set('deviceIds', []);
      },
      setPanel() {
        this.sendAction('setPanel', null, null);
      }
    }
  });
});
define('admin/components/open-client-app', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OpenClientAppComponent;

  OpenClientAppComponent = Ember.Component.extend({
    session: Ember.inject.service(),
    clientLoginUrl: Ember.computed('params', function () {
      var adminEmail, adminToken, name, nameEncoded, prop, propEncoded, ref, url;
      adminToken = this.get('session.data.authenticated.token');
      adminEmail = this.get('session.data.authenticated.email');
      url = _environment.default.clients.host + "/?admin_token=" + adminToken + "&admin_email=" + adminEmail;
      ref = this.get('params');
      for (name in ref) {
        prop = ref[name];
        nameEncoded = encodeURIComponent(name);
        propEncoded = encodeURIComponent(prop);
        url = url + ("&" + nameEncoded + "=" + propEncoded);
      }
      return url;
    }),
    actions: {
      openClientApp: function () {
        return window.open(this.get('clientLoginUrl'));
      }
    }
  });

  exports.default = OpenClientAppComponent;
});
define('admin/components/organization-package-checkbox', ['exports', 'admin/components/client-package-checkbox', 'admin/config/environment'], function (exports, _clientPackageCheckbox, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationPackageCheckboxComponent;

  OrganizationPackageCheckboxComponent = _clientPackageCheckbox.default.extend({
    sessionAccount: Ember.inject.service(),
    packageAvailable: Ember.computed('available_package', 'model.organization.available_packages.[]', function () {
      if (this.get('model.organization.available_packages').findBy('id', this.get('available_package.id'))) {
        return true;
      }
    }),
    actions: {
      create: function () {
        var available_package;
        available_package = this.get('model.organization.available_packages').createRecord({
          "package": this.get('available_package')
        });
        return available_package.save().then(function (_this) {
          return function () {
            return _this.get('model.organization').reload();
          };
        }(this));
      },
      destroy: function () {
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/organizations/" + this.get('model.organization.id') + "/available_packages/" + this.get('available_package.id'),
          headers: this.get('sessionAccount.headers'),
          type: 'DELETE',
          dataType: 'json'
        }).then(function (_this) {
          return function (response) {
            _this.get('model.organization.available_packages').removeObject({
              "package": _this.get('available_package')
            });
            return _this.get('model.organization').reload();
          };
        }(this), function (_this) {
          return function (response) {
            return console.log('somethign w wrong...');
          };
        }(this));
      }
    }
  });

  exports.default = OrganizationPackageCheckboxComponent;
});
define('admin/components/photo-swipe', ['exports', 'ember-cli-photoswipe/components/photo-swipe'], function (exports, _photoSwipe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _photoSwipe.default;
});
define('admin/components/pikaday-input', ['exports', 'ember-pikaday/components/pikaday-input'], function (exports, _pikadayInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pikadayInput.default;
});
define('admin/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _pikadayInputless) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pikadayInputless.default;
    }
  });
});
define('admin/components/pilot-approval-button', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotApprovalButtonComponent;

  PilotApprovalButtonComponent = Ember.Component.extend({
    tagName: 'button',
    type: 'submit',
    name: 'approve',
    classNames: ['btn', 'btn-success'],
    classNameBindings: ['isDisabled:hide'],
    isDisabled: Ember.computed('model.status', function () {
      return this.get('model.status') === 'approved';
    }),
    click: function (e) {
      var model, reject_status;
      e.preventDefault();
      e.stopPropagation();
      model = this.get('model');
      reject_status = model.get('reject');
      model.set('approve', true);
      model.set('reject', false);
      return model.save().then(null, function (response) {
        model.set('approve', false);
        model.set('reject', reject_status);
        return alert('There was a problem approving this pilot');
      });
    }
  });

  exports.default = PilotApprovalButtonComponent;
});
define("admin/components/pilot-badge", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotBadgeComponent;

  PilotBadgeComponent = Ember.Component.extend({
    actions: {
      removeBadge: function (pilotBadge) {
        return $(this.element).animate({
          opacity: 0
        }, 500, "linear", function () {
          return pilotBadge.destroyRecord();
        });
      }
    }
  });

  exports.default = PilotBadgeComponent;
});
define('admin/components/pilot-device-view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: 'row pilot-section',
    displayedIndex: Ember.computed('index', function () {
      return this.get('index') + 1;
    })
  });
});
define('admin/components/pilot-dispatch-row', ['exports', 'admin/feature-manager'], function (exports, _featureManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotDispatchRowComponent;

  PilotDispatchRowComponent = Ember.Component.extend({
    classNames: ['pilot-dispatch-row'],
    licenseList: Ember.computed('pilot.pilot_licenses.[]', function () {
      var licenses;
      licenses = this.get('pilot.pilot_licenses');
      return licenses.reduce(function (acc, val, i, a) {
        if (i === licenses.get('length') - 1) {
          return acc += val.get('license.name');
        } else {
          return acc += val.get('license.name') + ', ';
        }
      }, '');
    }),
    droneList: Ember.computed('pilot.drones.[]', function () {
      var drones;
      drones = this.get('pilot.drones');
      return drones.reduce(function (acc, val, i, a) {
        if (i === drones.get('length') - 1) {
          return acc += val.get('drone.name');
        } else {
          return acc += val.get('drone.name') + ', ';
        }
      }, '');
    }),
    cameraList: Ember.computed('pilot.drones.[]', function () {
      var cameras;
      cameras = this.get('pilot.camerasArray');
      return cameras.reduce(function (acc, val, i, a) {
        if (i === cameras.length - 1) {
          return acc += val.get('name');
        } else {
          return acc += val.get('name') + ', ';
        }
      }, '');
    }),
    showPilotScore: Ember.computed(function () {
      return _featureManager.default.FeatureManager.showDispatchSorting();
    }),
    actions: {
      toggleIncludePilot: function () {
        event.preventDefault();
        if (!this.get('autoDispatch')) {
          this.set('invited', !this.get('invited'));
          return this.sendAction("toggleIncludePilot", this.get('pilot'), this.get('invited'), event.shiftKey);
        }
      }
    }
  });

  exports.default = PilotDispatchRowComponent;
});
define('admin/components/pilot-dispatch', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotDispatchComponent;

  PilotDispatchComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    classNames: ['row', 'pilot-dispatch'],
    isSendingRequest: false,
    drones: [],
    createdOnDesc: ['created_on:desc'],
    orderedNotifiedPilots: Ember.computed.sort('model.notified_pilots', 'createdOnDesc'),
    canReInvite: Ember.computed('model.notified_pilots.[]', function () {
      return !this.get('model.notified_pilots').findBy('status', 'accepted');
    }),
    actions: {
      pilotCancelled: function (model) {
        var _model, _this, confirm, headers;
        confirm = this.get('isSendingRequest') ? false : window.confirm("Are you sure you want to cancel this pilot?");
        if (confirm) {
          _this = this;
          _model = this.get('model');
          headers = this.get('sessionAccount.headers');
          _this.set('isSendingRequest', true);
          return Ember.$.ajax({
            url: _environment.default.api.host + "/v1/admin/missions/" + _model.id + "/pilot",
            type: 'DELETE',
            dataType: 'json',
            headers: headers
          }).then(function (response) {
            _model.reload();
            return _this.set('isSendingRequest', false);
          }, function (response) {
            return _this.set('isSendingRequest', false);
          });
        }
      },
      reInvite: function (pilot_notification) {
        var confirm;
        confirm = this.get('isSendingRequest') ? false : window.confirm("Are you sure you want re-invite " + pilot_notification.get('pilot.fullName') + "?");
        if (confirm) {
          this.set('isSendingRequest', true);
          return Ember.$.ajax({
            url: _environment.default.api.host + "/v1/admin/missions/" + pilot_notification.get('mission.id') + "/notifications",
            headers: this.get('sessionAccount.headers'),
            type: 'POST',
            dataType: 'json',
            data: {
              pilot: pilot_notification.get('pilot.id')
            }
          }).then(function (_this) {
            return function (response) {
              _this.get('model').reload();
              return _this.set('isSendingRequest', false);
            };
          }(this), function (_this) {
            return function (response) {
              return _this.set('isSendingRequest', false);
            };
          }(this));
        }
      }
    }
  });

  exports.default = PilotDispatchComponent;
});
define('admin/components/pilot-drone-view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotDroneViewComponent;

  PilotDroneViewComponent = Ember.Component.extend({
    classNames: 'row pilot-section',
    displayedIndex: Ember.computed('index', function () {
      return this.get('index') + 1;
    }),
    displayedCameras: Ember.computed('drone.cameras.[]', function () {
      var camera, cameraArray, cameraText, i, j, len;
      cameraText = "";
      cameraArray = this.get('drone.cameras').toArray();
      for (i = j = 0, len = cameraArray.length; j < len; i = ++j) {
        camera = cameraArray[i];
        cameraText += camera.get('name');
        if (i !== cameraArray.length - 1) {
          cameraText += ', ';
        }
      }
      return cameraText;
    })
  });

  exports.default = PilotDroneViewComponent;
});
define('admin/components/pilot-equipment-index-list', ['exports', 'admin/components/equipment-index-list'], function (exports, _equipmentIndexList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotEquipmentIndexListComponent;

  PilotEquipmentIndexListComponent = _equipmentIndexList.default.extend({
    collapsed: true,
    showModal: false,
    currentRecord: null,
    cachedRecords: [],
    recordType: null
  });

  exports.default = PilotEquipmentIndexListComponent;
});
define('admin/components/pilot-equipment-view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: 'row pilot-section',
    displayedIndex: Ember.computed('index', function () {
      return this.get('index') + 1;
    })
  });
});
define('admin/components/pilot-license-view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotLicenseViewComponent;

  PilotLicenseViewComponent = Ember.Component.extend({
    classNames: 'row pilot-section',
    displayedIndex: Ember.computed('index', function () {
      return this.get('index') + 1;
    })
  });

  exports.default = PilotLicenseViewComponent;
});
define('admin/components/pilot-payout', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotPayoutComponent;

  PilotPayoutComponent = Ember.Component.extend({
    didInsertElement: function () {
      if (!this.get('model.mission.amount')) {
        return this.set('model.payout.amount', this.get('model.mission.estimated_pilot_payout'));
      }
    },
    actions: {
      createPayout: function () {
        return this.sendAction('action', this.get('model'));
      }
    }
  });

  exports.default = PilotPayoutComponent;
});
define('admin/components/pilot-reject-button', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotRejectButtonComponent;

  PilotRejectButtonComponent = Ember.Component.extend({
    tagName: 'button',
    type: 'submit',
    name: 'reject',
    classNames: ['btn', 'btn-danger'],
    classNameBindings: ['isDisabled:hide'],
    isDisabled: Ember.computed('model.status', function () {
      return this.get('model.status') === 'rejected';
    }),
    click: function (e) {
      var approve_status, model;
      e.preventDefault();
      e.stopPropagation();
      model = this.get('model');
      approve_status = model.get('approve');
      model.set('reject', true);
      model.set('approve', false);
      return model.save().then(null, function (response) {
        model.set('reject', false);
        model.set('approve', approve_status);
        return alert('There was a problem rejecting this pilot');
      });
    }
  });

  exports.default = PilotRejectButtonComponent;
});
define('admin/components/pilot-search-autocomplete', ['exports', 'admin/config/environment', 'admin/feature-manager'], function (exports, _environment, _featureManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotSearchAutocompleteComponent;

  PilotSearchAutocompleteComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    results: [],
    pilotList: [],
    charLimitForQuery: 2,
    queryType: 'pilots',
    queryUri: {
      pilots: _environment.default.api.host + "/v1/admin/pilots.json"
    },
    distances: Ember.String.w('25 50 100 250 1000 2000'),
    distance: '100',
    maxResultsOptions: Ember.String.w('10 20 50 100'),
    maxResults: '10',
    megaPixels: Ember.String.w('12 20'),
    selectedDrones: [],
    selectedCameras: [],
    selectedDevices: [],
    selectedEquipment: [],
    statuses: ['created', 'approved', 'evaluation_completed'],
    hasLicenses: true,
    hasDrones: true,
    noDronebasePilots: _environment.default.filterOptions.filterDronebasePilots,
    availableForRelativeMission: true,
    classNames: ['pilot-search-autocomplete'],
    badgeSortProps: ['name', 'asc'],
    droneSortProps: ['full_name', 'asc'],
    droneCameraOpen: false,
    sortAttribute: 'distance',
    autoDispatch: false,
    numPilotsToInvite: 0,
    numPilotsInvited: 0,
    confirmInvite: false,
    previouslySelectedPilot: -1,
    sortDefinition: [],
    init: function () {
      this._super();
      this.set('selectedBadge', this.get('defaultBadge'));
      this.set('badgeId', this.get('defaultBadge.id'));
      this.set('selectedDrones', this.get('defaultDrones'));
      this.set('selectedCameras', this.get('defaultCameras'));
      this.set('selectedDevices', this.get('defaultDevices'));
      return this.set('selectedEquipment', this.get('defaultEquipments'));
    },
    triggerSearch: function () {
      return Ember.run.debounce(this, 'processSearch', 1000);
    }.observes('query', 'distance', 'selectedMegaPixels', 'hasLicenses', 'hasDrones', 'availableForRelativeMission', 'noDronebasePilots', 'badgeId', 'selectedDrones.[]', 'sortAttribute', 'maxResults', 'selectedCameras.[]', 'selectedEquipment.[]', 'selectedDevices.[]'),
    defaultBadge: Ember.computed('model.mission.package.requiredBadgeId', function () {
      if (this.get('model.mission.package.badge_required')) {
        return this.get('model.mission.package.badge');
      }
    }),
    defaultDrones: Ember.computed('model.mission.package.drones.[]', function () {
      return this.get('model.mission.package.drones');
    }),
    defaultDevices: Ember.computed('model.mission.package.devices.[]', function () {
      return this.get('model.mission.package.devices');
    }),
    defaultCameras: Ember.computed('model.mission.package.droneCameras.[]', function () {
      return this.get('model.mission.package.droneCameras');
    }),
    defaultEquipments: Ember.computed('model.mission.package.pilotEquipments.[]', function () {
      return this.get('model.mission.package.pilotEquipments');
    }),
    isScheduled: Ember.computed('model.mission.scheduled_at_start', 'model.mission.scheduled_at_end', function () {
      return this.get('model.mission.scheduled_at_start') && this.get('model.mission.scheduled_at_end');
    }),
    badges: Ember.computed.sort('model.badges', 'badgeSortProps'),
    drones: Ember.computed.sort('model.drones', 'droneSortProps'),
    selectedDronesObjects: Ember.computed('model.drones', 'selectedDrones.[]', function () {
      var selection;
      selection = this.get('selectedDrones');
      return this.get('model.drones').filter(function (drone) {
        return selection.indexOf("" + drone.id) !== -1;
      });
    }),
    cameras: Ember.computed('model.drones', function () {
      var availableCameraIds, cameras, seen;
      cameras = [];
      seen = {};
      availableCameraIds = [];
      this.get('model.drones').toArray().forEach(function (drone) {
        return drone.get('optional_cameras').forEach(function (camera) {
          if (!seen[camera.id]) {
            seen[camera.id] = true;
            cameras.push(camera);
            return availableCameraIds.push(camera.get('id'));
          }
        });
      });
      return cameras;
    }),
    phones: Ember.computed('model.devices', function () {
      return this.get('model.devices').filter(function (device) {
        return device.get('device_type') === 'phone';
      });
    }),
    tablets: Ember.computed('model.devices', function () {
      return this.get('model.devices').filter(function (device) {
        return device.get('device_type') === 'tablet';
      });
    }),
    checkboxName: function (val) {
      return val.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    },
    sortedPilotList: Ember.computed.sort('results', 'sortDefinition'),
    pilotList: Ember.computed('sortedPilotList', function () {
      this.set('numPilotsToInvite', 0);
      return this.get('sortedPilotList').map(function (pilot) {
        pilot.set('invited', false);
        pilot.set('justInvited', false);
        return pilot;
      });
    }),
    didInsertElement: function () {
      return this.set('query', '');
    },
    processSearch: function () {
      var distance, location, missionId, model, params, query;
      query = this.get('query');
      distance = this.get('distance');
      model = this.get('model');
      location = this.get('model.mission.location');
      missionId = this.get('model.mission.id');
      params = {
        q: query,
        distance: distance,
        include: ['drones', 'drones.cameras', 'devices', 'pilot_equipment'],
        drone_ids: this.get('selectedDrones').getEach('id'),
        camera_ids: this.get('selectedCameras').getEach('id'),
        device_ids: this.get('selectedDevices').getEach('id'),
        pilot_equipment_ids: this.get('selectedEquipment').getEach('id'),
        statuses: this.get('statuses'),
        available_for_relative_mission: this.get('availableForRelativeMission'),
        no_dronebase_emails: this.get('noDronebasePilots'),
        has_drones: this.get('hasDrones'),
        has_licenses: this.get('hasLicenses'),
        per_page: this.get('maxResults'),
        relative_to_mission_id: missionId,
        badge_id: this.get('badgeId'),
        camera_mega_pixels: this.get('selectedMegaPixels'),
        sort_attribute: this.get('sortAttribute')
      };
      if (!query || query.length > this.charLimitForQuery) {
        this.set('results', []);
        return this.send('search', params, model);
      }
    },
    showDispatchSorting: Ember.computed(function () {
      return _featureManager.default.FeatureManager.showDispatchSorting();
    }),
    clearInviteError: function () {
      this.set('state', null);
      return this.set('message', null);
    },
    addInvitedPilot: function (pilot) {
      if (!pilot.get('invited')) {
        pilot.set('invited', true);
        return this.set('numPilotsToInvite', this.get('numPilotsToInvite') + 1);
      }
    },
    removeInvitedPilot: function (pilot) {
      if (pilot.get('invited')) {
        this.set('numPilotsToInvite', this.get('numPilotsToInvite') - 1);
        return pilot.set('invited', false);
      }
    },
    checkPilotInvited: function (pilot) {
      return this.get('sortedPilotList').find(function (p) {
        return p === pilot && p.invited;
      });
    },
    sendInvites: function (pilots) {
      var _this, pilotData;
      _this = this;
      pilotData = pilots.map(function (pilot) {
        return _this.get('inviteData')(pilot);
      });
      return Ember.$.ajax({
        url: _environment.default.api.host + "/v1/admin/missions/" + this.get('model.mission.id') + "/notifications",
        headers: this.get('sessionAccount.headers'),
        type: 'POST',
        dataType: 'json',
        data: {
          sort_mode: this.get('sortAttribute'),
          pilots: pilotData
        }
      }).then(function (_this) {
        return function (response) {
          return pilots.forEach(function (pilot) {
            pilot.set('justInvited', pilot.get('invited'));
            return pilot.set('invited', false);
          });
        };
      }(this), function (_this) {
        return function (response) {
          _this.set('state', 'error');
          return _this.set('message', response.responseJSON.errors[0].detail);
        };
      }(this)).then(function () {
        _this.get('model.mission').reload();
        _this.set('confirmInvite', false);
        _this.set('numPilotsInvited', _this.get('numPilotsToInvite'));
        return _this.set('numPilotsToInvite', 0);
      });
    },
    inviteData: function (pilot) {
      return {
        number: pilot.get('id'),
        score: pilot.get('score'),
        distance: pilot.get('distance'),
        invited: pilot.get('invited')
      };
    },
    actions: {
      setPresetFilter: function (val) {
        this.set('selectedDrones', []);
        this.set('selectedCameras', []);
        this.set('selectedDevices', []);
        $('.equipment-form input[type="checkbox"]').prop('checked', false);
        val.get('drones').forEach(function (_this) {
          return function (drone) {
            var selections;
            selections = _this.get('selectedDrones').without('a b c d').toArray();
            selections.push(drone);
            _this.set('selectedDrones', selections);
            return $("." + _this.checkboxName(drone.get('full_name'))).prop('checked', true);
          };
        }(this));
        return val.get('drone_cameras').forEach(function (_this) {
          return function (camera) {
            var selections;
            selections = _this.get('selectedCameras').without('a b c d').toArray();
            selections.push(camera);
            _this.set('selectedCameras', selections);
            return $("." + _this.checkboxName(camera.get('name'))).prop('checked', true);
          };
        }(this));
      },
      clearFilter: function () {
        $('select[name=preset-search-filter]')[0].selectedIndex = 0;
        $('.equipment-form input[type="checkbox"]').prop('checked', false);
        this.set('selectedDrones', this.get('defaultDrones'));
        this.set('selectedCameras', this.get('defaultCameras'));
        this.set('selectedDevices', this.get('defaultDevices'));
        this.get('selectedDrones').forEach(function (_this) {
          return function (drone) {
            return $("." + _this.checkboxName(drone.get('full_name'))).prop('checked', true);
          };
        }(this));
        this.get('selectedCameras').forEach(function (_this) {
          return function (camera) {
            return $("." + _this.checkboxName(camera.get('name'))).prop('checked', true);
          };
        }(this));
        return this.get('selectedDevices').forEach(function (_this) {
          return function (device) {
            return $("." + _this.checkboxName(device.get('name'))).prop('checked', true);
          };
        }(this));
      },
      toggleDroneList: function (event) {
        $($('#drone-header-toggle').data('target')).toggle();
        return this.set('droneCameraOpen', !this.get('droneCameraOpen'));
      },
      toggleDeviceList: function (event) {
        $($('#devices-header-toggle').data('target')).toggle();
        return this.set('devicesOpen', !this.get('devicesOpen'));
      },
      toggleEquipmentList: function (event) {
        $($('#other-equipment-header-toggle').data('target')).toggle();
        return this.set('equipmentOpen', !this.get('equipmentOpen'));
      },
      clearBadgeId: function () {
        $('select[name=badge-filter]')[0].selectedIndex = 0;
        return this.set('badgeId', null);
      },
      setBadgeId: function (val) {
        return this.set('badgeId', val.get('id'));
      },
      setDistance: function (val) {
        return this.set('distance', val);
      },
      setMaxResults: function (val) {
        return this.set('maxResults', val);
      },
      setMegaPixels: function (val) {
        return this.set('selectedMegaPixels', val);
      },
      search: function (query, model) {
        return this.sendAction('search', query, model);
      },
      setSortBy: function (val) {
        var autoDispatch;
        this.clearInviteError();
        autoDispatch = val === 'score_auto_dispatch';
        this.set('autoDispatch', autoDispatch);
        if (autoDispatch) {
          this.set('maxResults', '24');
          this.set('distance', '100');
          return this.set('sortAttribute', 'score');
        } else {
          this.set('maxResults', '10');
          return this.set('sortAttribute', val);
        }
      },
      toggleIncludePilot: function (pilot, include, shiftKey) {
        var larger, newPilotIndex, pilotList, smaller;
        this.set('numPilotsInvited', 0);
        if (shiftKey && this.get('previouslySelectedPilot') >= 0) {
          pilotList = this.get('pilotList');
          newPilotIndex = pilotList.indexOf(pilot);
          if (newPilotIndex > this.get('previouslySelectedPilot')) {
            larger = newPilotIndex;
            smaller = this.get('previouslySelectedPilot');
          } else {
            larger = this.get('previouslySelectedPilot');
            smaller = newPilotIndex;
          }
          if (include) {
            while (smaller <= larger) {
              this.addInvitedPilot(pilotList[smaller]);
              smaller++;
            }
          } else {
            while (smaller <= larger) {
              this.removeInvitedPilot(pilotList[smaller]);
              smaller++;
            }
          }
        } else {
          if (include) {
            this.addInvitedPilot(pilot);
          } else {
            this.removeInvitedPilot(pilot);
          }
        }
        return this.set('previouslySelectedPilot', this.get('pilotList').indexOf(pilot));
      },
      clearInvites: function () {
        var i, len, pilot, ref;
        ref = this.get('pilotList');
        for (i = 0, len = ref.length; i < len; i++) {
          pilot = ref[i];
          pilot.set('invited', false);
        }
        this.set('numPilotsToInvite', 0);
        return this.set('confirmInvite', false);
      },
      invitePilots: function () {
        return this.set('confirmInvite', true);
      },
      cancelInvitePilots: function () {
        return this.set('confirmInvite', false);
      },
      confirmInvitePilots: function () {
        return this.sendInvites(this.get('sortedPilotList'));
      },
      autoDispatchPilots: function () {
        var _this;
        _this = this;
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + this.get('model.mission.id') + "/notifications",
          headers: this.get('sessionAccount.headers'),
          type: 'POST',
          dataType: 'json',
          data: {
            auto_dispatch: true,
            has_drones: this.get('hasDrones'),
            has_licenses: this.get('hasLicenses'),
            no_dronebase_emails: this.get('noDronebasePilots'),
            drone_ids: this.get('selectedDrones').getEach('id'),
            camera_ids: this.get('selectedCameras').getEach('id'),
            device_ids: this.get('selectedDevices').getEach('id'),
            pilot_equipment_ids: this.get('selectedEquipment').getEach('id')
          }
        }).then(function (_this) {
          return function (response) {
            _this.set('state', 'success');
            _this.set('model.mission.pilot_invitations_dispatch', response.data.attributes);
            if (response.data.attributes['dispatch_status'] === 'in_progress') {
              _this.set('model.mission.status', 'pilots_notified');
              _this.set('message', 'Dispatching invitations to pilots');
              _this.controller.set('showInvitePilotLink', false);
              return _this.controller.set('invitationDispatchInProgress', true);
            } else if (response.data.attributes['dispatch_status'] === 'completed') {
              return _this.set('message', 'Sent invite to pilot');
            }
          };
        }(this), function (_this) {
          return function (response) {
            _this.set('state', 'error');
            return _this.set('message', response.responseJSON.errors[0].detail);
          };
        }(this));
      }
    }
  });

  exports.default = PilotSearchAutocompleteComponent;
});
define('admin/components/radio-button', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var RadioButtonComponent;

  RadioButtonComponent = Ember.Component.extend({
    tagName: 'input',
    type: 'radio',
    attributeBindings: ['type', 'htmlChecked:checked', 'value', 'name', 'disabled'],
    htmlChecked: Ember.computed('value', 'checked', function () {
      return this.get('value') === this.get('checked');
    }),
    change: function () {
      return this.set('checked', this.get('value'));
    },
    updateElementValue: Ember.observer('htmlChecked', function () {
      return Ember.run.next(this, function () {
        return this.$().prop('checked', this.get('htmlChecked'));
      });
    })
  });

  exports.default = RadioButtonComponent;
});
define('admin/components/rating-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var RatingModalComponent;

  RatingModalComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    actions: {
      close: function () {
        return this.get('close')();
      },
      setPilotRating: function (value) {
        Ember.$('.star').removeClass('selected');
        Ember.$('.star' + value).addClass('selected');
        return this.set('value', value);
      },
      rate: function (model, redirect) {
        var rating;
        if (!this.get('value')) {
          $($('.error-message')[0]).show();
          return;
        } else {
          $($('.error-message')[0]).hide();
        }
        this.get('close')();
        if (rating = model.mission.pilot_rating) {
          rating.set('value', this.get('value'));
        } else {
          rating = model.mission.store.createRecord('rating', {
            'mission': model.mission,
            'value': this.get('value')
          });
        }
        rating.save().then(function (_this) {
          return function (response) {
            if (response.errors.length > 0) {
              return alert(response.errors[0].detail);
            } else {
              return model.mission.set('pilot_rating', response);
            }
          };
        }(this));
        if (redirect) {
          return $($('.rating-modal-content form')).submit();
        }
      }
    }
  });

  exports.default = RatingModalComponent;
});
define('admin/components/reschedule-modal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var RescheduleModalComponent;

  RescheduleModalComponent = Ember.Component.extend({
    rescheduleAllowed: true,
    init: function () {
      var mission_reschedule, rescheduler;
      this._super();
      rescheduler = this.get('sessionAccount.account');
      mission_reschedule = this.get('model.mission.store').createRecord('mission_reschedule', {
        mission: this.get('model.mission'),
        scheduled_at_start: this.get('model.mission.scheduled_at_start'),
        scheduled_at_end: this.get('model.mission.scheduled_at_end'),
        rescheduler: rescheduler
      });
      return this.set('missionReschedule', mission_reschedule);
    },
    rescheduleChoiceObserver: Ember.observer('rescheduleChoice', function () {
      if (this.get('rescheduleChoice') === 'clear') {
        this.set('missionReschedule.scheduled_at_start', null);
        return this.set('missionReschedule.scheduled_at_end', null);
      }
    }),
    canSave: Ember.computed('rescheduleChoice', 'missionReschedule.reschedule_reason', function () {
      return this.get('rescheduleChoice') && this.get('missionReschedule.reschedule_reason');
    }),
    scheduleErrorObserver: Ember.observer('selectedStart', 'selectedEnd', function () {
      if (this.get('scheduleError')) {
        return this.set('scheduleError', false);
      }
    }),
    actions: {
      setStartTime: function (time) {
        return this.set('scheduledStartTime', time);
      },
      setEndTime: function (time) {
        return this.set('scheduledEndTime', time);
      },
      setRescheduleReason: function (reasonId) {
        var reason_object;
        reason_object = this.get('model.mission.store').peekRecord('reschedule-reason', reasonId);
        return this.set('missionReschedule.reschedule_reason', reason_object);
      },
      setRescheduleChoice: function (choice) {
        return this.set('rescheduleChoice', choice);
      },
      save: function () {
        var scheduled_end_formatted, scheduled_start_formatted;
        if (this.get('rescheduleChoice') === 'clear') {
          return this.get('missionReschedule')["delete"]().then(function (_this) {
            return function (updatedMission) {
              _this.sendAction('reloadMission');
              return _this.send('close');
            };
          }(this));
        } else {
          scheduled_start_formatted = moment.tz(this.get('selectedStart'), this.get('model.mission.location.timezone_id')).utc().toString();
          scheduled_end_formatted = moment.tz(this.get('selectedEnd'), this.get('model.mission.location.timezone_id')).utc().toString();
          this.set('missionReschedule.scheduled_at_start', scheduled_start_formatted);
          this.set('missionReschedule.scheduled_at_end', scheduled_end_formatted);
          return this.get('missionReschedule').save().then(function (_this) {
            return function (updatedMission) {
              _this.sendAction('reloadMission');
              return _this.send('close');
            };
          }(this), function (_this) {
            return function (response) {
              return _this.set('scheduleError', response.errors[0].detail);
            };
          }(this));
        }
      },
      close: function () {
        return this.get('close')();
      }
    }
  });

  exports.default = RescheduleModalComponent;
});
define('admin/components/reshoot-edit-box', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ReshootEditBoxComponent;

  ReshootEditBoxComponent = Ember.Component.extend();

  exports.default = ReshootEditBoxComponent;
});
define('admin/components/reshoot-modal', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ReshootModalComponent;

  ReshootModalComponent = Ember.Component.extend({
    sessionAccount: Ember.inject.service(),
    copyShots: null,
    priceZero: null,
    actions: {
      close: function () {
        return this.get('close')();
      },
      setRejectionReason: function (value) {
        return this.set('rejectionReason', value);
      },
      setPriceZero: function (value) {
        return this.set('priceZero', value);
      },
      setCopyShots: function (value) {
        return this.set('copyShots', value);
      },
      reshoot: function (model) {
        var data, ref;
        if (!$('.form-horizontal select').val()) {
          $($('.error-message')[0]).show();
        } else {
          $($('.error-message')[0]).hide();
        }
        if (this.get('priceZero') === null) {
          $($('.error-message')[1]).show();
        } else {
          $($('.error-message')[1]).hide();
        }
        if (this.get('copyShots') === null) {
          $($('.error-message')[2]).show();
        } else {
          $($('.error-message')[2]).hide();
        }
        if (!$('.form-horizontal select').val() || this.get('copyShots') === null || this.get('priceZero') === null) {
          return;
        }
        data = {
          'reason_id': this.get('rejectionReason'),
          'reason': this.get('rejectionNotes'),
          'copy_shots': (ref = this.get('copyShots')) != null ? ref : {
            "true": null
          },
          'price_zero': this.get('priceZero')
        };
        this.get('close')();
        return this.sendAction('action', model, data);
      }
    }
  });

  exports.default = ReshootModalComponent;
});
define('admin/components/schedule-inputs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ScheduleInputsComponent;

  ScheduleInputsComponent = Ember.Component.extend({
    availableTimes: ['12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'],
    picker_icons: {
      up: 'fa fa-angle-up',
      down: 'fa fa-angle-down',
      next: 'fa fa-angle-right',
      previous: 'fa fa-angle-left'
    },
    didInsertElement: function () {
      this.$('.startDatePicker').datetimepicker({
        collapse: true,
        focusOnShow: false,
        viewMode: 'days',
        format: 'MM/DD/YYYY',
        useCurrent: false,
        minDate: moment().startOf('day'),
        icons: {
          date: "fa fa-calendar",
          previous: "fa fa-angle-left",
          next: "fa fa-angle-right",
          close: "icon-Xmark"
        }
      });
      this.$('.endDatePicker').datetimepicker({
        collapse: true,
        focusOnShow: false,
        viewMode: 'days',
        format: 'MM/DD/YYYY',
        useCurrent: false,
        minDate: moment().startOf('day'),
        icons: {
          date: "fa fa-calendar",
          previous: "fa fa-angle-left",
          next: "fa fa-angle-right",
          close: "icon-Xmark"
        }
      });
      this.send('formDateTimeString', this.get('scheduledStartDate'), this.get('scheduledStartTime'), 'selectedStart');
      return this.send('formDateTimeString', this.get('scheduledEndDate'), this.get('scheduledEndTime'), 'selectedEnd');
    },
    scheduledStartDate: Ember.computed('mission.scheduled_at_start', function () {
      var startDate;
      if (this.get('mission.scheduled_at_start')) {
        startDate = moment.tz(this.get('mission.scheduled_at_start'), this.get('mission.location.timezone_id'));
        return startDate.format('MM/DD/YYYY').toString();
      }
    }),
    scheduledEndDate: Ember.computed('mission.scheduled_at_end', function () {
      var endDate;
      if (this.get('mission.scheduled_at_end')) {
        endDate = moment.tz(this.get('mission.scheduled_at_end'), this.get('mission.location.timezone_id'));
        return endDate.format('MM/DD/YYYY').toString();
      }
    }),
    scheduledStartTime: Ember.computed('mission.scheduled_at_start', function () {
      var startTime;
      if (this.get('mission.scheduled_at_start')) {
        startTime = moment.tz(this.get('mission.scheduled_at_start'), this.get('mission.location.timezone_id'));
        return startTime.format('hh:mm A').toString();
      }
    }),
    scheduledEndTime: Ember.computed('mission.scheduled_at_end', function () {
      var endTime;
      if (this.get('mission.scheduled_at_end')) {
        endTime = moment.tz(this.get('mission.scheduled_at_end'), this.get('mission.location.timezone_id'));
        return endTime.format('hh:mm A').toString();
      }
    }),
    selectedStartObserver: Ember.observer('scheduledStartDate', 'scheduledStartTime', function () {
      if (this.get('scheduledStartDate') && this.get('scheduledStartTime')) {
        return this.send('formDateTimeString', this.get('scheduledStartDate'), this.get('scheduledStartTime'), 'selectedStart');
      }
    }),
    selectedEndObserver: Ember.observer('scheduledEndDate', 'scheduledEndTime', function () {
      if (this.get('scheduledEndDate') && this.get('scheduledEndDate')) {
        return this.send('formDateTimeString', this.get('scheduledEndDate'), this.get('scheduledEndTime'), 'selectedEnd');
      }
    }),
    actions: {
      setStartTime: function (time) {
        return this.set('scheduledStartTime', time);
      },
      setEndTime: function (time) {
        return this.set('scheduledEndTime', time);
      },
      formDateTimeString: function (date, time, writeTo) {
        var choice, timeString;
        if (!(date && time)) {
          return;
        }
        timeString = date + " " + time;
        choice = moment(timeString).format('YYYY-MM-DD HH:mm').toString();
        return this.set(writeTo, choice);
      }
    }
  });

  exports.default = ScheduleInputsComponent;
});
define('admin/components/search-input-delayed', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SearchInputDelayedComponent;

  SearchInputDelayedComponent = Ember.TextField.extend({
    runner: null,
    boundValue: null,
    boundValueListener: Ember.observer('boundValue', function () {
      if (this.get('boundValue') === null) {
        return this.set('value', null);
      }
    }),
    keyUp: function (e) {
      var runner;
      if (runner = this.get('runner')) {
        Ember.run.cancel(runner);
      }
      return this.set('runner', Ember.run.later(this, 'setBoundValue', 500));
    },
    didInsertElement: function (e) {
      return Ember.run.schedule('afterRender', this, function () {
        return this.set('value', this.get('boundValue'));
      });
    },
    setBoundValue: function () {
      return this.set('boundValue', this.get('value'));
    }
  });

  exports.default = SearchInputDelayedComponent;
});
define('admin/components/select-custom', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SelectCustomComponent;

  SelectCustomComponent = Ember.Component.extend({
    content: null,
    prompt: null,
    optionValuePath: 'id',
    optionLabelPath: 'fullName',
    action: Ember.K,
    classNames: ['form-group'],
    selectClass: 'select-custom',
    assignSelectedObject: true,
    useSendAction: false,
    reset: true,
    selectName: null,
    promptDisabled: true,
    didReceiveAttrs: function (attrs) {
      this._super(attrs);
      if (!this.get('content')) {
        return this.set('content', []);
      }
    },
    actions: {
      changeValue: function () {
        var changeCallback, content, contentIndex, hasPrompt, selectEl, selectedIndex, selectedObject, selectedValue;
        selectEl = this.$('select')[0];
        this.$('select').addClass('changed');
        selectedIndex = selectEl.selectedIndex;
        content = this.get('content');
        hasPrompt = !!this.get('prompt');
        contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
        selectedObject = content.objectsAt ? content.objectsAt([contentIndex])[0] : content[contentIndex];
        selectedValue = selectedObject ? selectedObject.get(this.optionValuePath) : null;
        changeCallback = this.get('action');
        if (this.assignSelectedObject) {
          if (this.useSendAction) {
            this.sendAction("action", selectedObject);
          } else {
            changeCallback(selectedObject);
          }
        } else {
          if (this.useSendAction) {
            this.sendAction("action", selectedValue);
          } else {
            changeCallback(selectedValue);
          }
        }
        if (this.reset) {
          return selectEl.selectedIndex = 0;
        }
      }
    }
  });

  exports.default = SelectCustomComponent;
});
define('admin/components/select-enum', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SelectEnumComponent;

  SelectEnumComponent = Ember.Component.extend({
    selection: null,
    prompt: null,
    content: null,
    selectClass: 'form-control input-md'
  });

  exports.default = SelectEnumComponent;
});
define('admin/components/shot-type-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShotTypeFormComponent;

  ShotTypeFormComponent = Ember.Component.extend({
    buttonText: 'Save',
    actions: {
      save_shot_type: function (model) {
        this.set('buttonText', 'Saving...');
        return model.save().then(function (_this) {
          return function () {
            _this.set('buttonText', 'Saved!');
            return _this.sendAction('savedAction');
          };
        }(this))["catch"](function (_this) {
          return function () {
            _this.set('buttonText', 'Failed!');
            return setTimeout(function () {
              return _this.set('buttonText', 'Save');
            }, 5000);
          };
        }(this));
      }
    }
  });

  exports.default = ShotTypeFormComponent;
});
define('admin/components/simple-mde', ['exports', 'ember-simplemde/components/simple-mde'], function (exports, _simpleMde) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _simpleMde.default;
    }
  });
});
define('admin/components/sortable-column', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SortableColumnComponent;

  SortableColumnComponent = Ember.Component.extend({
    tagName: 'th',
    classNames: ["sortable-column"],
    classNameBindings: ["active:active"],
    sortDirection: null,
    active: Ember.computed('currentSelected', 'column', function () {
      var direction, ref, selected;
      ref = this.get('currentSelected')[0].split(':'), selected = ref[0], direction = ref[1];
      return this.get('column') === selected;
    }),
    direction: Ember.computed('sortDirection', function () {
      if (this.get('sortDirection') === 'asc') {
        return 'up';
      } else {
        return 'down';
      }
    }),
    toggleSortDirection: function () {
      var direction;
      direction = this.get('sortDirection') === 'asc' ? 'desc' : 'asc';
      return this.set('sortDirection', direction);
    },
    click: function () {
      if (this.get('active')) {
        this.toggleSortDirection();
      }
      return this.sendAction('action', this.get('column') + ":" + this.get('sortDirection'));
    },
    didInsertElement: function () {
      return Ember.run.scheduleOnce('afterRender', this, function () {
        var direction, ref, selected;
        ref = this.get('currentSelected')[0].split(':'), selected = ref[0], direction = ref[1];
        if (this.get('column') === selected) {
          return this.set('sortDirection', direction);
        } else {
          if (!this.get('sortDirection')) {
            return this.set('sortDirection', 'asc');
          }
        }
      });
    }
  });

  exports.default = SortableColumnComponent;
});
define('admin/components/submit-button', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SubmitButtonComponent;

  SubmitButtonComponent = Ember.Component.extend({
    tagName: 'button',
    type: 'submit',
    classNameBindings: ['enabled::disabled'],
    enabled: true
  });

  exports.default = SubmitButtonComponent;
});
define('admin/components/template-form', ['exports', 'admin/validations/template', 'ember-changeset-validations', 'ember-changeset'], function (exports, _template, _emberChangesetValidations, _emberChangeset) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplateFormComponent;

  TemplateFormComponent = Ember.Component.extend({
    classNames: 'template-form',
    shotTypeSortProps: ['shot_type.name:asc'],
    buttonText: 'Submit',
    validations: {
      'template.name': {
        presence: true,
        length: {
          minimum: 3,
          maximum: 75
        }
      }
    },
    initChangeSet: Ember.on('init', function () {
      return this.changeset = new _emberChangeset.default(this.get('template'), (0, _emberChangesetValidations.default)(_template.default), _template.default);
    }),
    sortedShotTypes: Ember.computed('shotTypes', function () {
      return this.get('shotTypes').sortBy('name');
    }),
    reversedShotList: Ember.computed('template.shots.[]', function () {
      return this.get('template.shots').toArray().reverse();
    }),
    addShot: function (shot_type) {
      return this.get('template.shots').createRecord({
        shot_type: shot_type
      });
    },
    removeShot: function (shot) {
      var removeConfirm;
      removeConfirm = confirm("Delete shot?");
      if (removeConfirm) {
        return shot.destroyRecord();
      }
    },
    saveTemplate: function () {
      return this.changeset.validate().then(function (_this) {
        return function () {
          if (_this.changeset.get('isInvalid')) {
            $('.name-error').show();
          } else {
            return _this.changeset.save().then(function () {
              $('.name-error').hide();
              return _this.get('template').save().then(function () {
                return _this.get('template.shots').save();
              });
            });
          }
        };
      }(this));
    },
    actions: {
      add_shot: function (shot_type) {
        return this.addShot(shot_type);
      },
      remove_shot: function (shot) {
        return this.removeShot(shot);
      },
      save_template: function () {
        return this.saveTemplate();
      }
    }
  });

  exports.default = TemplateFormComponent;
});
define('admin/components/tether-dialog', ['exports', 'ember-modal-dialog/components/deprecated-tether-dialog'], function (exports, _deprecatedTetherDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _deprecatedTetherDialog.default;
    }
  });
});
define('admin/components/textarea-trigger-save', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TextareaTriggerSaveComponent;

  TextareaTriggerSaveComponent = Ember.TextArea.extend({
    classNames: ['form-control'],
    focusOut: function () {
      return this.get('parentView.controller').send('save');
    }
  });

  exports.default = TextareaTriggerSaveComponent;
});
define('admin/components/video-js-source', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var VideoJsSourceComponent;

  VideoJsSourceComponent = Ember.Component.extend({
    tagName: 'source',
    attributeBindings: ['src', 'type']
  });

  exports.default = VideoJsSourceComponent;
});
define('admin/components/video-js', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var VideoJsComponent;

  VideoJsComponent = Ember.Component.extend({
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
    currentTimeDidChange: Ember.on('seeked', 'timeUpdate', function (player) {
      return this.set('currentTime', player.currentTime());
    }),
    dimensionsDidChange: Ember.on('resize', function (player) {
      return this.setProperties({
        currentHeight: player.height(),
        currentWidth: player.width()
      });
    }),
    durationDidChange: Ember.on('durationChange', function (player) {
      return this.set('duration', player.duration());
    }),
    naturalAspectRatio: Ember.computed('naturalHeight', 'naturalWidth', function () {
      return this.get('naturalHeight') / this.get('naturalWidth');
    }),
    volumeDidChange: Ember.on('volumeChange', function (player) {
      this.set('muted', player.muted());
      return this.set('volume', player.volume());
    }),
    _applyPlayerAttribute: function (player, attrName, newValue) {
      var method, oldValue;
      method = player[attrName];
      if (method) {
        oldValue = method.call(player);
        if (oldValue !== newValue) {
          return method.call(player, newValue);
        }
      }
    },
    _autoresizePlayer: function (player) {
      var naturalAspectRatio, parentWidth;
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      if (!this.get('autoresize')) {
        return;
      }
      naturalAspectRatio = this.get('naturalAspectRatio');
      parentWidth = Ember.$(player.el().parentNode).width();
      return this.setProperties({
        currentHeight: parentWidth * naturalAspectRatio,
        currentWidth: parentWidth
      });
    },
    _didInitPlayer: function (player) {
      this._setupPlayerAttributes(player);
      this._setupPlayerEvents(player);
      this._setupAutoresize(player);
      Ember.run(this, function () {
        return this.sendAction('ready');
      });
      return this.on('willDestroyElement', function () {
        return player.dispose();
      });
    },
    _initPlayer: Ember.on('didInsertElement', function () {
      var _this, element, options;
      _this = this;
      element = this.get('element');
      options = this.get('setup') || {};
      return videojs(element, options, function () {
        return _this._didInitPlayer(this);
      });
    }),
    _registerPlayerObserver: function (property, target, observer) {
      var scheduledObserver;
      scheduledObserver = function () {
        return Ember.run.scheduleOnce('render', this, observer);
      };
      this.addObserver(property, target, scheduledObserver);
      return this.on('willClearRender', this, function () {
        return this.removeObserver(property, target, scheduledObserver);
      });
    },
    _setupAutoresize: function (player) {
      var observer;
      this._setupResizeListener(player);
      observer = function () {
        return this._autoresizePlayer(player);
      };
      this._registerPlayerObserver('autoresize', this, observer);
      this._registerPlayerObserver('naturalAspectRatio', this, observer);
      return Ember.run(this, function () {
        return Ember.run.scheduleOnce('render', this, observer);
      });
    },
    _setupPlayerAttributeBindingObservation: function (player, property, attrName) {
      var observer;
      observer = function () {
        var propertyValue;
        propertyValue = this.get(property);
        return this._applyPlayerAttribute(player, attrName, propertyValue);
      };
      this._registerPlayerObserver(property, this, observer);
      return Ember.run(this, function () {
        var propertyValue;
        if (this.isDestroyed) {
          return;
        }
        propertyValue = this.get(property);
        if (Ember.isNone(propertyValue)) {
          propertyValue = player[attrName].call(player);
          this.set(property, propertyValue);
        }
        return this._applyPlayerAttribute(player, attrName, propertyValue);
      });
    },
    _setupPlayerAttributes: function (player) {
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
    _setupPlayerEventHandler: function (player, event, eventName) {
      var handlerFunction;
      handlerFunction = Ember.run.bind(this, function (e) {
        return this.trigger(eventName, player, e);
      });
      return player.on(event, handlerFunction);
    },
    _setupPlayerEvents: function (player) {
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
    _setupResizeListener: function (player) {
      var debouncedFunction, handlerFunction;
      handlerFunction = Ember.run.bind(this, function () {
        return this._autoresizePlayer(player);
      });
      debouncedFunction = function () {
        return Ember.run.debounce(this, handlerFunction, 150);
      };
      Ember.$(window).on('resize', debouncedFunction);
      return this.on('willClearRender', function () {
        return Ember.$(window).off('resize', debouncedFunction);
      });
    }
  });

  exports.default = VideoJsComponent;
});
define('admin/components/weather-icon', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var WeatherIconComponent;

  WeatherIconComponent = Ember.Component.extend({
    tagName: 'canvas',
    classNames: 'weather-icon-canvas',
    attributeBindings: ['width', 'height'],
    width: Ember.computed('width', function () {
      return this.get('width');
    }),
    height: Ember.computed('width', function () {
      return this.get('width') / 2;
    }),
    didInsertElement: function () {
      var skycon;
      skycon = new Skycons({
        "color": "black"
      });
      skycon.add(this.element, this.get('icon'));
      return skycon.play();
    }
  });

  exports.default = WeatherIconComponent;
});
define('admin/controllers/badges', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('admin/controllers/badges/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      changedName() {
        Ember.$('input[name="badge-name"]').addClass('changed');
      },
      refreshMindflashCourses() {
        var _this = this;
        this.store.query('mindflash_series', { 'mindflashRefresh': true }).then(function (response) {
          return _this.set('mindflashSeries', response);
        });
      },
      save(model) {
        model.badge.save();
      }
    }
  });
});
define('admin/controllers/clients/client', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsClientController;

  ClientsClientController = Ember.Controller.extend({
    actions: {
      openEditClientModal: function () {
        var client;
        client = this.get('model');
        this.set('model.client', client);
        this.set('model.organizations', this.get('organizations'));
        return this.send('openModal', 'components.clients.modal-client', this.get('model'));
      }
    }
  });

  exports.default = ClientsClientController;
});
define('admin/controllers/clients/client/missions/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsClientMissionsEditController;

  ClientsClientMissionsEditController = Ember.Controller.extend({
    payoutPilot: Ember.computed('model.payout.pilot', function () {
      return this.get('model.payout.pilot');
    }),
    mission: Ember.computed('model.mission', function () {
      return this.get('model.mission');
    }),
    statusesForSelect: Ember.computed('model.mission_statuses', function () {
      return this.get('model.mission_statuses').map(function (item, index, enumerable) {
        return Em.Object.create(item);
      });
    }),
    selectedStatus: Ember.computed('model.mission.status', function () {
      return this.get('statusesForSelect').findBy('value', this.get('model.mission.status'));
    }),
    observePilotPayout: Ember.observer('payoutPilot', function () {
      if (this.get('payoutPilot')) {
        this.set('model.payout.pilot', this.get('model.mission.pilot'));
        this.set('model.payout.amount', this.get('model.mission.estimated_pilot_payout'));
        return this.set('model.payout.notes', this.get('model.mission.pilot.fullName'));
      } else {
        this.set('model.payout.pilot', null);
        this.set('model.payout.notes', null);
        return this.set('model.payout.amount', null);
      }
    }),
    missionPayoutsReverse: Ember.computed('model.mission.payouts.[]', function () {
      return this.get('model.mission.payouts').toArray().reverse();
    })
  });

  exports.default = ClientsClientMissionsEditController;
});
define('admin/controllers/clients/client/missions/index', ['exports', 'admin/feature-manager'], function (exports, _featureManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsClientMissionsIndexController;

  ClientsClientMissionsIndexController = Ember.Controller.extend({
    queryParams: ['activeTab'],
    csvSortProps: ['created_at:desc'],
    activeTab: 'clientMissions',
    sortedCsvs: Ember.computed.sort('model.client.client_mission_csvs', 'csvSortProps'),
    sortedClientPackages: Ember.computed('model.client_packages_array.[]', function () {
      return this.get('model.client_packages_array').sortBy('vertical.short_name', 'name', 'price');
    }),
    hasAvailableOrganizationPackages: Em.computed('model.client.organization.packages', 'model.client.available_packages', function () {
      var availablePackages;
      if (this.get('model.client.organization')) {
        availablePackages = this.get('model.client.available_packages');
        return this.get('model.client.organization.packages').filter(function (_this) {
          return function (orgPack) {
            return _this.get('model.client.available_packages').indexOf(orgPack) > -1;
          };
        }(this)).length > 0;
      }
    }),
    actions: {
      refresh: function () {
        return this.get('model.client').reload();
      },
      setTab: function (tab) {
        return this.set('activeTab', tab);
      }
    }
  });

  exports.default = ClientsClientMissionsIndexController;
});
define('admin/controllers/clients/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsIndexController;

  ClientsIndexController = Ember.Controller.extend({
    queryParams: ['q'],
    q: null,
    actions: {
      clearQuery: function () {
        return this.set('q', null);
      },
      openNewClientModal: function () {
        this.set('model.client', this.store.createRecord('client'));
        return this.send('openModal', 'components.clients.modal-client', this.get('model'));
      }
    }
  });

  exports.default = ClientsIndexController;
});
define('admin/controllers/clients/organization', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationController;

  OrganizationController = Ember.Controller.extend({
    sessionAccount: Ember.inject.service(),
    notFoundClients: '',
    saveState: 'initial',
    showSaveButton: false,
    actions: {
      saveNewName: function () {
        this.set('model.organization.name', this.get('newName'));
        this.get('model.organization').save().then(function (_this) {
          return function () {
            return _this.get('model.organization').reload();
          };
        }(this));
        Ember.$('input[name="org-name"]').removeClass('changed');
        return this.set('showSaveButton', false);
      },
      openAddPackageModal: function () {
        var model;
        model = this.get('model');
        delete model["package"];
        model["package"] = model.organization.get('packages').createRecord();
        return this.send('openModal', 'clients.organization.modal-package', model);
      },
      changedName: function () {
        Ember.$('input[name="org-name"]').addClass('changed');
        return this.set('showSaveButton', true);
      },
      addNewClients: function () {
        var clients, clientsArray, promises, self;
        this.set('notFoundClients', '');
        clients = this.get('newClients');
        if (clients) {
          this.set('saveState', 'inProgress');
          this.set('newClients', null);
          clientsArray = clients.replace(/ /g, '').split(',');
          self = this;
          promises = [];
          clientsArray.forEach(function (_this) {
            return function (client) {
              if (_this.get('model.organization.clients').getEach('email').indexOf(client) < 0) {
                return Ember.$.ajax({
                  url: _environment.default.api.host + "/v1/admin/organizations/" + _this.get('model.organization.id') + "/add_client",
                  type: 'POST',
                  dataType: 'json',
                  headers: _this.get('sessionAccount.headers'),
                  data: {
                    email: client
                  }
                }).then(function (response) {
                  client = _this.get('model.organization.store').createRecord('client', response.data.attributes);
                  client.set('id', response.data.id);
                  client.set('added', 'added');
                  clients = _this.get('model.organization.clients').toArray();
                  clients.unshift(client);
                  return _this.set('model.organization.clients', clients);
                }, function (response) {
                  return _this.send('addClientToListOfMissingClients', client, response);
                });
              }
            };
          }(this));
          return Em.run.later(function (_this) {
            return function () {
              if (_this.get('notFoundClients.length') === 0) {
                _this.set('saveState', 'success');
              } else {
                _this.set('saveState', 'error');
              }
              return Em.run.later(function () {
                return _this.set('saveState', 'initial');
              }, 1500);
            };
          }(this), 500);
        } else {
          return $("button.btnSubmit").removeClass('clicked');
        }
      },
      addClientToListOfMissingClients: function (client, response) {
        if (response.status !== 404) {
          return;
        }
        if (this.get('notFoundClients.length')) {
          return this.set('notFoundClients', this.get('notFoundClients') + (", " + client));
        } else {
          return this.set('notFoundClients', client);
        }
      }
    }
  });

  exports.default = OrganizationController;
});
define('admin/controllers/clients/organizations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationsController;

  OrganizationsController = Ember.Controller.extend({
    queryParams: ['q'],
    q: null,
    actions: {
      clearQuery: function () {
        return this.set('q', null);
      }
    }
  });

  exports.default = OrganizationsController;
});
define('admin/controllers/equipment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('admin/controllers/global-assets', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetsIndexController;

  AssetsIndexController = Ember.Controller.extend({
    status: null,
    activeCount: Ember.computed('model', function () {
      return this.get('global_images').length;
    }),
    galleryImages: Ember.computed('model', function () {
      var _this;
      _this = this;
      return this.get('model.global_images').map(function (image) {
        if (!image.get('processing')) {
          return _this.buildGalleryImages(image);
        }
      }).sortBy('record.source_type', 'record.id:desc');
    }),
    buildGalleryImages: function (image) {
      return {
        src: image.get('version_urls.medium_1024'),
        msrc: image.get('version_urls.small_640'),
        w: 1024,
        h: image.get('height') / image.get('width') * 1024,
        title: image.get('name'),
        record: image
      };
    },
    galleryOptions: {
      hideShare: true
    },
    actions: {
      downloadAsset: function (asset_url) {
        return window.location = asset_url;
      },
      deleteAsset: function (asset, proxyAsset) {
        var _this;
        if (window.confirm('Are you sure? This will permanently remove this asset.')) {
          _this = this;
          return asset.destroyRecord().then(function (response) {
            if (proxyAsset) {
              return _this.get('galleryImages').removeObject(proxyAsset);
            }
          }, function (response) {
            console.log("response: ", response);
            return alert('There was an issue deleting this asset: ', response);
          });
        }
      }
    }
  });

  exports.default = AssetsIndexController;
});
define('admin/controllers/missions/creative-missions', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CreativeMissionsController;

  CreativeMissionsController = Ember.Controller.extend({
    sessionAccount: Ember.inject.service(),
    queryParams: ['status', 'q', 'lat', 'lon', 'distance'],
    sortProperties: ['created_on:desc'],
    sortedMissions: Ember.computed.sort('model.missions', 'sortProperties'),
    q: null,
    status: null,
    lat: null,
    lon: null,
    activeCount: Ember.computed('model', function () {
      return this.get('model.missions').length;
    }),
    hideRejectedForm: function (id) {
      return Ember.$("#mission_" + id).hide();
    },
    actions: {
      sortBy: function (sortProperties) {
        return this.set('sortProperties', [sortProperties]);
      },
      clearQuery: function () {
        return this.set('q', null);
      },
      setPanoAccepted: function (mission, accepted) {
        var _this;
        if (!confirm("Set accepted to " + accepted + "?")) {
          return;
        }
        _this = this;
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/responses",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            accepted: accepted,
            rejection_notes: mission.get('rejection_notes')
          }
        }).then(function (response) {
          _this.hideRejectedForm(mission.id);
          return mission.reload();
        }, function (response) {});
      },
      toggleRejectedForm: function (id) {
        return Ember.$("#mission_" + id).toggle();
      },
      toggleFilter: function () {
        return this.set('hideFilter', false);
      }
    }
  });

  exports.default = CreativeMissionsController;
});
define('admin/controllers/missions/edit', ['exports', 'admin/feature-manager', 'admin/config/environment'], function (exports, _featureManager, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsEditController;

  MissionsEditController = Ember.Controller.extend({
    reshootModalVisible: false,
    rescheduleModalVisible: false,
    ratingModalVisible: false,
    holdMissionModalVisible: false,
    capacityModalVisible: false,
    selectedShot: null,
    queryParams: ['activeTab'],
    activeTab: 'edit',
    payoutPilot: Ember.computed('model.payout.pilot', function () {
      return this.get('model.payout.pilot');
    }),
    mission: Ember.computed('model.mission', function () {
      return this.get('model.mission');
    }),
    statusesForSelect: Ember.computed('model.mission_statuses', function () {
      return this.get('model.mission_statuses').map(function (item, index, enumerable) {
        return Em.Object.create(item);
      });
    }),
    selectedStatus: Ember.computed('model.mission.status', function () {
      return this.get('statusesForSelect').findBy('value', this.get('model.mission.status'));
    }),
    drones: Ember.computed('model.drones', function () {
      return this.get('model.drones');
    }),
    breadCrumbs: Ember.computed("model.mission", function () {
      var parent, path, type;
      type = this.get('model.mission.mission_type');
      switch (type) {
        case 'client':
          path = 'missions';
          break;
        case 'creative':
          path = 'missions.creative_missions';
          break;
        case 'panorama':
          path = 'missions.pending_panos';
          break;
        case 'training':
          path = 'missions.training_missions';
      }
      parent = this.toTitleCase(type);
      return [{
        label: parent + " Mission",
        path: path
      }, {
        label: this.get('model.mission.id'),
        model: this.get('model.mission')
      }];
    }),
    parentCrumb: Ember.computed('model.mission', function () {
      var type;
      type = this.get('model.mission.mission_type');
      return this.toTitleCase(type);
    }),
    observePilotPayout: Ember.observer('payoutPilot', function () {
      if (this.get('payoutPilot')) {
        this.set('model.payout.pilot', this.get('model.mission.pilot'));
        this.set('model.payout.amount', this.get('model.mission.estimated_pilot_payout'));
        return this.set('model.payout.notes', this.get('model.mission.pilot.fullName'));
      } else {
        this.set('model.payout.pilot', null);
        this.set('model.payout.notes', null);
        return this.set('model.payout.amount', null);
      }
    }),
    missionPayoutsReverse: Ember.computed('model.mission.payouts.[]', function () {
      return this.get('model.mission.payouts').toArray().reverse();
    }),
    invitationDispatchInProgress: Ember.computed('model.mission.status', function () {
      return this.get('model.mission.pilot_invitations_dispatch.dispatch_status') === 'in_progress' && this.get('model.mission.status') === 'pilots_notified' && !this.get('model.mission.isOnHold');
    }),
    showInvitePilotLink: Ember.computed('model.mission.status', function () {
      return !this.get('invitationDispatchInProgress') && (this.get('model.mission.status') === 'confirmed' || this.get('model.mission.status') === 'reshoot' || this.get('model.mission.status') === 'pilots_notified');
    }),
    pilotNotAssigned: Ember.computed('model.mission.status', function () {
      return this.get('model.mission.status') === 'created' || this.get('model.mission.status') === 'confirmed' || this.get('model.mission.status') === 'reshoot' || this.get('model.mission.status') === 'pilots_notified';
    }),
    showOnsiteContacts: Ember.computed(function () {
      return _featureManager.default.FeatureManager.showOnsiteContacts();
    }),
    showContactNameAndPhone: Ember.computed('model.mission.onsite_contact.call_action', function () {
      return !!this.get('model.mission.onsite_contact.call_action') && this.get('model.mission.onsite_contact.call_action') !== 'not_needed';
    }),
    show3pfa: Ember.computed(function () {
      return !!_environment.default.show3pfa;
    }),
    statusSubText: Em.computed('model.mission.package.auto_dispatch_enabled', 'model.mission.status', 'model.mission.isReshoot', function () {
      if (this.get('model.mission.isReshoot') && this.get('model.mission.status') === 'created' && this.get('model.mission.package.auto_dispatch_enabled')) {
        return "Auto-dispatch at confirm is disabled for this mission due to reshoot";
      }
    }),
    toTitleCase: function (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    setTab: function (tab) {
      return this.set('activeTab', tab);
    },
    actions: {
      filterMap: function (shot) {
        if (this.get('selectedShot') === shot) {
          this.set('selectedShot', null);
          return this.set('model.filteredMapImages', this.get('model.mission.image_markers'));
        } else {
          this.set('model.filteredMapImages', shot.image_markers);
          return this.set('selectedShot', shot);
        }
      },
      updateCallAction: function (value) {
        return this.set('model.mission.onsite_contact.call_action', value);
      },
      toggleReshootModal: function () {
        this.toggleProperty('reshootModalVisible');
        return false;
      },
      toggleRescheduleModal: function () {
        this.toggleProperty('rescheduleModalVisible');
        return false;
      },
      toggleRatingModal: function () {
        this.toggleProperty('ratingModalVisible');
        return false;
      },
      toggleCapacityModal: function (upcomingDays) {
        this.set('model.upcomingDays', upcomingDays);
        if (upcomingDays) {
          this.set('model.currDays', upcomingDays.slice(0, 3));
        }
        this.toggleProperty('capacityModalVisible');
        return false;
      },
      toggleHoldMissionModal: function () {
        this.toggleProperty('holdMissionModalVisible');
        return false;
      },
      adminScheduled: function (selectedDate) {
        var local_time;
        local_time = moment(selectedDate).format('YYYY-MM-DD').toString();
        local_time = local_time + " 12:00";
        local_time = moment.tz(local_time, this.get('model.mission.location.timezone_id')).toString();
        this.set('model.mission.scheduled_at', local_time);
        this.set('model.mission.admin_scheduled', true);
        return this.get('model.mission').save();
      },
      rescheduleMission: function (model) {
        return this.send('rescheduleMissionModal', model);
      },
      saveSchedule: function (data) {
        var mission_reschedule, reason, scheduled_end_formatted, scheduled_start_formatted;
        reason = this.get('model.mission.store').peekAll('reschedule-reason').filterBy('slug', 'initial_schedule')[0];
        scheduled_start_formatted = moment.tz(data.mission_scheduled_at_start, this.get('model.mission.location.timezone_id')).utc().toString();
        scheduled_end_formatted = moment.tz(data.mission_scheduled_at_end, this.get('model.mission.location.timezone_id')).utc().toString();
        mission_reschedule = this.get('model.mission.store').createRecord('mission_reschedule', {
          mission: this.get('model.mission'),
          scheduled_at_start: scheduled_start_formatted,
          scheduled_at_end: scheduled_end_formatted,
          reschedule_reason: reason
        });
        this.set('model.mission.admin_scheduled', true);
        return mission_reschedule.save().then(function (_this) {
          return function (response) {
            _this.get('model.mission').save();
            return _this.set('model.mission.isScheduled', true);
          };
        }(this), function (_this) {
          return function (response) {
            return alert(response.errors[0].detail);
          };
        }(this));
      },
      reloadMission: function () {
        return this.get('model.mission').reload();
      },
      setTab: function (tab) {
        if (tab === 'activityLogs') {
          this.get('model.mission').loadActivityLogs();
        }
        return this.set('activeTab', tab);
      }
    }
  });

  exports.default = MissionsEditController;
});
define('admin/controllers/missions/index', ['exports', 'admin/feature-manager'], function (exports, _featureManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsIndexController;

  MissionsIndexController = Ember.Controller.extend({
    queryParams: ['status', 'q', 'sort_attribute', 'sort_order', 'lat', 'lon', 'distance', 'assets_late', 'include_client_ids', 'exclude_client_ids', 'reshoot', 'on_hold'],
    sortProperties: ['updated:desc'],
    q: null,
    status: null,
    lat: null,
    lon: null,
    distance: null,
    assets_late: false,
    on_hold: false,
    reshoot: false,
    include_client_ids: null,
    exclude_client_ids: null,
    sortAttribute: 'updated',
    sortOrder: 'desc',
    showMap: false,
    activeCount: Ember.computed('model', function () {
      return this.get('model.missions').length;
    }),
    actions: {
      toggleShowMap: function () {
        return this.set('showMap', !this.get('showMap'));
      },
      setSort: function (sort) {
        var arrSort;
        this.set('sortProperties', [sort]);
        arrSort = sort.split(':');
        this.set('sort_attribute', arrSort[0]);
        return this.set('sort_order', arrSort[1]);
      },
      clearQuery: function () {
        return this.set('q', null);
      },
      toggleFilter: function () {
        return this.set('hideFilter', false);
      }
    }
  });

  exports.default = MissionsIndexController;
});
define('admin/controllers/missions/new', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsNewController;

  MissionsNewController = Ember.Controller.extend({
    sessionAccount: Ember.inject.service(),
    queryParams: ['activeTab', 'importMode'],
    activeTab: 'newMission',
    importMode: null,
    disableNotifications: Ember.computed('importMode', function () {
      return this.get('importMode') !== 'standard';
    }),
    skipAirspaceCheck: Ember.computed('importMode', function () {
      return this.get('importMode') !== 'standard';
    }),
    testUserId: Ember.computed('ENV.test_user', function () {
      return "" + _environment.default.test_user;
    }),
    formTitle: Ember.computed("importMode", function () {
      if (this.get('importMode') === 'standard') {
        return 'Create Standard Missions';
      } else {
        return 'Create Training Missions';
      }
    }),
    accountRep: Ember.observer('model.mission.package', function () {
      if (this.get('model.mission.package.accountRep') && !this.get('model.mission.accountRep')) {
        return this.set('model.mission.accountRep', this.get('model.mission.package.accountRep'));
      }
    }),
    actions: {
      setTab: function (tab) {
        return this.set('activeTab', tab);
      },
      setMode: function (mode) {
        return this.set('importMode', mode);
      },
      uploadCsv: function () {
        var formData, hasErrors, inputAttachment, selectAdmin, selectPackage;
        hasErrors = false;
        selectPackage = $('#import-csv-form select[name=mission_package_id]');
        selectAdmin = $('#import-csv-form select[name=account_rep_id]');
        inputAttachment = $('#import-csv-form input[name=attachment]');
        if (selectPackage.val() === null) {
          hasErrors = true;
          selectPackage.addClass('error-border');
          $('#csv-package-error').removeClass('hidden');
        } else {
          selectPackage.removeClass('error-border');
          $('#csv-package-error').addClass('hidden');
        }
        if (selectAdmin.val() === null && this.get('importMode') === 'standard') {
          hasErrors = true;
          selectAdmin.addClass('error-border');
          $('#csv-rep-error').removeClass('hidden');
        } else {
          selectAdmin.removeClass('error-border');
          $('#csv-rep-error').addClass('hidden');
        }
        if (inputAttachment.val() === "") {
          hasErrors = true;
          inputAttachment.addClass('error-border');
          $('#csv-file-error').removeClass('hidden');
        } else {
          inputAttachment.removeClass('error-border');
          $('#csv-file-error').addClass('hidden');
        }
        if (hasErrors) {
          return;
        }
        formData = new FormData($('#import-csv-form')[0]);
        formData.set('csv_type', this.get('importMode') || 'standard');
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/client_mission_csvs",
          type: 'POST',
          contentType: false,
          csv_type: this.get('importMode') || 'standard',
          cache: false,
          processData: false,
          headers: this.get('sessionAccount.headers'),
          data: formData,
          enctype: 'multipart/form-data'
        }).then(function (_this) {
          return function (response) {
            return window.location = "/clients/" + _this.get('model.client.id') + "?activeTab=imports";
          };
        }(this), function (response) {
          if (response.status === 422) {
            return alert("Error: make sure all fields are filled out and the file is a csv with the correct format");
          } else {
            return alert("Error: internal server error, try again later");
          }
        });
      }
    }
  });

  exports.default = MissionsNewController;
});
define('admin/controllers/missions/pending-panos', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsPendingPanosController;

  MissionsPendingPanosController = Ember.Controller.extend({
    sessionAccount: Ember.inject.service(),
    queryParams: ['status', 'q'],
    sortProperties: ['created_on:desc'],
    sortedMissions: Ember.computed.sort('model', 'sortProperties'),
    q: null,
    status: null,
    activeCount: Ember.computed('model', function () {
      return this.get('model').length;
    }),
    hideRejectedForm: function (id) {
      return Ember.$("#mission_" + id).hide();
    },
    actions: {
      sortBy: function (sortProperties) {
        return this.set('sortProperties', [sortProperties]);
      },
      clearQuery: function () {
        return this.set('q', null);
      },
      setPanoAccepted: function (mission, accepted) {
        var _this;
        if (!confirm("Set accepted to " + accepted + "?")) {
          return;
        }
        _this = this;
        return Ember.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/responses",
          type: 'POST',
          dataType: 'json',
          headers: this.get('sessionAccount.headers'),
          data: {
            accepted: accepted,
            rejection_notes: mission.get('rejection_notes')
          }
        }).then(function (response) {
          _this.hideRejectedForm(mission.id);
          return mission.reload();
        }, function (response) {});
      },
      toggleRejectedForm: function (id) {
        return Ember.$("#mission_" + id).toggle();
      }
    }
  });

  exports.default = MissionsPendingPanosController;
});
define('admin/controllers/missions/training-missions', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TrainingMissionsController;

  TrainingMissionsController = Ember.Controller.extend({
    sessionAccount: Ember.inject.service(),
    queryParams: ['status', 'q', 'lat', 'lon', 'distance'],
    sortProperties: ['created_on:desc'],
    sortedMissions: Ember.computed.sort('model.missions', 'sortProperties'),
    q: null,
    status: null,
    lat: null,
    lon: null,
    distance: null,
    activeCount: Ember.computed('model', function () {
      return this.get('model.missions').length;
    }),
    testUserId: Ember.computed('ENV.test_user', function () {
      return "" + _environment.default.test_user;
    }),
    hideRejectedForm: function (id) {
      return Ember.$("#mission_" + id).hide();
    },
    actions: {
      sortBy: function (sortProperties) {
        return this.set('sortProperties', [sortProperties]);
      },
      clearQuery: function () {
        return this.set('q', null);
      },
      toggleFilter: function () {
        return this.set('hideFilter', false);
      }
    }
  });

  exports.default = TrainingMissionsController;
});
define('admin/controllers/partner-integration', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PartnerIntegrationController;

  PartnerIntegrationController = Ember.Controller.extend({
    sortedFlightApps: Em.computed('model.flight_apps', function () {
      return this.get('model.flight_apps').sortBy('name');
    }),
    actions: {
      toggleSection: function (section) {
        section.set('opened', !section.get('opened'));
        if (!section.get('activeTab')) {
          section.set('activeTab', 0);
        }
        return false;
      },
      toggleContent: function (tab, section) {
        return section.set('activeTab', tab);
      },
      saveFlightApp: function (flightApp) {
        this.set('selectedApp', flightApp);
        return flightApp.save().then(function (_this) {
          return function () {
            flightApp.set('saved', true);
            return Em.run.later(function () {
              return _this.set('selectedApp.saved', false);
            }, 1500);
          };
        }(this));
      }
    }
  });

  exports.default = PartnerIntegrationController;
});
define('admin/controllers/payouts/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PayoutsIndexController;

  PayoutsIndexController = Ember.Controller.extend({
    queryParams: ['status', 'q'],
    sortProperties: ['created_on:desc'],
    sortedPayouts: Ember.computed.sort('model', 'sortProperties'),
    q: null,
    status: null,
    activeCount: Ember.computed('model', function () {
      return this.get('model').length;
    }),
    actions: {
      sortBy: function (sortProperties) {
        return this.set('sortProperties', [sortProperties]);
      },
      clearQuery: function () {
        return this.set('q', null);
      }
    }
  });

  exports.default = PayoutsIndexController;
});
define('admin/controllers/pilots/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotsIndexController;

  PilotsIndexController = Ember.Controller.extend({
    queryParams: ['q', 'distance', 'statuses[]', 'lat', 'lon'],
    sortProperties: ['distance:asc', 'fullName:asc'],
    sortedPilots: Ember.computed.sort('model', 'sortProperties'),
    q: null,
    activeTab: 'pilots',
    activeModal: null,
    approvedPilots: false,
    lat: null,
    lon: null,
    distance: null,
    statusSelected: Ember.observer('approvedPilots', function () {
      if (this.get('approvedPilots')) {
        return this.set('statuses[]', 'approved');
      } else {
        return this.set('statuses[]', '');
      }
    }),
    actions: {
      sortBy: function (sortProperties) {
        return this.set('sortProperties', [sortProperties]);
      },
      clearQuery: function () {
        return this.set('q', null);
      },
      toggleFilter: function () {
        return this.set('hideFilter', false);
      }
    }
  });

  exports.default = PilotsIndexController;
});
define('admin/controllers/pilots/onboarding', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    hideFilter: false,
    showBadgeOnboardingModal: false,
    badges: [],
    selectedPilots: [],
    selectedDrones: [],
    selectedCameras: [],
    selectedDevices: [],
    selectedLicenses: [],
    selectedBadges: [],
    selectPilotBadgeStatuses: [],
    queryParams: ['q', 'distance', 'statuses[]', 'lat', 'lon', 'drone_ids[]', 'camera_ids[]', 'device_ids[]', 'license_ids[]', 'pilot_badge_status_ids', 'pilot_badge_badge_ids', 'pilot_badge_include', 'pilot_without_badges'],
    sortProperties: ['distance:asc', 'fullName:asc'],
    sortedPilots: Ember.computed.sort('model', 'sortProperties'),
    q: null,
    distance: null,
    statuses: null,
    lat: null,
    lon: null,
    'drone_ids[]': [],
    'camera_ids[]': [],
    'device_ids[]': [],
    'license_ids[]': [],
    'pilot_badge_badge_ids': [],
    'pilot_badge_status_ids': [],
    'pilot_badge_include': true,
    'pilot_without_badges': false,
    activeModal: null,
    checkedAllOnPage: false,
    selectedAllPilots: false,
    deselectAllDisabled: true,

    selectedDronesObserver: Ember.observer('selectedDrones', function () {
      this.set('drone_ids[]', this.get('selectedDrones').getEach('id'));
    }),
    selectedCamerasObserver: Ember.observer('selectedCameras', function () {
      this.set('camera_ids[]', this.get('selectedCameras').getEach('id'));
    }),
    selectedDevicesObserver: Ember.observer('selectedDevices', function () {
      this.set('device_ids[]', this.get('selectedDevices').getEach('id'));
    }),
    selectedLicensesObserver: Ember.observer('selectedLicenses', function () {
      this.set('license_ids[]', this.get('selectedLicenses').getEach('id'));
    }),
    selectedBadgesObserver: Ember.observer('selectedBadges', function () {
      this.set('pilot_badge_badge_ids', this.get('selectedBadges').getEach('id').uniq());
    }),
    selectPilotBadgeStatusesObserver: Ember.observer('selectPilotBadgeStatuses', function () {
      this.set('pilot_badge_status_ids', this.get('selectPilotBadgeStatuses').getEach('id').uniq());
    }),
    selectPilotBadgeIncludeObserver: Ember.observer('pilotBadgeInclude', function () {
      this.set('pilot_badge_include', this.get('pilotBadgeInclude'));
    }),
    pilotWithoutBadgesObserver: Ember.observer('pilotWithoutBadges', function () {
      this.set('pilot_without_badges', this.get('pilotWithoutBadges'));
    }),

    actions: {
      toggleBadgeOnboardingModal() {
        this.set('showBadgeOnboardingModal', !this.get('showBadgeOnboardingModal'));
      },
      checkAllOnPage() {
        this.set('deselectAllDisabled', false);
        this.set('checkedAllOnPage', true);
        Ember.$('tbody.loadable input[type="checkbox"]').prop('checked', true);
        this.set('selectedPilots', this.get('model').toArray());
      },
      selectAllPilots() {
        this.set('deselectAllDisabled', false);
        this.set('selectedAllPilots', true);
        Ember.$('tbody.loadable input[type="checkbox"]').prop('checked', true);
      },
      deselectAll() {
        this.set('deselectAllDisabled', true);
        this.set('selectedAllPilots', false);
        this.set('checkedAllOnPage', false);
        Ember.$('tbody.loadable input[type="checkbox"]').prop('checked', false);
        this.set('selectedPilots', []);
      },
      sortBy(sortProperties) {
        this.set('sortProperties', [sortProperties]);
      },
      clearQuery() {
        this.set('q', null);
      },
      toggleFilter() {
        this.set('hideFilter', !this.get('hideFilter'));
      }
    }
  });
});
define('admin/controllers/pilots/pilot/missions/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotsPilotMissionsIndexController;

  PilotsPilotMissionsIndexController = Ember.Controller.extend({
    badgeSortProps: ['badge.name:asc'],
    queryParams: ['activeTab', 'sort_attribute', 'sort_order'],
    activeTab: 'profile',
    sortProperties: ['scheduled:desc'],
    sort_attribute: 'scheduled',
    sort_order: 'desc',
    pilotBadgeList: Ember.computed.sort('model.pilot.pilot_badges', 'badgeSortProps'),
    badgeSelectList: Ember.computed('model.pilot.pilot_badges', function () {
      var allBadges, badges, pilotBadges;
      allBadges = this.get('model.badges').toArray();
      pilotBadges = this.get('model.pilot.pilot_badges');
      badges = [];
      pilotBadges.forEach(function (pilotBadge) {
        return badges.push(pilotBadge.get('badge'));
      });
      return $(allBadges).not(badges).sort(function (a, b) {
        var aName, bName;
        aName = a.get('name');
        bName = b.get('name');
        return aName.toLowerCase().localeCompare(bName.toLowerCase());
      });
    }),
    actions: {
      addBadge: function (badge) {
        var pb;
        pb = this.store.createRecord('pilot_badge', {
          pilot: this.get('model.pilot'),
          badge: badge
        });
        return pb.save();
      },
      removeBadge: function (pilotBadge) {
        return pilotBadge.destroyRecord();
      },
      setTab: function (tab) {
        return this.set('activeTab', tab);
      },
      setSort: function (sort) {
        var arrSort;
        this.set('sortProperties', [sort]);
        arrSort = sort.split(':');
        this.set('sort_attribute', arrSort[0]);
        return this.set('sort_order', arrSort[1]);
      }
    }
  });

  exports.default = PilotsPilotMissionsIndexController;
});
define('admin/controllers/templates', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesController;

  TemplatesController = Ember.Controller.extend();

  exports.default = TemplatesController;
});
define('admin/controllers/templates/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesIndexController;

  TemplatesIndexController = Ember.Controller.extend({
    templateSortProps: ['name', 'asc'],
    sortedTemplates: Ember.computed.sort('model', 'templateSortProps')
  });

  exports.default = TemplatesIndexController;
});
define('admin/controllers/templates/shots/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesShotsIndexController;

  TemplatesShotsIndexController = Ember.Controller.extend({
    sortedShots: Ember.computed('model', function () {
      return this.get('model').sortBy('name');
    })
  });

  exports.default = TemplatesShotsIndexController;
});
define("admin/data/shot_list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{
    "id": 1,
    "name": "Dolly Shot",
    "notes": "",
    "video": "https://youtu.be/dRhhQi7izjY?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 2,
    "name": "Trucking Shot",
    "notes": "",
    "video": "https://youtu.be/fN9IQiw0nJ8?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 3,
    "name": "Pan Shot",
    "notes": "",
    "video": "https://youtu.be/-9yHN8MJ2GM?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 4,
    "name": "Crane Shot",
    "notes": "",
    "video": "https://youtu.be/jDrgGN7PMeE?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 5,
    "name": "Tilt Shot",
    "notes": "",
    "video": "https://youtu.be/Sl7dA8yj4hY?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 6,
    "name": "Reveal Shot",
    "notes": "",
    "video": "https://youtu.be/ZRurLFqWiJQ?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 7,
    "name": "360 Spin Shot",
    "notes": "",
    "video": "https://youtu.be/tu5Bf3sadeY?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 8,
    "name": "Orbit Shot",
    "notes": "",
    "video": "https://youtu.be/6CuXIrVn4uQ?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 9,
    "name": "Birds Eye Shot",
    "notes": "",
    "video": "https://youtu.be/3svMcAKIEGI?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 10,
    "name": "Rise + Reverse Away Shot",
    "notes": "",
    "video": "https://youtu.be/Qp1fncXodFQ?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F"
  }, {
    "id": 99,
    "name": "Custom",
    "notes": "",
    "video": ""
  }];
});
define('admin/feature-manager', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FEATURE_MODULE,
      bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  FEATURE_MODULE = function () {
    var FeatureManager;
    FeatureManager = function () {
      function FeatureManager(name) {
        this.showDispatchSorting = bind(this.showDispatchSorting, this);
        this.showOnsiteContacts = bind(this.showOnsiteContacts, this);
        var user;
        user = {
          'key': 'ALL_USERS'
        };
        this.ldclient = LDClient.initialize(_environment.default.launchDarklyClientKey, user);
        this.ldclient.on('ready', function (_this) {
          return function () {
            return console.log('launchdarkly loaded:: ' + 'environment: ' + _environment.default.environment + ' values: ' + JSON.stringify(_this.ldclient.allFlags()));
          };
        }(this));
        this.ldclient.on('change', function (_this) {
          return function (settings) {
            return console.log('ld flags changed:' + JSON.stringify(settings));
          };
        }(this));
      }

      FeatureManager.prototype.showOnsiteContacts = function () {
        return this.ldclient.variation('onsite-contacts-enabled-admin', true);
      };

      FeatureManager.prototype.showDispatchSorting = function () {
        return this.ldclient.variation('pilot-score-displayed-admin', true);
      };

      return FeatureManager;
    }();
    return {
      'FeatureManager': new FeatureManager()
    };
  };

  exports.default = FEATURE_MODULE(FEATURE_MODULE || {});
});
define('admin/helpers/and', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AndHelper;

  AndHelper = Ember.Helper.helper(function (arg) {
    var value1, value2;
    value1 = arg[0], value2 = arg[1];
    return value1 && value2;
  });

  exports.default = AndHelper;
});
define('admin/helpers/app-version', ['exports', 'admin/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('admin/helpers/asset-share-header', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetShareHeaderHelper, assetShareHeader;

  exports.assetShareHeader = assetShareHeader = function (arg) {
    var shareable, text;
    shareable = arg[0];
    text = shareable.get('constructor.modelName') === 'mission' ? "Share link to all final assets for property <b>" + shareable.get('location.name') + "</b>" : "Share link to " + shareable.get('constructor.modelName') + " for property <b>" + shareable.get('mission.location.name') + "</b>";
    return new Ember.String.htmlSafe(text);
  };

  AssetShareHeaderHelper = Ember.Helper.helper(assetShareHeader);

  exports.assetShareHeader = assetShareHeader;
  exports.default = AssetShareHeaderHelper;
});
define('admin/helpers/changeset', ['exports', 'ember-changeset-validations/helpers/changeset'], function (exports, _changeset) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _changeset.default;
    }
  });
  Object.defineProperty(exports, 'changeset', {
    enumerable: true,
    get: function () {
      return _changeset.changeset;
    }
  });
});
define('admin/helpers/check-if', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CheckIfHelper;

  CheckIfHelper = Ember.Helper.helper(function (arg) {
    var lvalue, operator, operators, rvalue;
    lvalue = arg[0], operator = arg[1], rvalue = arg[2];
    if (lvalue.length === 0 || operator.length === 0 || rvalue.length === 0) {
      throw new Error('Handlerbars Helper \'checkIf\' needs 2 parameters and an operator');
    }
    operators = {
      '==': function (l, r) {
        return l === r;
      },
      '===': function (l, r) {
        return l === r;
      },
      '!=': function (l, r) {
        return l !== r;
      },
      '<': function (l, r) {
        return l < r;
      },
      '>': function (l, r) {
        return l > r;
      },
      '<=': function (l, r) {
        return l <= r;
      },
      '>=': function (l, r) {
        return l >= r;
      },
      '||': function (l, r) {
        return l || r;
      },
      'typeof': function (l, r) {
        return typeof l === r;
      }
    };
    if (!operators[operator]) {
      throw new Error('Handlerbars Helper \'checkIf\' doesn\'t know the operator ' + operator);
    }
    return operators[operator](lvalue, rvalue);
  });

  exports.default = CheckIfHelper;
});
define('admin/helpers/concat', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ConcatHelper, concat;

  exports.concat = concat = function (arg) {
    var strings;
    strings = arg.strings;
    return strings.join('');
  };

  ConcatHelper = Ember.Helper.helper(concat);

  exports.concat = concat;
  exports.default = ConcatHelper;
});
define('admin/helpers/dig-index-of', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([arr, index, key]) {
      return arr[index][key];
    }
  });
});
define('admin/helpers/either', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var EitherHelper;

  EitherHelper = Ember.Helper.helper(function (arg) {
    var value1, value2;
    value1 = arg[0], value2 = arg[1];
    return value1 || value2;
  });

  exports.default = EitherHelper;
});
define('admin/helpers/empty-or-includes', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var emptyOrIncludes = exports.emptyOrIncludes = function (arg) {
    var el, obj;
    obj = arg[0], el = arg[1];
    return obj.length <= 0 || obj.includes(el);
  };

  exports.default = Ember.Helper.helper(emptyOrIncludes);
});
define("admin/helpers/format-distance", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FormatDistanceHelper, formatDistance;

  exports.formatDistance = formatDistance = function (arg) {
    var distance, milename, ref;
    distance = arg[0], milename = (ref = arg[1]) != null ? ref : "mi";
    if (distance != null) {
      distance = Number.parseFloat(distance);
      return distance.toFixed(2) + " " + milename;
    }
  };

  FormatDistanceHelper = Ember.Helper.helper(formatDistance);

  exports.formatDistance = formatDistance;
  exports.default = FormatDistanceHelper;
});
define("admin/helpers/format-dollar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FormatDollarHelper, formatDollar;

  exports.formatDollar = formatDollar = function (arg) {
    var amount;
    amount = arg[0];
    if (amount != null) {
      return "$" + amount / 100;
    }
  };

  FormatDollarHelper = Ember.Helper.helper(formatDollar);

  exports.formatDollar = formatDollar;
  exports.default = FormatDollarHelper;
});
define('admin/helpers/format-float', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatFloat = formatFloat;


  // Format the number to the given number of decimal places
  function formatFloat([number, precision]) {
    if (number || number == 0) {
      const float = Number.parseFloat(number);
      return float.toFixed(precision);
    }
  }

  exports.default = Ember.Helper.helper(formatFloat);
});
define('admin/helpers/format-money', ['exports', 'accounting/helpers/format-money'], function (exports, _formatMoney) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _formatMoney.default;
});
define('admin/helpers/format-number', ['exports', 'accounting/helpers/format-number'], function (exports, _formatNumber) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _formatNumber.default;
});
define("admin/helpers/format-percent", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FormatPercentHelper, formatPercent;

  exports.formatPercent = formatPercent = function (arg) {
    var amount, number;
    amount = arg[0];
    if (amount != null) {
      number = (amount * 100).toFixed(0);
      return number + "%";
    }
  };

  FormatPercentHelper = Ember.Helper.helper(formatPercent);

  exports.formatPercent = formatPercent;
  exports.default = FormatPercentHelper;
});
define('admin/helpers/format-timeslot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([start, end, timezone]) {
      return moment.tz(start, timezone).format('h:mm') + ' - ' + moment.tz(end, timezone).format('h:mm A');
    }
  });
});
define('admin/helpers/ignore-children', ['exports', 'ember-ignore-children-helper/helpers/ignore-children'], function (exports, _ignoreChildren) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ignoreChildren.default;
    }
  });
  Object.defineProperty(exports, 'ignoreChildren', {
    enumerable: true,
    get: function () {
      return _ignoreChildren.ignoreChildren;
    }
  });
});
define('admin/helpers/includes', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.includes = includes;


  // Format the number to the given number of decimal places
  function includes([obj, el]) {
    return obj.includes(el);
  }

  exports.default = Ember.Helper.helper(includes);
});
define('admin/helpers/initialize', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([name]) {
      return name.split(" ").map(name => name[0].toUpperCase()).join('');
    }
  });
});
define('admin/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
define('admin/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
define('admin/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
define('admin/helpers/is-blank', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([val]) {
      return val == undefined || val == null;
    }
  });
});
define('admin/helpers/is-checked', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IsCheckedHelper;

  IsCheckedHelper = Ember.Helper.helper(function (arg) {
    var leftSide, ref, rightSide;
    leftSide = arg[0], rightSide = arg[1];
    return (ref = leftSide === rightSide) != null ? ref : {
      'checked': ''
    };
  });

  exports.default = IsCheckedHelper;
});
define('admin/helpers/is-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IsEqualHelper;

  IsEqualHelper = Ember.Helper.helper(function (arg) {
    var leftSide, rightSide;
    leftSide = arg[0], rightSide = arg[1];
    return leftSide === rightSide;
  });

  exports.default = IsEqualHelper;
});
define('admin/helpers/is-in', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IsInHelper;

  IsInHelper = Ember.Helper.helper(function (arg) {
    var array, element;
    element = arg[0], array = arg[1];
    return array.indexOf(element) > -1;
  });

  exports.default = IsInHelper;
});
define('admin/helpers/is-not', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IsNotHelper;

  IsNotHelper = Ember.Helper.helper(function (arg) {
    var value;
    value = arg[0];
    return !value;
  });

  exports.default = IsNotHelper;
});
define('admin/helpers/is-present', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Helper.extend({
    compute([val]) {
      return val != undefined && val != null;
    }
  });
});
define('admin/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
define('admin/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
define('admin/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
define('admin/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
define('admin/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
define('admin/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
define('admin/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('admin/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
define('admin/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
define('admin/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
define('admin/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
define('admin/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
define('admin/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
define('admin/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
define('admin/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('admin/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
define('admin/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
define('admin/helpers/pluralize', ['exports', 'ember-inflector'], function (exports, _emberInflector) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pluralize = pluralize;
  function pluralize(params, options) {
    let [count, word] = params;
    const { omitCount } = options;

    if (count !== 1) {
      count = count || 0;
      word = (0, _emberInflector.pluralize)(word);
    }

    return (omitCount ? '' : count + ' ') + word;
  }

  exports.default = Ember.Helper.helper(pluralize);
});
define('admin/helpers/rating-stars', ['exports'], function (exports) {
		'use strict';

		Object.defineProperty(exports, "__esModule", {
				value: true
		});
		exports.default = Ember.Helper.extend({
				compute([rating]) {
						return [1, 2, 3, 4, 5].map(function (index) {
								if (rating >= index) {
										return 'yellow_star.svg';
								} else {
										return 'white_empty_star.svg';
								}
						});
				}
		});
});
define('admin/helpers/read-path', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ReadPathHelper;

  ReadPathHelper = Ember.Helper.helper(function (arg) {
    var object, path;
    object = arg[0], path = arg[1];
    return Ember.get(object, path);
  });

  exports.default = ReadPathHelper;
});
define('admin/helpers/simple-mde-preview', ['exports', 'ember-simplemde/helpers/simple-mde-preview'], function (exports, _simpleMdePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _simpleMdePreview.default;
    }
  });
  Object.defineProperty(exports, 'simpleMdePreview', {
    enumerable: true,
    get: function () {
      return _simpleMdePreview.simpleMdePreview;
    }
  });
});
define('admin/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('admin/helpers/titleize', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TitleizeHelper;

  TitleizeHelper = Ember.Helper.helper(function (arg) {
    var string;
    string = arg[0];
    return string.split('_').map(function (st) {
      return st.charAt(0).toUpperCase() + st.slice(1);
    }).join(' ');
  });

  exports.default = TitleizeHelper;
});
define('admin/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('admin/helpers/utc', ['exports', 'ember-moment/helpers/utc'], function (exports, _utc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(exports, 'utc', {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
define('admin/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _addModalsContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'add-modals-container',
    initialize: _addModalsContainer.default
  };
});
define('admin/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'admin/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('admin/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('admin/initializers/crumbly', ['exports', 'ember-crumbly/initializers/crumbly'], function (exports, _crumbly) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _crumbly.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _crumbly.initialize;
    }
  });
});
define('admin/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('admin/initializers/ember-pusher-injections', ['exports', 'ember-pusher/initializers/ember-pusher-injections'], function (exports, _emberPusherInjections) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPusherInjections.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberPusherInjections.initialize;
    }
  });
});
define('admin/initializers/ember-simple-auth', ['exports', 'admin/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.baseURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
define('admin/initializers/export-application-global', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
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

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('admin/initializers/model-locale', ['exports', 'ember-model-validator/initializers/model-locale'], function (exports, _modelLocale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _modelLocale.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _modelLocale.initialize;
    }
  });
});
define('admin/initializers/viewport-config', ['exports', 'ember-in-viewport/initializers/viewport-config'], function (exports, _viewportConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _viewportConfig.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _viewportConfig.initialize;
    }
  });
});
define("admin/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('admin/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize() {}
  };
});
define('admin/mirage-factories/post', ['exports', 'ember-infinity/mirage-factories/post'], function (exports, _post) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _post.default;
    }
  });
});
define('admin/mixins/css-class-namespace', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CssClassNamespaceMixin;

  CssClassNamespaceMixin = Ember.Mixin.create({
    setupController: function (controller, model) {
      this._super(controller, model);
      return this.addCssNamespace();
    },
    deactivate: function () {
      this._super();
      return this.removeCssNamespace();
    },
    addCssNamespace: function () {
      return Ember.$('body').addClass(this.routeNameToCssClass());
    },
    removeCssNamespace: function () {
      return Ember.$('body').removeClass(this.routeNameToCssClass());
    },
    routeNameToCssClass: function () {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });

  exports.default = CssClassNamespaceMixin;
});
define('admin/mixins/mission-share', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShareMixin;

  MissionShareMixin = Ember.Mixin.create({
    actions: {
      shareShareable: function (shareable, promise) {
        var share;
        share = this.get('store').createRecord('share', {
          shareable: shareable
        });
        return share.save().then(function (response) {
          return promise.resolve(response);
        }, function (response) {
          share.destroyRecord();
          return promise.reject(response);
        });
      }
    }
  });

  exports.default = MissionShareMixin;
});
define('admin/mixins/model-validator', ['exports', 'ember-model-validator/mixins/model-validator'], function (exports, _modelValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _modelValidator.default;
});
define('admin/mixins/object-validator', ['exports', 'ember-model-validator/mixins/object-validator'], function (exports, _objectValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _objectValidator.default;
});
define('admin/mixins/s3-asset-uploads', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetAdapter, MissionAdapter, S3AssetUploadsMixin;

  MissionAdapter = function () {
    function MissionAdapter() {}

    MissionAdapter.prototype.xhrAPIRequestUrl = function (file_type, model) {
      return _environment.default.api.host + "/v1/admin/missions/" + model.mission.id + "/" + file_type + "s";
    };

    MissionAdapter.prototype.s3SignedUrl = function (model) {
      return _environment.default.api.host + "/v1/admin/missions/" + model.mission.id + "/s3_upload_request";
    };

    MissionAdapter.prototype.saveAsset = function (file_type, asset, model) {
      return model.mission.get(file_type + 's').unshiftObject(asset);
    };

    return MissionAdapter;
  }();

  AssetAdapter = function () {
    function AssetAdapter() {}

    AssetAdapter.prototype.xhrAPIRequestUrl = function (file_type, model) {
      return _environment.default.api.host + "/v1/admin/assets/" + file_type + "s";
    };

    AssetAdapter.prototype.s3SignedUrl = function (model) {
      return _environment.default.api.host + "/v1/admin/assets/s3_upload_request";
    };

    AssetAdapter.prototype.saveAsset = function (file_type, asset, model) {};

    return AssetAdapter;
  }();

  S3AssetUploadsMixin = Ember.Mixin.create({
    getAdapter: function () {
      if (!this.adapter) {
        if (this.routeName === 'global_assets') {
          this.adapter = new AssetAdapter();
        } else if (this.routeName === 'missions.edit') {
          this.adapter = new MissionAdapter();
        }
      }
      return this.adapter;
    },
    session: Ember.inject.service(),
    headers: {},
    s3SignedUrl: {},
    setupController: function (controller, model) {
      this._super(controller, model);
      return this.setAuthHeaders(model);
    },
    actions: {
      addAsset: function (file, shot_id) {
        var _this, fileType, model, s3;
        _this = this;
        model = this.modelFor(this.routeName);
        if (file != null) {
          fileType = file.get('type').match(/video|image|zip/)[0];
          if (fileType === 'zip') {
            fileType = 'panorama';
          }
          s3 = this.s3SignedUrl[fileType];
          return file.prepareForUpload(s3.url, {
            data: s3.credentials
          }).then(function (response) {
            var data;
            data = {
              asset_url: unescape(response.headers.location)
            };
            if (file.raw) {
              data['source_type'] = 'raw';
            } else if (fileType === 'panorama') {} else {
              data['source_type'] = 'edit';
            }
            data['shot_id'] = shot_id;
            return _this.xhrAPIRequest(fileType, data, model).then(function (response) {
              return _this.xhrAPIResponse(fileType, response, model);
            }, function (error) {});
          }, function (error) {
            var $xml, xmlDoc;
            if (xmlDoc = Em.$.parseXML(error.response)) {
              $xml = Em.$(xmlDoc);
              return console.log($xml.find('Error').text());
            }
          });
        }
      },
      removeAsset: function (uploader, file) {
        return uploader.removeFile(file.content);
      },
      startUpload: function (uploader) {
        return uploader.start();
      },
      willTransition: function () {
        this.set('headers', {});
        return this.set('s3SignedUrls', {});
      }
    },
    xhrAPIResponse: function (file_type, response, model) {
      var asset;
      this.store.pushPayload(response);
      asset = this.store.peekRecord(file_type, response.data.id);
      return this.getAdapter().saveAsset(file_type, asset, model);
    },
    xhrAPIRequest: function (file_type, data, model) {
      var url;
      url = this.getAdapter().xhrAPIRequestUrl(file_type, model);
      return Ember.$.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        headers: this.get('headers')
      });
    },
    setS3SignedUrl: function (headers, model) {
      var _this;
      _this = this;
      return ['video', 'image', 'panorama'].forEach(function (file_type) {
        return Ember.$.ajax({
          url: _this.getAdapter().s3SignedUrl(model),
          type: 'POST',
          dataType: 'json',
          data: {
            type: file_type
          },
          headers: headers
        }).then(function (response) {
          return _this.s3SignedUrl[file_type] = response;
        });
      });
    },
    setAuthHeaders: function (model) {
      var _promise, _this;
      _this = this;
      return _promise = _this.get('session').authorize('authorizer:devise', function (headerName, headerValue) {
        var hash;
        hash = _this.get('headers');
        hash[headerName] = headerValue;
        _this.set('headers', hash);
        return _this.setS3SignedUrl(hash, model);
      });
    }
  });

  exports.default = S3AssetUploadsMixin;
});
define('admin/models/activity-log', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    created_at: _emberData.default.attr('date'),
    action: _emberData.default.attr('string'),
    user_name: _emberData.default.attr('string'),
    role: _emberData.default.attr('string'),
    details: _emberData.default.attr('string')
  });
});
define('admin/models/admin', ['exports', 'ember-data', 'admin/models/rescheduler'], function (exports, _emberData, _rescheduler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Admin;

  Admin = _rescheduler.default.extend({
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    roles: _emberData.default.attr('array'),
    fullName: Ember.computed('first_name', 'last_name', function () {
      return this.get('first_name') + " " + this.get('last_name');
    }),
    initials: Ember.computed('first_name', 'last_name', function () {
      return "" + this.get('first_name').charAt(0) + this.get('last_name').charAt(0);
    })
  });

  exports.default = Admin;
});
define('admin/models/airspace', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Airspace;

  Airspace = _emberData.default.Model.extend({
    city: _emberData.default.attr('string'),
    ceiling: _emberData.default.attr('number'),
    name: _emberData.default.attr('string'),
    type: _emberData.default.attr('string'),
    code: _emberData.default.attr('string'),
    color: _emberData.default.attr('string'),
    laanc_enabled: _emberData.default.attr('boolean')
  });

  exports.default = Airspace;
});
define('admin/models/badge', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    created_at: _emberData.default.attr('date'),
    required_program: _emberData.default.belongsTo('mindflash_series', { async: false }),
    mindflash_series_name: Ember.computed('required_program', function () {
      return this.get('required_program.name');
    }),
    required_training_package: _emberData.default.belongsTo('training_package', { async: false }),
    training_package_name: Ember.computed('required_training_package', function () {
      return this.get('required_training_package.name');
    }),
    required_checkr_package: _emberData.default.belongsTo('checkr_package', { async: false }),
    checkr_package_name: Ember.computed('required_checkr_package', function () {
      return this.get('required_checkr_package.name');
    }),
    has_requirements: Ember.computed('training_package_name', 'mindflash_series_name', 'checkr_package_name', function () {
      return (this.get('training_package_name') || this.get('mindflash_series_name') || this.get('checkr_package_name')) != null;
    })
  });
});
define('admin/models/category', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Category;

  Category = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    ordinality: _emberData.default.attr('number')
  });

  exports.default = Category;
});
define('admin/models/checkr-package', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string')
  });
});
define('admin/models/client-available-package', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientAvailablePackage;

  ClientAvailablePackage = _emberData.default.Model.extend({
    client: _emberData.default.belongsTo('client', {
      async: false
    }),
    "package": _emberData.default.belongsTo('package', {
      async: false
    })
  });

  exports.default = ClientAvailablePackage;
});
define('admin/models/client-mission-csv', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientMissionCsv;

  ClientMissionCsv = _emberData.default.Model.extend({
    total_rows: _emberData.default.attr('number'),
    mission_created: _emberData.default.attr('number'),
    errors: _emberData.default.attr('number'),
    attachment_csv_url: _emberData.default.attr('string'),
    completed_csv_url: _emberData.default.attr('string'),
    errored_csv_url: _emberData.default.attr('string'),
    status: _emberData.default.attr('string'),
    created_at: _emberData.default.attr('string'),
    client: _emberData.default.belongsTo('client', {
      async: false
    }),
    admin: _emberData.default.belongsTo('admin', {
      async: false
    }),
    default_mission_package: _emberData.default.belongsTo('package', {
      async: false
    }),
    pending: Ember.computed('status', function () {
      return this.get('status') === 'pending';
    }),
    error: Ember.computed('status', function () {
      var errorRegex, status;
      status = this.get('status');
      errorRegex = /error/;
      return errorRegex.exec(status);
    }),
    displayStatus: Ember.computed('status', function () {
      var status;
      status = this.get('status');
      if (status === 'pending' || status === 'processing' || status === 'importing') {
        return 'generating_missions';
      } else if (status === 'complete') {
        return 'generating_reports';
      } else if (status === 'exported') {
        return 'completed';
      } else {
        return status;
      }
    })
  });

  exports.default = ClientMissionCsv;
});
define('admin/models/client', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Client;

  Client = _emberData.default.Model.extend({
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    password: _emberData.default.attr('string'),
    invoiceable: _emberData.default.attr('boolean'),
    company_name: _emberData.default.attr('string'),
    collaborators: _emberData.default.hasMany('collaborators', {
      async: false
    }),
    client_mission_csvs: _emberData.default.hasMany('client_mission_csvs', {
      async: false
    }),
    packages: _emberData.default.hasMany('package', {
      async: false
    }),
    available_packages: _emberData.default.hasMany('client-available-package', {
      async: true
    }),
    organization: _emberData.default.belongsTo('organization', {
      async: false
    }),
    fullName: Ember.computed('first_name', 'last_name', function () {
      return this.get('first_name') + " " + this.get('last_name');
    }),
    companyOrFullName: Ember.computed('company_name', 'fullName', function () {
      if (this.get('company_name')) {
        return this.get('company_name');
      }
      return this.get('fullName');
    })
  });

  exports.default = Client;
});
define('admin/models/collaborator', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Collaborator;

  Collaborator = _emberData.default.Model.extend({
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    mission: _emberData.default.belongsTo('mission', {
      async: false
    }),
    fullName: Ember.computed('first_name', 'last_name', function () {
      return this.get('first_name') + " " + this.get('last_name');
    })
  });

  exports.default = Collaborator;
});
define('admin/models/credit-card', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CreditCard;

  CreditCard = _emberData.default.Model.extend({
    provider_token: _emberData.default.attr('string'),
    brand: _emberData.default.attr('string'),
    last_4: _emberData.default.attr('string'),
    exp_month: _emberData.default.attr('number'),
    exp_year: _emberData.default.attr('number')
  });

  exports.default = CreditCard;
});
define('admin/models/device', ['exports', 'ember-data', 'ember-model-validator/mixins/model-validator'], function (exports, _emberData, _modelValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Device;

  Device = _emberData.default.Model.extend(_modelValidator.default, {
    operating_system: _emberData.default.attr('string'),
    name: _emberData.default.attr('string'),
    device_type: _emberData.default.attr('string'),
    validations: {
      name: {
        presence: true
      },
      operating_system: {
        presence: true
      },
      device_type: {
        presence: true
      }
    }
  });

  exports.default = Device;
});
define('admin/models/drone-camera', ['exports', 'ember-data', 'ember-model-validator/mixins/model-validator'], function (exports, _emberData, _modelValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneCamera;

  DroneCamera = _emberData.default.Model.extend(_modelValidator.default, {
    name: _emberData.default.attr('string'),
    drone_manufacturer: _emberData.default.belongsTo('drone-manufacturer', {
      async: false
    }),
    mega_pixels: _emberData.default.attr('number'),
    thermal: _emberData.default.attr('boolean'),
    pilotDrone: _emberData.default.belongsTo('pilot-drone'),
    validations: {
      name: {
        presence: true
      }
    }
  });

  exports.default = DroneCamera;
});
define('admin/models/drone-manufacturer', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DroneManufacturer;

  DroneManufacturer = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    drones: _emberData.default.hasMany('drone')
  });

  exports.default = DroneManufacturer;
});
define('admin/models/drone', ['exports', 'ember-data', 'ember-model-validator/mixins/model-validator'], function (exports, _emberData, _modelValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Drone;

  Drone = _emberData.default.Model.extend(_modelValidator.default, {
    name: _emberData.default.attr('string'),
    drone_type: _emberData.default.attr('string'),
    stock_cameras: _emberData.default.hasMany('drone-camera', {
      async: false
    }),
    optional_cameras: _emberData.default.hasMany('drone-camera', {
      async: false
    }),
    drone_manufacturer: _emberData.default.belongsTo('drone-manufacturer', {
      async: false
    }),
    validations: {
      name: {
        presence: true
      },
      drone_type: {
        presence: true
      }
    },
    full_name: Ember.computed('name', 'drone_manufacturer', function () {
      return this.get('drone_manufacturer.name') + ' ' + this.get('name');
    }),
    displayedOptionalCameras: Ember.computed('optional_cameras.[]', function () {
      var camera, cameraString, i, index, len, length, ref, results;
      cameraString = '';
      length = this.get('optional_cameras.length') - 1;
      ref = this.get('optional_cameras');
      results = [];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        camera = ref[index];
        if (index === length) {
          results.push(cameraString += camera);
        } else {
          results.push(cameraString += camera + ', ');
        }
      }
      return results;
    })
  });

  exports.default = Drone;
});
define('admin/models/flight-app', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FlightApp;

  FlightApp = _emberData.default.Model.extend({
    data_type: _emberData.default.attr('string'),
    deliver_to_app: _emberData.default.attr('string'),
    name: _emberData.default.attr('string'),
    slug: _emberData.default.attr('string'),
    pilot_flight_instruction: _emberData.default.attr('hash'),
    pilot_flight_description: _emberData.default.attr('hash'),
    pilot_delivery_description: _emberData.default.attr('hash'),
    pilot_delivery_instruction: _emberData.default.attr('hash')
  });

  exports.default = FlightApp;
});
define('admin/models/global-image', ['exports', 'admin/models/imageable'], function (exports, _imageable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _imageable.default.extend({});
});
define('admin/models/hold', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Hold;

  Hold = _emberData.default.Model.extend({
    reason: _emberData.default.attr('string'),
    reason_notes: _emberData.default.attr('string'),
    held_by: _emberData.default.attr('string'),
    created_at: _emberData.default.attr('string')
  });

  exports.default = Hold;
});
define('admin/models/image-marker', ['exports', 'ember-data', 'admin/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    gps_latitude: _emberData.default.attr('string'),
    gps_longitude: _emberData.default.attr('string'),
    shot: _emberData.default.belongsTo('shot', { async: false }),
    mission: _emberData.default.belongsTo('mission', { async: false })
  });
});
define('admin/models/image', ['exports', 'admin/models/imageable'], function (exports, _imageable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _imageable.default.extend({});
});
define('admin/models/imageable', ['exports', 'ember-data', 'admin/models/shareable', 'admin/config/environment'], function (exports, _emberData, _shareable, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _shareable.default.extend({
    url: _emberData.default.attr('string'),
    name: _emberData.default.attr('string'),
    version_urls: _emberData.default.attr(),
    processing: _emberData.default.attr('boolean'),
    missing_gps_info: _emberData.default.attr('boolean'),
    height: _emberData.default.attr('string'),
    width: _emberData.default.attr('string'),
    source_type: _emberData.default.attr('string'),
    gps_latitude: _emberData.default.attr('number'),
    gps_longitude: _emberData.default.attr('number'),
    gps_altitude: _emberData.default.attr('number'),
    mission: _emberData.default.belongsTo('mission'),
    shot: _emberData.default.belongsTo('shot'),
    isRawAndMissingGpsInfo: Ember.computed('missing_gps_info', 'final', function () {
      return this.get('missing_gps_info') && !this.get('final');
    }),
    downloadUrl: Ember.computed('version_urls.{}', function () {
      return this.get('version_urls.download');
    }),
    thumbnail: Ember.computed('version_urls.{}', 'url', 'processing', function () {
      if (this.get('processing')) {
        return 'assets/images/processing_square_640.jpg';
      } else {
        return this.get('version_urls.square_640');
      }
    }),
    final: Ember.computed('source_type', function () {
      return this.get('source_type') === 'edit';
    })
  });
});
define('admin/models/laanc-flight', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LaancFlight;

  LaancFlight = _emberData.default.Model.extend({
    authorizations: _emberData.default.attr('')
  });

  exports.default = LaancFlight;
});
define('admin/models/license', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var License;

  License = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    country_code: _emberData.default.attr('string')
  });

  exports.default = License;
});
define('admin/models/location', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Location;

  Location = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    latitude: _emberData.default.attr('string'),
    longitude: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    address2: _emberData.default.attr('string'),
    city: _emberData.default.attr('string'),
    state: _emberData.default.attr('string'),
    postal_code: _emberData.default.attr('string'),
    country: _emberData.default.attr('string'),
    formatted_address: _emberData.default.attr('string'),
    properties: _emberData.default.attr(),
    timezone_id: _emberData.default.attr('string'),
    missions: _emberData.default.hasMany('mission'),
    client: _emberData.default.belongsTo('client'),
    currentLocalTime: Ember.computed('timezone_id', function () {
      return moment.tz(moment(), this.get('timezone_id')).format('MM/DD/YYYY hh:mm A z');
    })
  });

  exports.default = Location;
});
define('admin/models/mindflash-course', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string')
  });
});
define('admin/models/mindflash-series', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string')
  });
});
define('admin/models/mission-flight-app', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionFlightApp;

  MissionFlightApp = _emberData.default.Model.extend({
    flight_app: _emberData.default.belongsTo('flight_app', {
      async: false
    }),
    mission: _emberData.default.belongsTo('mission', {
      async: false
    }),
    value: _emberData.default.attr('raw'),
    delivery_to_url: _emberData.default.attr('string')
  });

  exports.default = MissionFlightApp;
});
define('admin/models/mission-hold-reason', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionHoldReason;

  MissionHoldReason = _emberData.default.Model.extend({
    name: _emberData.default.attr('string')
  });

  exports.default = MissionHoldReason;
});
define('admin/models/mission-reschedule', ['exports', 'ember-data', 'admin/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionReschedule;

  MissionReschedule = _emberData.default.Model.extend({
    mission: _emberData.default.belongsTo('mission'),
    reschedule_reason: _emberData.default.belongsTo('reschedule-reason'),
    notes: _emberData.default.attr('string'),
    scheduled_at_start: _emberData.default.attr('string'),
    scheduled_at_end: _emberData.default.attr('string'),
    rescheduler: _emberData.default.belongsTo('rescheduler', {
      polymorphic: true,
      inverse: 'mission_reschedules'
    }),
    "delete": function () {
      var adapter;
      adapter = this.store.adapterFor(this.constructor.modelName);
      return adapter["delete"](this);
    }
  });

  exports.default = MissionReschedule;
});
define('admin/models/mission', ['exports', 'ember-data', 'admin/models/shareable'], function (exports, _emberData, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Mission;

  Mission = _shareable.default.extend({
    status: _emberData.default.attr('string'),
    created_on: _emberData.default.attr('string'),
    updated_at: _emberData.default.attr('string'),
    pusher_updated_at: _emberData.default.attr('string'),
    instructions: _emberData.default.attr('string'),
    payment_token: _emberData.default.attr('string'),
    internal_notes: _emberData.default.attr('string'),
    internal_production_notes: _emberData.default.attr('string'),
    scheduled_at: _emberData.default.attr('string'),
    scheduled_at_start: _emberData.default.attr('string'),
    scheduled_at_end: _emberData.default.attr('string'),
    admin_scheduled: _emberData.default.attr('boolean'),
    estimated_payout: _emberData.default.attr('string'),
    estimated_pilot_payout: _emberData.default.attr('string'),
    estimated_editor_payout: _emberData.default.attr('string'),
    external_assets_url: _emberData.default.attr('string'),
    disable_notifications: _emberData.default.attr('boolean'),
    archives_ready: _emberData.default.attr('boolean'),
    archive_url: _emberData.default.attr('string'),
    price: _emberData.default.attr('string'),
    airspace_check_status: _emberData.default.attr('string'),
    accepted: _emberData.default.attr('string'),
    rejection_notes: _emberData.default.attr('string'),
    rejected_by: _emberData.default.attr('string'),
    pilot_comment: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    mission_type: _emberData.default.attr('string'),
    tags: _emberData.default.attr(),
    client_notes: _emberData.default.attr('string'),
    salesforce_opportunity_id: _emberData.default.attr('string'),
    archived_at: _emberData.default.attr('string'),
    reference_id: _emberData.default.attr('string'),
    pilot: _emberData.default.belongsTo('pilot', {
      async: true
    }),
    client: _emberData.default.belongsTo('client', {
      async: false
    }),
    category: _emberData.default.belongsTo('category', {
      async: true
    }),
    onsite_contact: _emberData.default.belongsTo('onsite_contact', {
      async: false
    }),
    accountRep: _emberData.default.belongsTo('admin', {
      async: false
    }),
    productionRep: _emberData.default.belongsTo('admin', {
      async: false
    }),
    operationRep: _emberData.default.belongsTo('admin', {
      async: false
    }),
    "package": _emberData.default.belongsTo('package', {
      async: false
    }),
    location: _emberData.default.belongsTo('location', {
      async: false
    }),
    credit_card: _emberData.default.belongsTo('credit_card', {
      async: true
    }),
    point_of_interest: _emberData.default.belongsTo('point_of_interest', {
      async: true
    }),
    parent: _emberData.default.belongsTo('mission', {
      inverse: null,
      async: false
    }),
    admin: _emberData.default.belongsTo('admin', {
      async: false
    }),
    mission_flight_app: _emberData.default.belongsTo('mission_flight_app', {
      async: false
    }),
    payouts: _emberData.default.hasMany('payout', {
      async: true
    }),
    shots: _emberData.default.hasMany('shot', {
      async: false
    }),
    collaborators: _emberData.default.hasMany('collaborator', {
      async: false
    }),
    notified_pilots: _emberData.default.hasMany('notified_pilot', {
      async: true
    }),
    laanc_flights: _emberData.default.hasMany('laanc_flight'),
    laanc_exemptions: _emberData.default.hasMany('airspace'),
    advisories: _emberData.default.hasMany('airspace'),
    mission_reschedules: _emberData.default.hasMany('mission_reschedule'),
    zendesk_tickets: _emberData.default.hasMany('zendesk_ticket', {
      async: true
    }),
    images: _emberData.default.hasMany('images', {
      async: true
    }),
    images_markers: _emberData.default.hasMany('image_markers', {
      async: true
    }),
    videos: _emberData.default.hasMany('videos', {
      async: true
    }),
    panoramas: _emberData.default.hasMany('panoramas', {
      async: true
    }),
    activity_logs: _emberData.default.hasMany('activity_logs', {
      async: true
    }),
    parent_id: _emberData.default.attr('string'),
    rejection_reason: _emberData.default.attr('string'),
    reshoot_mission_id: _emberData.default.attr('string'),
    rejection_admin: _emberData.default.belongsTo('admin', {
      async: false
    }),
    hold: _emberData.default.belongsTo('hold', {
      async: false
    }),
    is_on_hold: _emberData.default.attr('boolean'),
    ready_for_auto_dispatch: _emberData.default.attr('boolean'),
    pilot_rating: _emberData.default.belongsTo('rating', {
      async: false
    }),
    pusherSubscribers: [],
    pilot_zendesk_ticket_url: Ember.computed('zendesk_tickets', function () {
      var ticket;
      ticket = this.get('zendesk_tickets').toArray().find(function (ticket) {
        return ticket.get('user_type') === 'pilot';
      });
      if (ticket) {
        return ticket.get('url');
      } else {
        return null;
      }
    }),
    pilot_invitations_dispatch: _emberData.default.belongsTo('pilot_invitations_dispatch', {
      async: false
    }),
    hasMissionFlightApp: Ember.computed('mission_flight_app', function () {
      return !!this.get('mission_flight_app.id');
    }),
    statusTimeStamp: Ember.computed('activity_logs', 'status', function () {
      var obj;
      obj = this.get('activity_logs').find(function (_this) {
        return function (el) {
          return el.action === _this.get('status');
        };
      }(this));
      if (obj) {
        return obj.created_at;
      } else {
        return null;
      }
    }),
    formattedMissionType: Ember.computed('mission_type', function () {
      switch (this.get('mission_type')) {
        case 'creative':
          return 'Creative Mission';
        case 'panorama':
          return 'Panorama Mission';
        case 'client':
          return 'Client Mission';
        default:
          return 'Other';
      }
    }),
    checkAirspace: function () {
      var adapter, path, store;
      store = this.get('store');
      adapter = store.adapterFor('mission');
      path = adapter.buildURL('mission');
      console.log(path);
      return adapter.ajax(path + "/" + this.get('id') + "/check_airspace", 'post').then(function (responseJson) {
        return store.pushPayload(responseJson);
      });
    },
    isNotAirspaceChecked: Ember.computed('airspace_check_status', function () {
      return this.get('airspace_check_status') !== 'complete';
    }),
    isPano: Ember.computed('package.fullName', function () {
      if (this.get('point_of_interest')) {
        return true;
      } else {
        return false;
      }
    }),
    isPanoDelivered: Ember.computed('status', function () {
      if (this.get('status') === 'assets_classified') {
        return true;
      } else {
        return false;
      }
    }),
    isScheduled: Ember.computed('scheduled_at_start', 'scheduled_at_end', 'scheduledAtStartSaved', 'scheduledAtEndSaved', function () {
      return this.get('scheduled_at_start') && this.get('scheduled_at_end') && this.get('scheduledAtStartSaved') && this.get('scheduledAtEndSaved');
    }),
    scheduledAtStartSaved: Ember.computed('scheduled_at_start', function () {
      return !this.changedAttributes()['scheduled_at_start'];
    }),
    scheduledAtEndSaved: Ember.computed('scheduled_at_start', function () {
      return !this.changedAttributes()['scheduled_at_start'];
    }),
    completedPanos: Ember.computed('panoramas', function () {
      return this.get('panoramas').filter(function (item, index, enumerable) {
        return !item.get('processing');
      });
    }),
    hasCompletedPano: Ember.computed('completedPanos', function () {
      return this.get('completedPanos').length > 0;
    }),
    flightCompletedOn: Ember.computed('activity_logs', function () {
      var i, len, ref, statusObj;
      ref = this.get('activity_logs');
      for (i = 0, len = ref.length; i < len; i++) {
        statusObj = ref[i];
        if (statusObj.action === 'flight_complete') {
          return statusObj.created_at;
        }
      }
    }),
    readyForReview: Ember.computed('hasCompletedPano', 'pilotPanoCompleted', function () {
      return this.get('hasCompletedPano') && !this.get('pilotPanoCompleted');
    }),
    assetsCount: Ember.computed('images.[]', 'videos.[]', function () {
      return this.get('images.length') + this.get('videos.length');
    }),
    isShareable: Ember.computed('status', function () {
      return ['awaiting_payment', 'invoice_needed', 'invoiced', 'complete'].includes(this.get('status'));
    }),
    pilotPanoCompleted: Ember.computed('status', function () {
      return ['in_production', 'awaiting_payment', 'invoice_needed', 'invoiced', 'complete'].includes(this.get('status'));
    }),
    assetsClassified: Ember.computed('status', function () {
      return ['assets_classified', 'in_production', 'awaiting_payment', 'invoice_needed', 'invoiced', 'complete'].includes(this.get('status'));
    }),
    isOnHold: Ember.computed('is_on_hold', function () {
      return this.get('hold') != null || this.get('is_on_hold');
    }),
    isReshoot: Ember.computed('parent_id', function () {
      return this.get('parent_id') != null;
    }),
    hasReshoot: Ember.computed('status', 'reshoot_mission_id', function () {
      return this.get('status') === 'rejected' && this.get('reshoot_mission_id') != null;
    }),
    needsEstimatedPayout: Ember.computed('estimated_pilot_payout', 'mission_type', function () {
      return this.get('mission_type') !== 'training' && this.get('estimated_pilot_payout') === '0';
    }),
    loadActivityLogs: function () {
      return this.get('store').query('activity-log', {
        missionId: this.get('id')
      }).then(function (_this) {
        return function (activityLogs) {
          return _this.set('activity_logs', activityLogs);
        };
      }(this), function (_this) {
        return function (error) {
          return alert(error);
        };
      }(this));
    },
    loadImages: function () {
      return this.get('store').query('image', {
        missionId: this.get('id')
      }).then(function (_this) {
        return function (images) {
          return _this.set('images', images);
        };
      }(this), function (_this) {
        return function (error) {
          var message;
          if (error.errors) {
            message = error.errors[0].detail;
            return alert(message);
          }
        };
      }(this));
    },
    loadImageMarkers: function () {
      return this.get('store').query('image-marker', {
        missionId: this.get('id')
      }).then(function (_this) {
        return function (images) {
          return _this.set('image_markers', images);
        };
      }(this), function (_this) {
        return function (error) {
          var message;
          if (error.errors) {
            message = error.errors[0].detail;
            return alert(message);
          }
        };
      }(this));
    },
    loadPanoramas: function () {
      return this.get('store').query('panorama', {
        missionId: this.get('id')
      }).then(function (_this) {
        return function (panoramas) {
          return _this.set('panoramas', panoramas);
        };
      }(this));
    },
    loadVideos: function () {
      return this.get('store').query('video', {
        missionId: this.get('id')
      }).then(function (_this) {
        return function (videos) {
          return _this.set('videos', videos);
        };
      }(this));
    },
    regenerateZip: function () {
      var adapter, path, store;
      store = this.get('store');
      adapter = store.adapterFor('mission');
      path = adapter.buildURL('mission');
      console.log(path);
      return adapter.ajax(path + "/" + this.get('id') + "/regenerate_archives", 'post').then(function (_this) {
        return function (responseJson) {
          _this.set('archivesGenerating', true);
          return alert("The zip file is now generating");
        };
      }(this));
    }
  });

  exports.default = Mission;
});
define('admin/models/mission_rejection_reason', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionRejectionReason;

  MissionRejectionReason = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    slug: _emberData.default.attr('string')
  });

  exports.default = MissionRejectionReason;
});
define('admin/models/notified-pilot', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var NotifiedPilot;

  NotifiedPilot = _emberData.default.Model.extend({
    status: _emberData.default.attr('string'),
    created_on: _emberData.default.attr('string'),
    estimated_payout: _emberData.default.attr('string'),
    pilot: _emberData.default.belongsTo('pilot', {
      async: true
    }),
    mission: _emberData.default.belongsTo('mission', {
      async: true
    })
  });

  exports.default = NotifiedPilot;
});
define('admin/models/onsite-contact', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OnsiteContact;

  OnsiteContact = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    call_action: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),
    note: _emberData.default.attr('string'),
    mission: _emberData.default.belongsTo('mission', {
      async: false
    })
  });

  exports.default = OnsiteContact;
});
define('admin/models/organization-available-package', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationAvailablePackage;

  OrganizationAvailablePackage = _emberData.default.Model.extend({
    organization: _emberData.default.belongsTo('organization', {
      async: false
    }),
    "package": _emberData.default.belongsTo('package', {
      async: false
    })
  });

  exports.default = OrganizationAvailablePackage;
});
define('admin/models/organization', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Organization;

  Organization = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    packages: _emberData.default.hasMany('package', {
      async: false
    }),
    available_packages: _emberData.default.hasMany('organization-available-package', {
      async: true
    }),
    clients: _emberData.default.hasMany('client', {
      async: false
    })
  });

  exports.default = Organization;
});
define('admin/models/package', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Package;

  Package = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    price: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    slug: _emberData.default.attr('string'),
    mission_instructions: _emberData.default.attr('string'),
    mission_internal_notes: _emberData.default.attr('string'),
    mission_production_notes: _emberData.default.attr('string'),
    estimated_pilot_payout: _emberData.default.attr('string'),
    salesforce_opportunity_id: _emberData.default.attr('string'),
    vertical: _emberData.default.belongsTo('vertical', {
      async: false
    }),
    organization: _emberData.default.belongsTo('organization', {
      async: true
    }),
    template: _emberData.default.belongsTo('template', {
      async: false
    }),
    client: _emberData.default.belongsTo('client', {
      async: true
    }),
    accountRep: _emberData.default.belongsTo('admin', {
      async: false
    }),
    devices: _emberData.default.hasMany("device"),
    droneCameras: _emberData.default.hasMany("drone_camera"),
    drones: _emberData.default.hasMany("drone"),
    pilotEquipments: _emberData.default.hasMany("pilot_equipment"),
    badge: _emberData.default.belongsTo('badge', {
      async: false
    }),
    badge_required: _emberData.default.attr('boolean'),
    auto_dispatch_enabled: _emberData.default.attr('boolean'),
    camera_mega_pixels: _emberData.default.attr('string'),
    priceInDollars: Ember.computed('price', function () {
      return this.get('price') / 100;
    }),
    fullName: Ember.computed('vertical.short_name', 'name', 'priceInDollars', function () {
      return this.get('vertical.short_name') + " " + this.get('name') + " $" + this.get('priceInDollars');
    }),
    tablets: Ember.computed('devices.@each.device_type', function () {
      return this.get('devices').filter(function (device) {
        return device.get('device_type') === 'tablet';
      });
    }),
    phones: Ember.computed('devices.@each.device_type', function () {
      return this.get('devices').filter(function (device) {
        return device.get('device_type') === 'phone';
      });
    })
  });

  exports.default = Package;
});
define('admin/models/panorama', ['exports', 'ember-data', 'admin/models/shareable', 'admin/config/environment'], function (exports, _emberData, _shareable, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Panorama;

  Panorama = _shareable.default.extend({
    source_type: _emberData.default.attr('string'),
    processing: _emberData.default.attr('boolean'),
    mission: _emberData.default.belongsTo('mission'),
    admin_share: _emberData.default.belongsTo('share'),
    shot: _emberData.default.belongsTo('shot'),
    processing_status: _emberData.default.attr('string'),
    name: _emberData.default.attr('string'),
    final: Ember.computed('source_type', function () {
      return this.get('source_type') === 'edit';
    }),
    accessKey: _emberData.default.attr('string'),
    collabLink: Ember.computed('admin_share', function () {
      return _environment.default.clients.host + "/p/" + this.get('admin_share.id');
    })
  });

  exports.default = Panorama;
});
define('admin/models/payout', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Payout;

  Payout = _emberData.default.Model.extend({
    created_on: _emberData.default.attr('string'),
    amount: _emberData.default.attr('string'),
    notes: _emberData.default.attr('string'),
    payment_processor: _emberData.default.attr('string'),
    payment_id: _emberData.default.attr('string'),
    status: _emberData.default.attr('string'),
    mission: _emberData.default.belongsTo('mission', {
      async: false
    }),
    pilot: _emberData.default.belongsTo('pilot', {
      async: false
    }),
    amountInDollars: Ember.computed('amount', function () {
      return this.get('amount') / 100;
    })
  });

  exports.default = Payout;
});
define('admin/models/pilot-badge', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotBadge;

  PilotBadge = _emberData.default.Model.extend({
    created_at: _emberData.default.attr('string'),
    updated_at: _emberData.default.attr('string'),
    status: _emberData.default.attr('string'),
    pilot: _emberData.default.belongsTo('pilot', {
      async: false
    }),
    badge: _emberData.default.belongsTo('badge', {
      async: false
    }),
    complete: Ember.computed('status', function () {
      return this.get('status') === 'complete';
    })
  });

  exports.default = PilotBadge;
});
define('admin/models/pilot-drone', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotDrone;

  PilotDrone = _emberData.default.Model.extend({
    drone: _emberData.default.belongsTo('drone', {
      async: false
    }),
    pilot: _emberData.default.belongsTo('pilot', {
      async: false
    }),
    cameras: _emberData.default.hasMany('drone-camera', {
      async: false
    }),
    hasOptionalCameras: Ember.computed('cameras.[]', function () {
      return this.get('cameras.length') > 0;
    })
  });

  exports.default = PilotDrone;
});
define('admin/models/pilot-equipment', ['exports', 'ember-data', 'ember-model-validator/mixins/model-validator'], function (exports, _emberData, _modelValidator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotEquipment;

  PilotEquipment = _emberData.default.Model.extend(_modelValidator.default, {
    name: _emberData.default.attr('string'),
    validations: {
      name: {
        presence: true
      }
    }
  });

  exports.default = PilotEquipment;
});
define('admin/models/pilot-invitations-dispatch', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotInvitationsDispatch;

  PilotInvitationsDispatch = _emberData.default.Model.extend({
    dispatch_status: _emberData.default.attr('string'),
    status: Ember.computed('dispatch_status', function () {
      if (this.get('dispatch_status') === 'in_progress') {
        return "(Pilot invitations are being sent automatically)";
      } else if (this.get('dispatch_status') === 'completed') {
        return "Pilot invitation auto-dispatch has completed";
      } else if (this.get('dispatch_status') === 'no_pilots_found') {
        return "Auto dispatch did not find any suitable available pilots";
      }
    })
  });

  exports.default = PilotInvitationsDispatch;
});
define('admin/models/pilot-license', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotLicense;

  PilotLicense = _emberData.default.Model.extend({
    license_number: _emberData.default.attr('string'),
    image: _emberData.default.attr('string'),
    license: _emberData.default.belongsTo('organization', {
      async: false
    })
  });

  exports.default = PilotLicense;
});
define('admin/models/pilot-search-metum', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotSearchMetum;

  PilotSearchMetum = _emberData.default.Model.extend({
    active_missions: _emberData.default.attr('number'),
    invitations: _emberData.default.attr('number'),
    invitation_payout: _emberData.default.attr('number'),
    invitation_date: _emberData.default.attr('string'),
    pilot: _emberData.default.belongsTo('pilot')
  });

  exports.default = PilotSearchMetum;
});
define('admin/models/pilot', ['exports', 'ember-data', 'admin/models/rescheduler'], function (exports, _emberData, _rescheduler) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Pilot;

  Pilot = _rescheduler.default.extend({
    first_name: _emberData.default.attr('string'),
    last_name: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),
    birthday: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    address2: _emberData.default.attr('string'),
    city: _emberData.default.attr('string'),
    state: _emberData.default.attr('string'),
    postal_code: _emberData.default.attr('string'),
    country: _emberData.default.attr('string'),
    travel_distance: _emberData.default.attr('number'),
    drone_system: _emberData.default.attr('string'),
    status: _emberData.default.attr('string'),
    notes: _emberData.default.attr('string'),
    approve: _emberData.default.attr('boolean'),
    reject: _emberData.default.attr('boolean'),
    password: _emberData.default.attr('string'),
    payout: _emberData.default.attr('string'),
    sorted_on: _emberData.default.attr(),
    payment_processor_id: _emberData.default.attr('string'),
    payment_processor: _emberData.default.attr('string'),
    enable_autopay: _emberData.default.attr('boolean'),
    pilot_license: _emberData.default.attr('string'),
    timezone_id: _emberData.default.attr('string'),
    is_available_weekdays: _emberData.default.attr('boolean'),
    is_available_weekends: _emberData.default.attr('boolean'),
    average_rating: _emberData.default.attr('number'),
    checkr_status: _emberData.default.attr('string'),
    checkr_package: _emberData.default.attr('string'),
    pilotEquipment: _emberData.default.hasMany('pilot_equipment', {
      async: false
    }),
    devices: _emberData.default.hasMany('device', {
      async: false
    }),
    drones: _emberData.default.hasMany('pilot_drone', {
      async: false
    }),
    pilot_licenses: _emberData.default.hasMany('license', {
      async: false
    }),
    pilot_badges: _emberData.default.hasMany('pilot_badge', {
      async: false
    }),
    payouts: _emberData.default.hasMany('payouts', {
      async: false
    }),
    pilot_search_metum: _emberData.default.belongsTo('pilot_search_metum', {
      async: false
    }),
    approved: Ember.computed('status', function () {
      return this.get('status') === 'approved';
    }),
    camerasArray: Ember.computed('drones.[]', function () {
      return this.get('drones').map(function (drone) {
        return drone.get('cameras').toArray();
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
    }),
    distance: Ember.computed('sorted_on', function () {
      var sorted_on;
      sorted_on = this.get('sorted_on');
      if (sorted_on != null) {
        return sorted_on.distance;
      }
    }),
    score: Ember.computed('sorted_on', function () {
      var sorted_on;
      sorted_on = this.get('sorted_on');
      if (sorted_on != null) {
        return sorted_on.score;
      }
    }),
    fullName: Ember.computed('first_name', 'last_name', function () {
      return this.get('first_name') + " " + this.get('last_name');
    }),
    payoutInDollars: Ember.computed('total_payout', function () {
      return this.get('payout') / 100;
    })
  });

  exports.default = Pilot;
});
define('admin/models/point-of-interest', ['exports', 'ember-data', 'admin/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PointOfInterest;

  PointOfInterest = _emberData.default.Model.extend();

  exports.default = PointOfInterest;
});
define('admin/models/preset-search-filter', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PresetSearchFilter;

  PresetSearchFilter = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    drones: _emberData.default.hasMany('drone', {
      async: false
    }),
    drone_cameras: _emberData.default.hasMany('drone-camera', {
      async: false
    })
  });

  exports.default = PresetSearchFilter;
});
define('admin/models/rating', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    value: _emberData.default.attr('number'),
    mission: _emberData.default.belongsTo('mission'), async: false
  });
});
define('admin/models/reschedule_reason', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var RescheduleReason;

  RescheduleReason = _emberData.default.Model.extend({
    slug: _emberData.default.attr('string'),
    short: _emberData.default.attr('string'),
    blurb: _emberData.default.attr('string')
  });

  exports.default = RescheduleReason;
});
define('admin/models/rescheduler', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Rescheduler;

  Rescheduler = _emberData.default.Model.extend({
    mission_reschedules: _emberData.default.hasMany('mission-reschedule', {
      async: false
    })
  });

  exports.default = Rescheduler;
});
define('admin/models/share', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    shareable: _emberData.default.belongsTo('shareable', {
      polymorphic: true,
      async: false,
      inverse: 'shares'
    })
  });
});
define('admin/models/shareable', ['exports', 'ember-data', 'admin/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    shares: _emberData.default.hasMany('share', { async: false }),
    processing_status: _emberData.default.attr('string'),
    share_token: _emberData.default.attr('string'),
    shareLink: Ember.computed('share_token', function () {
      if (this.get('share_token')) {
        var shareable = this.get('constructor.modelName');
        return _environment.default.clients.host + "/" + shareable.charAt(0) + "/" + this.get('share_token');
      }
    }),
    isShareable: function () {
      return this.get('processing_status') === 'ready';
    }.property('processing_status')
  });
});
define('admin/models/shot-type', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShotType;

  ShotType = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    description: _emberData.default.attr('string'),
    video: _emberData.default.attr('string'),
    shots: _emberData.default.hasMany('shot', {
      async: false
    })
  });

  exports.default = ShotType;
});
define('admin/models/shot', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Shot;

  Shot = _emberData.default.Model.extend({
    instructions: _emberData.default.attr('string'),
    pilot_comment: _emberData.default.attr('string'),
    mission: _emberData.default.belongsTo('mission', {
      async: false
    }),
    shot_type: _emberData.default.belongsTo('shot_type', {
      async: false
    }),
    template: _emberData.default.belongsTo('template', {
      async: false
    }),
    images: _emberData.default.hasMany('images', {
      async: true
    }),
    image_markers: _emberData.default.hasMany('image_markers', {
      async: true
    }),
    videos: _emberData.default.hasMany('videos', {
      async: false
    }),
    panoramas: _emberData.default.hasMany('panoramas', {
      async: false
    }),
    image_archive_url: _emberData.default.attr('string'),
    imageCount: Ember.computed('image_markers.length', function () {
      return this.get('image_markers.length');
    }),
    hasMissingGps: Ember.computed('images.[]', function () {
      var i, image, len, ref;
      ref = this.get('images').toArray();
      for (i = 0, len = ref.length; i < len; i++) {
        image = ref[i];
        if (image.get('missing_gps_info')) {
          return true;
        }
      }
      return false;
    }),
    downloadImages: function () {
      var adapter;
      adapter = this.store.adapterFor(this.constructor.modelName);
      return adapter.downloadImages(this);
    },
    promoteAssets: function () {
      var adapter;
      adapter = this.store.adapterFor(this.constructor.modelName);
      return adapter.promoteAssets(this);
    }
  });

  exports.default = Shot;
});
define('admin/models/template', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Template;

  Template = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    shot_ids: _emberData.default.attr('array'),
    shots: _emberData.default.hasMany('shot', {
      async: false
    })
  });

  exports.default = Template;
});
define('admin/models/training-package', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    price: _emberData.default.attr('string'),
    priceInDollars: Ember.computed('price', function () {
      return this.get('price') / 100;
    }),
    selectOption: Ember.computed('price', 'name', function () {
      return this.get('name') + ' $' + this.get('priceInDollars');
    })

  });
});
define('admin/models/vertical', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Vertical;

  Vertical = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    short_name: _emberData.default.attr('string'),
    missions: _emberData.default.hasMany('mission', {
      async: false
    })
  });

  exports.default = Vertical;
});
define('admin/models/video', ['exports', 'ember-data', 'admin/models/shareable'], function (exports, _emberData, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Video;

  Video = _shareable.default.extend({
    url: _emberData.default.attr('string'),
    name: _emberData.default.attr('string'),
    version_urls: _emberData.default.attr(),
    processing: _emberData.default.attr('boolean'),
    source_type: _emberData.default.attr('string'),
    thumbnail_timecode: _emberData.default.attr('string'),
    mission: _emberData.default.belongsTo('mission'),
    shot: _emberData.default.belongsTo('shot'),
    downloadUrl: Ember.computed('version_urls.{}', function () {
      return this.get('version_urls.download');
    }),
    final: Ember.computed('source_type', function () {
      return this.get('source_type') === 'edit';
    })
  });

  exports.default = Video;
});
define('admin/models/zendesk-ticket', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ZendeskTicket;

  ZendeskTicket = _emberData.default.Model.extend({
    url: _emberData.default.attr('string'),
    user_type: _emberData.default.attr('string')
  });

  exports.default = ZendeskTicket;
});
define('admin/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('admin/router', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Router;

  Router = Ember.Router.extend({
    location: _environment.default.locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('global_assets', { path: 'global_assets' });
    this.route('partner_integration', { path: 'partner_integration' });
    this.route('payouts', function () {
      this.route('index', { path: '/' });
    });
    this.route('missions', function () {
      this.route('index', { path: '/' });
      this.route('map', { path: ':mission_id/map' });
      this.route('edit', { path: ':mission_id/edit' });
      this.route('new', { path: '/new' });
      this.route('new', { path: '/new/client/:client_id' });
      this.route('pending_panos', { path: '/pending_panos' });
      this.route('creative_missions', { path: '/creative_missions' });
      this.route('training_missions', { path: '/training_missions' });
    });
    this.route('templates', { path: '/templates' }, function () {
      this.route('index', { path: '/' });
      this.route('new', { path: '/new' });
      this.route('edit', { path: ':template_id/edit' });
      this.route('clone', { path: '/clone/:template_id' });
      this.route('shots', function () {
        this.route('index');
        this.route('edit', { path: '/edit/:shot_type_id' });
        this.route('clone', { path: '/clone/:shot_type_id' });
        this.route('new');
      });
    });
    this.route('equipment', function () {
      this.route('index', { path: '/' });
    });
    this.route('badges', function () {
      this.route('index', { path: '/' });
      this.route('new', { path: '/new' });
      this.route('edit', { path: ':badge_id/edit' });
    });
    this.route('pilots', function () {
      this.route('index', { path: '/' });
      this.route('onboarding', { path: '/onboarding' });
      this.route('pilot', { path: '/:pilot_id' }, function () {
        this.route('missions', { path: '/' }, function () {
          this.route('index', { path: '/' });
        });
      });
    });
    this.route('clients', function () {
      this.route('index', { path: '/' });
      this.route('organizations', { path: '/organizations' });
      this.route('organization', { path: '/organization/:organization_id' });
      this.route('client', { path: ':client_id' }, function () {
        this.route('missions', { path: '/' }, function () {
          this.route('index', { path: '/' });
          this.route('new', { path: 'missions/new' });
          this.route('edit', { path: 'missions/:mission_id/edit' });
        });
        this.route('locations', { path: 'locations' }, function () {
          this.route('modal', { path: 'modal' });
        });
        this.route('packages', { path: 'packages' }, function () {
          this.route('modal', { path: 'modal' });
        });
      });
    });

    this.route('four_oh_four', { path: '*path' });
  });

  exports.default = Router;
});
define('admin/routes/application', ['exports', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _applicationRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_applicationRouteMixin.default, {
    actions: {
      openModal: function (modalName, model) {
        try {
          this.controllerFor(modalName).set('model', model);
        } catch (err) {
          this.generateController(modalName);
          this.controllerFor(modalName).set('model', model);
        }

        return this.render(modalName, { into: 'application',
          outlet: 'modal'
        });
      },
      closeModal: function () {
        return this.disconnectOutlet({
          outlet: 'modal',
          parentView: 'application'
        });
      },
      error: function (error) {
        var status;

        if (error.errors) {
          status = error.errors[0].status;
        }

        if (status === "0") {
          window.alert('We\'re having trouble connecting to the server. This problem is usually the result of a broken Internet connection. You can try refreshing this page.');
        } else if (status === "401") {
          this.transitionTo('login');
        } else if (status === "404") {
          this.transitionTo('/four-oh-four');
        }
      }
    }
  });
});
define('admin/routes/badges/edit', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return Ember.RSVP.hash({
        badge: this.store.findRecord('badge', params.badge_id),
        backgroundChecks: [],
        trainingPackages: this.store.findAll('training_package'),
        checkrPackages: this.store.findAll('checkr_package'),
        mindflashSeries: this.store.query('mindflash_series', { mindflashRefresh: false })
      });
    }
  });
});
define('admin/routes/badges/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        badges: this.store.query('badge', {})
      });
    }
  });
});
define('admin/routes/clients', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsRoute;

  ClientsRoute = Ember.Route.extend(_authenticatedRouteMixin.default);

  exports.default = ClientsRoute;
});
define('admin/routes/clients/client', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsClientRoute;

  ClientsClientRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        organizations: this.get('store').findAll('organization'),
        client: this.store.findRecord('client', params.client_id)
      });
    },
    setupController: function (controller, model) {
      var organizations;
      organizations = model.organizations;
      model = model.client;
      this._super(controller, model);
      return controller.set('organizations', organizations);
    },
    actions: {
      createClient: function (model, organization) {
        model.set('organization', organization);
        return model.save().then(function (_this) {
          return function (response) {
            _this.send('closeModal');
            return _this.refresh();
          };
        }(this), function (response) {});
      },
      closeModalNewClient: function () {
        return this.send('closeModal');
      }
    }
  });

  exports.default = ClientsClientRoute;
});
define('admin/routes/clients/client/missions/index', ['exports', 'ember-infinity/mixins/route', 'admin/mixins/mission-share'], function (exports, _route, _missionShare) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientMissionsIndexRoute;

  ClientMissionsIndexRoute = Ember.Route.extend(_route.default, _missionShare.default, {
    model: function (params) {
      var client;
      client = this.modelFor('clients.client').client;
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['client_id'] = client.id;
      params['modelPath'] = 'controller.missions';
      return Ember.RSVP.hash({
        client: client,
        missions: this.infinityModel('mission', params),
        verticals: this.store.findAll('vertical'),
        templates: this.store.findAll('template'),
        accountReps: this.store.query('admin', {
          role: 'account_rep'
        }),
        badges: this.store.query('badge', {}),
        public_packages: this.store.query('package', {}).then(function (response) {
          return response.sortBy('organization.name', 'vertical.short_name', 'name', 'price');
        }),
        client_packages: this.store.query('package', {
          client_id: client.id
        }).then(function (response) {
          return response.sortBy('vertical.short_name', 'name', 'price');
        }),
        drones: this.store.findAll('drone'),
        devices: this.store.findAll('device'),
        equipment: this.store.findAll('pilot_equipment')
      });
    },
    setupController: function (controller, model) {
      this._super(controller, model);
      controller.set('client', model.client);
      controller.set('missions', model.missions);
      model.templatesForSelect = model.templates.toArray().sortBy('name');
      model.verticalsForSelect = model.verticals.toArray().sortBy('name');
      return model.client_packages_array = model.client_packages.toArray();
    },
    actions: {
      newPackage: function (model) {
        delete model["package"];
        model["package"] = model.client.get('packages').createRecord();
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      editPackage: function (model, edit_package) {
        delete model["package"];
        model["package"] = edit_package;
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      clonePackage: function (model, clone_package) {
        delete model["package"];
        model["package"] = model.client.get('packages').createRecord({
          name: clone_package.get('name'),
          vertical: clone_package.get('vertical'),
          template: clone_package.get('template'),
          price: clone_package.get('price'),
          mission_instructions: clone_package.get('mission_instructions'),
          mission_internal_notes: clone_package.get('mission_internal_notes'),
          mission_production_notes: clone_package.get('mission_production_notes'),
          estimated_pilot_payout: clone_package.get('estimated_pilot_payout'),
          pilot_instructions: clone_package.get('pilot_instructions'),
          badge: clone_package.get('badge'),
          badge_required: clone_package.get('badge_required'),
          auto_dispatch_enabled: clone_package.get('auto_dispatch_enabled')
        });
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      savePackage: function (model) {
        return model["package"].save().then(function (_this) {
          return function (response) {
            if (!model.client_packages_array.includes(model["package"])) {
              model.client_packages_array.pushObject(model["package"]);
              model.client.reload();
            }
            return _this.send('closeModal');
          };
        }(this), function (_this) {
          return function (response) {};
        }(this));
      },
      selectPackageToggle: function (model, client) {
        var requestType;
        requestType = 'POST';
        return Ember.$.ajax({
          url: ENV.api.host + "/v1/admin/clients/" + client.id + "/notifications",
          headers: this.get('headers'),
          type: requestType,
          dataType: 'json',
          data: {
            package_id: model.id
          }
        }).then(function (_this) {
          return function (response) {
            _this.get('mission').reload();
            _this.set('message', 'Sent!');
            return _this.set('state', 'confirmed');
          };
        }(this), function (_this) {
          return function (response) {
            _this.set('state', 'error');
            return _this.set('message', response.responseJSON.errors[0].detail);
          };
        }(this));
      },
      close: function () {
        return this.send('closeModal');
      }
    }
  });

  exports.default = ClientMissionsIndexRoute;
});
define('admin/routes/clients/index', ['exports', 'ember-infinity/mixins/route'], function (exports, _route) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientsIndexRoute;

  ClientsIndexRoute = Ember.Route.extend(_route.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      return Ember.RSVP.hash({
        organizations: this.get('store').findAll('organization'),
        clients: this.infinityModel('client', params)
      });
    },
    queryParams: {
      q: {
        refreshModel: true
      }
    },
    actions: {
      createClient: function (model, organization) {
        model.set('organization', organization);
        return model.save().then(function (_this) {
          return function (response) {
            _this.send('closeModal');
            return _this.transitionTo('clients.client', model.id);
          };
        }(this), function (response) {});
      },
      closeModalNewClient: function () {
        return this.send('closeModal');
      }
    }
  });

  exports.default = ClientsIndexRoute;
});
define('admin/routes/clients/organization', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationRoute;

  OrganizationRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        organization: this.store.findRecord('organization', params.organization_id),
        verticals: this.store.findAll('vertical'),
        templates: this.store.findAll('template'),
        accountReps: this.store.query('admin', {
          role: 'account_rep'
        }),
        badges: this.store.query('badge', {}),
        organization_packages: this.store.query('package', {
          organization_id: params.organization_id
        }).then(function (response) {
          return response.sortBy('vertical.short_name', 'name', 'price');
        }),
        drones: this.store.findAll('drone'),
        devices: this.store.findAll('device'),
        equipment: this.store.findAll('pilot_equipment'),
        dronebase_packages: this.get('store').query('package', {
          available: true
        })
      });
    },
    setupController: function (controller, model) {
      var newName;
      this._super(controller, model);
      model.templatesForSelect = model.templates.toArray().sortBy('name');
      model.verticalsForSelect = model.verticals.toArray().sortBy('name');
      model.organization_packages_array = model.organization_packages.toArray();
      newName = model.organization.get('name');
      return controller.set('newName', newName);
    },
    actions: {
      savePackage: function (model) {
        return model["package"].save().then(function (_this) {
          return function (response) {
            var available_package;
            if (!model.organization_packages_array.includes(model["package"])) {
              model.organization_packages_array.pushObject(model["package"]);
              available_package = model.organization.get('available_packages').createRecord({
                "package": model["package"]
              });
              available_package.save().then(function () {
                return model.organization.reload();
              });
            }
            return _this.send('closeModal');
          };
        }(this), function (_this) {
          return function (response) {};
        }(this));
      },
      editPackage: function (model, edit_package) {
        delete model["package"];
        model["package"] = edit_package;
        return this.send('openModal', 'clients.organization.modal-package', model);
      },
      clonePackage: function (model, clone_package) {
        delete model["package"];
        model["package"] = model.organization.get('packages').createRecord({
          name: clone_package.get('name'),
          vertical: clone_package.get('vertical'),
          template: clone_package.get('template'),
          price: clone_package.get('price'),
          mission_instructions: clone_package.get('mission_instructions'),
          mission_internal_notes: clone_package.get('mission_internal_notes'),
          mission_production_notes: clone_package.get('mission_production_notes'),
          estimated_pilot_payout: clone_package.get('estimated_pilot_payout'),
          pilot_instructions: clone_package.get('pilot_instructions'),
          badge: clone_package.get('badge'),
          badge_required: clone_package.get('badge_required'),
          auto_dispatch_enabled: clone_package.get('auto_dispatch_enabled')
        });
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      }
    }
  });

  exports.default = OrganizationRoute;
});
define('admin/routes/clients/organizations', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var OrganizationsRoute;

  OrganizationsRoute = Ember.Route.extend({
    model: function (params) {
      return this.get('store').findAll('organization');
    },
    actions: {
      close: function () {
        return this.send('closeModal');
      },
      newOrganization: function (model) {
        model.set('organization', this.get('store').createRecord('organization'));
        return this.send('openModal', 'clients.organization.modal', model);
      },
      saveOrganization: function (model) {
        return model.organization.save().then(function (_this) {
          return function (response) {
            _this.send('closeModal');
            return _this.transitionTo('clients.organization', response.id);
          };
        }(this), function (_this) {
          return function (response) {};
        }(this));
      }
    }
  });

  exports.default = OrganizationsRoute;
});
define('admin/routes/equipment/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        drones: this.store.query('drone', {}),
        devices: this.store.query('device', {}),
        pilotEquipment: this.store.query('pilot-equipment', {}),
        cameras: this.store.query('drone-camera', {}),
        droneManufacturers: this.store.query('drone-manufacturer', {})
      });
    }
  });
});
define('admin/routes/four-oh-four', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FourOhFourRoute;

  FourOhFourRoute = Ember.Route.extend({
    redirect: function () {
      var url;
      url = this.router.location.formatURL('/four-oh-four');
      if (window.location.pathname !== url) {
        return this.transitionTo('/four-oh-four');
      }
    }
  });

  exports.default = FourOhFourRoute;
});
define('admin/routes/global-assets', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin', 'admin/mixins/s3-asset-uploads'], function (exports, _authenticatedRouteMixin, _s3AssetUploads) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AssetsRoute;

  AssetsRoute = Ember.Route.extend(_authenticatedRouteMixin.default, _s3AssetUploads.default, {
    model: function (params) {
      return Em.RSVP.hash({
        global_images: this.store.findAll('global_image')
      });
    }
  });

  exports.default = AssetsRoute;
});
define('admin/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var IndexRoute;

  IndexRoute = Ember.Route.extend({
    redirect: function () {
      return this.transitionTo('missions');
    }
  });

  exports.default = IndexRoute;
});
define('admin/routes/login', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin', 'admin/config/environment'], function (exports, _unauthenticatedRouteMixin, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LoginBaseRoute, LoginRoute;

  LoginBaseRoute = Ember.Route.extend(_unauthenticatedRouteMixin.default);

  LoginRoute = LoginBaseRoute.extend({
    session: Ember.inject.service('session'),
    queryParams: {
      email: false,
      token: false
    },
    baseUrl: _environment.default.api.host,
    model: function (params) {
      if (params['email'] && params['token']) {
        this.get('session').authenticate('authenticator:devise', params['email'], "token:" + params['token']).then(function (_this) {
          return function () {};
        }(this), function (_this) {
          return function () {
            return alert("Login Failed. This shouldn't happen unless someone's messing with the system");
          };
        }(this));
      }
      return {
        "baseUrl": _environment.default.api.host + "/auth"
      };
    }
  });

  exports.default = LoginRoute;
});
define('admin/routes/missions', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsRoute;

  MissionsRoute = Ember.Route.extend(_authenticatedRouteMixin.default);

  exports.default = MissionsRoute;
});
define('admin/routes/missions/creative_missions', ['exports', 'ember-infinity/mixins/route', 'admin/mixins/mission-share', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _route, _missionShare, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var CreativeMissionsRoute;

  CreativeMissionsRoute = Ember.Route.extend(_authenticatedRouteMixin.default, _route.default, _missionShare.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['mission_types'] = 'creative';
      return Ember.RSVP.hash({
        missions: this.infinityModel('mission', params)
      });
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      status: {
        refreshModel: true
      },
      lat: {
        refreshModel: true
      },
      lon: {
        refreshModel: true
      },
      distance: {
        refreshModel: true
      }
    }
  });

  exports.default = CreativeMissionsRoute;
});
define('admin/routes/missions/edit', ['exports', 'admin/config/environment', 'admin/mixins/s3-asset-uploads', 'admin/mixins/mission-share', 'admin/feature-manager'], function (exports, _environment, _s3AssetUploads, _missionShare, _featureManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsEditRoute;

  MissionsEditRoute = Ember.Route.extend(_s3AssetUploads.default, _missionShare.default, {
    session: Ember.inject.service(),
    sessionAccount: Ember.inject.service(),
    pusherData: Ember.inject.service(),
    model: function (params) {
      var mission;
      return mission = this.store.findRecord('mission', params.mission_id).then(function (_this) {
        return function (mission) {
          var callActions, client, location;
          client = mission.get('client');
          location = mission.get('location');
          callActions = [{
            id: 'not_needed',
            name: 'Not Needed'
          }, {
            id: 'in_advance_to_coordinate',
            name: 'In Advance to Coordinate'
          }, {
            id: 'when_you_arrive',
            name: 'When You Arrive'
          }, {
            id: 'in_case_of_emergency',
            name: 'In Case Of Emergency'
          }];
          if (!mission.get('onsite_contact')) {
            _this.store.createRecord('onsite_contact', {
              mission: mission,
              call_action: 'not_needed'
            });
          }
          return Em.RSVP.hash({
            client: client,
            mission: mission,
            flightApps: _this.store.findAll('flight_app'),
            location: location ? location : _this.store.createRecord('location', {
              client: client
            }),
            locations: client ? _this.store.query('location', {
              client_id: client.id
            }) : [mission.get('location')],
            packages: client ? client.get('available_packages') : _this.store.query('package', {
              "public": true
            }),
            "package": client ? _this.store.createRecord('package', {
              client: client
            }) : _this.store.createRecord('package'),
            categories: _this.store.findAll('category'),
            drones: _this.store.findAll('drone'),
            devices: _this.store.findAll('device'),
            equipment: _this.store.findAll('pilot_equipment'),
            admins: _this.store.findAll('admin'),
            verticals: _this.store.findAll('vertical'),
            templates: _this.store.findAll('template'),
            mission_statuses: Ember.$.getJSON(_environment.default.api.host + "/v1/missions/statuses"),
            pilots: [],
            payout: _this.store.createRecord('payout'),
            badges: _this.store.query('badge', {}),
            call_actions: callActions,
            presetSearchFilters: _this.store.query('preset-search-filter', {}),
            holdReasons: _this.store.query('mission-hold-reason', {}),
            rejectionReasons: _this.store.query('mission-rejection-reason', {}),
            rescheduleReasons: _this.store.query('reschedule-reason', {}),
            filteredMapImages: mission.loadImageMarkers()
          });
        };
      }(this));
    },
    setupController: function (controller, model) {
      var categories, packages;
      this._super(controller, model);
      Ember.run.schedule('afterRender', function (_this) {
        return function () {
          $('[data-toggle="tooltip"]').tooltip();
          return _this._listenToPusherEvents(model.mission);
        };
      }(this));
      model.locationsForSelect = model.locations.toArray();
      model.verticalsForSelect = model.verticals.toArray().sortBy('vertical.short_name');
      model.templatesForSelect = model.templates.toArray().sortBy('name');
      model.accountReps = Ember.A([]);
      model.productionReps = Ember.A([]);
      model.operationReps = Ember.A([]);
      model.drones = model.drones.toArray();
      model.currentAdminName = this.store.peekRecord('admin', this.get('session.data.authenticated.id')).fullName;
      model.admins.forEach(function (admin) {
        if (admin.get('roles').includes('account_rep')) {
          model.accountReps.addObject(admin);
        }
        if (admin.get('roles').includes('production_rep')) {
          model.productionReps.addObject(admin);
        }
        if (admin.get('roles').includes('operation_rep')) {
          return model.operationReps.addObject(admin);
        }
      });
      packages = model.packages.toArray();
      packages.pushObject(model.mission.get('package'));
      model.packagesForSelect = packages.uniq().sortBy('vertical.short_name', 'name', 'price');
      categories = model.categories.toArray();
      model.categoriesForSelect = categories.uniq().sortBy('name');
      model["package"] = model.mission.get('package.name').match(/Custom/) ? model.mission.get('package') : this.store.createRecord('package', {
        name: 'Custom'
      });
      model.mission.loadImages();
      model.mission.loadVideos();
      model.mission.loadPanoramas();
      if (controller.activeTab === 'activityLogs') {
        return model.mission.loadActivityLogs();
      }
    },
    _listenToPusherEvents: function (mission) {
      return this.get('pusherData').subscribeToMissionChannel(mission);
    },
    _saveOnsiteContact: function () {
      var onsiteContact;
      if (_featureManager.default.FeatureManager.showOnsiteContacts() === false) {
        return;
      }
      onsiteContact = this.controller.get('model.mission.onsite_contact');
      if (!onsiteContact) {
        this.alertAndThrow("Error saving: onsiteContact == null");
      }
      return onsiteContact.save().then(function (response) {}, function (_this) {
        return function (error) {
          return _this.alertAndThrow("Error saving onsite contacts: " + error);
        };
      }(this));
    },
    alertAndThrow: function (message) {
      alert(message);
      throw new Error(message);
    },
    actions: {
      loading: function (transition) {
        this.controllerFor('missions.edit').set('pageReady', false);
        transition.promise["finally"](function (_this) {
          return function () {
            return _this.controllerFor('missions.edit').set('pageReady', true);
          };
        }(this));
        return true;
      },
      reshoot: function (model, data) {
        return Em.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + model.id + "/reshoot",
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (response) {
            return _this.transitionTo('missions.edit', response.mission_id);
          };
        }(this), function (_this) {
          return function (error) {
            return console.log('failed to reshoot', response);
          };
        }(this));
      },
      hold: function (mission, data) {
        var _this;
        _this = this;
        return Em.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/holds",
          type: 'POST',
          dataType: 'json',
          data: data,
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (response) {
            mission.set('hold', response);
            return mission.save().then(function (response) {
              mission.set('isOnHold', true);
              mission.set('pilot_invitations_dispatch.dispatch_status', 'cancelled');
              return _this.controller.set('invitationDispatchInProgress', false);
            });
          };
        }(this), function (_this) {
          return function (error) {
            return console.log('failed to put on hold', error);
          };
        }(this));
      },
      cancelAutoDispatch: function (mission) {
        var _this;
        _this = this;
        return Em.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/pilot_invitations_dispatches/" + mission.get('pilot_invitations_dispatch').id,
          type: 'PUT',
          dataType: 'json',
          data: {
            cancelled: true
          },
          headers: this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (response) {
            mission.set('pilot_invitations_dispatch.dispatch_status', 'cancelled');
            _this.controller.set('showInvitePilotLink', true);
            return _this.controller.set('invitationDispatchInProgress', false);
          };
        }(this), function (_this) {
          return function (error) {
            return console.log('failed to resume', error);
          };
        }(this));
      },
      resume: function (mission) {
        var _this;
        _this = this;
        return Em.$.ajax({
          url: _environment.default.api.host + "/v1/admin/missions/" + mission.id + "/holds/" + mission.get('hold').id,
          type: 'PUT',
          dataType: 'json',
          data: {
            resolved: true
          },
          headers: _this.get('sessionAccount.headers')
        }).then(function (_this) {
          return function (response) {
            mission.set('hold', null);
            mission.set('isOnHold', false);
            return _this.transitionTo('missions.edit', mission.id);
          };
        }(this), function (_this) {
          return function (error) {
            return console.log('failed to resume', error);
          };
        }(this));
      },
      checkAirspace: function (mission, button) {
        return mission.checkAirspace();
      },
      viewParentMission: function (mission) {
        return this.transitionTo('missions.edit', mission.id);
      },
      rebuildArchives: function (model) {
        if (confirm('Are you sure you want to regenerate the archives?')) {
          return Em.$.ajax({
            url: _environment.default.api.host + "/v1/admin/missions/" + model.id + "/regenerate_archives",
            type: 'POST',
            dataType: 'json',
            headers: this.get('sessionAccount.headers')
          }).then(function (_this) {
            return function (response) {
              model.reload();
              return alert("Archives are now regenerating");
            };
          }(this), function (_this) {
            return function (error) {
              return alert("There was a problem with your request");
            };
          }(this));
        }
      },
      reload: function (mission) {
        mission.set('pusher_updated_at', null);
        return mission.reload();
      },
      save: function (model) {
        var _this;
        _this = this;
        return model.mission.save().then(function (response) {
          _this.set('pilotChanged', null);
          _this.transitionTo('missions.edit', model.mission.id);
          return _this._saveOnsiteContact(model.mission.get('onsite_contact'));
        }, function (_this) {
          return function (error) {
            alert('There was an issue saving this mission');
            return console.log('error saving mission: ' + error);
          };
        }(this));
      },
      cancel: function (model) {
        if (confirm('Are you sure you want to cancel this mission?')) {
          return Em.$.ajax({
            url: _environment.default.api.host + "/v1/admin/missions/" + model.id + "/cancel",
            type: 'POST',
            dataType: 'json',
            headers: this.get('sessionAccount.headers')
          }).then(function (_this) {
            return function (response) {
              model.reload();
              return console.log('mission canceled!');
            };
          }(this), function (_this) {
            return function (error) {
              var errors;
              errors = '';
              error.responseJSON.errors.forEach(function (e) {
                return errors = errors + e.detail + '\n';
              });
              alert(errors);
              return console.log('failed to cancel', error);
            };
          }(this));
        }
      },
      updateCreativeMissionMeta: function (model) {
        return model.mission.save().then(function (response) {
          console.log('creative mission update');
          return model.location.save().then(function (response) {
            var video;
            console.log('creative location update');
            video = model.mission.get('videos.firstObject');
            if (video != null) {
              return video.save().then(function (response) {
                return console.log('creative mission video update');
              }, function (error) {
                return console.log('creative mission video update failed!');
              });
            }
          }, function (error) {
            return console.log('creative mission location update failed!');
          });
        }, function (error) {
          console.log(error);
          return console.log('creative mission update failed!');
        });
      },
      searchPilots: function (query, model) {
        return this.store.query('pilot', query).then(function (response) {
          Ember.set(model, 'meta', response.meta);
          return Ember.set(model, 'pilots', response.toArray());
        }, function (error) {
          alert('There was an issue retrieving pilots');
          return console.log('error retrieving pilots: ' + error);
        });
      },
      createPayout: function (model) {
        var _this, new_payout;
        _this = this;
        new_payout = model.mission.get('payouts').createRecord({
          pilot: model.payout.get('pilot'),
          amount: model.payout.get('amount'),
          notes: model.payout.get('notes')
        });
        return new_payout.save().then(function (response) {
          model.payout.set('amount', null);
          model.payout.set('notes', null);
          model.payout.set('pilot', null);
          return _this.controller.set('payoutPilot', false);
        }, function (error) {
          alert('There was an issue creating this payout');
          return console.log('error saving new_payout: ' + error);
        });
      },
      deletePayout: function (model) {
        model.deleteRecord();
        return model.save().then(function (response) {}, function (error) {
          alert('There was an issue deleting this payout');
          return console.log('error while saving: ' + error);
        });
      },
      createLocation: function (model) {
        var _this;
        _this = this;
        return model.location.save().then(function (response) {
          model.locationsForSelect.pushObject(model.location);
          model.mission.set('location', model.location);
          return model.mission.save().then(function (response) {
            return _this.send('closeModal');
          }, function (error) {
            return console.log('error while saving: ' + error);
          });
        }, function (error) {
          alert('There was an issue creating this location');
          return console.log('error while saving: ' + error);
        });
      },
      newPackage: function (model) {
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      editPackage: function (model, edit_package) {
        model["package"] = edit_package;
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      savePackage: function (model) {
        return model["package"].save().then(function (_this) {
          return function (response) {
            model.packagesForSelect.pushObject(model["package"]);
            model.mission.set('package', model["package"]);
            return model.mission.save().then(function (response) {
              return _this.send('closeModal');
            }, function (error) {
              return console.log('error while saving: ' + error);
            });
          };
        }(this), function (error) {
          return console.log('error while saving: ' + error);
        });
      },
      close: function () {
        return this.send('closeModal');
      },
      willTransition: function (transition) {
        var mission;
        if (this.controller.get('model.package.isNew')) {
          this.controller.get('model.package').deleteRecord();
        }
        mission = this.controller.get('model.mission');
        if (mission.get('isDirty')) {
          mission.set('pilot', null);
          return mission.rollback();
        }
      }
    }
  });

  exports.default = MissionsEditRoute;
});
define('admin/routes/missions/index', ['exports', 'ember-infinity/mixins/route', 'admin/mixins/mission-share'], function (exports, _route, _missionShare) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionIndexRoute;

  MissionIndexRoute = Ember.Route.extend(_route.default, _missionShare.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['mission_types'] = 'client';
      return Ember.RSVP.hash({
        missions: this.infinityModel('mission', params)
      });
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      status: {
        refreshModel: true
      },
      lat: {
        refreshModel: true
      },
      lon: {
        refreshModel: true
      },
      distance: {
        refreshModel: true
      },
      assets_late: {
        refreshModel: true
      },
      on_hold: {
        refreshModel: true
      },
      reshoot: {
        refreshModel: true
      },
      sort_attribute: {
        refreshModel: true
      },
      sort_order: {
        refreshModel: true
      },
      include_client_ids: {
        refreshModel: true
      },
      exclude_client_ids: {
        refreshModel: true
      }
    }
  });

  exports.default = MissionIndexRoute;
});
define('admin/routes/missions/map', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin', 'admin/data/shot_list', 'admin/mixins/css-class-namespace', 'admin/config/environment'], function (exports, _authenticatedRouteMixin, _shot_list, _cssClassNamespace, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionShowRoute;

  MissionShowRoute = Ember.Route.extend(_authenticatedRouteMixin.default, _cssClassNamespace.default, {
    model: function (params) {
      return Ember.RSVP.hash({
        mission: this.get('store').find('mission', params['mission_id']),
        features: Ember.A([]),
        shot_list: _shot_list.default,
        shot_types: this.get('store').findAll('shot_type'),
        templates: this.get('store').findAll('template'),
        template: this.get('store').createRecord('template')
      });
    },
    setupController: function (controller, model) {
      return this._super(controller, model);
    },
    actions: {
      update: function (model) {
        var _this;
        _this = this;
        return model.mission.get('location').save().then(function () {
          return _this.transitionTo('missions.edit', model.mission.id);
        });
      }
    }
  });

  exports.default = MissionShowRoute;
});
define('admin/routes/missions/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionsNewRoute;

  MissionsNewRoute = Ember.Route.extend({
    model: function (params) {
      var _this, client;
      if (params.client_id == null) {
        return this.buildModel(null);
      } else {
        _this = this;
        return client = this.store.findRecord('client', params.client_id).then(function (client) {
          return _this.buildModel(client);
        });
      }
    },
    setupController: function (controller, model) {
      this._super(controller, model);
      model.locationsForSelect = model.locations.toArray();
      model.packagesForSelect = model.packages.toArray().sortBy('vertical.short_name', 'name', 'price');
      model.verticalsForSelect = model.verticals.toArray().sortBy('vertical.short_name');
      return model.templatesForSelect = model.templates.toArray().sortBy('name');
    },
    buildModel: function (client) {
      return Em.RSVP.hash({
        client: client,
        mission: client ? this.store.createRecord('mission', {
          client: client
        }) : this.store.createRecord('mission'),
        location: client ? this.store.createRecord('location', {
          client: client
        }) : this.store.createRecord('location'),
        locations: client ? this.store.query('location', {
          client_id: client.id
        }) : [],
        "package": client ? this.store.createRecord('package', {
          client: client
        }) : this.store.createRecord('package'),
        packages: client ? client.get('available_packages') : this.store.query('package', {
          "public": true
        }),
        badges: this.store.query('badge', {}),
        accountReps: this.store.query('admin', {
          role: 'account_rep'
        }),
        verticals: this.store.query('vertical', {}),
        templates: this.store.findAll('template'),
        drones: this.store.findAll('drone'),
        devices: this.store.findAll('device'),
        equipment: this.store.findAll('pilot_equipment')
      });
    },
    actions: {
      newPackage: function (model) {
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      editPackage: function (model, edit_package) {
        model["package"] = edit_package;
        return this.send('openModal', 'clients.client.missions.modal-package', model);
      },
      savePackage: function (model) {
        return model["package"].save().then(function (_this) {
          return function (response) {
            model.packagesForSelect.pushObject(model["package"]);
            model.mission.set('package', model["package"]);
            return _this.send('closeModal');
          };
        }(this), function (_this) {
          return function (response) {};
        }(this));
      },
      save: function (model) {
        var _this;
        _this = this;
        return model.mission.save().then(function (response) {
          return _this.transitionTo('missions.edit', model.mission.id);
        }, function (response) {});
      },
      createLocation: function (model) {
        var _this, isUpdate;
        _this = this;
        isUpdate = !model.location.get('isNew');
        return model.location.save().then(function (response) {
          if (isUpdate) {
            model.locationsForSelect.removeObject(response);
          }
          model.locationsForSelect.pushObject(response);
          model.mission.set('location', response);
          return _this.send('closeModal');
        }, function (response) {});
      },
      createPackage: function (model) {
        var _this, isUpdate;
        _this = this;
        isUpdate = !model["package"].get('isNew');
        return model["package"].save().then(function (response) {
          if (isUpdate) {
            model.packagesForSelect.removeObject(response);
          }
          model.packagesForSelect.pushObject(response);
          model.mission.set('package', response);
          return _this.send('closeModal');
        }, function (response) {});
      },
      close: function () {
        return this.send('closeModal');
      },
      willTransition: function (transition) {
        if (this.controller.get('model.mission.isNew')) {
          this.controller.get('model.mission').deleteRecord();
        }
        if (this.controller.get('model.location.isNew')) {
          this.controller.get('model.location').deleteRecord();
        }
        if (this.controller.get('model.package.isNew')) {
          return this.controller.get('model.package').deleteRecord();
        }
      }
    }
  });

  exports.default = MissionsNewRoute;
});
define('admin/routes/missions/pending-panos', ['exports', 'ember-infinity/mixins/route', 'admin/mixins/mission-share', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _route, _missionShare, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionPendingPanosRoute;

  MissionPendingPanosRoute = Ember.Route.extend(_authenticatedRouteMixin.default, _route.default, _missionShare.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['mission_types'] = 'panorama';
      params['include'] = ['panoramas', 'pilot', 'panoramas.admin_share'];
      return this.infinityModel('mission', params);
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      status: {
        refreshModel: true
      }
    }
  });

  exports.default = MissionPendingPanosRoute;
});
define('admin/routes/missions/training-missions', ['exports', 'ember-infinity/mixins/route', 'admin/mixins/mission-share', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _route, _missionShare, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TrainingMissionsRoute;

  TrainingMissionsRoute = Ember.Route.extend(_authenticatedRouteMixin.default, _route.default, _missionShare.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['mission_types'] = 'training';
      return Ember.RSVP.hash({
        missions: this.infinityModel('mission', params)
      });
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      status: {
        refreshModel: true
      },
      lat: {
        refreshModel: true
      },
      lon: {
        refreshModel: true
      },
      distance: {
        refreshModel: true
      }
    }
  });

  exports.default = TrainingMissionsRoute;
});
define('admin/routes/partner-integration', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PartnerIntegration;

  PartnerIntegration = Ember.Route.extend({
    model: function (params) {
      return Em.RSVP.hash({
        flight_apps: this.store.findAll('flight_app')
      });
    }
  });

  exports.default = PartnerIntegration;
});
define('admin/routes/payouts', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PayoutsRoute;

  PayoutsRoute = Ember.Route.extend(_authenticatedRouteMixin.default);

  exports.default = PayoutsRoute;
});
define('admin/routes/payouts/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PayoutsIndexRoute;

  PayoutsIndexRoute = Ember.Route.extend({
    infinity: Ember.inject.service(),
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      return this.infinity.model('payout', params);
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      status: {
        refreshModel: true
      }
    }
  });

  exports.default = PayoutsIndexRoute;
});
define('admin/routes/pilots', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotsRoute;

  PilotsRoute = Ember.Route.extend(_authenticatedRouteMixin.default);

  exports.default = PilotsRoute;
});
define('admin/routes/pilots/index', ['exports', 'ember-infinity/mixins/route'], function (exports, _route) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotsIndexRoute;

  PilotsIndexRoute = Ember.Route.extend(_route.default, {
    model: function (params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      return this.infinityModel('pilot', params);
    },
    setupController: function (controller, model) {
      this._super(controller, model);
      return controller.setProperties(model);
    },
    queryParams: {
      q: {
        refreshModel: true
      },
      lat: {
        refreshModel: true
      },
      lon: {
        refreshModel: true
      },
      distance: {
        refreshModel: true
      },
      'statuses[]': {
        refreshModel: true
      },
      has_licenses: {
        refreshModel: true
      }
    }
  });

  exports.default = PilotsIndexRoute;
});
define('admin/routes/pilots/onboarding', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    infinity: Ember.inject.service(),
    // the query params must be named with [] because rails is picky.
    // this will look like drones[][] in the url parameter, but when sent
    // to the server it'll just look like drones[].
    // the first [] is the actual name, and the second [] is embers way of
    // denoting that its an array
    queryParams: {
      q: {
        refreshModel: true
      },
      lat: {
        refreshModel: true
      },
      lon: {
        refreshModel: true
      },
      distance: {
        refreshModel: true
      },
      'statuses[]': {
        refreshModel: true
      },
      'drone_ids[]': {
        refreshModel: true
      },
      'camera_ids[]': {
        refreshModel: true
      },
      'device_ids[]': {
        refreshModel: true
      },
      'license_ids[]': {
        refreshModel: true
      },
      'pilot_badge_badge_ids': {
        refreshModel: true
      },
      'pilot_badge_status_ids': {
        refreshModel: true
      },
      'pilot_badge_include': {
        refreshModel: true
      },
      'pilot_without_badges': {
        refreshModel: true
      }
    },

    model(params) {
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['include[]'] = ['drones'];
      params['exept[]'] = ['average_rating', 'payout'];
      this.set('droneIds', params['drone_ids[]']);
      this.set('cameraIds', params['camera_ids[]']);
      this.set('deviceIds', params['device_ids[]']);
      this.set('licenseIds', params['license_ids[]']);
      this.set('pilotBadgeBadgeIds', params['pilot_badge_badge_ids']);
      this.set('pilotBadgeStatusIds', params['pilot_badge_status_ids']);
      this.set('pilotBadgeInclude', params['pilot_badge_include']);
      this.set('pilotWithoutBadges', params['pilot_without_badges']);
      this.set('pilotBadgeStatuses', [new Ember.Object({ 'id': 'complete', 'name': 'Complete' }), new Ember.Object({ 'id': 'pending', 'name': 'Pending' })]);
      return this.infinity.model('pilot', params);
    },
    setupController(controller, model) {
      this._super(controller, model);
      controller.set('droneIds', this.get('droneIds'));
      controller.set('cameraIds', this.get('cameraIds'));
      controller.set('deviceIds', this.get('deviceIds'));
      controller.set('licenseIds', this.get('licenseIds'));
      controller.set('pilotBadgeBadgeIds', this.get('pilotBadgeBadgeIds'));
      controller.set('pilotBadgeStatusIds', this.get('pilotBadgeStatusIds'));
      controller.set('pilotBadgeStatuses', this.get('pilotBadgeStatuses'));
      controller.set('pilotBadgeInclude', this.get('pilotBadgeInclude'));
      controller.set('pilotWithoutBadges', this.get('pilotWithoutBadges'));
    },
    // these methods are here to pretty up the url when using arrays
    // instead of /onboarding?whatever%5D%65"56", it'll look like
    // /onboarding?whatever[][]=56
    serializeQueryParam(value, urlKey, defaultValueType) {
      return defaultValueType === 'array' ? value : this._super(value, urlKey, defaultValueType);
    },
    deserializeQueryParam(value, urlKey, defaultValueType) {
      return defaultValueType === 'array' ? value : this._super(value, urlKey, defaultValueType);
    }
  });
});
define('admin/routes/pilots/pilot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotsEditRoute;

  PilotsEditRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        pilot: this.store.findRecord('pilot', params.pilot_id)
      });
    },
    setupController: function (controller, model) {
      this._super(controller, model);
      return model.pilot.set('approve', model.pilot.get('status') === 'approved');
    },
    actions: {
      savePilot: function (pilot) {
        var _this;
        _this = this;
        return pilot.save().then(function (response) {
          return _this.transitionTo('pilots.index');
        }, function (response) {
          return alert(response.data);
        });
      }
    }
  });

  exports.default = PilotsEditRoute;
});
define('admin/routes/pilots/pilot/missions/index', ['exports', 'ember-infinity/mixins/route'], function (exports, _route) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PilotMissionsIndexRoute;

  PilotMissionsIndexRoute = Ember.Route.extend(_route.default, {
    model: function (params) {
      var pilot;
      pilot = this.modelFor('pilots.pilot');
      params['perPage'] = 100;
      params['startingPage'] = 1;
      params['pilot_id'] = pilot.pilot.id;
      params['modelPath'] = 'controller.missions';
      return Ember.RSVP.hash({
        pilot: pilot.pilot,
        missions: this.infinityModel('mission', params),
        badges: this.store.query('badge', {})
      });
    },
    setupController: function (controller, model) {
      this._super(controller, model);
      controller.set('pilot', model.pilot);
      return controller.set('missions', model.missions);
    },
    queryParams: {
      sort_attribute: {
        refreshModel: true
      },
      sort_order: {
        refreshModel: true
      }
    }
  });

  exports.default = PilotMissionsIndexRoute;
});
define('admin/routes/templates/clone', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesCloneRoute;

  TemplatesCloneRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        templateToClone: this.store.findRecord('template', params.template_id),
        shotTypes: this.store.query('shot-type', {})
      });
    },
    setupController: function (controller, model) {
      var i, len, ref, results, shot;
      this._super(controller, model);
      model.template = this.store.createRecord('template', model.templateToClone.serialize().data.attributes);
      ref = model.templateToClone.get('shots').toArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        shot = ref[i];
        results.push(model.template.get('shots').createRecord({
          shot_type: shot.get('shot_type'),
          instructions: shot.get('instructions')
        }));
      }
      return results;
    }
  });

  exports.default = TemplatesCloneRoute;
});
define('admin/routes/templates/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesEditRoute;

  TemplatesEditRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        template: this.store.findRecord('template', params.template_id),
        shotTypes: this.store.query('shot-type', {})
      });
    }
  });

  exports.default = TemplatesEditRoute;
});
define('admin/routes/templates/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesIndexRoute;

  TemplatesIndexRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.query('template', {});
    }
  });

  exports.default = TemplatesIndexRoute;
});
define('admin/routes/templates/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesNewRoute;

  TemplatesNewRoute = Ember.Route.extend({
    model: function (params) {
      return Ember.RSVP.hash({
        template: this.store.createRecord('template'),
        shotTypes: this.store.query('shot-type', {})
      });
    }
  });

  exports.default = TemplatesNewRoute;
});
define('admin/routes/templates/shots/clone', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesShotsIndexRoute;

  TemplatesShotsIndexRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.findRecord('shot_type', params.shot_type_id).then(function (_this) {
        return function (response) {
          return _this.store.createRecord('shot_type', {
            name: response.get('name'),
            description: response.get('description'),
            video: response.get('video')
          });
        };
      }(this));
    },
    actions: {
      saved: function () {
        return this.transitionTo('templates.shots.index');
      }
    }
  });

  exports.default = TemplatesShotsIndexRoute;
});
define('admin/routes/templates/shots/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesShotsIndexRoute;

  TemplatesShotsIndexRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.findRecord('shot_type', params.shot_type_id);
    },
    actions: {
      saved: function () {
        return this.transitionTo('templates.shots.index');
      }
    }
  });

  exports.default = TemplatesShotsIndexRoute;
});
define('admin/routes/templates/shots/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesShotsIndexRoute;

  TemplatesShotsIndexRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.query('shot_type', {});
    }
  });

  exports.default = TemplatesShotsIndexRoute;
});
define('admin/routes/templates/shots/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplatesShotsIndexRoute;

  TemplatesShotsIndexRoute = Ember.Route.extend({
    model: function (params) {
      return this.store.createRecord('shot_type');
    },
    actions: {
      saved: function () {
        return this.transitionTo('templates.shots.index');
      }
    }
  });

  exports.default = TemplatesShotsIndexRoute;
});
define('admin/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ApplicationSerializer;

  ApplicationSerializer = _emberData.default.JSONAPISerializer.extend({
    keyForAttribute: function (attr) {
      return Ember.String.underscore(attr);
    },
    keyForRelationship: function (rawKey) {
      return Ember.String.underscore(rawKey);
    }
  });

  exports.default = ApplicationSerializer;
});
define('admin/serializers/client', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ClientSerializer;

  ClientSerializer = _application.default.extend();

  exports.default = ClientSerializer;
});
define('admin/serializers/image', ['exports', 'admin/serializers/shareable'], function (exports, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ImageSerializer;

  ImageSerializer = _shareable.default.extend();

  exports.default = ImageSerializer;
});
define('admin/serializers/location', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LocationSerializer;

  LocationSerializer = _application.default.extend();

  exports.default = LocationSerializer;
});
define('admin/serializers/mission', ['exports', 'admin/serializers/shareable'], function (exports, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionSerializer;

  MissionSerializer = _shareable.default.extend({
    attrs: {
      "package": {
        deserialize: 'records'
      },
      location: {
        deserialize: 'records'
      },
      credit_card: {
        deserialize: 'records'
      },
      client: {
        deserialize: 'records'
      },
      pilot: {
        deserialize: 'records',
        serialize: false
      },
      accountRep: {
        deserialize: 'records'
      },
      productionRep: {
        deserialize: 'records'
      },
      collaborators: {
        deserialize: 'records'
      },
      videos: {
        serialize: false,
        deserialize: 'records'
      }
    }
  });

  exports.default = MissionSerializer;
});
define('admin/serializers/package', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PackageSerializer;

  PackageSerializer = _application.default.extend({
    attrs: {
      vertical: {
        deserialize: 'records'
      },
      template: {
        deserialize: 'records'
      },
      accountRep: {
        deserialize: 'records'
      }
    }
  });

  exports.default = PackageSerializer;
});
define('admin/serializers/panorama', ['exports', 'admin/serializers/shareable'], function (exports, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var PanoramaSerializer;

  PanoramaSerializer = _shareable.default.extend();

  exports.default = PanoramaSerializer;
});
define('admin/serializers/pilot', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var MissionSerializer;

  MissionSerializer = _application.default.extend();

  exports.default = MissionSerializer;
});
define('admin/serializers/share', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShareSerializer;

  ShareSerializer = _application.default.extend({
    attrs: {
      shareable: {
        deserialize: 'records'
      }
    }
  });

  exports.default = ShareSerializer;
});
define('admin/serializers/shareable', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShareableSerializer;

  ShareableSerializer = _application.default.extend({
    attrs: {
      shares: {
        deserialize: 'records'
      }
    }
  });

  exports.default = ShareableSerializer;
});
define('admin/serializers/shot', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ShotSerializer;

  ShotSerializer = _application.default.extend({
    attrs: {
      shot_type: {
        deserialize: 'records'
      },
      mission: {
        deserialize: 'records'
      }
    }
  });

  exports.default = ShotSerializer;
});
define('admin/serializers/template', ['exports', 'admin/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TemplateSerializer;

  TemplateSerializer = _application.default.extend({
    extractAttributes: function (modelClass, resourceHash) {
      var attributes;
      attributes = this._super(modelClass, resourceHash);
      if (resourceHash.relationships.shot_types != null) {
        attributes['shot_type_ids'] = resourceHash.relationships.shot_types.data.mapBy('id');
      }
      return attributes;
    }
  });

  exports.default = TemplateSerializer;
});
define('admin/serializers/video', ['exports', 'admin/serializers/shareable'], function (exports, _shareable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var VideoSerializer;

  VideoSerializer = _shareable.default.extend();

  exports.default = VideoSerializer;
});
define('admin/services/-in-viewport', ['exports', 'ember-in-viewport/services/-in-viewport'], function (exports, _inViewport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inViewport.default;
    }
  });
});
define('admin/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('admin/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('admin/services/infinity', ['exports', 'ember-infinity/services/infinity'], function (exports, _infinity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _infinity.default;
    }
  });
});
define('admin/services/modal-dialog', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { computed, Service } = Ember;

  function computedFromConfig(prop) {
    return computed(function () {
      return _environment.default['ember-modal-dialog'] && _environment.default['ember-modal-dialog'][prop];
    });
  }

  exports.default = Service.extend({
    hasEmberTether: computedFromConfig('hasEmberTether'),
    hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
    hasLiquidTether: computedFromConfig('hasLiquidTether'),
    destinationElementId: computed(function () {
      /*
        everywhere except test, this property will be overwritten
        by the initializer that appends the modal container div
        to the DOM. because initializers don't run in unit/integration
        tests, this is a nice fallback.
      */
      if (_environment.default.environment === 'test') {
        return 'ember-testing';
      }
    })
  });
});
define('admin/services/moment', ['exports', 'ember-moment/services/moment', 'admin/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { get } = Ember;

  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });
});
define('admin/services/pusher-data', ['exports', 'admin/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    sessionAccount: Ember.inject.service(),
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    subscribeToMissionChannel(mission) {
      this.set('mission', mission);
      Pusher.logToConsole = _environment.default.environment !== "production";
      var presenceChannel = this.subscribe("presence-mission-" + mission.id);

      presenceChannel.bind('pusher_internal:member_added', data => {
        this._showSubscriber(data);
      });
      presenceChannel.bind('pusher:subscription_succeeded', data => {
        this._showSubscriber(data);
      });
      presenceChannel.bind('pusher:member_added', data => {
        this._showSubscriber(data);
      });
      presenceChannel.bind('pusher:member_removed', data => {
        this._removeSubscriber(data);
      });
      presenceChannel.bind("mission-update", data => {
        this._showUpdated(data);
      });
    },

    subscribe(channelName) {
      var pusher = this.get('pusher');
      if (pusher == undefined) {
        var pusherKey, store;

        pusherKey = _environment.default.pusher_key;
        pusher = new Pusher(pusherKey, {
          cluster: _environment.default.pusher_cluster,
          authEndpoint: _environment.default.api.host + "/v1/admin/pusher/auth",
          auth: {
            headers: this.get('sessionAccount.headers')
          },
          encrypted: true
        });
        this.set('pusher', pusher);
      }
      return pusher.subscribe(channelName);;
    },

    _showUpdated(data) {
      if (this.get('session.data.authenticated.id') != data.updated_by) {
        this.get('mission').set('pusher_updated_at', data.new_update);
      }
    },

    _showSubscriber(data) {
      for (var key in data.members) {
        if (key != undefined) {
          var current_admin = data.members[key].name;
          if (!this.get('mission').pusherSubscribers.includes(current_admin)) {
            this.get('mission').pusherSubscribers.pushObject(current_admin);
          }
        }
      }
      if (data.info != undefined) {
        current_admin = data.info.name;
        if (!this.get('mission').pusherSubscribers.includes(current_admin)) {
          this.get('mission').pusherSubscribers.pushObject(current_admin);
        }
      }
    },
    _removeSubscriber(data) {
      if (data.info != undefined) {
        var leavingAdmin = data.info.name;
        var filteredSubscribers = this.get('mission').pusherSubscribers.filter(function (val) {
          return val != leavingAdmin;
        });
        this.get('mission').set('pusherSubscribers', filteredSubscribers);
      }
    }
  });
});
define('admin/services/pusher', ['exports', 'ember-pusher/services/pusher', 'npm:pusher-js'], function (exports, _pusher, _npmPusherJs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pusher.default;
    }
  });
});
define('admin/services/session-account', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var SessionAccount;

  SessionAccount = Ember.Service.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    account: Ember.computed('session.data.authenticated', function () {
      if (this.get('session.data.authenticated.token')) {
        return this.get('store').peekRecord('admin', this.get('session.data.authenticated.id'));
      }
    }),
    headers: Ember.computed('session.data.authenticated.token,session.data.authenticated.email', function () {
      return {
        "Authorization": "Token token=\"" + this.get('session.data.authenticated.token') + "\", email=\"" + this.get('session.data.authenticated.email') + "\""
      };
    }),
    urlParams: Ember.computed('session.data.authenticated.token,session.data.authenticated.email', function () {
      var email;
      email = encodeURIComponent("" + this.get('session.data.authenticated.email'));
      return "?auth=" + this.get('session.data.authenticated.token') + "," + email + "&full_screen=1";
    })
  });

  exports.default = SessionAccount;
});
define('admin/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('admin/services/upload-queue-manager', ['exports', 'admin/utils/uploader/queue', 'admin/utils/flatten'], function (exports, _queue, _flatten) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var UploadQueueManagerService;

  UploadQueueManagerService = Ember.Service.extend({
    init: function () {
      return this.set('queues', Ember.Map.create());
    },
    findOrCreate: function (name, component, config) {
      var queue;
      if (this.get('queues').has(name)) {
        queue = this.get('queues').get(name);
        if (config !== null) {
          queue.set('target', component);
          queue.configureUploader(config);
        }
      } else {
        queue = _queue.default.create({
          name: name,
          target: component
        });
        this.get('queues').set(name, queue);
        queue.configureUploader(config);
      }
      return queue;
    }
  });

  exports.default = UploadQueueManagerService;
});
define('admin/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("admin/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kXjxWm0I", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"main-navigation\"],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"container container-main\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"outlet\",[\"modal\"],null],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/application.hbs" } });
});
define("admin/templates/badges/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TPnEuYvu", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix edit-badge\"],[8],[0,\"\\n  \"],[6,\"h3\"],[10,\"class\",\"pull-left\"],[8],[1,[22,[\"model\",\"badge\",\"name\"]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n\\t\"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"save\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\\t\\t  \"],[6,\"div\"],[10,\"class\",\"col-md-4 badge-col\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"h4\"],[8],[0,\"Badge\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"p\"],[8],[0,\"Pilot will receive a badge on completion of the following steps\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"label\"],[8],[0,\"Badge name\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"input\"],[10,\"name\",\"badge-name\"],[11,\"value\",[27,[[22,[\"model\",\"badge\",\"name\"]]]]],[10,\"class\",\"form-control\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"changedName\"],null]],[10,\"type\",\"text\"],[8],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\n\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"row edit-badge\"],[8],[0,\"\\n\\t\\t  \"],[6,\"div\"],[10,\"class\",\"col-md-4 badge-col right-seperator\"],[8],[0,\"\\n\\t\\t  \\t\"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"h4\"],[8],[0,\"1. Online Training (Mindflash)\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"p\"],[8],[0,\"Select the online course that is required. Pilots must pass the course in order to proceed to step 2\"],[9],[0,\"\\n\\t\\t\\t  \"],[9],[0,\"\\n\\t\\t\\t  \"],[6,\"label\"],[8],[0,\"Mindflash Course\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"selectName\",\"action\",\"optionLabelPath\",\"optionValuePath\",\"promptDisabled\",\"prompt\"],[[22,[\"model\",\"mindflashSeries\"]],[22,[\"model\",\"badge\",\"required_program\"]],\"program-select\",[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"badge\",\"required_program\"]]],null]],null],\"name\",\"id\",false,\"Not Required\"]]],false],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"refresh-mindflash\"],[3,\"action\",[[21,0,[]],\"refreshMindflashCourses\"]],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"img\"],[10,\"src\",\"/assets/images/refresh_icon.svg\"],[8],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"span\"],[8],[0,\"Update Courses\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"col-md-4 badge-col right-seperator\"],[8],[0,\"\\n\\t\\t  \\t\"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"h4\"],[8],[0,\"2. Background Check (Checkr)\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"p\"],[8],[0,\"Select the background check that is required for this badge. Pilot must clear the background check in order to proceed to step 3.\"],[9],[0,\"\\n\\t\\t\\t  \"],[9],[0,\"\\n\\t\\t\\t  \"],[6,\"label\"],[8],[0,\"Checkr Package\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"selectName\",\"optionLabelPath\",\"optionValuePath\",\"promptDisabled\",\"action\",\"prompt\"],[[22,[\"model\",\"checkrPackages\"]],[22,[\"model\",\"badge\",\"required_checkr_package\"]],\"checkr-package-select\",\"name\",\"id\",false,[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"badge\",\"required_checkr_package\"]]],null]],null],\"Not Required\"]]],false],[0,\"\\n\\t\\t\\t\\t \"],[6,\"b\"],[8],[0,\"Included Screenings:\"],[9],[0,\"\\n\\t\\t\\t\\t \"],[6,\"ul\"],[8],[0,\"\\n\\t\\t\\t\\t \\t\"],[6,\"li\"],[8],[0,\"National Criminal Search\"],[9],[0,\"\\n\\t\\t\\t\\t \\t\"],[6,\"li\"],[8],[0,\"Sex Offender Search\"],[9],[0,\"\\n\\t\\t\\t\\t \\t\"],[6,\"li\"],[8],[0,\"Ssn Trace\"],[9],[0,\"\\n\\t\\t\\t\\t \\t\"],[6,\"li\"],[8],[0,\"Global Watchlist Search\"],[9],[0,\"\\n\\t\\t\\t\\t \"],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"col-md-4 badge-col\"],[8],[0,\"\\n\\t\\t  \\t\"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"h4\"],[8],[0,\"3. Training Mission\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"p\"],[8],[0,\"Select the package with the desired shotlist for training mission below.\"],[9],[0,\"\\n\\t\\t\\t  \"],[9],[0,\"\\n\\t\\t\\t  \"],[6,\"label\"],[8],[0,\"Package\"],[9],[0,\"\\n\\t\\t\\t  \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"selectName\",\"optionLabelPath\",\"optionValuePath\",\"promptDisabled\",\"action\",\"prompt\"],[[22,[\"model\",\"trainingPackages\"]],[22,[\"model\",\"badge\",\"required_training_package\"]],\"training-package-select\",\"selectOption\",\"id\",false,[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"badge\",\"required_training_package\"]]],null]],null],\"Not Required\"]]],false],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"save-badge\"],[8],[0,\"\\n\\t    \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"SAVE\",\"btn btn-lg turquoise-button\"]]],false],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/badges/edit.hbs" } });
});
define("admin/templates/badges/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KTYgyLXU", "block": "{\"symbols\":[\"badge\"],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix badges\"],[8],[0,\"\\n  \"],[6,\"h3\"],[10,\"class\",\"pull-left\"],[8],[0,\"Badges\"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n    \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"badges\",\"length\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"new-badge\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn turquoise-button new-badge\"],[8],[4,\"link-to\",[\"badges.new\"],[[\"disabled\"],[true]],{\"statements\":[[0,\"NEW BADGE\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"table\"],[10,\"class\",\"pe-table table badge-list\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Created Date\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Requirements\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"badges\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[10,\"class\",\"badge-row\"],[8],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_at\"]],\"MM/DD/YY, h:mm a\"],null],false],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"requirements\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"mindflash_series_name\"]]],null,{\"statements\":[[0,\"          \"],[6,\"p\"],[8],[0,\"Mindflash: \"],[1,[21,1,[\"mindflash_series_name\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[21,1,[\"training_package_name\"]]],null,{\"statements\":[[0,\"          \"],[6,\"p\"],[8],[0,\"Training: \"],[1,[21,1,[\"training_package_name\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[21,1,[\"checkr_package_name\"]]],null,{\"statements\":[[0,\"          \"],[6,\"p\"],[8],[0,\"Checkr: \"],[1,[21,1,[\"checkr_package_name\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"td\"],[8],[4,\"link-to\",[\"badges.edit\",[21,1,[\"id\"]]],[[\"class\"],[\"action pull-right\"]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/badges/index.hbs" } });
});
define("admin/templates/clients", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EjmOKR/l", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients.hbs" } });
});
define("admin/templates/clients/client", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QmdHGgk2", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"clients/client-form\",null,[[\"client\",\"editClientModal\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"openEditClientModal\"],null]]]],false],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client.hbs" } });
});
define("admin/templates/clients/client/images/image", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Jgi541wb", "block": "{\"symbols\":[],\"statements\":[[6,\"img\"],[11,\"src\",[27,[[20,\"url\"]]]],[10,\"alt\",\"test\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/images/image.hbs" } });
});
define("admin/templates/clients/client/images/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NK8Ob4OC", "block": "{\"symbols\":[],\"statements\":[[0,\"dasdsadasdadas\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/images/new.hbs" } });
});
define("admin/templates/clients/client/locations/modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "On3skSA/", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\"],[\"close\"]],{\"statements\":[[0,\"  \"],[1,[26,\"mission-map\",null,[[\"action\",\"model\",\"title\"],[\"createLocation\",[22,[\"model\"]],\"New Location\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/locations/modal.hbs" } });
});
define("admin/templates/clients/client/missions/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4Cgyqrs1", "block": "{\"symbols\":[\"package\",\"package\",\"package\",\"csv\",\"mission\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-tabs\"],[8],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"clientMissions\"],null],\"active\"],null]],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"clientMissions\"]],[8],[0,\"Client Missions\"],[9],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"imports\"],null],\"active\"],null]],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"imports\"]],[8],[0,\"Imports\"],[9],[9],[0,\"\\n    \"],[6,\"li\"],[8],[4,\"link-to\",[\"missions.new\",[22,[\"client\",\"id\"]]],null,{\"statements\":[[6,\"i\"],[10,\"class\",\"fa fa-plus\"],[8],[9],[0,\" Mission\"]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"packages\"],null],\"active\"],null]],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"packages\"]],[8],[0,\"Packages\"],[9],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"clientMissions\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 top-buffer\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n    \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n      \"],[6,\"thead\"],[8],[0,\"\\n        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Status\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Created\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Scheduled\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Price\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Package\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Ref. Id\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"missions\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,5,[\"id\"]],false],[0,\"\\n\"],[4,\"if\",[[21,5,[\"isOnHold\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"on-hold-warning\"],[8],[0,\"\\n                  \"],[6,\"i\"],[10,\"class\",\"fa fa-warning\"],[8],[9],[0,\"\\n                  \"],[6,\"span\"],[8],[0,\"On Hold\"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,5,[\"status\"]]],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,5,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[4,\"if\",[[21,5,[\"scheduled_at_start\"]]],null,{\"statements\":[[1,[26,\"moment-format\",[[21,5,[\"scheduled_at_start\"]],\"MM/DD/YY\"],[[\"timeZone\"],[[21,5,[\"location\",\"timezone_id\"]]]]],false]],\"parameters\":[]},null],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"format-dollar\",[[21,5,[\"price\"]]],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,5,[\"package\",\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,5,[\"location\",\"formatted_address\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,5,[\"reference_id\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[4,\"link-to\",[\"missions.edit\",[21,5,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Edit / Upload\"]],\"parameters\":[]},null],[0,\" |\\n            \"],[4,\"link-to\",[\"missions.map\",[21,5,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Map\"]],\"parameters\":[]},null],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\",\"missions\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"imports\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 top-buffer bottom-buffer\"],[8],[0,\"\\n  \"],[6,\"a\"],[10,\"class\",\"btn btn-default pull-right\"],[3,\"action\",[[21,0,[]],\"refresh\"]],[8],[6,\"i\"],[10,\"class\",\"fa fa-refresh\"],[8],[9],[0,\" Refresh\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n    \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n      \"],[6,\"thead\"],[8],[0,\"\\n        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Status\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Date\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Imported By\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Package\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Original CSV\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Missions Created\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Errors\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedCsvs\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[11,\"class\",[26,\"if\",[[21,4,[\"error\"]],\"error\"],null]],[8],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,4,[\"id\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,4,[\"displayStatus\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,4,[\"created_at\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,4,[\"admin\",\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,4,[\"default_mission_package\",\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[6,\"a\"],[11,\"href\",[21,4,[\"attachment_csv_url\"]]],[8],[0,\"Download\"],[9],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,4,[\"completed_csv_url\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[11,\"href\",[21,4,[\"completed_csv_url\"]]],[8],[1,[21,4,[\"mission_created\"]],false],[0,\" missions\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[21,4,[\"pending\"]]],null,{\"statements\":[[0,\"                pending\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[1,[21,4,[\"mission_created\"]],false],[0,\" missions\\n\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,4,[\"errored_csv_url\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[11,\"href\",[21,4,[\"errored_csv_url\"]]],[8],[1,[21,4,[\"errors\"]],false],[0,\" rows\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[21,4,[\"pending\"]]],null,{\"statements\":[[0,\"                pending\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[1,[21,4,[\"errors\"]],false],[0,\" rows\\n\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"packages\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 top-buffer clients\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"organization-packages-table\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"hasAvailableOrganizationPackages\"]]],null,{\"statements\":[[0,\"          \"],[4,\"link-to\",[\"clients.organization\",[22,[\"model\",\"client\",\"organization\",\"id\"]]],[[\"class\"],[\"edit-link edit-organization\"]],{\"statements\":[[1,[22,[\"model\",\"client\",\"organization\",\"name\"]],false]],\"parameters\":[]},null],[0,\" Packages\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"h4\"],[10,\"class\",\"section-header\"],[8],[0,\"Organization Packages\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"client\",\"organization\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"hasAvailableOrganizationPackages\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"table-responsive no-padding-bottom\"],[8],[0,\"\\n            \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n              \"],[6,\"thead\"],[10,\"class\",\"dronebase-table-header\"],[8],[0,\"\\n                \"],[6,\"tr\"],[8],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"\\n                    \"],[6,\"span\"],[10,\"class\",\"fa fa-eye\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"Visible to Client\"],[8],[9],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"Vertical\"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"Price\"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"Instructions\"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[0,\"Template\"],[9],[0,\"\\n                  \"],[6,\"th\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"client\",\"organization\",\"packages\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-in\",[[21,3,[]],[22,[\"model\",\"client\",\"available_packages\"]]],null]],null,{\"statements\":[[0,\"                  \"],[6,\"tr\"],[8],[0,\"\\n                    \"],[6,\"td\"],[8],[0,\"\\n                      \"],[1,[26,\"client-package-checkbox\",null,[[\"model\",\"available_package\",\"disabled\"],[[22,[\"model\"]],[21,3,[]],true]]],false],[0,\"\\n                    \"],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[1,[21,3,[\"vertical\",\"name\"]],false],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[1,[21,3,[\"name\"]],false],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[1,[26,\"format-dollar\",[[21,3,[\"price\"]]],null],false],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[1,[21,3,[\"mission_instructions\"]],false],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[1,[21,3,[\"template\",\"name\"]],false],[9],[0,\"\\n                    \"],[6,\"td\"],[8],[0,\"\\n                      \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n                        \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n                           \"],[6,\"span\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[0,\"\\n                        \"],[9],[0,\"\\n                        \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                          \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clonePackage\",[22,[\"model\"]],[21,3,[]]]],[8],[0,\"Clone as Custom Package\"],[9],[9],[0,\"\\n                        \"],[9],[0,\"\\n                      \"],[9],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[3]},null],[0,\"              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"no-packages-note\"],[8],[0,\" There are currently no visible packages for \"],[4,\"link-to\",[\"clients.organization\",[22,[\"model\",\"client\",\"organization\",\"id\"]]],[[\"class\"],[\"edit-link edit-organization\"]],{\"statements\":[[1,[22,[\"model\",\"client\",\"organization\",\"name\"]],false]],\"parameters\":[]},null],[0,\" \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"no-packages-note\"],[8],[0,\" The organization hasn't been set. \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"h4\"],[10,\"class\",\"section-header\"],[8],[0,\"Custom Packages\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive no-padding-bottom\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[10,\"class\",\"dronebase-table-header\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"\\n              \"],[6,\"span\"],[10,\"class\",\"fa fa-eye\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"Visible to Client\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Vertical\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Price\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Instructions\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Template\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedClientPackages\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[1,[26,\"client-package-checkbox\",null,[[\"model\",\"available_package\"],[[22,[\"model\"]],[21,2,[]]]]],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,2,[\"vertical\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,2,[\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"format-dollar\",[[21,2,[\"price\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,2,[\"mission_instructions\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,2,[\"template\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n                \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n                   \"],[6,\"span\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                  \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editPackage\",[22,[\"model\"]],[21,2,[]]]],[8],[0,\"Edit\"],[9],[9],[0,\"\\n                  \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clonePackage\",[22,[\"model\"]],[21,2,[]]]],[8],[0,\"Clone\"],[9],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"add-package-btn\"],[8],[0,\"\\n      \"],[6,\"a\"],[10,\"class\",\"btn btn btn-info\"],[3,\"action\",[[21,0,[]],\"newPackage\",[22,[\"model\"]]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-plus\"],[8],[9],[0,\" Add Custom Package\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"h4\"],[10,\"class\",\"section-header\"],[8],[0,\"Dronebase Packages\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[10,\"class\",\"dronebase-table-header\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[6,\"span\"],[10,\"class\",\"fa fa-eye\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"Visible to Client\"],[8],[9],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Vertical\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Organization\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Price\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Instructions\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Template\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"public_packages\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[1,[26,\"client-package-checkbox\",null,[[\"model\",\"available_package\"],[[22,[\"model\"]],[21,1,[]]]]],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"vertical\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"organization\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"format-dollar\",[[21,1,[\"price\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"mission_instructions\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"template\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n                \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n                   \"],[6,\"span\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                  \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clonePackage\",[22,[\"model\"]],[21,1,[]]]],[8],[0,\"Clone as Custom Package\"],[9],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/missions/index.hbs" } });
});
define("admin/templates/clients/client/missions/modal-package", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GrXNk+k6", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\",\"animatable\",\"fullScreen\",\"appendedClasses\"],[\"close\",true,\"true\",\"full-screen-modal client-package-modal\"]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[1,[26,\"clients/package-form\",null,[[\"mode\",\"model\",\"savePackageAction\",\"closeModalAction\"],[\"Client\",[22,[\"model\"]],\"savePackage\",\"closeModal\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/missions/modal-package.hbs" } });
});
define("admin/templates/clients/client/missions/modal-payout", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+3K1IAA1", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\"],[\"close\"]],{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Pilot Payout\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[1,[26,\"pilot-payout\",null,[[\"action\",\"model\"],[\"payPilot\",[22,[\"model\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/client/missions/modal-payout.hbs" } });
});
define("admin/templates/clients/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EVvCLIY5", "block": "{\"symbols\":[\"client\"],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Clients\"],[9],[0,\" \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n      \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"client name, email, company and organization\",\"form-control\"]]],false],[0,\"\\n\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"btn btn-sm btn-default pull-right ember-view\"],[3,\"action\",[[21,0,[]],\"openNewClientModal\"]],[8],[6,\"i\"],[10,\"class\",\"fa fa-plus\"],[8],[9],[0,\" Client\"],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n    \"],[6,\"thead\"],[8],[0,\"\\n      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Email\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Company\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Organization\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Actions\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"clients\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"fullName\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"company_name\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"organization\",\"name\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n               \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n              \"],[6,\"li\"],[8],[4,\"link-to\",[\"clients.client.missions\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"View\"]],\"parameters\":[]},null],[9],[0,\"\\n              \"],[6,\"li\"],[8],[4,\"link-to\",[\"missions.new\",[21,1,[\"id\"]]],null,{\"statements\":[[0,\"New Mission\"]],\"parameters\":[]},null],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\"]],\"Loading more Clients...\",\"All Clients loaded.\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/index.hbs" } });
});
define("admin/templates/clients/organization", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6j/0YwR1", "block": "{\"symbols\":[\"client\",\"package\"],\"statements\":[[6,\"div\"],[10,\"class\",\"organization-page\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"organization-name\"],[8],[1,[22,[\"model\",\"organization\",\"name\"]],false],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"edit-data\"],[8],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"\\n        Organization Name\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\",\"key-press\"],[[22,[\"newName\"]],\"org-name\",\"form-control org-name-input\",[26,\"action\",[[21,0,[]],\"changedName\"],null]]]],false],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"showSaveButton\"]]],null,{\"statements\":[[0,\"      \"],[6,\"button\"],[10,\"class\",\"turquoise-border-button\"],[3,\"action\",[[21,0,[]],\"saveNewName\"]],[8],[0,\"SAVE\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"organization-packages\"],[8],[0,\"\\n    \"],[6,\"h4\"],[10,\"class\",\"table-header\"],[8],[0,\"Organization Packages\\n      \"],[6,\"div\"],[10,\"class\",\"pretable-note\"],[8],[0,\"Clients belonging to this Organization can see its packages when placing orders. \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"package-list-header dronebase-table-header\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"visibility\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"fa fa-eye\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"Visible to Client\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"vertical\"],[8],[0,\" Vertical \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"name\"],[8],[0,\" Name \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"price\"],[8],[0,\" Price \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"slug\"],[8],[0,\" Slug \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"instructions\"],[8],[0,\" Instructions \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"template\"],[8],[0,\" Template \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"model\",\"organization\",\"packages\",\"length\"]]],null,{\"statements\":[[4,\"each\",[[22,[\"model\",\"organization\",\"packages\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"package-list-item\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"visibility\"],[8],[0,\"\\n            \"],[1,[26,\"organization-package-checkbox\",null,[[\"model\",\"available_package\"],[[22,[\"model\"]],[21,2,[]]]]],false],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"vertical\"],[8],[0,\" \"],[1,[21,2,[\"vertical\",\"name\"]],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"name\"],[8],[0,\" \"],[1,[21,2,[\"name\"]],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"price\"],[8],[0,\" \"],[1,[26,\"format-dollar\",[[21,2,[\"price\"]]],null],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"slug\"],[8],[0,\" \"],[1,[21,2,[\"slug\"]],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"instructions\"],[8],[0,\" \"],[1,[21,2,[\"mission_instructions\"]],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"template\"],[8],[0,\" \"],[1,[21,2,[\"template\",\"name\"]],false],[0,\" \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n               \"],[6,\"span\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n              \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editPackage\",[22,[\"model\"]],[21,2,[]]]],[8],[0,\"Edit\"],[9],[9],[0,\"\\n              \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clonePackage\",[22,[\"model\"]],[21,2,[]]]],[8],[0,\"Clone\"],[9],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"no-package\"],[8],[0,\"There is no package on this organization yet.\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"openAddPackageModal\"]],[8],[0,\"ADD PACKAGE\"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"client-list-header row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-10\"],[8],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"table-header\"],[8],[0,\"Client list \"],[6,\"span\"],[10,\"class\",\"total-clients\"],[8],[0,\"(\"],[1,[22,[\"model\",\"organization\",\"clients\",\"length\"]],false],[0,\")\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pretable-note\"],[8],[0,\"\\n        Use this when setting up a new Organization by adding EXISTING client accounts. New customers should sign up through their landing page. Clients can only belong to one Organization at a time.\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"add-client-form row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-10\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\" \"],[6,\"span\"],[10,\"class\",\"darkblue\"],[8],[0,\"Email(s)\"],[9],[0,\" separated by comma\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"insert-newline\",\"value\",\"class\",\"placeholder\"],[\"addNewClients\",[22,[\"newClients\"]],\"form-control new-client-emails\",\"clientemail@dronebase.com\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-2\"],[8],[0,\"\\n          \"],[1,[26,\"button-to-circle\",null,[[\"text\",\"submit\",\"saveState\",\"classes\",\"border\"],[\"Add\",\"addNewClients\",[22,[\"saveState\"]],\"btnSubmit turquoise-border-button\",true]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"notFoundClients\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"col-md-10 error-message\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"error\"],[8],[0,\"\\n          These customers don’t exist in our database.\\n        \"],[9],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[1,[20,\"notFoundClients\"],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n    \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n      \"],[6,\"thead\"],[10,\"class\",\"dronebase-table-header\"],[8],[0,\"\\n        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Email\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"organization\",\"clients\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[6,\"span\"],[10,\"class\",\"turquoise-text\"],[8],[1,[21,1,[\"added\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/organization.hbs" } });
});
define("admin/templates/clients/organization/modal-package", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "krdkYnqT", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\",\"animatable\",\"fullScreen\",\"appendedClasses\"],[\"close\",true,\"true\",\"full-screen-modal client-package-modal organization\"]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[1,[26,\"clients/package-form\",null,[[\"mode\",\"model\",\"savePackageAction\",\"closeModalAction\"],[\"Organization\",[22,[\"model\"]],\"savePackage\",\"closeModal\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/organization/modal-package.hbs" } });
});
define("admin/templates/clients/organization/modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pgU5VFIs", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\",\"appendedClasses\",\"animatable\",\"fullScreen\"],[\"close\",\"full-screen-modal\",true,\"true\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid new-org-modal\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"New Organization\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"close-modal\"],[8],[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-6 organization-inputs\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"\\n            Organization Name\\n          \"],[9],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"model\",\"organization\",\"name\"]],\"form-control\",\"\"]]],false],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"\\n            Reference ID\\n          \"],[9],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"model\",\"organization\",\"referenceId\"]],\"form-control\",\"\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"new-org-button-row\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"turquoise-border-button\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"CANCEL\"],[9],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"saveOrganization\",[22,[\"model\"]]]],[8],[0,\"CREATE\"],[9],[0,\"\\n          \"],[9],[0,\"\\n\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/organization/modal.hbs" } });
});
define("admin/templates/clients/organizations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qrQhZAms", "block": "{\"symbols\":[\"organization\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body organization\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"missions-list no-filter\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Organizations\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n        \"],[2,\" TODO rewrite it with meta\"],[0,\"\\n        \"],[6,\"h4\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"length\"]],false],[9],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"turquoise-button new-org-button\"],[3,\"action\",[[21,0,[]],\"newOrganization\",[22,[\"model\"]]]],[8],[0,\"NEW ORGANIZATION\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"org-table\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"org-table-header\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"name\"],[8],[0,\"\\n          Name\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"created\"],[8],[0,\"\\n          Created\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"contact\"],[8],[0,\"\\n          Contact\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"view\"],[8],[0,\"\\n          \"],[2,\" deliberately empty \"],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"org-table-body\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"org-table-item\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"name\"],[8],[0,\"\\n              \"],[1,[21,1,[\"name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"created\"],[8],[0,\"\\n              \"],[1,[21,1,[\"created\"]],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"contact\"],[8],[0,\"\\n              \"],[1,[21,1,[\"contact\"]],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"view\"],[8],[0,\"\\n              \"],[6,\"a\"],[11,\"href\",[27,[\"/clients/organization/\",[21,1,[\"id\"]]]]],[8],[0,\"View\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/clients/organizations.hbs" } });
});
define("admin/templates/components/add-camera-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Rdv2pHf5", "block": "{\"symbols\":[\"error\",\"error\",\"error\",\"error\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"pe-modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pe-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[0,\"            Edit Camera\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            Create New Camera\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Brand\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12 form-group-padding-fix\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"selection\",\"action\",\"prompt\",\"selectClass\"],[\"name\",[22,[\"droneManufacturers\"]],[22,[\"currentRecord\",\"drone_manufacturer\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"currentRecord\",\"drone_manufacturer\"]]],null]],null],\"Brand\",\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"drone_manufacturer\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,4,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Model\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"currentRecord\",\"name\"]],\"form-control\",\"Camera Model\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"name\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,3,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Mega Pixels\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"currentRecord\",\"mega_pixels\"]],\"form-control\",\"Mega Pixels\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"mega_pixels\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,2,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Type\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"currentRecord\",\"thermal\"]]]]],false],[0,\" Thermal\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"device_type\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,1,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn create-button\"],[3,\"action\",[[21,0,[]],\"submit\"]],[8],[0,\"\\n            Save\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\" \"],[0,\"\\n  \"],[9],[0,\" \"],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/add-camera-modal.hbs" } });
});
define("admin/templates/components/add-device-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Jq6IaQ6K", "block": "{\"symbols\":[\"error\",\"error\",\"error\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"pe-modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pe-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[0,\"            Edit Device\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            Create New Device\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Operating System\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"select-enum\",null,[[\"content\",\"selection\",\"prompt\",\"selectClass\"],[[22,[\"operatingSystems\"]],[22,[\"currentRecord\",\"operating_system\"]],\"Operating System\",\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"operating_system\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,3,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Model\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"currentRecord\",\"name\"]],\"form-control\",\"Device Model\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"name\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,2,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Type\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"select-enum\",null,[[\"content\",\"selection\",\"prompt\",\"selectClass\"],[[22,[\"deviceTypes\"]],[22,[\"currentRecord\",\"device_type\"]],\"Device Type\",\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"device_type\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,1,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn create-button\"],[3,\"action\",[[21,0,[]],\"submit\"]],[8],[0,\"\\n            Save\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\" \"],[0,\"\\n  \"],[9],[0,\" \"],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/add-device-modal.hbs" } });
});
define("admin/templates/components/add-drone-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6/dlIFS8", "block": "{\"symbols\":[\"error\",\"camera\",\"camera\",\"error\",\"error\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"pe-modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pe-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[0,\"            Edit Drone\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            Create New Drone\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Brand\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12 form-group-padding-fix\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"selection\",\"action\",\"prompt\",\"selectClass\"],[\"name\",[22,[\"droneManufacturers\"]],[22,[\"currentRecord\",\"drone_manufacturer\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"currentRecord\",\"drone_manufacturer\"]]],null]],null],\"Brand\",\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"drone_manufacturer\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,5,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Model\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"currentRecord\",\"name\"]],\"form-control\",\"Drone Model\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"name\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,4,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Stock Camera\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12 form-group-padding-fix\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"prompt\",\"action\",\"useSendAction\",\"selectClass\"],[\"name\",[22,[\"cameras\"]],\"Camera\",\"addStockCamera\",true,\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"camera-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"stock_cameras\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"camera-pill\"],[8],[0,\"\\n                \"],[1,[21,3,[\"name\"]],false],[0,\" \"],[4,\"unless\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[6,\"span\"],[10,\"class\",\"fa fa-times-circle\"],[3,\"action\",[[21,0,[]],\"removeStockCamera\",[21,3,[]]]],[8],[9]],\"parameters\":[]},null],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Optional Camera\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12 form-group-padding-fix\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"prompt\",\"action\",\"useSendAction\",\"selectClass\"],[\"name\",[22,[\"cameras\"]],\"Camera\",\"addOptionalCamera\",true,\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"camera-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"optional_cameras\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"camera-pill\"],[8],[0,\"\\n                \"],[1,[21,2,[\"name\"]],false],[0,\" \"],[4,\"unless\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[6,\"span\"],[10,\"class\",\"fa fa-times-circle\"],[3,\"action\",[[21,0,[]],\"removeOptionalCamera\",[21,2,[]]]],[8],[9]],\"parameters\":[]},null],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Type\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"select-enum\",null,[[\"content\",\"selection\",\"prompt\",\"selectClass\"],[[22,[\"droneTypes\"]],[22,[\"currentRecord\",\"drone_type\"]],\"Drone Type\",\"form-control input-md\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"drone_type\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,1,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn create-button\"],[3,\"action\",[[21,0,[]],\"submit\"]],[8],[0,\"\\n            Save\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\" \"],[0,\"\\n  \"],[9],[0,\" \"],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/add-drone-modal.hbs" } });
});
define("admin/templates/components/add-pilot-equipment-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BMOMpHF9", "block": "{\"symbols\":[\"error\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"pe-modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pe-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"currentRecord\",\"id\"]]],null,{\"statements\":[[0,\"            Edit Pilot Equipment\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            Create New Pilot Equipment\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Equipment Type\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"currentRecord\",\"name\"]],\"form-control\",\"Equipment Type\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"currentRecord\",\"errors\",\"name\"]]],null,{\"statements\":[[0,\"              \"],[1,[21,1,[\"message\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn create-button\"],[3,\"action\",[[21,0,[]],\"submit\"]],[8],[0,\"\\n            Save\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\" \"],[0,\"\\n  \"],[9],[0,\" \"],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/add-pilot-equipment-modal.hbs" } });
});
define("admin/templates/components/asset-share", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SOw9E/qZ", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"isShareable\"]]],null,{\"statements\":[[0,\"  \"],[6,\"a\"],[11,\"class\",[27,[[20,\"buttonClassNames\"]]]],[3,\"action\",[[21,0,[]],[22,[\"shareCreateAction\"]],[22,[\"shareable\"]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-share-alt-square\"],[8],[9],[0,\" \"],[1,[20,\"linkText\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"a\"],[11,\"class\",[27,[[20,\"buttonClassNames\"],\" disabled\"]]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-share-alt-square\"],[8],[9],[0,\" \"],[1,[20,\"linkText\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"if\",[[22,[\"showShareModal\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"translucentOverlay\",\"class\"],[true,\"modal-content\"]],{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"modal-header\"],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-close close\"],[3,\"action\",[[21,0,[]],\"hideShareModal\",[22,[\"shareable\"]]]],[8],[9],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"modal-title\"],[8],[1,[26,\"asset-share-header\",[[22,[\"shareable\"]]],null],false],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"modal-body\"],[8],[0,\"\\n      Link \"],[6,\"a\"],[11,\"href\",[27,[[20,\"shareLink\"]]]],[10,\"class\",\"pull-right\"],[10,\"target\",\"_blank\"],[8],[0,\"Preview\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input-readonly-select-all\",null,[[\"value\",\"class\"],[[22,[\"shareLink\"]],\"form-control\"]]],false],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"text-notes\"],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-globe\"],[8],[9],[0,\"\\n        Only people who have this link can see your assets\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"modal-footer\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-default\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"hideShareModal\",[22,[\"mission\"]]]],[8],[0,\"Close\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/asset-share.hbs" } });
});
define("admin/templates/components/asset-uploader", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Wr9+Zgly", "block": "{\"symbols\":[\"file\"],\"statements\":[[6,\"div\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"upload-actions\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"queue\",\"uploading\"]]],null,{\"statements\":[[0,\"    \"],[6,\"span\"],[10,\"class\",\"progress-text\"],[8],[1,[22,[\"queue\",\"uploadProgressText\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"a\"],[11,\"id\",[27,[\"upload-asset-\",[20,\"shot_id\"]]]],[10,\"class\",\"btn btn-lg btn-default button button-mg-right button-width\"],[8],[0,\"\\n      \"],[6,\"img\"],[10,\"src\",\"/assets/images/upload.svg\"],[8],[9],[0,\" Upload Files\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"if\",[[22,[\"queue\",\"uploadsQueued\"]]],null,{\"statements\":[[0,\"    \"],[6,\"a\"],[10,\"class\",\"btn btn-lg btn-success button-width\"],[3,\"action\",[[21,0,[]],\"startUpload\",[22,[\"queue\",\"uploader\"]]]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-cloud-upload\"],[8],[9],[0,\" Start Uploading\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"queue\",\"content\"]]],null,{\"statements\":[[0,\"    \"],[6,\"span\"],[10,\"class\",\"check-all-raw\"],[8],[0,\"\\n      \"],[6,\"input\"],[11,\"onclick\",[20,\"toggleAllRaw\"]],[10,\"type\",\"checkbox\"],[8],[9],[0,\" All Raw\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"queue\",\"content\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"asset\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-cloud-upload\"],[8],[9],[0,\" \"],[1,[21,1,[\"sanitizedName\"]],false],[0,\"\\n\"],[4,\"if\",[[21,1,[\"uploading\"]]],null,{\"statements\":[[0,\"          \"],[1,[21,1,[\"progress\"]],false],[0,\"%\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"pull-right\"],[3,\"action\",[[21,0,[]],\"removeAsset\",[22,[\"queue\",\"uploader\"]],[21,1,[]]]],[8],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-remove\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"pull-right file-edited\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[21,1,[\"raw\"]]]]],false],[0,\" Raw\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"progress\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"progress-bar\"],[10,\"role\",\"progressbar\"],[11,\"aria-valuenow\",[27,[[21,1,[\"progress\"]]]]],[10,\"aria-valuemin\",\"0\"],[10,\"aria-valuemax\",\"100\"],[11,\"style\",[27,[\"width: \",[21,1,[\"progress\"]],\"%\"]]],[8],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/asset-uploader.hbs" } });
});
define("admin/templates/components/button-to-circle", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JI8HsK6R", "block": "{\"symbols\":[],\"statements\":[[2,\" SVG templates \"],[0,\"\\n\"],[2,\" Would have used <use> but it's tricky to style and trasition Shadow DOM elements \"],[0,\"\\n\"],[6,\"div\"],[11,\"class\",[27,[\"button-to-circle \",[26,\"if\",[[22,[\"border\"]],\"with-borders\"],null]]]],[8],[0,\"\\n  \"],[6,\"svg\"],[10,\"class\",\"svg--template loader\"],[8],[0,\"\\n    \"],[6,\"circle\"],[10,\"class\",\"circle1\"],[10,\"stroke\",\"none\"],[10,\"stroke-width\",\"4\"],[10,\"fill\",\"none\"],[10,\"r\",\"25\"],[10,\"cx\",\"25\"],[10,\"cy\",\"25\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"svg\"],[10,\"class\",\"svg--template checkmark\"],[10,\"viewBox\",\"0 0 50 50\"],[8],[0,\"\\n    \"],[6,\"g\"],[10,\"class\",\"checkmark1\"],[8],[0,\"\\n      \"],[6,\"path\"],[10,\"class\",\"line1\"],[10,\"d\",\"M20.8,36l-4,4c-0.7,0.7-1.7,0.7-2.4,0L0.8,26.4c-0.7-0.7-0.7-1.7,0-2.4l4-4c0.7-0.7,1.7-0.7,2.4,0l13.6,13.6\\n      C21.5,34.3,21.5,35.4,20.8,36z\"],[8],[9],[0,\"\\n    \"],[6,\"path\"],[10,\"class\",\"line2\"],[10,\"d\",\"M14.5,39.9l-4-4c-0.7-0.7-0.7-1.7,0-2.4L43.4,0.6c0.7-0.7,1.7-0.7,2.4,0l4,4c0.7,0.7,0.7,1.7,0,2.4L16.9,39.9\\n      C16.3,40.6,15.2,40.6,14.5,39.9z\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"svg\"],[10,\"class\",\"svg--template cross\"],[10,\"viewBox\",\"0 0 50 50\"],[8],[0,\"\\n    \"],[6,\"path\"],[10,\"d\",\"m25,25l-9.3,-9.3\"],[8],[9],[0,\"\\n    \"],[6,\"path\"],[10,\"d\",\"m25,25l9.3,9.3\"],[8],[9],[0,\"\\n    \"],[6,\"path\"],[10,\"d\",\"m25,25l-9.3,9.3\"],[8],[9],[0,\"\\n    \"],[6,\"path\"],[10,\"d\",\"m25,25l9.3,-9.3\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"svg\"],[10,\"class\",\"svg--template\"],[10,\"viewBox\",\"0 0 304 305\"],[10,\"version\",\"1.1\"],[10,\"id\",\"Layer_1\"],[10,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[8],[0,\"\\n    \"],[6,\"symbol\"],[10,\"id\",\"shadow--logo-dribbble\"],[8],[0,\"\\n      \"],[6,\"path\"],[10,\"id\",\"SVGID_1_\"],[10,\"d\",\"M152,298.2C73,298.2,8.7,234,8.7,155.1C8.7,76.2,73,12,152,12c79,0,143.3,64.2,143.3,143.1\\n        C295.3,234,231,298.2,152,298.2L152,298.2z M272.8,174.7c-4.2-1.3-37.9-11.4-76.2-5.2c16,43.9,22.5,79.7,23.8,87.1\\n        C247.8,238.1,267.4,208.7,272.8,174.7L272.8,174.7z M199.8,267.8c-1.8-10.7-8.9-48.1-26.1-92.7c-0.3,0.1-0.5,0.2-0.8,0.3\\n        c-69,24-93.8,71.8-96,76.3c20.8,16.2,46.8,25.8,75.1,25.8C168.9,277.5,185.1,274.1,199.8,267.8L199.8,267.8z M61.1,237\\n        c2.8-4.7,36.4-60.3,99.5-80.7c1.6-0.5,3.2-1,4.8-1.5c-3.1-6.9-6.4-13.9-9.9-20.7C94.3,152.4,35,151.7,29.7,151.6\\n        c0,1.2-0.1,2.5-0.1,3.7C29.6,186.7,41.5,215.4,61.1,237L61.1,237z M32.2,130.3c5.5,0.1,55.9,0.3,113.1-14.9\\n        c-20.3-36-42.1-66.3-45.4-70.7C65.7,60.8,40.1,92.3,32.2,130.3L32.2,130.3z M123.3,36.5c3.4,4.5,25.6,34.8,45.7,71.5\\n        c43.5-16.3,61.9-41,64.1-44.1c-21.6-19.1-50-30.8-81.1-30.8C142.1,33.1,132.5,34.3,123.3,36.5L123.3,36.5z M246.7,78\\n        c-2.6,3.5-23.1,29.7-68.3,48.2c2.8,5.8,5.6,11.7,8.1,17.7c0.9,2.1,1.8,4.2,2.6,6.3c40.7-5.1,81.2,3.1,85.2,3.9\\n        C274.1,125.3,263.8,98.8,246.7,78L246.7,78z\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"id\",\"browserAlert\"],[10,\"style\",\"display: none\"],[8],[6,\"span\"],[8],[9],[9],[0,\"\\n\\n  \"],[6,\"main\"],[8],[0,\"\\n    \"],[2,\" button \"],[0,\"\\n    \"],[6,\"button\"],[11,\"class\",[20,\"classes\"]],[3,\"action\",[[21,0,[]],\"buttonAction\"]],[8],[1,[20,\"text\"],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/button-to-circle.hbs" } });
});
define("admin/templates/components/camera-index-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bv5VkNh6", "block": "{\"symbols\":[\"camera\"],\"statements\":[[4,\"if\",[[22,[\"showModal\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"add-camera-modal\",null,[[\"close\",\"action\",\"droneManufacturers\",\"currentRecord\"],[[26,\"action\",[[21,0,[]],\"toggleModal\"],null],[26,\"action\",[[21,0,[]],\"saveRecord\"],null],[22,[\"droneManufacturers\"]],[22,[\"currentRecord\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"pe-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pe-title\"],[3,\"action\",[[21,0,[]],\"toggleCollapsed\"]],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"\\n      Cameras\\n\"],[4,\"if\",[[22,[\"collapsed\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-down\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-up\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"btn btn-add\"],[3,\"action\",[[21,0,[]],\"addRecord\"]],[8],[0,\"Add Camera\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"collapsed\"]]],null,{\"statements\":[[6,\"table\"],[10,\"class\",\"pe-table\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Brand\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Model\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Mega Pixels\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Type\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"allRecords\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"drone_manufacturer\",\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"mega_pixels\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[26,\"if\",[[21,1,[\"thermal\"]],\"Thermal\"],null],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[0,\"  \\n        \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editRecord\",[21,1,[]]]],[8],[0,\"Edit\"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"cloneRecord\",[21,1,[]]]],[8],[0,\"Clone\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/camera-index-list.hbs" } });
});
define("admin/templates/components/capacity-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3xTSDPJo", "block": "{\"symbols\":[\"timeslot\",\"index\",\"day\",\"day\"],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"close\",\"appendedClasses\",\"translucentOverlay\",\"hasOverlay\",\"fullScreen\"],[[26,\"action\",[[21,0,[]],\"close\"],null],\"capacity-modal full-screen-modal\",true,true,\"true\"]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"container-fluid capacity-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"Pilot Availability\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"close-modal\"],[8],[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"header-label\"],[8],[0,\"\\n      \"],[6,\"p\"],[8],[0,\"Below are the time slots for estimated pilot availability for this mission.\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"nav-dates\"],[8],[0,\"\\n        \"],[6,\"a\"],[11,\"class\",[27,[\"btn cancel-button \",[26,\"if\",[[26,\"is-equal\",[[22,[\"currPage\"]],1],null],\"disabled\"],null]]]],[11,\"disabled\",[26,\"is-equal\",[[22,[\"currPage\"]],1],null]],[3,\"action\",[[21,0,[]],\"resetPage\"]],[8],[0,\"TODAY\"],[9],[0,\"\\n        \"],[6,\"div\"],[11,\"disabled\",[26,\"check-if\",[[22,[\"currPage\"]],\"<\",2],null]],[3,\"action\",[[21,0,[]],\"prevPage\",[22,[\"currPage\"]]]],[8],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",\"/assets/images/left-arrow.svg\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"span\"],[8],[0,\" \"],[1,[26,\"moment-format\",[[22,[\"model\",\"currDays\",\"firstObject\",\"date\"]],\"MMM DD\"],null],false],[0,\" - \"],[1,[26,\"moment-format\",[[22,[\"model\",\"currDays\",\"lastObject\",\"date\"]],\"MMM DD\"],null],false],[0,\" \"],[9],[0,\"\\n        \"],[6,\"div\"],[11,\"disabled\",[26,\"check-if\",[[22,[\"currPage\"]],\">\",2],null]],[3,\"action\",[[21,0,[]],\"nextPage\",[22,[\"currPage\"]]]],[8],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",\"/assets/images/right-arrow.svg\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n          \"],[6,\"thead\"],[8],[0,\"\\n            \"],[6,\"tr\"],[8],[0,\"\\n              \"],[6,\"th\"],[8],[6,\"p\"],[10,\"class\",\"header\"],[8],[1,[20,\"timezone\"],false],[9],[9],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"currPage\"]],1],null]],null,{\"statements\":[[0,\"                \"],[6,\"th\"],[10,\"class\",\"unavailable\"],[8],[0,\"\\n                  \"],[6,\"p\"],[10,\"class\",\"day\"],[8],[1,[26,\"moment-format\",[[22,[\"dateToday\"]],\"ddd\"],null],false],[9],[0,\"\\n                  \"],[6,\"p\"],[10,\"class\",\"header date\"],[8],[1,[26,\"moment-format\",[[22,[\"dateToday\"]],\"DD\"],null],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[22,[\"model\",\"currDays\"]]],null,{\"statements\":[[0,\"                \"],[6,\"th\"],[8],[0,\"\\n                  \"],[6,\"p\"],[10,\"class\",\"day\"],[8],[1,[26,\"moment-format\",[[21,4,[\"date\"]],\"ddd\"],null],false],[9],[0,\"\\n                  \"],[6,\"p\"],[10,\"class\",\"header date\"],[8],[1,[26,\"moment-format\",[[21,4,[\"date\"]],\"DD\"],null],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"currDays\",\"0\",\"timeslots\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[8],[0,\"\\n              \"],[6,\"td\"],[8],[1,[26,\"format-timeslot\",[[21,1,[\"scheduled_at_start\"]],[21,1,[\"scheduled_at_end\"]],[22,[\"model\",\"mission\",\"location\",\"timezone_id\"]]],null],false],[9],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"currPage\"]],1],null]],null,{\"statements\":[[0,\"                \"],[6,\"td\"],[10,\"class\",\"capacity\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"unavailable\"],[8],[0,\"\\n                    \"],[6,\"p\"],[8],[0,\"Unavailable\"],[9],[0,\"\\n                    \"],[6,\"p\"],[10,\"class\",\"small\"],[8],[0,\"Same day schedule is unavailable at this time\"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[22,[\"model\",\"currDays\"]]],null,{\"statements\":[[0,\"                \"],[6,\"td\"],[10,\"class\",\"capacity\"],[3,\"action\",[[21,0,[]],\"selectSlot\",[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"scheduled_at_start\"],null],[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"scheduled_at_end\"],null]]],[8],[0,\"\\n                  \"],[6,\"div\"],[11,\"class\",[27,[\"capacity-details \",[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"capacity\"],null]]]],[8],[0,\"\\n                    \"],[6,\"span\"],[10,\"class\",\"popup hidden\"],[8],[0,\"\\n                      \"],[6,\"p\"],[8],[0,\"Av. score of pilots: \"],[6,\"span\"],[8],[1,[26,\"format-float\",[[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"average_score\"],null],2],null],false],[9],[9],[0,\"\\n                      \"],[6,\"p\"],[8],[0,\"Av. distance of pilots: \"],[6,\"span\"],[8],[1,[26,\"format-float\",[[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"average_distance\"],null],2],null],false],[9],[9],[0,\"\\n                      \"],[6,\"p\"],[8],[0,\"Av. pilot invites: \"],[6,\"span\"],[8],[1,[26,\"format-float\",[[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"average_pilot_invites\"],null],1],null],false],[9],[9],[0,\"\\n                      \"],[6,\"p\"],[8],[0,\"Available pilots: \"],[6,\"span\"],[8],[1,[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"pilots_found\"],null],false],[9],[9],[0,\"\\n                      \"],[6,\"p\"],[8],[0,\"Mission(s) sourcing: \"],[6,\"span\"],[8],[1,[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"missions_to_source\"],null],false],[9],[9],[0,\"\\n                    \"],[9],[0,\"\\n                    \"],[6,\"p\"],[8],[0,\"Available pilots: \"],[6,\"span\"],[8],[1,[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"pilots_found\"],null],false],[9],[9],[0,\"\\n                    \"],[6,\"p\"],[8],[0,\"Mission(s) sourcing: \"],[6,\"span\"],[8],[1,[26,\"dig-index-of\",[[21,3,[\"timeslots\"]],[21,2,[]],\"missions_to_source\"],null],false],[9],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group row\"],[8],[0,\"\\n      \"],[6,\"a\"],[10,\"class\",\"btn btn-secondary\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n        CANCEL\\n      \"],[9],[0,\"\\n      \"],[6,\"a\"],[11,\"class\",[27,[\"btn btn-primary \",[26,\"if\",[[26,\"is-blank\",[[22,[\"selectedStart\"]]],null],\"disabled\"],null]]]],[11,\"disabled\",[26,\"is-blank\",[[22,[\"selectedStart\"]]],null]],[3,\"action\",[[21,0,[]],\"saveSchedule\"]],[8],[0,\"\\n        CONFIRM\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/capacity-modal.hbs" } });
});
define("admin/templates/components/checkbox-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "194ECyDl", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[8],[0,\"\\n  \"],[6,\"label\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"allSelected\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"checked\",\"disabled\"],[\"checkbox\",[22,[\"formattedLabel\"]],true,true]]],false],[0,\" \\n        \"],[4,\"if\",[[22,[\"wrap\"]]],null,{\"statements\":[[6,\"span\"],[8],[1,[20,\"label\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[20,\"label\"],false],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"checked\"],[\"checkbox\",[22,[\"formattedLabel\"]],[22,[\"checked\"]]]]],false],[0,\"\\n        \"],[4,\"if\",[[22,[\"wrap\"]]],null,{\"statements\":[[6,\"span\"],[8],[1,[20,\"label\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[20,\"label\"],false],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/checkbox-item.hbs" } });
});
define("admin/templates/components/client-details-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ufIeY1/e", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"showDetails\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"client-details-view\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"header-row\"],[8],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"name\"],[8],[0,\"Client Contact\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"clients.client\",[22,[\"client\",\"id\"]]],[[\"class\"],[\"profile-link\"]],{\"statements\":[[0,\"View Profile\"]],\"parameters\":[]},null],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"body-row\"],[8],[0,\"\\n      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[1,[22,[\"client\",\"fullName\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[8],[1,[22,[\"client\",\"email\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[8],[1,[22,[\"client\",\"phone\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[8],[1,[22,[\"client\",\"company_name\"]],false],[9],[0,\"\\n        \"],[1,[26,\"open-client-app\",null,[[\"label\",\"params\"],[\"Login to this mission as the customer\",[22,[\"clientLoginParams\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"client\",\"invoiceable\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"invoiceable\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"disabled\",\"name\"],[\"checkbox\",\"true\",\"true\",\"Invoiceable\"]]],false],[0,\"\\n          Invoiced client\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/client-details-view.hbs" } });
});
define("admin/templates/components/client-package-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jvNNW8+T", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"client-package-checkbox \",[20,\"checkboxClass\"]]]],[3,\"action\",[[21,0,[]],\"toggleChecked\"]],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/client-package-checkbox.hbs" } });
});
define("admin/templates/components/clients/client-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "d7Sk9xMH", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"client\"]]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"client-page\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      Client Profile\\n      \"],[6,\"div\"],[10,\"class\",\"profile-link\"],[3,\"action\",[[21,0,[]],\"editProfile\"]],[8],[0,\"\\n        Edit\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-section client-profile\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n          \"],[6,\"div\"],[8],[1,[22,[\"client\",\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"div\"],[8],[1,[22,[\"client\",\"email\"]],false],[9],[0,\"\\n          \"],[6,\"div\"],[8],[1,[22,[\"client\",\"phone\"]],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"client\",\"invoiceable\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",\"invoiceable\"],[8],[0,\"\\n              \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"disabled\",\"name\"],[\"checkbox\",\"true\",\"true\",\"Invoiceable\"]]],false],[0,\"\\n              Invoiced client\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[1,[26,\"open-client-app\",null,[[\"label\",\"params\"],[\"Login as the customer\",[22,[\"clientLoginParams\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"client\",\"company_name\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",\"info-group\"],[8],[0,\"\\n              \"],[6,\"label\"],[8],[0,\"Company Name\"],[9],[0,\"\\n              \"],[1,[22,[\"client\",\"company_name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"client\",\"organization\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",\"info-group\"],[8],[0,\"\\n              \"],[6,\"label\"],[8],[0,\"Organization\"],[9],[0,\"\\n              \"],[1,[22,[\"client\",\"organization\",\"name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/clients/client-form.hbs" } });
});
define("admin/templates/components/clients/client-profile-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "16Agfel8", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n  \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"Client Profile\"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"close-modal\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"closeModal\"]],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"first_name\"],[8],[0,\"First Name\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"name\"],[[22,[\"model\",\"client\",\"first_name\"]],[22,[\"model\",\"client\",\"errors\",\"first_name\"]],\"first_name\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"last_name\"],[8],[0,\"Last Name\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"name\"],[[22,[\"model\",\"client\",\"last_name\"]],[22,[\"model\",\"client\",\"errors\",\"last_name\"]],\"first_name\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"email\"],[8],[0,\"Email\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"name\"],[[22,[\"model\",\"client\",\"email\"]],[22,[\"model\",\"client\",\"errors\",\"email\"]],\"email\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"phone\"],[8],[0,\"Phone\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"name\"],[[22,[\"model\",\"client\",\"phone\"]],[22,[\"model\",\"client\",\"errors\",\"phone\"]],\"phone\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"company_name\"],[8],[0,\"Company Name\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"name\"],[[22,[\"model\",\"client\",\"company_name\"]],[22,[\"model\",\"client\",\"errors\",\"company_name\"]],\"company_name\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"for\",\"organization\"],[8],[0,\"Organization\"],[9],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\",\"promptDisabled\"],[[22,[\"model\",\"organizations\"]],[22,[\"selectedOrganization\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"selectedOrganization\"]]],null]],null],\"Select Organization\",\"name\",false]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"label\"],[10,\"for\",\"Invoiceable\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"model\",\"client\",\"invoiceable\"]],\"Invoiceable\"]]],false],[0,\" Send Invoice\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-group buttons-block\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn turquoise-border-button-white-on-hover\"],[3,\"action\",[[21,0,[]],\"closeModal\"]],[8],[0,\"\\n        Cancel\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",[22,[\"saveButtonText\"]],\"btn turquoise-button\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/clients/client-profile-edit.hbs" } });
});
define("admin/templates/components/clients/modal-client", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eLTh6mUK", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\",\"animatable\",\"fullScreen\",\"appendedClasses\"],[\"close\",true,\"true\",\"full-screen-modal edit-client-profile-modal\"]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[1,[26,\"clients/client-profile-edit\",null,[[\"model\",\"saveClientAction\",\"closeModalAction\"],[[22,[\"model\"]],\"createClient\",\"closeModalNewClient\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/clients/modal-client.hbs" } });
});
define("admin/templates/components/clients/package-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8IO7uqfS", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n  \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[1,[20,\"submitLabel\"],false],[0,\" \"],[1,[20,\"mode\"],false],[0,\" Package\"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"close-modal\"],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"closeModal\"]],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showDronebasePack\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-5\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Clone from DroneBase package \"],[6,\"span\"],[10,\"class\",\"note\"],[8],[0,\"(optional)\"],[9],[9],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"selection\",\"action\",\"prompt\",\"disabled\"],[\"fullName\",[22,[\"dronebasePackagesSorted\"]],[22,[\"selectedDronebasePackage\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"selectedDronebasePackage\"]]],null]],null],\"Select Package\",[22,[\"disableOnEdit\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-8\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Package Name\"],[9],[0,\"\\n          \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"disabled\"],[[22,[\"model\",\"package\",\"name\"]],[22,[\"model\",\"package\",\"errors\",\"name\"]],[22,[\"disableOnEdit\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-5\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Vertical\"],[9],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"selection\",\"action\",\"class\",\"prompt\",\"disabled\"],[\"name\",[22,[\"model\",\"verticalsForSelect\"]],[22,[\"model\",\"package\",\"vertical\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"package\",\"vertical\"]]],null]],null],[26,\"if\",[[22,[\"model\",\"package\",\"errors\",\"vertical\",\"length\"]],\"error\"],null],\"Select Vertical\",[22,[\"disableOnEdit\"]]]]],false],[0,\"\\n        \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"package\",\"errors\",\"vertical\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Package Price\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\",\"modelErrors\",\"disabled\"],[[22,[\"model\",\"package\",\"price\"]],\"Price\",[22,[\"model\",\"package\",\"errors\",\"price\"]],[22,[\"disableOnEdit\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"showDronebasePack\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row package-name\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-5\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Package Name\"],[9],[0,\"\\n          \"],[1,[26,\"input-validated\",null,[[\"value\",\"modelErrors\",\"disabled\"],[[22,[\"model\",\"package\",\"name\"]],[22,[\"model\",\"package\",\"errors\",\"name\"]],[22,[\"disableOnEdit\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row grey-section\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\" Account Rep \"],[9],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"accountReps\"]],[22,[\"model\",\"package\",\"accountRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"package\",\"accountRep\"]]],null]],null],\"Select Account Rep\",\"fullName\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Salesforce Opportunity ID\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"package\",\"salesforce_opportunity_id\"]],\"Salesforce Opportunity ID\",[22,[\"model\",\"package\",\"errors\",\"salesforce_opportunity_id\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Slug\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"package\",\"slug\"]],\"API slug\",[22,[\"model\",\"package\",\"errors\",\"slug\"]]]]],false],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"field-info\"],[8],[0,\"This is for API partners; please do not change this value without discussing it with a developer or a product manager\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Shot Template\"],[9],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"optionLabelPath\",\"content\",\"selection\",\"action\",\"class\",\"prompt\"],[\"name\",[22,[\"model\",\"templatesForSelect\"]],[22,[\"model\",\"package\",\"template\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"package\",\"template\"]]],null]],null],\"{{if =model.package.errors.template.length 'error'}}\",\"Select Template\"]]],false],[0,\"\\n        \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"package\",\"errors\",\"template\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Estimated Pilot Payout\"],[9],[0,\"\\n        \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"package\",\"estimated_pilot_payout\"]],\"Estimated Pilot Payout\",[22,[\"model\",\"package\",\"errors\",\"estimated_pilot_payout\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Default Pilot Instructions\"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"rows\",\"placeholder\",\"class\"],[[22,[\"model\",\"package\",\"mission_instructions\"]],\"4\",\"Default Pilot Instructions\",\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Internal Notes\"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"rows\",\"placeholder\",\"class\"],[[22,[\"model\",\"package\",\"mission_internal_notes\"]],\"4\",\"\",\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Internal Production Notes\"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"rows\",\"placeholder\",\"class\"],[[22,[\"model\",\"package\",\"mission_production_notes\"]],\"4\",\"\",\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row dispatch-section\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"dispatch-label\"],[8],[0,\"\\n            Dispatch\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"trigger\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"switch-with-label\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"toggleAutoDispatch\"],null]],[8],[0,\"\\n              \"],[6,\"span\"],[10,\"class\",\"slider-label\"],[8],[0,\"Auto Dispatch\"],[9],[0,\"\\n              \"],[6,\"label\"],[10,\"for\",\"auto_dispatch_enabled\"],[10,\"class\",\"switch\"],[8],[0,\"\\n                \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"model\",\"package\",\"auto_dispatch_enabled\"]],\"auto_dispatch_enabled\"]]],false],[0,\"\\n                \"],[6,\"span\"],[10,\"class\",\"slider round\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row without-margin\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6 auto-dispatch\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"field-label\"],[8],[0,\"Special Onboarding\"],[9],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\",\"promptDisabled\"],[[22,[\"model\",\"badges\"]],[22,[\"model\",\"package\",\"badge\"]],[26,\"action\",[[21,0,[]],\"changeBadge\"],null],\"None\",\"name\",false]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6 \"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"for\",\"badge_required\"],[10,\"class\",\"badge-required\"],[8],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\",\"disabled\"],[\"checkbox\",[22,[\"model\",\"package\",\"badge_required\"]],\"badge_required\",[26,\"is-equal\",[[22,[\"model\",\"package\",\"badge\"]],null],null]]]],false],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"slider-label\"],[8],[0,\"Badge Required\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row without-margin\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Min. Camera Resolution\"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setMegaPixels\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n            \"],[6,\"option\"],[10,\"value\",\"\"],[8],[0,\"Any Resolution\"],[9],[0,\"\\n            \"],[6,\"option\"],[10,\"value\",\"20\"],[11,\"selected\",[26,\"is-equal\",[\"20\",[22,[\"model\",\"package\",\"camera_mega_pixels\"]]],null]],[8],[0,\"20mp\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"drones-devices-equipment-selection\",null,[[\"model\",\"drones\",\"selectedDrones\",\"selectedCameras\",\"selectedDevices\",\"selectedEquipment\",\"includeManufacturer\"],[[22,[\"model\"]],[22,[\"drones\"]],[22,[\"model\",\"package\",\"drones\"]],[22,[\"model\",\"package\",\"droneCameras\"]],[22,[\"model\",\"package\",\"devices\"]],[22,[\"model\",\"package\",\"pilotEquipments\"]],[26,\"is-not\",[[22,[\"disableOnEdit\"]]],null]]]],false],[0,\"\\n\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-group buttons-block\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn turquoise-border-button-white-on-hover\"],[3,\"action\",[[21,0,[]],\"closeModal\"]],[8],[0,\"\\n        Cancel\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",[22,[\"submitLabel\"]],\"btn turquoise-button\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/clients/package-form.hbs" } });
});
define("admin/templates/components/collaborator-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uSCGt4HW", "block": "{\"symbols\":[\"collaborator\"],\"statements\":[[6,\"div\"],[10,\"class\",\"collaboration\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[11,\"class\",[27,[\"alert alert-info create-mode\\n    \",[26,\"if\",[[22,[\"createMode\"]],\"create-mode-on\",\"create-mode-off\"],null]]]],[10,\"role\",\"alert\"],[8],[0,\"\\n    \"],[6,\"strong\"],[8],[0,\"\\n      \"],[1,[26,\"if\",[[22,[\"createMode\"]],\"Please specify a first and last name.\",\"\"],null],false],[0,\"\\n      \"],[1,[26,\"if\",[[22,[\"success\"]],\"An invitation has been sent.\"],null],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"label\"],[8],[0,\"Collaborators\"],[9],[0,\"\\n  \"],[6,\"form\"],[3,\"action\",[[21,0,[]],\"add\",[22,[\"mission\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table table-striped collaborator-module\"],[8],[0,\"\\n  \"],[6,\"thead\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[10,\"class\",\"email\"],[8],[0,\"Email\"],[9],[0,\"\\n    \"],[6,\"th\"],[10,\"class\",\"name\"],[8],[0,\"Name\"],[9],[0,\"\\n    \"],[6,\"th\"],[10,\"class\",\"action\"],[8],[0,\" \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"tbody\"],[8],[0,\"\\n    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"form-group email\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"size\",\"class\",\"name\",\"value\",\"type\",\"placeholder\"],[\"10\",\"form-control\",\"email\",[22,[\"newEmail\"]],\"email\",\"email address\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"form-group name\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"createMode\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"input\",null,[[\"size\",\"class\",\"name\",\"value\",\"type\",\"placeholder\"],[\"10\",\"form-control first-name\",\"firstName\",[22,[\"newFirstName\"]],\"text\",\"first name\"]]],false],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"size\",\"class\",\"value\",\"name\",\"type\",\"placeholder\"],[\"10\",\"form-control last-name\",[22,[\"newLastName\"]],\"lastName\",\"text\",\"last name\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"action\"],[8],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-sm\"],[10,\"type\",\"submit\"],[8],[0,\"\\n          \"],[1,[26,\"if\",[[22,[\"createMode\"]],\"Confirm\",\"Add\"],null],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"mission\",\"collaborators\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"email\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"name\"],[8],[0,\"\\n        \"],[1,[21,1,[\"first_name\"]],false],[0,\" \"],[1,[21,1,[\"last_name\"]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"action\"],[8],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-danger\"],[3,\"action\",[[21,0,[]],\"delete\",[21,1,[]]]],[8],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-ban\"],[10,\"aria-hidden\",\"true\"],[8],[9],[0,\" Remove\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/collaborator-list.hbs" } });
});
define("admin/templates/components/collapsible-sidebar-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ps1/aFSo", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"dropdown-refine \",[20,\"headerClass\"]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"refine-header\"],[3,\"action\",[[21,0,[]],\"toggle\"]],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"header-title\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"expanded\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"fa fa-chevron-up\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"fa fa-chevron-down\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[11,\"class\",[27,[\"refine-content \",[26,\"unless\",[[22,[\"expanded\"]],\"hidden\"],null]]]],[8],[0,\"\\n    \"],[13,1],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/collapsible-sidebar-item.hbs" } });
});
define("admin/templates/components/creative-mission-meta-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "6H/nMsfq", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"row creative-mission-meta-container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12 creative-mission-meta-title\"],[8],[0,\"\\n    Creative Mission Metadata\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"location\",\"name\"]],\"Title\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"thumbnail_timecode\"]],\"Timecode 00:15\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"textarea\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"mission\",\"description\"]],\"Description\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"location\",\"city\"]],\"City\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"location\",\"state\"]],\"State\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-4\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"location\",\"country\"]],\"Country\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"creative-mission-tag-count\"],[8],[0,\"\\n        \"],[1,[22,[\"model\",\"mission\",\"tags\",\"length\"]],false],[0,\" of 8\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"tagList\"]],\"Tags\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"optionLabelPath\",\"prompt\"],[[22,[\"model\",\"categoriesForSelect\"]],[22,[\"model\",\"mission\",\"category\",\"content\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"category\"]]],null]],null],\"name\",\"Select Category\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12 text-right\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-success btn-sm\"],[3,\"action\",[[21,0,[]],\"updateMissionMeta\",[22,[\"model\"]]]],[8],[0,\"Save Meta\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/creative-mission-meta-form.hbs" } });
});
define("admin/templates/components/creative-mission-response", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jqOXTe7o", "block": "{\"symbols\":[\"note\"],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"row creative-mission-response-container\\n    \",[26,\"unless\",[[22,[\"transcoderRejected\"]],\"hide\"],null]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12 creative-mission-meta-title rejected\"],[8],[0,\"\\n    Transcoder Rejected Mission\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"md-text\",null,[[\"text\"],[[22,[\"model\",\"rejection_notes\"]]]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[11,\"class\",[27,[\"row creative-mission-response-container\\n    \",[26,\"if\",[[22,[\"transcoderRejected\"]],\"hide\"],null]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-12 creative-mission-meta-title\"],[8],[0,\"\\n    Creative Mission Approve/Reject\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      Approve: \"],[1,[26,\"radio-button\",null,[[\"value\",\"checked\"],[\"true\",[22,[\"model\",\"accepted\"]]]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      Reject: \"],[1,[26,\"radio-button\",null,[[\"value\",\"checked\"],[\"false\",[22,[\"model\",\"accepted\"]]]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-5\"],[8],[0,\"\\n    \"],[6,\"div\"],[11,\"class\",[27,[\"form-group \",[26,\"unless\",[[22,[\"rejected\"]],\"hide\"],null]]]],[8],[0,\"\\n      \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setResponseNote\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n        \"],[6,\"option\"],[10,\"value\",\"\"],[8],[0,\"-- Reason --\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"responseNotes\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"rejection_notes\"]],[21,1,[]]],null]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[11,\"value\",[21,1,[]]],[10,\"selected\",\"\"],[8],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"option\"],[11,\"value\",[21,1,[]]],[8],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-2 text-right\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"button\"],[11,\"class\",[27,[\"btn btn-\",[26,\"if\",[[22,[\"rejected\"]],\"danger\",\"success\"],null],\" btn-sm\"]]],[3,\"action\",[[21,0,[]],\"sendResponse\",[22,[\"model\"]]]],[8],[0,\"\\n        \"],[1,[26,\"if\",[[22,[\"rejected\"]],\"Reject\",\"Accept\"],null],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/creative-mission-response.hbs" } });
});
define("admin/templates/components/device-index-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "B4czCkRW", "block": "{\"symbols\":[\"device\"],\"statements\":[[4,\"if\",[[22,[\"showModal\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"add-device-modal\",null,[[\"close\",\"action\",\"currentRecord\"],[[26,\"action\",[[21,0,[]],\"toggleModal\"],null],[26,\"action\",[[21,0,[]],\"saveRecord\"],null],[22,[\"currentRecord\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"pe-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pe-title\"],[3,\"action\",[[21,0,[]],\"toggleCollapsed\"]],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"\\n      Devices\\n\"],[4,\"if\",[[22,[\"collapsed\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-down\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-up\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"btn btn-add\"],[3,\"action\",[[21,0,[]],\"addRecord\"]],[8],[0,\"Add Device\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"collapsed\"]]],null,{\"statements\":[[6,\"table\"],[10,\"class\",\"pe-table\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Model\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"OS\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Type\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"allRecords\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"operating_system\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"device_type\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[9],[0,\"\\n      \"],[6,\"td\"],[8],[0,\"  \\n        \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editRecord\",[21,1,[]]]],[8],[0,\"Edit\"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"cloneRecord\",[21,1,[]]]],[8],[0,\"Clone\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/device-index-list.hbs" } });
});
define("admin/templates/components/drone-index-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "que0+KLu", "block": "{\"symbols\":[\"drone\",\"camera\"],\"statements\":[[4,\"if\",[[22,[\"showModal\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"add-drone-modal\",null,[[\"close\",\"action\",\"droneManufacturers\",\"cameras\",\"currentRecord\"],[[26,\"action\",[[21,0,[]],\"toggleModal\"],null],[26,\"action\",[[21,0,[]],\"saveRecord\"],null],[22,[\"droneManufacturers\"]],[22,[\"cameras\"]],[22,[\"currentRecord\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"pe-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pe-title\"],[3,\"action\",[[21,0,[]],\"toggleCollapsed\"]],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"\\n      Drones\\n\"],[4,\"if\",[[22,[\"collapsed\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-down\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-up\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"btn btn-add\"],[3,\"action\",[[21,0,[]],\"addRecord\"]],[8],[0,\"Add Drone\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"collapsed\"]]],null,{\"statements\":[[6,\"table\"],[10,\"class\",\"pe-table\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Brand\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Model\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Optional Cameras\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Type\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"allRecords\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"drone_manufacturer\",\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"optional_cameras\"]]],null,{\"statements\":[[0,\"          \"],[1,[21,2,[\"name\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"drone_type\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[0,\"  \\n        \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editRecord\",[21,1,[]]]],[8],[0,\"Edit\"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"cloneRecord\",[21,1,[]]]],[8],[0,\"Clone\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/drone-index-list.hbs" } });
});
define("admin/templates/components/drones-devices-equipment-selection", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "t9BQ8jKV", "block": "{\"symbols\":[\"equipment\",\"tablet\",\"phone\",\"camera\",\"drone\",\"drone\"],\"statements\":[[2,\" DRONE LIST \"],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"accordion accordion-first\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row equipment-header\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[10,\"id\",\"drone-header-toggle\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"toggleDroneList\"],null]],[10,\"data-target\",\"#equipment-drone-camera\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n        Drones + Cameras\\n        \"],[6,\"span\"],[10,\"class\",\"counter\"],[8],[0,\"(\"],[1,[20,\"droneCameraCounter\"],false],[0,\")\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block pull-right arrow\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"droneCameraOpen\"]]],null,{\"statements\":[[0,\"        \"],[6,\"img\"],[10,\"src\",\"/assets/images/up-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]},{\"statements\":[[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/down-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]}],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row collapse equipment-form\"],[10,\"id\",\"equipment-drone-camera\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-1 col-md-label\"],[8],[0,\"Accepted Drone Models\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"dronesOne\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\",\"includeManufacturer\"],[[21,6,[]],[22,[\"selectedDrones\"]],[22,[\"includeManufacturer\"]]]]],false],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"dronesTwo\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\",\"includeManufacturer\"],[[21,5,[]],[22,[\"selectedDrones\"]],[22,[\"includeManufacturer\"]]]]],false],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-1 col-md-label\"],[8],[0,\"Camera Details\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"cameras\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\"],[[21,4,[]],[22,[\"selectedCameras\"]]]]],false],[0,\" \"]],\"parameters\":[4]},null],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[2,\" DEVICE LIST \"],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"accordion\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row equipment-header\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[10,\"id\",\"devices-header-toggle\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"toggleDeviceList\"],null]],[10,\"data-target\",\"#equipment-devices\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n        Devices\\n        \"],[6,\"span\"],[10,\"class\",\"counter\"],[8],[0,\"(\"],[1,[20,\"devicesCounter\"],false],[0,\")\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block pull-right arrow\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"devicesOpen\"]]],null,{\"statements\":[[0,\"        \"],[6,\"img\"],[10,\"src\",\"/assets/images/up-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]},{\"statements\":[[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/down-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]}],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row collapse equipment-form\"],[10,\"id\",\"equipment-devices\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-1 col-md-label\"],[8],[0,\"Accepted Phones\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"phones\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\"],[[21,3,[]],[22,[\"selectedDevices\"]]]]],false],[0,\" \"]],\"parameters\":[3]},null],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-1 col-md-label\"],[8],[0,\"Accepted Tablets\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"tablets\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\"],[[21,2,[]],[22,[\"selectedDevices\"]]]]],false],[0,\" \"]],\"parameters\":[2]},null],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[2,\" OTHER EQUIPMENT LIST \"],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"accordion\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row equipment-header\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[10,\"id\",\"other-equipment-header-toggle\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"toggleEquipmentList\"],null]],[10,\"data-target\",\"#equipment-equipment\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n        Other Equipment\\n        \"],[6,\"span\"],[10,\"class\",\"counter\"],[8],[0,\"(\"],[1,[20,\"equipmentCounter\"],false],[0,\")\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block pull-right arrow\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"equipmentOpen\"]]],null,{\"statements\":[[0,\"        \"],[6,\"img\"],[10,\"src\",\"/assets/images/up-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]},{\"statements\":[[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/down-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]}],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row collapse equipment-form\"],[10,\"id\",\"equipment-equipment\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-1 col-md-label\"],[8],[0,\"Equipment Type\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"equipments\"]]],null,{\"statements\":[[0,\" \"],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\"],[[21,1,[]],[22,[\"selectedEquipment\"]]]]],false],[0,\" \"]],\"parameters\":[1]},null],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/drones-devices-equipment-selection.hbs" } });
});
define("admin/templates/components/email-notify", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O5ZC+NaA", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"idle\"]]],null,{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"class\",\"button-success\"],[3,\"action\",[[21,0,[]],\"setClicked\"]],[8],[0,\"Invite\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"clicked\"]]],null,{\"statements\":[[0,\"  \"],[6,\"a\"],[10,\"class\",\"button-success\"],[3,\"action\",[[21,0,[]],\"setConfirmed\"]],[8],[0,\"Do It\"],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"class\",\"cancel\"],[3,\"action\",[[21,0,[]],\"setIdle\"]],[8],[0,\"Cancel\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"confirmed\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"success-message\"],[8],[6,\"img\"],[10,\"src\",\"/assets/images/green-check.svg\"],[8],[9],[0,\"\\n    \"],[6,\"span\"],[8],[1,[20,\"message\"],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"error\"]]],null,{\"statements\":[[0,\"  \"],[6,\"span\"],[10,\"class\",\"error\"],[8],[1,[20,\"message\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/email-notify.hbs" } });
});
define("admin/templates/components/equipment-index-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xL2xQiXE", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/equipment-index-list.hbs" } });
});
define("admin/templates/components/errors-for", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HZpsmt0L", "block": "{\"symbols\":[\"error\"],\"statements\":[[4,\"each\",[[22,[\"errors\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/errors-for.hbs" } });
});
define("admin/templates/components/expandable-table-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NM1Dm6Ry", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/expandable-table-row.hbs" } });
});
define("admin/templates/components/filter-missions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gmYZNPpT", "block": "{\"symbols\":[\"client\",\"client\"],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"refine \",[26,\"if\",[[22,[\"overFlowScroll\"]],\"over-flow-scroll\"],null]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"header-row\"],[8],[0,\"\\n    \"],[6,\"h2\"],[8],[0,\"Refine\"],[9],[0,\"\\n    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"showStatus\"]]],null,{\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[\"Status\"]],{\"statements\":[[0,\"      \"],[1,[26,\"mission-status-filter\",null,[[\"selectedStatus\",\"sidebar\"],[[22,[\"status\"]],true]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"if\",[[22,[\"showLocation\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"onboarding/pilot-location-filter\",null,[[\"distance\",\"lat\",\"lon\",\"locationTitle\"],[[22,[\"distance\"]],[22,[\"latitude\"]],[22,[\"longitude\"]],[22,[\"locationTitle\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"clientMissions\"]]],null,{\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[\"Client\"]],{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"include-switch\"],[8],[0,\"\\n        Include\\n        \"],[6,\"label\"],[10,\"class\",\"switch\"],[8],[0,\"\\n           \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"include\"]],[22,[\"toggleInclude\"]]]]],false],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"slider round\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"key-up\",\"placeholder\",\"id\",\"class\"],[[22,[\"client\"]],[26,\"action\",[[21,0,[]],\"updateClientAutocomplete\"],null],\"Search\",\"clientAutocomplete\",\"client-autocomplete\"]]],false],[0,\"\\n      \"],[6,\"div\"],[11,\"class\",[27,[\"client-autocomplete-list\\n          \",[26,\"if\",[[26,\"is-not\",[[22,[\"clientAutocompleteList\",\"length\"]],0],null],\"hidden\"],null]]]],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"clientAutocompleteList\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"client-in-list\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"selectClient\",[21,2,[]]],null]],[8],[0,\"\\n            \"],[1,[21,2,[\"companyOrFullName\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"selectedClients\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"selected-client\"],[8],[1,[21,1,[\"companyOrFullName\"]],false],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"fa fa-times-circle\"],[3,\"action\",[[21,0,[]],\"deselectClient\",[21,1,[]]]],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[6,\"div\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"filterClients\"]],[8],[0,\"FILTER\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"collapsible-sidebar-item\",null,[[\"title\"],[\"Special Status\"]],{\"statements\":[[0,\"      \"],[6,\"label\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"assets_late\"]],[22,[\"updateAssetsLate\"]]]]],false],[0,\"\\n        Assets Late\\n      \"],[9],[0,\"\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"reshoot\"]],[22,[\"updateReshoot\"]]]]],false],[0,\"\\n        Reshoot\\n      \"],[9],[0,\"\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"on_hold\"]],[22,[\"updateOnHold\"]]]]],false],[0,\"\\n        On Hold\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"if\",[[22,[\"showPilotStatuses\"]]],null,{\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[\"Pilot Status\"]],{\"statements\":[[0,\"      \"],[6,\"label\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"approvedPilots\"]],[22,[\"updateApprovedPilots\"]]]]],false],[0,\"\\n        Approved\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/filter-missions.hbs" } });
});
define("admin/templates/components/hold-mission-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WbKogAVp", "block": "{\"symbols\":[\"reason\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"hold-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Put Mission on Hold\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Reason\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setHoldReason\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-md\"],[8],[0,\"\\n            \"],[6,\"option\"],[10,\"disabled\",\"\"],[10,\"selected\",\"\"],[8],[0,\"\\n              Choose reason\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"holdReasons\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[11,\"value\",[21,1,[\"id\"]]],[8],[0,\"\\n                \"],[1,[21,1,[\"name\"]],false],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n            Required\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Details\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"reasonDetails\"]],\"form-control\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"top-buffer\"],[8],[0,\"\\n            (optional, for internal use only)\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group text-center\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-secondary\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n          Cancel\\n        \"],[9],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-primary\"],[3,\"action\",[[21,0,[]],\"hold\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n          Put Mission on Hold\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/hold-mission-modal.hbs" } });
});
define("admin/templates/components/infinity-loader", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sUeLacIL", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[23,1]],null,{\"statements\":[[0,\"  \"],[13,1,[[22,[\"infinityModelContent\"]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"infinityModelContent\",\"reachedInfinity\"]]],null,{\"statements\":[[0,\"    \"],[6,\"span\"],[8],[1,[20,\"loadedText\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"span\"],[8],[1,[20,\"loadingText\"],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/infinity-loader.hbs" } });
});
define("admin/templates/components/input-checkbox-inplace-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "09+zE6un", "block": "{\"symbols\":[\"error\"],\"statements\":[[0,\"\\n\"],[4,\"each\",[[22,[\"modelErrors\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[1,[20,\"placeholder\"],false],[0,\" \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"value\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/input-checkbox-inplace-edit.hbs" } });
});
define("admin/templates/components/input-inplace-edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bd/Xiq4T", "block": "{\"symbols\":[\"error\",\"&default\"],\"statements\":[[4,\"if\",[[22,[\"isEditing\"]]],null,{\"statements\":[[4,\"each\",[[22,[\"modelErrors\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[1,[20,\"placeholder\"],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"typeTextArea\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"textarea-trigger-save\",null,[[\"value\"],[[22,[\"value\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[26,\"input-trigger-save\",null,[[\"type\",\"value\",\"save\"],[[22,[\"type\"]],[22,[\"value\"]],\"save\"]]],false],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"inline-input\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[1,[20,\"placeholder\"],false],[0,\":\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"value\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"typeTextArea\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"md-text\",null,[[\"text\"],[[22,[\"value\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[24,2]],null,{\"statements\":[[0,\"        \"],[13,2,[[21,0,[]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[20,\"value\"],false],[0,\"\\n      \"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"placeholder\"],[8],[0,\"\\n        \"],[1,[20,\"placeholder\"],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"i\"],[10,\"class\",\"fa fa-pencil\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/input-inplace-edit.hbs" } });
});
define("admin/templates/components/input-trigger-save", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0RNG0vUq", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/input-trigger-save.hbs" } });
});
define("admin/templates/components/input-validated-dollars", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iQz2f+Y7", "block": "{\"symbols\":[\"error\"],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"input-group \",[26,\"if\",[[22,[\"modelErrors\",\"length\"]],\"error\"],null]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"input-group-addon\"],[8],[0,\"$\"],[9],[0,\"\\n  \"],[1,[26,\"input\",[[26,\"-input-type\",[[22,[\"type\"]]],null]],[[\"value\",\"focus-out\",\"focus-in\",\"type\",\"class\",\"placeholder\",\"disabled\"],[[22,[\"displayValue\"]],\"showErrors\",\"focus\",[22,[\"type\"]],\"form-control\",[22,[\"placeholder\"]],[22,[\"disabled\"]]]]],false],[0,\"\\n  \"],[1,[26,\"input\",null,[[\"value\",\"type\"],[[22,[\"value\"]],\"hidden\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"modelErrors\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[4,\"if\",[[22,[\"showError\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[20,\"errors\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/input-validated-dollars.hbs" } });
});
define("admin/templates/components/input-validated", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "c2JCDn8o", "block": "{\"symbols\":[\"error\"],\"statements\":[[1,[26,\"input\",[[26,\"-input-type\",[[22,[\"type\"]]],null]],[[\"value\",\"focus-out\",\"type\",\"class\",\"placeholder\",\"disabled\"],[[22,[\"value\"]],\"showErrors\",[22,[\"type\"]],[22,[\"inputClasses\"]],[22,[\"placeholder\"]],[22,[\"disabled\"]]]]],false],[0,\"\\n\"],[4,\"each\",[[22,[\"modelErrors\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[4,\"if\",[[22,[\"showError\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[1,[20,\"errors\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/input-validated.hbs" } });
});
define("admin/templates/components/integrations/mindflash-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mhR66zvr", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"close\",\"appendedClasses\",\"translucentOverlay\",\"hasOverlay\",\"fullScreen\"],[[26,\"action\",[[21,0,[]],\"close\"],null],\"full-screen-modal mindflash-modal\",true,true,\"true\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"Assign Onboarding\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\" close-modal\"],[8],[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[1,[22,[\"selectedPilots\",\"length\"]],false],[0,\" pilots selected to take the online courses below:\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"turquoise-button pull-right\"],[3,\"action\",[[21,0,[]],\"invitePilots\"]],[8],[0,\"INVITE\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"turquoise-border-button pull-right\"],[3,\"action\",[[21,0,[]],\"cancelInvitePilots\"]],[8],[0,\"CANCEL\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"gray-divider\"],[8],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        mindflash courses\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/integrations/mindflash-modal.hbs" } });
});
define("admin/templates/components/main-navigation", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KIf26D/5", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"navbar-header\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"navbar-toggle collapsed\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-target\",\"#navbar\"],[10,\"aria-expanded\",\"false\"],[10,\"aria-controls\",\"navbar\"],[10,\"type\",\"button\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"sr-only\"],[8],[0,\"Toggle navigation\"],[9],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"icon-bar\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"a\"],[10,\"class\",\"navbar-brand\"],[10,\"href\",\"/\"],[8],[0,\"DroneBase Admin\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"navbar\"],[10,\"class\",\"navbar-collapse collapse\"],[8],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"nav navbar-nav navbar-right\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"/missions\"],[8],[0,\"Client Missions\"],[9],[9],[0,\"\\n      \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"/missions/creative_missions\"],[8],[0,\"Creative Missions\"],[9],[9],[0,\"\\n      \"],[6,\"li\"],[8],[4,\"link-to\",[\"missions.pending_panos\"],null,{\"statements\":[[0,\"Pano Missions\"]],\"parameters\":[]},null],[9],[0,\"\\n      \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"/missions/training_missions\"],[8],[0,\"Training Missions\"],[9],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n        \"],[6,\"a\"],[11,\"class\",[27,[\"dropdown-toggle \",[26,\"if\",[[22,[\"highlightedClients\"]],\"selected-menu\"],null]]]],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[8],[0,\"\\n          Clients\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu pilot-menu\"],[8],[0,\"\\n          \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"/clients\"],[8],[0,\"Client List\"],[9],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"clients.organizations\"],null,{\"statements\":[[0,\"Organizations\"]],\"parameters\":[]},null],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n        \"],[6,\"a\"],[11,\"class\",[27,[\"dropdown-toggle \",[26,\"if\",[[22,[\"highlightedPilots\"]],\"selected-menu\"],null]]]],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[8],[0,\"\\n          Pilots\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu pilot-menu\"],[8],[0,\"\\n          \"],[6,\"li\"],[8],[6,\"a\"],[10,\"href\",\"/pilots\"],[8],[0,\"List\"],[9],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"pilots.onboarding\"],null,{\"statements\":[[0,\"Onboarding\"]],\"parameters\":[]},null],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"li\"],[8],[4,\"link-to\",[\"payouts\"],null,{\"statements\":[[0,\"Payouts\"]],\"parameters\":[]},null],[9],[0,\"\\n      \"],[6,\"li\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n        \"],[6,\"a\"],[11,\"class\",[27,[\"dropdown-toggle \",[26,\"if\",[[22,[\"highlightedAdminTools\"]],\"selected-menu\"],null]]]],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[8],[0,\"\\n          Admin Tools\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"global_assets\"],null,{\"statements\":[[0,\"Assets\"]],\"parameters\":[]},null],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"templates.index\"],null,{\"statements\":[[0,\"Shot Templates\"]],\"parameters\":[]},null],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"partner_integration\"],null,{\"statements\":[[0,\"Partner Integration\"]],\"parameters\":[]},null],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"equipment\"],null,{\"statements\":[[0,\"Pilot Equipment\"]],\"parameters\":[]},null],[9],[0,\"\\n          \"],[6,\"li\"],[8],[4,\"link-to\",[\"badges\"],null,{\"statements\":[[0,\"Badges\"]],\"parameters\":[]},null],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"invalidateSession\"]],[8],[0,\"Logout\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"li\"],[8],[4,\"link-to\",[\"login\"],null,{\"statements\":[[0,\"Login\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[2,\"/.navbar-collapse \"],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/main-navigation.hbs" } });
});
define("admin/templates/components/mapbox-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kUDM20m1", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"map-container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"map\"],[10,\"class\",\"map\"],[8],[0,\" \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mapbox-map.hbs" } });
});
define("admin/templates/components/mission-asset-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YXn+GSH+", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"asset-map\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-asset-map.hbs" } });
});
define("admin/templates/components/mission-flight-app", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jO0QWhRZ", "block": "{\"symbols\":[\"app\",\"index\",\"appGroup\",\"index\"],\"statements\":[[6,\"h3\"],[8],[0,\"Pilot Workflow\"],[9],[0,\"\\n\"],[6,\"hr\"],[8],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"panel-collapse\"],[10,\"role\",\"tabpanel\"],[10,\"aria-expanded\",\"true\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n    \"],[6,\"form\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-check\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"form-check-label\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"workflow-mode\"],[10,\"value\",\"none\"],[11,\"checked\",[26,\"is-checked\",[[22,[\"workflowMode\"]],\"none\"],null]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setEditorMode\",\"none\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n            Pilot fly with any apps of their choice and upload to us\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-check\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"form-check-label\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"workflow-mode\"],[10,\"value\",\"create\"],[11,\"checked\",[26,\"is-checked\",[[22,[\"workflowMode\"]],\"create\"],null]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setEditorMode\",\"create\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n          Require Specific Workflow\\n        \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"missionFlightApp\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n                \"],[6,\"label\"],[10,\"class\",\"mr-sm-2\"],[10,\"for\",\"workflow-select\"],[8],[0,\"Workflow\"],[9],[0,\"\\n                \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setAppGroup\"],null]],[10,\"class\",\"form-control input-lg\"],[10,\"name\",\"workflow-select\"],[10,\"id\",\"workflow-select\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"groupedFlightApps\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"option\"],[11,\"value\",[21,4,[]]],[11,\"selected\",[26,\"is-equal\",[[21,3,[\"name\"]],[22,[\"missionFlightApp\",\"flight_app\",\"name\"]]],null]],[8],[1,[21,3,[\"name\"]],false],[9],[0,\"\\n\"]],\"parameters\":[3,4]},null],[0,\"                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeFlightAppGroup\",\"dataType\"]],\"external_id\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n                \"],[6,\"label\"],[10,\"for\",\"workflow-value\"],[8],[0,\"External ID\"],[9],[0,\"\\n                \"],[6,\"div\"],[11,\"class\",[27,[\"form-group \",[26,\"if\",[[22,[\"valueError\"]],\"error\"],null]]]],[8],[0,\"\\n                  \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"name\",\"class\"],[\"text\",[22,[\"missionFlightApp\",\"value\",\"external_id\"]],\"workflow-value[external_id]\",\"form-control input-lg\"]]],false],[0,\"\\n                  \"],[4,\"if\",[[22,[\"valueError\"]]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"error-message\"],[8],[1,[20,\"valueError\"],false],[9]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeFlightAppGroup\",\"dataType\"]],\"deep_link\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n                \"],[6,\"label\"],[10,\"for\",\"workflow-value\"],[8],[0,\"Deep Link (Android)\"],[9],[0,\"\\n                \"],[6,\"div\"],[11,\"class\",[27,[\"form-group \",[26,\"if\",[[22,[\"valueError\"]],\"error\"],null]]]],[8],[0,\"\\n                  \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"name\",\"class\",\"class\"],[\"text\",[22,[\"missionFlightApp\",\"value\",\"android\"]],\"workflow-value[android]\",\"form-control\",\"form-control input-lg\"]]],false],[0,\"\\n                  \"],[4,\"if\",[[22,[\"valueError\"]]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"error-message\"],[8],[1,[20,\"valueError\"],false],[9]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"label\"],[10,\"for\",\"workflow-value\"],[8],[0,\"Deep Link (iOS)\"],[9],[0,\"\\n                \"],[6,\"div\"],[11,\"class\",[27,[\"form-group \",[26,\"if\",[[22,[\"valueError\"]],\"error\"],null]]]],[8],[0,\"\\n                  \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"name\",\"class\",\"class\"],[\"text\",[22,[\"missionFlightApp\",\"value\",\"ios\"]],\"workflow-value[ios]\",\"form-control\",\"form-control input-lg\"]]],false],[0,\"\\n                  \"],[4,\"if\",[[22,[\"valueError\"]]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"error-message\"],[8],[1,[20,\"valueError\"],false],[9]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n                \"],[6,\"label\"],[10,\"class\",\"mr-sm-2\"],[10,\"for\",\"workflow-select\"],[8],[0,\"Upload To\"],[9],[0,\"\\n                \"],[6,\"select\"],[10,\"class\",\"form-control input-lg\"],[10,\"name\",\"workflow-select\"],[10,\"id\",\"workflow-select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setFlightApp\"],null]],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"activeFlightAppGroup\",\"apps\"]]],null,{\"statements\":[[0,\"                    \"],[6,\"option\"],[11,\"value\",[21,1,[\"id\"]]],[11,\"selected\",[26,\"is-equal\",[[21,1,[\"id\"]],[22,[\"missionFlightApp\",\"flight_app\",\"id\"]]],null]],[8],[1,[26,\"titleize\",[[21,1,[\"deliver_to_app\"]]],null],false],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"requireCyberduck\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"hasCyberduckCredentials\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[10,\"class\",\"cyberduck-content\"],[8],[0,\"\\n                    \"],[6,\"a\"],[10,\"class\",\"download-link\"],[3,\"action\",[[21,0,[]],\"getDuckFile\",[22,[\"mission\"]]]],[8],[6,\"img\"],[10,\"src\",\"/assets/images/credential_icon.svg\"],[10,\"width\",\"25\"],[10,\"height\",\"25\"],[8],[9],[0,\" Download Cyberduck Credentials\"],[9],[0,\"\\n                  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"requireExternalUrl\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[10,\"id\",\"delivery-url\"],[8],[0,\"\\n                \"],[6,\"label\"],[10,\"for\",\"workflow-value\"],[8],[0,\"Upload URL\"],[9],[0,\"\\n                \"],[6,\"div\"],[11,\"class\",[27,[\"form-group \",[26,\"if\",[[22,[\"deliveryError\"]],\"error\"],null]]]],[8],[0,\"\\n                  \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\",\"class\",\"placeholder\"],[[22,[\"missionFlightApp\",\"delivery_to_url\"]],\"workflow-upload-url\",\"form-control\",\"form-control input-lg\",\"http://example.org\"]]],false],[0,\"\\n                  \"],[4,\"if\",[[22,[\"deliveryError\"]]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"error-message\"],[8],[1,[20,\"deliveryError\"],false],[9]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"requireCyberduck\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"hasCyberduckCredentials\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"col-xs-6 cyberduck-content\"],[8],[0,\"\\n                  \"],[6,\"div\"],[8],[0,\"\\n                    \"],[6,\"label\"],[10,\"for\",\"access_id\"],[8],[0,\"Access ID\"],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n                      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\"],[[22,[\"missionFlightApp\",\"value\",\"access_id\"]],\"access_id\",\"form-control input-lg\"]]],false],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"div\"],[8],[0,\"\\n                    \"],[6,\"label\"],[10,\"for\",\"secret_key\"],[8],[0,\"Secret Key\"],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n                      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\"],[[22,[\"missionFlightApp\",\"value\",\"secret_key\"]],\"secret_key\",\"form-control input-lg\"]]],false],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"div\"],[8],[0,\"\\n                    \"],[6,\"label\"],[10,\"for\",\"path\"],[8],[0,\"Path\"],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n                      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\"],[[22,[\"missionFlightApp\",\"value\",\"path\"]],\"path\",\"form-control input-lg\"]]],false],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"col-xs-6 cyberduck-no-credentials\"],[8],[0,\"\\n                  \"],[6,\"span\"],[8],[0,\"Pilot hasn't generated credentials yet\"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"              \"],[6,\"div\"],[10,\"class\",\"col-xs-6 col-xs-offset-6 pull-right cyberduck-content cyberduck-credentials\"],[8],[0,\"\\n                \"],[6,\"a\"],[10,\"class\",\"cyberduck-link\"],[3,\"action\",[[21,0,[]],\"generateCredentials\",[22,[\"mission\"]]]],[8],[0,\"\\n                  \"],[6,\"img\"],[10,\"src\",\"/assets/images/refresh_icon.svg\"],[10,\"width\",\"25\"],[10,\"height\",\"25\"],[8],[9],[0,\"\\n                  \"],[6,\"span\"],[8],[0,\"Generate Credentials\"],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"p\"],[8],[0,\"\\n                  Note: Use this if the pilot is having trouble generating credentials.\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[0,\"\\n                  Cannot generate credentials. Mission must have pilot.\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"col-xs-6 col-xs-offset-6 pull-right cyberduck-content cyberduck-reset\"],[8],[0,\"\\n                \"],[6,\"a\"],[10,\"class\",\"cyberduck-link\"],[3,\"action\",[[21,0,[]],\"resetCyberduck\",[22,[\"mission\"]]]],[8],[0,\"\\n                  \"],[6,\"img\"],[10,\"src\",\"/assets/images/reset_icon.svg\"],[10,\"width\",\"25\"],[10,\"height\",\"25\"],[8],[9],[0,\"\\n                  \"],[6,\"span\"],[8],[0,\"Reset Mission for Upload\"],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"p\"],[8],[0,\"\\n                  Note: This will delete assets in admin, assets in S3, and move the mission back to pilot_accepted so the pilot can re-try uploading.\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"value\",\"Update Workflow\"],[10,\"class\",\"btn btn-primary btn-sm ember-view ember-text-field update-button\"],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"submit\"]],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-flight-app.hbs" } });
});
define("admin/templates/components/mission-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "95HF7C7D", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"create\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n    \"],[6,\"div\"],[11,\"class\",[27,[\"row \",[26,\"unless\",[[22,[\"showInput\"]],\"hide\"],null]]]],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"search-field-group\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"searchValue\"]],\"form-control search-field\",\"Enter Location\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"kml-container\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"or\"],[8],[0,\"\\n            or\\n          \"],[9],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"turquoise-button outlined\"],[8],[0,\"\\n              Load KML \"],[6,\"input\"],[10,\"hidden\",\"\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"add_geojson\"],null]],[10,\"style\",\"display:none !important;\"],[10,\"type\",\"file\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[11,\"class\",[27,[\"existing-address row \",[26,\"if\",[[22,[\"showInput\"]],\"hide\"],null]]]],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"icon-Pin\"],[8],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"formatted-address\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"address\"],[8],[1,[22,[\"model\",\"location\",\"address\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"address\"],[8],[1,[22,[\"model\",\"location\",\"city\"]],false],[1,[26,\"if\",[[22,[\"model\",\"location\",\"city\"]],\", \"],null],false],[1,[22,[\"model\",\"location\",\"state\"]],false],[0,\" \"],[1,[22,[\"model\",\"location\",\"postal_code\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"lat-long\"],[8],[0,\"(\"],[1,[22,[\"model\",\"location\",\"latitude\"]],false],[0,\", \"],[1,[22,[\"model\",\"location\",\"longitude\"]],false],[0,\")\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"edit-location\"],[3,\"action\",[[21,0,[]],\"toggleShowInput\"]],[8],[0,\"Edit Location\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"id\",\"map_canvas\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"disabled\"],[\"submit\",\"Create\",\"turquoise-button\",[22,[\"disableSubmit\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-map.hbs" } });
});
define("admin/templates/components/mission-plan-map-feature", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MnNQBmVN", "block": "{\"symbols\":[\"shot\"],\"statements\":[[6,\"div\"],[10,\"class\",\"map-list-item-title\"],[8],[0,\"\\n  \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[20,\"featureIcon\"]]]],[8],[9],[1,[22,[\"feature\",\"name\"]],false],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"map-list-item\"],[8],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"feature\",\"name\"]],[22,[\"feature\",\"type\"]],\"controls\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[1,[26,\"textarea\",null,[[\"placeholder\",\"value\",\"class\",\"rows\"],[\"Notes\",[22,[\"feature\",\"notes\"]],\"controls\",3]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"pointOfInterest\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"map-list-shots\"],[8],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"\\n      \"],[1,[26,\"mission-plan-shot-select\",null,[[\"content\",\"optionValuePath\",\"optionLabelPath\",\"prompt\"],[[22,[\"shot_list\"]],\"id\",\"name\",\"Add a shot\"]]],false],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"sample-videos pull-right\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"href\",\"https://www.youtube.com/playlist?list=PLxn2u8qdjXsOBU1XsZPTI1JkgzJcdJb1F\"],[10,\"target\",\"_blank\"],[8],[0,\"video examples\"],[9],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-external-link\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"feature\",\"shots\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"hr\"],[8],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[22,[\"feature\",\"shots\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"mission-plan-shot\",null,[[\"shot\",\"shot_list\"],[[21,1,[]],[22,[\"shot_list\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"areaAcres\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"label label-default\"],[8],[1,[20,\"areaAcres\"],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-plan-map-feature.hbs" } });
});
define("admin/templates/components/mission-plan-map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yW/V2Fkg", "block": "{\"symbols\":[\"feature\"],\"statements\":[[6,\"div\"],[10,\"id\",\"map_ui_container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"search-location\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"search-field-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"location\"]],\"form-control controls search-field\",\"Enter Location\"]]],false],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"search-locate\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"geo_locate\"]],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-compass\"],[10,\"title\",\"Locate Me\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"right\"],[10,\"title\",\"Use your current location\"],[8],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"search-drawer\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"map-search-undo\"],[8],[0,\"\\n        \"],[6,\"small\"],[8],[0,\"Location changed\"],[9],[0,\"\\n        \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"small\"],[3,\"action\",[[21,0,[]],\"undo_search\"]],[8],[0,\"UNDO\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"map-client-url\"],[8],[0,\"\\n        \"],[1,[26,\"input-readonly-select-all\",null,[[\"value\"],[[22,[\"clientMapUrl\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"action-buttons\"],[11,\"class\",[27,[[26,\"unless\",[[22,[\"noLocation\"]],\"enabled\"],null]]]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"updateAction\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"class\",\"btn btn-success controls\"],[10,\"title\",\"Update\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"update\",\"click\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-check\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"class\",\"btn btn-success controls\"],[10,\"title\",\"Continue\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"continue\",\"click\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-arrow-right\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"feature-buttons\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"id\",\"add_property_button\"],[8],[0,\"\\n      \"],[6,\"button\"],[11,\"class\",[27,[\"btn btn-primary feature\\n          \",[26,\"unless\",[[22,[\"noLocation\"]],\"enabled\"],null]]]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_property\",\"click\"]],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-object-ungroup\"],[8],[9],[0,\" PROPERTY AREA\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"id\",\"point_of_interest_button\"],[8],[0,\"\\n      \"],[6,\"button\"],[11,\"class\",[27,[\"btn btn-warning feature \",[26,\"unless\",[[22,[\"noProperty\"]],\"enabled\"],null]]]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_point_of_interest\",\"click\"]],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-star\"],[8],[9],[0,\" POINT OF INTEREST\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"id\",\"no_fly_zone_button\"],[8],[0,\"\\n      \"],[6,\"button\"],[11,\"class\",[27,[\"btn btn-danger feature \",[26,\"unless\",[[22,[\"noProperty\"]],\"enabled\"],null]]]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_no_fly_zone\",\"click\"]],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-ban\"],[8],[9],[0,\" NO FLY ZONE\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"id\",\"shot_list_button\"],[8],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-default\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"show_shot_list\",\"click\"]],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-ban\"],[8],[9],[0,\" SHOT LIST\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"small_device_controls_container\"],[8],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn help enabled\"],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"toggle_help\"]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-question-circle\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary\"],[11,\"disabled\",[20,\"noLocation\"]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_property\",\"click\"]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-object-ungroup\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-warning\"],[11,\"disabled\",[20,\"noProperty\"]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_point_of_interest\",\"click\"]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-star\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-danger\"],[11,\"disabled\",[20,\"noProperty\"]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"add_no_fly_zone\",\"click\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-ban\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"updateAction\"]]],null,{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"class\",\"btn btn-success\"],[11,\"disabled\",[20,\"noProperty\"]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"update\",[22,[\"model\"]],\"click\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-check\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"button\"],[10,\"class\",\"btn btn-success\"],[11,\"disabled\",[20,\"noProperty\"]],[10,\"type\",\"button\"],[3,\"action\",[[21,0,[]],\"continue\",\"click\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-arrow-right\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"control_boundry_zoom\"],[8],[0,\"\\n  \"],[6,\"button\"],[10,\"id\",\"boundry_zoom_button\"],[10,\"class\",\"btn btn-default btn-xs\"],[11,\"disabled\",[20,\"noProperty\"]],[3,\"action\",[[21,0,[]],\"boundry_zoom\",\"click\"]],[8],[0,\"\\n    \"],[6,\"i\"],[10,\"class\",\"fa fa-crosshairs\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"map_tabs_container\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"map_list_tab\"],[10,\"class\",\"tab\"],[3,\"action\",[[21,0,[]],\"toggle_tabs\",\"#map_list_container\",\"#map_shot_list_container\"]],[8],[0,\"\\n    Map Details\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"shotlist_tab\"],[10,\"class\",\"tab selected\"],[3,\"action\",[[21,0,[]],\"toggle_tabs\",\"#map_shot_list_container\",\"#map_list_container\"]],[8],[0,\"\\n    Shot List\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"map_list_container\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"id\",\"map_list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"features\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"mission-plan-map-feature\",null,[[\"feature\",\"shot_list\"],[[21,1,[]],[22,[\"model\",\"shot_list\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"map_shot_list_container\"],[8],[0,\"\\n  \"],[1,[26,\"mission-shotlist\",null,[[\"model\"],[[22,[\"model\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"map_canvas\"],[8],[9],[0,\"\\n\"],[6,\"div\"],[10,\"id\",\"info-window-node\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-plan-map.hbs" } });
});
define("admin/templates/components/mission-plan-shot-select", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pbr7TEc4", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"select\"],[11,\"class\",[20,\"selectClass\"]],[3,\"action\",[[21,0,[]],\"updateValue\"],[[\"on\"],[\"change\"]]],[8],[0,\"\\n  \"],[6,\"option\"],[10,\"value\",\"\"],[8],[0,\"\\n    \"],[1,[20,\"prompt\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"content\"]]],[[\"key\"],[\"@identity\"]],{\"statements\":[[0,\"    \"],[6,\"option\"],[11,\"value\",[27,[[26,\"read-path\",[[21,1,[]],[22,[\"optionValuePath\"]]],null]]]],[8],[0,\"\\n      \"],[1,[26,\"read-path\",[[21,1,[]],[22,[\"optionLabelPath\"]]],null],false],[0,\"\\n     \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-plan-shot-select.hbs" } });
});
define("admin/templates/components/mission-plan-shot", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zx7D+qxU", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"map-list-shot\"],[8],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[1,[26,\"mission-plan-shot-select\",null,[[\"content\",\"optionValuePath\",\"optionLabelPath\",\"value\"],[[22,[\"shot_list\"]],\"id\",\"name\",[22,[\"shot\",\"id\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[1,[26,\"textarea\",null,[[\"placeholder\",\"value\",\"class\",\"rows\"],[\"Notes\",[22,[\"shot\",\"notes\"]],\"controls\",2]]],false],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"btn btn-xs btn-danger pull-right\"],[3,\"action\",[[21,0,[]],\"remove_shot\",[22,[\"shot\"]]]],[8],[0,\"remove\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-plan-shot.hbs" } });
});
define("admin/templates/components/mission-schedule", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "hV8cQgS/", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"mission-editing-section col-xs-9 mission-schedule\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"header\"],[8],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"Flight Scheduling\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"edit-schedule\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"isScheduled\"]]],null,{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"btn btn-secondary btn-sm\"],[3,\"action\",[[21,0,[]],\"rescheduleFlight\"]],[8],[0,\"Edit\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"button\"],[10,\"class\",\"btn btn-secondary btn-sm\"],[3,\"action\",[[21,0,[]],\"chooseSchedule\"]],[8],[0,\"Pilot Availability\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[1,[26,\"schedule-inputs\",null,[[\"mission\",\"selectedStart\",\"selectedEnd\",\"showReschedule\",\"scheduleError\",\"class\"],[[22,[\"model\",\"mission\"]],[22,[\"selectedStart\"]],[22,[\"selectedEnd\"]],[26,\"is-not\",[[22,[\"model\",\"mission\",\"isScheduled\"]]],null],[22,[\"scheduleError\"]],\"mission-schedule\"]]],false],[0,\"\\n\"],[4,\"unless\",[[22,[\"model\",\"mission\",\"isScheduled\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"save-schedule\"],[8],[0,\"\\n      \"],[6,\"button\"],[11,\"class\",[27,[\"btn btn-primary btn-sm \",[26,\"if\",[[22,[\"notScheduled\"]],\"disabled\"],null]]]],[3,\"action\",[[21,0,[]],\"saveSchedule\"]],[8],[0,\"Save\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-schedule.hbs" } });
});
define("admin/templates/components/mission-shotlist-assets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BdwMIfDJ", "block": "{\"symbols\":[\"shot\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row panel-group\"],[10,\"id\",\"accordion\"],[10,\"role\",\"tablist\"],[10,\"aria-multiselectable\",\"true\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"shots\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"model\",\"mission\",\"archived_at\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"regenerate-zip\"],[8],[0,\"\\n        Zip file created: \"],[1,[26,\"moment-format\",[[22,[\"model\",\"mission\",\"archived_at\"]],\"MM/DD/YY, h:mm a\"],[[\"timeZone\"],[[22,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"buttons-block\"],[8],[0,\"\\n          \"],[6,\"a\"],[11,\"href\",[27,[[22,[\"model\",\"mission\",\"archive_url\"]]]]],[10,\"class\",\"btn-primary btn-sm\"],[8],[0,\"\\n              DOWNLOAD ZIP FILE\\n          \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"archivesGenerating\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"btn regenerating btn-xs\"],[8],[0,\"\\n              REGENERATING...\\n              \"],[6,\"img\"],[10,\"class\",\"spinner\"],[10,\"src\",\"/assets/images/spinner.gif\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"btn-secondary btn-sm\"],[3,\"action\",[[21,0,[]],\"regenerateZip\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n              REGENERATE ZIP FILE\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"each\",[[22,[\"model\",\"mission\",\"shots\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"mission-shotlist-shot-assets\",null,[[\"shot\",\"model\",\"onfileadd\",\"onstartupload\",\"shareCreateAction\",\"selectedShot\"],[[21,1,[]],[22,[\"model\"]],\"addAsset\",\"startUpload\",\"shareShareable\",\"filterByShot\"]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},{\"statements\":[[0,\"    No shots were found for this mission.\\n    Please add some shots before uploading assets.\\n\"]],\"parameters\":[]}],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-shotlist-assets.hbs" } });
});
define("admin/templates/components/mission-shotlist-shot-assets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "z45gFk5n", "block": "{\"symbols\":[\"imageProxy\",\"image\",\"video\",\"panorama\",\"queue\"],\"statements\":[[6,\"div\"],[10,\"class\",\"panel-heading\"],[10,\"role\",\"tab\"],[11,\"id\",[27,[\"heading\",[22,[\"shot\",\"id\"]]]]],[8],[0,\"\\n  \"],[6,\"a\"],[10,\"role\",\"button\"],[10,\"data-toggle\",\"collapse\"],[10,\"data-parent\",\"#accordion\"],[11,\"href\",[27,[\"#collapse\",[22,[\"shot\",\"id\"]]]]],[10,\"aria-expanded\",\"false\"],[11,\"aria-controls\",[27,[\"collapse\",[22,[\"shot\",\"id\"]]]]],[3,\"action\",[[21,0,[]],\"selectedShot\",[22,[\"shot\"]]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"panel-title\"],[8],[0,\"\\n        \"],[1,[22,[\"shot\",\"shot_type\",\"name\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"shot\",\"hasMissingGps\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"d-inline-block gps-data-missing\"],[8],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-warning\"],[8],[9],[0,\" Missing GPS Meta Data\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[10,\"class\",\"asset-list\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"fa fa-image\"],[8],[9],[0,\"\\n      \"],[1,[26,\"pluralize\",[[22,[\"shot\",\"imageCount\"]],\"image\"],null],false],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"fa fa-video-camera\"],[8],[9],[0,\"\\n      \"],[1,[26,\"pluralize\",[[22,[\"shot\",\"videos\",\"length\"]],\"video\"],null],false],[0,\"\\n\"],[4,\"if\",[[22,[\"shot\",\"panoramas\",\"length\"]]],null,{\"statements\":[[0,\"        \"],[6,\"span\"],[10,\"class\",\"fa fa-image\"],[8],[9],[0,\"\\n        \"],[1,[26,\"pluralize\",[[22,[\"shot\",\"panoramas\",\"length\"]],\"panorama\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"div\"],[8],[0,\"Click to view details and upload assets for this shot\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[11,\"id\",[27,[\"collapse\",[22,[\"shot\",\"id\"]]]]],[10,\"class\",\"panel-collapse collapse\"],[10,\"role\",\"tabpanel\"],[11,\"aria-labelledby\",[27,[\"heading\",[22,[\"shot\",\"id\"]]]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"clearfix ember-view asset-uploader\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"shot\",\"imageCount\"]]],null,{\"statements\":[[0,\"        \"],[6,\"a\"],[11,\"id\",[27,[\"upload-download-\",[20,\"shot_id\"]]]],[10,\"class\",\"btn btn-lg btn-default button button-mg-right button-width\"],[3,\"action\",[[21,0,[]],\"downloadShotArchive\"]],[8],[0,\"\\n          \"],[6,\"img\"],[10,\"src\",\"/assets/images/download.svg\"],[8],[9],[0,\" Download ZIP File\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[6,\"a\"],[10,\"class\",\"btn btn-lg btn-default button button-width\"],[3,\"action\",[[21,0,[]],\"promoteAll\"]],[8],[0,\"Promote All\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"asset-uploader\",null,[[\"for\",\"class\",\"shot_id\",\"extensions\",\"onfileadd\",\"onstartupload\",\"uploadedCount\"],[\"upload-asset\",\"clearfix\",[22,[\"shot\",\"id\"]],\"mov mp4 jpg jpeg tif tiff png zip\",\"addAsset\",\"startUpload\",[22,[\"model\",\"mission\",\"assetsCount\"]]]],{\"statements\":[],\"parameters\":[5]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"shot\",\"pilot_comment\"]]],null,{\"statements\":[[0,\"      Pilot comments: \"],[1,[22,[\"shot\",\"pilot_comment\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row asset-panoramas\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12 list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"shot\",\"panoramas\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[11,\"class\",[27,[\"asset inline clearfix \",[26,\"if\",[[21,4,[\"final\"]],\"asset-final\"],null]]]],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n              \"],[6,\"i\"],[10,\"class\",\"fa fa-globe\"],[8],[9],[0,\"\\n              \"],[1,[21,4,[\"id\"]],false],[0,\" \"],[1,[26,\"unless\",[[21,4,[\"isShareable\"]],\"(processing)\"],null],false],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"actions\"],[8],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"promote-asset\"],[3,\"action\",[[21,0,[]],\"toggleSourceType\",[21,4,[]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                  \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"unless\",[[21,4,[\"final\"]],\"fa-bullhorn\",\"fa-hand-peace-o\"],null]]]],[8],[0,\"\\n                  \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[1,[26,\"asset-share\",null,[[\"shareable\",\"shareCreateAction\",\"class\"],[[21,4,[]],\"shareShareable\",\"pano-share\"]]],false],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"pano-edit\"],[3,\"action\",[[21,0,[]],\"editPanorama\",[21,4,[]]],[[\"bubbles\"],[false]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-pencil\"],[8],[9],[9],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"delete-asset\"],[3,\"action\",[[21,0,[]],\"deleteAsset\",[21,4,[]]],[[\"bubbles\"],[false]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[8],[9],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\\n\"]],\"parameters\":[4]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row asset-videos\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"shot\",\"videos\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n\"],[4,\"if\",[[21,3,[\"processing\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[11,\"class\",[27,[\"asset inline clearfix \",[26,\"if\",[[21,3,[\"final\"]],\"asset-final\"],null]]]],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n              \"],[6,\"i\"],[10,\"class\",\"fa fa-film\"],[8],[9],[0,\"\\n              \"],[1,[21,3,[\"name\"]],false],[0,\" (processing)\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"actions\"],[8],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"delete-asset\"],[3,\"action\",[[21,0,[]],\"deleteAsset\",[21,3,[]]],[[\"bubbles\"],[false]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[8],[9],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"div\"],[11,\"class\",[27,[\"asset inline clearfix\\n              \",[26,\"if\",[[21,3,[\"isDeleted\"]],\"deleting-asset\"],null],\"\\n              \",[26,\"if\",[[21,3,[\"final\"]],\"asset-final\"],null]]]],[3,\"action\",[[21,0,[]],\"viewAsset\",[21,3,[]]]],[8],[0,\"\\n\"],[4,\"if\",[[21,3,[\"viewing\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",\"asset-viewer\"],[8],[0,\"\\n\"],[4,\"video-js\",null,[[\"poster\",\"autoplay\",\"preload\"],[[21,3,[\"thumbnail\"]],true,\"metadata\"]],{\"statements\":[[0,\"                \"],[1,[26,\"video-js-source\",null,[[\"src\",\"type\"],[[21,3,[\"version_urls\",\"hls\"]],\"application/x-mpegURL\"]]],false],[0,\"\\n                \"],[1,[26,\"video-js-source\",null,[[\"src\",\"type\"],[[21,3,[\"version_urls\",\"mp4_high\"]],\"video/mp4\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n              \"],[6,\"i\"],[10,\"class\",\"fa fa-film\"],[8],[9],[0,\"\\n              \"],[1,[21,3,[\"name\"]],false],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"            \"],[6,\"div\"],[11,\"class\",[27,[\"actions \",[26,\"if\",[[21,3,[\"viewing\"]],\"viewing\"],null]]]],[8],[0,\"\\n\"],[4,\"if\",[[21,3,[\"downloadUrl\"]]],null,{\"statements\":[[0,\"              \"],[1,[26,\"asset-share\",null,[[\"shareable\",\"shareCreateAction\",\"embeddable\"],[[21,3,[]],\"shareShareable\",true]]],false],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"download-asset\"],[3,\"action\",[[21,0,[]],\"downloadAsset\",[21,3,[\"downloadUrl\"]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa fa-cloud-download\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[6,\"a\"],[10,\"class\",\"promote-asset\"],[3,\"action\",[[21,0,[]],\"toggleSourceType\",[21,3,[]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"unless\",[[21,3,[\"final\"]],\"fa-bullhorn\",\"fa-hand-peace-o\"],null]]]],[8],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"delete-asset\"],[3,\"action\",[[21,0,[]],\"deleteAsset\",[21,3,[]]],[[\"bubbles\"],[false]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[8],[9],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row asset-images\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12 processing\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"imagesProcessing\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[11,\"class\",[27,[\"asset inline clearfix \",[26,\"if\",[[21,2,[\"final\"]],\"asset-final\"],null]]]],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n            \"],[6,\"i\"],[10,\"class\",\"fa fa-picture-o\"],[8],[9],[0,\" \"],[1,[21,2,[\"name\"]],false],[0,\" (processing)\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"      \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"galleryImages\",\"length\"]]],null,{\"statements\":[[4,\"photo-swipe\",null,[[\"items\",\"options\"],[[22,[\"galleryImages\"]],[22,[\"galleryOptions\"]]]],{\"statements\":[[0,\"          \"],[6,\"div\"],[11,\"class\",[27,[\"col-xs-6 col-md-3 asset visual\\n              \",[26,\"if\",[[21,1,[\"record\",\"isDeleted\"]],\"deleting-asset\"],null]]]],[8],[0,\"\\n            \"],[6,\"div\"],[11,\"class\",[27,[\"image \",[26,\"if\",[[21,1,[\"record\",\"final\"]],\"asset-final\"],null],\"\\n                \",[26,\"if\",[[21,1,[\"record\",\"isRawAndMissingGpsInfo\"]],\"asset-gps-data-missing\"],null]]]],[8],[0,\"\\n              \"],[6,\"img\"],[11,\"src\",[27,[[21,1,[\"msrc\"]]]]],[11,\"alt\",[27,[[21,1,[\"title\"]]]]],[10,\"class\",\"img-responsive\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n\\n            \"],[6,\"div\"],[10,\"class\",\"asset-warning\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"record\",\"missing_gps_info\"]]],null,{\"statements\":[[0,\"                \"],[6,\"i\"],[10,\"class\",\"fa fa-warning\"],[8],[9],[0,\" \"],[6,\"span\"],[8],[0,\"Missing GPS Meta Data\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n\\n            \"],[6,\"div\"],[10,\"class\",\"actions\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"record\",\"downloadUrl\"]]],null,{\"statements\":[[0,\"                \"],[6,\"a\"],[10,\"class\",\"download-asset\"],[3,\"action\",[[21,0,[]],\"downloadAsset\",[21,1,[\"record\",\"downloadUrl\"]]],[[\"bubbles\"],[false]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-cloud-download\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[1,[26,\"asset-share\",null,[[\"shareable\",\"shareCreateAction\",\"shareLink\"],[[21,1,[\"record\"]],\"shareShareable\",[21,1,[\"record\",\"shareLink\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[6,\"a\"],[10,\"class\",\"promote-asset\"],[3,\"action\",[[21,0,[]],\"toggleSourceType\",[21,1,[\"record\"]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"unless\",[[21,1,[\"record\",\"final\"]],\"fa-bullhorn\",\"fa-hand-peace-o\"],null]]]],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"a\"],[10,\"class\",\"delete-asset\"],[3,\"action\",[[21,0,[]],\"deleteAsset\",[21,1,[\"record\"]],[21,1,[]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-shotlist-shot-assets.hbs" } });
});
define("admin/templates/components/mission-shotlist-shot", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vmu48VXs", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"title\"],[8],[0,\"\\n  \"],[1,[22,[\"model\",\"shot_type\",\"name\"]],false],[0,\"\\n  \"],[4,\"link-to\",[\"templates.shots.edit\",[22,[\"model\",\"shot_type\",\"id\"]]],[[\"class\"],[\"shot-link\"]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"shot-type-description\"],[8],[1,[22,[\"model\",\"shot_type\",\"description\"]],false],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"instructions-label\"],[8],[6,\"b\"],[8],[0,\"Additional Instructions for this Shot\"],[9],[0,\" (These will only display on this mission):\"],[9],[0,\"\\n\"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[22,[\"model\",\"instructions\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"instructions\"]]],null]],null]]]],false],[0,\"\\n\"],[6,\"button\"],[10,\"class\",\"btn btn-xs btn-success\"],[3,\"action\",[[21,0,[]],\"update\",[22,[\"model\"]]]],[8],[0,\"update\"],[9],[0,\"\\n\"],[6,\"button\"],[10,\"class\",\"btn btn-xs btn-danger\"],[3,\"action\",[[21,0,[]],\"remove\",[22,[\"model\"]]]],[8],[0,\"remove\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-shotlist-shot.hbs" } });
});
define("admin/templates/components/mission-shotlist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3SPPftX5", "block": "{\"symbols\":[\"shot\"],\"statements\":[[6,\"ul\"],[10,\"id\",\"mission_shot_list\"],[8],[0,\"\\n  \"],[6,\"li\"],[8],[0,\"\\n    \"],[1,[26,\"select-custom\",null,[[\"prompt\",\"optionLabelPath\",\"content\",\"assignSelectedObject\",\"useSendAction\",\"action\"],[\"Choose Template\",\"name\",[22,[\"model\",\"templates\"]],true,true,\"choose_template\"]]],false],[0,\"\\n      \"],[6,\"div\"],[10,\"id\",\"template_manager\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"template-link\"],[8],[0,\"Save Shotlist As Template\"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6 template-form\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\",\"class\"],[\"text\",[22,[\"model\",\"template\",\"name\"]],\"Template Name\",\"form-control\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6 template-form\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-block btn-save-template\"],[3,\"action\",[[21,0,[]],\"save_template\"]],[8],[0,\"\\n            \"],[1,[20,\"saveTemplateButton\"],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"li\"],[8],[0,\"\\n    \"],[1,[26,\"select-custom\",null,[[\"prompt\",\"optionLabelPath\",\"content\",\"assignSelectedObject\",\"useSendAction\",\"action\",\"reset\"],[\"Add Shot\",\"name\",[22,[\"model\",\"shot_types\"]],true,true,\"add_shot\",true]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"li\"],[8],[0,\"\\n    \"],[6,\"ul\"],[10,\"id\",\"shot_list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"reverseList\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"mission-shotlist-shot\",null,[[\"model\",\"remove\",\"update\"],[[21,1,[]],\"shot_removed\",\"shot_updated\"]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-shotlist.hbs" } });
});
define("admin/templates/components/mission-status-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zyEgB/eA", "block": "{\"symbols\":[\"status\",\"status\"],\"statements\":[[4,\"if\",[[22,[\"sidebar\"]]],null,{\"statements\":[[4,\"each\",[[22,[\"missionStatuses\"]]],null,{\"statements\":[[4,\"if\",[[21,2,[\"separator\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"separator\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[0,\"\\n      \"],[6,\"label\"],[11,\"for\",[27,[[21,2,[\"value\"]]]]],[8],[0,\"\\n        \"],[6,\"input\"],[10,\"name\",\"filter_select\"],[11,\"data-status\",[21,2,[\"value\"]]],[11,\"value\",[21,2,[\"value\"]]],[10,\"type\",\"checkbox\"],[3,\"action\",[[21,0,[]],\"updateMissionStatuses\"],[[\"on\"],[\"change\"]]],[8],[9],[0,\"\\n        \"],[1,[21,2,[\"name\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"selectedStatus\"]]],null,{\"statements\":[[0,\"    \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearMissionStatuses\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"each\",[[22,[\"missionStatuses\"]]],null,{\"statements\":[[0,\"    \"],[6,\"label\"],[11,\"for\",[27,[[21,1,[\"value\"]]]]],[8],[0,\"\\n      \"],[6,\"input\"],[10,\"name\",\"filter_select\"],[11,\"data-status\",[21,1,[\"value\"]]],[11,\"value\",[21,1,[\"value\"]]],[10,\"type\",\"checkbox\"],[3,\"action\",[[21,0,[]],\"updateMissionStatuses\"],[[\"on\"],[\"change\"]]],[8],[9],[0,\"\\n      \"],[1,[21,1,[\"name\"]],false],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-status-filter.hbs" } });
});
define("admin/templates/components/mission-status-rewind-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q1MJjjSF", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"status\"]],\"confirmed\"],null]],null,{\"statements\":[[6,\"i\"],[10,\"class\",\"fa fa-arrow-left\"],[8],[9],[0,\" Created\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-status-rewind-button.hbs" } });
});
define("admin/templates/components/mission-status-update-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2rdC/SaT", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"nextStatus\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"statusDisabledTooltip\"]]],null,{\"statements\":[[0,\"\\t\\t\"],[6,\"div\"],[10,\"class\",\"next disabled\"],[10,\"disabled\",\"disabled\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[11,\"title\",[20,\"statusDisabledTooltip\"]],[8],[0,\"\\n\\t\\t\\t\"],[6,\"i\"],[10,\"class\",\"fa fa-arrow-right\"],[8],[9],[6,\"a\"],[8],[1,[20,\"nextStatus\"],false],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\t\\t\"],[6,\"div\"],[10,\"class\",\"next\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"i\"],[10,\"class\",\"fa fa-arrow-right\"],[8],[9],[6,\"a\"],[8],[1,[20,\"nextStatus\"],false],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-status-update-button.hbs" } });
});
define("admin/templates/components/mission-weather-forecast", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "s1UO0Tzd", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"moment-format\",[[22,[\"time\"]],\"ha\"],[[\"timeZone\"],[[22,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[6,\"br\"],[8],[9],[0,\"\\n\"],[1,[26,\"weather-icon\",null,[[\"icon\",\"width\"],[[22,[\"icon\"]],75]]],false],[6,\"br\"],[8],[9],[0,\"\\n\"],[1,[26,\"format-float\",[[22,[\"temperature\"]],0],null],false],[0,\"F\"],[6,\"br\"],[8],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"precipProbability\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"format-percent\",[[22,[\"precipProbability\"]]],null],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  0%\\n\"]],\"parameters\":[]}],[0,\" rain\"],[6,\"br\"],[8],[9],[0,\"\\n\"],[1,[26,\"format-percent\",[[22,[\"cloudCover\"]]],null],false],[0,\" cloudy\"],[6,\"br\"],[8],[9],[0,\"\\n\"],[1,[26,\"format-float\",[[22,[\"windSpeed\"]],1],null],false],[0,\"mph wind\"],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-weather-forecast.hbs" } });
});
define("admin/templates/components/mission-weather", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LZcb6FOy", "block": "{\"symbols\":[\"data\",\"index\",\"forecast\",\"data\",\"index\",\"forecast\"],\"statements\":[[6,\"div\"],[10,\"class\",\"weather-header\"],[8],[0,\"\\n  \"],[6,\"span\"],[8],[0,\"Weather Forecast\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"forecasts\",\"length\"]],1],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"forecasts\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"mission-weather item\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"mission-weather-header\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n            \"],[1,[26,\"moment-format\",[[21,4,[\"time\"]],\"dddd MM/DD\"],[[\"timeZone\"],[[22,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"mission-weather-content\"],[8],[0,\"\\n\"],[4,\"each\",[[21,4,[\"forecast\"]]],null,{\"statements\":[[0,\"            \"],[1,[26,\"mission-weather-forecast\",null,[[\"mission\",\"time\",\"icon\",\"temperature\",\"precipProbability\",\"cloudCover\",\"windSpeed\"],[[22,[\"mission\"]],[21,6,[\"datetime\"]],[21,6,[\"icon\"]],[21,6,[\"temperature\"]],[21,6,[\"precipProbability\"]],[21,6,[\"cloudCover\"]],[21,6,[\"windSpeed\"]]]]],false],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[4,5]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"id\",\"weather-carousel\"],[10,\"class\",\"carousel slide d-inline-block\"],[10,\"data-ride\",\"carousel\"],[10,\"data-interval\",\"false\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"carousel-inner\"],[10,\"role\",\"listbox\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"forecasts\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[11,\"class\",[27,[\"mission-weather item item-\",[21,2,[]],\" \",[26,\"if\",[[26,\"is-equal\",[[21,2,[]],[22,[\"startIndex\"]]],null],\"active\"],null]]]],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"mission-weather-header\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showArrows\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"href\",\"#weather-carousel\"],[10,\"data-target\",\"#weather-carousel\"],[10,\"data-slide-to\",\"0\"],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa playback-icon mr-5 fa-step-backward\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"a\"],[11,\"class\",[27,[\"left \",[26,\"if\",[[26,\"is-equal\",[[21,2,[]],0],null],\"v-hidden\"],null]]]],[10,\"href\",\"#weather-carousel\"],[10,\"role\",\"button\"],[10,\"data-slide\",\"prev\"],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa arrow-icon fa-angle-left\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n              \"],[1,[26,\"moment-format\",[[21,1,[\"time\"]],\"dddd MM/DD\"],[[\"timeZone\"],[[22,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n            \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"showArrows\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[11,\"class\",[27,[\"right \",[26,\"if\",[[26,\"is-equal\",[[21,2,[]],[22,[\"endIndex\"]]],null],\"v-hidden\"],null]]]],[10,\"href\",\"#weather-carousel\"],[10,\"role\",\"button\"],[10,\"data-slide\",\"next\"],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa arrow-icon fa-angle-right\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"a\"],[10,\"href\",\"#weather-carousel\"],[10,\"data-target\",\"#weather-carousel\"],[11,\"data-slide-to\",[27,[[20,\"endIndex\"]]]],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa playback-icon ml-5 fa-step-forward\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n\\n          \"],[6,\"div\"],[10,\"class\",\"mission-weather-content\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"forecast\"]]],null,{\"statements\":[[0,\"              \"],[1,[26,\"mission-weather-forecast\",null,[[\"mission\",\"time\",\"icon\",\"temperature\",\"precipProbability\",\"cloudCover\",\"windSpeed\"],[[22,[\"mission\"]],[21,3,[\"datetime\"]],[21,3,[\"icon\"]],[21,3,[\"temperature\"]],[21,3,[\"precipProbability\"]],[21,3,[\"cloudCover\"]],[21,3,[\"windSpeed\"]]]]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/mission-weather.hbs" } });
});
define("admin/templates/components/modal-dialog-custom", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cna37IH9", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"modal-overlay\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[11,\"class\",[27,[\"modal-content clearfix  \",[20,\"appendedClasses\"]]]],[8],[0,\"\\n    \"],[13,1],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/modal-dialog-custom.hbs" } });
});
define("admin/templates/components/onboarding/badge-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yhzNnCmm", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"close\",\"appendedClasses\",\"translucentOverlay\",\"hasOverlay\",\"fullScreen\"],[[26,\"action\",[[21,0,[]],\"close\"],null],\"badge-modal full-screen-modal\",true,true,\"true\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"Assign Onboarding\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\" close-modal\"],[8],[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"selectedAllPilots\"]]],null,{\"statements\":[[0,\"          \"],[6,\"strong\"],[8],[1,[20,\"totalCount\"],false],[0,\" pilots\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"strong\"],[8],[1,[22,[\"selectedPilots\",\"length\"]],false],[0,\" pilots\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[6,\"span\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"selectedBadge\",\"has_requirements\"]]],null,{\"statements\":[[0,\"          selected to take \"],[6,\"strong\"],[8],[1,[22,[\"selectedBadge\",\"name\"]],false],[9],[0,\" onboarding badge.\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"selectedBadge\"]]],null,{\"statements\":[[0,\"          selected to receive \"],[6,\"strong\"],[8],[1,[22,[\"selectedBadge\",\"name\"]],false],[9],[0,\" badge.\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"           selected to take this onboarding.\\n        \"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"successMessage\"]]],null,{\"statements\":[[0,\"          \"],[6,\"span\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n            \"],[6,\"img\"],[10,\"src\",\"/assets/images/green-check.svg\"],[10,\"class\",\"green-checkmark\"],[8],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n              \"],[6,\"strong\"],[8],[1,[20,\"successMessage\"],false],[9],[0,\"\\n              \"],[6,\"i\"],[8],[1,[20,\"successSubMessage\"],false],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"inviteConfirmation\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"red-border-button pull-right\"],[3,\"action\",[[21,0,[]],\"confirmInvitePilots\"]],[8],[0,\"CONFIRM\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[26,\"check-if\",[[22,[\"selectedAllPilots\"]],\"||\",[22,[\"selectedPilots\",\"length\"]]],null]],null,{\"statements\":[[4,\"if\",[[22,[\"selectedBadge\",\"has_requirements\"]]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"turquoise-button pull-right\"],[3,\"action\",[[21,0,[]],\"invitePilots\"]],[8],[0,\"INVITE\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"selectedBadge\"]]],null,{\"statements\":[[0,\"                \"],[6,\"button\"],[10,\"class\",\"turquoise-button pull-right\"],[3,\"action\",[[21,0,[]],\"invitePilots\"]],[8],[0,\"ASSIGN\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"turquoise-button pull-right disabled\"],[10,\"disabled\",\"disabled\"],[8],[0,\"INVITE\"],[9],[0,\"\\n            \"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"          \"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"          \"],[6,\"div\"],[10,\"class\",\"turquoise-border-button pull-right\"],[3,\"action\",[[21,0,[]],\"cancelInvitePilots\"]],[8],[0,\"CANCEL\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row badge-selection\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n        \"],[6,\"label\"],[8],[0,\"Badge\"],[9],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"optionLabelPath\",\"optionValuePath\",\"prompt\"],[[22,[\"badges\"]],[22,[\"selectedBadge\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"selectedBadge\"]]],null]],null],\"name\",\"id\",\"Select Badge\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"selectedBadge\",\"has_requirements\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n          \"],[6,\"p\"],[8],[0,\"This onboarding requires pilots to complete the steps in order below:\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"selectedBadge\",\"mindflash_series_name\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-6 requirement-wrapper\"],[8],[0,\"\\n            \"],[6,\"p\"],[8],[6,\"i\"],[10,\"class\",\"fa fa-caret-right\"],[8],[9],[0,\"Mindflash online training:\"],[9],[0,\"\\n            \"],[6,\"p\"],[10,\"class\",\"requirement\"],[8],[1,[22,[\"selectedBadge\",\"mindflash_series_name\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"selectedBadge\",\"checkr_package_name\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-6 requirement-wrapper\"],[8],[0,\"\\n            \"],[6,\"p\"],[8],[6,\"i\"],[10,\"class\",\"fa fa-caret-right\"],[8],[9],[0,\"Background check:\"],[9],[0,\"\\n            \"],[6,\"p\"],[10,\"class\",\"requirement\"],[8],[1,[22,[\"selectedBadge\",\"checkr_package_name\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"selectedBadge\",\"training_package_name\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"col-md-6 requirement-wrapper\"],[8],[0,\"\\n            \"],[6,\"p\"],[8],[6,\"i\"],[10,\"class\",\"fa fa-caret-right\"],[8],[9],[0,\"Training mission:\"],[9],[0,\"\\n            \"],[6,\"p\"],[10,\"class\",\"requirement\"],[8],[1,[22,[\"selectedBadge\",\"training_package_name\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"selectedBadge\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n          \"],[6,\"span\"],[8],[0,\"This badge does not have any onboarding requirements.\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"badges.edit\",[22,[\"selectedBadge\",\"id\"]]],[[\"class\"],[\"btn turquoise-border-button edit-badge\"]],{\"statements\":[[0,\"EDIT BADGE\"]],\"parameters\":[]},null],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/badge-modal.hbs" } });
});
define("admin/templates/components/onboarding/filter-pilots", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0V8VflQE", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"refine filter-pilots\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"panelMode\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"panelMode\"]],\"drones\"],null]],null,{\"statements\":[[0,\"      \"],[1,[26,\"onboarding/pilot-drone-filter\",null,[[\"selectedDrones\",\"selectedCameras\",\"droneIds\",\"cameraIds\",\"drones\",\"cameras\",\"setPanel\",\"cacheObjects\"],[[22,[\"selectedDrones\"]],[22,[\"selectedCameras\"]],[22,[\"droneIds\"]],[22,[\"cameraIds\"]],[22,[\"drones\"]],[22,[\"cameras\"]],\"setPanel\",\"cacheObjects\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[26,\"is-equal\",[[22,[\"panelMode\"]],\"devices\"],null]],null,{\"statements\":[[0,\"      \"],[1,[26,\"onboarding/pilot-device-filter\",null,[[\"selectedDevices\",\"devices\",\"deviceIds\",\"setPanel\",\"cacheObjects\"],[[22,[\"selectedDevices\"]],[22,[\"devices\"]],[22,[\"deviceIds\"]],\"setPanel\",\"cacheObjects\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"header-row\"],[8],[0,\"\\n      \"],[6,\"h2\"],[8],[0,\"Refine\"],[9],[0,\"\\n      \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"onboarding/pilot-location-filter\",null,[[\"distance\",\"lat\",\"lon\",\"locationTitle\",\"setPanel\",\"cacheObjects\"],[[22,[\"distance\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"locationTitle\"]],\"setPanel\",\"cacheObjects\"]]],false],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"dropdown-refine\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"refine-header\"],[3,\"action\",[[21,0,[]],\"setPanel\",\"drones\",\"Drones\"]],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"header-title\"],[8],[0,\"Drone Systems (\"],[1,[22,[\"selectedDrones\",\"length\"]],false],[0,\")\"],[9],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-chevron-right\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"dropdown-refine\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"refine-header\"],[3,\"action\",[[21,0,[]],\"setPanel\",\"devices\",\"Devices\"]],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"header-title\"],[8],[0,\"Devices (\"],[1,[22,[\"selectedDevices\",\"length\"]],false],[0,\")\"],[9],[0,\"\\n        \"],[6,\"i\"],[10,\"class\",\"fa fa-chevron-right\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"onboarding/pilot-license-filter\",null,[[\"selectedLicenses\",\"licenses\",\"licenseIds\",\"licenseTitle\",\"setPanel\",\"cacheObjects\"],[[22,[\"selectedLicenses\"]],[22,[\"licenses\"]],[22,[\"licenseIds\"]],[22,[\"licenseTitle\"]],\"setPanel\",\"cacheObjects\"]]],false],[0,\"\\n\\n    \"],[1,[26,\"onboarding/pilot-badge-filter\",null,[[\"selectedBadges\",\"badges\",\"pilotBadgeBadgeIds\",\"pilotBadgeStatuses\",\"pilotBadgeStatusIds\",\"selectPilotBadgeStatuses\",\"pilotWithoutBadges\",\"pilotBadgeInclude\",\"setPanel\",\"cacheObjects\"],[[22,[\"selectedBadges\"]],[22,[\"badges\"]],[22,[\"pilotBadgeBadgeIds\"]],[22,[\"pilotBadgeStatuses\"]],[22,[\"pilotBadgeStatusIds\"]],[22,[\"selectPilotBadgeStatuses\"]],[22,[\"pilotWithoutBadges\"]],[22,[\"pilotBadgeInclude\"]],\"setPanel\",\"cacheObjects\"]]],false],[0,\"\\n\"]],\"parameters\":[]}],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/filter-pilots.hbs" } });
});
define("admin/templates/components/onboarding/pilot-badge-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QDP7fmWM", "block": "{\"symbols\":[\"status\",\"badge\"],\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[[22,[\"badgeTitle\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"badge-data include-switch\"],[8],[0,\"\\n        Include\\n        \"],[6,\"label\"],[10,\"class\",\"switch\"],[8],[0,\"\\n           \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"change\"],[\"checkbox\",[22,[\"pilotBadgeInclude\"]],[26,\"action\",[[21,0,[]],\"toggleInclude\"],null]]]],false],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"slider round\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"badge-data\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[1,[26,\"input\",null,[[\"type\",\"label\",\"checked\",\"change\"],[\"checkbox\",\"No Badges\",[22,[\"pilotWithoutBadges\"]],[26,\"action\",[[21,0,[]],\"toggleNoBadge\"],null]]]],false],[0,\" No Badges\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"hr\"],[8],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"badge-data badge-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"badges\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"wrap\",\"checked\"],[[22,[\"selectedBadges\"]],[21,2,[]],true,[26,\"includes\",[[22,[\"pilotBadgeBadgeIds\"]],[21,2,[\"id\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"hr\"],[8],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"badge-data\"],[8],[0,\"\\n    \"],[6,\"fieldset\"],[11,\"disabled\",[20,\"disableBadgeStatuses\"]],[8],[0,\"\\n      \"],[6,\"legend\"],[10,\"class\",\"panel-section-title\"],[8],[0,\"Badge Status\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"pilotBadgeStatuses\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"checked\"],[[22,[\"selectPilotBadgeStatuses\"]],[21,1,[]],[26,\"includes\",[[22,[\"pilotBadgeStatusIds\"]],[21,1,[\"id\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/pilot-badge-filter.hbs" } });
});
define("admin/templates/components/onboarding/pilot-device-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DYEtbHmR", "block": "{\"symbols\":[\"device\"],\"statements\":[[6,\"div\"],[10,\"class\",\"panel-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-back\"],[8],[0,\"\\n    \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setPanel\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-chevron-left\"],[8],[9],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"panel-title\"],[8],[0,\"Back\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-clear\"],[8],[0,\"\\n    \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clear\"]],[8],[0,\"Clear\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-section-title\"],[8],[0,\"\\n    Accepted Devices\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"devices\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"checked\"],[[22,[\"selectedDevices\"]],[21,1,[]],[26,\"includes\",[[22,[\"deviceIds\"]],[21,1,[\"id\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/pilot-device-filter.hbs" } });
});
define("admin/templates/components/onboarding/pilot-drone-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kbrkIU0t", "block": "{\"symbols\":[\"camera\",\"drone\"],\"statements\":[[6,\"div\"],[10,\"class\",\"panel-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-back\"],[8],[0,\"\\n    \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setPanel\"]],[8],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-chevron-left\"],[8],[9],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"panel-title\"],[8],[0,\"Back\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-clear\"],[8],[0,\"\\n    \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clear\"]],[8],[0,\"Clear\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-section-title\"],[8],[0,\"\\n    Accepted Drones\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"drones\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"checked\",\"includeManufacturer\"],[[22,[\"selectedDrones\"]],[21,2,[]],[26,\"includes\",[[22,[\"droneIds\"]],[21,2,[\"id\"]]],null],true]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"panel-section-title\"],[8],[0,\"\\n    Accepted Cameras\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"cameras\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"checked\"],[[22,[\"selectedCameras\"]],[21,1,[]],[26,\"includes\",[[22,[\"cameraIds\"]],[21,1,[\"id\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/pilot-drone-filter.hbs" } });
});
define("admin/templates/components/onboarding/pilot-license-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xM671Dx+", "block": "{\"symbols\":[\"license\"],\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[[22,[\"licenseTitle\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"license-data\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"licenses\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"checkbox-item\",null,[[\"selections\",\"model\",\"checked\"],[[22,[\"selectedLicenses\"]],[21,1,[]],[26,\"includes\",[[22,[\"licenseIds\"]],[21,1,[\"id\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/pilot-license-filter.hbs" } });
});
define("admin/templates/components/onboarding/pilot-location-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GttnCSwK", "block": "{\"symbols\":[],\"statements\":[[4,\"collapsible-sidebar-item\",null,[[\"title\"],[[22,[\"locationTitle\"]]]],{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"location-data\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"location-header\"],[8],[0,\"\\n      City/State\\n    \"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"id\",\"value\",\"class\",\"placeholder\",\"maxlength\"],[\"locationSearch\",[22,[\"location\"]],\"textbox\",\"Search\",\"50\"]]],false],[0,\"\\n\"],[4,\"if\",[[22,[\"distanceFilter\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"location-header\"],[8],[0,\"\\n        Miles: \"],[6,\"strong\"],[8],[1,[20,\"distance\"],false],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"distance-slider\"],[8],[0,\"\\n        0\\n        \"],[6,\"input\"],[11,\"oninput\",[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"distance\"]]],null]],[[\"value\"],[\"target.value\"]]]],[10,\"min\",\"25\"],[10,\"max\",\"250\"],[11,\"value\",[20,\"distance\"]],[10,\"steps\",\"25\"],[10,\"list\",\"steplist\"],[10,\"type\",\"range\"],[8],[9],[0,\"\\n        \"],[6,\"datalist\"],[10,\"id\",\"steplist\"],[8],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"25\"],[10,\"label\",\"25\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"50\"],[10,\"label\",\"50\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"75\"],[10,\"label\",\"75\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"100\"],[10,\"label\",\"100\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"125\"],[10,\"label\",\"125\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"150\"],[10,\"label\",\"150\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"175\"],[10,\"label\",\"175\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"200\"],[10,\"label\",\"200\"],[8],[9],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"225\"],[10,\"label\",\"225\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n        250\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/onboarding/pilot-location-filter.hbs" } });
});
define("admin/templates/components/open-client-app", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0rA6YLAW", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"login-as-customer-link\"],[8],[0,\"\\n  \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"openClientApp\"]],[8],[1,[20,\"label\"],false],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/open-client-app.hbs" } });
});
define("admin/templates/components/organization-package-checkbox", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rU1lgiVQ", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"organization-checkbox \",[20,\"checkboxClass\"]]]],[3,\"action\",[[21,0,[]],\"toggleChecked\"]],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/organization-package-checkbox.hbs" } });
});
define("admin/templates/components/photo-swipe", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "TvI8HEwa", "block": "{\"symbols\":[\"item\",\"&default\"],\"statements\":[[4,\"if\",[[23,2]],null,{\"statements\":[[4,\"if\",[[22,[\"items\"]]],null,{\"statements\":[[4,\"each\",[[22,[\"items\"]]],null,{\"statements\":[[0,\"      \"],[6,\"a\"],[11,\"data-width\",[21,1,[\"w\"]]],[11,\"data-height\",[21,1,[\"h\"]]],[3,\"action\",[[21,0,[]],\"launchGallery\",[21,1,[]]]],[8],[0,\"\\n          \"],[13,2,[[21,1,[]]]],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[13,2],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null],[2,\" Root element of PhotoSwipe. Must have class pswp. \"],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"pswp\"],[10,\"tabindex\",\"-1\"],[10,\"role\",\"dialog\"],[10,\"aria-hidden\",\"true\"],[8],[0,\"\\n\\n  \"],[2,\" Background of PhotoSwipe.\\n    It's a separate element, as animating opacity is faster than rgba(). \"],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pswp__bg\"],[8],[9],[0,\"\\n\\n    \"],[2,\" Slides wrapper with overflow:hidden. \"],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pswp__scroll-wrap\"],[8],[0,\"\\n\\n      \"],[2,\" Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. \"],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pswp__container\"],[8],[0,\"\\n        \"],[2,\" don't modify these 3 pswp__item elements, data is added later on \"],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__item\"],[8],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__item\"],[8],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__item\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[2,\" Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. \"],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pswp__ui pswp__ui--hidden\"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__top-bar\"],[8],[0,\"\\n\\n          \"],[2,\"  Controls are self-explanatory. Order can be changed. \"],[0,\"\\n\\n          \"],[6,\"div\"],[10,\"class\",\"pswp__counter\"],[8],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"options\",\"hideClose\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--close\"],[10,\"title\",\"Close (Esc)\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"unless\",[[22,[\"options\",\"hideShare\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--share\"],[10,\"title\",\"Share\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"unless\",[[22,[\"options\",\"hideToggleFullScreen\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--fs\"],[10,\"title\",\"Toggle fullscreen\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"unless\",[[22,[\"options\",\"hideZoomInOut\"]]],null,{\"statements\":[[0,\"            \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--zoom\"],[10,\"title\",\"Zoom in/out\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n          \"],[2,\" Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR \"],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"pswp__preloader\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"pswp__preloader__icn\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"pswp__preloader__cut\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"pswp__preloader__donut\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"pswp__share-tooltip\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--arrow--left\"],[10,\"title\",\"Previous (arrow left)\"],[8],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"button\"],[10,\"class\",\"pswp__button pswp__button--arrow--right\"],[10,\"title\",\"Next (arrow right)\"],[8],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"pswp__caption\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"pswp__caption__center\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/photo-swipe.hbs" } });
});
define("admin/templates/components/pilot-approval-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sVM1rOoh", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"name\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-approval-button.hbs" } });
});
define("admin/templates/components/pilot-badge", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7Tywcifb", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"pilot-badge bottom-buffer\"],[8],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[1,[22,[\"pb\",\"badge\",\"name\"]],false],[0,\"\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n    \"],[6,\"span\"],[8],[0,\"Status - \"],[1,[22,[\"pb\",\"status\"]],false],[0,\" \"],[1,[26,\"if\",[[26,\"is-equal\",[[22,[\"pb\",\"status\"]],\"complete\"],null],[26,\"moment-format\",[[22,[\"pb\",\"updated_at\"]],\"MM/DD/YY\"],null]],null],false],[0,\" \"],[9],[0,\"\\n    \"],[6,\"br\"],[8],[9],[0,\"\\n    \"],[6,\"span\"],[8],[0,\"Invited on \"],[1,[26,\"moment-format\",[[22,[\"pb\",\"created_at\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n    \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"removeBadge\",[22,[\"pb\"]]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-close\"],[8],[9],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-badge.hbs" } });
});
define("admin/templates/components/pilot-device-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "w8zxMr0h", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Device \"],[1,[20,\"displayedIndex\"],false],[0,\":\"],[9],[0,\"\\n    \"],[1,[22,[\"device\",\"name\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-device-view.hbs" } });
});
define("admin/templates/components/pilot-dispatch-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KrJDDeEa", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"row \",[26,\"if\",[[22,[\"autoDispatch\"]],\"disable-from-click\"],null]]]],[3,\"action\",[[21,0,[]],\"toggleIncludePilot\"],[[\"allowedKeys\",\"bubbles\"],[\"shift\",false]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pilot-details\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"checkbox-spacing\"],[8],[0,\"\\n\"],[4,\"unless\",[[22,[\"autoDispatch\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"pilot\",\"invited\"]]],null,{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"src\",\"/assets/images/checked_box.svg\"],[10,\"class\",\"checkbox-image\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"src\",\"/assets/images/uncheck_box.svg\"],[10,\"class\",\"checkbox-image\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"pilot-name field-label\"],[8],[0,\"\\n          \"],[1,[22,[\"pilot\",\"first_name\"]],false],[0,\" \"],[1,[22,[\"pilot\",\"last_name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"value\",\"readonly\",\"class\"],[[22,[\"pilot\",\"email\"]],true,\"email-input\"]]],false],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[1,[22,[\"pilot\",\"city\"]],false],[0,\" \"],[1,[22,[\"pilot\",\"postal_code\"]],false],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n\"],[4,\"link-to\",[\"pilots.pilot\",[22,[\"pilot\",\"id\"]]],[[\"bubbles\",\"target\",\"class\"],[false,\"_blank\",\"full-profile-link\"]],{\"statements\":[[0,\"          See Full Profile\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"showPilotScore\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"pilot-score\"],[8],[0,\"Pilot match: \"],[1,[26,\"format-float\",[[22,[\"pilot\",\"score\"]],4],null],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-5\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"pilot\",\"pilot_licenses\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[0,\"Licenses:\"],[9],[0,\" \"],[1,[20,\"licenseList\"],false],[0,\"\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"pilot\",\"drones\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[0,\"Drones:\"],[9],[0,\" \"],[1,[20,\"droneList\"],false],[0,\"\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"pilot\",\"camerasArray\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[0,\"Cameras:\"],[9],[0,\" \"],[1,[20,\"cameraList\"],false],[0,\"\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[0,\"Availability:\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"pilot\",\"is_available_weekdays\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"pilot\",\"is_available_weekends\"]]],null,{\"statements\":[[0,\"        Weekdays and Weekends\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        Weekdays\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"pilot\",\"is_available_weekends\"]]],null,{\"statements\":[[0,\"        Weekends\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        No Availability Selected\\n\"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"    \"],[6,\"br\"],[8],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"mission\",\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"field-label\"],[8],[0,\"Scheduling:\"],[9],[0,\"\\n      \"],[1,[22,[\"pilot\",\"pilot_search_metum\",\"active_missions\"]],false],[0,\"\\n      Missions Accepted for this date\\n      \"],[6,\"br\"],[8],[9],[0,\"\\n      \"],[1,[22,[\"pilot\",\"pilot_search_metum\",\"invitations\"]],false],[0,\"\\n      Missions Notified for this date\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-3 text-right\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"invite-info\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"pilot\",\"justInvited\"]]],null,{\"statements\":[[0,\"        This pilot was just invited\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"pilot\",\"pilot_search_metum\",\"invitation_date\"]]],null,{\"statements\":[[0,\"        Pilot invited on\\n        \"],[1,[26,\"moment-format\",[[22,[\"pilot\",\"pilot_search_metum\",\"invitation_date\"]],\"MM/DD/YY h:mma\"],null],false],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n      \"]],\"parameters\":[]},null]],\"parameters\":[]}],[4,\"if\",[[22,[\"pilot\",\"justInvited\"]]],null,{\"statements\":[],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"pilot\",\"pilot_search_metum\",\"invitation_payout\"]]],null,{\"statements\":[[0,\"        Invitation Price:\\n        \"],[1,[26,\"format-dollar\",[[22,[\"pilot\",\"pilot_search_metum\",\"invitation_payout\"]]],null],false],[0,\"\\n      \"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"b\"],[8],[1,[26,\"format-distance\",[[22,[\"pilot\",\"distance\"]]],null],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-dispatch-row.hbs" } });
});
define("admin/templates/components/pilot-dispatch", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mEXZ8A3U", "block": "{\"symbols\":[\"np\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table table-borderless\"],[8],[0,\"\\n    \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"orderedNotifiedPilots\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[4,\"link-to\",[\"pilots.pilot\",[21,1,[\"pilot\",\"id\"]]],[[\"bubbles\",\"target\"],[false,\"_blank\"]],{\"statements\":[[1,[21,1,[\"pilot\",\"fullName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[1,[21,1,[\"status\"]],false],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[21,1,[\"status\"]],\"accepted\"],null]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"btn btn-danger btn-xs pull-right\"],[10,\"title\",\"Pilot cancelled mission\"],[3,\"action\",[[21,0,[]],\"pilotCancelled\",[22,[\"model\"]]]],[8],[0,\"cancel\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[1,[26,\"format-dollar\",[[21,1,[\"estimated_payout\"]]],null],false],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"td\"],[10,\"class\",\"text-right\"],[8],[0,\"\\n            \"],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY hh:mma\"],null],false],[0,\"\\n          \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"canReInvite\"]]],null,{\"statements\":[[0,\"          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"invitationDispatchInProgress\"]]],null,{\"statements\":[[0,\"              \"],[6,\"span\"],[10,\"disabled\",\"disabled\"],[10,\"class\",\"btn btn-xs btn-default pull-right disabled\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"Can't manually send invitations while they are being automatically dispatched.\"],[8],[0,\"\\n                re-invite\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"btn btn-xs btn-default pull-right\"],[10,\"title\",\"Pilot cancelled mission\"],[3,\"action\",[[21,0,[]],\"reInvite\",[21,1,[]]]],[8],[0,\"\\n                re-invite\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-dispatch.hbs" } });
});
define("admin/templates/components/pilot-drone-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q41W5Ump", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"drone\",\"hasOptionalCameras\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Drone \"],[1,[20,\"displayedIndex\"],false],[0,\":\"],[9],[0,\"\\n      \"],[1,[22,[\"drone\",\"drone\",\"name\"]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-sm-8\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Camera(s):\"],[9],[0,\"\\n      \"],[1,[20,\"displayedCameras\"],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Drone \"],[1,[20,\"displayedIndex\"],false],[0,\":\"],[9],[0,\"\\n      \"],[1,[22,[\"drone\",\"drone\",\"name\"]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-drone-view.hbs" } });
});
define("admin/templates/components/pilot-equipment-index-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LW20O+FM", "block": "{\"symbols\":[\"pilotEquipment\"],\"statements\":[[4,\"if\",[[22,[\"showModal\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"add-pilot-equipment-modal\",null,[[\"close\",\"action\",\"currentRecord\"],[[26,\"action\",[[21,0,[]],\"toggleModal\"],null],[26,\"action\",[[21,0,[]],\"saveRecord\"],null],[22,[\"currentRecord\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"pe-header\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pe-title\"],[3,\"action\",[[21,0,[]],\"toggleCollapsed\"]],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"\\n      Other Equipment\\n\"],[4,\"if\",[[22,[\"collapsed\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-down\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"i\"],[10,\"class\",\"fa fa-angle-up\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n    \"],[6,\"button\"],[10,\"class\",\"btn btn-add\"],[3,\"action\",[[21,0,[]],\"addRecord\"]],[8],[0,\"Add Equipment\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"collapsed\"]]],null,{\"statements\":[[6,\"table\"],[10,\"class\",\"pe-table\"],[8],[0,\"\\n  \"],[6,\"tr\"],[8],[0,\"\\n    \"],[6,\"th\"],[8],[0,\"Equipment Type\"],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n    \"],[6,\"th\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"allRecords\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n      \"],[6,\"td\"],[8],[9],[0,\"\\n      \"],[6,\"td\"],[8],[9],[0,\"\\n      \"],[6,\"td\"],[8],[9],[0,\"\\n      \"],[6,\"td\"],[8],[0,\"  \\n        \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"editRecord\",[21,1,[]]]],[8],[0,\"Edit\"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"li\"],[8],[0,\"\\n              \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"cloneRecord\",[21,1,[]]]],[8],[0,\"Clone\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-equipment-index-list.hbs" } });
});
define("admin/templates/components/pilot-equipment-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3BQ2rW36", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"EQUIPMENT \"],[1,[20,\"displayedIndex\"],false],[0,\":\"],[9],[0,\"\\n    \"],[1,[22,[\"pilotEquipment\",\"name\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-equipment-view.hbs" } });
});
define("admin/templates/components/pilot-license-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0IPv0FpQ", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"license-col pilot-section-col\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"License \"],[1,[20,\"displayedIndex\"],false],[0,\":\"],[9],[0,\"\\n    \"],[1,[22,[\"license\",\"license\",\"name\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"license-col pilot-section-col\"],[8],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Number:\"],[9],[0,\" \"],[1,[22,[\"license\",\"license_number\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"license-col pilot-section-col\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"d-inline-block mg-right-sm\"],[8],[0,\"\\n      \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Image:\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"license\",\"image\"]]],null,{\"statements\":[[0,\"        \"],[6,\"a\"],[11,\"href\",[22,[\"license\",\"image\"]]],[10,\"target\",\"_blank\"],[8],[0,\"\\n          \"],[6,\"img\"],[11,\"src\",[22,[\"license\",\"image\"]]],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"img\"],[10,\"src\",\"/assets/images/image_placeholder.png\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-license-view.hbs" } });
});
define("admin/templates/components/pilot-payout", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vY/MsBZ4", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"createPayout\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n          \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"payout\",\"amount\"]],\"Amount Paid\",[22,[\"model\",\"payout\",\"errors\",\"amount\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"Create\",\"btn btn-success btn-lg\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-payout.hbs" } });
});
define("admin/templates/components/pilot-reject-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KVfaIz2F", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"name\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-reject-button.hbs" } });
});
define("admin/templates/components/pilot-search-autocomplete", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "S6vUK/Gd", "block": "{\"symbols\":[\"result\",\"dist\",\"thisMaxResult\"],\"statements\":[[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12 search-query\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"query\"]],\"form-control input-lg\",[22,[\"placeholder\"]]]]],false],[0,\"\\n      \"],[6,\"img\"],[10,\"src\",\"/assets/images/search.svg\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"row bottom-buffer top-buffer-lg\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-4 checkbox-filter\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"mb-2\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"hasLicenses\"]],\"Licensed Only\"]]],false],[0,\" Licensed\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"mb-2\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"hasDrones\"]],\"With Only\"]]],false],[0,\" Has a drone\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isScheduled\"]]],null,{\"statements\":[[0,\"          \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"availableForRelativeMission\"]],\"available_for_relative_mission\"]]],false],[0,\"\\n              Available on Scheduled Date\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[1,[26,\"input\",null,[[\"type\",\"disabled\",\"checked\",\"name\"],[\"checkbox\",\"disabled\",[22,[\"availableForRelativeMission\"]],\"available_for_relative_mission\"]]],false],[0,\"\\n              Available on Scheduled Date\\n\"]],\"parameters\":[]}],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"mb-2\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"name\"],[\"checkbox\",[22,[\"noDronebasePilots\"]],\"Filter Dronebase Pilots\"]]],false],[0,\" Filter Dronebase Pilots\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-8 badge-container\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Special Onboarding\"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"d-inline-block ml-3 clear-button\"],[8],[0,\"\\n          \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clearBadgeId\"]],[8],[0,\"clear\"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[1,[26,\"select-custom\",null,[[\"selectClass\",\"selectName\",\"reset\",\"assignSelectedObject\",\"useSendAction\",\"optionLabelPath\",\"content\",\"selection\",\"prompt\",\"action\"],[\"form-control input-lg\",\"badge-filter\",false,true,true,\"name\",[22,[\"badges\"]],[22,[\"selectedBadge\"]],\"Choose option\",\"setBadgeId\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"row bottom-buffer-lg top-buffer\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12 equipments\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row bottom-buffer-lg\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n         \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n           \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Preset Filters\"],[9],[0,\"\\n           \"],[6,\"div\"],[10,\"class\",\"d-inline-block ml-3 clear-button\"],[8],[0,\"\\n             \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"clearFilter\"]],[8],[0,\"clear\"],[9],[0,\"\\n           \"],[9],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"selectClass\",\"selectName\",\"reset\",\"assignSelectedObject\",\"useSendAction\",\"optionLabelPath\",\"content\",\"prompt\",\"action\"],[\"form-control input-lg\",\"preset-search-filter\",false,true,true,\"name\",[22,[\"model\",\"presetSearchFilters\"]],\"Choose option\",\"setPresetFilter\"]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Min. Camera Resolution\"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setMegaPixels\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n            \"],[6,\"option\"],[10,\"value\",\"12\"],[8],[0,\"Choose option\"],[9],[0,\"\\n            \"],[6,\"option\"],[10,\"value\",\"20\"],[8],[0,\"20mp\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[1,[26,\"drones-devices-equipment-selection\",null,[[\"model\",\"drones\",\"selectedDrones\",\"selectedCameras\",\"selectedDevices\",\"selectedEquipment\"],[[22,[\"model\"]],[22,[\"drones\"]],[22,[\"selectedDrones\"]],[22,[\"selectedCameras\"]],[22,[\"selectedDevices\"]],[22,[\"selectedEquipment\"]]]]],false],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row sort-by\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showDispatchSorting\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n            \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Sort By\"],[9],[0,\"\\n            \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setSortBy\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"sort-pilots-by form-control input-lg\"],[8],[0,\"\\n              \"],[6,\"option\"],[10,\"value\",\"distance\"],[8],[0,\"\\n                Distance\\n              \"],[9],[0,\"\\n              \"],[6,\"option\"],[10,\"value\",\"score\"],[8],[0,\"\\n                Best match\\n              \"],[9],[0,\"\\n              \"],[6,\"option\"],[10,\"value\",\"score_auto_dispatch\"],[8],[0,\"\\n                Best match - Auto Dispatch\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Max. Result Count\"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setMaxResults\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"autoDispatch\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",\"24\"],[10,\"selected\",\"\"],[8],[0,\"24\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[22,[\"maxResultsOptions\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"maxResults\"]],[21,3,[]]],null]],null,{\"statements\":[[0,\"                  \"],[6,\"option\"],[11,\"value\",[21,3,[]]],[10,\"selected\",\"\"],[8],[1,[21,3,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"option\"],[11,\"value\",[21,3,[]]],[8],[1,[21,3,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[3]},null]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"col-md-3\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Max. Pilot Distance\"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setDistance\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"autoDispatch\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[10,\"value\",\"100\"],[10,\"selected\",\"\"],[8],[0,\"100\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[22,[\"distances\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"distance\"]],[21,2,[]]],null]],null,{\"statements\":[[0,\"                  \"],[6,\"option\"],[11,\"value\",[21,2,[]]],[10,\"selected\",\"\"],[8],[1,[21,2,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[6,\"option\"],[11,\"value\",[21,2,[]]],[8],[1,[21,2,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[2]},null]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pilot-results-header\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Results count: \"],[1,[22,[\"pilotList\",\"length\"]],false],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"invite-button\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"state\"]],\"error\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"span\"],[10,\"class\",\"error\"],[8],[1,[20,\"message\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"state\"]],\"success\"],null]],null,{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"src\",\"/assets/images/green-check.svg\"],[10,\"class\",\"green-checkmark\"],[8],[9],[0,\"\\n            \"],[1,[20,\"message\"],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"numPilotsInvited\"]]],null,{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"src\",\"/assets/images/green-check.svg\"],[10,\"class\",\"green-checkmark\"],[8],[9],[0,\"\\n            You've invited \"],[1,[20,\"numPilotsInvited\"],false],[0,\" \"],[1,[26,\"if\",[[26,\"is-equal\",[[22,[\"numPilotsInvited\"]],1],null],\"pilot\",\"pilots\"],null],false],[0,\"!\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"autoDispatch\"]]],null,{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"autoDispatchPilots\"]],[8],[0,\"AUTO DISPATCH\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"numPilotsToInvite\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"num-selected-pilots\"],[8],[1,[20,\"numPilotsToInvite\"],false],[0,\" \"],[1,[26,\"if\",[[26,\"is-equal\",[[22,[\"numPilotsToInvite\"]],1],null],\"Pilot\",\"Pilots\"],null],false],[0,\" Selected\"],[9],[0,\"\\n\"],[4,\"unless\",[[22,[\"confirmInvite\"]]],null,{\"statements\":[[0,\"                \"],[6,\"button\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"invitePilots\"]],[8],[0,\"INVITE\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"gray-text-button\"],[3,\"action\",[[21,0,[]],\"clearInvites\"]],[8],[0,\"CLEAR\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"button\"],[10,\"class\",\"red-border-button\"],[3,\"action\",[[21,0,[]],\"confirmInvitePilots\"]],[8],[0,\"CONFIRM\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"gray-text-button\"],[3,\"action\",[[21,0,[]],\"cancelInvitePilots\"]],[8],[0,\"CANCEL\"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"button\"],[10,\"class\",\"disabled-button\"],[10,\"disabled\",\"\"],[8],[0,\"INVITE\"],[9],[0,\"\\n            \"]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"          \"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"pilotList\",\"length\"]]],null,{\"statements\":[[0,\"        \"],[6,\"ul\"],[10,\"class\",\"pilot-list\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"pilotList\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[8],[0,\"\\n              \"],[1,[26,\"pilot-dispatch-row\",null,[[\"autoDispatch\",\"mission\",\"pilot\",\"toggleIncludePilot\"],[[22,[\"autoDispatch\"]],[22,[\"model\",\"mission\"]],[21,1,[]],\"toggleIncludePilot\"]]],false],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/pilot-search-autocomplete.hbs" } });
});
define("admin/templates/components/radio-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/Q1P4qtD", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/radio-button.hbs" } });
});
define("admin/templates/components/rating-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+VsJ4UjB", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"rating-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal text-center\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group \"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          How did the pilot do on this mission?\\n        \"],[9],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"Please rate the quality of assets uploaded, on a scale of 1-5.\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-12 stars\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"star_container\"],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"class\",[27,[\"star star1 \",[26,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]],1],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"setPilotRating\",1]],[8],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"Didn't meet expectations\"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"star_container\"],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"class\",[27,[\"star star2 \",[26,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]],2],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"setPilotRating\",2]],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"star_container\"],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"class\",[27,[\"star star3 \",[26,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]],3],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"setPilotRating\",3]],[8],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"Met expectations\"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"star_container\"],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"class\",[27,[\"star star4 \",[26,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]],4],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"setPilotRating\",4]],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"star_container\"],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"class\",[27,[\"star star5 \",[26,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]],5],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"setPilotRating\",5]],[8],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"Exceeded expectations\"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n            You must select a star to rate the pilot\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-primary\"],[3,\"action\",[[21,0,[]],\"rate\",[22,[\"model\"]],false]],[8],[0,\"SUBMIT\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"pilot_zendesk_ticket_url\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[10,\"class\",\"btn btn-primary\"],[3,\"action\",[[21,0,[]],\"rate\",[22,[\"model\"]],true]],[8],[0,\"\\n            SUBMIT & GIVE FEEDBACK ON ZENDESK\\n          \"],[9],[0,\"\\n          \"],[6,\"form\"],[10,\"class\",\"hide\"],[11,\"action\",[22,[\"model\",\"mission\",\"pilot_zendesk_ticket_url\"]]],[10,\"method\",\"get\"],[10,\"target\",\"_blank\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/rating-modal.hbs" } });
});
define("admin/templates/components/reschedule-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Oe2zRnNE", "block": "{\"symbols\":[\"reason\"],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\",\"appendedClasses\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null],\"small-modal reschedule-modal\"]],{\"statements\":[[0,\"\\n\"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n  \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"reschedule-modal-content\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n        Edit Flight Date\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"big-title border-bottom\"],[8],[0,\"Reschedule\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n        \"],[6,\"label\"],[8],[0,\"\\n          Reason (Required):\\n        \"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setRescheduleReason\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"select-custom\"],[8],[0,\"\\n            \"],[6,\"option\"],[10,\"disabled\",\"\"],[10,\"selected\",\"\"],[8],[0,\"\\n              Choose option\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"rescheduleReasons\"]]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[11,\"value\",[21,1,[\"id\"]]],[8],[0,\"\\n              \"],[1,[21,1,[\"short\"]],false],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n        \"],[6,\"label\"],[8],[0,\"\\n          Details:\\n        \"],[9],[0,\"\\n          \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"missionReschedule\",\"notes\"]],\"form-control\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"priceZero\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setRescheduleChoice\",\"clear\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\" Clear scheduled date/time\\n        \"],[9],[0,\"\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"priceZero\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setRescheduleChoice\",\"reschedule\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\" Set a new date/time\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"rescheduleChoice\"]],\"reschedule\"],null]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[1,[26,\"schedule-inputs\",null,[[\"mission\",\"showReschedule\",\"selectedStart\",\"selectedEnd\",\"scheduleError\",\"class\"],[[22,[\"model\",\"mission\"]],[22,[\"rescheduleAllowed\"]],[22,[\"selectedStart\"]],[22,[\"selectedEnd\"]],[22,[\"scheduleError\"]],\"mission-schedule {{if model.mission.is Scheduled \\\"disabled\\\"}}\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"modal-footer\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group text-center\"],[8],[0,\"\\n    \"],[6,\"a\"],[11,\"class\",[27,[\"btn save-reschedule turquoise-button \",[26,\"unless\",[[22,[\"canSave\"]],\"disabled\"],null]]]],[3,\"action\",[[21,0,[]],\"save\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n      Save\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/reschedule-modal.hbs" } });
});
define("admin/templates/components/reshoot-edit-box", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jAtrZFEG", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[11,\"class\",[27,[[26,\"if\",[[22,[\"isReshoot\"]],\"is-reshoot-box\",\"has-reshoot-box\"],null]]]],[8],[0,\"\\n  \"],[6,\"div\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isReshoot\"]]],null,{\"statements\":[[0,\"      \"],[6,\"strong\"],[8],[0,\"This is a reshoot of\\n\"],[4,\"link-to\",[\"missions.edit\",[22,[\"mission\",\"parent_id\"]]],null,{\"statements\":[[0,\"          \"],[1,[22,[\"mission\",\"parent_id\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"strong\"],[8],[0,\"This mission required a reshoot\\n\"],[4,\"link-to\",[\"missions.edit\",[22,[\"mission\",\"reshoot_mission_id\"]]],null,{\"statements\":[[0,\"          \"],[1,[22,[\"mission\",\"reshoot_mission_id\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[6,\"span\"],[8],[0,\"\\n      \"],[1,[26,\"moment-format\",[[22,[\"mission\",\"statusTimeStamp\"]],\"MM/DD/YY, hh:mm a\"],[[\"timeZone\"],[[22,[\"mission\",\"location\",\"timezone_id\"]]]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"table\"],[8],[0,\"\\n    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-label\"],[8],[0,\"\\n        Reason:\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-content\"],[8],[0,\"\\n        \"],[1,[22,[\"displayedMission\",\"rejection_reason\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-label\"],[8],[0,\"\\n        Details:\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-content\"],[8],[0,\"\\n        \"],[1,[22,[\"displayedMission\",\"rejection_notes\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-label\"],[8],[0,\"\\n        Admin:\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-content\"],[8],[0,\"\\n        \"],[1,[22,[\"displayedMission\",\"rejection_admin\",\"fullName\"]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isReshoot\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[8],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-label\"],[8],[0,\"\\n        Previous Pilot:\\n      \"],[9],[0,\"\\n      \"],[6,\"td\"],[10,\"class\",\"table-content\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"pilots.pilot.missions\",[22,[\"displayedMission\",\"pilot\",\"id\"]]],[[\"target\"],[\"_blank\"]],{\"statements\":[[0,\"          \"],[1,[22,[\"displayedMission\",\"pilot\",\"fullName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"isReshoot\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"displayedMission\",\"pilot\"]]],null,{\"statements\":[[0,\"            \"],[1,[26,\"email-notify\",null,[[\"mission\",\"pilot\"],[[22,[\"mission\"]],[22,[\"displayedMission\",\"pilot\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/reshoot-edit-box.hbs" } });
});
define("admin/templates/components/reshoot-modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "G7IuhCrh", "block": "{\"symbols\":[\"reason\"],\"statements\":[[4,\"modal-dialog\",null,[[\"hasOverlay\",\"translucentOverlay\",\"close\"],[true,true,[26,\"action\",[[21,0,[]],\"close\"],null]]],{\"statements\":[[0,\"\\n  \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"modal-close\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n    \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"reshoot-modal-content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-horizontal\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"h3\"],[10,\"class\",\"col-sm-12\"],[8],[0,\"\\n          Create Reshoot Mission\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Reason\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setRejectionReason\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-md\"],[8],[0,\"\\n            \"],[6,\"option\"],[10,\"disabled\",\"\"],[10,\"selected\",\"\"],[8],[0,\"\\n              Choose reason\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"rejectionReasons\"]]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[11,\"value\",[21,1,[\"slug\"]]],[8],[0,\"\\n                \"],[1,[21,1,[\"name\"]],false],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n            Required\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Details\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"rejectionNotes\"]],\"form-control\"]]],false],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"top-buffer\"],[8],[0,\"\\n            (optional, for internal use only)\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Price\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n            \"],[6,\"input\"],[10,\"name\",\"priceZero\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setPriceZero\",\"parent\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n            Set old mission to $0 and reshoot mission to full price\\n          \"],[9],[0,\"\\n          \"],[6,\"br\"],[8],[9],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n            \"],[6,\"input\"],[10,\"name\",\"priceZero\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setPriceZero\",\"reshoot\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n            Set reshoot mission to $0 and old mission to full price\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n            Required\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"col-sm-2\"],[8],[0,\"\\n          Shot List\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-10\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n            \"],[6,\"input\"],[10,\"name\",\"copyShots\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setCopyShots\",true],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n            Use same shot list for reshoot mission\\n          \"],[9],[0,\"\\n          \"],[6,\"br\"],[8],[9],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"checkbox-label\"],[8],[0,\"\\n            \"],[6,\"input\"],[10,\"name\",\"copyShots\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setCopyShots\",false],null]],[10,\"type\",\"radio\"],[8],[9],[0,\"\\n            I will set the shot list manually\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[0,\"\\n            Required\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group text-center\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-secondary\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[0,\"\\n          Cancel\\n        \"],[9],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-primary\"],[3,\"action\",[[21,0,[]],\"reshoot\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n          Create New Mission\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\" \"],[0,\"\\n  \"],[9],[0,\" \"],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/reshoot-modal.hbs" } });
});
define("admin/templates/components/schedule-inputs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cxrZZWTA", "block": "{\"symbols\":[\"time\",\"time\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-6  schedule-mission-date-field\"],[8],[0,\"\\n    \"],[6,\"label\"],[10,\"class\",\"search-field schedule\"],[8],[0,\"Start Date\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",[26,\"concat\",[\"form-control disabled\",[26,\"if\",[[22,[\"showReschedule\"]],\" hidden\"],null]],null],\"\",[22,[\"scheduledStartDate\"]]]]],false],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",[26,\"concat\",[\"form-control schedule-mission-date-field startDatePicker\",[26,\"if\",[[26,\"is-not\",[[22,[\"showReschedule\"]]],null],\" hidden\"],null]],null],\"\",[22,[\"scheduledStartDate\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n    \"],[6,\"label\"],[10,\"class\",\"search-field schedule\"],[8],[0,\"Start Time\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"time scheduleTimeDatePicker\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showReschedule\"]]],null,{\"statements\":[[0,\"      \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setStartTime\"],[[\"value\"],[\"target.value\"]]]],[11,\"class\",[27,[\"select-custom \",[26,\"if\",[[22,[\"scheduleError\"]],\"error\"],null]]]],[8],[0,\"\\n        \"],[6,\"option\"],[10,\"value\",\"\"],[8],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"availableTimes\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"scheduledStartTime\"]],[21,2,[]]],null]],null,{\"statements\":[[0,\"            \"],[6,\"option\"],[11,\"value\",[21,2,[]]],[10,\"selected\",\"\"],[8],[1,[21,2,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"option\"],[11,\"value\",[21,2,[]]],[8],[1,[21,2,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[2]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control disabled\",\"\",[22,[\"scheduledStartTime\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-6  schedule-mission-date-field\"],[8],[0,\"\\n    \"],[6,\"label\"],[10,\"class\",\"search-field schedule\"],[8],[0,\"End Date\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",[26,\"concat\",[\"form-control disabled\",[26,\"if\",[[22,[\"showReschedule\"]],\" hidden\"],null]],null],\"\",[22,[\"scheduledEndDate\"]]]]],false],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",[26,\"concat\",[\"form-control schedule-mission-date-field endDatePicker\",[26,\"if\",[[26,\"is-not\",[[22,[\"showReschedule\"]]],null],\" hidden\"],null]],null],\"\",[22,[\"scheduledEndDate\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n    \"],[6,\"label\"],[10,\"class\",\"search-field schedule\"],[8],[0,\"End Time\"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"time scheduleTimeDatePicker\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showReschedule\"]]],null,{\"statements\":[[0,\"        \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setEndTime\"],[[\"value\"],[\"target.value\"]]]],[11,\"class\",[27,[\"select-custom \",[26,\"if\",[[22,[\"scheduleError\"]],\"error\"],null]]]],[8],[0,\"\\n          \"],[6,\"option\"],[10,\"value\",\"\"],[8],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"availableTimes\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"scheduledEndTime\"]],[21,1,[]]],null]],null,{\"statements\":[[0,\"              \"],[6,\"option\"],[11,\"value\",[21,1,[]]],[10,\"selected\",\"\"],[8],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"option\"],[11,\"value\",[21,1,[]]],[8],[1,[21,1,[]],false],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n        \"],[4,\"if\",[[22,[\"scheduleError\"]]],null,{\"statements\":[[0,\" \"],[6,\"div\"],[10,\"class\",\"error-message\"],[8],[1,[20,\"scheduleError\"],false],[9]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"form-control disabled\",\"\",[22,[\"scheduledEndTime\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/schedule-inputs.hbs" } });
});
define("admin/templates/components/search-input-delayed", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nBochW5g", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/search-input-delayed.hbs" } });
});
define("admin/templates/components/select-custom", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Md5SsV6R", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"select\"],[11,\"class\",[20,\"selectClass\"]],[11,\"name\",[20,\"selectName\"]],[11,\"disabled\",[20,\"disabled\"]],[3,\"action\",[[21,0,[]],\"changeValue\"],[[\"on\"],[\"change\"]]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"prompt\"]]],null,{\"statements\":[[0,\"    \"],[6,\"option\"],[11,\"disabled\",[26,\"if\",[[22,[\"promptDisabled\"]],\"disabled\"],null]],[11,\"selected\",[26,\"is-not\",[[22,[\"selection\"]]],null]],[8],[0,\"\\n      \"],[1,[20,\"prompt\"],false],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"each\",[[22,[\"content\"]]],null,{\"statements\":[[0,\"    \"],[6,\"option\"],[11,\"value\",[27,[[26,\"read-path\",[[21,1,[]],[22,[\"optionValuePath\"]]],null]]]],[11,\"selected\",[26,\"is-equal\",[[21,1,[]],[22,[\"selection\"]]],null]],[8],[0,\"\\n      \"],[1,[26,\"read-path\",[[21,1,[]],[22,[\"optionLabelPath\"]]],null],false],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/select-custom.hbs" } });
});
define("admin/templates/components/select-enum", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "H4qXeEov", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"selection\"]]],null]],[[\"value\"],[\"target.value\"]]]],[11,\"class\",[20,\"selectClass\"]],[8],[0,\"\\n  \"],[6,\"option\"],[10,\"disabled\",\"\"],[11,\"selected\",[26,\"is-not\",[[22,[\"selection\"]]],null]],[8],[1,[20,\"prompt\"],false],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"content\"]]],null,{\"statements\":[[0,\"  \"],[6,\"option\"],[11,\"value\",[21,1,[\"value\"]]],[11,\"selected\",[26,\"is-equal\",[[21,1,[\"value\"]],[22,[\"selection\"]]],null]],[8],[0,\"\\n    \"],[1,[21,1,[\"name\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/select-enum.hbs" } });
});
define("admin/templates/components/shot-type-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SY9waAxH", "block": "{\"symbols\":[],\"statements\":[[6,\"form\"],[10,\"class\",\"form shot-type-form\"],[3,\"action\",[[21,0,[]],\"save_shot_type\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Shot Title\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\"],[[22,[\"model\",\"name\"]],\"name\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-3 field-description \"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"errors\",\"name\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[0,\"Required!\\n        \"],[6,\"br\"],[8],[9],[0,\"\\n        \"],[1,[22,[\"model\",\"errors\",\"name\",\"firstObject\",\"message\"]],false],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"shotNameError\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"error\"],[8],[0,\" \"],[1,[20,\"shotNameError\"],false],[0,\" \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"strong\"],[8],[0,\"Shot Title\"],[9],[0,\" is displayed on the Mission Available Email and Available Mission Page.\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Shot Description\"],[9],[0,\"\\n      \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[22,[\"model\",\"description\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"description\"]]],null]],null]]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-3 field-description \"],[8],[0,\"\\n    \"],[6,\"strong\"],[8],[0,\"Shot Description\"],[9],[0,\" will be displayed on Available Mission Details Page.\\n  \"],[9],[0,\"\\n\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Video Url\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"class\"],[[22,[\"model\",\"video\"]],\"video\",\"form-control input-lg\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-3 field-description \"],[8],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n    \"],[4,\"link-to\",[\"templates.shots.index\"],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"Cancel\"]],\"parameters\":[]},null],[0,\" \"],[6,\"input\"],[11,\"value\",[20,\"buttonText\"]],[10,\"class\",\"btn btn-success\"],[10,\"type\",\"submit\"],[8],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/shot-type-form.hbs" } });
});
define("admin/templates/components/sortable-column", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yWOxQ2Uh", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"title\"],false],[0,\" \"],[6,\"i\"],[11,\"class\",[27,[\"fa fa-chevron-\",[20,\"direction\"]]]],[8],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/sortable-column.hbs" } });
});
define("admin/templates/components/submit-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bK9eHMaI", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"name\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/submit-button.hbs" } });
});
define("admin/templates/components/template-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lNWghQT3", "block": "{\"symbols\":[\"shot\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"save_template\"],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"value\",\"name\",\"placeholder\",\"class\"],[[22,[\"template\",\"name\"]],\"name\",\"Template Name\",\"form-control input-lg\"]]],false],[0,\"\\n        \"],[6,\"span\"],[10,\"class\",\"name-error\"],[8],[0,\"Required, 3-75 characters\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[1,[26,\"select-custom\",null,[[\"prompt\",\"optionLabelPath\",\"content\",\"assignSelectedObject\",\"useSendAction\",\"action\",\"reset\"],[\"Add Shot\",\"name\",[22,[\"sortedShotTypes\"]],true,true,\"add_shot\",true]]],false],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"reversedShotList\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"shot form-group\"],[8],[0,\"\\n          \"],[6,\"h4\"],[8],[6,\"strong\"],[8],[1,[21,1,[\"shot_type\",\"name\"]],false],[9],[9],[0,\"\\n          \"],[1,[21,1,[\"shot_type\",\"description\"]],false],[0,\"\\n          \"],[1,[26,\"textarea\",null,[[\"value\",\"placeholder\",\"class\"],[[21,1,[\"instructions\"]],\"Description\",\"form-control\"]]],false],[0,\"\\n          \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"remove_shot\",[21,1,[]]]],[8],[0,\"remove\"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n      \"],[6,\"button\"],[10,\"class\",\"btn btn-success\"],[3,\"action\",[[21,0,[]],\"save_template\"]],[8],[0,\"Submit\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"templates.index\"],[[\"class\"],[\"btn btn-default\"]],{\"statements\":[[0,\"Cancel\"]],\"parameters\":[]},null],[0,\"\\n\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/template-form.hbs" } });
});
define("admin/templates/components/textarea-trigger-save", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "11Ougy2n", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/textarea-trigger-save.hbs" } });
});
define("admin/templates/components/weather-icon", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7q52VlCA", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/components/weather-icon.hbs" } });
});
define("admin/templates/equipment/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qd8/6/1r", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Pilot Equipment\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"drone-index-list\",null,[[\"droneManufacturers\",\"model\",\"cameras\",\"recordType\"],[[22,[\"model\",\"droneManufacturers\"]],[22,[\"model\",\"drones\"]],[22,[\"model\",\"cameras\"]],\"drone\"]]],false],[0,\"\\n\\n\"],[1,[26,\"camera-index-list\",null,[[\"droneManufacturers\",\"model\",\"recordType\"],[[22,[\"model\",\"droneManufacturers\"]],[22,[\"model\",\"cameras\"]],\"drone-camera\"]]],false],[0,\"\\n\\n\"],[1,[26,\"device-index-list\",null,[[\"model\",\"recordType\"],[[22,[\"model\",\"devices\"]],\"device\"]]],false],[0,\"\\n\\n\"],[1,[26,\"pilot-equipment-index-list\",null,[[\"model\",\"recordType\"],[[22,[\"model\",\"pilotEquipment\"]],\"pilot-equipment\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/equipment/index.hbs" } });
});
define("admin/templates/four-oh-four", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pmXejGPX", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"text-center\"],[8],[0,\"\\n  \"],[6,\"h3\"],[8],[0,\"404 Not Found\"],[9],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"The page you are looking for does not exist\"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/four-oh-four.hbs" } });
});
define("admin/templates/global-assets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CjtdAPVo", "block": "{\"symbols\":[\"imageProxy\",\"queue\"],\"statements\":[[6,\"div\"],[10,\"class\",\"panel-body\"],[8],[0,\"\\n  \"],[6,\"p\"],[8],[0,\"This is the list of global assets that are available in the panorama\\n    editor.  You can upload additional global assets below.\"],[9],[0,\"\\n\\n\"],[4,\"asset-uploader\",null,[[\"for\",\"class\",\"shot_id\",\"extensions\",\"onfileadd\",\"onstartupload\",\"uploadedCount\"],[\"upload-asset\",\"clearfix\",1,\"mov mp4 jpg jpeg tif tiff png zip\",\"addAsset\",\"startUpload\",[22,[\"galleryImages\",\"length\"]]]],{\"statements\":[],\"parameters\":[2]},null],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"row asset-images\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"galleryImages\",\"length\"]]],null,{\"statements\":[[4,\"photo-swipe\",null,[[\"items\",\"options\"],[[22,[\"galleryImages\"]],[22,[\"galleryOptions\"]]]],{\"statements\":[[0,\"        \"],[6,\"div\"],[11,\"class\",[27,[\"col-xs-2 col-md-1 asset visual\\n            \",[26,\"if\",[[21,1,[\"record\",\"isDeleted\"]],\"deleting-asset\"],null]]]],[8],[0,\"\\n          \"],[6,\"div\"],[11,\"class\",[27,[\"image \",[26,\"if\",[[21,1,[\"record\",\"final\"]],\"asset-final\"],null]]]],[8],[0,\"\\n            \"],[6,\"img\"],[11,\"src\",[27,[[21,1,[\"msrc\"]]]]],[11,\"alt\",[27,[[21,1,[\"title\"]]]]],[10,\"class\",\"img-responsive\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"actions\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"record\",\"downloadUrl\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"class\",\"download-asset\"],[3,\"action\",[[21,0,[]],\"downloadAsset\",[21,1,[\"record\",\"downloadUrl\"]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa fa-cloud-download\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[6,\"a\"],[10,\"class\",\"delete-asset\"],[3,\"action\",[[21,0,[]],\"deleteAsset\",[21,1,[\"record\"]],[21,1,[]]],[[\"bubbles\"],[false]]],[8],[0,\"\\n              \"],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[1,[21,1,[\"title\"]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/global-assets.hbs" } });
});
define("admin/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PnwGkCly", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/index.hbs" } });
});
define("admin/templates/loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XKMfRm3M", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"loading-pane\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"loading-message text-center\"],[8],[0,\"\\n    \"],[1,[20,\"loadingMessage\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/loading.hbs" } });
});
define("admin/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "j3IoX4J5", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"page-header\"],[8],[0,\"\\n\\t  \"],[6,\"h2\"],[8],[0,\"Login to Account\"],[9],[0,\"\\n\\t  \"],[6,\"div\"],[10,\"class\",\"error text-center\"],[8],[1,[22,[\"errors\",\"credentials\",\"base\"]],false],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4\"],[8],[0,\"\\n  \"],[6,\"a\"],[10,\"class\",\"sso google-sso\"],[11,\"href\",[27,[[22,[\"model\",\"baseUrl\"]],\"/google\"]]],[8],[0,\"\\n    Sign in with Google\"],[9],[0,\"\\n  \"],[6,\"a\"],[10,\"class\",\"sso zendesk-sso\"],[11,\"href\",[27,[[22,[\"model\",\"baseUrl\"]],\"/zendesk\"]]],[8],[0,\"\\n    Sign in with Zendesk\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/login.hbs" } });
});
define("admin/templates/missions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pzkq0JXV", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions.hbs" } });
});
define("admin/templates/missions/creative-missions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ziz+hTIe", "block": "{\"symbols\":[\"mission\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"hideFilter\"]]],null,{\"statements\":[[0,\"    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/Filter_Icon.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[26,\"filter-missions\",null,[[\"model\",\"status\",\"latitude\",\"longitude\",\"distance\",\"assets_late\",\"on_hold\",\"hideFilter\",\"clientMissions\"],[[22,[\"model\",\"missions\"]],[22,[\"status\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"distance\"]],[22,[\"assets_late\"]],[22,[\"on_hold\"]],[22,[\"hideFilter\"]],false]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"div\"],[11,\"class\",[27,[\"missions-list  \",[26,\"if\",[[22,[\"hideFilter\"]],\"no-filter\"],null]]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Creative Missions\"],[9],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\" Total: \"],[1,[22,[\"model\",\"missions\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n          \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"search (id, client email, location, company, rep)\",\"form-control\"]]],false],[0,\"\\n\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"status\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Status\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"created_on\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Uploaded\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"package.name\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Package\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"pilot.email\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Pilot Email\"]]],false],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Accepted\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Rejection Notes\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Review\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedMissions\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"package\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"pilot\",\"email\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"location\",\"city\"]],false],[0,\",\"],[1,[21,1,[\"location\",\"state\"]],false],[0,\",\\n                \"],[1,[21,1,[\"location\",\"country\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"accepted\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"rejection_notes\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"missions.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"                  Review/Edit\"]],\"parameters\":[]},null],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\",\"missions\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/creative-missions.hbs" } });
});
define("admin/templates/missions/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "I8ZwQ2mI", "block": "{\"symbols\":[\"activity\",\"image\",\"call_action\",\"flights\",\"authorization\",\"laanc\",\"laanc\",\"payout\",\"ticket\",\"ticket\",\"subscriber\"],\"statements\":[[4,\"if\",[[22,[\"pageReady\"]]],null,{\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"breadcrumb \",[26,\"if\",[[22,[\"model\",\"mission\",\"pusher_updated_at\"]],\"need-refresh\"],null]]]],[8],[0,\"\\n  \"],[4,\"link-to\",[\"missions\"],null,{\"statements\":[[1,[20,\"parentCrumb\"],false],[0,\" Mission\"]],\"parameters\":[]},null],[0,\" / \"],[4,\"link-to\",[\"missions.edit\",[22,[\"model\",\"mission\",\"id\"]]],null,{\"statements\":[[1,[22,[\"model\",\"mission\",\"id\"]],false]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"pull-right viewers\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"mission\",\"pusherSubscribers\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[11,\"class\",[27,[\"pull-right admin-viewing \",[26,\"if\",[[26,\"is-equal\",[[26,\"initialize\",[[21,11,[]]],null],[26,\"initialize\",[[22,[\"model\",\"currentAdminName\"]]],null]],null],\"current\"],null]]]],[8],[0,\"\\n\"],[4,\"if\",[[26,\"check-if\",[[26,\"initialize\",[[21,11,[]]],null],\"!=\",[26,\"initialize\",[[22,[\"model\",\"currentAdminName\"]]],null]],null]],null,{\"statements\":[],\"parameters\":[]},null],[0,\"        \"],[6,\"span\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[11,\"title\",[21,11,[]]],[8],[1,[26,\"initialize\",[[21,11,[]]],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[11]},null],[0,\"  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"pusher_updated_at\"]]],null,{\"statements\":[[0,\"    \"],[6,\"p\"],[10,\"class\",\"pull-right\"],[8],[0,\"Last updated: \"],[1,[26,\"moment-format\",[[22,[\"model\",\"mission\",\"pusher_updated_at\"]],\"hh:mma MM/DD/YY\"],null],false],[0,\". You will need to \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"reload\",[22,[\"model\",\"mission\"]]]],[8],[0,\"refresh\"],[9],[0,\" to see changes.\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"p\"],[10,\"class\",\"pull-right\"],[8],[0,\"Last updated: \"],[1,[26,\"moment-format\",[[22,[\"model\",\"mission\",\"updated_at\"]],\"hh:mma MM/DD/YY\"],null],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n  \"],[6,\"h4\"],[8],[1,[20,\"parentCrumb\"],false],[0,\" Mission\"],[9],[0,\"\\n  \"],[6,\"h4\"],[10,\"class\",\"mission-id\"],[8],[1,[22,[\"model\",\"mission\",\"id\"]],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"reference_id\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"mission-reference-id\"],[8],[0,\"\\n      Reference ID: \"],[1,[22,[\"model\",\"mission\",\"reference_id\"]],false],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-xs-6\"],[8],[0,\"\\n  \"],[1,[26,\"client-details-view\",null,[[\"client\",\"missionNumber\"],[[22,[\"model\",\"client\"]],[22,[\"model\",\"mission\",\"id\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"reshootModalVisible\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"reshoot-modal\",null,[[\"model\",\"close\",\"action\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"toggleReshootModal\"],null],\"reshoot\"]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"holdMissionModalVisible\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"holdMission-modal\",null,[[\"model\",\"close\",\"action\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"toggleHoldMissionModal\"],null],\"hold\"]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"capacityModalVisible\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"capacity-modal\",null,[[\"model\",\"close\",\"confirmAction\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"toggleCapacityModal\"],null],\"saveSchedule\"]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"ratingModalVisible\"]]],null,{\"statements\":[[0,\"  \"],[1,[26,\"rating-modal\",null,[[\"model\",\"close\",\"action\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"toggleRatingModal\"],null],\"rate\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-tabs\"],[8],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"edit\"],null],\"active\"],null]],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"edit\"]],[8],[0,\"Edit Mission\"],[9],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"activityLogs\"],null],\"active\"],null]],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"activityLogs\"]],[8],[0,\"Activity Log\"],[9],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"edit\"],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n\"],[0,\"      \"],[6,\"button\"],[10,\"class\",\"btn btn-primary btn-sm\"],[3,\"action\",[[21,0,[]],\"save\",[22,[\"model\"]]]],[8],[0,\"\\n        save\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n        \"],[6,\"button\"],[10,\"class\",\"btn btn-secondary btn-sm dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n          \"],[6,\"span\"],[8],[0,\"ACTIONS\"],[9],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n\"],[4,\"unless\",[[22,[\"model\",\"mission\",\"hasReshoot\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"toggleReshootModal\"]],[8],[0,\"Reshoot\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"model\",\"mission\",\"isOnHold\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"resume\",[22,[\"model\",\"mission\"]]]],[8],[0,\"Resume\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"toggleHoldMissionModal\"]],[8],[0,\"Hold\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"          \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"cancel\",[22,[\"model\",\"mission\"]]]],[8],[0,\"Cancel\"],[9],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"check-if\",[[22,[\"model\",\"mission\",\"zendesk_tickets\",\"length\"]],\">\",1],null]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"btn-group zendesk-tickets\"],[8],[0,\"\\n          \"],[6,\"button\"],[10,\"class\",\"btn btn-info btn-sm dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n            \"],[6,\"span\"],[8],[0,\"ZENDESK TICKETS\"],[9],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"mission\",\"zendesk_tickets\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[8],[0,\"\\n                \"],[6,\"a\"],[11,\"href\",[27,[[21,10,[\"url\"]]]]],[8],[0,\"\\n                  \"],[1,[26,\"titleize\",[[21,10,[\"user_type\"]]],null],false],[0,\" #\"],[1,[21,10,[\"id\"]],false],[0,\"\\n                \"],[9],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[10]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"each\",[[22,[\"model\",\"mission\",\"zendesk_tickets\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[11,\"href\",[27,[[21,9,[\"url\"]]]]],[10,\"class\",\"btn btn-sm btn-info\"],[8],[0,\"\\n            ZENDESK TICKET (\"],[1,[21,9,[\"user_type\"]],false],[0,\") #\"],[1,[21,9,[\"id\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[9]},null]],\"parameters\":[]}],[0,\"      \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n        \"],[4,\"link-to\",[\"missions.map\",[22,[\"model\",\"mission\",\"id\"]]],null,{\"statements\":[[0,\"Edit Map\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"isShareable\"]]],null,{\"statements\":[[0,\"          | \"],[1,[26,\"asset-share\",null,[[\"shareable\",\"shareCreateAction\",\"linkText\"],[[22,[\"mission\"]],\"shareShareable\",\"Share All\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"isOnHold\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"on-hold-section\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9 header\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"This mission is ON HOLD\"],[9],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"pull-right\"],[8],[1,[26,\"moment-format\",[[22,[\"model\",\"mission\",\"hold\",\"created_at\"]],\"MM/DD/YY hh:mm A\"],null],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Reason:\"],[9],[0,\"\\n          \"],[6,\"span\"],[8],[1,[22,[\"model\",\"mission\",\"hold\",\"reason\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Details:\"],[9],[0,\"\\n          \"],[6,\"span\"],[8],[1,[22,[\"model\",\"mission\",\"hold\",\"reason_notes\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Admin:\"],[9],[0,\"\\n          \"],[6,\"span\"],[8],[1,[22,[\"model\",\"mission\",\"hold\",\"held_by\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9 resume-link underline-text\"],[8],[0,\"\\n          \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"resume\",[22,[\"model\",\"mission\"]]]],[8],[0,\"Resume Mission\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"clearfix\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Status\"],[9],[0,\"\\n    \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"save\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"optionValuePath\",\"optionLabelPath\",\"content\",\"selection\",\"assignSelectedObject\",\"disabled\",\"action\"],[\"value\",\"display_name\",[22,[\"statusesForSelect\"]],[22,[\"selectedStatus\"]],false,[22,[\"model\",\"mission\",\"isOnHold\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"status\"]]],null]],null]]]],false],[0,\"\\n        \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"isOnHold\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col-xs-3 disabled\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"disabled\",\"disabled\"],[10,\"title\",\"This mission is on hold. It must be resumed before you can take this action.\"],[8],[0,\"\\n            \"],[1,[26,\"mission-status-rewind-button\",null,[[\"model\",\"tagName\",\"class\"],[[22,[\"model\",\"mission\"]],\"a\",\"btn\"]]],false],[0,\"\\n            \"],[1,[26,\"mission-status-update-button\",null,[[\"model\",\"tagName\",\"class\"],[[22,[\"model\",\"mission\"]],\"a\",\"btn\"]]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col-xs-3 no-padding\"],[8],[0,\"\\n            \"],[1,[26,\"mission-status-rewind-button\",null,[[\"model\",\"tagName\",\"class\"],[[22,[\"model\",\"mission\"]],\"a\",\"btn\"]]],false],[0,\"\\n            \"],[1,[26,\"mission-status-update-button\",null,[[\"model\",\"tagName\",\"class\"],[[22,[\"model\",\"mission\"]],\"a\",\"btn\"]]],false],[0,\"\\n            \"],[1,[20,\"statusSubText\"],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[4,\"if\",[[22,[\"model\",\"mission\",\"hasReshoot\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n            \"],[1,[26,\"reshoot-edit-box\",null,[[\"mission\",\"displayedMission\",\"isReshoot\"],[[22,[\"model\",\"mission\"]],[22,[\"model\",\"mission\"]],false]]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"model\",\"mission\",\"isReshoot\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n            \"],[1,[26,\"reshoot-edit-box\",null,[[\"mission\",\"displayedMission\",\"isReshoot\",\"showInvitePilotLink\"],[[22,[\"model\",\"mission\"]],[22,[\"model\",\"mission\",\"parent\"]],true,[22,[\"showInvitePilotLink\"]]]]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Pilot\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"pilot\"]]],null,{\"statements\":[[0,\"              \"],[6,\"input\"],[10,\"name\",\"name\"],[11,\"value\",[27,[[22,[\"model\",\"mission\",\"pilot\",\"fullName\"]]]]],[10,\"disabled\",\"disabled\"],[10,\"class\",\"form-control input-lg\"],[10,\"type\",\"text\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"input\"],[10,\"name\",\"name\"],[10,\"value\",\"Pilot Has Not Accepted\"],[10,\"disabled\",\"disabled\"],[10,\"class\",\"form-control input-lg\"],[10,\"type\",\"text\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[11,\"class\",[27,[\"col-xs-3 \",[26,\"if\",[[26,\"either\",[[22,[\"model\",\"mission\",\"isOnHold\"]],[22,[\"model\",\"mission\",\"needsEstimatedPayout\"]]],null],\"disabled\"],null]]]],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showInvitePilotLink\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"model\",\"mission\",\"isOnHold\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"This mission is on hold. It must be resumed before you can take this action.\"],[8],[0,\"\\n                \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"mission\",\"pilot\"]],\"fa-edit\",\"fa-plus\"],null]]]],[8],[9],[0,\"\\n                invite\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[22,[\"model\",\"mission\",\"needsEstimatedPayout\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[10,\"data-toggle\",\"tooltip\"],[10,\"data-placement\",\"top\"],[10,\"title\",\"This mission has not had the estimated pilot payout set. You must set this before inviting a pilot.\"],[8],[0,\"\\n                \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"mission\",\"pilot\"]],\"fa-edit\",\"fa-plus\"],null]]]],[8],[9],[0,\"\\n                invite\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"openModal\",\"pilots.modal\",[22,[\"model\"]]]],[8],[0,\"\\n                \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"mission\",\"pilot\"]],\"fa-edit\",\"fa-plus\"],null]]]],[8],[9],[0,\"\\n                invite\\n              \"],[9],[0,\"\\n            \"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]},null],[4,\"if\",[[22,[\"model\",\"mission\",\"pilot_invitations_dispatch\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"invitationDispatchInProgress\"]]],null,{\"statements\":[[0,\"              \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"cancelAutoDispatch\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n                Cancel Auto-Dispatch\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[6,\"p\"],[10,\"class\",\"dispatch-info\"],[8],[1,[22,[\"model\",\"mission\",\"pilot_invitations_dispatch\",\"status\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[1,[26,\"pilot-dispatch\",null,[[\"model\",\"drones\",\"invitationDispatchInProgress\"],[[22,[\"model\",\"mission\"]],[22,[\"model\",\"drones\"]],[22,[\"invitationDispatchInProgress\"]]]]],false],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-4\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Estimated Pilot Payout\"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"mission\",\"estimated_pilot_payout\"]],\"Estimated Pilot Payout\",[22,[\"model\",\"mission\",\"errors\",\"estimated_pilot_payout\"]]]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-5\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Estimated Editor Payout\"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"mission\",\"estimated_editor_payout\"]],\"Estimated Editor Payout\",[22,[\"model\",\"mission\",\"errors\",\"estimated_editor_payout\"]]]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-1\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"payoutPilot\"]]]]],false],[0,\" \"],[6,\"small\"],[8],[0,\"Pilot?\"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n          \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\"],[[22,[\"model\",\"payout\",\"amount\"]],\"Amount\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-5\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"payout\",\"notes\"]],\"Notes\",\"form-control input-lg\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"createPayout\",[22,[\"model\"]]]],[8],[0,\"\\n            \"],[6,\"i\"],[10,\"class\",\"fa fa-plus\"],[8],[9],[0,\" Payout\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"table\"],[10,\"class\",\"table table-borderless\"],[8],[0,\"\\n            \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"missionPayoutsReverse\"]]],null,{\"statements\":[[0,\"                \"],[6,\"tr\"],[8],[0,\"\\n                  \"],[6,\"td\"],[8],[0,\"\\n                    \"],[1,[21,8,[\"id\"]],false],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"td\"],[8],[0,\"\\n                    \"],[1,[21,8,[\"notes\"]],false],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"td\"],[8],[0,\"\\n                    \"],[6,\"strong\"],[8],[0,\"$\"],[1,[21,8,[\"amountInDollars\"]],false],[9],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"text-right\"],[8],[0,\"\\n                    \"],[1,[26,\"moment-format\",[[21,8,[\"created_on\"]]],null],false],[0,\"\\n                  \"],[9],[0,\"\\n                  \"],[6,\"td\"],[8],[0,\"\\n                    \"],[6,\"i\"],[10,\"class\",\"fa fa-times\"],[3,\"action\",[[21,0,[]],\"deletePayout\",[21,8,[]]]],[8],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[8]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Mission Price\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[1,[26,\"input-validated-dollars\",null,[[\"value\",\"placeholder\"],[[22,[\"model\",\"mission\",\"price\"]],\"Mission Price\"]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Package\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"mission\",\"errors\",\"package\"]]]]],false],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\"],[[22,[\"model\",\"packagesForSelect\"]],[22,[\"model\",\"mission\",\"package\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"package\"]]],null]],null],\"Select Package\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"newPackage\",[22,[\"model\"]]]],[8],[0,\"\\n            \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"package\",\"isNew\"]],\"fa-plus\",\"fa-edit\"],null]]]],[8],[9],[0,\" custom\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"mission\",\"errors\",\"location\"]]]]],false],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[1,[26,\"textarea\",null,[[\"value\",\"class\",\"disabled\"],[[22,[\"model\",\"mission\",\"location\",\"formatted_address\"]],\"form-control input-lg mission-edit-location-textarea\",true]]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n          \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"openModal\",\"clients.client.locations.modal\",[22,[\"model\"]]]],[8],[0,\"\\n            \"],[6,\"i\"],[10,\"class\",\"fa fa-edit\"],[8],[9],[0,\" location\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Airspace\"],[9],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"btn btn-secondary btn-sm pull-right\"],[10,\"title\",\"Check Now\"],[3,\"action\",[[21,0,[]],\"checkAirspace\",[22,[\"model\",\"mission\"]]]],[8],[0,\"\\n              Check Now\\n            \"],[9],[0,\"\\n          \"],[6,\"table\"],[10,\"class\",\"table airspace-info\"],[8],[0,\"\\n            \"],[6,\"thead\"],[8],[0,\"\\n              \"],[6,\"tr\"],[8],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"laanc\"],[8],[0,\"LAANC\"],[9],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[0,\"Facility / Description\"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"tbody\"],[8],[0,\"\\n              \"],[6,\"tr\"],[8],[0,\"\\n                \"],[6,\"td\"],[8],[0,\" \"],[9],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[6,\"a\"],[11,\"href\",[27,[\"https://app.airmap.io/geo?\",[22,[\"model\",\"mission\",\"location\",\"latitude\"]],\",\",[22,[\"model\",\"mission\",\"location\",\"longitude\"]],\",12.500000z\"]]],[10,\"target\",\"_blank\"],[8],[0,\"Airmap Link\"],[9],[9],[0,\"\\n              \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"mission\",\"advisories\"]]],null,{\"statements\":[[0,\"                \"],[6,\"tr\"],[8],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"laanc\"],[8],[0,\"\\n                    \"],[4,\"if\",[[21,7,[\"laanc_enabled\"]]],null,{\"statements\":[[0,\" Manual \"]],\"parameters\":[]},{\"statements\":[[0,\" No \"]],\"parameters\":[]}],[0,\"\\n\\n                  \"],[9],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[1,[21,7,[\"name\"]],false],[0,\" (\"],[1,[21,7,[\"code\"]],false],[0,\")\"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[7]},null],[4,\"each\",[[22,[\"model\",\"mission\",\"laanc_exemptions\"]]],null,{\"statements\":[[0,\"                \"],[6,\"tr\"],[8],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"laanc\"],[8],[0,\"Automatic\"],[9],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[1,[21,6,[\"name\"]],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Authorizations\"],[9],[0,\"\\n\\n          \"],[6,\"table\"],[10,\"class\",\"table airspace-info\"],[8],[0,\"\\n            \"],[6,\"thead\"],[8],[0,\"\\n              \"],[6,\"tr\"],[8],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"laanc\"],[8],[0,\"Authority\"],[9],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"type\"],[8],[0,\"Name\"],[9],[0,\"\\n                \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[0,\"Message\"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"mission\",\"laanc_flights\"]]],null,{\"statements\":[[4,\"each\",[[21,4,[\"authorizations\"]]],null,{\"statements\":[[0,\"                \"],[6,\"tr\"],[8],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"laanc\"],[8],[1,[21,5,[\"authority_id\"]],false],[9],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"type\"],[8],[1,[21,5,[\"authority_name\"]],false],[9],[0,\"\\n                  \"],[6,\"td\"],[10,\"class\",\"description\"],[8],[1,[21,5,[\"message\"]],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[5]},null]],\"parameters\":[4]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[1,[26,\"mission-schedule\",null,[[\"model\",\"rescheduleFlightModal\",\"showCapacityModal\",\"reloadMission\",\"pilotNotAssigned\",\"saveAction\"],[[22,[\"model\"]],\"toggleRescheduleModal\",\"toggleCapacityModal\",\"reloadMission\",[22,[\"pilotNotAssigned\"]],\"saveSchedule\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"mission-weather\",null,[[\"mission\"],[[22,[\"model\",\"mission\"]]]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Account Rep\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"accountReps\"]],[22,[\"model\",\"mission\",\"accountRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"accountRep\"]]],null]],null],\"Select Account Rep\",\"fullName\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Production Rep\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"productionReps\"]],[22,[\"model\",\"mission\",\"productionRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"productionRep\"]]],null]],null],\"Select Production Rep\",\"fullName\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Operations Rep\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n          \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"operationReps\"]],[22,[\"model\",\"mission\",\"operationRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"operationRep\"]]],null]],null],\"Select Operation Rep\",\"fullName\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[10,\"for\",\"salesforce_opportunity_id\"],[8],[0,\"Salesforce Opportunity ID\"],[9],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"name\",\"value\",\"class\"],[\"salesforce_opportunity_id\",[22,[\"model\",\"mission\",\"salesforce_opportunity_id\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[10,\"for\",\"external_assets_url\"],[8],[0,\"External Asset Url (box, dropbox, etc..)\\n        \"],[9],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"name\",\"value\",\"class\"],[\"external_assets_url\",[22,[\"model\",\"mission\",\"external_assets_url\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[10,\"for\",\"Internal Notes\"],[8],[0,\"\\n          Client Notes (Visible in Client Dashboard and via Partner API)\\n        \"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"model\",\"mission\",\"client_notes\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[10,\"for\",\"Internal Notes\"],[8],[0,\"Internal Notes\"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"model\",\"mission\",\"internal_notes\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[10,\"for\",\"Internal Production Notes\"],[8],[0,\"\\n          Internal Production Notes\\n        \"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"model\",\"mission\",\"internal_production_notes\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"showOnsiteContacts\"]]],null,{\"statements\":[[0,\"        \"],[6,\"span\"],[10,\"class\",\"header-text\"],[8],[0,\"Onsite Contact Info\"],[9],[0,\"\\n\\n        \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Call Action\"],[9],[0,\"\\n          \"],[6,\"select\"],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"updateCallAction\"],[[\"value\"],[\"target.value\"]]]],[10,\"class\",\"form-control input-lg\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"call_actions\"]]],null,{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[21,3,[\"id\"]],[22,[\"model\",\"mission\",\"onsite_contact\",\"call_action\"]]],null]],null,{\"statements\":[[0,\"                \"],[6,\"option\"],[11,\"value\",[21,3,[\"id\"]]],[10,\"selected\",\"\"],[8],[0,\"\\n                  \"],[1,[21,3,[\"name\"]],false],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"option\"],[11,\"value\",[21,3,[\"id\"]]],[8],[0,\"\\n                  \"],[1,[21,3,[\"name\"]],false],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[3]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"showContactNameAndPhone\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Contact Name\"],[9],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"name\",\"value\",\"class\"],[\"onsite_contact_name\",[22,[\"model\",\"mission\",\"onsite_contact\",\"name\"]],\"form-control input-lg\"]]],false],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n            \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Contact Phone\"],[9],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"name\",\"value\",\"class\"],[\"onsite_contact_phone\",[22,[\"mission\",\"onsite_contact\",\"phone\"]],\"form-control input-lg\"]]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n          \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Contact Notes\"],[9],[0,\"\\n          \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"model\",\"mission\",\"onsite_contact\",\"note\"]],\"form-control input-lg\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"search-field\"],[8],[0,\"Pilot Instructions\"],[9],[0,\"\\n        \"],[1,[26,\"textarea\",null,[[\"value\",\"class\"],[[22,[\"model\",\"mission\",\"instructions\"]],\"form-control input-lg\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"checkbox\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"input-lg\"],[8],[0,\"\\n          \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"model\",\"mission\",\"disable_notifications\"]]]]],false],[0,\"\\n            Disable Notifications\\n            \"],[6,\"small\"],[8],[0,\"\\n              (Slack and email notifications for admin, client, and pilot.)\\n            \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"Save\",\"btn btn-primary\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"show3pfa\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"mission-flight-app\",null,[[\"mission\",\"flightApps\",\"model\"],[[22,[\"model\",\"mission\"]],[22,[\"model\",\"flightApps\"]],[22,[\"model\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[1,[26,\"collaborator-list\",null,[[\"mission\"],[[22,[\"mission\"]]]]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"rescheduleModalVisible\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"reschedule-modal\",null,[[\"model\",\"close\",\"reloadMission\",\"action\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"toggleRescheduleModal\"],null],\"reloadMission\",\"reschedule\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n    \"],[1,[26,\"creative-mission-meta-form\",null,[[\"model\",\"updateCreativeMissionMetaAction\"],[[22,[\"model\"]],\"updateCreativeMissionMeta\"]]],false],[0,\"\\n    \"],[1,[26,\"creative-mission-response\",null,[[\"model\"],[[22,[\"model\",\"mission\"]]]]],false],[0,\"\\n    \"],[1,[26,\"mission-shotlist-assets\",null,[[\"model\",\"filterByShot\",\"onfileadd\",\"onstartupload\",\"shareCreateAction\"],[[22,[\"model\"]],\"filterMap\",\"addAsset\",\"startUpload\",\"shareShareable\"]]],false],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"assetsClassified\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"row panel rating-panel\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]]],null,{\"statements\":[[0,\"          \"],[6,\"p\"],[8],[0,\"The mission was rated\"],[9],[0,\"\\n\"],[4,\"each\",[[26,\"rating-stars\",[[22,[\"model\",\"mission\",\"pilot_rating\",\"value\"]]],null]],null,{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"class\",\"small-star\"],[11,\"src\",[27,[\"/assets/images/pilot_rating/\",[21,2,[]]]]],[8],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[6,\"a\"],[10,\"href\",\"\"],[10,\"class\",\"btn-primary btn-sm pull-right\"],[3,\"action\",[[21,0,[]],\"toggleRatingModal\"]],[8],[0,\"EDIT\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"p\"],[8],[0,\"Please rate pilot for this mission.\"],[9],[0,\"\\n          \"],[6,\"a\"],[10,\"href\",\"\"],[10,\"class\",\"btn-primary btn-sm pull-right\"],[3,\"action\",[[21,0,[]],\"toggleRatingModal\"]],[8],[0,\"RATE NOW\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[10,\"class\",\"pilot-comments\"],[8],[0,\"\\n      Pilot comments for this mission: \"],[1,[22,[\"model\",\"mission\",\"pilot_comment\"]],false],[0,\"\\n    \"],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n    \"],[6,\"div\"],[8],[0,\"Image Mapping:\"],[9],[0,\"\\n    \"],[1,[26,\"mission-asset-map\",null,[[\"mission\",\"mapImageMarkers\"],[[22,[\"model\",\"mission\"]],[22,[\"model\",\"filteredMapImages\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"activityLogs\"],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"activity-logs table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Date/Time\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Action\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"User\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Role\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Details\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"mission\",\"activity_logs\"]]],null,{\"statements\":[[0,\"            \"],[6,\"tr\"],[8],[0,\"\\n              \"],[6,\"td\"],[8],[0,\"\\n                \"],[1,[26,\"moment-format\",[[21,1,[\"created_at\"]],\"MM/DD/YY, h:mm A\"],null],false],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"td\"],[8],[0,\"\\n                \"],[1,[26,\"titleize\",[[21,1,[\"action\"]]],null],false],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"td\"],[8],[0,\"\\n                \"],[1,[21,1,[\"user_name\"]],false],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"td\"],[8],[0,\"\\n                \"],[1,[21,1,[\"role\"]],false],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"td\"],[8],[0,\"\\n                \"],[1,[21,1,[\"details\"]],false],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"td\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/edit.hbs" } });
});
define("admin/templates/missions/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U0XF4CgQ", "block": "{\"symbols\":[\"mission\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"hideFilter\"]]],null,{\"statements\":[[0,\"    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/Filter_Icon.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[26,\"filter-missions\",null,[[\"model\",\"status\",\"latitude\",\"longitude\",\"distance\",\"assets_late\",\"reshoot\",\"on_hold\",\"include_client_ids\",\"exclude_client_ids\",\"hideFilter\",\"clientMissions\",\"overFlowScroll\"],[[22,[\"model\",\"missions\"]],[22,[\"status\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"distance\"]],[22,[\"assets_late\"]],[22,[\"reshoot\"]],[22,[\"on_hold\"]],[22,[\"include_client_ids\"]],[22,[\"exclude_client_ids\"]],[22,[\"hideFilter\"]],true,true]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"div\"],[11,\"class\",[27,[\"missions-list \",[26,\"if\",[[22,[\"hideFilter\"]],\"no-filter\"],null]]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Client Missions\"],[9],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"missions\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n          \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"search (id, client email, location, company, rep)\",\"form-control\"]]],false],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"switch-with-label\"],[8],[0,\"\\n        Map View\\n        \"],[6,\"label\"],[10,\"class\",\"switch\"],[8],[0,\"\\n           \"],[1,[26,\"input\",null,[[\"type\",\"checked\",\"onchange\"],[\"checkbox\",[22,[\"showMap\"]],[22,[\"toggleShowMap\"]]]]],false],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"slider round\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"showMap\"]]],null,{\"statements\":[[0,\"      \"],[1,[26,\"mapbox-map\",null,[[\"missions\"],[[22,[\"model\",\"missions\"]]]]],false],[0,\"\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Rep\"],[9],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"status\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Status\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"created\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Created\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"scheduled\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Scheduled\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"price\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Price\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"package_name\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Package\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"client_email\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Client Email\"]]],false],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Company\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Ref. ID\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"missions\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[0,\"\\n\"],[4,\"if\",[[21,1,[\"isOnHold\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"on-hold-warning\"],[8],[0,\"\\n                  \"],[6,\"i\"],[10,\"class\",\"fa fa-warning\"],[8],[9],[0,\"\\n                  \"],[6,\"span\"],[8],[0,\"On Hold\"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"accountRep\",\"initials\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"                \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_start\"]],\"MM/DD/YY\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\"\\n                \"],[6,\"br\"],[8],[9],[0,\"\\n                \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_start\"]],\"h:mm a\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\" -\\n                \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_end\"]],\"h:mm a\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"format-dollar\",[[21,1,[\"price\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"package\",\"fullName\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"client\",\"email\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"client\",\"company_name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"location\",\"formatted_address\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"reference_id\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"missions.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"                Edit / Upload\\n\"]],\"parameters\":[]},null],[0,\"               |\\n\"],[4,\"link-to\",[\"missions.map\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"                Map\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\",\"missions\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/index.hbs" } });
});
define("admin/templates/missions/map", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EsJV4bYG", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"id\",\"mission_map_plan\"],[10,\"class\",\"row google-map-height-adjust\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-12 google-map-height-adjust\"],[8],[0,\"\\n    \"],[1,[26,\"mission-plan-map\",null,[[\"model\",\"action\"],[[22,[\"model\"]],\"update\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/map.hbs" } });
});
define("admin/templates/missions/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "m1y9tWSc", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"client-details col-md-6 col-md-offset-3\"],[8],[0,\"\\n  \"],[1,[26,\"client-details-view\",null,[[\"client\"],[[22,[\"model\",\"client\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-tabs\"],[8],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"newMission\"],null],\"active\"],null]],[8],[0,\"\\n      \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"newMission\"]],[8],[0,\"New Mission\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"importMissions\"],null],\"active\"],null]],[8],[0,\"\\n      \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"importMissions\"]],[8],[0,\"Import Mission CSV\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"newMission\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-6 col-md-offset-3 top-buffer bottom-buffer\"],[8],[0,\"\\n  \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"save\",[22,[\"model\"]]],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"mission\",\"errors\",\"package\"]]]]],false],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\"],[[22,[\"model\",\"packagesForSelect\"]],[22,[\"model\",\"mission\",\"package\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"package\"]]],null]],null],\"Select Package\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"newPackage\",[22,[\"model\"]]]],[8],[0,\"\\n          \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"package\",\"isNew\"]],\"fa-plus\",\"fa-edit\"],null]]]],[8],[9],[0,\"\\n          custom\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[1,[26,\"errors-for\",null,[[\"errors\"],[[22,[\"model\",\"mission\",\"errors\",\"location\"]]]]],false],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"locationsForSelect\"]],[22,[\"model\",\"mission\",\"location\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"location\"]]],null]],null],\"Select Location\",\"formatted_address\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"openModal\",\"clients.client.locations.modal\",[22,[\"model\"]]]],[8],[6,\"i\"],[10,\"class\",\"fa fa-plus\"],[8],[9],[0,\" location\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row form-group\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"model\",\"mission\",\"reference_id\"]],\"Reference ID\",\"form-control input-lg m-b\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\"],[[22,[\"model\",\"accountReps\"]],[22,[\"model\",\"mission\",\"accountRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"accountRep\"]]],null]],null],\"Select Account Rep\",\"fullName\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"checkbox\"],[8],[0,\"\\n      \"],[6,\"label\"],[10,\"class\",\"input-lg\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"model\",\"mission\",\"disable_notifications\"]]]]],false],[0,\"\\n          Disable Notifications\\n          \"],[6,\"small\"],[8],[0,\"(Slack and email notifications for admin, client, and pilot.)\\n          \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"Create\",\"btn btn-success btn-lg\"]]],false],[0,\"\\n      | \"],[6,\"a\"],[11,\"href\",[27,[\"/clients/\",[22,[\"model\",\"client\",\"id\"]]]]],[8],[0,\"Cancel\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"importMissions\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-6 col-md-offset-3 top-buffer bottom-buffer\"],[8],[0,\"\\n\\n  \"],[6,\"h3\"],[8],[1,[20,\"formTitle\"],false],[9],[0,\"\\n\\n  \"],[6,\"form\"],[10,\"class\",\"form\"],[10,\"id\",\"import-csv-form\"],[10,\"enctype\",\"multipart/form-data\"],[3,\"action\",[[21,0,[]],\"uploadCsv\"],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n    \"],[6,\"input\"],[11,\"value\",[22,[\"model\",\"client\",\"id\"]]],[10,\"name\",\"client_id\"],[10,\"type\",\"hidden\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"model\",\"client\",\"id\"]],[22,[\"testUserId\"]]],null]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-lg-9 top-buffer bottom-buffer\"],[8],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"radio-inline\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"csv_type\"],[10,\"value\",\"standard\"],[11,\"checked\",[26,\"is-checked\",[[22,[\"importMode\"]],\"standard\"],null]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setMode\",\"standard\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\" Standard Mission\\n        \"],[9],[0,\"\\n        \"],[6,\"label\"],[10,\"class\",\"radio-inline\"],[8],[0,\"\\n          \"],[6,\"input\"],[10,\"name\",\"csv_type\"],[10,\"value\",\"training\"],[11,\"checked\",[26,\"is-checked\",[[22,[\"importMode\"]],\"training\"],null]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"setMode\",\"training\"],null]],[10,\"type\",\"radio\"],[8],[9],[0,\" Training Mission\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"importMode\"]],\"training\"],null]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"id\",\"training-mission-instructions\"],[10,\"class\",\"mission-instructions\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"warning\"],[8],[0,\"\\n            \"],[6,\"p\"],[8],[6,\"strong\"],[8],[0,\"NOTE: THIS IS A TRAINING MISSION\"],[9],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"The pilot will be notified as soon as it is created and it\\n                will not have a scheduled date so the pilot will have to schedule\\n                the mission to accept it.\"],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"Make sure the pilot instructions for the selected package tells\\n                the pilot that this is a training mission to\\n            qualify for Client work with Guaranteed Payout\"],[9],[0,\"\\n            \"],[6,\"p\"],[8],[0,\"The pilot also should be informed that they need to fly the\\n                mission on their own home, or a property in a safe location to\\n                fly.\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"id\",\"csv-package-error\"],[10,\"class\",\"col-xs-9 error hidden\"],[8],[0,\"\\n        This field is required.\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"selectName\"],[[22,[\"model\",\"packagesForSelect\"]],[22,[\"model\",\"mission\",\"package\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"package\"]]],null]],null],\"Select Package\",\"mission_package_id\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-3\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"class\",\"btn btn-lg\"],[3,\"action\",[[21,0,[]],\"newPackage\",[22,[\"model\"]]]],[8],[0,\"\\n          \"],[6,\"i\"],[11,\"class\",[27,[\"fa \",[26,\"if\",[[22,[\"model\",\"package\",\"isNew\"]],\"fa-plus\",\"fa-edit\"],null]]]],[8],[9],[0,\"\\n          custom\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"importMode\"]],\"standard\"],null]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"id\",\"csv-rep-error\"],[10,\"class\",\"col-xs-9 error hidden\"],[8],[0,\"\\n        This field is required.\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"select-custom\",null,[[\"content\",\"selection\",\"action\",\"prompt\",\"optionLabelPath\",\"selectName\"],[[22,[\"model\",\"accountReps\"]],[22,[\"model\",\"mission\",\"accountRep\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"model\",\"mission\",\"accountRep\"]]],null]],null],\"Select Account Rep\",\"fullName\",\"account_rep_id\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row mission-csv-uploader\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[6,\"h5\"],[8],[0,\"Select location of CSV file\"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"id\",\"csv-file-error\"],[10,\"class\",\"col-xs-9 error hidden\"],[8],[0,\"\\n        This field is required.\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"name\"],[\"file\",\"attachment\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row mission-csv-specs\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-xs-9\"],[8],[0,\"\\n        \"],[6,\"p\"],[8],[0,\"A csv file with the following columns:\"],[9],[0,\"\\n        \"],[6,\"ul\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"importMode\"]],\"training\"],null]],null,{\"statements\":[[0,\"          \"],[6,\"li\"],[8],[6,\"code\"],[8],[0,\"pilot_email\"],[9],[6,\"br\"],[8],[9],[0,\"\\n          This MUST match up with the email that the pilot signed up for\\n              DroneBase with\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"li\"],[8],[0,\" \"],[6,\"strong\"],[8],[0,\"Required Fields: \"],[9],[0,\"Each row must contain either of the following columns\\n            \"],[6,\"ul\"],[8],[0,\"\\n              \"],[6,\"li\"],[8],[6,\"code\"],[8],[0,\"address\"],[9],[0,\" and \"],[6,\"code\"],[8],[0,\"postal_code\"],[9],[9],[0,\"\\n              \"],[6,\"li\"],[8],[0,\" and/or \"],[6,\"code\"],[8],[0,\"latitude\"],[9],[0,\" and \"],[6,\"code\"],[8],[0,\"longitude\"],[9],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"strong\"],[8],[0,\"WARNING:\"],[9],[0,\" It's possible for postal code to be auto-formatted as a number in Excel, which could cause leading zeroes to be omitted. Make sure it is formatted as text before exporting.\\n          \"],[9],[0,\"\\n          \"],[6,\"li\"],[8],[6,\"strong\"],[8],[0,\"Optional:\"],[9],[0,\"\\n            \"],[6,\"code\"],[8],[0,\"address2, city, state, country, external_id, pilot_instructions, internal_notes, internal_production_notes, client_notes, reference_id\"],[9],[0,\"\\n          \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\\n    \"],[6,\"div\"],[10,\"class\",\"checkbox\"],[8],[0,\"\\n      \"],[6,\"label\"],[10,\"class\",\"input-lg\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"skip_airspace_check\",[22,[\"skipAirspaceCheck\"]]]]],false],[0,\" Disable airspace check\\n        \"],[6,\"small\"],[8],[0,\"\\n          (use with caution)\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"checkbox\"],[8],[0,\"\\n      \"],[6,\"label\"],[10,\"class\",\"input-lg\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"name\",\"checked\"],[\"checkbox\",\"disable_notifications\",[22,[\"disableNotifications\"]]]]],false],[0,\" Disable Notifications\\n        \"],[6,\"small\"],[8],[0,\"\\n          (Slack and email notifications for admin, client, and pilot.)\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"Create\",\"btn btn-success btn-lg\"]]],false],[0,\"\\n      | \"],[6,\"a\"],[11,\"href\",[27,[\"/clients/\",[22,[\"model\",\"client\",\"id\"]]]]],[8],[0,\"Cancel\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/new.hbs" } });
});
define("admin/templates/missions/pending-panos", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9vy2XtsP", "block": "{\"symbols\":[\"mission\",\"pano\"],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Missions\"],[9],[0,\"\\n  \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n      \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"search (id, client email, location, company, rep)\",\"form-control\"]]],false],[0,\"\\n\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[1,[26,\"mission-status-filter\",null,[[\"class\",\"selectedStatus\"],[\"col-md-12\",[22,[\"status\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n    \"],[6,\"thead\"],[8],[0,\"\\n      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n        \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"status\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Status\"]]],false],[0,\"\\n        \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"flightCompletedOn\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Flown On\"]]],false],[0,\"\\n        \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"package.fullName\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Package\"]]],false],[0,\"\\n        \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"client.email\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Client Email\"]]],false],[0,\"\\n        \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"pilot.email\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Pilot Email\"]]],false],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Company\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Accepted\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Rejection Notes\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Promotion\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedMissions\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"flightCompletedOn\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"package\",\"fullName\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"client\",\"email\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"pilot\",\"email\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"client\",\"company_name\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"location\",\"formatted_address\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"accepted\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"rejection_notes\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"readyForReview\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"setPanoAccepted\",[21,1,[]],true]],[8],[0,\"Accept\"],[9],[0,\" |\\n          \"],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"toggleRejectedForm\",[21,1,[\"id\"]]]],[8],[0,\"Reject\"],[9],[0,\"\\n\"],[4,\"each\",[[21,1,[\"completedPanos\"]]],null,{\"statements\":[[0,\"             | \"],[6,\"a\"],[11,\"href\",[21,2,[\"collabLink\"]]],[10,\"target\",\"_new\"],[8],[0,\"Pano\"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"          \"],[6,\"div\"],[11,\"id\",[27,[\"mission_\",[21,1,[\"id\"]]]]],[10,\"class\",\"mission-reject-form\"],[8],[0,\"\\n            \"],[6,\"form\"],[10,\"class\",\"form\"],[3,\"action\",[[21,0,[]],\"setPanoAccepted\",[21,1,[]],false],[[\"on\"],[\"submit\"]]],[8],[0,\"\\n              \"],[1,[26,\"textarea\",null,[[\"value\",\"cols\",\"rows\"],[[21,1,[\"rejection_notes\"]],\"50\",\"2\"]]],false],[0,\"\\n              \"],[6,\"div\"],[8],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\"],[\"submit\",\"Save\",\"btn btn-success btn-lg\"]]],false],[0,\" |\\n                \"],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"toggleRejectedForm\",[21,1,[\"id\"]]]],[8],[0,\"Cancel\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"p\"],[8],[0,\"Don't forget to delete the pano asset if you reject it!\"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"missions.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"            Edit / Upload\"]],\"parameters\":[]},null],[0,\"\\n           |\\n          \"],[4,\"link-to\",[\"missions.map\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Map\"]],\"parameters\":[]},null],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/pending-panos.hbs" } });
});
define("admin/templates/missions/training-missions", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0GN+JcDI", "block": "{\"symbols\":[\"mission\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body training-missions\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"hideFilter\"]]],null,{\"statements\":[[0,\"    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/Filter_Icon.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[26,\"filter-missions\",null,[[\"model\",\"status\",\"latitude\",\"longitude\",\"distance\",\"on_hold\",\"assets_late\",\"hideFilter\",\"hideAssetsLate\"],[[22,[\"model\",\"missions\"]],[22,[\"status\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"distance\"]],[22,[\"on_hold\"]],[22,[\"assets_late\"]],[22,[\"hideFilter\"]],true]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"div\"],[11,\"class\",[27,[\"missions-list  \",[26,\"if\",[[22,[\"hideFilter\"]],\"no-filter\"],null]]]],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Training Missions\"],[9],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"missions\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n      \"],[6,\"a\"],[11,\"href\",[27,[\"/missions/new/client/\",[20,\"testUserId\"],\"?activeTab=importMissions&importMode=training\"]]],[10,\"class\",\"btn btn-primary btn-xs btn-create-training-missions\"],[8],[0,\"Create New\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n          \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"search (id, client email, location, company, rep)\",\"form-control\"]]],false],[0,\"\\n\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"status\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Status\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"created_on\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Uploaded\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"package.name\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Package\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"pilot.email\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Pilot Email\"]]],false],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Review\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedMissions\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"package\",\"name\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"pilot\",\"email\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"location\",\"city\"]],false],[0,\",\"],[1,[21,1,[\"location\",\"state\"]],false],[0,\",\\n                \"],[1,[21,1,[\"location\",\"country\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[4,\"link-to\",[\"missions.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Review/Edit\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\",\"missions\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/missions/training-missions.hbs" } });
});
define("admin/templates/partner-integration", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RO7eU5nF", "block": "{\"symbols\":[\"3pfa\",\"index\"],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Partner Integration\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"id\",\"accordion\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedFlightApps\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"flight-app\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"app-header\"],[11,\"id\",[27,[\"heading-\",[21,2,[]]]]],[8],[0,\"\\n          \"],[6,\"div\"],[3,\"action\",[[21,0,[]],\"toggleSection\",[21,1,[]]]],[8],[0,\"\\n            \"],[1,[21,1,[\"name\"]],false],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"d-inline-block arrow\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"opened\"]]],null,{\"statements\":[[0,\"              \"],[6,\"img\"],[10,\"src\",\"/assets/images/up-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]},{\"statements\":[[0,\"\\n              \"],[6,\"img\"],[10,\"src\",\"/assets/images/down-arrow.svg\"],[8],[9],[0,\" \"]],\"parameters\":[]}],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[21,1,[\"opened\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[10,\"class\",\"app-body\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"header\"],[8],[0,\"\\n              \"],[6,\"div\"],[11,\"class\",[27,[\"toggle-button \",[26,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],0],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"toggleContent\",0,[21,1,[]]]],[8],[0,\"\\n                Mission Available\\n              \"],[9],[0,\"\\n              \"],[6,\"div\"],[11,\"class\",[27,[\"toggle-button \",[26,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],1],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"toggleContent\",1,[21,1,[]]]],[8],[0,\"\\n                Mission Accepted\\n              \"],[9],[0,\"\\n              \"],[6,\"div\"],[11,\"class\",[27,[\"toggle-button \",[26,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],2],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"toggleContent\",2,[21,1,[]]]],[8],[0,\"\\n                Upload Available\\n              \"],[9],[0,\"\\n              \"],[6,\"div\"],[11,\"class\",[27,[\"toggle-button \",[26,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],3],null],\"selected\"],null]]]],[3,\"action\",[[21,0,[]],\"toggleContent\",3,[21,1,[]]]],[8],[0,\"\\n                Upload Accepted\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],1],null]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Web\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_instruction\",\"web\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_instruction\",\"web\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"iOS\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_instruction\",\"ios\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_instruction\",\"ios\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Android\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_instruction\",\"android\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_instruction\",\"android\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],2],null]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Web\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_description\",\"web\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_description\",\"web\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"iOS\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_description\",\"ios\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_description\",\"ios\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Android\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_description\",\"android\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_description\",\"android\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[26,\"is-equal\",[[21,1,[\"activeTab\"]],3],null]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Web\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_instruction\",\"web\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_instruction\",\"web\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"iOS\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_instruction\",\"ios\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_instruction\",\"ios\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Android\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_delivery_instruction\",\"android\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_delivery_instruction\",\"android\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Web\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_description\",\"web\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_description\",\"web\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"iOS\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_description\",\"ios\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_description\",\"ios\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"description-block\"],[8],[0,\"\\n                  \"],[6,\"div\"],[10,\"class\",\"label\"],[8],[0,\"Android\"],[9],[0,\"\\n                  \"],[1,[26,\"simple-mde\",null,[[\"value\",\"change\"],[[21,1,[\"pilot_flight_description\",\"android\"]],[26,\"action\",[[21,0,[]],[26,\"mut\",[[21,1,[\"pilot_flight_description\",\"android\"]]],null]],null]]]],false],[0,\"\\n                \"],[9],[0,\"\\n              \"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[]}],[0,\"              \"],[6,\"button\"],[10,\"class\",\"btn btn-primary\"],[3,\"action\",[[21,0,[]],\"saveFlightApp\",[21,1,[]]]],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"saved\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"i\"],[10,\"class\",\"fa fa-check-circle\"],[8],[9],[0,\" Saved!\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  Save\\n\"]],\"parameters\":[]}],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/partner-integration.hbs" } });
});
define("admin/templates/payouts", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ReM4WQiy", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/payouts.hbs" } });
});
define("admin/templates/payouts/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aobBjzeB", "block": "{\"symbols\":[\"payout\"],\"statements\":[[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n  \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Payouts\"],[9],[0,\" \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total:\\n    \"],[1,[22,[\"model\",\"meta\",\"total_count\"]],false],[0,\" | Amount:\\n    \"],[1,[26,\"format-dollar\",[[22,[\"model\",\"meta\",\"total_amount\"]]],null],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n      \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"search (mission id, pilot email, pilot name, payment id, payment processor)\",\"form-control\"]]],false],[0,\"\\n\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n      \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"        \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n    \"],[6,\"thead\"],[8],[0,\"\\n      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Pilot\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Amount\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"\\n          Payout Date\\n        \"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Mission\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"\\n          Notes\\n        \"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Payment Processor\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Payment ID\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"\\n          Status\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedPayouts\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[4,\"link-to\",[\"pilots.pilot\",[21,1,[\"pilot\",\"id\"]]],null,{\"statements\":[[1,[21,1,[\"pilot\",\"fullName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"$\"],[1,[21,1,[\"amountInDollars\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[4,\"link-to\",[\"missions.edit\",[21,1,[\"mission\",\"id\"]]],null,{\"statements\":[[1,[21,1,[\"mission\",\"id\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n          \"],[1,[21,1,[\"notes\"]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"payment_processor\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[1,[21,1,[\"payment_id\"]],false],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n          \"],[1,[21,1,[\"status\"]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\"]],\"Loading more Payouts...\",\"All payouts loaded.\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/payouts/index.hbs" } });
});
define("admin/templates/pilots", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9ffpEdnz", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots.hbs" } });
});
define("admin/templates/pilots/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cpuV1l/p", "block": "{\"symbols\":[\"pilot\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"hideFilter\"]]],null,{\"statements\":[[0,\"    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/Filter_Icon.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[26,\"filter-missions\",null,[[\"model\",\"approvedPilots\",\"latitude\",\"longitude\",\"distance\",\"hideFilter\"],[[22,[\"model\"]],[22,[\"approvedPilots\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"distance\"]],[22,[\"hideFilter\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"div\"],[11,\"class\",[27,[\"missions-list \",[26,\"if\",[[22,[\"hideFilter\"]],\"no-filter\"],null]]]],[8],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Pilots\"],[9],[0,\"\\n      \"],[6,\"h4\"],[10,\"class\",\"pull-right\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"content\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8 col-md-offset-2\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n          \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"location, email and name\",\"form-control\"]]],false],[0,\"\\n\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"status\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Status\"]]],false],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"fullName\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Name\"]]],false],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Average Rating\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Email\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Phone\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Travel Distance\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"System\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"License\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Payout\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Actions\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedPilots\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[11,\"class\",[27,[[26,\"if\",[[21,1,[\"approved\"]],\"notice\"],null]]]],[8],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"fullName\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"average_rating\"]]],null,{\"statements\":[[0,\"                \"],[1,[21,1,[\"average_rating\"]],false],[0,\"\\n                \"],[6,\"img\"],[10,\"class\",\"small-star\"],[10,\"src\",\"/assets/images/pilot_rating/yellow_star.svg\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"email\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"phone\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"city\"]],false],[0,\", \"],[1,[21,1,[\"state\"]],false],[0,\", \"],[1,[21,1,[\"postal_code\"]],false],[0,\",\\n              \"],[1,[21,1,[\"country\"]],false],[0,\"\\n              \"],[6,\"b\"],[10,\"class\",\"pull-right\"],[8],[1,[26,\"format-distance\",[[21,1,[\"distance\"]]],null],false],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"travel_distance\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"drone_system\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"pilot_license\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"$\"],[1,[21,1,[\"payoutInDollars\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[6,\"div\"],[10,\"class\",\"btn-group\"],[8],[0,\"\\n                \"],[6,\"button\"],[10,\"class\",\"btn btn-default btn-xs dropdown-toggle\"],[10,\"data-toggle\",\"dropdown\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"button\"],[8],[0,\"\\n                   \"],[6,\"span\"],[10,\"class\",\"caret\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                  \"],[6,\"li\"],[8],[4,\"link-to\",[\"pilots.pilot\",[21,1,[\"id\"]]],null,{\"statements\":[[0,\"View\"]],\"parameters\":[]},null],[9],[0,\"\\n                  \"],[6,\"li\"],[8],[1,[26,\"pilot-approval-button\",null,[[\"model\",\"tagName\"],[[21,1,[]],\"a\"]]],false],[9],[0,\"\\n                  \"],[6,\"li\"],[8],[1,[26,\"pilot-reject-button\",null,[[\"model\",\"tagName\"],[[21,1,[]],\"a\"]]],false],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\"]],\"Loading more Pilots...\",\"All pilots loaded.\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots/index.hbs" } });
});
define("admin/templates/pilots/modal", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "s7JEZVI6", "block": "{\"symbols\":[],\"statements\":[[4,\"modal-dialog-custom\",null,[[\"action\",\"appendedClasses\",\"animatable\",\"fullScreen\"],[\"close\",\"full-screen-modal\",true,\"true\"]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"full-screen-modal-toprow\"],[8],[0,\"\\n      \"],[6,\"h3\"],[10,\"class\",\"title\"],[8],[0,\"Assign Pilot\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"close-modal\"],[8],[0,\"\\n        \"],[6,\"img\"],[10,\"src\",\"/assets/images/X.svg\"],[3,\"action\",[[21,0,[]],\"close\"]],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n        \"],[1,[26,\"pilot-search-autocomplete\",null,[[\"search\",\"results\",\"model\",\"placeholder\"],[\"searchPilots\",[22,[\"model\",\"pilots\"]],[22,[\"model\"]],\"Pilot First Name, Last Name, City, Zip, Drone type\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots/modal.hbs" } });
});
define("admin/templates/pilots/onboarding", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "i69Ywggu", "block": "{\"symbols\":[\"pilot\",\"pilot_badge\",\"device\",\"license\",\"drone\"],\"statements\":[[6,\"div\"],[10,\"class\",\"main-body\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"showBadgeOnboardingModal\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"onboarding/badge-modal\",null,[[\"badges\",\"selectedPilots\",\"selectedAllPilots\",\"totalCount\",\"distance\",\"lat\",\"lon\",\"droneIds\",\"cameraIds\",\"deviceIds\",\"licenseIds\",\"close\",\"resetPilotSelection\",\"action\"],[[22,[\"badges\"]],[22,[\"selectedPilots\"]],[22,[\"selectedAllPilots\"]],[22,[\"model\",\"meta\",\"total_count\"]],[22,[\"distance\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"droneIds\"]],[22,[\"cameraIds\"]],[22,[\"deviceIds\"]],[22,[\"licenseIds\"]],[26,\"action\",[[21,0,[]],\"toggleBadgeOnboardingModal\"],null],[26,\"action\",[[21,0,[]],\"deselectAll\"],null],\"invitePilots\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"hideFilter\"]]],null,{\"statements\":[[0,\"    \"],[6,\"img\"],[10,\"class\",\"filter-hidden-icon\"],[10,\"src\",\"/assets/images/Filter_Icon.svg\"],[3,\"action\",[[21,0,[]],\"toggleFilter\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n    \"],[1,[26,\"onboarding/filter-pilots\",null,[[\"distance\",\"lat\",\"lon\",\"selectedDrones\",\"selectedCameras\",\"selectedDevices\",\"selectedLicenses\",\"pilotBadgeBadgeIds\",\"selectedBadges\",\"badges\",\"pilotBadgeStatuses\",\"pilotBadgeStatusIds\",\"selectPilotBadgeStatuses\",\"pilotWithoutBadges\",\"pilotBadgeInclude\",\"droneIds\",\"cameraIds\",\"deviceIds\",\"licenseIds\",\"toggleFilter\"],[[22,[\"distance\"]],[22,[\"lat\"]],[22,[\"lon\"]],[22,[\"selectedDrones\"]],[22,[\"selectedCameras\"]],[22,[\"selectedDevices\"]],[22,[\"selectedLicenses\"]],[22,[\"pilotBadgeBadgeIds\"]],[22,[\"selectedBadges\"]],[22,[\"badges\"]],[22,[\"pilotBadgeStatuses\"]],[22,[\"pilotBadgeStatusIds\"]],[22,[\"selectPilotBadgeStatuses\"]],[22,[\"pilotWithoutBadges\"]],[22,[\"pilotBadgeInclude\"]],[22,[\"droneIds\"]],[22,[\"cameraIds\"]],[22,[\"deviceIds\"]],[22,[\"licenseIds\"]],[26,\"action\",[[21,0,[]],\"toggleFilter\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[6,\"div\"],[11,\"class\",[27,[\"missions-list onboarding-list \",[26,\"if\",[[22,[\"hideFilter\"]],\"no-filter\"],null]]]],[8],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n      \"],[6,\"h2\"],[10,\"class\",\"pull-left\"],[8],[0,\"Pilot Onboarding\"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pull-right\"],[8],[0,\"\\n        \"],[6,\"h4\"],[10,\"class\",\"total-count\"],[8],[0,\"Total: \"],[1,[22,[\"model\",\"meta\",\"total_count\"]],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"form-group form-group-iconized\"],[8],[0,\"\\n          \"],[1,[26,\"search-input-delayed\",null,[[\"boundValue\",\"placeholder\",\"class\"],[[22,[\"q\"]],\"location, email and name\",\"form-control\"]]],false],[0,\"\\n\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-spinner fa-pulse loadable loadable-input\"],[8],[9],[0,\"\\n          \"],[6,\"i\"],[10,\"class\",\"fa fa-search loadable-hide\"],[8],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"q\"]]],null,{\"statements\":[[0,\"            \"],[6,\"i\"],[10,\"class\",\"fa fa-times-circle search-clear\"],[3,\"action\",[[21,0,[]],\"clearQuery\"],[[\"on\"],[\"click\"]]],[8],[0,\"\\n            \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4 text-right\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"href\",\"\"],[10,\"class\",\"turquoise-button\"],[3,\"action\",[[21,0,[]],\"toggleBadgeOnboardingModal\"]],[8],[0,\"ASSIGN\"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n      \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n        \"],[6,\"col\"],[10,\"width\",\"30px\"],[8],[9],[0,\"\\n        \"],[6,\"col\"],[8],[9],[0,\"\\n        \"],[6,\"col\"],[10,\"width\",\"250px\"],[8],[9],[0,\"\\n        \"],[6,\"thead\"],[8],[0,\"\\n          \"],[6,\"tr\"],[8],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"\\n\"],[4,\"if\",[[26,\"check-if\",[[22,[\"checkedAllOnPage\"]],\"||\",[22,[\"selectedAllPilots\"]]],null]],null,{\"statements\":[[0,\"                \"],[6,\"input\"],[10,\"checked\",\"\"],[10,\"class\",\"dropdown-toggle\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"checkbox\"],[3,\"action\",[[21,0,[]],\"deselectAll\"]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n                  \"],[6,\"input\"],[11,\"disabled\",[20,\"deselectAllDisabled\"]],[10,\"class\",\"dropdown-toggle\"],[10,\"aria-haspopup\",\"true\"],[10,\"aria-expanded\",\"false\"],[10,\"type\",\"checkbox\"],[3,\"action\",[[21,0,[]],\"deselectAll\"]],[8],[9],[0,\"\\n                  \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                    \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"checkAllOnPage\"]],[8],[0,\"Select all on this page\"],[9],[9],[0,\"\\n                    \"],[6,\"li\"],[8],[6,\"a\"],[3,\"action\",[[21,0,[]],\"selectAllPilots\"]],[8],[0,\"Select all \"],[1,[22,[\"model\",\"meta\",\"total_count\"]],false],[0,\" Pilots\"],[9],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"            \"],[9],[0,\"\\n            \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"fullName\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"sortBy\"],null],\"Name\"]]],false],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Email\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"System\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"License\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Device\"],[9],[0,\"\\n            \"],[6,\"th\"],[10,\"class\",\"badge-status\"],[8],[0,\"Badge\"],[9],[0,\"\\n            \"],[6,\"th\"],[8],[0,\"Actions\"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"tbody\"],[10,\"class\",\"loadable\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedPilots\"]]],null,{\"statements\":[[0,\"          \"],[6,\"tr\"],[11,\"class\",[27,[[26,\"if\",[[21,1,[\"approved\"]],\"notice\"],null],\" \",[26,\"if\",[[26,\"includes\",[[22,[\"selectedPilots\"]],[21,1,[]]],null],\"selected-row\"],null]]]],[8],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"checkbox-item\",null,[[\"model\",\"selections\",\"byAttribute\",\"allSelected\"],[[21,1,[]],[22,[\"selectedPilots\"]],\"email\",[22,[\"selectedAllPilots\"]]]]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"fullName\"]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[26,\"input\",null,[[\"value\",\"readonly\",\"class\"],[[21,1,[\"email\"]],true,[26,\"if\",[[21,1,[\"approved\"]],\"notice\"],null]]]],false],[9],[0,\"\\n            \"],[6,\"td\"],[8],[1,[21,1,[\"city\"]],false],[0,\", \"],[1,[21,1,[\"state\"]],false],[0,\", \"],[1,[21,1,[\"postal_code\"]],false],[0,\",\\n              \"],[1,[21,1,[\"country\"]],false],[0,\"\\n              \"],[6,\"b\"],[10,\"class\",\"pull-right\"],[8],[1,[26,\"format-distance\",[[21,1,[\"distance\"]]],null],false],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"drones\"]]],null,{\"statements\":[[0,\"                \"],[1,[21,5,[\"drone\",\"name\"]],false],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"pilot_licenses\"]]],null,{\"statements\":[[0,\"                \"],[1,[21,4,[\"license\",\"name\"]],false],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"devices\"]]],null,{\"statements\":[[0,\"                \"],[1,[21,3,[\"name\"]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[10,\"class\",\"badge-status\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"pilot_badges\",\"length\"]]],null,{\"statements\":[[0,\"              \"],[6,\"ul\"],[10,\"class\",\"badge-status\"],[8],[0,\"\\n\"],[4,\"each\",[[21,1,[\"pilot_badges\"]]],null,{\"statements\":[[4,\"if\",[[26,\"empty-or-includes\",[[22,[\"selectedBadges\"]],[21,2,[\"badge\"]]],null]],null,{\"statements\":[[0,\"                  \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[21,2,[\"complete\"]],\"complete\",\"pending\"],null]],[8],[0,\"\\n                      \"],[1,[21,2,[\"badge\",\"name\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[2]},null],[0,\"              \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"               \\n\"]],\"parameters\":[]}],[0,\"            \"],[9],[0,\"\\n            \"],[6,\"td\"],[8],[0,\"\\n              \"],[4,\"link-to\",[\"pilots.pilot\",[21,1,[\"id\"]]],null,{\"statements\":[[0,\"View\"]],\"parameters\":[]},null],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\"]],\"Loading more Pilots...\",\"All pilots loaded.\"]]],false],[0,\"\\n\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots/onboarding.hbs" } });
});
define("admin/templates/pilots/pilot", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gI5FKQmq", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots/pilot.hbs" } });
});
define("admin/templates/pilots/pilot/missions/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "p2SOinZW", "block": "{\"symbols\":[\"mission\",\"image\",\"pb\",\"pilotEquipment\",\"index\",\"device\",\"index\",\"drone\",\"index\",\"license\",\"index\",\"edit_context\",\"image\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 mg-bottom-sm\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"d-inline-block header-pilot-name\"],[8],[1,[22,[\"model\",\"pilot\",\"fullName\"]],false],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"d-inline-block header-pilot-number\"],[8],[0,\"(\"],[1,[22,[\"model\",\"pilot\",\"id\"]],false],[0,\")\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"pilot\",\"average_rating\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"col-md-12 mg-bottom-sm\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n\"],[4,\"each\",[[26,\"rating-stars\",[[22,[\"model\",\"pilot\",\"average_rating\"]]],null]],null,{\"statements\":[[0,\"        \"],[6,\"img\"],[10,\"class\",\"small-star\"],[11,\"src\",[27,[\"/assets/images/pilot_rating/\",[21,13,[]]]]],[8],[9],[0,\"\\n\"]],\"parameters\":[13]},null],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[1,[26,\"format-float\",[[22,[\"model\",\"pilot\",\"average_rating\"]],1],null],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-tabs\"],[8],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"profile\"],null],\"active\"],null]],[8],[0,\"\\n      \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"profile\"]],[8],[0,\"Profile\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"badges\"],null],\"active\"],null]],[8],[0,\"\\n      \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"badges\"]],[8],[0,\"Badges\"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"li\"],[11,\"class\",[26,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"missions\"],null],\"active\"],null]],[8],[0,\"\\n      \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"setTab\",\"missions\"]],[8],[0,\"Missions\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"earnings-panel\"],[8],[0,\"\\n    \"],[6,\"span\"],[8],[0,\"Earnings: \"],[6,\"strong\"],[8],[0,\"$\"],[1,[22,[\"model\",\"pilot\",\"payoutInDollars\"]],false],[9],[9],[0,\"\\n    \"],[6,\"span\"],[8],[0,\"Status:\\n      \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n        \"],[6,\"strong\"],[8],[1,[26,\"titleize\",[[22,[\"model\",\"pilot\",\"status\"]]],null],false],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[1,[26,\"pilot-approval-button\",null,[[\"model\",\"class\"],[[22,[\"model\",\"pilot\"]],\"button-lg\"]]],false],[0,\"\\n    \"],[1,[26,\"pilot-reject-button\",null,[[\"model\",\"class\"],[[22,[\"model\",\"pilot\"]],\"button-lg reject-button\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"profile\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 top-buffer pilot-profile\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-section\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Contact Information\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"pilot\",\"first_name\"]],[22,[\"model\",\"pilot\"]],\"First Name\",[22,[\"model\",\"pilot\",\"first_name\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-md-8\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"pilot\",\"last_name\"]],[22,[\"model\",\"pilot\"]],\"Last Name\",[22,[\"model\",\"pilot\",\"last_name\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"modelErrors\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"email\"]],[22,[\"model\",\"pilot\"]],[22,[\"model\",\"pilot\",\"email\"]],\"Email\"]]],false],[0,\"\\n    \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"type\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"password\"]],[22,[\"model\",\"pilot\"]],\"password\",\"Reset Password\"]]],false],[0,\"\\n\"],[4,\"input-inplace-edit\",null,[[\"value\",\"model\",\"modelErrors\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"phone\"]],[22,[\"model\",\"pilot\"]],[22,[\"model\",\"pilot\",\"phone\"]],\"Phone\"]],{\"statements\":[[0,\"      \"],[1,[22,[\"model\",\"pilot\",\"phone\"]],false],[0,\"\\n\"]],\"parameters\":[12]},null],[0,\"    \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"birthday\"]],[22,[\"model\",\"pilot\"]],\"Birthday\"]]],false],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\",\"modelErrors\"],[[22,[\"model\",\"pilot\",\"address\"]],[22,[\"model\",\"pilot\"]],\"Address\",[22,[\"model\",\"pilot\",\"address\"]]]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"address2\"]],[22,[\"model\",\"pilot\"]],\"Suite/Apt\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"city\"]],[22,[\"model\",\"pilot\"]],\"City\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"state\"]],[22,[\"model\",\"pilot\"]],\"State\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"postal_code\"]],[22,[\"model\",\"pilot\"]],\"Postal Code\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n        \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"country\"]],[22,[\"model\",\"pilot\"]],\"Country\"]]],false],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Certifications\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"pilot\",\"pilot_licenses\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"pilot-license-view\",null,[[\"license\",\"index\"],[[21,10,[]],[21,11,[]]]]],false],[0,\"\\n\"]],\"parameters\":[10,11]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Drone System\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"pilot\",\"drones\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"pilot-drone-view\",null,[[\"drone\",\"index\"],[[21,8,[]],[21,9,[]]]]],false],[0,\"\\n\"]],\"parameters\":[8,9]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Devices\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"pilot\",\"devices\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"pilot-device-view\",null,[[\"device\",\"index\"],[[21,6,[]],[21,7,[]]]]],false],[0,\"\\n\"]],\"parameters\":[6,7]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Other Equipment\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"pilot\",\"pilotEquipment\"]]],null,{\"statements\":[[0,\"        \"],[1,[26,\"pilot-equipment-view\",null,[[\"pilotEquipment\",\"index\"],[[21,4,[]],[21,5,[]]]]],false],[0,\"\\n\"]],\"parameters\":[4,5]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Mission Preference\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pilot-section\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n          \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Miles willing to travel:\"],[9],[0,\"\\n          \"],[1,[22,[\"model\",\"pilot\",\"travel_distance\"]],false],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"pilot-section\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"pilot-section-col\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"d-inline-block mg-right-sm\"],[8],[0,\"\\n            \"],[6,\"span\"],[10,\"class\",\"normal-field-label\"],[8],[0,\"Availability:\"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"d-inline-block mg-right-sm\"],[8],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"model\",\"pilot\",\"is_available_weekdays\"]]]]],false],[0,\"\\n            Weekdays\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"d-inline-block\"],[8],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"checked\"],[\"checkbox\",[22,[\"model\",\"pilot\",\"is_available_weekends\"]]]]],false],[0,\"\\n            Weekends\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"section-header\"],[8],[0,\"\\n      Payment Information\\n    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"mg-bottom-sm\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n          \"],[1,[26,\"input-checkbox-inplace-edit\",null,[[\"value\",\"model\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"enable_autopay\"]],[22,[\"model\",\"pilot\"]],\"Enable Autopay\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"inline-info\"],[8],[0,\"\\n            \"],[6,\"span\"],[8],[0,\"Payment Processor:\"],[9],[0,\" \"],[1,[22,[\"model\",\"pilot\",\"payment_processor\"]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"col-sm-4\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"inline-info\"],[8],[0,\"\\n            \"],[6,\"span\"],[8],[0,\"Payment Processor ID:\"],[9],[0,\"\\n            \"],[1,[22,[\"model\",\"pilot\",\"payment_processor_id\"]],false],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n\\n      \"],[1,[26,\"input-inplace-edit\",null,[[\"value\",\"model\",\"typeTextArea\",\"placeholder\"],[[22,[\"model\",\"pilot\",\"notes\"]],[22,[\"model\",\"pilot\"]],true,\"Admin notes (not visible to pilot)\"]]],false],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"badges\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-4 top-buffer\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"pilotBadgeList\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"pilot-badge\",null,[[\"pb\"],[[21,3,[]]]]],false],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"  \"],[6,\"div\"],[10,\"class\",\"top-buffer\"],[8],[0,\"\\n    \"],[1,[26,\"select-custom\",null,[[\"assignSelectedObject\",\"useSendAction\",\"optionLabelPath\",\"content\",\"prompt\",\"action\"],[true,true,\"name\",[22,[\"badgeSelectList\"]],\"Add Badge\",\"addBadge\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[26,\"is-equal\",[[22,[\"activeTab\"]],\"missions\"],null]],null,{\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 top-buffer\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n    \"],[6,\"h4\"],[10,\"class\",\"pull-left\"],[8],[0,\"Pilot Missions\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n    \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n      \"],[6,\"thead\"],[8],[0,\"\\n        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Id\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Status\"],[9],[0,\"\\n          \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\",\"sortDirection\"],[\"created\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Created\",\"desc\"]]],false],[0,\"\\n          \"],[1,[26,\"sortable-column\",null,[[\"column\",\"currentSelected\",\"action\",\"title\"],[\"scheduled\",[22,[\"sortProperties\"]],[26,\"action\",[[21,0,[]],\"setSort\"],null],\"Scheduled\"]]],false],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Package\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Location\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Mission Rating\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Ref. ID\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"missions\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"id\"]],false],[0,\"\\n\"],[4,\"if\",[[21,1,[\"isOnHold\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",\"on-hold-warning\"],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa fa-warning\"],[8],[9],[0,\"\\n                \"],[6,\"span\"],[8],[0,\"On Hold\"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"titleize\",[[21,1,[\"status\"]]],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[26,\"moment-format\",[[21,1,[\"created_on\"]],\"MM/DD/YY\"],null],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"scheduled_at_start\"]]],null,{\"statements\":[[0,\"              \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_start\"]],\"MM/DD/YY\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\"\\n              \"],[6,\"br\"],[8],[9],[0,\"\\n              \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_start\"]],\"h:mm a\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\" -\\n              \"],[1,[26,\"moment-format\",[[21,1,[\"scheduled_at_end\"]],\"h:mm a\"],[[\"timeZone\"],[[21,1,[\"location\",\"timezone_id\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"package\",\"fullName\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"location\",\"formatted_address\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"if\",[[21,1,[\"pilot_rating\"]]],null,{\"statements\":[[4,\"each\",[[26,\"rating-stars\",[[21,1,[\"pilot_rating\",\"value\"]]],null]],null,{\"statements\":[[0,\"                \"],[6,\"img\"],[10,\"class\",\"small-star\"],[11,\"src\",[27,[\"/assets/images/pilot_rating/\",[21,2,[]]]]],[8],[9],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[1,[21,1,[\"reference_id\"]],false],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"missions.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"              Edit / Upload\\n            \"]],\"parameters\":[]},null],[0,\" |\\n\"],[4,\"link-to\",[\"missions.map\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"              Map\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[1,[26,\"infinity-loader\",null,[[\"infinityModel\",\"loadingText\",\"loadedText\"],[[22,[\"model\",\"missions\"]],\"Loading more Missions...\",\"All missions loaded.\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/pilots/pilot/missions/index.hbs" } });
});
define("admin/templates/templates", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "njzmI6mG", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12 templates\"],[8],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"nav nav-tabs\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"templates.index\"],[[\"tagName\",\"current-when\"],[\"li\",\"templates.index templates.new templates.edit templates.clone\"]],{\"statements\":[[0,\"      \"],[6,\"a\"],[8],[0,\"Shot Templates\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"templates.shots.index\"],[[\"tagName\",\"current-when\"],[\"li\",\"templates.shots.index templates.shots.new templates.shots.edit templates.shots.clone\"]],{\"statements\":[[0,\"      \"],[6,\"a\"],[8],[0,\"Shots\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates.hbs" } });
});
define("admin/templates/templates/clone", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Mtncfc1c", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Clone Template\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[1,[26,\"template-form\",null,[[\"template\",\"shotTypes\"],[[22,[\"model\",\"template\"]],[22,[\"model\",\"shotTypes\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/clone.hbs" } });
});
define("admin/templates/templates/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Q9KUKjs9", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Edit Template\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[1,[26,\"template-form\",null,[[\"template\",\"shotTypes\"],[[22,[\"model\",\"template\"]],[22,[\"model\",\"shotTypes\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/edit.hbs" } });
});
define("admin/templates/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "utHMi81L", "block": "{\"symbols\":[\"template\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-4\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[0,\"All Templates\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2\"],[8],[0,\"\\n    \"],[4,\"link-to\",[\"templates.new\"],[[\"class\"],[\"btn btn-info pull-right header-button\"]],{\"statements\":[[0,\"New Template\"]],\"parameters\":[]},null],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-6\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n    \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n      \"],[6,\"thead\"],[8],[0,\"\\n        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Name\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[0,\"Shots\"],[9],[0,\"\\n          \"],[6,\"th\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedTemplates\"]]],null,{\"statements\":[[0,\"        \"],[6,\"tr\"],[8],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[1,[21,1,[\"name\"]],false],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[1,[21,1,[\"shots\",\"length\"]],false],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"td\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n              \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"data-toggle\",\"dropdown\"],[10,\"class\",\"settings-menu\"],[8],[0,\"\\n                \"],[6,\"i\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n                \"],[6,\"li\"],[8],[0,\"\\n                  \"],[4,\"link-to\",[\"templates.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"li\"],[8],[0,\"\\n                  \"],[4,\"link-to\",[\"templates.clone\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Clone\"]],\"parameters\":[]},null],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/index.hbs" } });
});
define("admin/templates/templates/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Uf6EarQ3", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"page-header clearfix\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"New Template\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[1,[26,\"template-form\",null,[[\"template\",\"shotTypes\"],[[22,[\"model\",\"template\"]],[22,[\"model\",\"shotTypes\"]]]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/new.hbs" } });
});
define("admin/templates/templates/shots/clone", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/252zh/y", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-7\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[0,\"Cloned Shot\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n  \"],[1,[26,\"shot-type-form\",null,[[\"model\",\"savedAction\"],[[22,[\"model\"]],\"saved\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/shots/clone.hbs" } });
});
define("admin/templates/templates/shots/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PuGyZHem", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-7\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[0,\"Edit Shot\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n  \"],[1,[26,\"shot-type-form\",null,[[\"model\",\"savedAction\"],[[22,[\"model\"]],\"saved\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/shots/edit.hbs" } });
});
define("admin/templates/templates/shots/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "y3RV/DUG", "block": "{\"symbols\":[\"shot\"],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-7\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[0,\"All Shots\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-2\"],[8],[0,\"\\n    \"],[4,\"link-to\",[\"templates.shots.new\"],[[\"class\"],[\"btn btn-info pull-right header-button\"]],{\"statements\":[[0,\"New Shot\"]],\"parameters\":[]},null],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"table-responsive\"],[8],[0,\"\\n  \"],[6,\"table\"],[10,\"class\",\"table\"],[8],[0,\"\\n    \"],[6,\"thead\"],[8],[0,\"\\n      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"th\"],[8],[0,\"Shot Title\"],[9],[0,\"\\n        \"],[6,\"th\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"tbody\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedShots\"]]],null,{\"statements\":[[0,\"      \"],[6,\"tr\"],[8],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n          \"],[1,[21,1,[\"name\"]],false],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"td\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"dropdown\"],[8],[0,\"\\n            \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"data-toggle\",\"dropdown\"],[10,\"class\",\"settings-menu\"],[8],[6,\"i\"],[10,\"class\",\"fa fa-cog\"],[8],[9],[9],[0,\"\\n            \"],[6,\"ul\"],[10,\"class\",\"dropdown-menu\"],[8],[0,\"\\n              \"],[6,\"li\"],[8],[4,\"link-to\",[\"templates.shots.edit\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[9],[0,\"\\n              \"],[6,\"li\"],[8],[4,\"link-to\",[\"templates.shots.clone\",[21,1,[\"id\"]]],[[\"bubbles\"],[false]],{\"statements\":[[0,\"Clone\"]],\"parameters\":[]},null],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/shots/index.hbs" } });
});
define("admin/templates/templates/shots/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wTal3h7J", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"col-md-12\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-md-7\"],[8],[0,\"\\n    \"],[6,\"h3\"],[8],[0,\"Create New Shot\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"col-md-9\"],[8],[0,\"\\n  \"],[1,[26,\"shot-type-form\",null,[[\"model\",\"savedAction\"],[[22,[\"model\"]],\"saved\"]]],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "admin/templates/templates/shots/new.hbs" } });
});
define('admin/transforms/array', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ArrayTransform;

  ArrayTransform = _emberData.default.Transform.extend({
    deserialize: function (serialized) {
      return serialized;
    },
    serialize: function (deserialized) {
      return deserialized;
    }
  });

  exports.default = ArrayTransform;
});
define('admin/transforms/cents', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Cents;

  Cents = _emberData.default.Transform.extend({
    deserialize: function (serialized) {
      return (serialized / 100.00).toFixed(2);
    },
    serialize: function (deserialized) {
      return Math.round(deserialized * 100.00);
    }
  });

  exports.default = Cents;
});
define('admin/transforms/hash', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var HashTransform;

  HashTransform = _emberData.default.Transform.extend({
    deserialize: function (serialized) {
      return serialized;
    },
    serialize: function (deserialized) {
      return deserialized;
    }
  });

  exports.default = HashTransform;
});
define('admin/transforms/raw', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var Raw;

  Raw = _emberData.default.Transform.extend({
    deserialize: function (serialized) {
      return serialized;
    },
    serialize: function (deserialized) {
      return deserialized;
    }
  });

  exports.default = Raw;
});
define('admin/utils/flatten-query-params', ['exports', 'ember-data-url-templates/utils/flatten-query-params'], function (exports, _flattenQueryParams) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flattenQueryParams.default;
    }
  });
});
define('admin/utils/flatten', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var flatten;

  flatten = function (array) {
    var flattened, i, len, value;
    flattened = [];
    for (i = 0, len = array.length; i < len; i++) {
      value = array[i];
      if (Ember.isArray(value)) {
        flattened.push(flatten(value));
      } else {
        flattened.push(value);
      }
    }
    return flattened;
  };

  exports.default = flatten;
});
define('admin/utils/trim', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var rtrim, trim;

  trim = String.prototype.trim ? function (string) {
    return (string || '').trim();
  } : (rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, function (string) {
    return (string || '').replace(rtrim, '');
  });

  exports.default = trim;
});
define('admin/utils/uploader/file_proxy', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var FileProxy, mergeDefaults, sanitizeFilename, settingsToConfig;

  mergeDefaults = function (defaults, options) {
    var i, key, len, settings, unsetKeys;
    unsetKeys = Ember.A(Object.keys(defaults)).removeObjects(Object.keys(options));
    settings = Ember.copy(options, true);
    for (i = 0, len = unsetKeys.length; i < len; i++) {
      key = unsetKeys[i];
      settings[key] = defaults[key];
    }
    return settings;
  };

  settingsToConfig = function (settings) {
    var accepts, chunkSize, contentType, data, fileKey, headers, maxRetries, method, multipart, ref, url;
    ref = mergeDefaults({
      method: 'POST',
      accepts: ['application/json', 'text/javascript'],
      contentType: this.get('type'),
      headers: {},
      data: {},
      maxRetries: 0,
      chunkSize: 0,
      multipart: true,
      fileKey: 'file'
    }, settings), url = ref.url, method = ref.method, accepts = ref.accepts, contentType = ref.contentType, headers = ref.headers, data = ref.data, maxRetries = ref.maxRetries, chunkSize = ref.chunkSize, multipart = ref.multipart, fileKey = ref.fileKey;
    if (headers.Accept === null) {
      if (!Ember.Array.detect(accepts)) {
        accepts = Ember.A([accepts]).compact();
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
    data.key = data.key + ["DBUA" + this.get('uploadNumber'), this.get('sanitizedName')].join('-');
    return {
      url: url,
      method: method,
      headers: headers,
      multipart: multipart,
      multipart_params: data,
      max_retries: maxRetries,
      chunk_size: chunkSize,
      file_data_name: fileKey
    };
  };

  sanitizeFilename = function (filename) {
    return filename.replace(/^DBA-/).replace(/[^a-zA-Z\d\s\-_\.]/g, '').replace(/\s/g, '_');
  };

  FileProxy = Ember.Object.extend({
    id: Ember.computed.reads('content.id'),
    name: Ember.computed.alias('content.name'),
    size: Ember.computed.reads('content.size'),
    type: Ember.computed.reads('content.type'),
    uploadNumber: null,
    sanitizedName: Ember.computed('content.name', 'uploadNumber', function () {
      return sanitizeFilename(this.get('content.name'));
    }),
    progress: Ember.computed({
      get: function () {
        return this.get('content.percent');
      }
    }),
    status: Ember.computed({
      get: function () {
        return this.get('content.status');
      }
    }),
    uploading: Ember.computed('status', function () {
      return this.get('status') === plupload.UPLOADING;
    }),
    notifyPropertyChanges: function () {
      this.notifyPropertyChange('progress');
      return this.notifyPropertyChange('status');
    },
    prepareForUpload: function (url, settings) {
      var _this;
      _this = this;
      this._deferred = Ember.RSVP.defer("File: '" + this.get('id') + "' Upload file");
      if (this.get('status') === plupload.FAILED) {
        this.set('content.status', plupload.QUEUED);
        this.notifyPropertyChange('status');
      }
      settings.url = url;
      this.settings = settingsToConfig.call(this, settings);
      return this._deferred.promise;
    }
  });

  exports.default = FileProxy;
});
define('admin/utils/uploader/queue', ['exports', 'admin/utils/uploader/file_proxy', 'admin/utils/trim'], function (exports, _file_proxy, _trim) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var UploaderQueue, getHeader;

  getHeader = function (headers, header) {
    var headerIdx, headerKeys;
    headerKeys = Ember.A(Object.keys(headers));
    headerIdx = headerKeys.map(function (s) {
      return s.toLowerCase();
    }).indexOf(header.toLowerCase());
    if (headerIdx !== -1) {
      headers[headerKeys[headerIdx]];
    }
    return null;
  };

  UploaderQueue = Ember.ArrayProxy.extend({
    name: null,
    uploader: null,
    status: Ember.computed({
      get: function () {
        return this.get('uploader.state');
      }
    }),
    uploadsQueued: Ember.computed('length', 'uploading', function () {
      return this.get('length') && !this.get('uploading');
    }),
    uploading: Ember.computed('status', function () {
      return this.get('status') === plupload.UPLOADING;
    }),
    stopped: Ember.computed('status', function () {
      return this.get('status') === plupload.STOPPED;
    }),
    finished: Ember.computed('status', 'uploadsQueued', function () {
      return this.get('stopped') && !this.get('uploadsQueued');
    }),
    uploadCount: 0,
    uploadProgressText: Ember.computed('length', 'progress', function () {
      var ftext;
      ftext = this.get('length') > 1 ? 'files' : 'file';
      return "Uploading " + this.get('length') + " " + ftext + ". (" + this.get('progress') + "%)";
    }),
    init: function () {
      this.set('content', Ember.A([]));
      return this._super();
    },
    configureUploader: function (config) {
      var settings, uploader;
      if (config == null) {
        config = {};
      }
      uploader = new plupload.Uploader(config);
      uploader.bind('FilesAdded', Ember.run.bind(this, 'filesAdded'));
      uploader.bind('FilesRemoved', Ember.run.bind(this, 'filesRemoved'));
      uploader.bind('BeforeUpload', Ember.run.bind(this, 'configureUpload'));
      uploader.bind('UploadProgress', Ember.run.bind(this, 'progressDidChange'));
      uploader.bind('FileUploaded', Ember.run.bind(this, 'fileUploaded'));
      uploader.bind('UploadComplete', Ember.run.bind(this, 'uploadComplete'));
      uploader.bind('Error', Ember.run.bind(this, 'onError'));
      uploader.bind('StateChanged', Ember.run.bind(this, 'onStateChange'));
      uploader.settings.browse_button = [config.browse_button];
      settings = Ember.copy(uploader.settings);
      this.set('uploadCount', settings.uploadCount);
      delete settings.uploadCount;
      delete settings.url;
      this.set('settings', settings);
      this.set('uploader', uploader);
      uploader.init();
      return uploader;
    },
    destroy: function () {
      this._super();
      this.get('uploader').unbindAll();
      this.set('content', Ember.A([]));
      return this.set('uploader', null);
    },
    refresh: function () {
      return this.get('uploader').refresh();
    },
    size: Ember.computed(function () {
      return this.get('uploader.total.size') || 0;
    }),
    loaded: Ember.computed(function () {
      return this.get('uploader.total.loaded') || 0;
    }),
    progress: Ember.computed('size', 'loaded', function () {
      var percent;
      percent = this.get('loaded') / this.get('size') || 0;
      return Math.floor(percent * 100);
    }),
    filesAdded: function (uploader, files) {
      var file, filep, i, len, results1;
      results1 = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        this.uploadCount += 1;
        filep = _file_proxy.default.create({
          uploadNumber: this.uploadCount,
          content: file
        });
        this.pushObject(filep);
        this.get('target').sendAction('onfileadd', filep);
        this.notifyPropertyChange('size');
        results1.push(this.notifyPropertyChange('loaded'));
      }
      return results1;
    },
    filesRemoved: function (uploader, files) {
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
    configureUpload: function (uploader, file) {
      var filep;
      filep = this.findBy('id', file.id);
      uploader.settings = Ember.copy(this.get('settings'));
      Ember.merge(uploader.settings, filep.settings);
      return this.progressDidChange(uploader, file);
    },
    progressDidChange: function (uploader, file) {
      var filep;
      filep = this.findBy('id', file.id);
      if (filep) {
        filep.notifyPropertyChanges();
      }
      this.notifyPropertyChange('size');
      this.notifyPropertyChange('loaded');
      return uploader.refresh();
    },
    fileUploaded: function (uploader, file, response) {
      var filep, results;
      results = this.parseResponse(response);
      filep = this.findBy('id', file.id);
      if (filep) {
        this.removeObject(filep);
      }
      if (Math.floor(results.status / 200) === 1) {
        filep._deferred.resolve(results);
      } else {
        filep._deferred.reject("Queue fileUploaded " + results);
      }
      return Ember.run.later(uploader, 'refresh', 750);
    },
    uploadComplete: function () {
      Ember.run.later(this.get('uploader'), 'refresh', 750);
      this.notifyPropertyChange('loaded');
      return this.notifyPropertyChange('size');
    },
    onError: function (error) {
      var filep;
      if (error.file) {
        filep = this.findBy('id', error.file.id);
        if (filep === null) {
          filep = _file_proxy.default.create({
            content: file
          });
        }
        filep.set('error', true);
        if (filep._deferred) {
          filep._deferred.reject("Queue onError " + error);
        } else {
          filep.upload = filep.read = function () {
            Ember.run.debounce(this.get('uploader'), 'refresh', 750);
            return Ember.RSVP.reject(error, "File: '" + error.file.id + "' " + error.message);
          };
          filep.isDestroyed = true;
          this.get('target').sendAction('onfileadd', filep);
        }
        this.notifyPropertyChange('length');
        return Ember.run.debounce(this.get('uploader'), 'refresh', 750);
      } else {
        this.set('error', error);
        return this.get('target').sendAction('onerror', error);
      }
    },
    onStateChange: function (uploader) {
      if (uploader.state === plupload.STOPPED) {
        uploader.total.reset();
        this.notifyPropertyChange('size');
        this.notifyPropertyChange('loaded');
      }
      return this.notifyPropertyChange('status');
    },
    parseResponse: function (response) {
      var body, contentType, headers, rawHeaders;
      body = (0, _trim.default)(response.response);
      rawHeaders = Ember.A(response.responseHeaders.split(/\n|\r/)).without('');
      headers = rawHeaders.reduce(function (E, header) {
        var parts;
        parts = header.split(/^([A-Za-z_-]*:)/);
        if (parts.length > 0) {
          E[parts[1].slice(0, -1).toLowerCase()] = (0, _trim.default)(parts[2]);
        }
        return E;
      }, {});
      contentType = (getHeader(headers, 'Content-Type') || '').split(';');
      if (contentType.indexOf('text/html') !== -1) {
        body = Ember.$.parseHTML(body);
      } else if (contentType.indexOf('text/xml') !== -1) {
        body = Ember.$.parseXML(body);
      } else if (contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/javascript') !== -1 || contentType.indexOf('application/javascript') !== -1) {
        body = Ember.$.parseJSON(body);
      }
      return {
        status: response.status,
        body: body,
        headers: headers
      };
    }
  });

  exports.default = UploaderQueue;
});
define('admin/utils/w', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var toArray, w;

  toArray = function (value) {
    if (typeof value === 'string') {
      value = Ember.String.w(value);
    }
    return Ember.A(value);
  };

  w = function (defaultValue) {
    defaultValue = defaultValue || [];
    return Ember.computed({
      get: function () {
        return toArray(defaultValue);
      },
      set: function (key, value) {
        return toArray(value);
      }
    });
  };

  exports.default = w;
});
define('admin/validations/template', ['exports', 'ember-changeset-validations/validators'], function (exports, _validators) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'name': [(0, _validators.validatePresence)(true), (0, _validators.validateLength)({ min: 3, max: 75, message: 'Please enter a valid password. 3-75 characters.' })]
  };
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

if (!runningTests) {
  require("admin/app")["default"].create({"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"name":"admin","version":"0.2.0+fd176bb8","validatorDefaultLocale":"en"});
}
//# sourceMappingURL=admin.map

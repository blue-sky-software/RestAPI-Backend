/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/':                  'AuthviewController.login',
  '/dashboard':         'UserviewController.dashboard',
  '/globalapis':        'UserviewController.globalapis',
  '/localapis':         'UserviewController.localapis',
  '/usermanage':        'UserviewController.usermanage',
  '/roommanage':        'RoomviewController.roommanage',
  '/beaconmanage':      'BeaconviewController.beaconmanage',
  '/roomrequestsmanage':'RoomviewController.roomrequestsmanage',
  '/alertsmanage':      'AlertsviewController.alertsmanage',
  '/bookmanage':        'BookviewController.bookmanage',
  '/bookrequestsmanage':'BookviewController.bookrequestsmanage',

  'get      /login':            'AuthviewController.login',
  'post     /login':            'AuthviewController.doLogin',
  'get      /register':         'AuthviewController.register',
  'post     /register':         'AuthviewController.doRegister',
  'get      /logout':           'AuthviewController.logout',

  'post     /api/login':        'AuthController.apiLogin',
  'post     /api/logout':       'AuthController.apiLogout',
  'get      /api/getroomusage': 'RoomController.getroomusage',
  'post     /api/alertroom':    'RoomrequestsController.alertroom',
  'post     /api/sendalert':    'UserController.sendalert',
  'get      /api/listbooks':    'BookController.listbooks',
  'post     /api/wantbook':     'BookrequestsController.wantbook',
  'get      /api/bookdetail':   'BookController.bookdetail',
  'get      /api/alertlist':    'AlertsController.alertlist',
  'post     /api/setroomcapacity': 'RoomController.setroomcapacity',
  'post     /api/resetbooksavail': 'BookController.resetbooksavail',
  'post     /api/resetbooksunavail': 'BookController.resetbooksunavail',
  'get      /api/listusers':    'UserController.listusers',
  'post     /api/setuseradmin': 'UserController.setuseradmin',
  'get      /api/detailuser':   'UserController.detailuser',
  'post     /api/updateuser':   'UserController.updateuser',
  'post     /api/deleteuser':   'UserController.deleteuser',
  'post     /api/adduser':      'UserController.adduser',
  'get      /api/listbeacons':  'BeaconController.listbeacons',
  'post     /api/sendlocationalert': 'AlertsController.sendlocationalert',

  'post     /adduser':          'UserviewController.adduser',
  'post     /updateuser':       'UserviewController.updateuser',
  'get      /getuser':          'UserviewController.getuser',
  'post     /deleteuser':       'UserviewController.deleteuser',
  'post     /addroom':          'RoomviewController.addroom',
  'post     /updateroom':       'RoomviewController.updateroom',
  'get      /getroom':          'RoomviewController.getroom',
  'post     /deleteroom':       'RoomviewController.deleteroom',
  'post     /addbeacon':        'BeaconviewController.addbeacon',
  'post     /updatebeacon':     'BeaconviewController.updatebeacon',
  'get      /getbeacon':        'BeaconviewController.getbeacon',
  'post     /deletebeacon':     'BeaconviewController.deletebeacon',
  'post     /addroomrequests':  'RoomviewController.addroomrequests',
  'post     /updateroomrequests':       'RoomviewController.updateroomrequests',
  'get      /getroomrequests':          'RoomviewController.getroomrequests',
  'post     /deleteroomrequests':       'RoomviewController.deleteroomrequests',
  'post     /addalerts':          'AlertsviewController.addalerts',
  'post     /updatealerts':       'AlertsviewController.updatealerts',
  'get      /getalerts':          'AlertsviewController.getalerts',
  'post     /deletealerts':       'AlertsviewController.deletealerts',
  'post     /addbook':          'BookviewController.addbook',
  'post     /updatebook':       'BookviewController.updatebook',
  'get      /getbook':          'BookviewController.getBook',
  'post     /deletebook':       'BookviewController.deletebook',
  'post     /addbookrequests':			'BookviewController.addbookrequests',
  'post     /updatebookrequests':       'BookviewController.updatebookrequests',
  'get      /getbookrequests':          'BookviewController.getbookrequests',
  'post     /deletebookrequests':       'BookviewController.deletebookrequests',
  /* for debug */
  //'get /login': 'AuthController.doLogin',
  //'get /logout': 'AuthController.doLogout',
  //'get /alertroom': 'RoomrequestsController.alertroom',
  //'get /sendalert': 'UserController.sendalert',
  //'get /wantbook': 'BookrequestsController.wantbook',
  //'get /setroomcapacity': 'RoomController.setroomcapacity',
  //'get /resetbooksavail': 'BookController.resetbooksavail',
  //'get /resetbooksunavail': 'BookController.resetbooksunavail',
  //'get /setuseradmin': 'UserController.setuseradmin',
  //'get /updateuser': 'UserController.updateuser',
  //'get /deleteuser': 'UserController.deleteuser',
  //'get /adduser': 'UserController.adduser',
  //'get /sendlocationalert': 'AlertsController.sendlocationalert',
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

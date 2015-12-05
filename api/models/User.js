/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    token : { 
     type: 'string',
     unique: true
    },

    fistname : { 
     type: 'string',
    },

    lastname : { 
     type: 'string',
    },

    emailid : { 
     type: 'email',
     unique: true,
     defaultsTo: 'test@google.com'
    },

    photoid : { 
     type: 'integer',
     defaultsTo: 0
    },

    isGrad : { 
     type: 'boolean',
     defaultsTo: false
    },

    isAdmin : { 
     type: 'boolean',
     defaultsTo: false
    },

    password : { 
     type: 'string',
     defaultsTo: ''
    },

    sendalert : { 
     type: 'boolean',
     defaultsTo: false
    }
  }
};


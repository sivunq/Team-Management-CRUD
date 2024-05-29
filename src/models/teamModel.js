const mongoose = require('mongoose');
const validator = require('validator');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const teamMemberSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
	validate: {
      validator: uuidValidate,
      message: props => `${props.value} is not a valid UUID!`
    }
  },
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.isNew) {
          return v && v.length >= 2 && v.length <= 50;
        }
        return true;
      },
      message: 'First name must be between 2 and 50 characters'
    },
  },
  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        if (this.isNew) {
          return v && v.length >= 2 && v.length <= 50;
        }
        return true;
      },
      message: 'Last name must be between 2 and 50 characters'
    },
  },
  phoneNumber: {
    type: String,
	unique: true,
    validate: {
      validator: function (v) {
        if (this.isNew) {
          return /^[6-9]\d{9}$/.test(v);
        }
        return true;
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        if (this.isNew) {
          return validator.isEmail(v);
        }
        return true;
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role must be either admin or user'
    },
    validate: {
      validator: function (v) {
        if (this.isNew) {
          return v === 'admin' || v === 'user';
        }
        return true;
      },
      message: 'Role is required'
    },
  },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);

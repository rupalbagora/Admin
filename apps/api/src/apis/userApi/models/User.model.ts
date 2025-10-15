import mongoose, { model, Schema, Model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
  IUser,
  UserRole,
  SubscriptionType,
  SubscriptionStatus,
  PaymentMethod,
  Gender,
  ThemePreference
} from '../types/user.types';
import { jwtConfig } from '../../../config/jwt';

const userSchema: Schema<IUser> = new Schema({
  // Basic Information
  refLink: {
    type: String,
    default: null
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number!`
    }
  },
  // address: {
  //   type: String,
  //   required: [true, 'Address is required']
  // },

  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  // Roles and Permissions
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  },
  permissions: {
    type: [String],
    default: []
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Subscription Information
  subscription: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  subscriptionType: {
    type: String,
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.FREE
  },
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  subscriptionStatus: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    default: SubscriptionStatus.PENDING
  },
  subscriptionPeriod: {
    type: String,
    enum: ['biannual', 'halfyearly', 'yearly', 'custom'],
    default: 'biannual'
  },
  expireDate: Date,
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod)
  },
  billingInfo: {
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },

  // Profile Information
  avatar: {
    type: Types.ObjectId,
    ref: "UploadedFile"
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: Object.values(Gender)
  },

  // Social Media
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },

  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: Object.values(ThemePreference),
      default: ThemePreference.LIGHT
    },
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    }
  },

  // Statistics
  loginCount: {
    type: Number,
    default: 0
  },
  lastLogin: Date,
  devices: [{
    deviceType: String,
    os: String,
    browser: String,
    ipAddress: String,
    lastAccess: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ role: 1 });
userSchema.index({ subscriptionStatus: 1 });
userSchema.index({ 'subscriptionEndDate': 1 });

// Middleware
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre<IUser>('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// Virtuals
userSchema.virtual('isSubscriptionActive').get(function(this: IUser) {
  if (!this.subscriptionEndDate) return false;
  return this.subscriptionStatus === SubscriptionStatus.ACTIVE &&
         this.subscriptionEndDate > new Date();
});

// Methods
userSchema.methods.comparePassword = async function(
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function (this: IUser): string {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

userSchema.methods.changedPasswordAfter = function(
  this: IUser,
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function(
  this: IUser
): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;

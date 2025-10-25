// import mongoose, { model, Schema, Model, Types } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import validator from 'validator';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import {
//   IUser,
//   UserRole,
//   SubscriptionType,
//   SubscriptionStatus,
//   PaymentMethod,
//   Gender,
//   ThemePreference
// } from '../types/user.types';
// import { jwtConfig } from '../../../config/jwt';

// const userSchema: Schema<IUser> = new Schema({
//   refLink: { type: String, default: null },
//   admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//   firstName: { type: String, required: true, trim: true, maxlength: 50 },
//   lastName: { type: String, required: true, trim: true, maxlength: 50 }, 

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, 'Please provide a valid email']
//   },
//   phone: {
//     type: String,
//     trim: true,
//     validate: {
//       validator: function(v: string) {
//         return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
//       },
//       message: (props: { value: string }) => `${props.value} is not a valid phone number!`
//     }
//   },

//   password: { type: String, required: true, minlength: 8, select: false },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,

//   role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
//   permissions: { type: [String], default: [] },
//   isVerified: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: true },

//   subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
//   subscriptionType: { type: String, enum: Object.values(SubscriptionType), default: SubscriptionType.FREE },
//   subscriptionPeriod: { type: String, enum: ['biannual','halfyearly','yearly','custom'], default: 'biannual' }, // ✅ Added
//   subscriptionStartDate: Date,
//   subscriptionEndDate: Date,
//   subscriptionStatus: { type: String, enum: Object.values(SubscriptionStatus), default: SubscriptionStatus.PENDING },
//   paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
//   billingInfo: {
//     address: String,
//     city: String,
//     state: String,
//     country: String,
//     postalCode: String
//   },

//   avatar: { type: Types.ObjectId, ref: 'UploadedFile' },
//   bio: { type: String, maxlength: 500 },
//   dateOfBirth: Date,
//   gender: { type: String, enum: Object.values(Gender) },

//   socialMedia: { facebook: String, twitter: String, linkedin: String, instagram: String },

//   preferences: {
//     theme: { type: String, enum: Object.values(ThemePreference), default: ThemePreference.LIGHT },
//     language: { type: String, default: 'en' },
//     notifications: { email: { type: Boolean, default: true }, push: { type: Boolean, default: true }, sms: { type: Boolean, default: false } }
//   },


//     fullName: { type: String, required: true, trim: true, maxlength: 100 },


//   loginCount: { type: Number, default: 0 },
//   lastLogin: Date,
//   devices: [{ deviceType: String, os: String, browser: String, ipAddress: String, lastAccess: Date }]
// }, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// // Indexes
// userSchema.index({ role: 1 });
// userSchema.index({ subscriptionStatus: 1 });
// userSchema.index({ subscriptionEndDate: 1 });

// // Middleware
// userSchema.pre<IUser>('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.pre<IUser>('save', function(next) {
//   if (!this.isModified('password') || this.isNew) return next();
//   this.passwordChangedAt = new Date(Date.now() - 1000);
//   next();
// });

// // Virtuals
// userSchema.virtual('isSubscriptionActive').get(function(this: IUser) {
//   if (!this.subscriptionEndDate) return false;
//   return this.subscriptionStatus === SubscriptionStatus.ACTIVE &&
//          this.subscriptionEndDate > new Date();
// });

// // Methods
// userSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.methods.generateAuthToken = function(this: IUser): string {
//   const payload = { id: this._id, role: this.role };
//   return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
// };

// userSchema.methods.changedPasswordAfter = function(this: IUser, JWTTimestamp: number): boolean {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function(this: IUser): string {
//   const resetToken = crypto.randomBytes(32).toString('hex');
//   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
//   return resetToken;
// };

// const User: Model<IUser> = model<IUser>('User', userSchema);
// export default User;

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
  refLink: { type: String, default: null },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // ✅ Make firstName & lastName optional (they’ll be auto-filled from fullName)
  firstName: { type: String, trim: true, maxlength: 50 },
  lastName: { type: String, trim: true, maxlength: 50 },

  // ✅ Keep fullName required but auto-generate it if missing
  fullName: { type: String, required: true, trim: true, maxlength: 100 },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^\+?[\d\s\-\(\)]{10,}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid phone number!`
    }
  },

  password: { type: String, required: true, minlength: 8, select: false },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  permissions: { type: [String], default: [] },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
  subscriptionType: { type: String, enum: Object.values(SubscriptionType), default: SubscriptionType.FREE },
  subscriptionPeriod: { type: String, enum: ['biannual', 'halfyearly', 'yearly', 'custom'], default: 'biannual' },
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  subscriptionStatus: { type: String, enum: Object.values(SubscriptionStatus), default: SubscriptionStatus.PENDING },
  paymentMethod: { type: String, enum: Object.values(PaymentMethod) },
  billingInfo: {
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },

  avatar: { type: Types.ObjectId, ref: 'UploadedFile' },
  bio: { type: String, maxlength: 500 },
  dateOfBirth: Date,
  gender: { type: String, enum: Object.values(Gender) },

  socialMedia: { facebook: String, twitter: String, linkedin: String, instagram: String },

  preferences: {
    theme: { type: String, enum: Object.values(ThemePreference), default: ThemePreference.LIGHT },
    language: { type: String, default: 'en' },
    notifications: { email: { type: Boolean, default: true }, push: { type: Boolean, default: true }, sms: { type: Boolean, default: false } }
  },

  loginCount: { type: Number, default: 0 },
  lastLogin: Date,
  devices: [{ deviceType: String, os: String, browser: String, ipAddress: String, lastAccess: Date }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// ✅ Auto-generate missing name fields
userSchema.pre<IUser>('save', function (next) {
  if (!this.fullName && this.firstName && this.lastName) {
    this.fullName = `${this.firstName} ${this.lastName}`;
  } else if (!this.firstName && this.fullName) {
    const parts = this.fullName.split(' ');
    this.firstName = parts[0];
    this.lastName = parts.slice(1).join(' ');
  }
  next();
});

// Password hash
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

// Virtuals
userSchema.virtual('isSubscriptionActive').get(function (this: IUser) {
  if (!this.subscriptionEndDate) return false;
  return this.subscriptionStatus === SubscriptionStatus.ACTIVE &&
    this.subscriptionEndDate > new Date();
});

// Methods
userSchema.methods.comparePassword = async function (this: IUser, candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function (this: IUser): string {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

userSchema.methods.changedPasswordAfter = function (this: IUser, JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function (this: IUser): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

const User: Model<IUser> = model<IUser>('User', userSchema);
export default User;

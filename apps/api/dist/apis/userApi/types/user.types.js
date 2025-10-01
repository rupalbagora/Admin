"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemePreference = exports.Gender = exports.PaymentMethod = exports.SubscriptionStatus = exports.SubscriptionType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPERADMIN"] = "superadmin";
    UserRole["ADMIN"] = "admin";
    UserRole["STAFF"] = "staff";
    UserRole["STUDENT"] = "student";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["FREE"] = "free";
    SubscriptionType["BASIC"] = "basic";
    SubscriptionType["PREMIUM"] = "premium";
    SubscriptionType["ENTERPRISE"] = "enterprise";
})(SubscriptionType || (exports.SubscriptionType = SubscriptionType = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["CANCELLED"] = "cancelled";
    SubscriptionStatus["PENDING"] = "pending";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["CRYPTO"] = "crypto";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
    Gender["PREFER_NOT_TO_SAY"] = "prefer-not-to-say";
})(Gender || (exports.Gender = Gender = {}));
var ThemePreference;
(function (ThemePreference) {
    ThemePreference["LIGHT"] = "light";
    ThemePreference["DARK"] = "dark";
    ThemePreference["SYSTEM"] = "system";
})(ThemePreference || (exports.ThemePreference = ThemePreference = {}));

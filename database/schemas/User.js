// نموذج المستخدم
const userSchema = {
  _id: "ObjectId",
  name: "String (مطلوب)",
  email: "String (مطلوب, فريد)",
  password: "String (مشفر, مطلوب)",
  phone: "String",
  avatar: "String (رابط الصورة)",
  balance: "Number (الرصيد الحالي) - default: 0",
  rating: "Number (التقييم من 1-5) - default: 0",
  reviews_count: "Number - default: 0",
  verified: "Boolean (التحقق من البريد) - default: false",
  phone_verified: "Boolean (التحقق من الهاتف) - default: false",
  account_status: "String (active, suspended, deleted) - default: active",
  paypal_email: "String (بريد PayPal)",
  bank_account: "Object {bank_name, account_number, account_holder}",
  kycCompleted: "Boolean - default: false",
  createdAt: "Date - default: now",
  updatedAt: "Date - default: now",
  lastLogin: "Date"
};

module.exports = userSchema;

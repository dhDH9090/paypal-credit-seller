// نموذج الطلب
const orderSchema = {
  _id: "ObjectId",
  seller: "ObjectId (مرجع المستخدم البائع - مطلوب)",
  buyer: "ObjectId (مرجع المستخدم المشتري - مطلوب)",
  amount: "Number (المبلغ - مطلوب)",
  currency: "String (العملة: USD, EUR, SAR) - default: USD",
  exchange_rate: "Number (سعر الصرف)",
  status: "String (pending, completed, cancelled, disputed) - default: pending",
  paymentMethod: "String (card, wallet, bank_transfer)",
  payment_proof: "String (صورة/وثيقة الدفع)",
  delivery_proof: "String (صورة/وثيقة التسليم)",
  buyer_review: "Object {rating, comment}",
  seller_review: "Object {rating, comment}",
  notes: "String",
  dispute: "Object {reason, status, resolution}",
  createdAt: "Date - default: now",
  completedAt: "Date",
  updatedAt: "Date - default: now"
};

module.exports = orderSchema;

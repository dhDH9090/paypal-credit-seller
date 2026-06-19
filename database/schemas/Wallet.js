// نموذج المحفظة
const walletSchema = {
  _id: "ObjectId",
  user: "ObjectId (مرجع المستخدم - مطلوب, فريد)",
  balance: "Number (الرصيد الحالي) - default: 0",
  pending_balance: "Number (الرصيد المعلق) - default: 0",
  total_earned: "Number (إجمالي المكاسب) - default: 0",
  total_spent: "Number (إجمالي الإنفاق) - default: 0",
  currency: "String - default: USD",
  transactions: "Array of Objects",
  transaction: {
    _id: "ObjectId",
    type: "String (credit, debit, transfer, refund)",
    amount: "Number",
    description: "String",
    order_id: "ObjectId (مرجع الطلب إن وجد)",
    reference: "String",
    status: "String (completed, pending, failed)",
    timestamp: "Date"
  },
  createdAt: "Date - default: now",
  updatedAt: "Date - default: now"
};

module.exports = walletSchema;

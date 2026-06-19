// خدمة Stripe للدفع
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * إنشاء عملية دفع جديدة
 * @param {Object} paymentData - بيانات الدفع
 * @returns {Promise<Object>} معرف العملية والرابط
 */
const createPaymentIntent = async (paymentData) => {
  try {
    const { amount, currency, description, metadata } = paymentData;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // تحويل إلى cents
      currency: currency || 'usd',
      description: description || 'PayPal Credit Sale',
      metadata: metadata || {},
      payment_method_types: ['card'],
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      currency: currency,
    };
  } catch (error) {
    console.error('❌ خطأ في إنشاء عملية الدفع:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * استرجاع تفاصيل عملية الدفع
 * @param {String} paymentIntentId - معرف العملية
 * @returns {Promise<Object>} تفاصيل العملية
 */
const getPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      success: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
    };
  } catch (error) {
    console.error('❌ خطأ في الحصول على تفاصيل العملية:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * إرجاع الأموال (Refund)
 * @param {String} paymentIntentId - معرف العملية
 * @param {Number} amount - المبلغ المراد استرجاعه (اختياري - إذا كان فارغ يتم استرجاع الكل)
 * @returns {Promise<Object>} نتائج الاسترجاع
 */
const refundPayment = async (paymentIntentId, amount = null) => {
  try {
    const refundData = { payment_intent: paymentIntentId };
    if (amount) {
      refundData.amount = Math.round(amount * 100);
    }

    const refund = await stripe.refunds.create(refundData);

    return {
      success: true,
      refundId: refund.id,
      status: refund.status,
      amount: refund.amount / 100,
    };
  } catch (error) {
    console.error('❌ خطأ في استرجاع الأموال:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * التحقق من التوقيع (Webhook)
 * @param {String} body - نص الطلب
 * @param {String} signature - توقيع Stripe
 * @returns {Object|null} الحدث أو null
 */
const verifyWebhookSignature = (body, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    console.error('❌ خطأ في التحقق من التوقيع:', error.message);
    return null;
  }
};

/**
 * إنشاء عميل جديد في Stripe
 * @param {Object} customerData - بيانات العميل
 * @returns {Promise<Object>} بيانات العميل المنشأ
 */
const createCustomer = async (customerData) => {
  try {
    const { email, name, phone } = customerData;

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        createdAt: new Date().toISOString(),
      },
    });

    return {
      success: true,
      customerId: customer.id,
      email: customer.email,
      name: customer.name,
    };
  } catch (error) {
    console.error('❌ خطأ في إنشاء عميل Stripe:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  createPaymentIntent,
  getPaymentIntent,
  refundPayment,
  verifyWebhookSignature,
  createCustomer,
};

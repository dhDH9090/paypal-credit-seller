const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stripeService = require('../services/stripeService');

/**
 * @route   POST /api/payment/create-intent
 * @desc    إنشاء عملية دفع جديدة
 * @access  Private
 */
router.post('/create-intent', auth, async (req, res) => {
  try {
    const { amount, currency, description, orderId } = req.body;

    // التحقق من البيانات المطلوبة
    if (!amount || !currency) {
      return res.status(400).json({
        success: false,
        message: 'المبلغ والعملة مطلوبان'
      });
    }

    const paymentData = {
      amount,
      currency: currency.toLowerCase(),
      description: description || `Order #${orderId}`,
      metadata: {
        userId: req.user.userId,
        orderId: orderId || 'N/A',
        createdAt: new Date().toISOString(),
      }
    };

    const result = await stripeService.createPaymentIntent(paymentData);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'فشل في إنشاء عملية الدفع',
        error: result.error
      });
    }

    res.status(201).json({
      success: true,
      message: 'تم إنشاء عملية الدفع بنجاح',
      data: result
    });

  } catch (error) {
    console.error('❌ خطأ في إنشاء عملية الدفع:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء عملية الدفع',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/payment/intent/:paymentIntentId
 * @desc    الحصول على تفاصيل عملية الدفع
 * @access  Private
 */
router.get('/intent/:paymentIntentId', auth, async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    const result = await stripeService.getPaymentIntent(paymentIntentId);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'فشل في الحصول على تفاصيل العملية',
        error: result.error
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ خطأ في الحصول على العملية:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في الحصول على تفاصيل العملية'
    });
  }
});

/**
 * @route   POST /api/payment/refund
 * @desc    استرجاع الأموال
 * @access  Private
 */
router.post('/refund', auth, async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'معرف العملية مطلوب'
      });
    }

    const result = await stripeService.refundPayment(paymentIntentId, amount);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'فشل في استرجاع الأموال',
        error: result.error
      });
    }

    res.json({
      success: true,
      message: 'تم استرجاع الأموال بنجاح',
      data: result
    });

  } catch (error) {
    console.error('❌ خطأ في استرجاع الأموال:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في استرجاع الأموال'
    });
  }
});

/**
 * @route   POST /api/payment/webhook
 * @desc    معالج أحداث Stripe
 * @access  Public
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];

    const event = stripeService.verifyWebhookSignature(req.body, signature);

    if (!event) {
      return res.status(400).json({
        success: false,
        message: 'فشل في التحقق من التوقيع'
      });
    }

    // معالجة أحداث مختلفة
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ تم إتمام الدفع:', event.data.object.id);
        // قم بتحديث قاعدة البيانات هنا
        break;

      case 'payment_intent.payment_failed':
        console.log('❌ فشل الدفع:', event.data.object.id);
        // تسجيل الفشل في قاعدة البيانات
        break;

      case 'charge.refunded':
        console.log('💰 تم استرجاع الأموال:', event.data.object.id);
        // تحديث حالة الطلب
        break;

      default:
        console.log('📢 حدث غير معالج:', event.type);
    }

    res.json({
      success: true,
      message: 'تم معالجة الحدث بنجاح'
    });

  } catch (error) {
    console.error('❌ خطأ في معالج Webhook:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في معالجة الحدث'
    });
  }
});

/**
 * @route   POST /api/payment/create-customer
 * @desc    إنشاء عميل جديد في Stripe
 * @access  Private
 */
router.post('/create-customer', auth, async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني والاسم مطلوبان'
      });
    }

    const customerData = {
      email,
      name,
      phone: phone || ''
    };

    const result = await stripeService.createCustomer(customerData);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'فشل في إنشاء العميل',
        error: result.error
      });
    }

    res.status(201).json({
      success: true,
      message: 'تم إنشاء العميل بنجاح',
      data: result
    });

  } catch (error) {
    console.error('❌ خطأ في إنشاء العميل:', error);
    res.status(500).json({
      success: false,
      message: 'حدث خطأ في إنشاء العميل'
    });
  }
});

module.exports = router;

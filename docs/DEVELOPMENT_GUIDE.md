# 📖 دليل المطور

## 🚀 البدء السريع

### المتطلبات
- Node.js v14 أو أحدث
- npm أو yarn
- MongoDB أو PostgreSQL
- Git

### التثبيت

1. **استنساخ المستودع**
```bash
git clone https://github.com/dhDH9090/paypal-credit-seller.git
cd paypal-credit-seller
```

2. **تثبيت Backend**
```bash
cd backend
npm install
cp .env.example .env
# عدّل ملف .env بقيمك
npm run dev
```

3. **تثبيت Frontend** (في نافذة أخرى)
```bash
cd frontend
npm install
npm start
```

الخادم سيعمل على `http://localhost:5000`
التطبيق سيعمل على `http://localhost:3000`

---

## 📁 هيكل المشروع

```
backend/
├── src/
│   ├── models/          # نماذج قاعدة البيانات
│   ├── routes/          # المسارات
│   ├── controllers/     # معالجات المنطق
│   ├── middleware/      # البرامج الوسيطة
│   ├── services/        # خدمات الأعمال
│   ├── utils/           # دوال مساعدة
│   └── index.js
├── .env.example
└── package.json

frontend/
├── src/
│   ├── components/      # مكونات React
│   ├── pages/           # الصفحات
│   ├── services/        # خدمات API
│   ├── styles/          # أنماط CSS
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

---

## 🔧 أدوات التطوير

### Backend
- **Express.js** - إطار العمل الويب
- **MongoDB/Mongoose** - قاعدة البيانات
- **JWT** - المصادقة
- **Stripe** - الدفع
- **Nodemailer** - البريد الإلكتروني

### Frontend
- **React** - مكتبة الواجهة
- **React Router** - التوجيه
- **Axios** - طلبات HTTP
- **Tailwind CSS** - التصميم

---

## 📝 معايير الكود

### نمط التسمية

**Backend:**
- الملفات: `camelCase` (مثل: `userController.js`)
- الدوال: `camelCase` (مثل: `getUserProfile()`)
- المتغيرات: `camelCase` (مثل: `userId`)

**Frontend:**
- المكونات: `PascalCase` (مثل: `UserCard.js`)
- الملفات: `PascalCase` (مثل: `UserCard.js`)
- المتغيرات: `camelCase` (مثل: `userName`)

### التعليقات

```javascript
// تعليق بسيط
const userId = user._id; // حفظ معرف المستخدم

/**
 * وصف الدالة
 * @param {String} email - بريد المستخدم
 * @return {Object} بيانات المستخدم
 */
function getUserByEmail(email) {
  // ...
}
```

---

## 🌍 متغيرات البيئة

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paypal-credit-seller
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
EMAIL_USER=your@email.com
EMAIL_PASSWORD=your_password
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🧪 الاختبارات

### تشغيل الاختبارات
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📤 الكود

### Commit Messages

استخدم الصيغة التالية:
```
type(scope): subject

body

footer
```

**الأنواع:**
- `feat` - ميزة جديدة
- `fix` - إصلاح خطأ
- `docs` - توثيق
- `style` - أنماط
- `refactor` - إعادة هيكلة
- `test` - اختبارات
- `chore` - صيانة

**مثال:**
```
feat(auth): add two-factor authentication

- إضافة التحقق الثنائي
- إضافة OTP عبر البريد الإلكتروني

Closes #123
```

---

## 🔒 الأمان

### أفضل الممارسات

1. **التحقق من الإدخال**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // المعالجة
});
```

2. **تشفير البيانات الحساسة**
```javascript
const bcrypt = require('bcryptjs');

const hashedPassword = await bcrypt.hash(password, 10);
```

3. **استخدام JWT**
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

---

## 📊 نصائح الأداء

1. **استخدام الفهارس في قاعدة البيانات**
```javascript
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
```

2. **Pagination**
```javascript
const page = req.query.page || 1;
const limit = req.query.limit || 10;
const skip = (page - 1) * limit;

User.find().skip(skip).limit(limit);
```

3. **Caching**
```javascript
const redis = require('redis');
const client = redis.createClient();

// الحفظ في الذاكرة المؤقتة
client.setex('user:' + userId, 3600, JSON.stringify(user));
```

---

## 🚀 النشر

### نشر Backend

```bash
# إنشاء بناء الإنتاج
npm run build

# تشغيل الإنتاج
npm start
```

### نشر Frontend

```bash
# إنشاء بناء الإنتاج
npm run build

# اختبار الإنتاج محلياً
npm install -g serve
serve -s build
```

---

## 📞 الدعم

للأسئلة والمساعدة:
- 📧 البريد الإلكتروني: support@example.com
- 💬 GitHub Issues: https://github.com/dhDH9090/paypal-credit-seller/issues
- 📚 التوثيق: https://github.com/dhDH9090/paypal-credit-seller/wiki

---

آخر تحديث: يناير 2024

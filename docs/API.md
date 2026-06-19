# 📚 توثيق واجهات API

## الأساسيات

**URL الأساسي:** `http://localhost:5000/api`

جميع الطلبات يجب أن تحتوي على:
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (للمسارات المحمية)

---

## 🔐 المصادقة

### تسجيل دخول جديد
```
POST /auth/register
```

**Body:**
```json
{
  "name": "أحمد محمد",
  "email": "ahmad@example.com",
  "password": "SecurePassword123!",
  "phone": "+966501234567"
}
```

**الرد:**
```json
{
  "success": true,
  "message": "تم إنشاء الحساب بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "أحمد محمد",
    "email": "ahmad@example.com"
  }
}
```

### تسجيل دخول
```
POST /auth/login
```

**Body:**
```json
{
  "email": "ahmad@example.com",
  "password": "SecurePassword123!"
}
```

---

## 👥 المستخدمين

### الحصول على ملف المستخدم
```
GET /users/:id
```

**الرد:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "أحمد محمد",
    "email": "ahmad@example.com",
    "rating": 4.5,
    "reviews_count": 25,
    "balance": 5000
  }
}
```

### تحديث البيانات الشخصية
```
PUT /users/:id
```

**Body:**
```json
{
  "name": "أحمد محمد علي",
  "phone": "+966501234567",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## 💳 الطلبات (Orders)

### الحصول على قائمة الطلبات
```
GET /orders?status=completed&limit=10&page=1
```

**الرد:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "buyer": "507f1f77bcf86cd799439011",
      "seller": "507f1f77bcf86cd799439013",
      "amount": 100,
      "currency": "USD",
      "status": "completed",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "page": 1
}
```

### إنشاء طلب جديد
```
POST /orders
```

**Body:**
```json
{
  "seller": "507f1f77bcf86cd799439013",
  "amount": 100,
  "currency": "USD",
  "paymentMethod": "wallet"
}
```

### تحديث حالة الطلب
```
PUT /orders/:id
```

**Body:**
```json
{
  "status": "completed",
  "delivery_proof": "https://example.com/proof.jpg"
}
```

---

## 💰 المحفظة (Wallet)

### الحصول على الرصيد
```
GET /wallet
```

**الرد:**
```json
{
  "success": true,
  "wallet": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "balance": 5000,
    "pending_balance": 500,
    "total_earned": 15000,
    "total_spent": 10000,
    "currency": "USD"
  }
}
```

### سجل العمليات
```
GET /wallet/history?limit=20&page=1
```

### تحويل رصيد
```
POST /wallet/transfer
```

**Body:**
```json
{
  "recipient": "507f1f77bcf86cd799439015",
  "amount": 100,
  "description": "تحويل رصيد"
}
```

---

## ⭐ التقييمات

### إضافة تقييم
```
POST /reviews
```

**Body:**
```json
{
  "order_id": "507f1f77bcf86cd799439012",
  "target_user": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "تاجر موثوق وسريع جداً"
}
```

### الحصول على تقييمات المستخدم
```
GET /reviews/:userId
```

---

## 🔍 أكواد الأخطاء

| الكود | المعنى |
|------|--------|
| 200 | نجاح العملية ✅ |
| 201 | تم الإنشاء بنجاح ✅ |
| 400 | طلب غير صحيح ❌ |
| 401 | غير مصرح به ❌ |
| 403 | ممنوع الوصول ❌ |
| 404 | لم يتم العثور عليه ❌ |
| 500 | خطأ في الخادم ❌ |

---

## 📝 ملاحظات أمان

- ✅ استخدم HTTPS في الإنتاج
- ✅ لا تشارك التوكن
- ✅ انتهي صلاحية التوكن بعد 7 أيام
- ✅ استخدم رؤوس CORS الآمنة

---

آخر تحديث: يناير 2024

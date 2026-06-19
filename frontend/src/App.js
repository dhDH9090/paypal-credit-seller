import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>💳 بيع رصيد PayPal</h1>
          <p>التطبيق الموثوق لشراء وبيع رصيد PayPal</p>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <section className="welcome-section">
            <h2>مرحباً بك في التطبيق</h2>
            <p>قم بشراء وبيع رصيد PayPal بأمان وسهولة من خلال منصتنا الموثوقة.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>آمان عالي</h3>
                <p>حماية كاملة لبيانات المستخدمين والمعاملات</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>سرعة عالية</h3>
                <p>معاملات سريعة وفورية</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>أسعار جيدة</h3>
                <p>أفضل الأسعار في السوق</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>سهولة الاستخدام</h3>
                <p>واجهة بسيطة وسهلة الاستخدام</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary">تسجيل دخول</button>
              <button className="btn btn-secondary">إنشاء حساب جديد</button>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 تطبيق بيع رصيد PayPal - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}

export default App;

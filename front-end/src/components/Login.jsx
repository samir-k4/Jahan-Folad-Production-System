export default function Login({ onLogin }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8c2e25]">جهان فولاد</h1>
          <p className="text-gray-500 mt-2">سیستم مدیریت تولید</p>
        </div>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">ایمیل</label>
            <input
              type="email"
              required
              className="w-full border text-black rounded p-2 text-right bg-gray-100"
              dir="ltr"
              placeholder="admin@jahanfolad.af"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">رمز عبور</label>
            <input
              type="password"
              required
              className="w-full border text-black rounded p-2 text-right bg-gray-100"
              dir="ltr"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8c2e25] text-white p-2 rounded hover:bg-[#6a221c] transition duration-200"
          >
            ورود به سیستم
          </button>
        </form>
      </div>
    </div>
  );
}

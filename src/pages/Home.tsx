import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Star, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Học Toán Lớp 5
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Vui Vẻ & Hiệu Quả
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nền tảng học trực tuyến dành riêng cho học sinh lớp 5 vùng cao, 
            với hàng trăm câu hỏi thú vị và trợ lý AI thông minh.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/category"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Bắt Đầu Học Ngay
          </Link>
          <Link
            to="/create"
            className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            Tạo Câu Hỏi
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">3 Mức Độ</h3>
          <p className="text-gray-600">Dễ, Vừa, Khó - phù hợp với từng trình độ học sinh</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Trợ Lý AI</h3>
          <p className="text-gray-600">Chatbot thông minh hỗ trợ giải thích bài tập</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Hàng Trăm Câu Hỏi</h3>
          <p className="text-gray-600">Kho tàng câu hỏi phong phú, liên tục cập nhật</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Dành Cho Vùng Cao</h3>
          <p className="text-gray-600">Thiết kế đặc biệt cho học sinh vùng cao</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Thống Kê Nền Tảng
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">500+</div>
            <div className="text-gray-600">Câu Hỏi</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">3</div>
            <div className="text-gray-600">Mức Độ</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ Trợ AI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
            <div className="text-gray-600">Miễn Phí</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Sẵn Sàng Chinh Phục Toán Học?</h2>
        <p className="text-xl mb-6 opacity-90">
          Hãy bắt đầu hành trình học tập thú vị cùng chúng tôi!
        </p>
        <Link
          to="/category"
          className="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
        >
          Khám Phá Ngay
        </Link>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Trophy, ArrowRight } from 'lucide-react';
import { useQuestions } from '../contexts/QuestionContext';

const Category: React.FC = () => {
  const { getQuestionsByCategory } = useQuestions();

  const categories = [
    {
      id: 'easy',
      name: 'Dễ',
      level: 'easy' as const,
      description: 'Phép tính cơ bản, phù hợp cho việc ôn tập và làm quen',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: Brain,
      iconColor: 'text-green-600'
    },
    {
      id: 'medium',
      name: 'Vừa',
      level: 'medium' as const,
      description: 'Bài tập có tư duy, kết hợp nhiều phép tính',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: Zap,
      iconColor: 'text-yellow-600'
    },
    {
      id: 'hard',
      name: 'Khó',
      level: 'hard' as const,
      description: 'Bài tập nâng cao, yêu cầu tư duy logic cao',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: Trophy,
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Chọn Mức Độ Học Tập
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Khám phá các bài tập toán lớp 5 được phân loại theo mức độ từ dễ đến khó
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const Icon = category.icon;
          const questionCount = getQuestionsByCategory(category.level).length;
          
          return (
            <div
              key={category.id}
              className={`${category.bgColor} ${category.borderColor} border-2 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className={`bg-gradient-to-r ${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Mức Độ {category.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Question Count */}
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="bg-white px-3 py-1 rounded-full border">
                      {questionCount} câu hỏi
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/questions/${category.level}`}
                  className={`bg-gradient-to-r ${category.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}
                >
                  <span>Bắt Đầu Học</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Tổng Quan Câu Hỏi
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {categories.map((category) => {
            const questionCount = getQuestionsByCategory(category.level).length;
            return (
              <div key={category.id} className="text-center">
                <div className={`${category.iconColor} mb-2`}>
                  <category.icon className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {questionCount}
                </div>
                <div className="text-gray-600 text-sm">
                  Câu hỏi mức {category.name.toLowerCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
        <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          Lời Khuyên Học Tập
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-green-700 mb-2">Mức Dễ</div>
            <p className="text-gray-600">Bắt đầu từ những phép tính đơn giản để xây dựng nền tảng vững chắc.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-yellow-700 mb-2">Mức Vừa</div>
            <p className="text-gray-600">Kết hợp nhiều phép tính và áp dụng vào các tình huống thực tế.</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="font-semibold text-red-700 mb-2">Mức Khó</div>
            <p className="text-gray-600">Thử thách với các bài toán phức tạp, phát triển tư duy logic.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
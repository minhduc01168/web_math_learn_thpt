import React, { useState } from 'react';
import { Plus, Save, ArrowLeft } from 'lucide-react';
import { useQuestions } from '../contexts/QuestionContext';
import { Link } from 'react-router-dom';

const Create: React.FC = () => {
  const { addQuestion } = useQuestions();
  const [formData, setFormData] = useState({
    category: 'easy' as 'easy' | 'medium' | 'hard',
    question: '',
    answer: '',
    explanation: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const categories = [
    { value: 'easy', label: 'Dễ', color: 'green' },
    { value: 'medium', label: 'Vừa', color: 'yellow' },
    { value: 'hard', label: 'Khó', color: 'red' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Vui lòng nhập đầy đủ câu hỏi và đáp án!');
      return;
    }

    addQuestion({
      category: formData.category,
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      explanation: formData.explanation.trim() || undefined
    });

    // Reset form
    setFormData({
      category: 'easy',
      question: '',
      answer: '',
      explanation: ''
    });

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/category"
          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Tạo Câu Hỏi Mới
          </h1>
          <p className="text-gray-600">
            Thêm câu hỏi toán học vào kho tàng kiến thức
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Plus className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-green-800 font-semibold">Thành công!</p>
            <p className="text-green-700">Câu hỏi đã được thêm vào danh mục.</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mức độ khó <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Question Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Câu hỏi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập câu hỏi toán học..."
            />
          </div>

          {/* Answer Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Đáp án <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập đáp án..."
            />
          </div>

          {/* Explanation Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Lời giải (tùy chọn)
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập lời giải chi tiết..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Tạo Câu Hỏi</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      {formData.question && (
        <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Xem Trước Câu Hỏi
          </h2>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.category === 'easy' ? 'bg-green-100 text-green-700' :
                formData.category === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                Mức {categories.find(cat => cat.value === formData.category)?.label}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {formData.question}
            </h3>
            {formData.answer && (
              <p className="text-gray-600">
                <span className="font-medium">Đáp án:</span> {formData.answer}
              </p>
            )}
            {formData.explanation && (
              <p className="text-gray-600">
                <span className="font-medium">Lời giải:</span> {formData.explanation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          Hướng Dẫn Tạo Câu Hỏi
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <p className="text-blue-800">
              <span className="font-semibold">Câu hỏi rõ ràng:</span> Đảm bảo câu hỏi dễ hiểu và phù hợp với học sinh lớp 5.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <p className="text-blue-800">
              <span className="font-semibold">Đáp án chính xác:</span> Kiểm tra kỹ đáp án trước khi lưu.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <p className="text-blue-800">
              <span className="font-semibold">Lời giải chi tiết:</span> Giải thích từng bước để học sinh dễ hiểu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
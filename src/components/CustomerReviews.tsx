import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquarePlus, Quote } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerReviews: React.FC = () => {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState<Review[]>(CUSTOMER_REVIEWS);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    city: 'Lahore',
    comment: '',
    product: '14-in-1 Multifunctional Vegetable Chopper & Slicer',
    rating: 5,
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      showToast('Incomplete Review', 'Please fill name and feedback.', 'error');
      return;
    }

    const created: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      city: newReview.city,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: true,
      productPurchased: newReview.product,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };

    setReviews([created, ...reviews]);
    setShowAddReviewModal(false);
    showToast('Review Submitted! ⭐', 'Thank you for your valuable feedback.');
    setNewReview({
      name: '',
      city: 'Lahore',
      comment: '',
      product: '14-in-1 Multifunctional Vegetable Chopper & Slicer',
      rating: 5,
    });
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D30] mb-1">
              <span className="w-6 h-0.5 bg-[#F5A623]"></span>
              Customer Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#173D30] tracking-tight font-heading">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real Pakistani households sharing their daily experience with our kitchen essentials.
            </p>
          </div>

          <button
            onClick={() => setShowAddReviewModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#173D30] font-bold text-xs border border-stone-200 shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#F5A623]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 italic">
                  "{rev.comment}"
                </p>

                {/* Purchased product tag */}
                <div className="inline-block bg-stone-100 text-stone-600 text-[10px] font-semibold px-2.5 py-1 rounded-md mb-4 max-w-full truncate">
                  Purchased: {rev.productPurchased}
                </div>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-stone-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-stone-900 truncate">{rev.name}</p>
                    {rev.verified && (
                      <span title="Verified Buyer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">{rev.city} • <span className="text-stone-400">{rev.date}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-black text-[#173D30] font-heading mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              How did you like your purchase from Sasta Kitchen Bazar?
            </p>

            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sana Malik"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lahore / Rawalpindi"
                  value={newReview.city}
                  onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Star Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars - Good)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Review / Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Quality kaisi thi? Delivery time par aayi?"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="flex-1 py-2.5 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#173D30] text-white text-xs font-bold rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

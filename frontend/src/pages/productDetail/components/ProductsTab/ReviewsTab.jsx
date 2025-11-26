import React, { useState } from 'react';

const ReviewsTab = ({ product }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { reviews } = product;

  const StarRating = ({ rating, size = 'sm' }) => {
    const starSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const RatingDistribution = () => {
    const totalRatings = reviews.ratings.reduce((sum, rating) => sum + rating.count, 0);

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => {
          const rating = reviews.ratings.find(r => r.stars === stars);
          const percentage = rating ? (rating.count / totalRatings) * 100 : 0;

          return (
            <div key={stars} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-8">{stars} star</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500 w-12">
                {rating ? rating.count : 0}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {reviews.average.toFixed(1)}
            </div>
            <StarRating rating={Math.round(reviews.average)} size="lg" />
            <div className="text-sm text-gray-600 mt-1">
              {reviews.count.toLocaleString()} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4">Rating Distribution</h4>
            <RatingDistribution />
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Write Your Review</h4>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Summarize your experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Share your thoughts about this product..."
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Featured Reviews */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-6">Featured Reviews</h4>
        <div className="space-y-6">
          {reviews.featured.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <StarRating rating={review.rating} />
                    <span className="text-sm font-medium text-gray-900">
                      {review.title || 'Great Product!'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="font-medium">{review.user}</span>
                    {review.verified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified Purchase
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>Helpful (12)</span>
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Reviews */}
      <div className="text-center">
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsTab;
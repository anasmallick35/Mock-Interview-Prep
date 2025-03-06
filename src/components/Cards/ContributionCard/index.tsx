
import { Link } from 'react-router-dom';

const HorizontalCard = () => {
  return (
    <div className="w-full max-w-[48rem] flex flex-row rounded-lg shadow-lg overflow-hidden">
      <div className="w-2/5 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h6 className="text-sm text-gray-500 uppercase mb-4">Contribute & Earn Rewards</h6>
          <h4 className="text-2xl font-bold text-blue-gray-900 mb-2">
          Help others, and earn exciting rewards!
          </h4>
          <p className="text-gray-700 font-normal mb-8">
          Share your interview questions and help others prepare for success!. By contributing, you’ll earn reward points that can be redeemed for premium features, mock interviews, and more.
          </p>
        </div>
        <Link to="/upload" className="inline-block">
          <button className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors">
            Contribute
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HorizontalCard;
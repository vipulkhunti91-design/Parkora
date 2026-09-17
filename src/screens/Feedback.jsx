import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconStar } from '../components/icons';
import { PrimaryButton } from '../components/Button';
import { parkingSpots } from '../data/mockData';

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = parkingSpots.find((s) => s.id === id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/feedback/thanks');
  };

  return (
    <PhoneShell className="px-4 pt-4 pb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Give Feedback</h1>
      </div>

      {spot && <p className="text-white/60 text-sm mt-4">How was your experience at {spot.name}?</p>}

      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => setRating(n)} aria-label={`${n} star`}>
            <IconStar style={{ width: 30, height: 30 }} className={n <= rating ? 'text-yellow-400' : 'text-white/25'} />
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us more (optional)"
          rows={5}
          className="w-full rounded-2xl px-4 py-3.5 text-white placeholder-white/50 text-sm outline-none focus:ring-2 focus:ring-white/40 resize-none"
          style={{ background: 'var(--color-panel)' }}
        />
        <PrimaryButton type="submit" disabled={rating === 0}>
          Submit Feedback
        </PrimaryButton>
      </form>
    </PhoneShell>
  );
}

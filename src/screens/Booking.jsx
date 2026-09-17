import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconCar, IconBike, IconPin } from '../components/icons';
import { PrimaryButton } from '../components/Button';
import { parkingSpots } from '../data/mockData';
import { useApp } from '../context/AppContext';

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleType, setVehicleType, setBooking } = useApp();
  const spot = parkingSpots.find((s) => s.id === id) || parkingSpots[0];

  const [timeIn, setTimeIn] = useState('09:00 AM');
  const [duration, setDuration] = useState(2); // hours

  const total = (spot.price * duration).toFixed(2);

  const handleContinue = () => {
    setBooking({ spot, vehicleType, timeIn, duration, total });
    navigate('/payment');
  };

  return (
    <PhoneShell className="px-4 pt-4 pb-6 flex flex-col">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center justify-center rounded-2xl shrink-0"
          style={{ width: 37, height: 37, background: 'var(--color-panel)' }}
        >
          <IconArrowLeft className="text-white" />
        </button>
        <h1 className="text-white font-display font-bold text-lg">Booking Details</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar mt-2">
        <p className="text-white/70 text-sm mt-4">Choose a vehicle type</p>
        <div className="flex gap-3 mt-2">
          {[
            { key: 'car', label: 'Car', Icon: IconCar },
            { key: 'bike', label: 'Bike', Icon: IconBike },
          ].map(({ key, label, Icon }) => {
            const active = vehicleType === key;
            return (
              <button
                key={key}
                onClick={() => setVehicleType(key)}
                className="flex-1 flex flex-col items-center gap-1 rounded-2xl py-4"
                style={{ background: active ? '#fff' : 'var(--color-panel)' }}
              >
                <Icon style={{ color: active ? 'var(--color-navy-900)' : '#fff' }} />
                <span className="text-xs font-medium" style={{ color: active ? 'var(--color-navy-900)' : '#fff' }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-white/70 text-sm mt-5">Choose a time</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {TIME_SLOTS.map((t) => {
            const active = t === timeIn;
            return (
              <button
                key={t}
                onClick={() => setTimeIn(t)}
                className="rounded-xl py-2 text-xs font-medium"
                style={{ background: active ? '#fff' : 'var(--color-panel)', color: active ? 'var(--color-navy-900)' : '#fff' }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-5 rounded-2xl px-4 py-3" style={{ background: 'var(--color-panel)' }}>
          <span className="text-white/80 text-sm">Duration</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDuration((d) => Math.max(1, d - 1))}
              className="w-7 h-7 rounded-full bg-white/20 text-white text-lg leading-none"
            >
              −
            </button>
            <span className="text-white text-sm font-medium w-14 text-center">{duration} hr{duration > 1 ? 's' : ''}</span>
            <button
              onClick={() => setDuration((d) => Math.min(12, d + 1))}
              className="w-7 h-7 rounded-full bg-white/20 text-white text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-2xl px-4 py-3 mt-3" style={{ background: 'var(--color-panel)' }}>
          <p className="text-white/60 text-xs mb-1">Address</p>
          <p className="flex items-start gap-1.5 text-white text-sm">
            <IconPin className="shrink-0 mt-[3px]" />
            {spot.address}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-white/70 text-sm">Price</span>
          <span className="text-white font-display font-bold text-xl">₹{total}</span>
        </div>
      </div>

      <div className="pt-4 flex gap-3 shrink-0">
        <button
          onClick={() => navigate(`/direction/${spot.id}`)}
          className="flex-1 rounded-2xl py-3.5 font-semibold text-sm text-white border"
          style={{ borderColor: 'rgba(255,255,255,0.6)' }}
        >
          Direction
        </button>
        <PrimaryButton onClick={handleContinue} className="flex-1">
          Continue
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
}

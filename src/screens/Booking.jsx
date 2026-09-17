import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconCar, IconBike, IconPin, IconStar, IconRupee } from '../components/icons';
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
      {/* Top Bar Header */}
      <div className="flex items-center gap-3 shrink-0">
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

      <div className="flex-1 overflow-y-auto no-scrollbar mt-3">
        {/* Parking / Location Header Card with Real Image */}
        <div
          className="rounded-3xl p-3 flex gap-3 border border-white/10 shadow-lg"
          style={{ background: 'var(--color-panel)' }}
        >
          <div className="shrink-0 w-28 h-28 rounded-2xl overflow-hidden relative shadow-md">
            <img
              src={spot.photo}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
            <span
              className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md text-white"
              style={{ background: 'var(--color-good)' }}
            >
              {spot.status || 'OPEN'}
            </span>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <div className="flex items-start justify-between gap-1">
                <h2 className="font-bold text-white text-sm leading-tight truncate">{spot.name}</h2>
                <span className="flex items-center gap-0.5 text-white text-[11px] shrink-0">
                  <IconStar className="text-yellow-400" />
                  {spot.reviews || '5.2K'}
                </span>
              </div>

              <p className="flex items-start gap-1 text-white/70 text-[11px] mt-1 line-clamp-2">
                <IconPin className="shrink-0 mt-[2px]" />
                <span>{spot.shortAddress || spot.address}</span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
              <span className="text-white/80 text-[11px]">
                {spot.distance} · {spot.time}
              </span>
              <span className="flex items-center text-white font-bold text-xs">
                <IconRupee />
                {spot.price.toFixed(2)}/hr
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Selection */}
        <p className="text-white/80 font-semibold text-xs mt-5">Choose a vehicle type</p>
        <div className="flex gap-3 mt-2">
          {[
            { key: 'car', label: 'Car', Icon: IconCar },
            { key: 'bike', label: 'Bike', Icon: IconBike },
          ].map(({ key, label, Icon }) => {
            const active = vehicleType === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setVehicleType(key)}
                className="flex-1 flex flex-col items-center gap-1 rounded-2xl py-3.5 transition active:scale-95"
                style={{
                  background: active ? '#ffffff' : 'var(--color-panel)',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Icon style={{ color: active ? 'var(--color-navy-900)' : '#ffffff' }} />
                <span
                  className="text-xs font-bold"
                  style={{ color: active ? 'var(--color-navy-900)' : '#ffffff' }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time Selection */}
        <p className="text-white/80 font-semibold text-xs mt-5">Choose a start time</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {TIME_SLOTS.map((t) => {
            const active = t === timeIn;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTimeIn(t)}
                className="rounded-xl py-2 text-xs font-semibold transition active:scale-95"
                style={{
                  background: active ? '#ffffff' : 'var(--color-panel)',
                  color: active ? 'var(--color-navy-900)' : '#ffffff',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Duration Selection */}
        <div
          className="flex items-center justify-between mt-4 rounded-2xl px-4 py-3 border border-white/10"
          style={{ background: 'var(--color-panel)' }}
        >
          <span className="text-white/90 text-xs font-medium">Duration</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDuration((d) => Math.max(1, d - 1))}
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white text-base flex items-center justify-center font-bold"
            >
              −
            </button>
            <span className="text-white text-xs font-bold w-14 text-center">
              {duration} hr{duration > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={() => setDuration((d) => Math.min(12, d + 1))}
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white text-base flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price Card */}
        <div
          className="flex items-center justify-between mt-3 rounded-2xl px-4 py-3 border border-white/10"
          style={{ background: 'var(--color-panel)' }}
        >
          <span className="text-white/70 text-xs font-medium">Estimated Total</span>
          <span className="text-white font-display font-bold text-lg">₹{total}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex gap-3 shrink-0">
        <button
          type="button"
          onClick={() => navigate(`/direction/${spot.id}`)}
          className="flex-1 rounded-2xl py-3.5 font-semibold text-xs text-white border border-white/40 hover:bg-white/10 transition active:scale-95"
        >
          Direction
        </button>
        <PrimaryButton onClick={handleContinue} className="flex-1 py-3.5 text-xs">
          Continue to Pay
        </PrimaryButton>
      </div>
    </PhoneShell>
  );
}

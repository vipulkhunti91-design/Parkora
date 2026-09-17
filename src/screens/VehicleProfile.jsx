import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconCar, IconBike } from '../components/icons';
import { PrimaryButton, TextField } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function VehicleProfile() {
  const navigate = useNavigate();
  const { user, setUser, vehicleType, setVehicleType } = useApp();
  const [plate, setPlate] = useState(user.vehicle.plate);

  const handleSave = (e) => {
    e.preventDefault();
    setUser((u) => ({ ...u, vehicle: { type: vehicleType, plate } }));
    navigate('/loading?next=/profile&status=success&message=Vehicle saved');
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
        <h1 className="text-white font-display font-bold text-lg">My Vehicle</h1>
      </div>

      <p className="text-white/70 text-sm mt-6">Vehicle type</p>
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

      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSave}>
        <TextField label="Number plate" value={plate} onChange={(e) => setPlate(e.target.value)} required />
        <PrimaryButton type="submit" className="mt-2">
          Save Vehicle
        </PrimaryButton>
      </form>
    </PhoneShell>
  );
}

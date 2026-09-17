import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import { IconArrowLeft, IconCamera } from '../components/icons';
import { PrimaryButton, TextField } from '../components/Button';
import { useApp } from '../context/AppContext';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const [form, setForm] = useState({ ...user });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setUser((u) => ({ ...u, ...form }));
    navigate('/loading?next=/profile&status=success&message=Profile updated');
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
        <h1 className="text-white font-display font-bold text-lg">Edit Profile</h1>
      </div>

      <div className="flex justify-center mt-6">
        <div className="relative">
          <div
            className="rounded-full flex items-center justify-center text-3xl"
            style={{ width: 88, height: 88, background: 'var(--color-panel)' }}
          >
            🙂
          </div>
          <span
            className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, background: '#fff' }}
          >
            <IconCamera style={{ color: 'var(--color-navy-900)' }} />
          </span>
        </div>
      </div>

      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSave}>
        <TextField label="Full name" value={form.name} onChange={update('name')} required />
        <TextField label="Phone number" type="tel" value={form.phone} onChange={update('phone')} required />
        <TextField label="Email" type="email" value={form.email} onChange={update('email')} required />

        <PrimaryButton type="submit" className="mt-4">
          Save Changes
        </PrimaryButton>
      </form>
    </PhoneShell>
  );
}

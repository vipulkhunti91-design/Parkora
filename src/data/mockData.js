// Mock data for Parkora (PARK ORAA) — stands in for backend data.
// Photo URLs use royalty-free Unsplash source images purely as stand-ins
// for the parking-lot photography referenced in the Figma file.

export const currentUser = {
  id: 'u_1',
  name: 'Sana Mehta',
  phone: '9876543210',
  email: 'sana.mehta.demo@gmail.com',
  vehicle: { type: 'car', plate: 'GJ 01 AB 1234' },
};

export const parkingSpots = [
  {
    id: 'p_mk',
    name: 'MK Car Parking',
    address: '3C7Q+WPV MK Car Parking, Gujarat 382115',
    shortAddress: 'Faculty Car Parking, Gujarat 382115',
    distance: '56 M',
    time: '1 min',
    distanceKm: 0.056,
    price: 15,
    rating: 4.6,
    reviews: '5.2K',
    status: 'OPEN',
    hours: '9 AM TO 9 PM',
    photo: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=60',
    security: { guard: 'Raj Singh', guardPhone: '9876543210', officeNumber: '8741265980' },
    amenities: [
      { label: 'CCTV Cameras', ok: true },
      { label: 'Fire safety', ok: true },
      { label: 'Parking Light', ok: true },
      { label: 'Multiple Exit', ok: false },
    ],
  },
  {
    id: 'p_rbmehta',
    name: 'RB MEHTA\u2019s private parking',
    address: 'RB MEHTA\u2019s private parking, Shilaj, Gujarat 380059',
    shortAddress: 'RB MEHTA\u2019s private parking, Shilaj, Gujarat 380059',
    distance: '2 M',
    time: '10 min',
    distanceKm: 2,
    price: 25,
    rating: 4.0,
    reviews: '4.0K',
    status: 'OPEN',
    hours: '6 AM TO 11 PM',
    photo: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=600&q=60',
    security: { guard: 'Vijay Patel', guardPhone: '9812345670', officeNumber: '8741265981' },
    amenities: [
      { label: 'CCTV Cameras', ok: true },
      { label: 'Fire safety', ok: false },
      { label: 'Parking Light', ok: true },
      { label: 'Multiple Exit', ok: true },
    ],
  },
  {
    id: 'p_atal',
    name: 'Car Parking- Atal Bridge Riverfront',
    address: 'AMC Multi Storey Car, Bhadra, Ahmedabad, Gujarat 380001',
    shortAddress: 'AMC Multi Storey Car, Bhadra, Ahmedabad, Gujarat 380001',
    distance: '2 Km',
    time: '15 min',
    distanceKm: 2,
    price: 15,
    rating: 5.2,
    reviews: '5.2K',
    status: 'OPEN',
    hours: '24 Hours',
    photo: 'https://images.unsplash.com/photo-1590674899484-13d6c6e3f8e6?w=600&q=60',
    security: { guard: 'Amit Shah', guardPhone: '9898989898', officeNumber: '8741265982' },
    amenities: [
      { label: 'CCTV Cameras', ok: true },
      { label: 'Fire safety', ok: true },
      { label: 'Parking Light', ok: true },
      { label: 'Multiple Exit', ok: true },
    ],
  },
  {
    id: 'p_amc',
    name: 'AMC Multi Storey Car Parking',
    address: 'AMC Multi Storey Car, Bhadra, Ahmedabad, Gujarat 380001',
    shortAddress: 'AMC Multi Storey Car, Bhadra, Ahmedabad, Gujarat 380001',
    distance: '3 Km',
    time: '30 min',
    distanceKm: 3,
    price: 30,
    rating: 5.0,
    reviews: '5.0K',
    status: 'OPEN',
    hours: '9 AM TO 9 PM',
    photo: 'https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?w=600&q=60',
    security: { guard: 'Kiran Joshi', guardPhone: '9765432109', officeNumber: '8741265983' },
    amenities: [
      { label: 'CCTV Cameras', ok: true },
      { label: 'Fire safety', ok: true },
      { label: 'Parking Light', ok: false },
      { label: 'Multiple Exit', ok: true },
    ],
  },
];

export const recentSearches = [
  'AMC Multi Storey Car Parking',
  'Atal Bridge Riverfront',
  'RB MEHTA\u2019s private parking',
  'MK Car Parking',
];

export const paymentMethods = [
  { id: 'phonepe', label: 'Phone Pe' },
  { id: 'paytm', label: 'Pay tm' },
  { id: 'gpay', label: 'Google Pay' },
];

export const historyItems = [
  {
    id: 'h_1',
    spotName: 'AMC Multi Storey Car Parking',
    time: '10-12 AM',
    pay: 15,
    date: '24-Mar-2026',
    slot: 'A12',
    filter: 'Last 7 Days',
  },
  {
    id: 'h_2',
    spotName: 'Ahmedabad Airport',
    time: '01-03 PM',
    pay: 50,
    date: '20-Mar-2026',
    slot: 'B04',
    filter: 'Last 7 Days',
  },
  {
    id: 'h_3',
    spotName: 'MK Car Parking',
    time: '09-11 AM',
    pay: 15,
    date: '02-Mar-2026',
    slot: 'A02',
    filter: 'Last mon',
  },
  {
    id: 'h_4',
    spotName: 'RB MEHTA\u2019s private parking',
    time: '04-06 PM',
    pay: 25,
    date: '18-Feb-2026',
    slot: 'C09',
    filter: 'Last mon',
  },
];

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: '\u0939\u093f\u0902\u0926\u0940 (Hindi)' },
  { code: 'gu', label: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0 (Gujarati)' },
  { code: 'mr', label: '\u092e\u0930\u093e\u0920\u0940 (Marathi)' },
  { code: 'ta', label: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (Tamil)' },
];

export const notifications = [
  {
    id: 'n_1',
    kind: 'alert',
    title: 'Near by Parking Alerts',
    body: 'Get Alerts When Parking is Available Near You',
  },
  {
    id: 'n_2',
    kind: 'feedback',
    title: 'Feedback Submitted',
    body: 'Thank You For Sharing Your Thoughts',
  },
  {
    id: 'n_3',
    kind: 'payment',
    title: 'Payment Updates',
    body: 'Stay Informed About Successful Payments',
  },
];

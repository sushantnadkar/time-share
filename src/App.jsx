import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";
import heroImage from "./assets/banner-logo.jpeg";
import logo from "./assets/logo.jpeg";
import setup1 from "./assets/setup-1.jpeg";
import setup2 from "./assets/setup-2.jpeg";
import setup3 from "./assets/setup-3.jpeg";
import setup4 from "./assets/setup-4.jpeg";
import fc25 from "./assets/fc25.png";
import wwe25 from "./assets/wwe25.png";
import gta5 from "./assets/gta5.png";
import godOfWar from "./assets/god-of-war.png";
import mortalKombat from "./assets/mortal-kombat.png";
import itTakesTwo from "./assets/it-takes-two.png";
import asphalt from "./assets/asphalt.png";
import aWayOut from "./assets/a-way-out.png";

const SESSION_KEY = "time_share_admin";
const HOURLY_RATE_PER_PLAYER = 60;
const MAX_PLAYERS = 4;
const MAX_SESSION_HOURS = 4;
const OPEN_HOUR = 10;
const CLOSE_HOUR = 24;
const DEFAULT_SETTINGS = {
  upiId: "placeofvirtuality@upi",
  upiName: "POV Gaming",
  telegramEnabled: false,
  resendEnabled: false,
  fast2smsEnabled: false,
  activeConsoles: 2,
};

const stations = [
  {
    id: "ps-01",
    name: "PS5 Console A",
    zone: "Main Console Zone",
    specs: "PS5, 55in OLED, two DualSense controllers",
  },
  {
    id: "ps-02",
    name: "PS5 Console B",
    zone: "Main Console Zone",
    specs: "PS5, 55in OLED, couch seating",
  },
];

const games = [
  {
    src: fc25,
    label: "Fifa 25",
  },
  {
    src: wwe25,
    label: "WWE 2K25",
  },
  {
    src: gta5,
    label: "GTA V",
  },
  {
    src: godOfWar,
    label: "God Of War",
  },
  {
    src: mortalKombat,
    label: "Mortal Kombat",
  },
  {
    src: itTakesTwo,
    label: "It Takes Two",
  },
  {
    src: asphalt,
    label: "Asphalt",
  },
  {
    src: aWayOut,
    label: "A Way Out",
  },
];

const seedBookings = [
  {
    id: "bk-101",
    bookingId: "POV-101",
    playerName: "Ahsan",
    mobile: "9876543210",
    visitDate: todayValue(),
    stationId: "ps-01",
    startsAt: "11:00",
    duration: 120,
    playerCount: 2,
    amount: 240,
    utr: "123456789012",
    paymentStatus: "verified",
    status: "confirmed",
  },
  {
    id: "bk-102",
    bookingId: "POV-102",
    playerName: "Aleena",
    mobile: "9876500011",
    visitDate: todayValue(),
    stationId: "ps-02",
    startsAt: "15:30",
    duration: 60,
    playerCount: 3,
    amount: 180,
    utr: "234567890123",
    paymentStatus: "pending_verification",
    status: "pending",
  },
  {
    id: "bk-103",
    bookingId: "POV-103",
    playerName: "Patrick",
    mobile: "9876500022",
    visitDate: todayValue(),
    stationId: "ps-01",
    startsAt: "18:00",
    duration: 180,
    playerCount: 4,
    amount: 720,
    utr: "345678901234",
    paymentStatus: "pending_verification",
    status: "pending",
  },
];

function makeDemoToken() {
  return `demo.${btoa(
    JSON.stringify({
      role: "admin",
      name: "Cafe Admin",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
    }),
  ).replaceAll("=", "")}.signature`;
}

function readJwtClaims(token) {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

async function adminLogin(email, password) {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  const role =
    data.user?.user_metadata?.role ??
    readJwtClaims(data.session.access_token)?.role;

  if (role !== "admin") {
    await supabase.auth.signOut();
    throw new Error("This account does not have admin access.");
  }

  return {
    token: data.session.access_token,
    role,
    name: data.user?.user_metadata?.full_name ?? data.user?.email ?? "Admin",
  };
}

function mapBooking(row) {
  return {
    id: row.id,
    bookingId: row.booking_id ?? row.id,
    playerName: row.player_name,
    mobile: row.mobile,
    visitDate:
      row.visit_date ?? new Date(row.starts_at).toISOString().slice(0, 10),
    stationId: row.console_id ?? row.station_id,
    startsAt: row.arrival_time?.slice(0, 5) ?? toLocalTimeValue(row.starts_at),
    duration: row.duration_minutes,
    playerCount: row.players ?? row.player_count,
    amount: row.amount ?? row.total_amount,
    utr: row.utr ?? "",
    paymentStatus: row.payment_status ?? "pending_verification",
    status: row.booking_status ?? row.status,
  };
}

function toLocalTimeValue(value) {
  const date = new Date(value);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
}

function makeStartsAtIso(date, time) {
  const [hours, minutes] = time.split(":").map(Number);
  const startsAt = new Date(`${date}T00:00:00`);
  startsAt.setHours(hours, minutes, 0, 0);
  return startsAt.toISOString();
}

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

function bookingTotal(duration, playerCount) {
  return (duration / 60) * playerCount * HOURLY_RATE_PER_PLAYER;
}

function generateBookingId() {
  return `POV-${Date.now().toString().slice(-6)}`;
}

function maxDurationForStart(startsAt) {
  const minutesUntilClose = CLOSE_HOUR * 60 - timeToMinutes(startsAt);
  return Math.max(30, Math.min(MAX_SESSION_HOURS * 60, minutesUntilClose));
}

function bookingOverlapsRequest(booking, visitDate, startsAt, duration) {
  if (booking.visitDate !== visitDate || booking.status === "cancelled") {
    return false;
  }

  const requestStart = timeToMinutes(startsAt);
  const requestEnd = requestStart + duration;
  const bookingStart = timeToMinutes(booking.startsAt);
  const bookingEnd = bookingStart + booking.duration;

  return requestStart < bookingEnd && requestEnd > bookingStart;
}

function findAvailableStation(
  bookings,
  activeStations,
  visitDate,
  startsAt,
  duration,
) {
  return activeStations.find(
    (station) =>
      !bookings.some(
        (booking) =>
          booking.stationId === station.id &&
          bookingOverlapsRequest(booking, visitDate, startsAt, duration),
      ),
  );
}

function makeUpiLink({ amount, bookingId, settings }) {
  const params = new URLSearchParams({
    pa: settings.upiId,
    pn: settings.upiName,
    am: String(amount),
    cu: "INR",
    tn: `POV booking ${bookingId}`,
  });

  return `upi://pay?${params.toString()}`;
}

function App() {
  const [adminSession, setAdminSession] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });
  const [bookings, setBookings] = useState(seedBookings);
  const [activeView, setActiveView] = useState("public");
  const [selectedDate, setSelectedDate] = useState(todayValue());
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const activeStations = useMemo(
    () => stations.slice(0, settings.activeConsoles),
    [settings.activeConsoles],
  );

  useEffect(() => {
    if (adminSession)
      localStorage.setItem(SESSION_KEY, JSON.stringify(adminSession));
    else localStorage.removeItem(SESSION_KEY);
  }, [adminSession]);

  useEffect(() => {
    if (!supabase || !adminSession || adminSession.token.startsWith("demo."))
      return undefined;

    let cancelled = false;

    async function loadBookings() {
      const start = new Date(`${selectedDate}T00:00:00`).toISOString();
      const endDate = new Date(`${selectedDate}T00:00:00`);
      endDate.setDate(endDate.getDate() + 1);

      const { data, error } = await supabase
        .from("bookings")
        .select(
          "id, booking_id, player_name, mobile, visit_date, console_id, arrival_time, starts_at, duration_minutes, players, amount, utr, payment_status, booking_status",
        )
        .gte("starts_at", start)
        .lt("starts_at", endDate.toISOString())
        .order("starts_at", { ascending: true });

      if (!cancelled && !error && data) setBookings(data.map(mapBooking));
    }

    loadBookings();

    const channel = supabase
      .channel("time-share-bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        loadBookings,
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [adminSession, selectedDate]);

  async function createBooking(payload) {
    const assignedStation = findAvailableStation(
      bookings,
      activeStations,
      payload.bookingDate,
      payload.startsAt,
      payload.duration,
    );

    if (!assignedStation) {
      return {
        ok: false,
        message:
          "All consoles are booked for this slot. Please choose another time.",
      };
    }

    const bookingId = payload.bookingId ?? generateBookingId();
    const amount = bookingTotal(payload.duration, payload.playerCount);
    const booking = {
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingId,
      visitDate: payload.bookingDate,
      stationId: assignedStation.id,
      amount,
      paymentStatus: "pending_verification",
      status: "pending",
      ...payload,
    };

    if (supabase) {
      const { error } = await supabase.from("bookings").insert({
        booking_id: bookingId,
        player_name: payload.playerName,
        mobile: payload.mobile,
        visit_date: payload.bookingDate,
        console_id: assignedStation.id,
        arrival_time: payload.startsAt,
        duration_minutes: payload.duration,
        players: payload.playerCount,
        amount,
        utr: payload.utr,
        payment_status: "pending_verification",
        booking_status: "pending",
      });

      if (error) {
        return { ok: false, message: error.message };
      }
    }

    setBookings((current) => [booking, ...current]);
    return { ok: true, booking };
  }

  async function updateBookingStatus(id, status) {
    const paymentStatus =
      status === "confirmed" ? "verified" : "pending_verification";
    if (supabase && adminSession && !adminSession.token.startsWith("demo.")) {
      await supabase
        .from("bookings")
        .update({ booking_status: status, payment_status: paymentStatus })
        .eq("id", id);
    }

    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status, paymentStatus } : booking,
      ),
    );
  }

  function logout() {
    setAdminSession(null);
    setActiveView("public");
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(74,222,128,0.12),transparent_26%),linear-gradient(135deg,#070b12_0%,#0e1726_54%,#070b12_100%)]" />
      <Header
        activeView={activeView}
        adminSession={adminSession}
        onAdminLogin={setAdminSession}
        onDemoAdmin={() => {
          setAdminSession({
            role: "admin",
            name: "Cafe Admin",
            token: makeDemoToken(),
          });
          setActiveView("admin");
        }}
        onLogout={logout}
        onViewChange={setActiveView}
      />

      {activeView === "admin" && adminSession ? (
        <AdminPanel
          bookings={bookings}
          selectedDate={selectedDate}
          settings={settings}
          stations={activeStations}
          onDateChange={setSelectedDate}
          onSettingsChange={setSettings}
          onStatusChange={updateBookingStatus}
        />
      ) : (
        <PublicWebsite
          bookings={bookings}
          onBook={createBooking}
          settings={settings}
          stations={activeStations}
        />
      )}
    </main>
  );
}

function Header({
  activeView,
  adminSession,
  onAdminLogin,
  onDemoAdmin,
  onLogout,
  onViewChange,
}) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b12]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => onViewChange("public")}
        >
          <span className="grid h-11 w-11 place-items-center rounded bg-cyan-300 text-lg font-black text-slate-950">
            <img src={logo} alt="Logo" />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-wide">
              Your POV Gaming Cafe
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-slate-300">
              PS5 sessions by the hour
            </span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap items-center gap-6">
            <a href="#pricing" className="nav-link">
              Pricing
            </a>

            <a href="#games" className="nav-link">
              Games
            </a>

            <a href="#setup" className="nav-link">
              Setup
            </a>

            <a href="#book" className="nav-link">
              Book Now
            </a>

            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
          {adminSession ? (
            <>
              <button
                className="rounded bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
                onClick={() => onViewChange("admin")}
              >
                Admin
              </button>
              <button
                className="rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                onClick={onLogout}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="rounded border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
              onClick={() => setShowLogin(true)}
            >
              Admin login
            </button>
          )}
        </div>
      </div>

      {showLogin && (
        <AdminLoginPanel
          onClose={() => setShowLogin(false)}
          onDemo={() => {
            onDemoAdmin();
            setShowLogin(false);
          }}
          onLogin={(nextSession) => {
            onAdminLogin(nextSession);
            onViewChange("admin");
            setShowLogin(false);
          }}
        />
      )}
    </header>
  );
}

function AdminLoginPanel({ onClose, onDemo, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const nextSession = await adminLogin(email, password);
      if (!nextSession)
        throw new Error("Add Supabase env vars or use demo admin.");
      onLogin(nextSession);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute right-4 top-20 w-[calc(100vw-2rem)] max-w-md rounded border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-black/50 sm:right-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold">Admin login</h2>
        <button
          className="rounded px-2 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <form className="space-y-3" onSubmit={submit}>
        <input
          className="field"
          placeholder="admin@timeshare.local"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="field"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && (
          <p className="rounded border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </p>
        )}
        <button
          className="w-full rounded bg-cyan-300 px-4 py-2 font-bold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <button
        className="mt-3 w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
        onClick={onDemo}
      >
        Open demo admin
      </button>
    </div>
  );
}

// function PublicWebsite({ bookings, onBook, stations }) {
//   return (
//     <div>
//       <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
//         <a
//           href="#book"
//           className="block rounded-xl bg-cyan-300 py-4 text-center font-black text-black"
//         >
//           Book Your Slot
//         </a>
//       </div>
//       <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_460px] lg:items-center lg:px-8 lg:py-16">
//         <div>
//           <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-cyan-100/80">
//             Console gaming cafe
//           </p>
//           <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
//             Book a PS5 slot, walk in, and start playing.
//           </h1>
//           <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
//             Time Share is built for quick FIFA runs, weekend tournaments, and
//             couch co-op sessions. No signup required. Pick your start time,
//             duration, and player count.
//           </p>
//           <div className="mt-7 flex flex-wrap gap-3">
//             <a
//               className="rounded bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
//               href="#book"
//             >
//               Book a time slot
//             </a>
//             <a
//               className="rounded border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
//               href="#pricing"
//             >
//               View pricing
//             </a>
//           </div>
//           <div className="mt-8 grid gap-3 sm:grid-cols-3">
//             <div className="mt-8">
//               <div className="flex flex-wrap gap-3">
//                 <Metric label="Rate" value="₹60/hr" />
//                 <Metric label="Players" value="1-4" />
//                 <Metric label="Session" value="30 min step" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <HeroConsoleCard />
//       </section>
//       <section
//         id="booking-form"
//         className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8"
//       >
//         <BookingForm onBook={onBook} stations={stations} />
//       </section>
//       <section
//         id="games"
//         className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
//       >
//         <h2 className="text-4xl font-black text-white">Popular Games</h2>

//         <p className="mt-3 text-slate-400">
//           Multiplayer, sports, racing and action titles.
//         </p>

//         <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {games.map((game) => (
//             <div
//               key={game}
//               className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06]"
//             >
//               <div className="mb-3 h-36 rounded-lg bg-slate-800 flex items-center justify-center">
//                 Cover Art
//               </div>

//               <p className="text-lg font-black">{game}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section
//         className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
//         id="book"
//       >
//         <div className="grid gap-6 lg:grid-cols-[1fr_460px]">
//           <div>
//             <h2 className="text-3xl font-black text-white">Available setups</h2>
//             <div className="mt-5 grid gap-4 md:grid-cols-2">
//               {stations.map((station) => {
//                 const activeBooking = bookings.find((booking) => {
//                   if (booking.stationId !== station.id) return false;

//                   const start = timeToMinutes(booking.startsAt);
//                   const end = start + booking.duration;

//                   const now =
//                     new Date().getHours() * 60 + new Date().getMinutes();

//                   return now >= start && now < end;
//                 });

//                 return (
//                   <div
//                     key={station.id}
//                     className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40"
//                   >
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-xl font-black">{station.name}</h3>

//                       <span
//                         className={`rounded-full px-3 py-1 text-xs ${
//                           activeBooking
//                             ? "bg-rose-500/20 text-rose-200"
//                             : "bg-emerald-500/20 text-emerald-200"
//                         }`}
//                       >
//                         {activeBooking ? "Busy" : "Available"}
//                       </span>
//                     </div>

//                     <p className="mt-4 text-slate-300">{station.specs}</p>
//                   </div>
//                 );
//               })}
//             </div>
//             {/* <TodayPreview bookings={bookings} stations={stations} /> */}
//           </div>
//           <section className="border-y border-white/10 bg-black/20">
//             <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//               <h2 className="text-4xl font-black">Operating Hours</h2>

//               <div className="mt-8 grid gap-4 md:grid-cols-2">
//                 <div className="rounded-xl border border-white/10 p-6">
//                   <p className="text-cyan-300">Monday - Friday</p>

//                   <p className="mt-2 text-3xl font-black">
//                     10:00 AM - 10:00 PM
//                   </p>
//                 </div>

//                 <div className="rounded-xl border border-white/10 p-6">
//                   <p className="text-cyan-300">Saturday - Sunday</p>

//                   <p className="mt-2 text-3xl font-black">
//                     10:00 AM - 11:00 PM
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </section>
//       <section id="contact" className="border-t border-white/10">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-black">Visit Us</h2>

//           <div className="mt-6 rounded-xl border border-white/10 p-6">
//             <p>Shop No. 06</p>
//             <p>Vishwamitri Building</p>
//             <p>Lokgram, Kalyan East</p>
//             <p>Maharashtra 421306</p>

//             <a
//               className="mt-6 inline-flex rounded-lg bg-cyan-300 px-5 py-3 font-black text-slate-950"
//               href="https://maps.google.com"
//               rel="noreferrer"
//               target="_blank"
//             >
//               Get Directions
//             </a>
//             <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
//               <div className="flex h-[350px] items-center justify-center bg-slate-900">
//                 Google Maps Embed
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section id="contact" className="border-t border-white/10">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-black">Operating Hours</h2>

//           <div className="mt-4 grid gap-4 md:grid-cols-2">
//             <div className="rounded-xl border border-white/10 p-4">
//               <p className="text-cyan-300">Monday - Friday</p>

//               <p className="mt-2 font-bold">10 AM - 10 PM</p>
//             </div>

//             <div className="rounded-xl border border-white/10 p-4">
//               <p className="text-cyan-300">Saturday - Sunday</p>

//               <p className="mt-2 font-bold">10 AM - 11 PM</p>
//             </div>
//           </div>
//         </div>
//       </section>
//       <footer className="m-4">
//         <div className="mt-8 flex flex-wrap gap-4">
//           <button className="social-btn">Instagram</button>

//           <button className="social-btn">Twitter</button>

//           <a
//             href="https://wa.me/919999999999"
//             className="rounded-lg bg-green-500 px-5 py-3 font-bold text-black"
//           >
//             WhatsApp Us
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function HeroConsoleCard() {
//   return (
//     <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black/30">
//       <img
//         src={heroImage}
//         alt="Gaming Cafe"
//         className="h-[520px] w-full object-contain"
//       />

//       <div className="p-6">
//         <h3 className="text-3xl font-black">Premium PS5 Experience</h3>

//         <p className="mt-3 text-slate-300">
//           Comfortable seating, OLED displays, multiplayer gaming, tournaments
//           and more.
//         </p>
//       </div>
//     </div>
//   );
// }

function PublicWebsite({ bookings, onBook, settings, stations }) {
  return (
    <div>
      <HeroSection />
      <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
        <a
          href="#book"
          className="block rounded-xl bg-cyan-300 py-4 text-center font-black text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          Book Your Slot
        </a>
      </div>
      <section
        className="border-y border-white/10 bg-white/[0.035]"
        id="pricing"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <InfoCard title="Simple rate" value="Rs 60/hr/player">
            Pricing stays the same for 1 to 4 players. You only pay for player
            count and session duration.
          </InfoCard>
          <InfoCard title="Session slots" value="30 min to 2 hr">
            Choose from 30 minutes, 1 hour, 1 hour 30 minutes, or 2 hours.
          </InfoCard>
          <InfoCard title="Auto console" value="No manual picking">
            The system assigns an available console and prevents double
            bookings.
          </InfoCard>
        </div>
      </section>
      <section
        id="book"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <BookingForm
            bookings={bookings}
            onBook={onBook}
            settings={settings}
            stations={stations}
          />
          <LiveAvailability bookings={bookings} stations={stations} />
        </div>
      </section>
      <section
        id="setup"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-black">Gaming Stations</h2>

        <p className="mt-2 text-slate-300">
          Premium PS5 setups with OLED displays and multiplayer seating.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {stations.map((station, index) => {
            const now = new Date().getHours() * 60 + new Date().getMinutes();
            const activeBooking = bookings.find((booking) => {
              if (booking.stationId !== station.id) return false;
              if (
                booking.visitDate !== todayValue() ||
                booking.status === "cancelled"
              )
                return false;

              const start = timeToMinutes(booking.startsAt);
              const end = start + booking.duration;

              return now >= start && now < end;
            });

            return (
              <div
                key={station.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-cyan-300/50 hover:bg-white/[0.07] hover:-translate-y-1"
              >
                <div className="h-48 bg-slate-800">
                  <img
                    src={[setup1, setup2][index % 2]}
                    alt={station.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black">{station.name}</h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${activeBooking ? "bg-rose-500/20 text-rose-200" : "bg-emerald-500/20 text-emerald-200"}`}
                    >
                      {activeBooking ? "Busy" : "Available"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-300">{station.specs}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section
        id="games"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-black">Popular Games</h2>

          {/* <a href="#" className="text-cyan-300 hover:text-cyan-200">
            View all games
          </a> */}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <div
              className=" group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-cyan-300/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:-translate-y-1"
              key={game.label}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={game.src}
                  alt={game.label}
                  className=" h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <p className="font-black text-cyan-100">{game.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <VisitSection />
    </div>
  );
}

function VisitSection() {
  return (
    <section id="contact" className="border-t border-white/10">
      {" "}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        <div className="mb-12">
          {" "}
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Visit Us{" "}
          </p>
          <h2 className="mt-2 text-4xl font-black text-white">
            Your Next Gaming Session Starts Here
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Drop by for quick FIFA matches, weekend tournaments, couch co-op
            sessions, and the latest PS5 games.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_420px]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">Location</h3>

            <div className="mt-4 space-y-2 text-slate-300">
              <p>Shop No. 06</p>
              <p>Vishwamitri Building</p>
              <p>Lokgram, Kalyan East</p>
              <p>Maharashtra 421306</p>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200"
            >
              Get Directions
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">Operating Hours</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-slate-300">Monday - Friday</span>

                <span className="font-bold">10 AM - 10 PM</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Saturday - Sunday</span>

                <span className="font-bold">10 AM - 11 PM</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="mb-3 font-bold">Contact</h4>

              <div className="space-y-2 text-slate-300">
                <p>+91 89764 09848</p>
                <p>placeofvirtuality@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/[0.04]">
            <iframe
              title="Your POV Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2042834087256!2d73.12599947634527!3d19.229926747120068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7950053d96477%3A0x7f056144548a7667!2sYour%20POV%20Place%20of%20Virtuality!5e0!3m2!1sen!2sin!4v1781457165579!5m2!1sen!2sin"
              className="h-[320px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-black">Stay Connected</h3>

              <p className="mt-2 text-slate-300">
                Follow us for tournaments, new game launches, and special
                offers.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/placeofvirtuality/"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                Instagram
              </a>

              <a
                href="https://wa.me/9403838656"
                className="rounded-xl bg-green-500 px-6 py-3 font-black text-black transition hover:-translate-y-1 hover:bg-green-400"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {" "}
      <div className="grid gap-10 lg:grid-cols-[1fr_620px] lg:items-center">
        {" "}
        <div>
          {" "}
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
            Console Gaming Cafe{" "}
          </p>
          <h1 className="text-5xl font-black leading-tight text-white lg:text-7xl">
            Play The Latest
            <br />
            PS5 Games
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Premium gaming lounge in Kalyan with OLED displays, multiplayer
            gaming, tournaments, and comfortable seating.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#book"
              className="rounded-xl bg-cyan-300 px-6 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200"
            >
              Book Your Slot
            </a>

            <a
              href="#games"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Browse Games
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2">
              ₹60/hr
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2">
              1-4 Players
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2">
              30 Min Sessions
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}

function HeroCarousel() {
  const images = [
    {
      src: setup1,
      label: "Premium Lounge Seating",
    },
    {
      src: setup2,
      label: "Latest PS5 Games",
    },
    {
      src: setup3,
      label: "55' Screen Display",
    },
    {
      src: setup4,
      label: "Multiplayer Gaming",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 10_000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
      <div className="relative h-[550px]">
        {images.map((image, index) => (
          <img
            key={image.label}
            src={image.src}
            alt={image.label}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-6 left-6">
          <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur">
            {images[activeIndex].label}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-cyan-300" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroConsoleCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-black/30">
      <img
        src={heroImage}
        alt="Gaming Cafe"
        className="h-[520px] w-full object-contain"
      />

      <div className="p-6">
        <h3 className="text-3xl font-black">Premium PS5 Experience</h3>

        <p className="mt-3 text-slate-300">
          Comfortable seating, OLED displays, multiplayer gaming, tournaments
          and more.
        </p>
      </div>
    </div>
  );
}

function LiveAvailability({ bookings, stations }) {
  const now = new Date().getHours() * 60 + new Date().getMinutes();

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-white/[0.04] p-6 shadow-[0_0_25px_rgba(34,211,238,0.1)]">
      {" "}
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
        Live Availability{" "}
      </p>
      <h3 className="mt-2 text-2xl font-black">Available Now</h3>
      <div className="mt-6 space-y-4">
        {stations.map((station) => {
          const activeBooking = bookings.find((booking) => {
            if (booking.stationId !== station.id) {
              return false;
            }
            if (
              booking.visitDate !== todayValue() ||
              booking.status === "cancelled"
            ) {
              return false;
            }

            const start = timeToMinutes(booking.startsAt);

            const end = start + booking.duration;

            return now >= start && now < end;
          });

          return (
            <div
              key={station.id}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{station.name}</span>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    activeBooking
                      ? "bg-rose-500/20 text-rose-200"
                      : "bg-emerald-500/20 text-emerald-200"
                  }`}
                >
                  {activeBooking ? "Busy" : "Available"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookingForm({ bookings, onBook, settings, stations }) {
  const [playerName, setPlayerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [startsAt, setStartsAt] = useState("19:00");
  const [duration, setDuration] = useState(60);
  const [playerCount, setPlayerCount] = useState(1);
  const [bookingDate, setBookingDate] = useState(todayValue());
  const [utr, setUtr] = useState("");
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState("");
  const [paymentStep, setPaymentStep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const maxDuration = maxDurationForStart(startsAt);
  const amount = bookingTotal(duration, playerCount);
  const bookingId = useMemo(generateBookingId, [
    bookingDate,
    startsAt,
    duration,
    playerCount,
  ]);
  const assignedStation = findAvailableStation(
    bookings,
    stations,
    bookingDate,
    startsAt,
    duration,
  );
  const upiLink = makeUpiLink({ amount, bookingId, settings });

  const isValid =
    playerName.trim() &&
    /^[6-9]\d{9}$/.test(mobile.trim()) &&
    startsAt &&
    timeToMinutes(startsAt) >= OPEN_HOUR * 60 &&
    timeToMinutes(startsAt) < CLOSE_HOUR * 60 &&
    duration >= 30 &&
    duration <= maxDuration &&
    duration % 30 === 0 &&
    playerCount >= 1 &&
    playerCount <= MAX_PLAYERS &&
    Boolean(assignedStation);

  useEffect(() => {
    if (duration > maxDuration) setDuration(maxDuration);
  }, [duration, maxDuration]);

  function moveToPayment(event) {
    event.preventDefault();
    setError("");
    if (!isValid) return;
    setPaymentStep(true);
  }

  async function submitPaidBooking(event) {
    event.preventDefault();
    setError("");
    if (!utr.trim()) {
      setError("Enter the UTR number after completing UPI payment.");
      return;
    }

    setSubmitting(true);
    const result = await onBook({
      bookingId,
      playerName: playerName.trim(),
      mobile: mobile.trim(),
      bookingDate,
      startsAt,
      duration,
      playerCount,
      utr: utr.trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      setPaymentStep(false);
      return;
    }

    setBookingResult(result.booking);
    setPaymentStep(false);
    setPlayerName("");
    setMobile("");
    setPlayerCount(1);
    setUtr("");
  }

  if (bookingResult) {
    const station = stations.find(
      (item) => item.id === bookingResult.stationId,
    );

    return (
      <div className="h-fit rounded border border-emerald-300/20 bg-emerald-300/[0.06] p-5 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.22em] text-emerald-100/80">
          Booking received
        </p>
        <h2 className="mt-2 text-2xl font-black text-white">
          Payment pending verification
        </h2>
        <div className="mt-5 space-y-3 rounded bg-black/25 p-4 text-sm text-slate-300">
          <div className="flex justify-between gap-4">
            <span>Booking ID</span>
            <span className="font-black text-white">
              {bookingResult.bookingId}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Assigned console</span>
            <span>{station?.name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Date & time</span>
            <span>
              {bookingResult.visitDate} at {bookingResult.startsAt}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Amount</span>
            <span>Rs {bookingResult.amount}</span>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          The cafe admin will verify your UTR and confirm the booking. Keep your
          booking ID handy.
        </p>
        <button
          className="mt-5 w-full rounded bg-cyan-300 px-4 py-3 font-black text-slate-950 transition hover:bg-cyan-200"
          onClick={() => setBookingResult(null)}
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form
      className="h-fit rounded border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur"
      onSubmit={paymentStep ? submitPaidBooking : moveToPayment}
    >
      <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">
        {paymentStep ? "UPI payment" : "Book now"}
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">
        {paymentStep ? "Pay and submit UTR" : "Reserve your time slot"}
      </h2>

      {!paymentStep ? (
        <>
          <label className="mt-5 block text-sm font-semibold text-slate-300">
            Name*
          </label>
          <input
            className="field mt-2"
            placeholder="Your name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />

          <label className="mt-4 block text-sm font-semibold text-slate-300">
            WhatsApp number*
          </label>
          <input
            className="field mt-2"
            inputMode="numeric"
            maxLength="10"
            placeholder="10 digit mobile"
            value={mobile}
            onChange={(event) =>
              setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />

          <label className="mt-4 block text-sm font-semibold text-slate-300">
            Visit date
          </label>

          <input
            type="date"
            className="field mt-2"
            value={bookingDate}
            min={todayValue()}
            onChange={(e) => setBookingDate(e.target.value)}
          />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block text-sm font-semibold text-slate-300">
              Arrival time
              <input
                className="field mt-2"
                min={`${String(OPEN_HOUR).padStart(2, "0")}:00`}
                max="23:30"
                step="1800"
                type="time"
                value={startsAt}
                onChange={(event) => setStartsAt(event.target.value)}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-300">
              Players
              <select
                className="field mt-2"
                value={playerCount}
                onChange={(event) => setPlayerCount(Number(event.target.value))}
              >
                {Array.from(
                  { length: MAX_PLAYERS },
                  (_, index) => index + 1,
                ).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-semibold text-slate-300">
            Session duration
          </label>
          <select
            className="field mt-2"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          >
            <option value={30}>30 Minutes</option>
            <option value={60}>1 Hour</option>
            <option value={90}>1 Hour 30 Minutes</option>
            <option value={120}>2 Hours</option>
          </select>

          <div
            className={`mt-5 rounded p-4 text-sm ${
              assignedStation
                ? "border border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100"
                : "border border-rose-300/20 bg-rose-300/[0.06] text-rose-100"
            }`}
          >
            {assignedStation
              ? `Available. We will assign ${assignedStation.name} automatically.`
              : "No console is available for this slot."}
          </div>

          <div className="mt-5 rounded bg-black/25 p-4">
            <div className="flex justify-between text-sm text-slate-300">
              <span>Rate</span>
              <span>Rs {HOURLY_RATE_PER_PLAYER}/hr/person</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-slate-300">
              <span>Estimated total</span>
              <span className="font-black text-cyan-100">Rs {amount}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5 rounded bg-black/25 p-4 text-sm text-slate-300">
            <div className="flex justify-between gap-4">
              <span>Booking ID</span>
              <span className="font-black text-white">{bookingId}</span>
            </div>
            <div className="mt-2 flex justify-between gap-4">
              <span>Assigned console</span>
              <span>{assignedStation?.name}</span>
            </div>
            <div className="mt-2 flex justify-between gap-4">
              <span>Amount</span>
              <span className="font-black text-cyan-100">Rs {amount}</span>
            </div>
          </div>
          <div className="mt-5 rounded border border-white/10 bg-white/[0.04] p-4 text-center">
            <p className="text-sm text-slate-300">Pay to</p>
            <p className="mt-1 text-lg font-black text-white">
              {settings.upiName}
            </p>
            <p className="text-sm text-cyan-100">{settings.upiId}</p>
            <div className="mx-auto mt-4 grid h-40 w-40 place-items-center rounded bg-white p-3 text-center text-xs font-black text-slate-950">
              Dynamic UPI QR
              <span className="mt-1 block font-normal">
                Use UPI app scan/pay
              </span>
            </div>
            <a
              className="mt-4 inline-flex rounded bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-200"
              href={upiLink}
            >
              Open UPI app
            </a>
          </div>
          <label className="mt-4 block text-sm font-semibold text-slate-300">
            UTR number*
          </label>
          <input
            className="field mt-2"
            inputMode="numeric"
            placeholder="Enter UTR after payment"
            value={utr}
            onChange={(event) => setUtr(event.target.value.replace(/\D/g, ""))}
          />
        </>
      )}

      {error && (
        <p className="mt-4 rounded border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
          {error}
        </p>
      )}

      <button
        className="glow-button mt-5 w-full rounded bg-cyan-300 px-4 py-3 font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={paymentStep ? submitting || !utr.trim() : !isValid}
      >
        {paymentStep
          ? submitting
            ? "Submitting..."
            : "Submit UTR"
          : "Continue to payment"}
      </button>
      {paymentStep && (
        <button
          className="mt-3 w-full rounded border border-white/10 bg-white/5 px-4 py-3 font-bold text-slate-200 transition hover:bg-white/10"
          type="button"
          onClick={() => setPaymentStep(false)}
        >
          Back to details
        </button>
      )}
      <p className="mt-3 text-center text-xs text-slate-500">
        Booking is confirmed only after payment verification.
      </p>
    </form>
  );
}

// function TodayPreview({ bookings, stations }) {
//   const now = new Date().getHours() * 60 + new Date().getMinutes();

//   return (
//     <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5">
//       <h3 className="text-2xl font-black">Current Availability</h3>

//       <div className="mt-5 grid gap-4 md:grid-cols-2">
//         {stations.map((station) => {
//           const activeBooking = bookings.find((booking) => {
//             if (booking.stationId !== station.id) {
//               return false;
//             }

//             const start = timeToMinutes(booking.startsAt);

//             const end = start + booking.duration;

//             return now >= start && now < end;
//           });

//           return (
//             <div
//               key={station.id}
//               className="rounded-lg border border-white/10 bg-black/20 p-4"
//             >
//               <h4 className="font-black">{station.name}</h4>

//               {activeBooking ? (
//                 <div className="mt-3 inline-flex rounded-full bg-rose-500/20 px-3 py-1 text-sm text-rose-200">
//                   Busy
//                 </div>
//               ) : (
//                 <div className="mt-3 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200">
//                   Available
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

function AdminPanel({
  bookings,
  selectedDate,
  settings,
  stations,
  onDateChange,
  onSettingsChange,
  onStatusChange,
}) {
  const [highlightLastNight, setHighlightLastNight] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const slots = useMemo(() => {
    const start = OPEN_HOUR * 60;
    const end = CLOSE_HOUR * 60;
    return Array.from(
      { length: (end - start) / 30 },
      (_, index) => start + index * 30,
    );
  }, []);

  const selectedDateBookings = bookings.filter(
    (booking) => booking.visitDate === selectedDate,
  );
  const filteredBookings = selectedDateBookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      booking.playerName.toLowerCase().includes(query) ||
      booking.bookingId?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
  const sortedBookings = [...filteredBookings].sort(
    (a, b) => timeToMinutes(a.startsAt) - timeToMinutes(b.startsAt),
  );
  const todaysRevenue = selectedDateBookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100/80">
            Admin panel
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Daily booking board
          </h1>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-semibold text-slate-300">
            Date
            <input
              className="field mt-2 w-44"
              type="date"
              value={selectedDate}
              onChange={(event) => onDateChange(event.target.value)}
            />
          </label>
          <label className="flex h-12 items-center gap-3 rounded border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-300">
            <input
              checked={highlightLastNight}
              className="accent-cyan-300"
              type="checkbox"
              onChange={(event) => setHighlightLastNight(event.target.checked)}
            />
            Highlight late-night endings
          </label>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Total bookings" value={bookings.length} />
        <Metric label="Today's bookings" value={selectedDateBookings.length} />
        <Metric label="Today's revenue" value={`Rs ${todaysRevenue}`} />
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Metric
          label="Confirmed"
          value={
            selectedDateBookings.filter(
              (booking) => booking.status === "confirmed",
            ).length
          }
        />
        <Metric
          label="Pending payments"
          value={
            selectedDateBookings.filter(
              (booking) => booking.status === "pending",
            ).length
          }
        />
        <Metric label="Active consoles" value={settings.activeConsoles} />
      </div>

      <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_220px]">
        <input
          className="field"
          placeholder="Search by name or booking ID"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="field"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All bookings</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <section className="overflow-hidden rounded border border-white/10 bg-slate-950/70">
        <div className="overflow-x-auto">
          <div
            className="grid min-w-[1180px]"
            style={{
              gridTemplateColumns: `150px repeat(${slots.length}, minmax(42px, 1fr))`,
            }}
          >
            <div className="sticky left-0 z-20 border-b border-r border-white/10 bg-slate-950 p-3 text-sm font-black">
              System
            </div>
            {slots.map((slot) => (
              <div
                className="border-b border-r border-white/10 bg-slate-950 p-2 text-center text-[11px] font-bold text-slate-300"
                key={slot}
              >
                {minutesToTime(slot)}
              </div>
            ))}

            {stations.map((station) => (
              <BookingTimelineRow
                bookings={sortedBookings.filter(
                  (booking) => booking.stationId === station.id,
                )}
                highlightLastNight={highlightLastNight}
                key={station.id}
                slots={slots}
                station={station}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded border border-white/10 bg-white/[0.04] p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black">Bookings list</h2>
          <div className="flex gap-3 text-xs font-bold uppercase tracking-wide">
            <span className="rounded bg-emerald-400/20 px-2 py-1 text-emerald-100">
              Confirmed
            </span>
            <span className="rounded bg-amber-300/20 px-2 py-1 text-amber-100">
              Pending
            </span>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {sortedBookings.map((booking) => {
            const station = stations.find(
              (item) => item.id === booking.stationId,
            );
            return (
              <div
                className="rounded border border-white/10 bg-black/20 p-4"
                key={booking.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">{booking.playerName}</p>
                    <p className="mt-1 text-sm text-slate-300">
                      {booking.bookingId} - {booking.mobile} - {station?.name}
                    </p>
                  </div>
                  <BookingStatus status={booking.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300 sm:grid-cols-4">
                  <span>{booking.startsAt}</span>
                  <span>{booking.duration} min</span>
                  <span>
                    {booking.playerCount}{" "}
                    {booking.playerCount === 1 ? "player" : "players"}
                  </span>
                  <span>
                    Rs {bookingTotal(booking.duration, booking.playerCount)}
                  </span>
                  <span>UTR {booking.utr || "N/A"}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["pending", "confirmed", "cancelled"].map((status) => (
                    <button
                      className={`rounded px-3 py-2 text-xs font-black capitalize transition ${
                        booking.status === status
                          ? "bg-cyan-300 text-slate-950"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                      key={status}
                      onClick={() => onStatusChange(booking.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-2xl font-black">Settings</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-slate-300">
            UPI ID
            <input
              className="field mt-2"
              value={settings.upiId}
              onChange={(event) =>
                onSettingsChange((current) => ({
                  ...current,
                  upiId: event.target.value,
                }))
              }
            />
          </label>
          <label className="text-sm font-semibold text-slate-300">
            UPI Name
            <input
              className="field mt-2"
              value={settings.upiName}
              onChange={(event) =>
                onSettingsChange((current) => ({
                  ...current,
                  upiName: event.target.value,
                }))
              }
            />
          </label>
          <label className="text-sm font-semibold text-slate-300">
            Active consoles
            <select
              className="field mt-2"
              value={settings.activeConsoles}
              onChange={(event) =>
                onSettingsChange((current) => ({
                  ...current,
                  activeConsoles: Number(event.target.value),
                }))
              }
            >
              {Array.from(
                { length: stations.length },
                (_, index) => index + 1,
              ).map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["telegramEnabled", "Telegram notifications"],
            ["resendEnabled", "Resend email"],
            ["fast2smsEnabled", "Fast2SMS"],
          ].map(([key, label]) => (
            <label
              className="flex items-center justify-between rounded border border-white/10 bg-black/20 p-4 text-sm font-semibold text-slate-300"
              key={key}
            >
              {label}
              <input
                checked={settings[key]}
                className="accent-cyan-300"
                type="checkbox"
                onChange={(event) =>
                  onSettingsChange((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

function BookingTimelineRow({ bookings, highlightLastNight, slots, station }) {
  const gridColumns = slots.length;

  return (
    <>
      <div className="sticky left-0 z-10 border-b border-r border-white/10 bg-slate-950 p-3">
        <p className="font-bold">{station.name}</p>
        <p className="mt-1 text-xs text-slate-500">{station.zone}</p>
      </div>
      <div
        className="relative border-b border-white/10"
        style={{ gridColumn: `span ${gridColumns}` }}
      >
        <div
          className="grid h-16"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(42px, 1fr))`,
          }}
        >
          {slots.map((slot) => (
            <div
              className={`border-r border-white/10 ${
                highlightLastNight && slot >= 22 * 60
                  ? "bg-cyan-300/[0.06]"
                  : "bg-white/[0.02]"
              }`}
              key={slot}
            />
          ))}
        </div>
        {bookings.map((booking) => {
          const startIndex = Math.max(
            0,
            (timeToMinutes(booking.startsAt) - slots[0]) / 30,
          );
          const span = Math.max(1, booking.duration / 30);
          const width = `calc((100% / ${gridColumns}) * ${span})`;
          const left = `calc((100% / ${gridColumns}) * ${startIndex})`;
          const isConfirmed = booking.status === "confirmed";

          return (
            <div
              className={`absolute top-4 h-8 overflow-hidden rounded px-2 py-1 text-xs font-black text-slate-950 shadow-lg ${
                isConfirmed ? "bg-emerald-400" : "bg-amber-300"
              } ${booking.status === "cancelled" ? "opacity-35 line-through" : ""}`}
              key={booking.id}
              style={{ left, width }}
              title={`${booking.playerName} - ${booking.duration} min`}
            >
              <span className="block truncate">{booking.playerName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function InfoCard({ children, title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

function SegmentedButton({ active, children, disabled, onClick }) {
  return (
    <button
      className={`rounded px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-white text-slate-950"
          : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
      } disabled:cursor-not-allowed disabled:opacity-40`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-white/10 bg-white/[0.04] p-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function BookingStatus({ status }) {
  const styles = {
    pending: "bg-amber-300/15 text-amber-100 ring-amber-300/30",
    confirmed: "bg-emerald-400/15 text-emerald-100 ring-emerald-300/30",
    cancelled: "bg-rose-300/15 text-rose-100 ring-rose-300/30",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-black uppercase tracking-wide ring-1 ${
        styles[status] ?? "bg-slate-300/15 text-slate-100 ring-slate-300/30"
      }`}
    >
      {status}
    </span>
  );
}

export default App;

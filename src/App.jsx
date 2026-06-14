import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";
import heroImage from "./assets/banner-logo.jpeg";
import logo from "./assets/logo.jpeg";

const SESSION_KEY = "time_share_admin";
const HOURLY_RATE_PER_PLAYER = 60;
const MAX_PLAYERS = 4;
const MAX_SESSION_HOURS = 4;
const OPEN_HOUR = 10;
const CLOSE_HOUR = 24;

const stations = [
  {
    id: "ps-01",
    name: "PS5 Lounge A",
    zone: "Main Console Zone",
    specs: "PS5, 55in OLED, two DualSense controllers",
  },
  {
    id: "ps-02",
    name: "PS5 Lounge B",
    zone: "Main Console Zone",
    specs: "PS5, 55in OLED, couch seating",
  },
];

const games = [
  "EA FC 25",
  "WWE 2K25",
  "GTA V",
  "God Of War",
  "Mortal Kombat",
  "It Takes Two",
  "Asphalt",
  "Stick Fight",
];

const seedBookings = [
  {
    id: "bk-101",
    playerName: "Ahsan",
    mobile: "9876543210",
    stationId: "ps-01",
    startsAt: "11:00",
    duration: 120,
    playerCount: 2,
    status: "confirmed",
  },
  {
    id: "bk-102",
    playerName: "Aleena",
    mobile: "9876500011",
    stationId: "ps-02",
    startsAt: "15:30",
    duration: 60,
    playerCount: 3,
    status: "tentative",
  },
  {
    id: "bk-103",
    playerName: "Patrick",
    mobile: "9876500022",
    stationId: "ps-01",
    startsAt: "18:00",
    duration: 180,
    playerCount: 4,
    status: "tentative",
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
    playerName: row.player_name,
    mobile: row.mobile,
    stationId: row.station_id,
    startsAt: toLocalTimeValue(row.starts_at),
    duration: row.duration_minutes,
    playerCount: row.player_count,
    status: row.status,
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

function maxDurationForStart(startsAt) {
  const minutesUntilClose = CLOSE_HOUR * 60 - timeToMinutes(startsAt);
  return Math.max(30, Math.min(MAX_SESSION_HOURS * 60, minutesUntilClose));
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
          "id, player_name, mobile, station_id, starts_at, duration_minutes, player_count, status",
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
    const booking = {
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "tentative",
      ...payload,
    };

    if (supabase) {
      await supabase.from("bookings").insert({
        player_name: payload.playerName,
        mobile: payload.mobile,
        station_id: payload.stationId,
        starts_at: makeStartsAtIso(selectedDate, payload.startsAt),
        duration_minutes: payload.duration,
        player_count: payload.playerCount,
        status: "tentative",
      });
    }

    setBookings((current) => [booking, ...current]);
  }

  async function updateBookingStatus(id, status) {
    if (supabase && adminSession && !adminSession.token.startsWith("demo.")) {
      await supabase.from("bookings").update({ status }).eq("id", id);
    }

    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking,
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
          stations={stations}
          onDateChange={setSelectedDate}
          onStatusChange={updateBookingStatus}
        />
      ) : (
        <PublicWebsite
          bookings={bookings}
          onBook={createBooking}
          stations={stations}
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
            <span className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">
              PS5 sessions by the hour
            </span>
          </span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <SegmentedButton
            active={activeView === "public"}
            onClick={() => onViewChange("public")}
          >
            Website
          </SegmentedButton>
          <SegmentedButton
            active={activeView === "admin"}
            disabled={!adminSession}
            onClick={() => onViewChange("admin")}
          >
            Admin panel
          </SegmentedButton>

          {adminSession ? (
            <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <span className="text-slate-300">{adminSession.name}</span>
              <button
                className="rounded px-2 py-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
                onClick={onLogout}
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              className="rounded bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-100"
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
          className="rounded px-2 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
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

function PublicWebsite({ bookings, onBook, stations }) {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_460px] lg:items-center lg:px-8 lg:py-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-cyan-100/80">
            Console gaming cafe
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
            Book a PS5 slot, walk in, and start playing.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Time Share is built for quick FIFA runs, weekend tournaments, and
            couch co-op sessions. No signup required. Pick your start time,
            duration, and player count.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="rounded bg-cyan-300 px-5 py-3 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              href="#book"
            >
              Book a time slot
            </a>
            <a
              className="rounded border border-white/15 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              href="#pricing"
            >
              View pricing
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric label="Rate" value={`Rs ${HOURLY_RATE_PER_PLAYER}/hr`} />
            <Metric label="Players" value={`1-${MAX_PLAYERS}`} />
            <Metric label="Step" value="30 min" />
          </div>
        </div>

        <HeroConsoleCard />
      </section>

      <section
        className="border-y border-white/10 bg-white/[0.035]"
        id="pricing"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:px-8">
            {[1, 2, 3, 4].map((players) => (
              <InfoCard
                key={players}
                title={`${players} ${players === 1 ? "Player" : "Players"}`}
                value={`₹${players * 60}/hour`}
              >
                Complete session cost for {players} player
                {players > 1 ? "s" : ""}.
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-white">Popular Games</h2>

        <p className="mt-3 text-slate-400">
          Multiplayer, sports, racing and action titles.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <div
              key={game}
              className="rounded-xl border border-cyan-500/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.03]"
            >
              <p className="text-lg font-black">{game}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        id="book"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_460px]">
          <div>
            <h2 className="text-3xl font-black text-white">Available setups</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {stations.map((station) => (
                <div
                  key={station.id}
                  className="rounded border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {station.zone}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{station.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {station.specs}
                  </p>
                </div>
              ))}
            </div>
            <TodayPreview bookings={bookings} stations={stations} />
          </div>
          <section className="border-y border-white/10 bg-black/20">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-black">Operating Hours</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 p-6">
                  <p className="text-cyan-300">Monday - Friday</p>

                  <p className="mt-2 text-3xl font-black">
                    10:00 AM - 10:00 PM
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 p-6">
                  <p className="text-cyan-300">Saturday - Sunday</p>

                  <p className="mt-2 text-3xl font-black">
                    10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
            </div>
          </section>
          <BookingForm onBook={onBook} stations={stations} />
        </div>
      </section>
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black">Visit Us</h2>

          <div className="mt-6 rounded-xl border border-white/10 p-6">
            <p>Shop No. 06</p>
            <p>Vishwamitri Building</p>
            <p>Lokgram, Kalyan East</p>
            <p>Maharashtra 421306</p>

            <a
              className="mt-6 inline-flex rounded-lg bg-cyan-300 px-5 py-3 font-black text-slate-950"
              href="https://maps.google.com"
              rel="noreferrer"
              target="_blank"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroConsoleCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#08111f] shadow-[0_0_50px_rgba(34,211,238,0.15)]">
      <div className="relative h-[450px]">
        <img
          alt="Gaming Cafe"
          className="h-full w-full object-cover"
          src={heroImage}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
            Place Of Virtuality
          </p>

          <h3 className="mt-2 text-4xl font-black text-white">YOUR POV</h3>

          <p className="mt-3 text-slate-300">
            Premium PlayStation 5 Gaming Experience
          </p>

          <div className="mt-5 inline-flex rounded-xl border border-cyan-400/20 bg-black/40 px-5 py-3 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Rate
              </p>

              <p className="text-2xl font-black text-cyan-300">₹60/hr/person</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingForm({ onBook, stations }) {
  const [playerName, setPlayerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [stationId, setStationId] = useState(stations[0]?.id ?? "");
  const [startsAt, setStartsAt] = useState("19:00");
  const [duration, setDuration] = useState(60);
  const [playerCount, setPlayerCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const maxDuration = maxDurationForStart(startsAt);

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
    playerCount <= MAX_PLAYERS;

  useEffect(() => {
    if (duration > maxDuration) setDuration(maxDuration);
  }, [duration, maxDuration]);

  function submit(event) {
    event.preventDefault();
    if (!isValid) return;
    onBook({
      playerName: playerName.trim(),
      mobile: mobile.trim(),
      stationId,
      startsAt,
      duration,
      playerCount,
    });
    setSubmitted(true);
    setPlayerName("");
    setMobile("");
    setPlayerCount(1);
    window.setTimeout(() => setSubmitted(false), 2600);
  }

  return (
    <form
      className="h-fit rounded border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur"
      onSubmit={submit}
    >
      <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">
        Book now
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">
        Reserve your time slot
      </h2>

      <label className="mt-5 block text-sm font-semibold text-slate-300">
        Name
      </label>
      <input
        className="field mt-2"
        placeholder="Your name"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
      />

      <label className="mt-4 block text-sm font-semibold text-slate-300">
        Mobile number
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
        Setup
      </label>
      <select
        className="field mt-2"
        value={stationId}
        onChange={(event) => setStationId(event.target.value)}
      >
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold text-slate-300">
          Start time
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
            {Array.from({ length: MAX_PLAYERS }, (_, index) => index + 1).map(
              (count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold text-slate-300">
        Playing time: {duration} minutes
      </label>
      <input
        className="mt-3 w-full accent-cyan-300"
        max={maxDuration}
        min="30"
        step="30"
        type="range"
        value={duration}
        onChange={(event) => setDuration(Number(event.target.value))}
      />
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>30 min</span>
        <span>Until {minutesToTime(CLOSE_HOUR * 60)}</span>
      </div>

      <div className="mt-5 rounded bg-black/25 p-4">
        <div className="flex justify-between text-sm text-slate-300">
          <span>Rate</span>
          <span>Rs {HOURLY_RATE_PER_PLAYER}/hr/person</span>
        </div>
        <div className="mt-2 flex justify-between text-sm text-slate-300">
          <span>Estimated total</span>
          <span className="font-black text-cyan-100">
            Rs {bookingTotal(duration, playerCount)}
          </span>
        </div>
      </div>

      <button
        className="glow-button mt-5 w-full rounded bg-cyan-300 px-4 py-3 font-black text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!isValid}
      >
        {submitted ? "Booking sent" : "Book time slot"}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Your booking starts as tentative until the cafe confirms it.
      </p>
    </form>
  );
}

function TodayPreview({ bookings, stations }) {
  const now = new Date().getHours() * 60 + new Date().getMinutes();

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-2xl font-black">Current Availability</h3>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {stations.map((station) => {
          const activeBooking = bookings.find((booking) => {
            if (booking.stationId !== station.id) {
              return false;
            }

            const start = timeToMinutes(booking.startsAt);

            const end = start + booking.duration;

            return now >= start && now < end;
          });

          return (
            <div
              key={station.id}
              className="rounded-lg border border-white/10 bg-black/20 p-4"
            >
              <h4 className="font-black">{station.name}</h4>

              {activeBooking ? (
                <div className="mt-3 inline-flex rounded-full bg-rose-500/20 px-3 py-1 text-sm text-rose-200">
                  Busy
                </div>
              ) : (
                <div className="mt-3 inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-200">
                  Available
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminPanel({
  bookings,
  selectedDate,
  stations,
  onDateChange,
  onStatusChange,
}) {
  const [highlightLastNight, setHighlightLastNight] = useState(true);
  const slots = useMemo(() => {
    const start = OPEN_HOUR * 60;
    const end = CLOSE_HOUR * 60;
    return Array.from(
      { length: (end - start) / 30 },
      (_, index) => start + index * 30,
    );
  }, []);

  const sortedBookings = [...bookings].sort(
    (a, b) => timeToMinutes(a.startsAt) - timeToMinutes(b.startsAt),
  );

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
        <Metric
          label="Confirmed"
          value={
            bookings.filter((booking) => booking.status === "confirmed").length
          }
        />
        <Metric
          label="Tentative"
          value={
            bookings.filter((booking) => booking.status === "tentative").length
          }
        />
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
                className="border-b border-r border-white/10 bg-slate-950 p-2 text-center text-[11px] font-bold text-slate-400"
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
              Tentative
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
                    <p className="mt-1 text-sm text-slate-400">
                      {booking.mobile} - {station?.name}
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
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["tentative", "confirmed", "cancelled"].map((status) => (
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
    <div className="rounded border border-white/10 bg-black/20 p-5">
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
    confirmed: "bg-emerald-400/15 text-emerald-100 ring-emerald-300/30",
    tentative: "bg-amber-300/15 text-amber-100 ring-amber-300/30",
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

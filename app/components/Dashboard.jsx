"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertTriangle,
  MapPin,
  EyeOff,
  Droplet,
  WifiOff,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [drowsyDisplay, setDrowsyDisplay] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://192.168.205.3/data", { timeout: 2000 });
      setData(res.data);
      setConnected(true);
    } catch (err) {
      setConnected(false);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (connected && data?.drowsyDetected) {
      setDrowsyDisplay(true);
      const timer = setTimeout(() => {
        setDrowsyDisplay(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [data?.drowsyDetected]);

  const locationValue =
    connected && data && typeof data.lat === "number" && typeof data.lng === "number" ? (
      <a
        href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-400 hover:text-blue-300"
      >
        Lat: {data.lat.toFixed(4)}, Lng: {data.lng.toFixed(4)}
      </a>
    ) : (
      "Waiting..."
    );

  return (
    <div className="bg-gray-950 text-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 tracking-tight">
            🧠 Smart Helmet Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Real-time monitoring & safety alerts from helmet sensors
          </p>
        </header>

        {!connected && (
          <div className="bg-red-800/80 border border-red-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3 shadow-lg">
            <WifiOff size={20} />
            <span>Device not connected. Showing default dashboard...</span>
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatusCard icon={<MapPin />} label="Location" value={locationValue} />

          <StatusCard
            icon={<Droplet />}
            label="Alcohol Detection"
            value={
              connected && data
                ? data.alcoholDetected
                  ? "Alcohol Detected 🚫"
                  : "No Alcohol ✅"
                : "Waiting..."
            }
            color={
              !connected
                ? "text-gray-300"
                : data.alcoholDetected
                ? "text-red-500"
                : "text-green-400"
            }
          />

          <StatusCard
            icon={<EyeOff />}
            label="Drowsiness"
            value={
              connected && data
                ? drowsyDisplay
                  ? "Drowsy ⚠️"
                  : "Active ✅"
                : "Waiting..."
            }
            color={
              !connected
                ? "text-gray-300"
                : drowsyDisplay
                ? "text-yellow-300"
                : "text-green-400"
            }
          />

          <StatusCard
            icon={<AlertTriangle />}
            label="Emergency Alert"
            value={
              connected && data
                ? data.sendAlert
                  ? "Emergency Sent 🚨"
                  : "None"
                : "Waiting..."
            }
            color={
              !connected
                ? "text-gray-300"
                : data.sendAlert
                ? "text-red-600"
                : "text-green-300"
            }
          />

          <StatusCard
            icon={<ShieldAlert />}
            label="Crash Detected"
            value={
              connected && data
                ? data.CrashDetected
                  ? "Crash Detected 💥"
                  : "No Crash"
                : "Waiting..."
            }
            color={
              !connected
                ? "text-gray-300"
                : data.CrashDetected
                ? "text-orange-400"
                : "text-green-300"
            }
          />

          <StatusCard
            icon={<CheckCircle />}
            label="Helmet ID"
            value={connected && data ? data.helmetID : "Waiting..."}
          />
        </section>
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value, color = "text-white" }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow-lg flex items-start gap-4 hover:bg-gray-800 transition-all border border-gray-800">
      <div className="bg-blue-500/10 text-blue-400 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-lg font-bold mt-1 ${color}`}>{value}</p>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const waitlist = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!firstName.trim()) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Email address is required");
      setLoading(false);
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("api/mailing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (res.ok) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        const data = await res.json();
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 h-auto w-full mb-0 rounded-3xl shadow-lg">
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 flex flex-col items-center  mt-10.5 mb-10.5"
        >
          <h2 className="text-5xl font-extrabold mb-4 text-center">
            Join our waitlist
          </h2>
          <p className="text-base text-gray-600 mb-6 text-center">
            Be the first to experience Smartistics—join our waitlist and get
            early access, exclusive updates, and launch announcements!
          </p>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && (
            <p className="text-green-500 mb-2">Thank you for subscribing!</p>
          )}

          <div className=" bg-gray-100 rounded-3xl py-2 px-1.5 mb-3.5 text-center">
            {/* Name fields */}
            <div className="sm:flex-row gap-2 w-full mb-3 justify-center">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name *"
                className="w-full flex-1 bg-white text-gray-800 rounded-tl-2xl rounded-tr-2xl outline-none px-4 py-2 focus:ring-2 focus:ring-green-700 text-center transition-all mb-1.5"
                aria-label="First name"
                style={{ maxWidth: "500px" }}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name "
                className="w-full flex-1 bg-white text-gray-800 outline-none px-4 py-2 focus:ring-2 focus:ring-green-700 text-center transition-all mb-1.5"
                aria-label="Last name"
                style={{ maxWidth: "500px" }}
              />

              {/* Email + Button */}
              {/*<div className="w-full flex flex-col sm:flex-row items-stretch mb-1">*/}
              <input
                // type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address *"
                className="w-full flex-grow bg-white text-gray-800 rounded-bl-2xl rounded-br-2xl outline-none px-4 py-2 focus:ring-2 focus:ring-green-700 text-center transition-all"
                aria-label="Email address"
                style={{ maxWidth: "500px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-full px-5 py-2 font-extrabold rounded-full shadow-md transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-800 to-green-600 text-white hover:from-green-900 hover:to-green-700"
            }`}
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>

          <a
            href="/subscription/upgrade"
            className="mt-3 text-blue-500 hover:pointer-events-auto"
          >
            Onboard a business instead
          </a>

          {/* Loading Bar */}
          {loading && (
            <div className="w-full mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 animate-[loadingBar_1.5s_ease-in-out_infinite]" />
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default waitlist;

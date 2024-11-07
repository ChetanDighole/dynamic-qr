import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Section: Brief Introduction */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Create and Update Your QR Code 📱
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Generate QR codes that you can update with any URL at any time,
          without changing the code itself 🔄.
        </p>
      </div>

      {/* Step 1: Sign Up / Sign In */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 mb-4">
          To create and manage your dynamic QR code, sign in or sign up below
          👇.
        </p>
        <div className="flex justify-center space-x-4 mb-4">
          <button className="px-6 py-2 text-white bg-blue-600 rounded-md">
            Sign Up ✨
          </button>
          <button className="px-6 py-2 text-white bg-green-600 rounded-md">
            Sign In 🔑
          </button>
        </div>
      </div>

      {/* Step 2: Static QR Code Generator */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Quick Static QR Code ⚡
        </h2>
        <p className="text-gray-600 mb-4">
          Generate a simple, unchanging QR code instantly 🎉.
        </p>
        <button className="px-6 py-2 text-white bg-gray-600 rounded-md">
          Generate Static QR
        </button>
      </div>

      {/* Step 3: Dynamic QR Code Generator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            📦 What You Can Do:
          </h2>
          <ul className="mt-4 text-gray-700">
            <li>✅ Generate a persistent QR code</li>
            <li>✅ Update the URL anytime</li>
            <li>✅ Download and share your QR code</li>
          </ul>
        </div>

        <div className="flex flex-col bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            💡 Why Use This Feature?
          </h2>
          <ul className="mt-4 text-gray-700">
            <li>🌍 Flexibility without changing the QR code</li>
            <li>🔄 Easy to update the URL anytime</li>
            <li>📈 Ideal for marketing, events, and business use</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          🔄 How It Works:
        </h2>
        <p className="mt-4 text-gray-700">
          1. Generate your QR code with an initial URL.
          <br />
          2. Update the URL whenever needed.
          <br />
          3. Download and use the same QR code, always pointing to the latest
          link.
        </p>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">🛠️ Use Cases:</h2>
        <ul className="mt-4 text-gray-700">
          <li>📈 Marketing Campaigns</li>
          <li>🎟️ Event Information</li>
          <li>💼 Business Cards & Print Media</li>
        </ul>
      </div>
    </div>
  );
}

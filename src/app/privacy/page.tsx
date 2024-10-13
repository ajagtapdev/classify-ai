import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 flex flex-col justify-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full border border-blue-200">
          <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">
            Privacy Policy
          </h1>
          <p className="mb-4">Effective Date: October 2024</p>
          <p className="text-gray-700 mb-4">
            At Classify.ai, we respect your privacy and are committed to
            protecting the personal information you provide to us. This privacy
            policy outlines how we collect, use, and safeguard your data when
            you interact with our application.
          </p>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Personal Information:</strong> When you sign up or contact
              us, we may collect your name and email address.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect anonymous usage data,
              such as your interaction with the app, pages viewed, and time
              spent on the platform.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Provide and improve our service.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Monitor app usage to improve user experience.</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            3. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We take reasonable steps to protect your data and ensure its
            confidentiality. However, no system is completely secure, and we
            cannot guarantee the absolute security of your data.
          </p>
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            4. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns about these terms, feel free
            to contact us at <a href="/contact" className="text-blue-700 underline">our contact page</a>.
          </p>
          <p className="text-gray-500">
            This privacy policy may be updated from time to time, and we
            encourage you to review it periodically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

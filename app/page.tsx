import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">🏆 Influencer Awards Engine</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Module IA-E: Summit Registration Widget - A complete solution for event registration with embeddable widgets
            and RESTful APIs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📱 Live Demo</h2>
            <p className="text-gray-600 mb-6">
              Experience the Summit Registration Widget in action with our interactive demo page.
            </p>
            <Link
              href="/summit-demo.html"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              View Demo →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔌 API Documentation</h2>
            <p className="text-gray-600 mb-6">
              RESTful API endpoints for summit registration with JSON responses and error handling.
            </p>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <code className="text-sm">POST /api/summit/register</code>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <code className="text-sm">GET /api/summit/registrations</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🚀 Implementation Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Embeddable Widget</h3>
              <p className="text-gray-600 text-sm">Drop-in JavaScript widget that works on any website</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast & Responsive</h3>
              <p className="text-gray-600 text-sm">Optimized for all devices with smooth animations</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure & Validated</h3>
              <p className="text-gray-600 text-sm">Input validation and comprehensive error handling</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Admin Panel</h2>
            <p className="text-gray-600 mb-6">Access the admin panel to view and manage all summit registrations.</p>
            <Link
              href="/admin"
              className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Admin Panel →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💾 Data Storage</h2>
            <p className="text-gray-600 mb-6">
              All registrations are stored securely in a Firebase firestore database. You can view the registrations
              data in the Firebase console.
            </p>
            <div className="bg-gray-100 p-3 rounded-lg">
              <code className="text-sm">influencer-awards-engine-ia-e/registrations/*</code>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-white text-lg font-semibold mb-2">Ready for Production Deployment</h3>
            <p className="text-white/80 text-sm">
              Built with Next.js 15, TypeScript, and modern web standards. Deploy to Vercel or Netlify with zero
              configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

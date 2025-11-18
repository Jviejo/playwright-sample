export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" data-testid="dashboard-title">
          Dashboard
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg">¡Bienvenido al dashboard!</p>
          <p className="text-gray-600 mt-2">Has iniciado sesión correctamente.</p>
        </div>
      </div>
    </div>
  );
}

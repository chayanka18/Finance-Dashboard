import { useStore } from "../store/useStore";

function RoleSwitcher() {
  const { role, setRole } = useStore();

  return (
    <div className="mb-4">
      <button
        onClick={() => setRole("viewer")}
        className="mr-2 px-4 py-2 bg-gray-300"
      >
        Viewer
      </button>

      <button
        onClick={() => setRole("admin")}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Admin
      </button>

      <p className="mt-2">Current Role: {role}</p>
    </div>
  );
}

export default RoleSwitcher;
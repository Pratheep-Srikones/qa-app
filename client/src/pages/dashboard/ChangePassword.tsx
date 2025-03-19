import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const navigate = useNavigate();

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (name: string, value: string) => {
    let error = "";
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (name === "newPassword") {
      if (!passwordRegex.test(value)) {
        error =
          "Password must be at least 6 characters with a capital letter, a number, and a special character.";
      }
    }

    if (name === "confirmNewPassword") {
      if (value !== formData.newPassword) {
        error = "Passwords do not match.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validatePassword(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!errors.newPassword && !errors.confirmNewPassword) {
      console.log("Password changed successfully", formData);
      navigate("/profile");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-[#0a0a0a] p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black/5 rounded-xl shadow-lg border border-gray-800 relative z-10">
        <h1 className="text-2xl font-bold text-center text-white">
          Change Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Old Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="input input-neutral w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("oldPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword.oldPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input input-neutral w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("newPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword.newPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-yellow-500">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword.confirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="input input-neutral w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirmNewPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword.confirmNewPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="mt-1 text-xs text-yellow-500">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white flex items-center justify-center gap-2 shadow-md"
            disabled={!!errors.newPassword || !!errors.confirmNewPassword}
          >
            Change Password
          </button>
        </form>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#12012c] via-[#0a0a0a] to-[#25054d] opacity-80 blur-2xl"></div>
    </motion.div>
  );
};

export default ChangePassword;

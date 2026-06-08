import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Summaryapi from "../common";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { getUserDetails } =
    useContext(UserContext);

  const username =
    location.state?.username;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        Summaryapi.verifyOtp.url,
        {
          method: Summaryapi.verifyOtp.method,
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || "Invalid OTP"
        );
        return;
      }

      toast.success("OTP Verified");

      await getUserDetails();

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-5">
          Verify OTP
        </h2>

        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
}

export default VerifyOtp;
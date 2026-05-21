import {
  Bell,
  ShieldCheck,
  Settings,
  LogOut,
  LayoutDashboard
} from "lucide-react"

import {
  toast
} from "react-toastify"

export default function Navbar() {

  // =========================================
  // USER DATA
  // =========================================

  const username =
    localStorage.getItem("username") || "User"

  // =========================================
  // ADMIN CHECK
  // =========================================

  const isAdmin =
    localStorage.getItem("is_staff") === "true"

  // =========================================
  // USER INITIAL
  // =========================================

  const userInitial =
    username.charAt(0).toUpperCase()

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.clear()

    toast.success(
      "Logged Out Successfully"
    )

    setTimeout(() => {

      window.location.href = "/"

    }, 1000)
  }

  return (

    <nav
      className="
        navbar
        navbar-expand-lg
        px-4
        py-3
      "
      style={{

        background:
          "linear-gradient(90deg, #0F172A, #111827)",

        borderBottom:
          "1px solid rgba(255,255,255,0.06)",

        position: "sticky",

        top: 0,

        zIndex: 1000,

        backdropFilter:
          "blur(12px)",

        boxShadow:
          "0 8px 25px rgba(0,0,0,0.12)"
      }}
    >

      {/* ========================================= */}
      {/* LEFT SIDE */}
      {/* ========================================= */}

      <div
        className="
          d-flex
          align-items-center
          gap-3
        "
      >

        {/* LOGO */}

        <div
          className="
            d-flex
            justify-content-center
            align-items-center
          "
          style={{

            width: "52px",

            height: "52px",

            borderRadius: "16px",

            background:
              "linear-gradient(135deg, #2563EB, #1D4ED8)",

            boxShadow:
              "0 8px 22px rgba(37,99,235,0.35)"
          }}
        >

          <ShieldCheck
            size={28}
            color="white"
          />

        </div>

        {/* BRAND */}

        <div>

          <h3
            className="m-0"
            style={{

              color: "white",

              fontWeight: "800",

              letterSpacing: "0.5px"
            }}
          >

            LoanRisk AI

          </h3>

          <small
            style={{

              color: "#94A3B8",

              fontSize: "13px",

              letterSpacing: "0.4px"
            }}
          >

            {
              isAdmin

                ? "Enterprise Admin Portal"

                : "Smart Credit Intelligence"
            }

          </small>

        </div>

      </div>

      {/* ========================================= */}
      {/* RIGHT SIDE */}
      {/* ========================================= */}

      <div
        className="
          d-flex
          align-items-center
          gap-3
          ms-auto
        "
      >

        {/* ADMIN DASHBOARD */}

        {
          isAdmin && (

            <button

              className="
                btn
                btn-primary
                d-flex
                align-items-center
                gap-2
              "

              style={{
                borderRadius: "14px"
              }}

              onClick={() => {

                window.location.href =
                  "/dashboard"
              }}
            >

              <LayoutDashboard size={18} />

              Dashboard

            </button>
          )
        }

        {/* NOTIFICATIONS */}

        <div
          className="
            d-flex
            justify-content-center
            align-items-center
          "
          style={{

            width: "46px",

            height: "46px",

            borderRadius: "14px",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.04)",

            cursor: "pointer"
          }}

          onClick={() => {

            toast.info(
              "No New Notifications"
            )
          }}
        >

          <Bell
            size={20}
            color="white"
          />

        </div>

        {/* SETTINGS */}

        <div
          className="
            d-flex
            justify-content-center
            align-items-center
          "
          style={{

            width: "46px",

            height: "46px",

            borderRadius: "14px",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.04)",

            cursor: "pointer"
          }}

          onClick={() => {

            toast.info(
              "Settings Coming Soon"
            )
          }}
        >

          <Settings
            size={20}
            color="white"
          />

        </div>

        {/* USER PROFILE */}

        <div
          className="
            d-flex
            align-items-center
            gap-3
            px-3
            py-2
          "
          style={{

            borderRadius: "16px",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.04)"
          }}
        >

          {/* AVATAR */}

          <div
            className="
              d-flex
              justify-content-center
              align-items-center
              fw-bold
            "
            style={{

              width: "42px",

              height: "42px",

              borderRadius: "50%",

              background:
                "linear-gradient(135deg, #2563EB, #3B82F6)",

              color: "white",

              fontSize: "18px",

              boxShadow:
                "0 5px 16px rgba(37,99,235,0.35)"
            }}
          >

            {userInitial}

          </div>

          {/* USER INFO */}

          <div>

            <div
              style={{

                color: "white",

                fontWeight: "700",

                fontSize: "15px"
              }}
            >

              {username}

            </div>

            <small
              style={{
                color: "#94A3B8"
              }}
            >

              {
                isAdmin

                  ? "Administrator"

                  : "Applicant"
              }

            </small>

          </div>

        </div>

        {/* LOGOUT */}

        <button

          className="
            btn
            text-white
            fw-semibold
            border-0
            d-flex
            align-items-center
            gap-2
          "

          style={{

            background:
              "linear-gradient(135deg, #EF4444, #DC2626)",

            borderRadius:
              "14px",

            padding:
              "12px 20px",

            boxShadow:
              "0 8px 20px rgba(239,68,68,0.25)"
          }}

          onClick={handleLogout}
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </nav>
  )
}
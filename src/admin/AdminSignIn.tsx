// AdminSignIn.tsx
import { SignIn } from "@clerk/clerk-react";

export function AdminSignIn() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0F1A10" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 28,
              color: "#fff",
              letterSpacing: 4,
            }}
          >
            GNADE
          </p>
          <p
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Admin Access
          </p>
        </div>
        <SignIn routing="hash" />
      </div>
    </div>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = Session["user"];

const Context = createContext<User | null>(null);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    const session = await getSession();
    const user = session?.user;
    setUser(user);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [router]);

  return (
    <Context.Provider value={user}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useUser = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

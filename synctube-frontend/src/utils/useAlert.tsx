import { Alert, Stack } from "@mui/material"
import { createContext, useContext, useEffect, useRef, useState } from "react"

type Severity = "success" | "info" | "warning" | "error"

type IAlert = {
    id: number,
    severity: Severity,
    text: string
}


export const useAlert = () => {

    const currentIdRef = useRef<number>(0);

    const [alerts, setAlerts] = useState<IAlert[]>([])

    const alert = (text: string, severity: Severity = "info") => {
        const currentId = currentIdRef.current;
        setAlerts([...alerts, {id: currentId, severity: severity, text: text}])
        currentIdRef.current++
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlerts([])
        }, 3000)
        return () => clearTimeout(timeout);
    }, [alerts])

    const Alerts = () => (
        <Stack direction="column-reverse" gap="5px" >
        {
            alerts.map(alert => <Alert key={alert.id} severity={alert.severity} >{alert.text}</Alert>)
        }
        </Stack>
    )
    
    return {
        Alerts,
        alert
    }
}


type AlertContextValue = {
  alert: ReturnType<typeof useAlert>["alert"];
  Alerts: ReturnType<typeof useAlert>["Alerts"];
};

export const AlertContext = createContext<AlertContextValue | null>(null);

export const GlobalAlertProvider = ({ children }: { children: React.ReactNode }) => {
  // 👇 your hook is used inside the provider
  const { alert, Alerts } = useAlert();

  return (
    <AlertContext.Provider value={{ alert, Alerts }}>
      {/* Render global alerts */}
      <div style={{ position: "fixed", bottom: "20px", zIndex: 9999 }}>
        <Alerts />
      </div>

      {children}
    </AlertContext.Provider>
  );
};

export const useGlobalAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useGlobalAlert must be used inside <GlobalAlertProvider />");
  return ctx;
};
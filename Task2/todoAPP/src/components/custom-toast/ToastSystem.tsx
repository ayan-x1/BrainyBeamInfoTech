import { ReactNode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { X, Undo, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const bars = [
  { animationDelay: "-1.2s", transform: "rotate(.0001deg) translate(146%)" },
  { animationDelay: "-1.1s", transform: "rotate(30deg) translate(146%)" },
  { animationDelay: "-1.0s", transform: "rotate(60deg) translate(146%)" },
  { animationDelay: "-0.9s", transform: "rotate(90deg) translate(146%)" },
  { animationDelay: "-0.8s", transform: "rotate(120deg) translate(146%)" },
  { animationDelay: "-0.7s", transform: "rotate(150deg) translate(146%)" },
  { animationDelay: "-0.6s", transform: "rotate(180deg) translate(146%)" },
  { animationDelay: "-0.5s", transform: "rotate(210deg) translate(146%)" },
  { animationDelay: "-0.4s", transform: "rotate(240deg) translate(146%)" },
  { animationDelay: "-0.3s", transform: "rotate(270deg) translate(146%)" },
  { animationDelay: "-0.2s", transform: "rotate(300deg) translate(146%)" },
  { animationDelay: "-0.1s", transform: "rotate(330deg) translate(146%)" }
];

const Spinner = ({ size = 20, color = "#8f8f8f" }: SpinnerProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <div className="relative top-1/2 left-1/2" style={{ width: size, height: size }}>
        {bars.map((item, index) => (
          <div
            key={index}
            className="absolute h-[8%] w-[24%] -left-[10%] -top-[3.9%] rounded-[5px] animate-spin"
            style={{ backgroundColor: color, ...item }}
          />
        ))}
      </div>
    </div>
  );
};

interface ButtonProps {
  size?: "tiny" | "small" | "medium" | "large";
  type?: "primary" | "secondary" | "tertiary" | "error" | "warning";
  variant?: "styled" | "unstyled";
  shape?: "square" | "circle" | "rounded";
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  shadow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({
  size = "medium",
  type = "primary",
  variant = "styled",
  shape = "square",
  svgOnly = false,
  children,
  prefix,
  suffix,
  shadow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  ...rest
}: ButtonProps) => {
  const sizes = [
    {
      tiny: "px-1.5 h-6 text-sm",
      small: "px-1.5 h-8 text-sm",
      medium: "px-2.5 h-10 text-sm",
      large: "px-3.5 h-12 text-base"
    },
    {
      tiny: "w-6 h-6 text-sm",
      small: "w-8 h-8 text-sm",
      medium: "w-10 h-10 text-sm",
      large: "w-12 h-12 text-base"
    }
  ];

  const types = {
    primary: "bg-foreground hover:bg-foreground/90 text-background",
    secondary: "bg-background hover:bg-muted text-foreground border border-border",
    tertiary: "bg-transparent hover:bg-muted text-foreground",
    error: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white"
  } as const;

  const shapes = {
    square: { tiny: "rounded", small: "rounded-md", medium: "rounded-md", large: "rounded-lg" },
    circle: { tiny: "rounded-full", small: "rounded-full", medium: "rounded-full", large: "rounded-full" },
    rounded: { tiny: "rounded-full", small: "rounded-full", medium: "rounded-full", large: "rounded-full" }
  } as const;

  const sizeClasses = sizes[+svgOnly][size];
  const typeClasses = (disabled || loading) ? "bg-muted text-muted-foreground cursor-not-allowed" : (types as any)[type];
  const shapeClasses = (shapes as any)[shape][size];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center gap-1 duration-150 ${sizeClasses} ${typeClasses} ${shapeClasses} ${shadow ? "shadow-sm" : ""} ${fullWidth ? "w-full" : ""} ${variant === "unstyled" ? "outline-none px-0 h-fit bg-transparent hover:bg-transparent" : "focus:outline-none focus:ring-2 focus:ring-ring"} ${className}`}
      {...rest}
    >
      {loading ? <Spinner size={size === "large" ? 24 : 16} /> : prefix}
      {children && (
        <span className={`relative overflow-hidden whitespace-nowrap ${size !== "tiny" && variant !== "unstyled" ? "px-1.5" : ""}`}>
          {children}
        </span>
      )}
      {!loading && suffix}
    </button>
  );
};

type ToastType = "message" | "success" | "warning" | "error";

type Toast = {
  id: number;
  text: string | ReactNode;
  measuredHeight?: number;
  timeout?: any;
  remaining?: number;
  start?: number;
  pause?: () => void;
  resume?: () => void;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
  type: ToastType;
};

let root: ReturnType<typeof createRoot> | null = null;
let toastId = 0;

const toastStore = {
  toasts: [] as Toast[],
  listeners: new Set<() => void>(),

  add(
    text: string | ReactNode,
    type: ToastType,
    preserve?: boolean,
    action?: string,
    onAction?: () => void,
    onUndoAction?: () => void
  ) {
    const id = toastId++;

    const toast: Toast = { id, text, preserve, action, onAction, onUndoAction, type };

    if (!toast.preserve) {
      toast.remaining = 3000;
      toast.start = Date.now();

      const close = () => {
        this.toasts = this.toasts.filter((t) => t.id !== id);
        this.notify();
      };

      toast.timeout = setTimeout(close, toast.remaining);

      toast.pause = () => {
        if (!toast.timeout) return;
        clearTimeout(toast.timeout);
        toast.timeout = undefined;
        toast.remaining! -= Date.now() - toast.start!;
      };

      toast.resume = () => {
        if (toast.timeout) return;
        toast.start = Date.now();
        toast.timeout = setTimeout(close, toast.remaining);
      };
    }

    this.toasts.push(toast);
    this.notify();
  },

  remove(id: number) {
    toastStore.toasts = toastStore.toasts.filter((t) => t.id !== id);
    toastStore.notify();
  },

  subscribe(listener: () => void) {
    toastStore.listeners.add(listener);
    return () => {
      toastStore.listeners.delete(listener);
    };
  },

  notify() {
    toastStore.listeners.forEach((fn) => fn());
  }
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [shownIds, setShownIds] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const measureRef = (toast: Toast) => (node: HTMLDivElement | null) => {
    if (node && toast.measuredHeight == null) {
      toast.measuredHeight = node.getBoundingClientRect().height;
      toastStore.notify();
    }
  };

  useEffect(() => {
    setToasts([...toastStore.toasts]);
    return toastStore.subscribe(() => {
      setToasts([...toastStore.toasts]);
    });
  }, []);

  useEffect(() => {
    const unseen = toasts.filter(t => !shownIds.includes(t.id)).map(t => t.id);
    if (unseen.length > 0) {
      requestAnimationFrame(() => {
        setShownIds(prev => [...prev, ...unseen]);
      });
    }
  }, [toasts]);

  const lastVisibleCount = 3;
  const lastVisibleStart = Math.max(0, toasts.length - lastVisibleCount);

  const getFinalTransform = (index: number, length: number) => {
    if (index === length - 1) {
      return "none";
    }
    const offset = length - 1 - index;
    let translateY = toasts[length - 1]?.measuredHeight || 63;
    for (let i = length - 1; i > index; i--) {
      if (isHovered) {
        translateY += (toasts[i - 1]?.measuredHeight || 63) + 10;
      } else {
        translateY += 20;
      }
    }
    const z = -offset;
    const scale = isHovered ? 1 : (1 - 0.05 * offset);
    return `translate3d(0, calc(100% - ${translateY}px), ${z}px) scale(${scale})`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    toastStore.toasts.forEach((t) => t.pause?.());
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    toastStore.toasts.forEach((t) => t.resume?.());
  };

  const visibleToasts = toasts.slice(lastVisibleStart);
  const containerHeight = visibleToasts.reduce((acc, toast) => acc + (toast.measuredHeight ?? 63), 0);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white border-green-600";
      case "warning":
        return "bg-yellow-500 text-black border-yellow-600";
      case "error":
        return "bg-red-500 text-white border-red-600";
      default:
        return "bg-background text-foreground border-border";
    }
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none w-[420px]" style={{ height: containerHeight }}>
      <div
        className="relative pointer-events-auto w-full"
        style={{ height: containerHeight }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {toasts.map((toast, index) => {
          const isVisible = index >= Math.max(0, toasts.length - 3);
          return (
            <div
              key={toast.id}
              ref={measureRef(toast)}
              className={`absolute right-0 bottom-0 shadow-lg rounded-xl leading-[21px] p-4 h-fit border ${getToastStyles(toast.type)} ${isVisible ? "opacity-100" : "opacity-0"} ${index < Math.max(0, toasts.length - 3) ? "pointer-events-none" : ""}`}
              style={{
                width: 420,
                transition: "all .35s cubic-bezier(.25,.75,.6,.98)",
                transform: shownIds.includes(toast.id)
                  ? getFinalTransform(index, toasts.length)
                  : "translate3d(0, 100%, 150px) scale(1)"
              }}
            >
              <div className="flex flex-col items-center justify-between text-sm">
                <div className="w-full h-full flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {getToastIcon(toast.type)}
                    <span>{toast.text}</span>
                  </div>
                  {!toast.action && (
                    <div className="flex gap-1">
                      {toast.onUndoAction && (
                        <Button type="tertiary" svgOnly size="small" onClick={() => { toast.onUndoAction?.(); toastStore.remove(toast.id); }}>
                          <Undo className="w-4 h-4" />
                        </Button>
                      )}
                      <Button type="tertiary" svgOnly size="small" onClick={() => toastStore.remove(toast.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {toast.action && (
                  <div className="w-full flex items-center justify-end gap-2 mt-2">
                    <Button type="tertiary" size="small" onClick={() => toastStore.remove(toast.id)}>
                      Dismiss
                    </Button>
                    <Button type="primary" size="small" onClick={() => { toast?.onAction?.(); toastStore.remove(toast.id); }}>
                      {toast.action}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mountContainer = () => {
  if (root) return;
  const el = document.createElement("div");
  el.className = "fixed bottom-4 right-4 z-[9999]";
  document.body.appendChild(el);
  root = createRoot(el);
  root.render(<ToastContainer />);
};

interface Message {
  text: string | ReactNode;
  preserve?: boolean;
  action?: string;
  onAction?: () => void;
  onUndoAction?: () => void;
}

export const useToasts = () => {
  return {
    message: useCallback(({ text, preserve, action, onAction, onUndoAction }: Message) => {
      mountContainer();
      (toastStore as any).add(text, "message", preserve, action, onAction, onUndoAction);
    }, []),
    success: useCallback((text: string) => {
      mountContainer();
      (toastStore as any).add(text, "success");
    }, []),
    warning: useCallback((text: string) => {
      mountContainer();
      (toastStore as any).add(text, "warning");
    }, []),
    error: useCallback((text: string) => {
      mountContainer();
      (toastStore as any).add(text, "error");
    }, []),
  };
};

export function ToastDemoBlock() {
  const toasts = useToasts();

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold mb-4">Toast Demo</h2>
      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => toasts.message({ text: "This is a message toast" })}>Show Message</Button>
        <Button onClick={() => toasts.success("Operation completed successfully!")}>Show Success</Button>
        <Button onClick={() => toasts.warning("This is a warning message")}>Show Warning</Button>
        <Button onClick={() => toasts.error("An error occurred")}>Show Error</Button>
        <Button onClick={() => toasts.message({ text: "Do you want to continue?", action: "Continue", onAction: () => console.log("Action clicked") })}>Show Action Toast</Button>
      </div>
    </div>
  );
}



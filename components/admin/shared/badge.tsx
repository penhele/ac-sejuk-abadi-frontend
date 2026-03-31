import { cn } from "@/lib/utils"; // Pastikan kamu punya file utils ini (standar Shadcn)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "destructive" | "outline";
}

export function Badge({ 
  children, 
  className, 
  variant = "default", 
  ...props 
}: BadgeProps) {
  
  // Logic untuk styling berdasarkan variant
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    success: "bg-green-100 text-green-700 hover:bg-green-200",
    destructive: "bg-red-100 text-red-700 hover:bg-red-200",
    outline: "text-foreground border border-input hover:bg-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant], // Ambil style sesuai variant
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
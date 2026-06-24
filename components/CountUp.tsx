import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

// Client-side module-scoped memory to track animated components across SPA transitions
const animatedKeys = new Set<string>();

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
  id?: string;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
  id,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const animationKey = id || `${from}-${to}`;
  const alreadyAnimated =
    typeof window !== "undefined" && animatedKeys.has(animationKey);

  // If already animated in this session, start at the end value
  const startVal = alreadyAnimated
    ? direction === "down"
      ? from
      : to
    : direction === "down"
      ? to
      : from;

  const motionValue = useMotionValue(startVal);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };

      const formattedNumber = Intl.NumberFormat("en-US", options).format(
        latest,
      );

      return separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
    },
    [maxDecimals, separator],
  );

  // Set the initial text content based on whether it has already animated
  useEffect(() => {
    if (ref.current) {
      const initialTextVal = alreadyAnimated
        ? direction === "down"
          ? from
          : to
        : direction === "down"
          ? to
          : from;
      ref.current.textContent = formatValue(initialTextVal);
    }
  }, [from, to, direction, formatValue, alreadyAnimated]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (alreadyAnimated) {
        // If already animated, immediately ensure the target text is displayed and exit
        if (ref.current) {
          ref.current.textContent = formatValue(
            direction === "down" ? from : to,
          );
        }
        return;
      }

      // Mark this element as animated
      animatedKeys.add(animationKey);

      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000,
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
    alreadyAnimated,
    animationKey,
    formatValue,
  ]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}

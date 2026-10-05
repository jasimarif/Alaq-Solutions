import styles from "./Cursor.module.css";
import { useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";

const CURSOR_STYLES = {
  CURSOR: "hidden select-none pointer-events-none",
  FOLLOWER: "hidden select-none pointer-events-none",
};

const isSmallScreen = () => {
  if (typeof document === 'undefined') return false;
  return document.body.clientWidth < 767;
};

const Cursor = ({ isDesktop }) => {
  const cursor = useRef(null);
  const follower = useRef(null);

  const onHover = () => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, {
      scale: 0.6,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(follower.current, {
      scale: 1.35,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onUnhover = () => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(follower.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const moveCircle = (e) => {
    if (!cursor.current || !follower.current) return;
    gsap.to(cursor.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: Linear.easeNone,
    });
    gsap.to(follower.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: Linear.easeNone,
    });
  };

  useEffect(() => {
    if (!isDesktop || isSmallScreen()) return;

    if (follower.current) follower.current.classList.remove("hidden");
    if (cursor.current) cursor.current.classList.remove("hidden");

    const handleMouseMove = (e) => {
      moveCircle(e);
    };

    // Event delegation on document (checks e.target.closest('.link'))
    const handleMouseOver = (e) => {
      if (e.target && typeof e.target.closest === "function" && e.target.closest(".link")) {
        onHover();
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && typeof e.target.closest === "function" && e.target.closest(".link")) {
        const related = e.relatedTarget;
        if (!related || typeof related.closest !== "function" || !related.closest(".link")) {
          onUnhover();
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={cursor}
        className={`${styles.cursor} ${CURSOR_STYLES.CURSOR}`}
      ></div>
      <div
        ref={follower}
        className={`${styles.cursorFollower} ${CURSOR_STYLES.FOLLOWER}`}
      ></div>
    </>
  );
};

export default Cursor;

"use client";

import { useEffect, useRef } from "react";
import { CanvasSpace, Create, Pt } from "pts";

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<CanvasSpace | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create canvas space and form
    spaceRef.current = new CanvasSpace(containerRef.current);
    const space = spaceRef.current;
    const form = space.getForm();

    // Create points as Pt objects
    const points = Create.distributeRandom(space.bound, 100).map(
      (p) => new Pt([p[0], p[1]])
    );

    // Animation
    space.add({
      animate: (time, ftime) => {
        const mouse = space.pointer;

        // Clear with transparent background instead of black
        form.fillOnly("rgba(0,0,0,0)").rect([[0, 0], space.size]);

        // Draw connecting lines first
        points.forEach((p1) => {
          points.forEach((p2) => {
            const dist = p1.$subtract(p2).magnitude();
            if (dist < 100) {
              form
                .stroke(`rgba(79, 70, 229, ${0.15 * (1 - dist / 100)})`)
                .line([p1, p2]);
            }
          });
        });

        // Then draw points
        points.forEach((p, i) => {
          // Move points away from mouse
          const mouseVec = p.$subtract(mouse);
          const dist = mouseVec.magnitude();
          if (dist < 100) {
            const push = 100 - dist;
            const angle = Math.atan2(mouseVec[1], mouseVec[0]);
            p[0] += Math.cos(angle) * push * 0.01;
            p[1] += Math.sin(angle) * push * 0.01;
          }

          // Keep points within bounds
          if (
            p[0] < 0 ||
            p[0] > space.size.x ||
            p[1] < 0 ||
            p[1] > space.size.y
          ) {
            const newPt = Create.distributeRandom(space.bound, 1)[0];
            p[0] = newPt[0];
            p[1] = newPt[1];
          }

          // Draw points with a glowing effect
          form.fillOnly("rgba(79, 70, 229, 0.8)").point(p, 3, "circle");
        });
      },

      resize: (bound) => {
        const newPoints = Create.distributeRandom(bound, 100);
        points.forEach((p, i) => {
          p[0] = newPoints[i][0];
          p[1] = newPoints[i][1];
        });
      },
    });

    // Start animation
    space.bindMouse().bindTouch().play();

    // Cleanup
    return () => {
      if (spaceRef.current) {
        spaceRef.current.removeAll();
        spaceRef.current.stop();
        const canvas = containerRef.current?.querySelector("canvas");
        if (canvas) {
          canvas.remove();
        }
        spaceRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full bg-transparent" />;
}

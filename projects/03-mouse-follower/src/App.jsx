import { useEffect, useState } from "react";
import "./App.css";

/**
 * Functional component that creates a pointer-following effect.
 * It displays a circle that follows the mouse pointer when enabled.
 */
const FollowMouse = () => {
  // State to toggle the pointer effect on or off
  const [enabled, setEnabled] = useState(false);

  // State to track the current mouse pointer position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * Effect hook to handle the mousemove event and update the position state.
   * It subscribes or unsubscribes based on the 'enabled' state.
   */
  useEffect(() => {
    console.log("Effect: ", { enabled });

    /**
     * Event handler for the mousemove event.
     * Updates the position state with the current mouse pointer coordinates.
     */
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove: ", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    // Subscribe or unsubscribe based on the 'enabled' state
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    // !Cleanup
    // -> When unsubscribe from the mousemove event when the component is unmounted or
    // -> when 'enabled' state changes (before re-executing the effect).
    return () => {
      console.log("clean up");
      window.removeEventListener("pointermove", handleMove);
    };

    // *Utilizing getEventListeners(window) provides a convenient way, available only in Chrome,
    // *to retrieve a list of all elements subscribed to a particular event, offering insights into event bindings.

    // Dependency array: Effect depends on the 'enabled' state.
  }, [enabled]);

  return (
    <>
      {/* Circle element to represent the mouse pointer */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Deactivate" : "Active"} to follow pointer
      </button>
    </>
  );
};

/*
 Main App component that includes the FollowMouse component.
*/
function App() {
  // State to toggle the mounting of the FollowMouse component
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted Follow component
      </button>
    </main>
  );
}

export default App;

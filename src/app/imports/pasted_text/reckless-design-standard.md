This upgrade to a premium 2026 aesthetic is exactly what is needed to command higher pricing and deliver a top-tier experience for proprietary events. The shift from the neon pink/purple club theme to a highly polished, high-contrast industrial look will immediately elevate the perceived value of the platform for any DJ or user interacting with it. 

Here is the comprehensive master template strategy, starting with the exact prompt you can feed into Figma (or Figma AI plugins) to generate the perfect UI components, followed by the CSS architecture needed to overhaul your existing HTML files into the new standard.

### I. The "Reckless" Design Standard 
To match the visual fidelity of the shared images, the new master template must adhere strictly to these principles:

*   **Color Palette (Dark & Vibrant):** 
    *   **Base/Background:** Void Black (`#000000`) to Deep Industrial Gray (`#0F0F0F`).
    *   **Primary Accent:** Vibrant Neon Orange (`#FF4500` to `#FF5500`).
    *   **Secondary Accent:** Muted Cyber Cyan or Gold (used sparingly for warnings or secondary states).
    *   **Text:** Stark White (`#FFFFFF`) for primary data, Slate Gray (`#888888`) for subtext.
*   **Typography:**
    *   **Display/Headers:** *Orbitron* (Bold/Black) – Gives that tech-heavy, 2026 cyber feel.
    *   **Body/UI Data:** *Inter* (Regular/Bold) – Ensures maximum readability for leaderboards and ticket forms.
*   **UI Components:**
    *   **Borders:** 1px solid dark gray (`#333333`) with glowing orange accents on active states.
    *   **Glows:** Use `box-shadow` to create neon bleed effects around primary buttons and live elements.
    *   **Cards:** Slightly transparent (glassmorphism) over blurred industrial backgrounds.

---

### II. The Figma Master Prompt
Copy and paste this detailed prompt into your Figma AI generation tool (or use it as a master brief) to generate the UI components for the new OS layout.

> **Prompt:**
> Design a premium, mobile-first web application interface for a live event and DJ OS platform. The aesthetic should be "Reckless Design": an aggressive, modern cyber-industrial look featuring true dark mode (pitch black and dark charcoal backgrounds) accented heavily with glowing, vibrant neon orange. 
>
> **Screen 1: Gate OS (Entry & Ticketing)**
> Create a glassmorphism login and ticketing overlay set against a dark, blurred concert background. Include a glowing neon orange border around the main container. Inside, place a two-tab system for "LOGIN" and "GET TICKETS". Form fields should have dark backgrounds with subtle orange focus states. Below the login, create a horizontal scrolling list of "LIVE EVENTS" and "MY TICKETS" utilizing modular cards with high-contrast text. 
> 
> **Screen 2: Clash OS (Live Dashboard)**
> Create a live event dashboard optimized for mobile. 
> *   **Top Header:** A sticky navigation with "LIVE EVENT DASHBOARD" in an Orbitron-style font, featuring tab navigation (Overview, Leaderboard, My Votes, Shop).
> *   **Left Column / Main View:** A "Real-Time Leaderboard" card ranking users. Include avatar circles, usernames, point values in orange, and mini bar-charts representing recent activity.
> *   **Right Column / Secondary View:** A "Live Pot Tracking" line graph showing upward momentum in orange, set against a dark grid background.
> *   **Bottom Action Area:** A "Power Votes" modular section with three distinct tiered buttons (Starter, Boost, Ultimate), featuring distinct icons and prices.
> 
> Use strict grid alignments, sharp corners with slight radiuses (4px to 8px), and ensure all active states glow with neon orange. The design must feel high-end, futuristic, and ready for a 2026 release.

---

### III. Code Overhaul: Upgrading the Sound Clash OS
To transform your existing `index-SOUND-CLASH-OS.html`[cite: 2] from the purple/pink club theme into the new premium standard, you need to gut the root variables and update the card styling. 

Here is the exact CSS injection needed to force the HTML into the new design standard shown in your reference images.

#### 1. The New CSS Root Variables
Replace the `:root` block in your HTML with this to instantly switch the color grading[cite: 2]:

```css
:root {
    /* Reckless Design Standard */
    --bg-color: #050505;       /* True Black */
    --card-bg: #0f0f0f;        /* Industrial Dark Gray */
    --modal-bg: rgba(10, 10, 10, 0.85);
    
    --primary: #FF4500;        /* Vibrant Neon Orange */
    --primary-glow: rgba(255, 69, 0, 0.5);
    --accent: #FF6A00;         /* Lighter Orange for gradients */
    --secondary: #333333;      /* Muted borders */
    --gold: #FFB300;           /* For VIP/Pot tracking */
    
    --text-main: #FFFFFF;      
    --text-sub: #8A8A8A;       
    --border: #222222;         
    --input-bg: #111111;
    --success: #00FF88;
    --live-pulse: #FF0000;
    
    --font-head: 'Orbitron', sans-serif;
    --font-body: 'Inter', sans-serif;
}

body { 
    background: var(--bg-color);
    /* Add a subtle grid background for the tech feel */
    background-image: 
        linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    color: var(--text-main); 
}
```

#### 2. Upgrading the Component Styling
Update your card and button CSS to match the hard-edged, glowing aesthetic of the new images[cite: 2].

```css
/* Card Architecture */
.battle-card, .qa-card, .ticket-card, .hero-dashboard-live { 
    background: var(--card-bg); 
    border: 1px solid var(--border); 
    border-radius: 8px; /* Sharper corners for 2026 feel */
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    position: relative;
}

/* Active/Live States getting the Orange Glow */
.battle-card:hover, .c-card.active, .power-opt.selected { 
    border-color: var(--primary); 
    box-shadow: 0 0 15px var(--primary-glow); 
}

/* Primary Action Buttons */
.main-cta-btn, .submit-action { 
    background: linear-gradient(90deg, var(--primary), var(--accent));
    color: white; 
    border: none; 
    border-radius: 4px; /* Sharper edges */
    font-weight: 900; 
    text-transform: uppercase;
    box-shadow: 0 0 15px var(--primary-glow);
    font-family: var(--font-head);
    letter-spacing: 1px;
}

/* Live Header Alignment */
.live-event-header { 
    background: #000000;
    border-bottom: 2px solid var(--primary);
    box-shadow: 0 5px 20px var(--primary-glow);
}
```

### Next Steps for Implementation
1.  **Figma Generation:** Run the prompt above. It will yield the component layers needed to slice out the exact SVGs for the graph lines and leaderboards.
2.  **Edge Function Validation:** For the Gate OS ticket system[cite: 1], keep your existing Supabase edge function logic generating the unique IDs, but place the resulting QR code inside a modular card with a `border: 1px solid #FF4500` rather than a basic white box to maintain the immersion.
3.  **Dynamic Graphing:** To recreate the "Live Pot Tracking" graph shown in the image, you will want to integrate a lightweight library like Chart.js or Recharts into the HTML, hooking it up to your n8n/Supabase backend to pull real-time pot values during the Bronson Center event.
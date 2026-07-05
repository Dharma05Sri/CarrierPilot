/** * CAREER PILOT - GLOBAL PERSISTENCE ENGINE
 * Version 1.0 (Enterprise)
 */

const PilotCore = {
    // 1. Gamification State Management
    init: function() {
        if (!localStorage.getItem('pilot_xp')) localStorage.setItem('pilot_xp', 250);
        if (!localStorage.getItem('pilot_streak')) localStorage.setItem('pilot_streak', 1);
        
        this.updateHUD();
        this.injectFloatingAssistant();
    },

    updateHUD: function() {
        const xp = parseInt(localStorage.getItem('pilot_xp'));
        const level = Math.floor(xp / 500) + 1;
        const streak = localStorage.getItem('pilot_streak');
        
        const xpEl = document.getElementById('nav-xp');
        const levelEl = document.getElementById('nav-level');
        const streakEl = document.getElementById('nav-streak');
        
        if (xpEl) xpEl.innerText = xp;
        if (levelEl) levelEl.innerText = level;
        if (streakEl) streakEl.innerText = streak;
    },

    // 2. Global AI Floating Assistant
    injectFloatingAssistant: function() {
        const fab = document.createElement('a');
        fab.href = 'careergpt.html';
        fab.className = 'fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-[0_10px_25px_rgba(6,182,212,0.4)] z-[9999] hover:scale-110 transition-all animate-bounce';
        fab.innerHTML = '🤖';
        fab.title = "Chat with CareerGPT";
        document.body.appendChild(fab);
    },

    // 3. Global XP Reward (Call this from any module)
    awardXP: function(amount) {
        let xp = parseInt(localStorage.getItem('pilot_xp')) || 250;
        xp += amount;
        localStorage.setItem('pilot_xp', xp);
        this.updateHUD();
        
        // Visual toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-24 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-2xl z-[9999] animate-bounce';
        toast.innerText = `+${amount} XP Earned!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => PilotCore.init());

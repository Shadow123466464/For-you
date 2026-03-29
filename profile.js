class ProfileManager {
    constructor() {
        this.profile = null;
        this.currentStep = 1;
        this.totalSteps = 6;
        this.avatarConfig = {
            gender: 'girl',
            skinTone: 'skin1',
            hairStyle: 'medium',
            hairColor: 'brown',
            outfitStyle: 'casual',
            outfitColor: 'pink',
            glasses: 'none',
            headAccessory: 'none',
            faceFeature: 'none'
        };
        this.themeColor = '#ff6b81';
        this.tempAvatarConfig = null;
        this.tempThemeColor = null;
        
        this.init();
    }
    
    init() {
        this.loadProfile();
        
        if (this.profile) {
            this.hideSetup();
            this.applyProfile();
            this.startApp();
        } else {
            this.showSetup();
            this.setupSetupListeners();
        }
        
        this.setupSettingsListeners();
    }
    
    loadProfile() {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            this.profile = JSON.parse(saved);
            if (this.profile.avatar) {
                this.avatarConfig = this.profile.avatar;
            }
            this.themeColor = this.profile.themeColor || '#ff6b81';
        }
    }
    
    saveProfile() {
        localStorage.setItem('userProfile', JSON.stringify(this.profile));
    }
    
    showSetup() {
        document.getElementById('profileSetupOverlay').classList.remove('hidden');
        document.getElementById('wordleOverlay').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'none';
        this.updateSetupAvatar();
    }
    
    hideSetup() {
        document.getElementById('profileSetupOverlay').classList.add('hidden');
    }
    
    setupSetupListeners() {
        const step2Btn = document.getElementById('toStep2');
        const step3Btn = document.getElementById('toStep3');
        const step4Btn = document.getElementById('toStep4');
        const step5Btn = document.getElementById('toStep5');
        const step6Btn = document.getElementById('toStep6');
        
        const back1Btn = document.getElementById('backToStep1');
        const back2Btn = document.getElementById('backToStep2');
        const back3Btn = document.getElementById('backToStep3');
        const back4Btn = document.getElementById('backToStep4');
        const back5Btn = document.getElementById('backToStep5');
        
        const finishBtn = document.getElementById('finishSetup');
        
        if (step2Btn) step2Btn.addEventListener('click', () => this.goToStep(2));
        if (step3Btn) step3Btn.addEventListener('click', () => this.goToStep(3));
        if (step4Btn) step4Btn.addEventListener('click', () => this.goToStep(4));
        if (step5Btn) step5Btn.addEventListener('click', () => this.goToStep(5));
        if (step6Btn) step6Btn.addEventListener('click', () => this.goToStep(6));
        
        if (back1Btn) back1Btn.addEventListener('click', () => this.goToStep(1));
        if (back2Btn) back2Btn.addEventListener('click', () => this.goToStep(2));
        if (back3Btn) back3Btn.addEventListener('click', () => this.goToStep(3));
        if (back4Btn) back4Btn.addEventListener('click', () => this.goToStep(4));
        if (back5Btn) back5Btn.addEventListener('click', () => this.goToStep(5));
        
        if (finishBtn) finishBtn.addEventListener('click', () => this.finishSetup());
        
        this.setupOptionButtons('genderOptions', 'gender');
        this.setupColorCircles('skinOptions', 'skinTone');
        this.setupOptionCards('hairStyleOptions', 'hairStyle');
        this.setupColorCircles('hairColorOptions', 'hairColor');
        this.setupOptionCards('outfitStyleOptions', 'outfitStyle');
        this.setupColorCircles('outfitColorOptions', 'outfitColor');
        this.setupOptionCards('glassesOptions', 'glasses');
        this.setupOptionCards('headAccessoryOptions', 'headAccessory');
        this.setupOptionCards('faceFeatureOptions', 'faceFeature');
        this.setupThemeColorCircles('themeColorOptions');
        
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        
        if (firstNameInput) {
            firstNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (lastNameInput) lastNameInput.focus();
                }
            });
        }
        
        if (lastNameInput) {
            lastNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.goToStep(2);
            });
        }
    }
    
    setupOptionButtons(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const buttons = container.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.avatarConfig[configKey] = btn.dataset.value;
                this.updateSetupAvatar();
            });
        });
    }
    
    setupColorCircles(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const circles = container.querySelectorAll('.color-circle');
        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                circles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');
                this.avatarConfig[configKey] = circle.dataset.value;
                this.updateSetupAvatar();
            });
        });
    }
    
    setupOptionCards(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const cards = container.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.avatarConfig[configKey] = card.dataset.value;
                this.updateSetupAvatar();
            });
        });
    }
    
    setupThemeColorCircles(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const circles = container.querySelectorAll('.color-circle');
        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                circles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');
                this.themeColor = circle.dataset.value;
            });
        });
    }
    
    goToStep(step) {
        if (step > this.currentStep) {
            if (!this.validateStep(this.currentStep)) return;
        }
        
        const currentStepEl = document.getElementById(`step${this.currentStep}`);
        if (currentStepEl) currentStepEl.classList.remove('active');
        
        const newStepEl = document.getElementById(`step${step}`);
        if (newStepEl) newStepEl.classList.add('active');
        
        this.currentStep = step;
        this.updateSetupAvatar();
    }
    
    validateStep(step) {
        if (step === 1) {
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const errorEl = document.getElementById('step1Error');
            
            if (!firstName) {
                if (errorEl) errorEl.textContent = 'Please enter your first name';
                return false;
            }
            if (!lastName) {
                if (errorEl) errorEl.textContent = 'Please enter your last name';
                return false;
            }
            if (errorEl) errorEl.textContent = '';
        }
        return true;
    }
    
    updateSetupAvatar() {
        const previewIds = [
            'setupAvatarPreview',
            'setupAvatarPreview2',
            'setupAvatarPreview3',
            'setupAvatarPreview4',
            'setupAvatarPreviewFinal'
        ];
        
        previewIds.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                renderAvatar(id, this.avatarConfig, 'normal', false);
            }
        });
    }
    
    finishSetup() {
        if (!this.validateStep(1)) {
            this.goToStep(1);
            return;
        }
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        
        this.profile = {
            firstName: firstName,
            lastName: lastName,
            avatar: { ...this.avatarConfig },
            themeColor: this.themeColor,
            createdAt: new Date().toISOString(),
            lettersOpened: 0,
            wordlesPlayed: 0
        };
        
        this.saveProfile();
        this.hideSetup();
        this.applyProfile();
        
        if (typeof checkIfAzza === 'function' && checkIfAzza(firstName, lastName)) {
            showSpecialAzzaPage(this.avatarConfig);
            
            const checkOverlay = setInterval(() => {
                const overlay = document.getElementById('specialAzzaOverlay');
                if (!overlay || !overlay.classList.contains('show')) {
                    clearInterval(checkOverlay);
                    this.startApp();
                }
            }, 500);
        } else {
            this.startApp();
        }
    }
    
    applyProfile() {
        if (!this.profile) return;
        
        const nameElement = document.getElementById('profileName');
        if (nameElement) {
            nameElement.textContent = `${this.profile.firstName} ${this.profile.lastName}`;
        }
        
        this.updateStreakDisplay();
        
        if (this.profile.avatar) {
            renderAvatar('profileAvatarSmall', this.profile.avatar, 'mini', true);
        }
        
        this.applyThemeColor(this.profile.themeColor);
    }
    
    updateStreakDisplay() {
        const streak = parseInt(localStorage.getItem('wordleStreak') || '0');
        const streakElement = document.getElementById('profileStreak');
        if (streakElement) {
            streakElement.textContent = `🔥 ${streak} day${streak !== 1 ? 's' : ''}`;
        }
    }
    
    applyThemeColor(color) {
        if (!color) color = '#ff6b81';
        
        const existingStyle = document.getElementById('theme-style');
        if (existingStyle) existingStyle.remove();
        
        const style = document.createElement('style');
        style.id = 'theme-style';
        
        style.textContent = `
            :root {
                --theme-color: ${color};
            }
            
            .heart-icon,
            .profile-streak,
            .wordle-title,
            .profile-setup-header h1,
            .settings-header h2 i,
            .stat-value,
            .setup-step h2 {
                color: ${color} !important;
            }
            
            .profile-setup-btn,
            .settings-save-btn,
            .paper button,
            .secret-letter-button,
            .return-button,
            .continue-btn,
            .hint-btn,
            .next-btn,
            .finish-btn,
            .step-btn.next-btn,
            .step-btn.finish-btn,
            .special-azza-close {
                background: linear-gradient(135deg, ${color} 0%, ${this.lightenColor(color, 20)} 100%) !important;
            }
            
            .form-group input:focus {
                border-color: ${color} !important;
                box-shadow: 0 0 0 3px ${color}33 !important;
            }
            
            .character-option.selected,
            .option-card.selected,
            .option-btn.selected,
            .scroll-option.selected {
                border-color: ${color} !important;
            }
            
            .option-btn.selected,
            .scroll-option.selected {
                background: ${color} !important;
                color: white !important;
            }
            
            .option-card.selected {
                background: ${color}1a !important;
            }
            
            .color-circle.selected {
                border-color: #333 !important;
            }
            
            .typewriter-cursor {
                background-color: ${color} !important;
            }
            
            .subtitle::after {
                background: ${color} !important;
            }
            
            .settings-tab.active {
                color: ${color} !important;
                border-bottom-color: ${color} !important;
            }
            
            .streak-display {
                background: linear-gradient(135deg, ${this.lightenColor(color, -10)} 0%, ${color} 100%) !important;
            }
            
            .avatar-head-accessory.bow::before,
            .avatar-head-accessory.bow::after,
            .avatar-head-accessory.headband {
                background: ${color} !important;
            }
            
            .special-azza-title {
                color: ${color} !important;
            }
            
            .preview-button {
                background: ${color} !important;
            }
            
            .preview-heart {
                color: ${color} !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }
    
    setupSettingsListeners() {
        const settingsBtn = document.getElementById('settingsButton');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }
        
        const profileDisplay = document.getElementById('profileDisplay');
        if (profileDisplay) {
            profileDisplay.addEventListener('click', () => this.openSettings());
        }
        
        const settingsClose = document.getElementById('settingsClose');
        if (settingsClose) {
            settingsClose.addEventListener('click', () => this.closeSettings());
        }
        
        const settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) {
            settingsOverlay.addEventListener('click', (e) => {
                if (e.target.id === 'settingsOverlay') {
                    this.closeSettings();
                }
            });
        }
        
        const tabs = document.querySelectorAll('.settings-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.settings-tab-content').forEach(c => c.classList.remove('active'));
                const tabContent = document.getElementById(`${tab.dataset.tab}Tab`);
                if (tabContent) tabContent.classList.add('active');
            });
        });
        
        this.setupSettingsAvatarOptions();
        
        const saveBtn = document.getElementById('saveSettingsBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveSettings());
        }
    }
    
    setupSettingsAvatarOptions() {
        this.setupSettingsOptionButtons('settingsGenderOptions', 'gender');
        this.setupSettingsColorCircles('settingsSkinOptions', 'skinTone');
        this.setupSettingsScrollOptions('settingsHairStyleOptions', 'hairStyle');
        this.setupSettingsColorCircles('settingsHairColorOptions', 'hairColor');
        this.setupSettingsScrollOptions('settingsOutfitOptions', 'outfitStyle');
        this.setupSettingsColorCircles('settingsOutfitColorOptions', 'outfitColor');
        this.setupSettingsScrollOptions('settingsGlassesOptions', 'glasses');
        this.setupSettingsScrollOptions('settingsHeadAccessoryOptions', 'headAccessory');
        this.setupSettingsScrollOptions('settingsFaceFeatureOptions', 'faceFeature');
        this.setupSettingsThemeColor('settingsThemeColorOptions');
    }
    
    setupSettingsOptionButtons(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const buttons = container.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                if (this.tempAvatarConfig) {
                    this.tempAvatarConfig[configKey] = btn.dataset.value;
                    this.updateSettingsAvatar();
                }
            });
        });
    }
    
    setupSettingsColorCircles(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const circles = container.querySelectorAll('.color-circle');
        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                circles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');
                if (this.tempAvatarConfig) {
                    this.tempAvatarConfig[configKey] = circle.dataset.value;
                    this.updateSettingsAvatar();
                }
            });
        });
    }
    
    setupSettingsScrollOptions(containerId, configKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const options = container.querySelectorAll('.scroll-option');
        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                if (this.tempAvatarConfig) {
                    this.tempAvatarConfig[configKey] = opt.dataset.value;
                    this.updateSettingsAvatar();
                }
            });
        });
    }
    
    setupSettingsThemeColor(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const circles = container.querySelectorAll('.color-circle');
        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                circles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');
                this.tempThemeColor = circle.dataset.value;
                this.updateThemePreview();
            });
        });
    }
    
    openSettings() {
        if (!this.profile) return;
        
        this.tempAvatarConfig = { ...this.profile.avatar };
        this.tempThemeColor = this.profile.themeColor;
        
        const firstNameInput = document.getElementById('editFirstName');
        const lastNameInput = document.getElementById('editLastName');
        
        if (firstNameInput) firstNameInput.value = this.profile.firstName;
        if (lastNameInput) lastNameInput.value = this.profile.lastName;
        
        this.selectCurrentOptions();
        this.updateSettingsAvatar();
        
        const statStreak = document.getElementById('statStreak');
        const statLetters = document.getElementById('statLettersOpened');
        const statWordles = document.getElementById('statWordlesPlayed');
        const memberSince = document.getElementById('memberSince');
        
        if (statStreak) statStreak.textContent = localStorage.getItem('wordleStreak') || '0';
        if (statLetters) statLetters.textContent = this.profile.lettersOpened || '0';
        if (statWordles) statWordles.textContent = this.profile.wordlesPlayed || '0';
        
        if (memberSince && this.profile.createdAt) {
            const date = new Date(this.profile.createdAt);
            memberSince.textContent = date.toLocaleDateString();
        }
        
        this.updateThemePreview();
        
        const settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) settingsOverlay.classList.add('show');
    }
    
    selectCurrentOptions() {
        const avatar = this.tempAvatarConfig;
        
        document.querySelectorAll('#settingsGenderOptions .option-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.value === avatar.gender);
        });
        
        document.querySelectorAll('#settingsSkinOptions .color-circle').forEach(circle => {
            circle.classList.toggle('selected', circle.dataset.value === avatar.skinTone);
        });
        
        document.querySelectorAll('#settingsHairStyleOptions .scroll-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === avatar.hairStyle);
        });
        
        document.querySelectorAll('#settingsHairColorOptions .color-circle').forEach(circle => {
            circle.classList.toggle('selected', circle.dataset.value === avatar.hairColor);
        });
        
        document.querySelectorAll('#settingsOutfitOptions .scroll-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === avatar.outfitStyle);
        });
        
        document.querySelectorAll('#settingsOutfitColorOptions .color-circle').forEach(circle => {
            circle.classList.toggle('selected', circle.dataset.value === avatar.outfitColor);
        });
        
        document.querySelectorAll('#settingsGlassesOptions .scroll-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === avatar.glasses);
        });
        
        document.querySelectorAll('#settingsHeadAccessoryOptions .scroll-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === avatar.headAccessory);
        });
        
        document.querySelectorAll('#settingsFaceFeatureOptions .scroll-option').forEach(opt => {
            opt.classList.toggle('selected', opt.dataset.value === avatar.faceFeature);
        });
        
        document.querySelectorAll('#settingsThemeColorOptions .color-circle').forEach(circle => {
            circle.classList.toggle('selected', circle.dataset.value === this.tempThemeColor);
        });
    }
    
    updateSettingsAvatar() {
        renderAvatar('settingsAvatarPreview', this.tempAvatarConfig, 'small', true);
        renderAvatar('settingsAvatarPreview2', this.tempAvatarConfig, 'small', true);
    }
    
    updateThemePreview() {
        const previewBox = document.getElementById('themePreviewBox');
        if (previewBox && this.tempThemeColor) {
            const previewBtn = previewBox.querySelector('.preview-button');
            const previewHeart = previewBox.querySelector('.preview-heart');
            
            if (previewBtn) previewBtn.style.background = this.tempThemeColor;
            if (previewHeart) previewHeart.style.color = this.tempThemeColor;
        }
    }
    
    closeSettings() {
        const settingsOverlay = document.getElementById('settingsOverlay');
        if (settingsOverlay) settingsOverlay.classList.remove('show');
        
        const errorEl = document.getElementById('settingsError');
        if (errorEl) errorEl.textContent = '';
        
        if (typeof activeAnimators !== 'undefined') {
            if (activeAnimators.has('settingsAvatarPreview')) {
                activeAnimators.get('settingsAvatarPreview').stopAutoAnimations();
                activeAnimators.delete('settingsAvatarPreview');
            }
            if (activeAnimators.has('settingsAvatarPreview2')) {
                activeAnimators.get('settingsAvatarPreview2').stopAutoAnimations();
                activeAnimators.delete('settingsAvatarPreview2');
            }
        }
        
        this.tempAvatarConfig = null;
        this.tempThemeColor = null;
    }
    
    saveSettings() {
        const firstNameInput = document.getElementById('editFirstName');
        const lastNameInput = document.getElementById('editLastName');
        const errorElement = document.getElementById('settingsError');
        
        const firstName = firstNameInput ? firstNameInput.value.trim() : '';
        const lastName = lastNameInput ? lastNameInput.value.trim() : '';
        
        if (!firstName) {
            if (errorElement) errorElement.textContent = 'Please enter your first name';
            return;
        }
        
        if (!lastName) {
            if (errorElement) errorElement.textContent = 'Please enter your last name';
            return;
        }
        
        const oldFirstName = this.profile.firstName;
        const oldLastName = this.profile.lastName;
        
        const wasAzzaBefore = typeof checkIfAzza === 'function' && checkIfAzza(oldFirstName, oldLastName);
        const isAzzaNow = typeof checkIfAzza === 'function' && checkIfAzza(firstName, lastName);
        
        this.profile.firstName = firstName;
        this.profile.lastName = lastName;
        this.profile.avatar = { ...this.tempAvatarConfig };
        this.profile.themeColor = this.tempThemeColor;
        
        this.saveProfile();
        this.applyProfile();
        this.closeSettings();
        
        if (isAzzaNow && !wasAzzaBefore) {
            setTimeout(() => {
                showSpecialAzzaPage(this.profile.avatar);
            }, 300);
        }
    }
    
    startApp() {
        const today = new Date().toISOString().split('T')[0];
        const alreadyPlayed = localStorage.getItem('wordlePlayed_' + today);
        
        if (alreadyPlayed) {
            document.getElementById('wordleOverlay').classList.add('hidden');
            document.getElementById('mainContent').style.display = 'block';
        } else {
            document.getElementById('wordleOverlay').classList.remove('hidden');
            document.getElementById('mainContent').style.display = 'none';
            
            if (typeof LoveWordle !== 'undefined') {
                new LoveWordle();
            }
        }
    }
    
    static incrementLettersOpened() {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const profile = JSON.parse(saved);
            profile.lettersOpened = (profile.lettersOpened || 0) + 1;
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }
    }
    
    static incrementWordlesPlayed() {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const profile = JSON.parse(saved);
            profile.wordlesPlayed = (profile.wordlesPlayed || 0) + 1;
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }
    }
    
    static updateStreakDisplay() {
        const streak = parseInt(localStorage.getItem('wordleStreak') || '0');
        const streakElement = document.getElementById('profileStreak');
        if (streakElement) {
            streakElement.textContent = `🔥 ${streak} day${streak !== 1 ? 's' : ''}`;
        }
    }
}

let profileManager;

document.addEventListener('DOMContentLoaded', function() {
    profileManager = new ProfileManager();
});
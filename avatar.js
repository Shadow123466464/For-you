class AvatarBuilder {
    constructor() {
        this.config = {
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
    }

    setConfig(config) {
        this.config = { ...this.config, ...config };
    }

    getConfig() {
        return this.config;
    }

    generateHTML(size = 'normal', animated = false) {
        const c = this.config;
        let sizeClass = '';
        let animatedClass = animated ? 'animated' : '';
        
        if (size === 'mini') sizeClass = 'mini';
        else if (size === 'small') sizeClass = 'small';
        
        const genderClass = c.gender || 'girl';
        
        return `
            <div class="custom-avatar ${sizeClass} ${animatedClass} ${genderClass}" data-animated="${animated}" data-gender="${genderClass}">
                <div class="avatar-head-container">
                    <div class="avatar-face-base ${c.skinTone}">
                        <div class="avatar-eyebrow left" style="background: ${this.getHairColorHex(c.hairColor)};"></div>
                        <div class="avatar-eyebrow right" style="background: ${this.getHairColorHex(c.hairColor)};"></div>
                        
                        <div class="avatar-eyes-container">
                            <div class="avatar-eye left">
                                <div class="avatar-eye-pupil"></div>
                                <div class="avatar-eye-lid" style="background: ${this.getSkinColorHex(c.skinTone)};"></div>
                            </div>
                            <div class="avatar-eye right">
                                <div class="avatar-eye-pupil"></div>
                                <div class="avatar-eye-lid" style="background: ${this.getSkinColorHex(c.skinTone)};"></div>
                            </div>
                        </div>
                        
                        <div class="avatar-heart-eyes">
                            <span class="heart">❤️</span>
                            <span class="heart">❤️</span>
                        </div>
                        
                        <div class="avatar-sparkle-eyes">
                            <span class="sparkle">✨</span>
                            <span class="sparkle">✨</span>
                        </div>
                        
                        <div class="avatar-nose"></div>
                        
                        <div class="avatar-mouth-container">
                            <div class="avatar-mouth smile"></div>
                        </div>
                        
                        ${this.generateFaceFeatures(c.faceFeature, c.gender)}
                        
                        ${this.generateGlasses(c.glasses)}
                    </div>
                    
                    <div class="avatar-hair ${c.hairStyle} ${c.hairColor}"></div>
                    
                    ${this.generateHeadAccessory(c.headAccessory)}
                </div>
                
                <div class="avatar-body-container">
                    <div class="avatar-neck ${c.skinTone}"></div>
                    <div class="avatar-body ${c.outfitStyle} ${c.outfitColor}"></div>
                </div>
            </div>
        `;
    }

    getSkinColorHex(skin) {
        const colors = {
            'skin1': '#FFDBAC',
            'skin2': '#F5CBA7',
            'skin3': '#E0AC69',
            'skin4': '#C68642',
            'skin5': '#8D5524',
            'skin6': '#5C3A21'
        };
        return colors[skin] || '#FFDBAC';
    }

    getHairColorHex(color) {
        const colors = {
            'black': '#1a1a1a',
            'brown': '#5c3d2e',
            'darkbrown': '#3d2314',
            'blonde': '#d4a853',
            'ginger': '#b55a30',
            'red': '#8b2942',
            'pink': '#e75480',
            'blue': '#4a90d9',
            'purple': '#7b4fa0',
            'gray': '#888888'
        };
        return colors[color] || '#1a1a1a';
    }

    generateFaceFeatures(feature, gender) {
        let html = '';
        
        if (gender === 'girl') {
            html += `
                <div class="avatar-blush-left"></div>
                <div class="avatar-blush-right"></div>
            `;
        }
        
        switch (feature) {
            case 'blush':
                if (gender !== 'girl') {
                    html += `
                        <div class="avatar-blush-left"></div>
                        <div class="avatar-blush-right"></div>
                    `;
                }
                break;
            case 'freckles':
                html += `<div class="avatar-freckles"></div>`;
                break;
            case 'mole':
                html += `<div class="avatar-mole"></div>`;
                break;
        }
        
        return html;
    }

    generateGlasses(type) {
        if (type === 'none') return '';
        
        return `
            <div class="avatar-glasses ${type}">
                <div class="glasses-bridge"></div>
            </div>
        `;
    }

    generateHeadAccessory(type) {
        if (type === 'none') return '';
        
        return `<div class="avatar-head-accessory ${type}"></div>`;
    }

    static getHairStyleOptions(gender = 'girl') {
        const girlStyles = [
            { value: 'short', label: 'Short' },
            { value: 'medium', label: 'Medium' },
            { value: 'long', label: 'Long' },
            { value: 'curly', label: 'Curly' }
        ];
        
        const boyStyles = [
            { value: 'short', label: 'Short' },
            { value: 'medium', label: 'Medium' },
            { value: 'curly', label: 'Curly' },
            { value: 'spiky', label: 'Spiky' },
            { value: 'buzz', label: 'Buzz' }
        ];
        
        return gender === 'boy' ? boyStyles : girlStyles;
    }

    static getHairColorOptions() {
        return [
            { value: 'black', label: 'Black', hex: '#1a1a1a' },
            { value: 'brown', label: 'Brown', hex: '#5c3d2e' },
            { value: 'darkbrown', label: 'Dark Brown', hex: '#3d2314' },
            { value: 'blonde', label: 'Blonde', hex: '#d4a853' },
            { value: 'ginger', label: 'Ginger', hex: '#b55a30' },
            { value: 'red', label: 'Red', hex: '#8b2942' },
            { value: 'pink', label: 'Pink', hex: '#e75480' },
            { value: 'blue', label: 'Blue', hex: '#4a90d9' },
            { value: 'purple', label: 'Purple', hex: '#7b4fa0' },
            { value: 'gray', label: 'Gray', hex: '#888888' }
        ];
    }

    static getSkinToneOptions() {
        return [
            { value: 'skin1', label: 'Light', hex: '#FFDBAC' },
            { value: 'skin2', label: 'Fair', hex: '#F5CBA7' },
            { value: 'skin3', label: 'Medium', hex: '#E0AC69' },
            { value: 'skin4', label: 'Tan', hex: '#C68642' },
            { value: 'skin5', label: 'Brown', hex: '#8D5524' },
            { value: 'skin6', label: 'Dark', hex: '#5C3A21' }
        ];
    }

    static getOutfitStyleOptions() {
        return [
            { value: 'casual', label: 'Casual' },
            { value: 'formal', label: 'Formal' },
            { value: 'sporty', label: 'Sporty' },
            { value: 'cozy', label: 'Cozy' }
        ];
    }

    static getOutfitColorOptions() {
        return [
            { value: 'pink', label: 'Pink', hex: '#ff6b81' },
            { value: 'blue', label: 'Blue', hex: '#3b82f6' },
            { value: 'purple', label: 'Purple', hex: '#a855f7' },
            { value: 'green', label: 'Green', hex: '#10b981' },
            { value: 'yellow', label: 'Yellow', hex: '#f59e0b' },
            { value: 'red', label: 'Red', hex: '#ef4444' },
            { value: 'black', label: 'Black', hex: '#1f2937' },
            { value: 'white', label: 'White', hex: '#f3f4f6' }
        ];
    }

    static getGlassesOptions() {
        return [
            { value: 'none', label: 'None' },
            { value: 'round', label: 'Round' },
            { value: 'square', label: 'Square' },
            { value: 'sunglasses', label: 'Sunglasses' }
        ];
    }

    static getHeadAccessoryOptions(gender = 'girl') {
        const girlAccessories = [
            { value: 'none', label: 'None' },
            { value: 'bow', label: 'Bow' },
            { value: 'headband', label: 'Headband' },
            { value: 'beanie', label: 'Beanie' },
            { value: 'cap', label: 'Cap' },
            { value: 'crown', label: 'Crown' }
        ];
        
        const boyAccessories = [
            { value: 'none', label: 'None' },
            { value: 'beanie', label: 'Beanie' },
            { value: 'cap', label: 'Cap' },
            { value: 'crown', label: 'Crown' }
        ];
        
        return gender === 'boy' ? boyAccessories : girlAccessories;
    }

    static getFaceFeatureOptions() {
        return [
            { value: 'none', label: 'None' },
            { value: 'blush', label: 'Blush' },
            { value: 'freckles', label: 'Freckles' },
            { value: 'mole', label: 'Mole' }
        ];
    }
}

class AvatarAnimator {
    constructor(avatarElement) {
        this.avatar = avatarElement;
        this.animationQueue = [];
        this.isAnimating = false;
        this.blinkInterval = null;
        this.randomAnimationInterval = null;
    }

    startAutoAnimations() {
        if (!this.avatar) return;
        
        setTimeout(() => this.blink(), 500);
        
        this.blinkInterval = setInterval(() => {
            this.blink();
        }, Math.random() * 3000 + 2000);
        
        this.randomAnimationInterval = setInterval(() => {
            this.playRandomAnimation();
        }, Math.random() * 5000 + 5000);
    }

    stopAutoAnimations() {
        if (this.blinkInterval) {
            clearInterval(this.blinkInterval);
            this.blinkInterval = null;
        }
        if (this.randomAnimationInterval) {
            clearInterval(this.randomAnimationInterval);
            this.randomAnimationInterval = null;
        }
    }

    blink() {
        if (!this.avatar) return;
        this.avatar.classList.add('blinking');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('blinking');
        }, 150);
    }

    eyeRoll() {
        if (!this.avatar) return;
        this.avatar.classList.add('eye-roll');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('eye-roll');
        }, 2000);
    }

    lookAround() {
        if (!this.avatar) return;
        this.avatar.classList.add('looking');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('looking');
        }, 6000);
    }

    wink() {
        if (!this.avatar) return;
        this.avatar.classList.add('winking');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('winking');
        }, 300);
    }

    smile() {
        if (!this.avatar) return;
        this.avatar.classList.add('smiling');
        this.changeMouth('happy');
        setTimeout(() => {
            if (this.avatar) {
                this.avatar.classList.remove('smiling');
                this.changeMouth('smile');
            }
        }, 3000);
    }

    bigSmile() {
        if (!this.avatar) return;
        this.changeMouth('big-smile');
        this.avatar.classList.add('blushing');
        setTimeout(() => {
            if (this.avatar) {
                this.changeMouth('smile');
                this.avatar.classList.remove('blushing');
            }
        }, 3000);
    }

    laugh() {
        if (!this.avatar) return;
        this.changeMouth('laugh');
        this.avatar.classList.add('bouncing');
        setTimeout(() => {
            if (this.avatar) {
                this.changeMouth('smile');
                this.avatar.classList.remove('bouncing');
            }
        }, 3000);
    }

    heartEyes() {
        if (!this.avatar) return;
        this.avatar.classList.add('heart-eyes');
        this.avatar.classList.add('blushing');
        setTimeout(() => {
            if (this.avatar) {
                this.avatar.classList.remove('heart-eyes');
                this.avatar.classList.remove('blushing');
            }
        }, 3000);
    }

    sparkleEyes() {
        if (!this.avatar) return;
        this.avatar.classList.add('sparkle-eyes');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('sparkle-eyes');
        }, 3000);
    }

    surprised() {
        if (!this.avatar) return;
        this.avatar.classList.add('surprised');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('surprised');
        }, 2000);
    }

    bounce() {
        if (!this.avatar) return;
        this.avatar.classList.add('bouncing');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('bouncing');
        }, 2000);
    }

    wave() {
        if (!this.avatar) return;
        this.avatar.classList.add('waving');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('waving');
        }, 2000);
    }

    hairSway() {
        if (!this.avatar) return;
        this.avatar.classList.add('hair-sway');
        setTimeout(() => {
            if (this.avatar) this.avatar.classList.remove('hair-sway');
        }, 4000);
    }

    changeMouth(type) {
        if (!this.avatar) return;
        const mouth = this.avatar.querySelector('.avatar-mouth');
        if (mouth) {
            mouth.className = `avatar-mouth ${type}`;
        }
    }

    playRandomAnimation() {
        const animations = [
            'eyeRoll',
            'wink',
            'smile',
            'lookAround',
            'hairSway',
            'bounce'
        ];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        this[randomAnim]();
    }

    celebrate() {
        this.heartEyes();
        setTimeout(() => this.bigSmile(), 1500);
        setTimeout(() => this.bounce(), 3000);
        setTimeout(() => this.sparkleEyes(), 4500);
    }
}

const avatarBuilder = new AvatarBuilder();
const activeAnimators = new Map();
let azzaCelebrationInterval = null;

function renderAvatar(containerId, config = null, size = 'normal', animated = false) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    if (activeAnimators.has(containerId)) {
        activeAnimators.get(containerId).stopAutoAnimations();
        activeAnimators.delete(containerId);
    }

    if (config) {
        avatarBuilder.setConfig(config);
    }

    container.innerHTML = avatarBuilder.generateHTML(size, animated);

    if (animated) {
        const avatarElement = container.querySelector('.custom-avatar');
        if (avatarElement) {
            const animator = new AvatarAnimator(avatarElement);
            animator.startAutoAnimations();
            activeAnimators.set(containerId, animator);
            return animator;
        }
    }

    return null;
}

function renderProfileAvatar(containerId, size = 'normal', animated = false) {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        const profile = JSON.parse(saved);
        if (profile.avatar) {
            return renderAvatar(containerId, profile.avatar, size, animated);
        }
    }
    return null;
}

function getAvatarAnimator(containerId) {
    return activeAnimators.get(containerId);
}

function stopAllAnimators() {
    activeAnimators.forEach((animator, id) => {
        animator.stopAutoAnimations();
    });
    activeAnimators.clear();
}

function updateGenderBasedOptions(gender) {
    const hairStyleOptions = document.getElementById('hairStyleOptions');
    if (hairStyleOptions) {
        hairStyleOptions.querySelectorAll('.option-card[data-gender]').forEach(card => {
            const cardGender = card.dataset.gender;
            if (cardGender === 'both' || cardGender === gender) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
                card.classList.remove('selected');
            }
        });
        
        const visibleCards = hairStyleOptions.querySelectorAll('.option-card:not([style*="display: none"])');
        const hasSelected = Array.from(visibleCards).some(card => card.classList.contains('selected'));
        if (!hasSelected && visibleCards.length > 0) {
            visibleCards[0].classList.add('selected');
        }
    }
    
    const headAccessoryOptions = document.getElementById('headAccessoryOptions');
    if (headAccessoryOptions) {
        headAccessoryOptions.querySelectorAll('.option-card[data-gender]').forEach(card => {
            const cardGender = card.dataset.gender;
            if (cardGender === 'both' || cardGender === gender) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
                card.classList.remove('selected');
            }
        });
    }
    
    const settingsHairStyleOptions = document.getElementById('settingsHairStyleOptions');
    if (settingsHairStyleOptions) {
        settingsHairStyleOptions.querySelectorAll('.scroll-option[data-gender]').forEach(option => {
            const optionGender = option.dataset.gender;
            if (optionGender === 'both' || optionGender === gender) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
                option.classList.remove('selected');
            }
        });
        
        const visibleOptions = settingsHairStyleOptions.querySelectorAll('.scroll-option:not([style*="display: none"])');
        const hasSelected = Array.from(visibleOptions).some(opt => opt.classList.contains('selected'));
        if (!hasSelected && visibleOptions.length > 0) {
            visibleOptions[0].classList.add('selected');
        }
    }
    
    const settingsHeadAccessoryOptions = document.getElementById('settingsHeadAccessoryOptions');
    if (settingsHeadAccessoryOptions) {
        settingsHeadAccessoryOptions.querySelectorAll('.scroll-option[data-gender]').forEach(option => {
            const optionGender = option.dataset.gender;
            if (optionGender === 'both' || optionGender === gender) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
                option.classList.remove('selected');
            }
        });
    }
}

function getSelectedHairStyle() {
    const hairStyleOptions = document.getElementById('hairStyleOptions');
    if (hairStyleOptions) {
        const selected = hairStyleOptions.querySelector('.option-card.selected:not([style*="display: none"])');
        if (selected) {
            return selected.dataset.value;
        }
        const firstVisible = hairStyleOptions.querySelector('.option-card:not([style*="display: none"])');
        if (firstVisible) {
            return firstVisible.dataset.value;
        }
    }
    return 'short';
}

function getSelectedHeadAccessory() {
    const headAccessoryOptions = document.getElementById('headAccessoryOptions');
    if (headAccessoryOptions) {
        const selected = headAccessoryOptions.querySelector('.option-card.selected:not([style*="display: none"])');
        if (selected) {
            return selected.dataset.value;
        }
    }
    return 'none';
}

function createSpecialAzzaPage() {
    const existing = document.getElementById('specialAzzaOverlay');
    if (existing) {
        existing.remove();
    }

    if (azzaCelebrationInterval) {
        clearInterval(azzaCelebrationInterval);
        azzaCelebrationInterval = null;
    }

    const overlay = document.createElement('div');
    overlay.className = 'special-azza-overlay';
    overlay.id = 'specialAzzaOverlay';

    let flowersHTML = '<div class="flowers-container">';
    const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '💐', '🌻', '🌼', '💮', '🏵️', '🪷', '🌱', '🍀', '🦋', '💕', '💖', '💗'];
    for (let i = 0; i < 50; i++) {
        const flower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 6;
        const delay = Math.random() * 10;
        const size = Math.random() * 1.5 + 1;
        flowersHTML += `<span class="flower" style="left: ${left}%; animation-duration: ${duration}s; animation-delay: ${delay}s; font-size: ${size}rem;">${flower}</span>`;
    }
    flowersHTML += '</div>';

    let sparklesHTML = '<div class="sparkles-bg">';
    for (let i = 0; i < 80; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4;
        const size = Math.random() * 0.8 + 0.4;
        const sparkleTypes = ['✨', '⭐', '🌟', '💫'];
        const sparkle = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        sparklesHTML += `<span class="sparkle-star" style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s; font-size: ${size}rem;">${sparkle}</span>`;
    }
    sparklesHTML += '</div>';

    overlay.innerHTML = `
        ${flowersHTML}
        ${sparklesHTML}
        <div class="special-azza-content">
            <div class="special-azza-avatar" id="specialAzzaAvatar"></div>
            <h1 class="special-azza-title">For My Dearest Azza 💕</h1>
            <div class="special-azza-hearts">
                <span class="heart">💖</span>
                <span class="heart">💗</span>
                <span class="heart">💓</span>
                <span class="heart">💗</span>
                <span class="heart">💖</span>
            </div>
            <p class="special-azza-message">
                Every letter in this app was written with you in mind.<br><br>
                You are the reason behind every word, every color, every animation.<br><br>
                When I created this, I thought of your smile, your laugh, your beautiful soul.<br><br>
                You are not just special to me — you are everything.<br><br>
                <em style="color: #ffb6c1;">Yīnwèi nǐ shì nà zhǒng zhídé bèi xiě jìn shū lǐ de nǚhái.</em><br><br>
                Because you are that kind of girl worth being written into books.<br><br>
                <strong style="font-size: 1.4em; color: #ff6b81;">Forever yours 💕</strong>
            </p>
            <button class="special-azza-close" id="closeSpecialAzza">
                <i class="fas fa-heart"></i> Continue with Love
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('closeSpecialAzza').addEventListener('click', () => {
        hideSpecialAzzaPage();
    });

    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const preventEscape = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    document.addEventListener('keydown', preventEscape);
    overlay._escapeHandler = preventEscape;
}

function showSpecialAzzaPage(avatarConfig) {
    createSpecialAzzaPage();

    const overlay = document.getElementById('specialAzzaOverlay');
    if (!overlay) return;

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    const animator = renderAvatar('specialAzzaAvatar', avatarConfig, 'normal', true);

    if (animator) {
        setTimeout(() => animator.heartEyes(), 500);
        setTimeout(() => animator.bigSmile(), 2500);
        setTimeout(() => animator.bounce(), 4000);
        setTimeout(() => animator.sparkleEyes(), 5500);
        setTimeout(() => animator.laugh(), 7000);
        setTimeout(() => animator.heartEyes(), 8500);
        
        azzaCelebrationInterval = setInterval(() => {
            const overlay = document.getElementById('specialAzzaOverlay');
            if (!overlay || !overlay.classList.contains('show')) {
                clearInterval(azzaCelebrationInterval);
                azzaCelebrationInterval = null;
                return;
            }
            
            const celebrationAnims = ['heartEyes', 'sparkleEyes', 'bigSmile', 'bounce', 'laugh', 'wink'];
            const randomAnim = celebrationAnims[Math.floor(Math.random() * celebrationAnims.length)];
            if (animator && animator[randomAnim]) {
                animator[randomAnim]();
            }
        }, 4000);
    }
}

function hideSpecialAzzaPage() {
    const overlay = document.getElementById('specialAzzaOverlay');
    if (!overlay) return;

    if (azzaCelebrationInterval) {
        clearInterval(azzaCelebrationInterval);
        azzaCelebrationInterval = null;
    }

    if (overlay._escapeHandler) {
        document.removeEventListener('keydown', overlay._escapeHandler);
    }

    document.body.style.overflow = '';

    overlay.classList.remove('show');
    overlay.classList.add('hiding');

    if (activeAnimators.has('specialAzzaAvatar')) {
        activeAnimators.get('specialAzzaAvatar').stopAutoAnimations();
        activeAnimators.delete('specialAzzaAvatar');
    }

    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 500);
}

function checkIfAzza(firstName, lastName) {
    if (!firstName || !lastName) return false;
    const fullName = `${firstName} ${lastName}`.toLowerCase().trim();
    return fullName === 'azza chouikh';
}

function isChangingToAzza(oldFirst, oldLast, newFirst, newLast) {
    const wasAzza = checkIfAzza(oldFirst, oldLast);
    const isAzza = checkIfAzza(newFirst, newLast);
    return !wasAzza && isAzza;
}